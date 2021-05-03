// jss   (builds css  using javascript):
import type {
    JssStyle,
}                          from 'jss'           // ts defs support for jss
import { Prop, Cust, }     from '../Css'        // ts defs support for jss
import CssConfig           from '../CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.
import type {
    Dictionary,
}                          from '../CssConfig'  // ts defs support for jss

// nodestrap (modular web components):
import * as base           from './base'
import colors              from '../colors'     // configurable colors & theming defs



// jss:

/**
 * A *css custom property* manager that manages & updates the *css props* stored at specified `rule`.
 */
const cssConfig = new CssConfig(() => {
    // common css values:
    // const initial = 'initial';
    // const unset   = 'unset';
    const none    = 'none';
    // const inherit = 'inherit';
    // const center  = 'center';
    // const middle  = 'middle';

    const basics = {
        fontSizeNm            : '1rem'       as Prop.FontSize       | Cust.Expr,

        fontFamilySansSerief  : [
            'system-ui',
            '-apple-system',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            '"Noto Sans"',
            '"Liberation Sans"',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            '"Noto Color Emoji"',
        ]                                    as Prop.FontFamily[]   | Cust.Ref,
        fontFamilyMonospace   : [
            'SFMono-Regular',
            'Menlo', 'Monaco',
            'Consolas',
            '"Liberation Mono"',
            '"Courier New"',
            'monospace',
        ]                                    as Prop.FontFamily[]   | Cust.Ref,

        fontWeightLighter     : 'lighter'    as Prop.FontWeight     | Cust.Expr,
        fontWeightLight       : 300          as Prop.FontWeight     | Cust.Expr,
        fontWeightNormal      : 400          as Prop.FontWeight     | Cust.Expr,
        fontWeightBold        : 700          as Prop.FontWeight     | Cust.Expr,
        fontWeightBolder      : 'bolder'     as Prop.FontWeight     | Cust.Expr,

        fontStyle             : 'normal'     as Prop.FontStyle      | Cust.Ref,
        textDecoration        : none         as Prop.TextDecoration | Cust.Ref,

        lineHeightSm          : 1.25         as Prop.LineHeight     | Cust.Expr,
        lineHeightNm          : 1.50         as Prop.LineHeight     | Cust.Expr,
        lineHeightLg          : 2.00         as Prop.LineHeight     | Cust.Expr,

        foreg                 : colors.foreg as Prop.Color          | Cust.Ref,
        /**
         * Defaults is color's backg.
         * It can be an image with the average color as color's backg.
         */
        backg                 : colors.backg as Prop.Background     | Cust.Ref,
    };

    return {
        ...basics,

        fontSize              : basics.fontSizeNm                                as Prop.FontSize | Cust.Expr,
        fontSizeXs            : [['calc(', basics.fontSizeNm, '*', 0.50  , ')']] as Prop.FontSize | Cust.Expr,
        fontSizeSm            : [['calc(', basics.fontSizeNm, '*', 0.75  , ')']] as Prop.FontSize | Cust.Expr,
        fontSizeMd            : [['calc(', basics.fontSizeNm, '*', 1.25  , ')']] as Prop.FontSize | Cust.Expr,
        fontSizeLg            : [['calc(', basics.fontSizeNm, '*', 1.50  , ')']] as Prop.FontSize | Cust.Expr,
        fontSizeXl            : [['calc(', basics.fontSizeNm, '*', 1.75  , ')']] as Prop.FontSize | Cust.Expr,
        fontSizeXxl           : [['calc(', basics.fontSizeNm, '*', 2.00  , ')']] as Prop.FontSize | Cust.Expr,
        fontSizeXxxl          : [['calc(', basics.fontSizeNm, '*', 2.25  , ')']] as Prop.FontSize | Cust.Expr,

        fontFamily            : basics.fontFamilySansSerief as Prop.FontFamily[] | Cust.Ref,

        fontWeight            : basics.fontWeightNormal     as Prop.FontWeight   | Cust.Expr,

        lineHeight            : basics.lineHeightNm         as Prop.LineHeight   | Cust.Expr,
    };
}, /*prefix: */'');
export const cssProps = cssConfig.refs;
export default cssProps;



// define the css using configurable cssProps:
base.declareCss({
    ':root': (() => {
        const cssPropsCopy: Dictionary<any> = {};
        for (const [name, prop] of Object.entries(cssProps)) {
            // excludes the entry if the name matching with following:
            if ((/(Xs|Sm|Nm|Md|Lg|Xl|Xxl|Xxxl|Lighter|Light|Normal|Bold|Bolder)$|(fontFamily\w+)/).test(name)) continue; // exclude
            
            // if not match => include it:
            cssPropsCopy[name] = prop;
        }
        
        return cssPropsCopy as JssStyle;
    })()
});
