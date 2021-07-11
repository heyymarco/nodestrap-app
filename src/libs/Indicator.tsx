// react (builds html using javascript):
import {
    default as React,
    useState,
}                           from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    PropEx,
    Cust,
    StateList,
    PropList,


    // components:
    CssConfig,
    ElementProps,
}                           from './nodestrap'  // nodestrap's core
import {
    usePropAccessibility,
    usePropEnabled,
    usePropActive,

    AccessibilityProps,
    AccessibilityProvider,
}                           from './accessibilities'
import {
    BasicComponentStyles,
    BasicComponentProps,
    BasicComponent,
}                           from './BasicComponent'



// styles:

export class IndicatorStyles extends BasicComponentStyles {
    //#region props
    //#region animations
    public    readonly _filterEnableDisable = 'filterEnableDisable'
    protected readonly _animEnableDisable   = 'animEnableDisable'

    public    readonly _filterArriveLeave   = 'filterArriveLeave' // will be used in Control, so we can re-use our animations (enable, disable, active, passive) in the Control
 // protected readonly _animArriveLeave     = 'animArriveLeave'   // will be defined in Control

    public    readonly _filterActivePassive = 'filterActivePassive'
    protected readonly _animActivePassive   = 'animActivePassive'

    public    readonly _filterPressRelease  = 'filterPressRelease' // will be used in ActionControl, so we can re-use our animations (enable, disable, active, passive) in the Control
 // protected readonly _animPressRelease    = 'animPressRelease'   // will be defined in ActionControl
    //#endregion animations
    //#endregion props



    //#region mixins
    //TODO: to be removed....
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
    


    //TODO: to be removed....
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
    //#endregion mixins



    // variants:
    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}



    // states:
    public /*override*/ statess(inherit: boolean): StateList { return [
        ...super.statess(inherit), // copy states from base



        [ null, {
            // reset filters/anims/toggles to initial/inherit state:
            ...this.resetEnableDisable(inherit),
            ...this.resetArriveLeave(inherit),
            ...this.resetActivePassive(inherit),
            ...this.resetPressRelease(inherit),
        }],



        // if all below are not set => enabled
        [  ':not(.enable):not(.disabled):not(.disable):not(:disabled)' , [this.enable()  , this.enabled()    ] ],

        // .enable will be added after loosing disable and will be removed after enabling-animation done
        [  '.enable'                                                   , [this.enable()  , this.enabling()   ] ],

        // .disable = styled disable, :disabled = real disable
        [ ['.disable', ':disabled:not(.disabled)']                     , [this.disable() , this.disabling()  ] ],

        // .disabled will be added after disabling-animation done
        [  '.disabled'                                                 , [this.disable() , this.disabled()   ] ],

        

        // .actived will be added after activating-animation done
        [  '.actived'                                                  , [this.active()  , this.actived()    ] ],

        // .active = programatically active, :checked = user active
        [ ['.active', ':checked:not(.actived)']                        , [this.active()  , this.activating() ] ],

        // .passive will be added after loosing active and will be removed after deactivating-animation done
        [  '.passive'                                                  , [this.passive() , this.passivating()] ],

        // if all above are not set => passived
        [  ':not(.actived):not(.active):not(:checked):not(.passive)'   , [this.passive() , this.passived()   ] ],
    ]}
    
    public /*virtual*/ resetEnableDisable(inherit: boolean) : PropList { return {
        [this.decl(this._filterEnableDisable)] : inherit ? 'unset' : 'initial',
        [this.decl(this._animEnableDisable)]   : inherit ? 'unset' : 'initial',
    }}
    public /*virtual*/ enabled()     : JssStyle { return {
        /* --nothing-- */
    }}
    public /*virtual*/ enabling()    : JssStyle { return {
        [this.decl(this._filterEnableDisable)] : cssProps.filterDisable,
        [this.decl(this._animEnableDisable)]   : cssProps.animEnable,
    }}
    public /*virtual*/ disabling()   : JssStyle { return {
        [this.decl(this._filterEnableDisable)] : cssProps.filterDisable,
        [this.decl(this._animEnableDisable)]   : cssProps.animDisable,
    }}
    public /*virtual*/ disabled()    : JssStyle { return {
        [this.decl(this._filterEnableDisable)] : cssProps.filterDisable,
    }}
    public /*virtual*/ enable()      : JssStyle { return {
    }}
    public /*virtual*/ disable()     : JssStyle { return {
    }}

    public /*virtual*/ resetArriveLeave(inherit: boolean) : PropList { return {
        [this.decl(this._filterArriveLeave)]   : inherit ? 'unset' : 'initial', // will be used in Control, so we can re-use our animations (enable, disable, active, passive) in the Control
    }}

    public /*virtual*/ resetActivePassive(inherit: boolean) : PropList { return {
        [this.decl(this._filterActivePassive)] : inherit ? 'unset' : 'initial',
        [this.decl(this._animActivePassive)]   : inherit ? 'unset' : 'initial',
    }}
    public /*virtual*/ actived()     : JssStyle { return {
        [this.decl(this._filterActivePassive)] : cssProps.filterActive,
    }}
    public /*virtual*/ activating()  : JssStyle { return {
        [this.decl(this._filterActivePassive)] : cssProps.filterActive,
        [this.decl(this._animActivePassive)]   : cssProps.animActive,
    }}
    public /*virtual*/ passivating() : JssStyle { return {
        [this.decl(this._filterActivePassive)] : cssProps.filterActive,
        [this.decl(this._animActivePassive)]   : cssProps.animPassive,
    }}
    public /*virtual*/ passived()    : JssStyle { return {
        /* --nothing-- */
    }}
    public /*virtual*/ active()      : JssStyle { return {
        extend: [
            this.markActive(),
        ] as JssStyle,
    }}
    public /*virtual*/ passive()     : JssStyle { return {
    }}

    public /*virtual*/ markActive()  : JssStyle { return {
        ...this.noOutlined(),
        ...this.noMild(),

        ...this.themeActive(),
    }}
    public /*virtual*/ themeActive(theme = 'secondary'): PropList {
        return this.themeIf(theme);
    }

    public /*virtual*/ resetPressRelease(inherit: boolean) : PropList { return {
        [this.decl(this._filterPressRelease)]  : inherit ? 'unset' : 'initial', // will be used in ActionControl, so we can re-use our animations (enable, disable, active, passive) in the Control
    }}



    // functions:
    public /*override*/ filterFn(): Cust.Ref[] { return [
        ...super.filterFn(),



        this.ref(this._filterEnableDisable, this._filterNone),
        this.ref(this._filterActivePassive, this._filterNone),
        this.ref(this._filterPressRelease,  this._filterNone), // will be used in ActionControl, so we can re-use our animations (enable, disable, active, passive) in the Control
        this.ref(this._filterArriveLeave,   this._filterNone), // will be used in Control, so we can re-use our animations (enable, disable, active, passive) in the Control
    ]}
    public /*override*/ animFn(): Cust.Ref[] { return [
        ...super.animFn(),



        this.ref(this._animEnableDisable, this._animNone), // 2nd : ctrl must be enabled
        this.ref(this._animActivePassive, this._animNone), // 1st : ctrl got pressed
    ]}



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base
        ] as JssStyle,
        
        
        
        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}



    // old:
    public /*virtual*/ indicationAnimFnOld(): JssStyle { return {
    }}
}
export const indicatorStyles = new IndicatorStyles();



// configs:

const cssConfig = new CssConfig(() => {
    const keyframesDisable : PropEx.Keyframes = {
        from: {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...indicatorStyles.filterFn().filter((f) => f !== indicatorStyles.ref(indicatorStyles._filterEnableDisable, indicatorStyles._filterNone)),

             // indicatorStyles.ref(indicatorStyles._filterEnableDisable, indicatorStyles._filterNone), // missing the last => let's the browser interpolated it
            ]],
        },
        to: {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...indicatorStyles.filterFn().filter((f) => f !== indicatorStyles.ref(indicatorStyles._filterEnableDisable, indicatorStyles._filterNone)),

                indicatorStyles.ref(indicatorStyles._filterEnableDisable, indicatorStyles._filterNone), // existing the last => let's the browser interpolated it
            ]],
        },
    };
    const keyframesEnable  : PropEx.Keyframes = {
        from : keyframesDisable.to,
        to   : keyframesDisable.from,
    };

    
    
    const keyframesActive  : PropEx.Keyframes = {
        from: {
            // foreg       : indicatorStyles.ref(indicatorStyles._outlinedForegTg, indicatorStyles._mildForegTg, indicatorStyles._foregFn),
            // backg       : indicatorStyles.ref(indicatorStyles._outlinedBackgTg, indicatorStyles._mildBackgTg, indicatorStyles._backgFn),
            // borderColor : indicatorStyles.ref(indicatorStyles._outlinedForegTg,                               indicatorStyles._borderFn),

            filter: [[ // double array => makes the JSS treat as space separated values
                ...indicatorStyles.filterFn().filter((f) => f !== indicatorStyles.ref(indicatorStyles._filterActivePassive, indicatorStyles._filterNone)),

             // indicatorStyles.ref(indicatorStyles._filterActivePassive, indicatorStyles._filterNone), // missing the last => let's the browser interpolated it
            ]],
        },
        to: {
            // foreg       : indicatorStyles.ref(indicatorStyles._foregFn),
            // backg       : indicatorStyles.ref(indicatorStyles._backgFn),
            // borderColor : indicatorStyles.ref(indicatorStyles._borderFn),

            filter: [[ // double array => makes the JSS treat as space separated values
                ...indicatorStyles.filterFn().filter((f) => f !== indicatorStyles.ref(indicatorStyles._filterActivePassive, indicatorStyles._filterNone)),

                indicatorStyles.ref(indicatorStyles._filterActivePassive, indicatorStyles._filterNone), // existing the last => let's the browser interpolated it
            ]],
        },
    };
    const keyframesPassive : PropEx.Keyframes = {
        from : keyframesActive.to,
        to   : keyframesActive.from,
    };

    
    
    return {
        //#region animations
        filterDisable        : [['grayscale(50%)',  'opacity(50%)'  ]],
        filterActive         : 'initial',

        '@keyframes enable'  : keyframesEnable,
        '@keyframes disable' : keyframesDisable,
        '@keyframes active'  : keyframesActive,
        '@keyframes passive' : keyframesPassive,
        animEnable           : [['300ms', 'ease-out', 'both', keyframesEnable ]],
        animDisable          : [['300ms', 'ease-out', 'both', keyframesDisable]],
        animActive           : [['150ms', 'ease-out', 'both', keyframesActive ]],
        animPassive          : [['300ms', 'ease-out', 'both', keyframesPassive]],
        //#endregion animations
    };
}, /*prefix: */'indi');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// hooks:

export function useStateEnableDisable(props: IndicationProps & ElementProps) {
    // fn props:
    const propEnabled = usePropEnabled(props);
    const htmlCtrls   = [
        'button',
        'fieldset',
        'input',
        'select',
        'optgroup',
        'option',
        'textarea',
    ];
    const isCtrlElm   = props.tag && htmlCtrls.includes(props.tag);



    // states:
    const [enabled,   setEnabled  ] = useState<boolean>(propEnabled); // true => enabled, false => disabled
    const [animating, setAnimating] = useState<boolean|null>(null);   // null => no-animation, true => enabling-animation, false => disabling-animation

    
    
    /*
     * state is enabled/disabled based on [controllable enabled]
     * [uncontrollable enabled] is not supported
     */
    const enabledFn: boolean = propEnabled /*controllable*/;

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
            // enabling:
            if (animating === true)  return 'enable';

            // disabling:
            if (animating === false) {
                if (isCtrlElm) {
                    // a control_element uses pseudo :disabled for disabling
                    // not needed using class .disable
                    return null;
                }
                else {
                    // a generic_element uses class .disable for disabling
                    return 'disable';
                } // if
            } // if

            // fully disabled:
            if (!enabled) return 'disabled';

            // fully enabled:
            return null;
        })(),

        props : (isCtrlElm ? {
            // a control_element uses pseudo :disabled for disabling
            disabled: !enabled,
        } : {}),

        handleAnimationEnd : (e: React.AnimationEvent<HTMLElement>) => {
            if (e.target !== e.currentTarget) return; // no bubbling
            if (/((?<![a-z])(enable|disable)|(?<=[a-z])(Enable|Disable))(?![a-z])/.test(e.animationName)) {
                handleIdle();
            }
        },
    };
}

export function useStateActivePassive(props: IndicationProps & ElementProps, activeDn?: boolean, classes = { active: 'active' as (string|null), actived: 'actived' as (string|null), passive: 'passive' as (string|null) }) {
    // fn props:
    const propActive = usePropActive(props, null);
    const isCheckbox = (props.tag === 'input') && ((props as any).type === 'checkbox');



    // states:
    const [actived,   setActived  ] = useState<boolean>(propActive ?? false); // true => active, false => passive
    const [animating, setAnimating] = useState<boolean|null>(null);           // null => no-animation, true => activating-animation, false => deactivating-animation

    

    /*
     * state is active/passive based on [controllable active] (if set) and fallback to [uncontrollable active]
     */
    const activeFn: boolean = propActive /*controllable*/ ?? activeDn /*uncontrollable*/ ?? false;

    if (actived !== activeFn) { // change detected => apply the change & start animating
        setActived(activeFn);   // remember the last change
        setAnimating(activeFn); // start activating-animation/deactivating-animation
    }

    

    const handleIdle = () => {
        // clean up finished animation

        setAnimating(null); // stop activating-animation/deactivating-animation
    }
    return {
        /**
         * partially/fully active
        */
        active : actived,

        class  : ((): string|null => {
            // activating:
            if (animating === true) {
                if (isCheckbox) {
                    // a checkbox uses pseudo :checked for activating
                    // not needed using class .active
                    return null;
                }
                else {
                    // a generic_element uses class .active for activating
                    return classes.active;
                } // if
            } // if

            // passivating:
            if (animating === false) return classes.passive;

            // fully actived:
            if (actived) return classes.actived;

            // fully passived:
            return null;
        })(),

        props : (isCheckbox ? {
            // a checkbox uses pseudo :checked for activating
            checked: actived,
        } : {}),

        handleIdle         : handleIdle,
        handleAnimationEnd : (e: React.AnimationEvent<HTMLElement>) => {
            if (e.target !== e.currentTarget) return; // no bubbling
            if (/((?<![a-z])(active|passive)|(?<=[a-z])(Active|Passive))(?![a-z])/.test(e.animationName)) {
                handleIdle();
            }
        },
    };
}

export function useTogglerActive(props: TogglerActiveProps): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
    // fn props:
    const propAccess  = usePropAccessibility<boolean, null>(props, undefined, null);
    const propEnabled = propAccess.enabled;
    const propActive  = propAccess.active;



    // states:
    const [activeTg, setActiveTg] = useState<boolean>(props.defaultActive ?? false); // uncontrollable (dynamic) state: true => user activate, false => user deactivate



    /*
     * state is active/passive based on [controllable active] (if set) and fallback to [uncontrollable active]
     */
    const activeFn: boolean = propActive /*controllable*/ ?? activeTg /*uncontrollable*/;



    const setActive: React.Dispatch<React.SetStateAction<boolean>> = (newActive) => {
        if (!propEnabled) return; // control is disabled => no response required

        const newActiveValue = (typeof newActive === 'function') ? newActive(activeFn) : newActive;
        if (newActiveValue === activeFn) return; // no change needed

        
        
        if (propActive === null) { // controllable [active] is set => no uncontrollable required, otherwise do it
            setActiveTg(newActiveValue); // set dynamic (uncontrollable)
        } // if
        
        
        
        // forwards:
        props.onActiveChange?.(newActiveValue); // notify changed -or- request to change
    };
    return [
        activeFn,
        setActive,
    ];
}



// react components:

export interface IndicationProps
    extends
        AccessibilityProps
{
}

export interface TogglerActiveProps
    extends
        IndicationProps
{
    // accessibility:
    defaultActive?  : boolean
    onActiveChange? : (active: boolean) => void
}

export interface IndicatorProps<TElement extends HTMLElement = HTMLElement>
    extends
        BasicComponentProps<TElement>,

        IndicationProps
{
}
export default function Indicator<TElement extends HTMLElement = HTMLElement>(props: IndicatorProps<TElement>) {
    // styles:
    const styles       = indicatorStyles.useStyles();



    // states:
    const stateEnbDis  = useStateEnableDisable(props);
    const stateActPass = useStateActivePassive(props);

    

    // fn props:
    const propAccess   = usePropAccessibility(props);



    // jsx:
    return (
        <BasicComponent<TElement>
            // other props:
            {...props}


            // variants:
            mild={props.mild ?? true}


            // classes:
            mainClass={props.mainClass ?? styles.main}
            stateClasses={[...(props.stateClasses ?? []),
                stateEnbDis.class,
                stateActPass.class,
            ]}


            // Control::disabled:
            {...stateEnbDis.props}
            
            
            // Check::checked:
            {...stateActPass.props}
        

            // events:
            onAnimationEnd={(e) => {
                // states:
                stateEnbDis.handleAnimationEnd(e);
                stateActPass.handleAnimationEnd(e);


                // forwards:
                props.onAnimationEnd?.(e);
            }}
        >
            { props.children && <AccessibilityProvider {...propAccess}>
                { props.children }
            </AccessibilityProvider> }
        </BasicComponent>
    );
}
export { Indicator }