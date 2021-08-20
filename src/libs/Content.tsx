// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,

    
    // components:
    CssConfig,
}                           from './nodestrap'  // nodestrap's core
import spacers              from './spacers'    // configurable spaces defs
import {
    IndicatorStyles,
    IndicatorProps,
    Indicator,
}                           from './Indicator'



// styles:

export interface IContentStyles {
    // layouts:
    contentLayout()           : JssStyle
    
    
    
    // variants:
    contentSize(size: string) : JssStyle
}
export class ContentStyles extends IndicatorStyles implements IContentStyles {
    // layouts:
    public /*override*/ layout(): JssStyle { return {
        extend: [
            super.layout(), // copy layout from base

            this.contentLayout(),
        ] as JssStyle,
    }}
    public /*virtual*/ contentLayout(): JssStyle { return {
        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
    
    
    
    // variants:
    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base

            this.contentSize(size),
        ] as JssStyle,
    }}
    public /*virtual*/ contentSize(size: string): JssStyle { return {
        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}
}
export const contentStyles = new ContentStyles();



// configs:

const cssConfig = new CssConfig(() => {
    return {
        //#region spacings
        paddingInline        : spacers.default, // override to BasicComponent
        paddingBlock         : spacers.default, // override to BasicComponent
        paddingInlineSm      : spacers.sm,      // override to BasicComponent
        paddingBlockSm       : spacers.sm,      // override to BasicComponent
        paddingInlineLg      : spacers.lg,      // override to BasicComponent
        paddingBlockLg       : spacers.lg,      // override to BasicComponent
        //#endregion spacings
    };
}, /*prefix: */'ct');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// react components:

export interface ContentProps<TElement extends HTMLElement = HTMLElement>
    extends
        IndicatorProps<TElement>
{
    // children:
    children? : React.ReactNode
}
export default function Content<TElement extends HTMLElement = HTMLElement>(props: ContentProps<TElement>) {
    // styles:
    const styles = contentStyles.useStyles();

    
    
    // jsx:
    return (
        <Indicator<TElement>
            // other props:
            {...props}


            // classes:
            mainClass={props.mainClass ?? styles.main}
        />
    );
}
export { Content }