// jss   (builds css  using javascript):
import { 
    create as createJss,
}                          from 'jss'          // base technology of our nodestrap components
import type { JssStyle }   from 'jss'          // ts defs support for jss

import jssPluginGlobal     from 'jss-plugin-global'

import { PropEx }          from './Css'        // ts defs support for jss
import CssConfig           from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.
import type {
    Dictionary,
    ValueOf,
}                          from './CssConfig'  // ts defs support for jss

// nodestrap (modular web components):
import {
    GenericElement,
    ElementStylesBuilder,
}                          from './Element'
import type * as Elements  from './Element'
import
    breakpoints,
    * as breakpoint        from './breakpoints'

// other supports:
import { pascalCase }      from 'pascal-case'



// configs:

const cssConfig = new CssConfig(() => {
    // common css values:
    // const initial = 'initial';
    // const unset   = 'unset';
    // const none    = 'none';
    // const inherit = 'inherit';
    // const center  = 'center';
    // const middle  = 'middle';


    return {
        //#region borders
        borderWidth  : 0, // strip out Element's border
        borderRadius : 0, // strip out Element's borderRadius
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



// jss:

const styleBreakpoints : JssStyle = {};
for (const bpName in breakpoints) {
    const BpName = pascalCase(bpName);

    const paddingInline = (cssProps as Dictionary<ValueOf<typeof cssProps>|undefined>)[`paddingInline${BpName}`];
    const paddingBlock  = (cssProps as Dictionary<ValueOf<typeof cssProps>|undefined>)[`paddingBlock${BpName}`];
    if (paddingInline || paddingBlock) {
        Object.assign(styleBreakpoints, breakpoint.mediaUp(bpName, {
            ':root': {
                [cssDecls.paddingInline] : paddingInline || null,
                [cssDecls.paddingBlock]  : paddingBlock  || null,
            },
        }));
    } // if
} // for

createJss().setup({plugins:[
    jssPluginGlobal(),
]})
.createStyleSheet({
    '@global': {
        ...styleBreakpoints,
    },
})
.attach();



// styles:

export class ContainerStylesBuilder extends ElementStylesBuilder {
    // variants:
    public /*override*/ sizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {
        extend: [
            super.sizeOf(size, Size, sizeProp), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, (() => {
            const cssPropsSize = this.filterSuffixProps(cssProps, Size);
            delete cssPropsSize.paddingInline;
            delete cssPropsSize.paddingBlock;

            return cssPropsSize;
        })()),
    }}



    // states:
    /* -- same as parent -- */



    // styles:
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
            '"...         blockStart       ..."',
            '"inlineStart  content   inlineEnd"',
            '"...          blockEnd        ..."',
        ]],


        
        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps

        // since we use grid as paddings, so the css paddings are not longer needed:
        paddingInline : null,
        paddingBlock  : null,
    }}
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(),         // copy basicStyle from base

            this.containerBasicStyle(), // applies responsive container functionality
        ] as JssStyle,
    }}
}
export const styles = new ContainerStylesBuilder();



// react components:

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        Elements.GenericProps<TElement>
{
    // children:
    children? : React.ReactNode
}
export default function Container<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    // styles:
    const conStyles = styles.useStyles();



    // jsx:
    return (
        <GenericElement<TElement>
            // other props:
            {...props}


            // classes:
            mainClass={props.mainClass ?? conStyles.main}
        />
    );
}