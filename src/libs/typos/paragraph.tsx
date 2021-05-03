// jss   (builds css  using javascript):
import { Prop, Cust, }     from '../Css'        // ts defs support for jss
import CssConfig           from '../CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import * as base           from './base'



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
        fontSize          : inherit as Prop.FontSize          | Cust.Expr,
        fontFamily        : inherit as Prop.FontFamily[]      | Cust.Ref,
        fontWeight        : inherit as Prop.FontWeight        | Cust.Expr,
        fontStyle         : inherit as Prop.FontStyle         | Cust.Ref,
        textDecoration    : inherit as Prop.TextDecoration    | Cust.Ref,
        lineHeight        : inherit as Prop.LineHeight        | Cust.Expr,
    
        foreg             : inherit as Prop.Color             | Cust.Ref,
        
        marginBlockStart  : 0       as Prop.MarginBlockStart  | Cust.Expr,
        marginBlockEnd    : '1em'   as Prop.MarginBlockEnd    | Cust.Expr,
        marginInlineStart : 0       as Prop.MarginInlineStart | Cust.Expr,
        marginInlineEnd   : 0       as Prop.MarginInlineEnd   | Cust.Expr,
    };
}, /*prefix: */'p');
export const cssProps = cssConfig.refs;
export default cssProps;



// define the css using configurable cssProps:
base.declareCss({
    'p, .p': {
        // layout:
        display : 'block',



        // spacings:
        '&:last-child': {
            marginBlockEnd: 0, // kill the last marginEnd for the last element
        },



        // customize:
        ...cssProps,
    },
});