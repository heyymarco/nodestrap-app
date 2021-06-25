// react (builds html using javascript):
import {
    default as React,
}                           from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    PropEx,
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



// styles:

export class ContainerStyles extends BasicComponentStyles {
    // variants:
    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base
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



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(),         // copy basicStyle from base

            this.containerBasicStyle(), // applies responsive container functionality
        ] as JssStyle,



        // layout:
        display: 'block',
    }}
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


            // variants:
            mild={props.mild ?? true}


            // classes:
            mainClass={props.mainClass ?? styles.main}
        />
    );
}
export { Container }