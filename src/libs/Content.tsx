// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    PropEx,
    DictionaryOf,
    PropList,

    
    // components:
    CssConfig,
}                           from './nodestrap'  // nodestrap's core
import colors               from './colors'     // configurable colors & theming defs
import spacers              from './spacers'    // configurable spaces defs
import {
    cssProps as bcssProps,
}                           from './BasicComponent'
import {
    IndicatorStyles,
    IndicatorProps,
    Indicator,
}                           from './Indicator'



// styles:

export interface IContentStyles {
    // variants:
    contentTheme(theme: string) : JssStyle
    contentSize(size: string)   : JssStyle



    // states:
    contentActived()     : JssStyle
    contentActivating()  : JssStyle
    contentPassivating() : JssStyle



    // functions:
    contentPropsFn(): PropList



    // styles:
    contentBasicStyle(): JssStyle
}
export class ContentStyles extends IndicatorStyles implements IContentStyles {
    // variants:
    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base

            this.contentSize(size),
        ] as JssStyle,
    }}
    
    public /*virtual*/ contentTheme(theme: string): JssStyle { return {
    }}
    public /*virtual*/ contentSize(size: string): JssStyle { return {
        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}



    // states:
    public /*override*/ actived()     : JssStyle { return {
        extend: [
            super.actived(), // copy actived from base

            this.contentActived(),
        ] as JssStyle,
    }}
    public /*override*/ activating()  : JssStyle { return {
        extend: [
            super.activating(), // copy activating from base

            this.contentActivating(),
        ] as JssStyle,
    }}
    public /*override*/ passivating() : JssStyle { return {
        extend: [
            super.passivating(), // copy passivating from base

            this.contentPassivating(),
        ] as JssStyle,
    }}

    public /*virtual*/ contentActived()     : JssStyle { return {
        [this.decl(this._filterActivePassive)] : cssProps.filterActive,
    }}
    public /*virtual*/ contentActivating()  : JssStyle { return {
        [this.decl(this._filterActivePassive)] : cssProps.filterActive,
        [this.decl(this._animActivePassive)]   : cssProps.animActive,
    }}
    public /*virtual*/ contentPassivating() : JssStyle { return {
        [this.decl(this._filterActivePassive)] : cssProps.filterActive,
        [this.decl(this._animActivePassive)]   : cssProps.animPassive,
    }}



    // functions:
    public /*override*/ propsFn(): PropList { return {
        ...super.propsFn(), // copy functional props from base
        
        ...this.contentPropsFn(),
    }}
    public /*virtual*/ contentPropsFn(): PropList { return {
        //#region finals
        // define a final *foreground* color func:
        [this.decl(this._foreg)]     : this.ref(
            this._activeForegTg,   // toggle active
            this._outlinedForegTg, // toggle outlined
            this._mildForegFn,
        ),

        // define a final *backgrounds* func:
        [this.decl(this._backg)]     : this.ref(
            this._activeBackgTg,   // toggle active
            this._outlinedBackgTg, // toggle outlined
            this._mildBackgFn,
        ),
        //#endregion finals
    }}



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base

            this.contentBasicStyle(),
        ] as JssStyle,
    }}
    public /*virtual*/ contentBasicStyle(): JssStyle { return {
        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
}
export const contentStyles = new ContentStyles();



// configs:

const cssConfig = new CssConfig(() => {
    const keyframesActive    : PropEx.Keyframes = {
        from: {
            foreg       : contentStyles.ref(contentStyles._outlinedForegTg, contentStyles._mildForegFn),
            backg       : contentStyles.ref(contentStyles._outlinedBackgTg, contentStyles._mildBackgFn),
            borderColor : contentStyles.ref(contentStyles._outlinedForegTg, contentStyles._borderFn),
        },
        to: {
            foreg       : contentStyles.ref(contentStyles._foregFn),
            backg       : contentStyles.ref(contentStyles._backgFn),
            borderColor : contentStyles.ref(contentStyles._borderFn),
        },
    };
    const keyframesPassive   : PropEx.Keyframes = {
        from : keyframesActive.to,
        to   : keyframesActive.from,
    };

    
    
    return {
        //#region spacings
        paddingInline        : spacers.default, // override to Element
        paddingBlock         : spacers.default, // override to Element
        paddingInlineSm      : spacers.sm,      // override to Element
        paddingBlockSm       : spacers.sm,      // override to Element
        paddingInlineLg      : spacers.lg,      // override to Element
        paddingBlockLg       : spacers.lg,      // override to Element
        //#endregion spacings


        
        //#region animations
        filterActive         : bcssProps.filterNone,

        '@keyframes active'  : keyframesActive,  // override to Indicator
        '@keyframes passive' : keyframesPassive, // override to Indicator
        animActive           : [['150ms', 'ease-out', 'both', keyframesActive ]], // override to Indicator
        animPassive          : [['300ms', 'ease-out', 'both', keyframesPassive]], // override to Indicator
        //#endregion animations
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