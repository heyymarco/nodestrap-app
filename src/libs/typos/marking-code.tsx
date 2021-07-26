// jss   (builds css  using javascript):
import { Prop, Cust, }     from '../Css'        // ts defs support for jss
import CssConfig           from '../CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import * as base           from './base'
import gens                from './general'
import colors              from '../colors'          // configurable colors & theming defs



// jss:

/**
 * A *css custom property* manager that manages & updates the *css props* stored at specified `rule`.
 */
const cssConfig = new CssConfig(() => {
    // common css values:
    // const initial = 'initial';
    // const unset   = 'unset';
    const none    = 'none';
    const inherit = 'inherit';
    // const center  = 'center';
    // const middle  = 'middle';

    return {
        fontSize          : [[
            'calc((', gens.fontSizeSm, '+', gens.fontSizeMd, ')/2)'
        ]]                                           as Prop.FontSize       | Cust.Expr,
        fontFamily        : gens.fontFamilyMonospace as Prop.FontFamily[]   | Cust.Ref,
        fontWeight        : gens.fontWeightNormal    as Prop.FontWeight     | Cust.Expr,
        fontStyle         : none                     as Prop.FontStyle      | Cust.Ref,
        textDecoration    : none                     as Prop.TextDecoration | Cust.Ref,
        lineHeight        : inherit                  as Prop.LineHeight     | Cust.Expr,
    
        foreg             : colors.pink              as Prop.Color          | Cust.Ref,
        backg             : none                     as Prop.Background     | Cust.Ref,
        
        //#region borders
        border            : none                     as Prop.Border         | Cust.Expr,
        borderRadius      : 0                        as Prop.BorderRadius   | Cust.Expr,
        //#endregion borders

        //#region spacings
        paddingInline     : 0                        as Prop.PaddingInline  | Cust.Expr,
        paddingBlock      : 0                        as Prop.PaddingBlock   | Cust.Expr,
        //#endregion spacings
    };
}, /*prefix: */'code');
export const cssProps = cssConfig.refs;
export default cssProps;



// define the css using configurable cssProps:
base.declareCss({
    'code,.code,var,.var,samp,.samp': {
        // layouts:
        display : 'inline',



        // customize:
        ...cssProps,
    },
});