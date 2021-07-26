// jss   (builds css  using javascript):
import { Prop, Cust, }     from '../Css'        // ts defs support for jss
import CssConfig           from '../CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import * as base           from './base'
import colors              from '../colors'     // configurable colors & theming defs
import
    borders,
    * as border            from '../borders'    // configurable borders & border radiuses defs



// jss:

/**
 * A *css custom property* manager that manages & updates the *css props* stored at specified `rule`.
 */
const cssConfig = new CssConfig(() => {
    // common css values:
    // const initial = 'initial';
    // const unset   = 'unset';
    // const none    = 'none';
    const inherit = 'inherit';
    // const center  = 'center';
    // const middle  = 'middle';

    return {
        fontSize          : inherit              as Prop.FontSize       | Cust.Expr,
        fontFamily        : inherit              as Prop.FontFamily[]   | Cust.Ref,
        fontWeight        : inherit              as Prop.FontWeight     | Cust.Expr,
        fontStyle         : inherit              as Prop.FontStyle      | Cust.Ref,
        textDecoration    : inherit              as Prop.TextDecoration | Cust.Ref,
        lineHeight        : inherit              as Prop.LineHeight     | Cust.Expr,
    
        foreg             : inherit              as Prop.Color          | Cust.Ref,
        backg             : colors.warningThin   as Prop.Background     | Cust.Ref,
        
        //#region borders
        border            : borders.default      as Prop.Border         | Cust.Expr,
        borderRadius      : border.radiuses.sm   as Prop.BorderRadius   | Cust.Expr,
        //#endregion borders

        //#region spacings
        paddingInline     : '0.2em'              as Prop.PaddingInline  | Cust.Expr,
        paddingBlock      : '0em'                as Prop.PaddingBlock   | Cust.Expr,
        //#endregion spacings
    };
}, /*prefix: */'mrk');
export const cssProps = cssConfig.refs;
export default cssProps;



// define the css using configurable cssProps:
base.declareCss({
    'mark,.mark': {
        // layouts:
        display : 'inline',



        // customize:
        ...cssProps,
    },
});