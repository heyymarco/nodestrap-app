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
    ClassList,
    PropList,


    // components:
    CssConfig,
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
    /**
     * toggles *on* foreground color - at active state.
     */
    public    readonly _activeForegTg       = 'activeForegTg'

    /**
     * toggles *on* backgrounds - at active state.
     */
    public    readonly _activeBackgTg       = 'activeBackgTg'

    /**
     * toggles *on* border color - at active state.
     */
    public    readonly _activeBorderTg      = 'activeBorderTg'



    //#region animations
    public    readonly _filterEnableDisable = 'filterEnableDisable'
    protected readonly _animEnableDisable   = 'animEnableDisable'

    public    readonly _filterHoverLeave    = 'filterHoverLeave' // will be used in Control, so we can re-use our animations (enable, disable, hover, leave) in the Control
 // protected readonly _animHoverLeave      = 'animHoverLeave'   // will be defined in Control

    public    readonly _filterActivePassive = 'filterActivePassive'
    protected readonly _animActivePassive   = 'animActivePassive'
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
    public /*override*/ states(inherit: boolean): ClassList { return [
        ...super.states(inherit), // copy states from base



        [ null, {
            // requires usePropsFn() for using _foregFn & _backgFn in the actived() & activating() => toggleOnActive()
            // the code below causing useStates() implicitly includes usePropsFn()
            ...this.usePropsFn(),



            //#region reset toggles/filters/anims to initial/inherit state
            [this.decl(this._filterEnableDisable)] : inherit ? 'unset' : 'initial',
            [this.decl(this._animEnableDisable)]   : inherit ? 'unset' : 'initial',
            [this.decl(this._filterHoverLeave)]    : inherit ? 'unset' : 'initial', // will be used in Control, so we can re-use our animations (enable, disable, hover, leave) in the Control
            [this.decl(this._filterActivePassive)] : inherit ? 'unset' : 'initial',
            [this.decl(this._animActivePassive)]   : inherit ? 'unset' : 'initial',

            ...this.toggleOffActive(inherit),
            //#endregion reset toggles/filters/anims to initial/inherit state
        }],



        // if all below are not set => enabled
        [ '&:not(.enable):not(.disable):not(:disabled):not(.disabled)'        , this.enabled()     ],

        // .enable will be added after loosing disable and will be removed after enabling-animation done
        [ '&.enable'                                                          , this.enabling()    ],

        // .disable = styled disable, :disabled = real disable
        [ '&.disable,&:disabled:not(.disabled)'                               , this.disabling()   ],

        // .disabled will be added after disabling-animation done
        [ '&.disabled'                                                        , this.disabled()    ],

        

        // .actived will be added after activating-animation done
        [ '&.actived'                                                         , this.actived()     ],

        // .active = programatically active, :checked = user active
        [ '&.active,&:checked:not(.actived)'                                  , this.activating()  ],

        // .passive will be added after loosing active and will be removed after deactivating-animation done
        [ '&.passive'                                                         , this.passivating() ],

        // if all above are not set => passived
        [ '&:not(.actived):not(.active):not(:checked):not(.passive)'          , this.passived()    ],



        // .pressed will be added after pressing-animation done
        [ '&.pressed'                                                         , this.pressed()     ],

        // .press = programatically press, :active = user press
        [ '&.press,' +
          '&:active:not(.pressed):not(.disabled):not(:disabled):not(.disable)', this.pressing()    ],

        // .release will be added after loosing press and will be removed after releasing-animation done
        [ '&.release'                                                         , this.releasing()   ],

        // if all above are not set => released
        [ '&:not(.pressed):not(.press):not(:active):not(.release),' +
          '&:not(.pressed):not(.press).disabled:not(.release),'     +
          '&:not(.pressed):not(.press):disabled:not(.release)'      +
          '&:not(.pressed):not(.press).disable:not(.release),'                , this.released()    ],
    ]}
    
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

    public /*virtual*/ actived()     : JssStyle { return {
        [this.decl(this._filterActivePassive)] : cssProps.filterActive,

        ...this.toggleOnActive(),

        
        
        extend: [
            this.themeActive(),
        ] as JssStyle,
    }}
    public /*virtual*/ activating()  : JssStyle { return {
        [this.decl(this._filterActivePassive)] : cssProps.filterActive,
        [this.decl(this._animActivePassive)]   : cssProps.animActive,

        ...this.toggleOnActive(),

        
        
        extend: [
            this.themeActive(),
        ] as JssStyle,
    }}
    public /*virtual*/ passivating() : JssStyle { return {
        [this.decl(this._filterActivePassive)] : cssProps.filterActive,
        [this.decl(this._animActivePassive)]   : cssProps.animPassive,
    }}
    public /*virtual*/ passived()    : JssStyle { return {
        /* --nothing-- */
    }}
    public /*virtual*/ toggleOnActive(): PropList { return {
        // _foregFn & _backgFn => requires usePropsFn() => use it at states()
        [this.decl(this._activeForegTg)]  : this.ref(this._foregFn),
        [this.decl(this._activeBackgTg)]  : this.ref(this._backgFn),
        [this.decl(this._activeBorderTg)] : this.ref(this._borderFn),
    }}
    public /*virtual*/ toggleOffActive(inherit = false): PropList { return {
        [this.decl(this._activeForegTg)]  : inherit ? 'unset' : 'initial',
        [this.decl(this._activeBackgTg)]  : inherit ? 'unset' : 'initial',
        [this.decl(this._activeBorderTg)] : inherit ? 'unset' : 'initial',
    }}
    public /*virtual*/ themeActive(theme = 'secondary'): JssStyle {
        return this.themeIf(theme);
    }

    public /*virtual*/ pressed(): JssStyle { return {} }
    public /*virtual*/ pressing(): JssStyle { return {} }
    public /*virtual*/ releasing(): JssStyle { return {} }
    public /*virtual*/ released(): JssStyle { return {} }



    // functions:
    public /*override*/ propsFn(): PropList { return {
        ...super.propsFn(), // copy functional props from base
        
        ...this.activePropsFn(),
    }}
    public /*virtual*/ activePropsFn(): PropList { return {
        //#region finals
        // define a final *foreground* color func:
        [this.decl(this._foreg)]     : this.ref(
            this._activeForegTg,   // toggle active
            this._outlinedForegTg, // toggle outlined
            this._foregFn,
        ),

        // define a final *backgrounds* func:
        [this.decl(this._backg)]     : this.ref(
            this._activeBackgTg,   // toggle active
            this._outlinedBackgTg, // toggle outlined
            this._backgFn,
        ),

        // define a final *border* color func:
        [this.decl(this._border)]    : this.ref(
            this._activeBorderTg,  // toggle active
            this._outlinedForegTg, // toggle outlined
            this._borderFn
        ),
        //#endregion finals
    }}
    public /*override*/ filterFn(): Cust.Ref[] { return [
        ...super.filterFn(),



        this.ref(this._filterEnableDisable, this._filterNone),
        this.ref(this._filterActivePassive, this._filterNone),
        this.ref(this._filterHoverLeave,    this._filterNone), // will be used in Control, so we can re-use our animations (enable, disable, hover, leave) in the Control
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
    const keyframesDisable   : PropEx.Keyframes = {
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
    const keyframesEnable    : PropEx.Keyframes = {
        from : keyframesDisable.to,
        to   : keyframesDisable.from,
    };

    
    
    const keyframesActive    : PropEx.Keyframes = {
        from: {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...indicatorStyles.filterFn().filter((f) => f !== indicatorStyles.ref(indicatorStyles._filterActivePassive, indicatorStyles._filterNone)),

             // indicatorStyles.ref(indicatorStyles._filterActivePassive, indicatorStyles._filterNone), // missing the last => let's the browser interpolated it
            ]],
        },
        to: {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...indicatorStyles.filterFn().filter((f) => f !== indicatorStyles.ref(indicatorStyles._filterActivePassive, indicatorStyles._filterNone)),

                indicatorStyles.ref(indicatorStyles._filterActivePassive, indicatorStyles._filterNone), // existing the last => let's the browser interpolated it
            ]],
        },
    };
    const keyframesPassive   : PropEx.Keyframes = {
        from : keyframesActive.to,
        to   : keyframesActive.from,
    };

    
    
    return {
        //#region animations
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
        //#endregion animations
    };
}, /*prefix: */'indi');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// hooks:

export function useStateEnableDisable(props: IndicationProps) {
    // fn props:
    const propEnabled = usePropEnabled(props);



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
            if (animating === false) return null; // use pseudo :disabled

            // fully disabled:
            if (!enabled) return 'disabled';

            // fully enabled:
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

export function useStateActivePassive(props: IndicationProps, activeDn?: boolean, classes = { active: 'active' as (string|null), actived: 'actived' as (string|null), passive: 'passive' as (string|null) }) {
    // fn props:
    const propActive = usePropActive(props, null);



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
            if (animating === true)  return null; // use pseudo :checked

            // passivating:
            if (animating === false) return classes.passive;

            // fully actived:
            if (actived) return classes.actived;

            // fully passived:
            return null;
        })(),

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

        
        
        if (propActive !== null) { // controllable [active] is set => no uncontrollable required
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
    // behaviors:
    actionCtrl? : boolean
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
    const htmlCtrls    = [
        'button',
        'fieldset',
        'input',
        'select',
        'optgroup',
        'option',
        'textarea',
    ];
    const isCtrl       = props.tag && htmlCtrls.includes(props.tag);
    const isCheck      = (props.tag === 'input') && ((props as any).type === 'checkbox');
    const propAccess   = usePropAccessibility(props);



    // jsx:
    return (
        <BasicComponent<TElement>
            // other props:
            {...props}


            // classes:
            mainClass={props.mainClass ?? styles.main}
            stateClasses={[...(props.stateClasses ?? []),
                (stateEnbDis.class ?? ((stateEnbDis.disabled && !isCtrl) ? 'disable' : null)),
                (stateActPass.class ?? ((stateActPass.active && !isCheck) ? 'active' : null)),
            ]}


            // Control::disabled:
            {...((stateEnbDis.disabled && isCtrl) ? {
                // accessibility:
                disabled: true,
            } : {})}
            
            
            // Check::checked:
            {...((stateActPass.active && isCheck) ? {
                // accessibility:
                checked: true,
            } : {})}
        

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