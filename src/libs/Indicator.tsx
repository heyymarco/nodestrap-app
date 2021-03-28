// react (builds html using javascript):
import
    React, {
    useState,
}                          from 'react'             // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
}                          from 'jss'               // ts defs support for jss
import {
    PropEx,
}                          from './Css'             // ts defs support for jss
import CssPropsManager     from './CssPropsManager' // A *css custom property* manager that manages & updates the *css props* stored at specified `rule`.

// nodestrap (modular web components):
import colors              from './colors'          // configurable colors & theming defs
import {
    default  as Element,
    cssProps as ecssProps,
    ElementStylesBuilder,
}                          from './Element'
import type * as Elements  from './Element'



// styles:

export class IndicatorStylesBuilder extends ElementStylesBuilder {
    //#region scoped css props
    /**
     * active unthemed foreground color.
     */
    protected readonly _colorIfAct          = 'colorIfAct'

    /**
     * active unthemed background color.
     */
    protected readonly _backgIfAct          = 'backgIfAct'

    /**
     * active unthemed foreground color - at outlined state.
     */
    protected readonly _colorOutlinedIfAct  = 'colorOutlinedIfAct'



    // anim props:

    public    readonly _filterEnableDisable = 'filterEnableDisable'
    protected readonly _animEnableDisable   = 'animEnableDisable'

    public    readonly _filterHoverLeave    = 'filterHoverLeave' // will be used    in Control
 // protected readonly _animHoverLeave      = 'animHoverLeave'   // will be defined in Control

    public    readonly _filterActivePassive = 'filterActivePassive'
    protected readonly _animActivePassive   = 'animActivePassive'
    //#endregion scoped css props



    //#region mixins
    protected stateEnable(content: JssStyle): JssStyle { return {
        '&.enable': content,
    }}
    protected stateNotEnable(content: JssStyle): JssStyle { return {
        '&:not(.enable)': content,
    }}
    protected stateDisabling(content: JssStyle): JssStyle { return {
        '&.disable': content,
    }}
    protected stateDisable(content: JssStyle): JssStyle { return {
        '&.disable,&.disabled,&:disabled': content,
    }}
    protected stateNotDisable(content: JssStyle): JssStyle { return {
        '&:not(.disable):not(.disabled):not(:disabled)': content,
    }}
    protected stateEnableDisable(content: JssStyle): JssStyle { return {
        '&.enable,&.disable,&.disabled,&:disabled': content,
    }}
    protected stateNotEnableDisable(content: JssStyle): JssStyle { return {
        '&:not(.enable):not(.disable):not(.disabled):not(:disabled)': content,
    }}
    protected stateNotEnablingDisabling(content: JssStyle): JssStyle { return {
        '&:not(.enable):not(.disable)': content,
    }}
    
    // non-pseudo active only
    protected stateActivating(content: JssStyle): JssStyle { return {
        '&.active': content,
    }}
    protected stateActive(content: JssStyle): JssStyle { return {
        '&.active,&.actived': content,
    }}
    protected stateNotActive(content: JssStyle): JssStyle { return {
        '&:not(.active):not(.actived)': content,
    }}
    protected statePassivating(content: JssStyle): JssStyle { return {
        '&.passive': content,
    }}
    protected stateNotPassive(content: JssStyle): JssStyle { return {
        '&:not(.passive)': content,
    }}
    protected stateActivePassive(content: JssStyle): JssStyle { return {
        '&.active,&.actived,&.passive': content,
    }}
    protected stateNotActivePassive(content: JssStyle): JssStyle { return {
        '&:not(.active):not(.actived):not(.passive)': content,
    }}
    protected stateNotActivatingPassivating(content: JssStyle): JssStyle { return {
        '&:not(.active):not(.passive)': content,
    }}
    
    protected applyStateNoAnimStartup(): JssStyle {
        return this.stateNotEnablingDisabling(
            this.stateNotActivatingPassivating({
                animationDuration: [['0ms'], '!important'],
            })
        );
    }
    protected applyStateActive(): JssStyle { return {
        // apply active (primary) colors:
        [this.decl(this._colorIf)]         : this.ref(this._colorIfAct),
        [this.decl(this._backgIf)]         : this.ref(this._backgIfAct),
        [this.decl(this._colorOutlinedIf)] : this.ref(this._colorOutlinedIfAct),
    }}
    //#endregion mixins



    // themes:
    // -- same as parent --



    // states:
    protected fnProps(): JssStyle { return {
        extend: super.fnProps(),



        '&.active,&.actived': { // if activated programmatically (not by user input)
            // define an *animations* func:
            [this.decl(this._animFn)]: [
                ecssProps.anim,
                this.ref(this._animActivePassive), // 1st : ctrl already pressed, move to the least priority
                this.ref(this._animEnableDisable), // 4th : ctrl enable/disable
            ],

            '&.disabled,&:disabled:not(.disable)': { // if ctrl was disabled programatically
                // define an *animations* func:
                [this.decl(this._animFn)]: [
                    ecssProps.anim,
                    this.ref(this._animEnableDisable), // 1st : ctrl already disabled, move to the least priority
                    this.ref(this._animActivePassive), // 4th : ctrl deactivated programatically, move to moderate priority
                ],
            },
        },

        // define an *animations* func:
        [this.decl(this._animFn)]: [
            ecssProps.anim,
            this.ref(this._animEnableDisable), // 1st : ctrl must be enable
            this.ref(this._animActivePassive), // 4th : ctrl got pressed
        ],
    }}
    protected themesIf(): JssStyle { return {
        extend: super.themesIf(),



        // define *active* colors:
        [this.decl(this._colorIfAct)]          : colors.primaryText,
        [this.decl(this._backgIfAct)]          : `linear-gradient(${colors.primary},${colors.primary})`,
        [this.decl(this._colorOutlinedIfAct)]  : colors.primary,
    }}
    protected states(): JssStyle { return {
        // all initial states are none:

        [this.decl(this._filterEnableDisable)] : ecssProps.filterNone,
        [this.decl(this._animEnableDisable)]   : ecssProps.animNone,

        [this.decl(this._filterHoverLeave)]    : ecssProps.filterNone, // supports for control

        [this.decl(this._filterActivePassive)] : ecssProps.filterNone,
        [this.decl(this._animActivePassive)]   : ecssProps.animNone,

        // specific states:
        extend:[
            super.states(),



            this.stateEnableDisable({ // [enabling, disabling, disabled]
                [this.decl(this._filterEnableDisable)] : cssProps.filterDisable,
            }),
            this.stateEnable({ // [enabling]
                [this.decl(this._animEnableDisable)]   : cssProps.animEnable,
            }),
            this.stateDisable({ // [disabling, disabled]
                [this.decl(this._animEnableDisable)]   : cssProps.animDisable,
            }),
            { // [disabled]
                '&.disabled,&:disabled:not(.disable)'  : // if ctrl was disabled programatically, disable first animation
                    this.applyStateNoAnimStartup(),
            },


            this.stateActivePassive({ // [activating, actived, passivating]
                [this.decl(this._filterActivePassive)] : cssProps.filterActive,
            }),
            this.stateActive({ // [activating, actived]
                [this.decl(this._animActivePassive)]   : cssProps.animActive,

                extend:[
                    this.applyStateActive(),
                ] as JssStyle,
            }),
            this.statePassivating({ // [passivating]
                [this.decl(this._animActivePassive)]   : cssProps.animPassive,
            }),
            {
                // [actived]
                '&.actived': // if activated programmatically (not by user input), disable the animation
                    this.applyStateNoAnimStartup(),
            },
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
export const styles = new IndicatorStylesBuilder();



// configs:

const cssPropsManager = new CssPropsManager(() => {
    // common css values:
    // const initial = 'initial';
    // const unset   = 'unset';
    // const none    = 'none';
    // const inherit = 'inherit';
    // const center  = 'center';
    // const middle  = 'middle';


    const keyframesDisable   : PropEx.Keyframes = {
        from: {
            filter: [[
                ecssProps.filter,
                styles.ref(styles._filterActivePassive),
                styles.ref(styles._filterHoverLeave),    // first priority, but now become the second priority
             // styles.ref(styles._filterEnableDisable), // last priority, but now become the first priority
            ]],
        },
        to: {
            filter: [[
                ecssProps.filter,
                styles.ref(styles._filterActivePassive),
                styles.ref(styles._filterHoverLeave),    // first priority, but now become the second priority
                styles.ref(styles._filterEnableDisable), // last priority, but now become the first priority
            ]],
        }
    };
    const keyframesEnable    : PropEx.Keyframes = {
        from : keyframesDisable.to,
        to   : keyframesDisable.from,
    };

    const keyframesActive    : PropEx.Keyframes = {
        from: {
            filter: [[
                ecssProps.filter,
                styles.ref(styles._filterEnableDisable), // last priority, rarely happened
             // styles.ref(styles._filterActivePassive),
                styles.ref(styles._filterHoverLeave),    // first priority, serving smooth responsiveness
            ]],
        },
        to: {
            filter: [[
                ecssProps.filter,
                styles.ref(styles._filterEnableDisable), // last priority, rarely happened
                styles.ref(styles._filterActivePassive),
                styles.ref(styles._filterHoverLeave),    // first priority, serving smooth responsiveness
            ]],
        },
    };
    const keyframesPassive   : PropEx.Keyframes = {
        from : keyframesActive.to,
        to   : keyframesActive.from,
    };

    return {
        filterDisable        : [['grayscale(50%)',  'opacity(50%)'  ]],
        filterActive         : [['brightness(65%)', 'contrast(150%)']],

        '@keyframes enable'  : keyframesEnable,
        '@keyframes disable' : keyframesDisable,
        '@keyframes active'  : keyframesActive,
        '@keyframes passive' : keyframesPassive,
        animEnable           : [['300ms', 'ease-out', 'both', keyframesEnable ]],
        animDisable          : [['300ms', 'ease-out', 'both', keyframesDisable]],
        animActive           : [['150ms', 'ease-out', 'both', keyframesActive ]],
        animPassive          : [['300ms', 'ease-out', 'both', keyframesPassive]],
    };
}, /*prefix: */'indi');
export const cssProps = cssPropsManager.refs;
export const cssDecls = cssPropsManager.decls;



// hooks:

export function useStateEnableDisable(props: Props) {
    const defaultEnabled = true; // if [enabled] was not specified => the default value is enabled=true
    const [enabled,   setEnabled  ] = useState(props.enabled ?? defaultEnabled);
    const [enabling,  setEnabling ] = useState(false);
    const [disabling, setDisabling] = useState(false);

    
    if (props.enabled !== undefined) { // controllable prop => watch the changes
        const newEnable = props.enabled;

        if (enabled !== newEnable) { // changes detected => apply the changes & start animating
            setEnabled(newEnable);
    
            if (newEnable) {
                setDisabling(false);
                setEnabling(true);
            }
            else {
                setEnabling(false);
                setDisabling(true);
            }
        }
    } // if

    
    const handleIdle = () => {
        // clean up expired animations

        if (enabling)  setEnabling(false);
        if (disabling) setDisabling(false);
    }
    return {
        enabled : enabled,
        disabled: !enabled,
        class: (enabling? 'enable' : (disabling ? 'disable': null)),
        handleAnimationEnd : (e: React.AnimationEvent<HTMLElement>) => {
            if (e.target !== e.currentTarget) return; // no bubbling
            if (/((?<![a-z])(enable|disable)|(?<=[a-z])(Enable|Disable))(?![a-z])/.test(e.animationName)) {
                handleIdle();
            }
        },
    };
}

export function useStateActivePassive(props: Props, stateEnbDis: {enabled: boolean} = {enabled: true}) {
    const defaultActived = false; // if [active] was not specified => the default value is active=false (released)
    const [actived,     setActived    ] = useState(props.active ?? defaultActived);
    const [activating,  setActivating ] = useState(false);
    const [passivating, setPassivating] = useState(false);

    
    if (props.active !== undefined) { // controllable prop => watch the changes
        const newActive = props.active ?? defaultActived;

        if (actived !== newActive) { // changes detected => apply the changes & start animating
            setActived(newActive);
    
            if (newActive) {
                setPassivating(false);
                setActivating(true);
            }
            else {
                setActivating(false);
                setPassivating(true);
            }
        }
    } // if

    
    const handlePassivating = () => {
        if (!stateEnbDis.enabled) return; // control disabled => no response
        if (actived) return; // already beed actived programatically => cannot be released by mouse/keyboard
        if (passivating) return; // already being deactivating => action is not required

        if (activating)  setActivating(false);
        setPassivating(true);
    }
    const handleIdle = () => {
        // clean up expired animations

        if (activating)  setActivating(false);
        if (passivating) setPassivating(false);
    }
    return {
        /**
         * partially/fully active
        */
        active  : actived,

        /**
         * partially/fully passive
         */
        passive : !actived,

        /**
         * fully active
        */
        actived : actived && !activating,

        /**
         * fully passive
         */
        passived: !actived && !passivating,

        class: (!activating && !passivating) ? (actived ? 'actived' : null) : (activating? 'active' : (passivating ? 'passive': null)),
        handleMouseDown    : handleIdle,        // for Control
        handleKeyDown      : handleIdle,        // for Control
        handleMouseUp      : handlePassivating, // for Control
        handleKeyUp        : handlePassivating, // for Control
        handleAnimationEnd : (e: React.AnimationEvent<HTMLElement>) => {
            if (e.target !== e.currentTarget) return; // no bubbling
            if (/((?<![a-z])(active|passive)|(?<=[a-z])(Active|Passive))(?![a-z])/.test(e.animationName)) {
                handleIdle();
            }
        },
    };
}



// react components:

export interface Props
    extends
        Elements.Props
{
    // accessibility:
    enabled?: boolean
    active?:  boolean
}
export default function Indicator(props: Props) {
    const indiStyles   = styles.useStyles();

    // states:
    const stateEnbDis  = useStateEnableDisable(props);
    const stateActPass = useStateActivePassive(props, stateEnbDis);

    

    return (
        <Element
            {...props}
            classes={[
                // main:
                (props.classes ? null : indiStyles.main),

                // additionals:
                ...(props.classes ?? []),

                // states:
                stateEnbDis.class ?? (stateEnbDis.disabled ? 'disabled' : null),
                stateActPass.class,
            ]}
        
            onAnimationEnd={(e) => {
                stateEnbDis.handleAnimationEnd(e);
                stateActPass.handleAnimationEnd(e);
            }}
        />
    );
}