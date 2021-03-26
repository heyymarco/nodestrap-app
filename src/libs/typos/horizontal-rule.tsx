// jss   (builds css  using javascript):
import { Prop, Cust, }     from '../Css'             // ts defs support for jss
import CssPropsManager     from '../CssPropsManager' // A *css custom property* manager that manages & updates the *css props* stored at specified `rule`.

// nodestrap (modular web components):
import * as base           from './base'
import borders             from '../borders'         // configurable borders
import spacers             from '../spacers'         // configurable spaces defs



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
        color             : inherit         as Prop.Color             | Cust.Ref,
        opacity           : 0.25            as Prop.Opacity           | Cust.Ref,

        width             : borders.hair    as Prop.Width             | Cust.Ref,
        
        marginBlockStart  : spacers.default as Prop.MarginBlockStart  | Cust.Expr,
        marginBlockEnd    : spacers.default as Prop.MarginBlockEnd    | Cust.Expr,
        marginInlineStart : 0               as Prop.MarginInlineStart | Cust.Expr,
        marginInlineEnd   : 0               as Prop.MarginInlineEnd   | Cust.Expr,
    };
}, /*prefix: */'hr');
export const cssProps = cssPropsManager.refs;
export default cssProps;



// define the css using configurable cssProps:
base.declareCss({
    'hr': {
        extend          : cssProps,
        width           : null,
        
        display         : 'block',
        backgroundColor : 'currentColor',
        height          : cssProps.width,
        border          : 0,
    },
});