// jss   (builds css  using javascript):
import type { JssStyle }   from 'jss'           // ts defs support for jss
import { Prop, Cust, }     from '../Css'        // ts defs support for jss
import CssConfig           from '../CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import * as base           from './base'
import pars                from './paragraph'
import gens                from './general'



// jss:

/**
 * A *css custom property* manager that manages & updates the *css props* stored at specified `rule`.
 */
const cssConfig = new CssConfig(() => {
    // common css values:
    // const initial = 'initial';
    // const unset   = 'unset';
    // const none    = 'none';
    // const inherit = 'inherit';
    // const center  = 'center';
    // const middle  = 'middle';

    return {
        fontSize          : gens.fontSizeMd        as Prop.FontSize          | Cust.Expr,
        fontFamily        : pars.fontFamily        as Prop.FontFamily[]      | Cust.Ref,
        fontWeight        : gens.fontWeightLight   as Prop.FontWeight        | Cust.Expr,
        fontStyle         : pars.fontStyle         as Prop.FontStyle         | Cust.Ref,
        textDecoration    : pars.textDecoration    as Prop.TextDecoration    | Cust.Ref,
        lineHeight        : pars.lineHeight        as Prop.LineHeight        | Cust.Expr,
    
        color             : pars.color             as Prop.Color             | Cust.Ref,
        
        marginBlockStart  : pars.marginBlockStart  as Prop.MarginBlockStart  | Cust.Expr,
        marginBlockEnd    : pars.marginBlockEnd    as Prop.MarginBlockEnd    | Cust.Expr,
        marginInlineStart : pars.marginInlineStart as Prop.MarginInlineStart | Cust.Expr,
        marginInlineEnd   : pars.marginInlineEnd   as Prop.MarginInlineEnd   | Cust.Expr,
    };
}, /*prefix: */'lead');
export const cssProps = cssConfig.refs;
export default cssProps;



// define the css using configurable cssProps:
base.declareCss({
    '.lead': {
        extend  : cssProps as JssStyle,
        display : 'block',


        '&:last-child': {
            marginBlockEnd: 0,
        },
    },
});