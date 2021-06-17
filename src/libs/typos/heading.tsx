// jss   (builds css  using javascript):
import type { JssStyle }   from 'jss'           // ts defs support for jss
import { Prop, Cust, }     from '../Css'        // ts defs support for jss
import CssConfig           from '../CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.
import type {
    Dictionary,
}                          from '../CssConfig'  // ts defs support for jss

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
    
        foreg             : inherit  as Prop.Color                                      | Cust.Ref,
        
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
export function createStyle<TCssProps extends typeof cssProps>(cssProps: TCssProps, classLevelDecl: (level: number) => string[], levels = [1,2,3,4,5,6]): JssStyle { return {
    //#region global styles for the [h1,h2,...,h6]
    [levels.map(classLevelDecl).map((clss) => clss.join(',')).join(',')]: {
        // layout:
        display : 'block',



        // spacings:
        '&:last-child': {
            marginBlockEnd: 0, // kill the last marginEnd for the last element
        },

        

        //#region make sub-title closer to the main-title
        /**
         * treats the next title as sub-title
         * makes it closer to the main-title by applying a negative marginStart into it
         * makes the content after sub-title even further by applying main-title's marginEnd into it
         */
        [levels.map(classLevelDecl).map((clss) => clss.map((cls) => `&+${cls}`).join(',')).join(',')]: {
            // appearances:
            opacity: cssProps.subOpacity,



            // spacings:
            //#region take over marginStart & marginEnd to the next sub-title
            // make sub-title closer to the main-title:
            marginBlockStart: [['calc(0px -', cssProps.marginBlockEnd, ')']], // cancel-out parent's marginEnd with negative marginStart

            // apply new marginEnd to sub-title:
            '&:not(:last-child)': {
                marginBlockEnd: cssProps.marginBlockEnd,
            },
            //#endregion take over marginStart & marginEnd to the next sub-title
        },
        //#endregion make sub-title closer to the main-title



        // customize:
        ...cssProps,
        
        //#region delete unnecessary props
        fontSize1  : undefined as unknown as null,
        fontSize2  : undefined as unknown as null,
        fontSize3  : undefined as unknown as null,
        fontSize4  : undefined as unknown as null,
        fontSize5  : undefined as unknown as null,
        fontSize6  : undefined as unknown as null,
        subOpacity : undefined as unknown as null,
        //#endregion delete unnecessary props
    },
    //#endregion global styles for the [h1,h2,...,h6]



    //#region specific styles for *each* [h1,h2,...,h6]
    ...((): JssStyle => {
        const styles: Dictionary<JssStyle> = {};
        for (const level of levels) {
            styles[classLevelDecl(level).join(',')] = {
                fontSize: (cssProps as Dictionary<Cust.Ref>)[`fontSize${level}`],
            };
        } // for
        return styles as JssStyle;
    })(),
    //#endregion specific styles for *each* [h1,h2,...,h6]
}}
base.declareCss(createStyle(cssProps, (level) => [`h${level}`, `.h${level}`]));