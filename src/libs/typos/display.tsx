// jss   (builds css  using javascript):
import { Prop, Cust, }     from '../Css'             // ts defs support for jss
import CssPropsManager     from '../CssPropsManager' // A *css custom property* manager that manages & updates the *css props* stored at specified `rule`.

// nodestrap (modular web components):
import * as base           from './base'
import heads,
       * as head           from './heading'
import gens                from './general'



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
        fontSize1         : [['calc(', 5.0, '*', (gens.fontSize as string), ')']] as Prop.FontSize | Cust.Expr,
        fontSize2         : [['calc(', 4.5, '*', (gens.fontSize as string), ')']] as Prop.FontSize | Cust.Expr,
        fontSize3         : [['calc(', 4.0, '*', (gens.fontSize as string), ')']] as Prop.FontSize | Cust.Expr,
        fontSize4         : [['calc(', 3.5, '*', (gens.fontSize as string), ')']] as Prop.FontSize | Cust.Expr,
        fontSize5         : [['calc(', 3.0, '*', (gens.fontSize as string), ')']] as Prop.FontSize | Cust.Expr,
        fontSize6         : [['calc(', 2.5, '*', (gens.fontSize as string), ')']] as Prop.FontSize | Cust.Expr,
        
        fontFamily        : heads.fontFamily        as Prop.FontFamily[]      | Cust.Ref,
        fontWeight        : 300                     as Prop.FontWeight        | Cust.Expr,
        fontStyle         : heads.fontStyle         as Prop.FontStyle         | Cust.Ref,
        textDecoration    : heads.textDecoration    as Prop.TextDecoration    | Cust.Ref,
        lineHeight        : heads.lineHeight        as Prop.LineHeight        | Cust.Expr,
    
        color             : heads.color             as Prop.Color             | Cust.Ref,
        
        marginBlockStart  : heads.marginBlockStart  as Prop.MarginBlockStart  | Cust.Expr,
        marginBlockEnd    : heads.marginBlockEnd    as Prop.MarginBlockEnd    | Cust.Expr,
        marginInlineStart : heads.marginInlineStart as Prop.MarginInlineStart | Cust.Expr,
        marginInlineEnd   : heads.marginInlineEnd   as Prop.MarginInlineEnd   | Cust.Expr,

        subOpacity        : heads.subOpacity        as Prop.Opacity           | Cust.Expr,
    };
}, /*prefix: */'d');
export const cssProps = cssPropsManager.refs;
export default cssProps;



// define the css using configurable cssProps:
base.declareCss(head.createCss(cssProps, (level) => `.display-${level}`));