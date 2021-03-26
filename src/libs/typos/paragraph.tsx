// jss   (builds css  using javascript):
import type { JssStyle }   from 'jss'                // ts defs support for jss
import { Prop, Cust, }     from '../Css'             // ts defs support for jss
import CssPropsManager     from '../CssPropsManager' // A *css custom property* manager that manages & updates the *css props* stored at specified `rule`.

// nodestrap (modular web components):
import * as base           from './base'



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
        fontSize          : inherit as Prop.FontSize          | Cust.Expr,
        fontFamily        : inherit as Prop.FontFamily[]      | Cust.Ref,
        fontWeight        : inherit as Prop.FontWeight        | Cust.Expr,
        fontStyle         : inherit as Prop.FontStyle         | Cust.Ref,
        textDecoration    : inherit as Prop.TextDecoration    | Cust.Ref,
        lineHeight        : inherit as Prop.LineHeight        | Cust.Expr,
    
        color             : inherit as Prop.Color             | Cust.Ref,
        
        marginBlockStart  : 0       as Prop.MarginBlockStart  | Cust.Expr,
        marginBlockEnd    : '1em'   as Prop.MarginBlockEnd    | Cust.Expr,
        marginInlineStart : 0       as Prop.MarginInlineStart | Cust.Expr,
        marginInlineEnd   : 0       as Prop.MarginInlineEnd   | Cust.Expr,
    };
}, /*prefix: */'p');
export const cssProps = cssPropsManager.refs;
export default cssProps;



// define the css using configurable cssProps:
base.declareCss({
    'p, .p': {
        extend  : cssProps as JssStyle,
        display : 'block',


        '&:last-child': {
            marginBlockEnd: 0,
        },
    },
});