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
    /**
     * actived themed foreground color.
     */
    protected readonly _foregActiveTh = 'foregActiveTh'

    /**
     * actived functional foreground color.
     */
    public    readonly _foregActiveFn = 'foregActiveFn'

    /**
     * actived themed background.
     */
    protected readonly _backgActiveTh = 'backgActiveTh'

    /**
     * actived functional backgrounds.
     */
    public    readonly _backgActiveFn = 'backgActiveFn'
    //#endregion scoped css props



    // themes:
    public contentThemeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle { return {
        // customize the *themed* props:
    
        [this.decl(this._foregTh)]         :                 (colors as DictionaryOf<typeof colors>)[`${theme}Cont`],  // light on dark backg | dark on light backg with slightly color from background
        [this.decl(this._backgTh)]         : this.solidBackg((colors as DictionaryOf<typeof colors>)[`${theme}Thin`]), // thin opacity with slightly color from background
        [this.decl(this._foregOutlinedTh)] : themeColor,

        [this.decl(this._foregActiveTh)]   : (colors as DictionaryOf<typeof colors>)[`${theme}Text`], // light on dark backg | dark on light backg
        [this.decl(this._backgActiveTh)]   : this.solidBackg(themeColor),
    }}
    public contentSizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {
        // overwrite the global props with the *prop{Size}*:

        [cssDecls.paddingX] : (cssProps as DictionaryOf<typeof cssProps>)[`paddingX${Size}`],
        [cssDecls.paddingY] : (cssProps as DictionaryOf<typeof cssProps>)[`paddingY${Size}`],
    }}
    public contentOutlined(): JssStyle {
        // unlike on Indicator/Element,
        // on Control the outlined only be applied
        // * if not-actived
        return this.stateNotActive(
            super.outlined()
        );
    }

    public themeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle { return {
        extend: [
            // create themes from zero, not copy from base's themes
            // super.themeOf(theme, Theme, themeProp, themeColor),

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
            this.contentOutlined(),
        ] as JssStyle,
    }}



    // states:
    public contentFnProps(): JssStyle { return {
        // define an actived *foreground* color func:
        [this.decl(this._foregActiveFn)] : this.ref(
            this._foregActiveTh, // second priority
            this._foregIf,       // third  priority
        ),

        // define an actived *backgrounds* func:
        [this.decl(this._backgActiveFn)] : [
            // top layer:
            this.ref(
                this._backgGradTg,
                this._backgNone,
            ),

            // middle layer:
            this.ref(
                this._backgActiveTh, // second priority
                this._backgIf,       // third  priority
            ),

            // bottom layer:
            ecssProps.backg,
        ],
    }}
    public contentThemesIf(): JssStyle { return {}; }
    public contentStates(): JssStyle { return {
        //#region specific states
        extend: [
            this.stateActivePassive({ // [activating, actived, passivating]
                [this.decl(this._filterActivePassive)] : cssProps.filterActive, // override Indicator's filter active
            }),
            this.stateActive({ // [activating, actived]
                [this.decl(this._animActivePassive)]   : cssProps.animActive,   // override Indicator's anim active
            }),
            this.statePassivating({ // [passivating]
                [this.decl(this._animActivePassive)]   : cssProps.animPassive,  // override Indicator's anim passive
            }),
        ] as JssStyle,
        //#endregion specific states
    }}

    protected fnProps(): JssStyle { return {
        extend: [
            super.fnProps(), // copy functional props from base

            this.contentFnProps(),
        ] as JssStyle,
    }}
    protected states(): JssStyle { return {
        extend: [
            super.states(), // copy states from base

            this.contentStates(),
        ] as JssStyle,
    }}



    // styles:
    public basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(),
            this.filterGeneralProps(cssProps), // apply *general* cssProps
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
            //#region copy from Indicator
            filter: [[
                ecssProps.filter,
                styles.ref(styles._filterEnableDisable), // last priority, rarely happened
             // styles.ref(styles._filterActivePassive),
                styles.ref(styles._filterHoverLeave),    // first priority, serving smooth responsiveness
            ]],
            //#endregion copy from Indicator

            color: styles.ref(styles._foregFn),
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

            color: styles.ref(styles._foregActiveFn),
            backg: styles.ref(styles._backgActiveFn),
        },
    };
    const keyframesPassive   : PropEx.Keyframes = {
        from : keyframesActive.to,
        to   : keyframesActive.from,
    };

    return {
        paddingX             : spacers.default, // override to Element
        paddingY             : spacers.default, // override to Element
        paddingXSm           : spacers.sm,      // override to Element
        paddingYSm           : spacers.sm,      // override to Element
        paddingXLg           : spacers.lg,      // override to Element
        paddingYLg           : spacers.lg,      // override to Element


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

export interface Props
    extends
        Indicators.Props
{
    // children:
    children? : React.ReactNode
}
export default function Content(props: Props) {
    const ctStyles = styles.useStyles();

    
    
    return (
        <Indicator
            // other props:
            {...props}


            // classes:
            classes={[
                // main:
                (props.classes ? null : ctStyles.main),


                // additionals:
                ...(props.classes ?? []),
            ]}
        />
    );
}