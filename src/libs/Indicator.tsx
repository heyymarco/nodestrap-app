// react (builds html using javascript):
import
    React, {
    useState,
    useEffect,
}                          from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
}                          from 'jss'          // ts defs support for jss
import {
    PropEx,
    Cust,
}                          from './Css'        // ts defs support for jss
import CssConfig           from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import colors              from './colors'     // configurable colors & theming defs
import {
    default  as Element,
    cssProps as ecssProps,
    ElementStylesBuilder,
}                          from './Element'
import type * as Elements  from './Element'



// styles:

export interface IIndicatorStylesBuilder {
    // states:
    indicationThemesIf(): JssStyle
    indicationStates(inherit : boolean): JssStyle



    // functions:
    indicationPropsFn(): JssStyle
    indicationAnimFn(): JssStyle



    // styles:
    indicationBasicStyle(): JssStyle
}
export class IndicatorStylesBuilder extends ElementStylesBuilder implements IIndicatorStylesBuilder {
    //#region scoped css props
    /**
     * active unthemed foreground color.
     */
    protected readonly _foregIfAct          = 'foregIfAct'

    /**
     * active unthemed background color.
     */
    protected readonly _backgIfAct          = 'backgIfAct'

    /**
     * active unthemed border color.
     */
    protected readonly _borderIfAct         = 'borderIfAct'

    /**
     * active focused conditional unthemed box-shadow color.
     */
    protected readonly _boxShadowFocusIfAct = 'boxShadowFocusIfAct'

    /**
     * active unthemed foreground color - at outlined state.
     */
    protected readonly _outlinedForegIfAct  = 'outlinedForegIfAct'



    // anim props:

    public    readonly _filterEnableDisable = 'filterEnableDisable'
    protected readonly _animEnableDisable   = 'animEnableDisable'

    public    readonly _filterHoverLeave    = 'filterHoverLeave' // will be used    in Control
 // protected readonly _animHoverLeave      = 'animHoverLeave'   // will be defined in Control

    public    readonly _filterActivePassive = 'filterActivePassive'
    protected readonly _animActivePassive   = 'animActivePassive'
    //#endregion scoped css props



    //#region mixins
    protected stateEnabling(content: JssStyle): JssStyle { return {
        '&.enable': content,
    }}
    protected stateNotEnabling(content: JssStyle): JssStyle { return {
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
    protected stateNotDisabled(content: JssStyle): JssStyle { return {
        // not fully disabled
        '&:not(.disabled):not(:disabled),&:not(.disabled):disabled.disable': content,
    }}
    protected stateEnablingDisable(content: JssStyle): JssStyle { return {
        '&.enable,&.disable,&.disabled,&:disabled': content,
    }}
    protected stateNotEnablingDisable(content: JssStyle): JssStyle { return {
        '&:not(.enable):not(.disable):not(.disabled):not(:disabled)': content,
    }}
    protected stateNotEnablingDisabling(content: JssStyle): JssStyle { return {
        '&:not(.enable):not(.disable)': content,
    }}
    


    protected /*virtual*/ actionCtrl() { return false; }
    protected stateActivating(content: JssStyle, actionCtrl = this.actionCtrl()): JssStyle { return {
        [actionCtrl ? '&.active,&:active:not(.disable):not(.disabled):not(:disabled)' : '&.active']: content,
    }}
    protected stateActive(content: JssStyle, actionCtrl = this.actionCtrl()): JssStyle { return {
        [actionCtrl ? '&.active,&.actived,&:active:not(.disable):not(.disabled):not(:disabled)' : '&.active,&.actived']: content,
    }}
    protected stateNotActive(content: JssStyle, actionCtrl = this.actionCtrl()): JssStyle { return {
        [actionCtrl ? '&:not(.active):not(.actived):not(:active), &:not(.active):not(.actived).disable, &:not(.active):not(.actived).disabled, &:not(.active):not(.actived):disabled' : '&:not(.active):not(.actived)']: content,
    }}
    protected stateNotActived(content: JssStyle): JssStyle { return {
        // not fully actived
        '&:not(.actived)': content,
    }}
    protected statePassivating(content: JssStyle): JssStyle { return {
        '&.passive': content,
    }}
    protected stateNotPassivating(content: JssStyle): JssStyle { return {
        '&:not(.passive)': content,
    }}
    protected stateActivePassivating(content: JssStyle, actionCtrl = this.actionCtrl()): JssStyle { return {
        [actionCtrl ? '&.active,&.actived,&:active:not(.disable):not(.disabled):not(:disabled),&.passive' : '&.active,&.actived,&.passive']: content,
    }}
    protected stateNotActivePassivating(content: JssStyle, actionCtrl = this.actionCtrl()): JssStyle { return {
        [actionCtrl ? '&:not(.active):not(.actived):not(:active):not(.passive), &:not(.active):not(.actived).disable:not(.passive), &:not(.active):not(.actived).disabled:not(.passive), &:not(.active):not(.actived):disabled:not(.passive)' : '&:not(.active):not(.actived):not(.passive)']: content,
    }}
    protected stateNotActivatingPassivating(content: JssStyle, actionCtrl = this.actionCtrl()): JssStyle { return {
        [actionCtrl ? '&:not(.active):not(:active):not(.passive), &:not(.active).disable:not(.passive), &:not(.active).disabled:not(.passive), &:not(.active):disabled:not(.passive)' : '&:not(.active):not(.passive)']: content,
    }}
    


    protected /*override*/ applyStateNoAnimStartup(): JssStyle {
        return this.stateNotEnablingDisabling(
            this.stateNotActivatingPassivating(
                super.applyStateNoAnimStartup()
            )
        );
    }
    protected /*virtual*/ applyStateActive(): JssStyle { return {
        // apply an *active* color theme:
        [this.decl(this._foregIf)]          : this.ref(this._foregIfAct),
        [this.decl(this._backgIf)]          : this.ref(this._backgIfAct),
        [this.decl(this._borderIf)]         : this.ref(this._borderIfAct),
        [this.decl(this._boxShadowFocusIf)] : this.ref(this._boxShadowFocusIfAct),
        [this.decl(this._outlinedForegIf)]  : this.ref(this._outlinedForegIfAct),


        
        // *toggle off* the outlined props:
        '&:not(._)': this.toggleOffOutlined(),
    }}
    //#endregion mixins



    // themes:
    public /*override*/ sizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {
        extend: [
            super.sizeOf(size, Size, sizeProp), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, Size)),
    }}



    // states:
    public /*virtual*/ indicationThemesIf(): JssStyle { return {
        // define an *active* color theme:
        [this.decl(this._foregIfAct)]          : colors.secondaryText,
        [this.decl(this._backgIfAct)]          : this.solidBackg(colors.secondary),
        [this.decl(this._borderIfAct)]         : colors.secondaryCont,
        [this.decl(this._boxShadowFocusIfAct)] : colors.secondaryTransp,
        [this.decl(this._outlinedForegIfAct)]  : colors.secondary,
    }}
    public /*virtual*/ indicationStates(inherit = false): JssStyle { return {
        extend: [
            this.iif(!inherit, {
                //#region all initial states are none
                [this.decl(this._filterEnableDisable)] : ecssProps.filterNone,
                [this.decl(this._animEnableDisable)]   : ecssProps.animNone,
        
                [this.decl(this._filterHoverLeave)]    : ecssProps.filterNone, // supports for Control
        
                [this.decl(this._filterActivePassive)] : ecssProps.filterNone,
                [this.decl(this._animActivePassive)]   : ecssProps.animNone,
                //#endregion all initial states are none
            }),

    
    
            //#region specific states
            //#region enable, disable
            this.stateEnablingDisable({ // [enabling, disabling, disabled]
                [this.decl(this._filterEnableDisable)] : cssProps.filterDisable,
            }),
            this.stateEnabling({ // [enabling]
                [this.decl(this._animEnableDisable)]   : cssProps.animEnable,
            }),
            this.stateDisable({ // [disabling, disabled]
                [this.decl(this._animEnableDisable)]   : cssProps.animDisable,
            }),
            { // [disabled]
                '&.disabled,&:disabled:not(.disable)'  : // if ctrl was fully disabled programatically, disable first animation
                    this.applyStateNoAnimStartup(),
            },
            //#endregion enable, disable
            
            
            
            //#region active, passive
            this.stateActivePassivating({ // [activating, actived, passivating]
                [this.decl(this._filterActivePassive)] : cssProps.filterActive,
            }),
            this.stateActive({ // [activating, actived]
                [this.decl(this._animActivePassive)]   : cssProps.animActive,
    
                extend: [
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
            //#endregion active, passive
            //#endregion specific states
        ] as JssStyle,
    }}

    public /*override*/ themesIf(): JssStyle { return {
        extend: [
            super.themesIf(), // copy themes from base

            this.indicationThemesIf(),
        ] as JssStyle,
    }}
    public /*override*/ states(inherit = false): JssStyle { return {
        extend: [
            super.states(inherit), // copy states from base
    
            this.indicationStates(inherit),
        ] as JssStyle,
    }}



    // functions:
    public /*virtual*/ indicationPropsFn(): JssStyle { return {} }
    public /*virtual*/ indicationAnimFn(): JssStyle { return {
        //#region re-arrange the animFn at different states
        '&.active,&.actived': // if activated programmatically (not by user input)
            this.stateNotDisabled({ // if ctrl was not fully disabled
                // define an *animations* func:
                [this.decl(this._animFn)]: [
                    ecssProps.anim,
                    this.ref(this._animActivePassive), // 2nd : ctrl already pressed, move to the least priority
                    this.ref(this._animEnableDisable), // 1st : ctrl enable/disable => rarely used => low probability
                ],
            }),

        // define an *animations* func:
        [this.decl(this._animFn)]: [
            ecssProps.anim,
            this.ref(this._animEnableDisable), // 2nd : ctrl must be enabled
            this.ref(this._animActivePassive), // 1st : ctrl got pressed
        ],
        //#endregion re-arrange the animFn at different states
    }}

    public /*override*/ propsFn(): JssStyle { return {
        extend: [
            super.propsFn(), // copy functional props from base

            this.indicationPropsFn(),
        ] as JssStyle,
    }}
    public /*override*/ animFn(): JssStyle {
        return this.indicationAnimFn();
    }
    public /*override*/ filterFn(): Cust.Ref[] { return [
        ...super.filterFn(),



        this.ref(this._filterEnableDisable),
        this.ref(this._filterActivePassive),
        this.ref(this._filterHoverLeave), // will be used in Control
    ]}



    // styles:
    public /*virtual*/ indicationBasicStyle(): JssStyle { return {
        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base

            this.indicationBasicStyle(),
        ] as JssStyle,
    }}
}
export const styles = new IndicatorStylesBuilder();



// configs:

const cssConfig = new CssConfig(() => {
    // common css values:
    // const initial = 'initial';
    // const unset   = 'unset';
    // const none    = 'none';
    // const inherit = 'inherit';
    // const center  = 'center';
    // const middle  = 'middle';


    const keyframesDisable   : PropEx.Keyframes = {
        from: {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...styles.filterFn().filter((f) => f !== styles.ref(styles._filterEnableDisable)),

             // styles.ref(styles._filterEnableDisable), // missing the last => let's the browser interpolated it
            ]],
        },
        to: {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...styles.filterFn().filter((f) => f !== styles.ref(styles._filterEnableDisable)),

                styles.ref(styles._filterEnableDisable), // existing the last => let's the browser interpolated it
            ]],
        },
    };
    const keyframesEnable    : PropEx.Keyframes = {
        from : keyframesDisable.to,
        to   : keyframesDisable.from,
    };

    const keyframesActive    : PropEx.Keyframes = {
        from: {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...styles.filterFn().filter((f) => f !== styles.ref(styles._filterActivePassive)),

             // styles.ref(styles._filterActivePassive), // missing the last => let's the browser interpolated it
            ]],
        },
        to: {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...styles.filterFn().filter((f) => f !== styles.ref(styles._filterActivePassive)),

                styles.ref(styles._filterActivePassive), // existing the last => let's the browser interpolated it
            ]],
        },
    };
    const keyframesPassive   : PropEx.Keyframes = {
        from : keyframesActive.to,
        to   : keyframesActive.from,
    };

    return {
        // anim props:

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
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// hooks:

export function useStateEnableDisable<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    // props:
    const propEnabled: boolean = (props.enabled ?? true); // if [enabled] was not specified => the default value is [enabled=true] (enabled)



    // states:
    const [enabled,   setEnabled  ] = useState<boolean>(propEnabled); // true => enabled, false => disabled
    const [animating, setAnimating] = useState<boolean|null>(null);   // null => no-animation, true => enabling-animation, false => disabling-animation

    
    
    const enabledFn: boolean = propEnabled;

    if (enabled !== enabledFn) { // change detected => apply the change & start animating
        setEnabled(enabledFn);   // remember the last change
        setAnimating(enabledFn); // start enabling-animation/disabling-animation
    }

    
    
    const handleIdle = () => {
        // clean up finished animation

        setAnimating(null); // stop enabling-animation/disabling-animation
    }
    return {
        enabled  : enabled,
        disabled : !enabled,
        class    : ((): string|null => {
            if (animating === true)  return 'enable';
            if (animating === false) return 'disable';

         // if (!enabled) return 'disabled'; // use pseudo :disabled

            return null;
        })(),
        handleAnimationEnd : (e: React.AnimationEvent<HTMLElement>) => {
            if (e.target !== e.currentTarget) return; // no bubbling
            if (/((?<![a-z])(enable|disable)|(?<=[a-z])(Enable|Disable))(?![a-z])/.test(e.animationName)) {
                handleIdle();
            }
        },
    };
}

export function useStateActivePassive<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>, classes = { active: 'active', actived: 'actived', passive: 'passive' }) {
    // props:
    const propClickable: boolean =  // control is clickable if [is actionCtrl] and [is enabled]
        (props.actionCtrl ?? false) // if [actionCtrl] was not specified => the default value is [actionCtrl=false] (readonly)
        &&
        (props.enabled    ?? true)  // if [enabled]    was not specified => the default value is [enabled=true]    (enabled)
        ;
    const propActive: boolean = (props.active ?? false); // if [active] was not specified => the default value is [active=false] (released)



    // states:
    const [actived,   setActived  ] = useState<boolean>(propActive); // true => active, false => passive
    const [animating, setAnimating] = useState<boolean|null>(null);  // null => no-animation, true => pressing-animation, false => releasing-animation

    const [activeDn,  setActiveDn ] = useState<boolean>(false);      // uncontrollable (dynamic) state: true => user press, false => user release

    

    // state is active if [controllable active] || [uncontrollable active]:
    const activeFn: boolean = propActive || (propClickable && activeDn);

    if (actived !== activeFn) { // change detected => apply the change & start animating
        setActived(activeFn);   // remember the last change
        setAnimating(activeFn); // start pressing-animation/releasing-animation
    }



    useEffect(() => {
        if (!propClickable) return; // control is not clickable => no response required
        if (propActive)     return; // controllable [active] is set => no uncontrollable required



        const handlePassivating = () => {
            setActiveDn(false);
        }
        window.addEventListener('mouseup', handlePassivating);
        window.addEventListener('keyup',   handlePassivating);
        return () => {
            window.removeEventListener('mouseup', handlePassivating);
            window.removeEventListener('keyup',   handlePassivating);
        }
    }, [propClickable, propActive]);

    

    const handleActivating = () => {
        if (!propClickable) return; // control is not clickable => no response required
        if (propActive)     return; // controllable [active] is set => no uncontrollable required



        setActiveDn(true);
    }
    const handleIdle = () => {
        // clean up finished animation

        setAnimating(null); // stop pressing-animation/releasing-animation
    }
    return {
        /**
         * partially/fully active
        */
        active   : actived,

        /**
         * partially/fully passive
         */
        passive  : !actived,

        /**
         * fully active
        */
        actived  : actived  && (animating === true),

        /**
         * fully passive
         */
        passived : !actived && (animating === false),

        class    : ((): string|null => {
            if (animating === true)  return (propActive ? classes.active : null); // activating by prop => use .active, otherwise use pseudo :active
            if (animating === false) return classes.passive;

            if (actived) return classes.actived;

            return null;
        })(),
        handleMouseDown    : handleActivating, // for Control
        handleKeyDown      : handleActivating, // for Control
        handleAnimationEnd : (e: React.AnimationEvent<HTMLElement>) => {
            if (e.target !== e.currentTarget) return; // no bubbling
            if (/((?<![a-z])(active|passive)|(?<=[a-z])(Active|Passive))(?![a-z])/.test(e.animationName)) {
                handleIdle();
            }
        },
    };
}



// react components:

export interface IndicationProps
{
    // accessibility:
    enabled? : boolean
    active?  : boolean
}

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        Elements.Props<TElement>,
        IndicationProps
{
    // behaviors:
    actionCtrl?: boolean


    // states:
    stateActive?: [boolean, (newValue: boolean) => void]
}
export default function Indicator<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    const indiStyles   = styles.useStyles();

    // states:
    const stateEnbDis  = useStateEnableDisable(props);
    const stateActPass = useStateActivePassive(props);



    useEffect(() => { // guarantees the DOM has been fully rendered:
        props.stateActive?.[1](!!stateActPass.class); // [activating, actived, passivating]
    });

    

    const htmlCtrls    = [
        'button',
        'fieldset',
        'input',
        'select',
        'optgroup',
        'option',
        'textarea',
    ];
    const isHtmlCtrl   = props.tag && htmlCtrls.includes(props.tag);
    const isActionCtrl = props.actionCtrl ?? false;



    return (
        <Element<TElement>
            // other props:
            {...props}


            // classes:
            mainClass={props.mainClass ?? indiStyles.main}
            stateClasses={[...(props.stateClasses ?? []),
                // states:
                (stateEnbDis.class ?? ((stateEnbDis.disabled && !isHtmlCtrl) ? 'disabled' : null)),
                stateActPass.class,
            ]}


            // Indicator props:
            {...(isHtmlCtrl ? {
                // accessibility:
                disabled: stateEnbDis.disabled,
            } : {})}
        

            // events:
            onMouseDown={(e) => { if (isActionCtrl) stateActPass.handleMouseDown(); props.onMouseDown?.(e); }}
            onKeyDown=  {(e) => { if (isActionCtrl) stateActPass.handleKeyDown();   props.onKeyDown?.(e);   }}
            onAnimationEnd={(e) => {
                // states:
                stateEnbDis.handleAnimationEnd(e);
                stateActPass.handleAnimationEnd(e);


                // forwards:
                props.onAnimationEnd?.(e);
            }}
        />
    );
}