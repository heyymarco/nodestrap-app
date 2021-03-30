// jss   (builds css  using javascript):
import type { JssStyle }   from 'jss'           // ts defs support for jss
import { Prop, Cust, }     from '../Css'        // ts defs support for jss
import CssConfig           from '../CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import * as base           from './base'
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
    const inherit = 'inherit';
    // const center  = 'center';
    // const middle  = 'middle';

    return {
        fontSize1         : [['calc(', 2.25, '*', gens.fontSize, ')']] as Prop.FontSize | Cust.Expr,
        fontSize2         : [['calc(', 2.00, '*', gens.fontSize, ')']] as Prop.FontSize | Cust.Expr,
        fontSize3         : [['calc(', 1.75, '*', gens.fontSize, ')']] as Prop.FontSize | Cust.Expr,
        fontSize4         : [['calc(', 1.50, '*', gens.fontSize, ')']] as Prop.FontSize | Cust.Expr,
        fontSize5         : [['calc(', 1.25, '*', gens.fontSize, ')']] as Prop.FontSize | Cust.Expr,
        fontSize6         : [['calc(', 1.00, '*', gens.fontSize, ')']] as Prop.FontSize | Cust.Expr,
        
        fontFamily        : inherit  as Prop.FontFamily[]                               | Cust.Ref,
        fontWeight        : 500      as Prop.FontWeight                                 | Cust.Expr,
        fontStyle         : inherit  as Prop.FontStyle                                  | Cust.Ref,
        textDecoration    : inherit  as Prop.TextDecoration                             | Cust.Ref,
        lineHeight        : 1.25     as Prop.LineHeight                                 | Cust.Expr,
    
        color             : inherit  as Prop.Color                                      | Cust.Ref,
        
        marginBlockStart  : 0        as Prop.MarginBlockStart                           | Cust.Expr,
        marginBlockEnd    : '0.75em' as Prop.MarginBlockEnd                             | Cust.Expr,
        marginInlineStart : 0        as Prop.MarginInlineStart                          | Cust.Expr,
        marginInlineEnd   : 0        as Prop.MarginInlineEnd                            | Cust.Expr,

        subOpacity        : 0.8      as Prop.Opacity                                    | Cust.Expr,
    };
}, /*prefix: */'h');
export const cssProps = cssConfig.refs;
export default cssProps;



// define the css using configurable cssProps:
export function createCss<TCssProps extends typeof cssProps>(cssProps: TCssProps, classLevelDecl: (level: number) => string): JssStyle {
    const levels = [1,2,3,4,5,6];
    const stylesBuilder: { [key:string]: JssStyle[keyof JssStyle] } = {};
    


    // global styles for the [h1,h2,...,h6]
    stylesBuilder[levels.map(classLevelDecl).join(',')] = {
        extend     : cssProps as JssStyle,
        
        // delete unecessary prop:
        fontSize1  : null,
        fontSize2  : null,
        fontSize3  : null,
        fontSize4  : null,
        fontSize5  : null,
        fontSize6  : null,
        subOpacity : null,

        display    : 'block',

        // kill the last margin-end for the last element:
        '&:last-child': {
            marginBlockEnd: 0,
        },

        
        // make sub-title near the main title and apply margin to sub-title:
        [levels.reverse().map(classLevelDecl).map(cls => `& +${cls}`).join(',')]: {
            opacity: cssProps.subOpacity,



            // take over margin-start & margin-end for the next sub-title:

            // make sub-title near the main title:
            marginBlockStart: [['calc(0px -', cssProps.marginBlockEnd, ')']], // ignore the parent's margin-end by combating with *negative* margin-start

            // apply margin-end to sub-title:
            '&:not(:last-child)': {
                marginBlockEnd: cssProps.marginBlockEnd,
            },
        },
    } as JssStyle;



    // specific styles for *each* [h1,h2,...,h6]:
    for (const level of levels) {
        stylesBuilder[classLevelDecl(level)] = {
            fontSize: (cssProps as { [key:string]: any })[`fontSize${level}`],
        }
    }



    return stylesBuilder as JssStyle;
}
base.declareCss(createCss(cssProps, (level) => `h${level},.h${level}`));