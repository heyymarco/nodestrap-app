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
    return {
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
    // themes:
    /* -- same as parent -- */



    // states:
    /* -- same as parent -- */



    // styles:
    /**
     * Applies responsive container functionality - without any other styling.
     * @returns A `JssStyle` represents a responsive container style definition.
     */
    public basicContainerStyle(): JssStyle { return {
        extend: [
            this.filterGeneralProps(cssProps), // apply *general* cssProps
        ] as JssStyle,
    }}
    public basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(),         // copy basicStyle from base

            this.basicContainerStyle(), // applies responsive container functionality
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
    const conStyles = styles.useStyles();



    return (
        <GenericElement<TElement>
            // other props:
            {...props}


            // classes:
            classes={[
                // main:
                (props.classes ? null : conStyles.main),


                // additionals:
                ...(props.classes ?? []),
            ]}
        />
    );
}