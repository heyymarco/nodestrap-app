// jss   (builds css  using javascript):
import { Prop, Cust, }     from '../Css'             // ts defs support for jss
import CssPropsManager     from '../CssPropsManager' // A *css custom property* manager that manages & updates the *css props* stored at specified `rule`.

// nodestrap (modular web components):
import * as base           from './base'
import marks               from './marking-mark'
import codes               from './marking-code'
import colors              from '../colors'          // configurable colors & theming defs



// jss:

/**
 * A *css custom property* manager that manages & updates the *css props* stored at specified `rule`.
 */
const cssPropsManager = new CssPropsManager(() => {
    // common css values:
    // const initial = 'initial';
    // const unset   = 'unset';
    // const none    = 'none';
    // const inherit = 'inherit';
    // const center  = 'center';
    // const middle  = 'middle';

    return {
        fontSize          : codes.fontSize       as Prop.FontSize            | Cust.Expr,
        fontFamily        : codes.fontFamily     as Prop.FontFamily[]        | Cust.Ref,
        fontWeight        : codes.fontWeight     as Prop.FontWeight          | Cust.Expr,
        fontStyle         : codes.fontStyle      as Prop.FontStyle           | Cust.Ref,
        textDecoration    : codes.textDecoration as Prop.TextDecoration      | Cust.Ref,
        lineHeight        : codes.lineHeight     as Prop.LineHeight          | Cust.Expr,
    
        color             : colors.white         as Prop.Color               | Cust.Ref,
        backg             : colors.grayDark      as Prop.Background          | Cust.Ref,
        
        paddingX          : '0.4em' as Prop.PaddingLeft | Prop.PaddingRight  | Cust.Expr,
        paddingY          : '0.2em' as Prop.PaddingTop  | Prop.PaddingBottom | Cust.Expr,
        border            : marks.border         as Prop.Border              | Cust.Expr,
        borderRadius      : marks.borderRadius   as Prop.BorderRadius        | Cust.Expr,
    };
}, /*prefix: */'kbd');
export const cssProps = cssPropsManager.refs;
export default cssProps;



// define the css using configurable cssProps:
base.declareCss({
    'kbd,.kbd': {
        extend  : cssProps,
        display : 'inline',
    },
});