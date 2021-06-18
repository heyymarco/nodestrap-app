// react (builds html using javascript):
import {
    default as React,
}                           from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    PropEx,
    ClassList,
    PropList,

    
    // components:
    CssConfig,
}                           from './nodestrap'  // nodestrap's core
import
    breakpoints,
    * as breakpoint         from './breakpoints'
import {
    BasicComponentStyles,
    BasicComponentProps,
    BasicComponent,
}                           from './BasicComponent'
import {
    IContentStyles,
    contentStyles,
}                           from './Content'



// styles:

export class ContainerStyles extends BasicComponentStyles implements IContentStyles {
    // variants:
    public /*override*/ theme(theme: string): JssStyle { return {
        extend: [
            super.theme(theme), // copy themes from base
            
            this.contentTheme(theme),
        ] as JssStyle,
    }}
    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base

            this.contentSize(size),
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, (() => {
            const cssPropsSize = this.filterSuffixProps(cssProps, size);

            // padding(Inline|Block) are already handled by mediaBreakpoints => delete them:
            delete cssPropsSize.paddingInline;
            delete cssPropsSize.paddingBlock;

            return cssPropsSize;
        })()),
    }}

    public /*implement*/ contentTheme(theme: string): JssStyle {
        return contentStyles.contentTheme(theme); // copy themes from Content
    }
    public /*implement*/ contentSize(size: string): JssStyle {
        return contentStyles.contentSize(size); // copy sizes from Content
    }



    // states:
    public /*override*/ states(inherit: boolean): ClassList { return [
        ...super.states(inherit), // copy states from base

        ...this.contentStates(inherit),
    ]}
    public /*implement*/ contentStates(inherit: boolean): ClassList {
        return contentStyles.contentStates(inherit); // copy states from Content
    }



    // functions:
    public /*override*/ propsFn(): PropList { return {
        ...super.propsFn(), // copy functional props from base
        
        ...this.contentPropsFn(),
    }}
    public /*implement*/ contentPropsFn(): PropList {
        return contentStyles.contentPropsFn(); // copy functional props from Content
    }



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(),         // copy basicStyle from base

            this.contentBasicStyle(),
            this.containerBasicStyle(), // applies responsive container functionality
        ] as JssStyle,



        // layout:
        display: 'block',
    }}
    public /*implement*/ contentBasicStyle(): JssStyle {
        return contentStyles.contentBasicStyle(); // copy basicStyle from Content
    }
    /**
     * Applies responsive container functionality - without any other styling.
     * @returns A `JssStyle` represents a responsive container style definition.
     */
    public /*virtual*/ containerBasicStyle(): JssStyle { return {
        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
    /**
     * Applies responsive container functionality using css grid - without any other styling.
     * @returns A `JssStyle` represents a responsive container style definition using css grid.
     */
    public /*virtual*/ containerGridBasicStyle(): JssStyle { return {
        // layout:
        display             : 'grid',
        gridTemplateRows    : [[cssProps.paddingBlock,  'auto', cssProps.paddingBlock ]],
        gridTemplateColumns : [[cssProps.paddingInline, 'auto', cssProps.paddingInline]],
        gridTemplateAreas   : [[
            '"........... blockStart ........."',
            '"inlineStart  content   inlineEnd"',
            '"...........  blockEnd  ........."',
        ]],


        
        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps

        // since we use grid as paddings, so the css paddings are not longer needed:
        paddingInline : null,
        paddingBlock  : null,
    }}

    public /*override*/ globalStyle(): JssStyle { return {
        // *extend* doesn't work on global
        // extend: [
        //     super.globalStyle(), // copy globalStyle from base
        //
        //     this.mediaBreakpoints(),
        // ] as JssStyle,

        ...super.globalStyle(), // copy globalStyle from base
        ...this.mediaBreakpoints(),
    }}
    public /*virtual*/ mediaBreakpoints(): JssStyle {
        // *extend* doesn't work on global
        // so we use Object.assign() to extend the breakpoint[]
        return Object.assign({}, ...Object.keys(breakpoints).map((bpName) =>
            breakpoint.mediaUp(bpName, {
                // doubling the :root to win with CssConfig
                ':root:root': this.mediaBreakpoint(bpName),
            })
        ));
    }
    public /*virtual*/ mediaBreakpoint(breakpoint: string): JssStyle { return {
        // overwrites propName = propName{Breakpoint}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, breakpoint)),
    }}
}
export const containerStyles = new ContainerStyles();



// configs:

const cssConfig = new CssConfig(() => {
    return {
        //#region borders
        borderWidth  : 0, // strip out BasicComponent's border
        borderRadius : 0, // strip out BasicComponent's borderRadius
        //#endregion borders
        
        //#region spacings
        paddingInline    : '12px' as PropEx.Length,
        paddingBlock     :  '9px' as PropEx.Length,
    
        paddingInlineSm  : '24px' as PropEx.Length,
        paddingBlockSm   : '18px' as PropEx.Length,
    
        paddingInlineMd  : '36px' as PropEx.Length,
        paddingBlockMd   : '27px' as PropEx.Length,
    
        paddingInlineLg  : '48px' as PropEx.Length,
        paddingBlockLg   : '36px' as PropEx.Length,
    
        paddingInlineXl  : '60px' as PropEx.Length,
        paddingBlockXl   : '45px' as PropEx.Length,
    
        paddingInlineXxl : '72px' as PropEx.Length,
        paddingBlockXxl  : '54px' as PropEx.Length,
        //#endregion spacings
    };
}, /*prefix: */'con');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// react components:

export interface ContainerProps<TElement extends HTMLElement = HTMLElement>
    extends
        BasicComponentProps<TElement>
{
    // children:
    children? : React.ReactNode
}
export default function Container<TElement extends HTMLElement = HTMLElement>(props: ContainerProps<TElement>) {
    // styles:
    const styles = containerStyles.useStyles();



    // jsx:
    return (
        <BasicComponent<TElement>
            // other props:
            {...props}


            // classes:
            mainClass={props.mainClass ?? styles.main}
        />
    );
}
export { Container }