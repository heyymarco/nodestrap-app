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

export class ContentStylesBuilder extends IndicatorStylesBuilder {
    //#region scoped css props
    //#region active - foreground
    /**
     * actived themed foreground color.
     */
    public    readonly _activeForegTh = 'activeForegTh'

    /**
     * actived functional foreground color.
     */
    public    readonly _activeForegFn = 'activeForegFn'
    //#endregion active - foreground



    //#region active - background
    /**
     * actived themed background.
     */
    public    readonly _activeBackgTh = 'activeBackgTh'

    /**
     * actived functional backgrounds.
     */
    public    readonly _activeBackgFn = 'activeBackgFn'
    //#endregion active - background
    //#endregion scoped css props



    // themes:
    public contentThemeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle { return {
        // customize the *themed* props:
    
        [this.decl(this._foregTh)]         :                 (colors as DictionaryOf<typeof colors>)[`${theme}Cont`],  // light on dark backg | dark on light backg with slightly color from background
        [this.decl(this._backgTh)]         : this.solidBackg((colors as DictionaryOf<typeof colors>)[`${theme}Thin`]), // thin opacity with slightly color from background

        [this.decl(this._activeForegTh)]   : (colors as DictionaryOf<typeof colors>)[`${theme}Text`], // light on dark backg | dark on light backg
        [this.decl(this._activeBackgTh)]   : this.solidBackg(themeColor),
    }}
    public contentSizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {
        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, Size)),
    }}
    public contentOutlined(): JssStyle { return {}; }

    public themeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle { return {
        extend: [
            super.themeOf(theme, Theme, themeProp, themeColor), // copy themes from base

            this.contentThemeOf(theme, Theme, themeProp, themeColor),
        ] as JssStyle,
    }}
    public sizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {
        extend: [
            super.sizeOf(size, Size, sizeProp), // copy sizes from base

            this.contentSizeOf(size, Size, sizeProp),
        ] as JssStyle,
    }}
    public outlined(): JssStyle { return {
        extend: [
            super.outlined(),

            this.contentOutlined(),
        ] as JssStyle,
    }}



    // states:
    public contentThemesIf(): JssStyle { return {}; }
    public contentStates(inherit = false): JssStyle { return {
        extend: [
            //#region specific states
            //#region active, passive
            this.stateActivePassivating({ // [activating, actived, passivating]
                [this.decl(this._filterActivePassive)] : cssProps.filterActive, // override Indicator's filter active
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

    protected themesIf(): JssStyle { return {
        extend: [
            super.themesIf(), // copy themes from base

            this.contentThemesIf(),
        ] as JssStyle,
    }}
    protected states(inherit = false): JssStyle { return {
        extend: [
            super.states(inherit), // copy states from base

            this.contentStates(inherit),
        ] as JssStyle,
    }}



    // fn props:
    public contentFnProps(): JssStyle { return {
        // define an actived *foreground* color func:
        [this.decl(this._activeForegFn)] : this.ref(
            this._foregIfIf,     // first  priority
            this._activeForegTh, // second priority
            this._foregIf,       // third  priority
        ),

        // define an actived *backgrounds* func:
        [this.decl(this._activeBackgFn)] : [
            // top layer:
            this.ref(
                this._backgGradTg,
                this._backgNone,
            ),

            // middle layer:
            this.ref(
                this._backgIfIf,     // first  priority
                this._activeBackgTh, // second priority
                this._backgIf,       // third  priority
            ),

            // bottom layer:
            ecssProps.backg,
        ],
    }}
    protected fnProps(): JssStyle { return {
        extend: [
            super.fnProps(), // copy functional props from base

            this.contentFnProps(),
        ] as JssStyle,
    }}



    // styles:
    public basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(),
        ] as JssStyle,



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
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
            //#region copy from Indicator
            filter: [[
                ecssProps.filter,
                styles.ref(styles._filterEnableDisable), // last priority, rarely happened
             // styles.ref(styles._filterActivePassive),
                styles.ref(styles._filterHoverLeave),    // first priority, serving smooth responsiveness
            ]],
            //#endregion copy from Indicator

            foreg: styles.ref(styles._foregFn),
            backg: styles.ref(styles._backgFn),
        },
        to: {
            //#region copy from Indicator
            filter: [[
                ecssProps.filter,
                styles.ref(styles._filterEnableDisable), // last priority, rarely happened
                styles.ref(styles._filterActivePassive),
                styles.ref(styles._filterHoverLeave),    // first priority, serving smooth responsiveness
            ]],
            //#endregion copy from Indicator

            foreg: styles.ref(styles._activeForegFn),
            backg: styles.ref(styles._activeBackgFn),
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

        filterActive         : ecssProps.filterNone, // override to Indicator

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


            // main:
            mainClass={props.mainClass ?? ctStyles.main}
        />
    );
}