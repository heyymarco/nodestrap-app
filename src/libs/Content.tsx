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
    contentTheme(theme: string): JssStyle
    contentSize(size: string): JssStyle



    // states:
    contentActived()     : JssStyle
    contentActivating()  : JssStyle
    contentPassivating() : JssStyle
    contentPassived()    : JssStyle



    // functions:
    contentPropsFn(): PropList



    // styles:
    contentBasicStyle(): JssStyle
}
export class ContentStyles extends IndicatorStyles implements IContentStyles {
    //#region scoped css props
    //#region passive - foreground
    /**
     * passive themed foreground color.
     */
    public    readonly _passiveForegTh = 'passiveForegTh'

    /**
     * passive functional foreground color.
     */
    public    readonly _passiveForegFn = 'passiveForegFn'
    //#endregion passive - foreground



    //#region passive - background
    /**
     * passive themed background.
     */
    public    readonly _passiveBackgTh = 'passiveBackgTh'

    /**
     * passive functional backgrounds.
     */
    public    readonly _passiveBackgFn = 'passiveBackgFn'

    /**
     * passive layered backgrounds.
     */
    public    readonly _passiveBackgLy = 'passiveBackgLy'
    //#endregion passive - background
    //#endregion scoped css props



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
    }}
    
    public /*virtual*/ contentTheme(theme: string): JssStyle { return {
        // overwrite some theme color with *softer* colors:
        [this.decl(this._passiveForegTh)]  :                 (colors as DictionaryOf<typeof colors>)[`${theme}Cont`],  // light on dark backg | dark on light backg with slightly color from background
        [this.decl(this._passiveBackgTh)]  : this.solidBackg((colors as DictionaryOf<typeof colors>)[`${theme}Thin`]), // thin opacity with slightly color from background
    }}
    public /*virtual*/ contentSize(size: string): JssStyle { return {
        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}



    // states:
    public /*override*/ actived()     : JssStyle {
        return this.contentActived();
    }
    public /*override*/ activating()  : JssStyle {
        return this.contentActivating();
    }
    public /*override*/ passivating() : JssStyle {
        return this.contentPassivating();
    }
    public /*override*/ passived()    : JssStyle {
        return this.contentPassived();
    }

    public /*virtual*/ contentActived()     : JssStyle { return {
        [this.decl(this._filterActivePassive)] : cssProps.filterActive,
        [this.decl(this._animActivePassive)]   : bcssProps.animNone,
    }}
    public /*virtual*/ contentActivating()  : JssStyle { return {
        [this.decl(this._filterActivePassive)] : cssProps.filterActive,
        [this.decl(this._animActivePassive)]   : cssProps.animActive,
    }}
    public /*virtual*/ contentPassivating() : JssStyle { return {
        [this.decl(this._filterActivePassive)] : cssProps.filterActive,
        [this.decl(this._animActivePassive)]   : cssProps.animPassive,
    }}
    public /*virtual*/ contentPassived()    : JssStyle { return {
        [this.decl(this._filterActivePassive)] : bcssProps.filterNone,
        [this.decl(this._animActivePassive)]   : bcssProps.animNone,
    }}



    // functions:
    public /*override*/ propsFn(): PropList { return {
        ...super.propsFn(), // copy functional props from base
        
        ...this.contentPropsFn(),
    }}
    public /*virtual*/ contentPropsFn(): PropList { return {
        // define a passive *foreground* color func:
        [this.decl(this._passiveForegFn)] : this.ref(
            this._outlinedForegTg, // toggle outlined

            this._foregIfIf,       // first  priority
            this._passiveForegTh,  // second priority
            this._foregIf,         // third  priority
        ),

        // define a passive *backgrounds* layers:
        [this.decl(this._passiveBackgLy)] : [
            // top layer:
            this.ref(
                this._backgGradTg,
                this._backgNone,
            ),

            // middle layer:
            this.ref(
                this._backgIfIf,      // first  priority
                this._passiveBackgTh, // second priority
                this._backgIf,        // third  priority
            ),

            // bottom layer:
            bcssProps.backg,
        ],
        // define a passive *backgrounds* func:
        [this.decl(this._passiveBackgFn)] : this.ref(
            this._outlinedBackgTg, // toggle outlined

            this._passiveBackgLy,
        ),
    }}



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base

            this.contentBasicStyle(),
        ] as JssStyle,
    }}
    public /*virtual*/ contentBasicStyle(): JssStyle { return {
        // apply fn props:
        foreg : this.ref(this._passiveForegFn),
        backg : this.ref(this._passiveBackgFn),



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
}
export const contentStyles = new ContentStyles();



// configs:

const cssConfig = new CssConfig(() => {
    const keyframesActive    : PropEx.Keyframes = {
        from: {
            foreg: contentStyles.ref(contentStyles._passiveForegFn),
            backg: contentStyles.ref(contentStyles._passiveBackgFn),
        },
        to: {
            foreg: contentStyles.ref(contentStyles._foregFn),
            backg: contentStyles.ref(contentStyles._backgFn),
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