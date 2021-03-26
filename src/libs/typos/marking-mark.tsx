// jss   (builds css  using javascript):
import { Prop, Cust, }     from '../Css'             // ts defs support for jss
import CssPropsManager     from '../CssPropsManager' // A *css custom property* manager that manages & updates the *css props* stored at specified `rule`.

// nodestrap (modular web components):
import * as base           from './base'
import colors              from '../colors'          // configurable colors & theming defs
import
    borders,
    * as border            from '../borders'         // configurable borders & border radiuses defs



// jss:

/**
 * A *css custom property* manager that manages & updates the *css props* stored at specified `rule`.
 */
const cssPropsManager = new CssPropsManager(() => {
    // common css values:
    // const initial = 'initial';
    // const unset   = 'unset';
    // const none    = 'none';
    const inherit = 'inherit';
    // const center  = 'center';
    // const middle  = 'middle';

    return {
        fontSize          : inherit              as Prop.FontSize            | Cust.Expr,
        fontFamily        : inherit              as Prop.FontFamily[]        | Cust.Ref,
        fontWeight        : inherit              as Prop.FontWeight          | Cust.Expr,
        fontStyle         : inherit              as Prop.FontStyle           | Cust.Ref,
        textDecoration    : inherit              as Prop.TextDecoration      | Cust.Ref,
        lineHeight        : inherit              as Prop.LineHeight          | Cust.Expr,
    
        color             : inherit              as Prop.Color               | Cust.Ref,
        backg             : colors.warningTransp as Prop.Background          | Cust.Ref,
        
        paddingX          : '0.2em' as Prop.PaddingLeft | Prop.PaddingRight  | Cust.Expr,
        paddingY          : '0em'   as Prop.PaddingTop  | Prop.PaddingBottom | Cust.Expr,
        border            : borders.default      as Prop.Border              | Cust.Expr,
        borderRadius      : border.radiuses.sm   as Prop.BorderRadius        | Cust.Expr,
    };
}, /*prefix: */'mrk');
export const cssProps = cssPropsManager.refs;
export default cssProps;



// define the css using configurable cssProps:
base.declareCss({
    'mark,.mark': {
        extend  : cssProps,
        display : 'inline',
    },
});