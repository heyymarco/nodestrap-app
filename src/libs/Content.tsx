// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
}                           from 'jss'          // ts defs support for jss
import {
    PropEx,
}                           from './Css'        // ts defs support for jss
import CssConfig            from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.
import type {
    DictionaryOf,
}                           from './CssConfig'  // ts defs support for jss

// nodestrap (modular web components):
import colors               from './colors'     // configurable colors & theming defs
import spacers              from './spacers'    // configurable spaces defs
import {
    cssProps as ecssProps,
}                           from './BasicComponent'
import {
    default  as Indicator,
    IndicatorStylesBuilder,
}                           from './Indicator'
import type * as Indicators from './Indicator'



// styles:

export interface IContentStylesBuilder {
    // variants:
    contentTheme(theme: string, Theme: string): JssStyle
    contentSize(size: string, Size: string): JssStyle



    // states:
    contentThemesIf(): JssStyle
    contentStates(inherit : boolean): JssStyle



    // functions:
    contentPropsFn(): JssStyle



    // styles:
    contentBasicStyle(): JssStyle
}
export class ContentStylesBuilder extends IndicatorStylesBuilder implements IContentStylesBuilder {
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
    public /*override*/ theme(theme: string, Theme: string): JssStyle { return {
        extend: [
            super.theme(theme, Theme), // copy themes from base

            this.contentTheme(theme, Theme),
        ] as JssStyle,
    }}
    public /*override*/ size(size: string, Size: string): JssStyle { return {
        extend: [
            super.size(size, Size), // copy sizes from base

            this.contentSize(size, Size),
        ] as JssStyle,
    }}

    public /*virtual*/ contentTheme(theme: string, Theme: string): JssStyle { return {
        // customize the *themed* props:
    
        // overwrite some theme color with *softer* colors:
        [this.decl(this._passiveForegTh)]  :                 (colors as DictionaryOf<typeof colors>)[`${theme}Cont`],  // light on dark backg | dark on light backg with slightly color from background
        [this.decl(this._passiveBackgTh)]  : this.solidBackg((colors as DictionaryOf<typeof colors>)[`${theme}Thin`]), // thin opacity with slightly color from background
    }}
    public /*virtual*/ contentSize(size: string, Size: string): JssStyle { return {
        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, Size)),
    }}



    // states:
    public /*virtual*/ contentThemesIf(): JssStyle { return {} }
    public /*virtual*/ contentStates(inherit = false): JssStyle { return {
        extend: [
            //#region specific states
            //#region active, passive
            this.stateActivePassivating({ // [activating, actived, passivating]
                [this.decl(this._filterActivePassive)] : undefined as unknown as null, // delete from Indicator
            }),
            this.stateActive({ // [activating, actived]
                [this.decl(this._animActivePassive)]   : cssProps.animActive,   // override Indicator's anim active
            }),
            this.statePassivating({ // [passivating]
                [this.decl(this._animActivePassive)]   : cssProps.animPassive,  // override Indicator's anim passive
            }),
            //#endregion active, passive
            //#endregion specific states
        ] as JssStyle,
    }}

    public /*override*/ themesIfOld(): JssStyle { return {
        extend: [
            super.themesIfOld(), // copy themes from base

            this.contentThemesIf(),
        ] as JssStyle,
    }}
    public /*override*/ statesOld(inherit = false): JssStyle { return {
        extend: [
            super.statesOld(inherit), // copy states from base

            this.contentStates(inherit),
        ] as JssStyle,
    }}



    // functions:
    public /*virtual*/ contentPropsFn(): JssStyle { return {
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
            ecssProps.backg,
        ],
        // define a passive *backgrounds* func:
        [this.decl(this._passiveBackgFn)] : this.ref(
            this._outlinedBackgTg, // toggle outlined

            this._passiveBackgLy,
        ),
    }}
    public /*override*/ propsFnOld(): JssStyle { return {
        extend: [
            super.propsFnOld(), // copy functional props from base

            this.contentPropsFn(),
        ] as JssStyle,
    }}



    // styles:
    public /*virtual*/ contentBasicStyle(): JssStyle { return {
        // apply fn props:
        foreg : this.ref(this._passiveForegFn),
        backg : this.ref(this._passiveBackgFn),



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base

            this.contentBasicStyle(),
        ] as JssStyle,
    }}
}
export const styles = new ContentStylesBuilder();



// configs:

const cssConfig = new CssConfig(() => {
    // common css values:
    // const initial = 'initial';
    // const unset   = 'unset';
    // const none    = 'none';
    // const inherit = 'inherit';
    // const center  = 'center';
    // const middle  = 'middle';


    const keyframesActive    : PropEx.Keyframes = {
        from: {
            foreg: styles.ref(styles._passiveForegFn),
            backg: styles.ref(styles._passiveBackgFn),
        },
        to: {
            foreg: styles.ref(styles._foregFn),
            backg: styles.ref(styles._backgFn),
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


        // anim props:

        '@keyframes active'  : keyframesActive,      // override to Indicator
        '@keyframes passive' : keyframesPassive,     // override to Indicator
        animActive           : [['150ms', 'ease-out', 'both', keyframesActive ]], // override to Indicator
        animPassive          : [['300ms', 'ease-out', 'both', keyframesPassive]], // override to Indicator
    };
}, /*prefix: */'ct');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// react components:

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        Indicators.Props<TElement>
{
    // children:
    children? : React.ReactNode
}
export default function Content<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    // styles:
    const ctStyles = styles.useStyles();

    
    
    // jsx:
    return (
        <Indicator<TElement>
            // other props:
            {...props}


            // classes:
            mainClass={props.mainClass ?? ctStyles.main}
        />
    );
}