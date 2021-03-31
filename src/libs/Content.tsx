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
    protected readonly _colorActiveTh = 'colorActiveTh'

    /**
     * actived functional foreground color.
     */
    public    readonly _colorActiveFn = 'colorActiveFn'

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
    public themeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle { return {
        // create themes from zero, not copy from base's themes
        


        // customize the *themed* props:
    
        [this.decl(this._colorTh)]         :                 (colors as DictionaryOf<typeof colors>)[`${theme}Cont`],  // light on dark backg | dark on light backg with slightly color from background
        [this.decl(this._backgTh)]         : this.solidBackg((colors as DictionaryOf<typeof colors>)[`${theme}Thin`]), // thin opacity with slightly color from background
        [this.decl(this._colorOutlinedTh)] : themeColor,

        [this.decl(this._colorActiveTh)]   : (colors as DictionaryOf<typeof colors>)[`${theme}Text`], // light on dark backg | dark on light backg
        [this.decl(this._backgActiveTh)]   : this.solidBackg(themeColor),
    }}
    protected sizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {
        extend: super.sizeOf(size, Size, sizeProp),



        // overwrite the global props with the *prop{Size}*:

        [cssDecls.paddingX] : (cssProps as DictionaryOf<typeof cssProps>)[`paddingX${Size}`],
        [cssDecls.paddingY] : (cssProps as DictionaryOf<typeof cssProps>)[`paddingY${Size}`],
    }}
    protected outlined(): JssStyle {
        // unlike on Indicator/Element,
        // on Control the outlined only be applied
        // * if not-actived
        return this.stateNotActive(
            super.outlined()
        );
    }



    // states:
    protected fnProps(): JssStyle { return {
        extend: super.fnProps(),



        // define an actived *foreground* color func:
        [this.decl(this._colorActiveFn)] : this.ref(
            this._colorActiveTh, // second priority
            this._colorIf,       // third  priority
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
    protected states(): JssStyle { return {
        extend:[
            super.states(),



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
    }}



    // styles:
    protected basicStyle(): JssStyle { return {
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

            color: styles.ref(styles._colorFn),
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

            color: styles.ref(styles._colorActiveFn),
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