// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
}                           from 'jss'          // ts defs support for jss
import {
    PropEx,
    Cust,
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
}                           from './Element'
import {
    default  as Indicator,
    IndicatorStylesBuilder,
}                           from './Indicator'
import type * as Indicators from './Indicator'



// styles:

export interface IContentStylesBuilder {
    // themes:
    contentThemeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle
    contentSizeOf(size: string, Size: string, sizeProp: string): JssStyle



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



    // themes:
    public contentThemeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle { return {
        // customize the *themed* props:
    
        //#region overwrite base's themes with *softer* colors
        [this.decl(this._passiveForegTh)]  :                 (colors as DictionaryOf<typeof colors>)[`${theme}Cont`],  // light on dark backg | dark on light backg with slightly color from background
        [this.decl(this._passiveBackgTh)]  : this.solidBackg((colors as DictionaryOf<typeof colors>)[`${theme}Thin`]), // thin opacity with slightly color from background
        //#endregion overwrite base's themes with *softer* colors
    }}
    public contentSizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {
        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, Size)),
    }}

    public /*override*/ themeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle { return {
        extend: [
            super.themeOf(theme, Theme, themeProp, themeColor), // copy themes from base

            this.contentThemeOf(theme, Theme, themeProp, themeColor),
        ] as JssStyle,
    }}
    public /*override*/ sizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {
        extend: [
            super.sizeOf(size, Size, sizeProp), // copy sizes from base

            this.contentSizeOf(size, Size, sizeProp),
        ] as JssStyle,
    }}



    // states:
    public contentThemesIf(): JssStyle { return {} }
    public contentStates(inherit = false): JssStyle { return {
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

    public /*override*/ themesIf(): JssStyle { return {
        extend: [
            super.themesIf(), // copy themes from base

            this.contentThemesIf(),
        ] as JssStyle,
    }}
    public /*override*/ states(inherit = false): JssStyle { return {
        extend: [
            super.states(inherit), // copy states from base

            this.contentStates(inherit),
        ] as JssStyle,
    }}



    // functions:
    public contentPropsFn(): JssStyle { return {
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
    public /*override*/ propsFn(): JssStyle { return {
        extend: [
            super.propsFn(), // copy functional props from base

            this.contentPropsFn(),
        ] as JssStyle,
    }}



    // styles:
    public contentBasicStyle(): JssStyle { return {
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
        paddingInline        : spacers.default, // override to Element
        paddingBlock         : spacers.default, // override to Element
        paddingInlineSm      : spacers.sm,      // override to Element
        paddingBlockSm       : spacers.sm,      // override to Element
        paddingInlineLg      : spacers.lg,      // override to Element
        paddingBlockLg       : spacers.lg,      // override to Element


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
    const ctStyles = styles.useStyles();

    
    
    return (
        <Indicator<TElement>
            // other props:
            {...props}


            // classes:
            mainClass={props.mainClass ?? ctStyles.main}
        />
    );
}