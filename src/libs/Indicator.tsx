// react (builds html using javascript):
import {
    default as React,
    useState,
    useEffect,
}                           from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    PropEx,
    Cust,
    ClassList,


    // components:
    CssConfig,
}                           from './nodestrap'  // nodestrap's core
import {
    BasicComponentStyles,
    cssProps as bcssProps,
    BasicComponentProps,
    BasicComponent,
}                           from './BasicComponent'
import {
    usePropAccessibility,
    usePropEnabled,
    AccessibilityProps,
    AccessibilityProvider,
}                           from './accessibilities'



// styles:

export class IndicatorStyles extends BasicComponentStyles {
    //#region scoped css props
    // anim props:

    public    readonly _filterEnableDisable = 'filterEnableDisable'
    protected readonly _animEnableDisable   = 'animEnableDisable'

    public    readonly _filterHoverLeave    = 'filterHoverLeave' // will be used in Control, so we can re-use our animations (enable, disable, hover, leave) in the Control
 // protected readonly _animHoverLeave      = 'animHoverLeave'   // will be defined in Control

    public    readonly _filterActivePassive = 'filterActivePassive'
    protected readonly _animActivePassive   = 'animActivePassive'
    //#endregion scoped css props



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



        ...this.indicationStates(),
    ]}
    public /*virtual*/ indicationStates(): ClassList { return [
        [ null, {
            [this.decl(this._filterHoverLeave)] : bcssProps.filterNone, // will be used in Control, so we can re-use our animations (enable, disable, hover, leave) in the Control
        }],



        [ '&:not(.enable):not(.disable):not(.disabled):not(:disabled)'  , this.enabled()     ],
        [ '&.enable'                                                    , this.enabling()    ],
        [ '&.disable'                                                   , this.disabling()   ],
        [ '&.disabled,&:disabled'                                       , this.disabled()    ],

        
        
        [ '&.actived,&:checked:not(.active)'                            , this.actived()     ],
        [ '&.active'                                                    , this.activating()  ],
        [ '&.passive'                                                   , this.passivating() ],
        [ '&:not(.active):not(.actived):not(:checked):not(.passive)'    , this.passived()    ],



        [ '&.pressed'                                                   , this.pressed()     ],
        [ '&.press,&:active:not(.disable):not(.disabled):not(:disabled)', this.pressing()    ],
        [ '&.release'                                                   , this.releasing()   ],
        [ '&:not(.press):not(:active):not(.pressed):not(.release),' +
          '&:not(.press).disable:not(.pressed):not(.release),'      +
          '&:not(.press).disabled:not(.pressed):not(.release),'     +
          '&:not(.press):disabled:not(.pressed):not(.release)'          , this.released()    ],
    ]}
    
    public /*virtual*/ enabled()     : JssStyle { return {
        [this.decl(this._filterEnableDisable)] : bcssProps.filterNone,
        [this.decl(this._animEnableDisable)]   : bcssProps.animNone,
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
        [this.decl(this._animEnableDisable)]   : bcssProps.animNone,
    }}

    public /*virtual*/ actived()     : JssStyle { return {
        [this.decl(this._filterActivePassive)] : cssProps.filterActive,
        [this.decl(this._animActivePassive)]   : bcssProps.animNone,

        extend: [
            this.themeActive(),
            this.outlinedActive(),
        ] as JssStyle,
    }}
    public /*virtual*/ activating()  : JssStyle { return {
        [this.decl(this._filterActivePassive)] : cssProps.filterActive,
        [this.decl(this._animActivePassive)]   : cssProps.animActive,

        extend: [
            this.themeActive(),
            this.outlinedActive(),
        ] as JssStyle,
    }}
    public /*virtual*/ passivating() : JssStyle { return {
        [this.decl(this._filterActivePassive)] : cssProps.filterActive,
        [this.decl(this._animActivePassive)]   : cssProps.animPassive,
    }}
    public /*virtual*/ passived()    : JssStyle { return {
        [this.decl(this._filterActivePassive)] : bcssProps.filterNone,
        [this.decl(this._animActivePassive)]   : bcssProps.animNone,
    }}
    public /*virtual*/ themeActive(theme = 'secondary'): JssStyle {
        return this.themeIf(theme);
    }
    public /*virtual*/ outlinedActive(): JssStyle {
        // *toggle off* the outlined props:
        return this.toggleOffOutlined();
    }

    public /*virtual*/ pressed(): JssStyle { return {} }
    public /*virtual*/ pressing(): JssStyle { return {} }
    public /*virtual*/ releasing(): JssStyle { return {} }
    public /*virtual*/ released(): JssStyle { return {} }



    // functions:
    public /*override*/ filterFn(): Cust.Ref[] { return [
        ...super.filterFn(),



        ...this.indicationFilterFn(),
    ]}
    public /*virtual*/ indicationFilterFn(): Cust.Ref[] { return [
        this.ref(this._filterEnableDisable),
        this.ref(this._filterActivePassive),
        this.ref(this._filterHoverLeave), // will be used in Control, so we can re-use our animations (enable, disable, hover, leave) in the Control
    ]}

    public /*override*/ animFn(): Cust.Ref[] { return [
        ...super.animFn(),



        ...this.indicationAnimFn(),
    ]}
    public /*virtual*/ indicationAnimFn(): Cust.Ref[] { return [
        this.ref(this._animEnableDisable), // 2nd : ctrl must be enabled
        this.ref(this._animActivePassive), // 1st : ctrl got pressed
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
        //#region re-arrange the animFn at different states
        '&.active,&.actived': // if activated programmatically (not by user input)
            this.stateNotDisabled({ // if ctrl was not fully disabled
                // define an *animations* func:
                [this.decl(this._animFn)]: [
                    bcssProps.anim,
                    this.ref(this._animActivePassive), // 2nd : ctrl already pressed, move to the least priority
                    this.ref(this._animEnableDisable), // 1st : ctrl enable/disable => rarely used => low probability
                ],
            }),

        // define an *animations* func:
        [this.decl(this._animFn)]: [
            bcssProps.anim,
            this.ref(this._animEnableDisable), // 2nd : ctrl must be enabled
            this.ref(this._animActivePassive), // 1st : ctrl got pressed
        ],
        //#endregion re-arrange the animFn at different states
    }}
}
export const indicatorStyles = new IndicatorStyles();



// configs:

const cssConfig = new CssConfig(() => {
    const keyframesDisable   : PropEx.Keyframes = {
        from: {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...indicatorStyles.filterFn().filter((f) => f !== indicatorStyles.ref(indicatorStyles._filterEnableDisable)),

             // styles.ref(styles._filterEnableDisable), // missing the last => let's the browser interpolated it
            ]],
        },
        to: {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...indicatorStyles.filterFn().filter((f) => f !== indicatorStyles.ref(indicatorStyles._filterEnableDisable)),

                indicatorStyles.ref(indicatorStyles._filterEnableDisable), // existing the last => let's the browser interpolated it
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
                ...indicatorStyles.filterFn().filter((f) => f !== indicatorStyles.ref(indicatorStyles._filterActivePassive)),

             // styles.ref(styles._filterActivePassive), // missing the last => let's the browser interpolated it
            ]],
        },
        to: {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...indicatorStyles.filterFn().filter((f) => f !== indicatorStyles.ref(indicatorStyles._filterActivePassive)),

                indicatorStyles.ref(indicatorStyles._filterActivePassive), // existing the last => let's the browser interpolated it
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

export function useStateActivePassive(props: IndicationProps, classes = { active: 'active' as (string|null), actived: 'actived' as (string|null), passive: 'passive' as (string|null) }, mouses: string[]|null = ['click'], keys: string[]|null = ['space']) {
    // fn props:
    const propAccess  = usePropAccessibility<boolean, null>(props, undefined, null);
    const propEnabled = propAccess.enabled;
    const propActive  = propAccess.active;
    const propClickable: boolean =  // control is clickable if [is actionCtrl] and [is enabled]
        (props.actionCtrl ?? false) // if [actionCtrl] was not specified => the default value is [actionCtrl=false] (readonly)
        &&
        propEnabled
        ;



    // states:
    const [actived,   setActived  ] = useState<boolean>(propActive ?? false); // true => active, false => passive
    const [animating, setAnimating] = useState<boolean|null>(null);           // null => no-animation, true => activating-animation, false => deactivating-animation

    const [activeDn,  setActiveDn ] = useState<boolean>(false);               // uncontrollable (dynamic) state: true => user activate, false => user deactivate

    

    /*
     * state is active/passive based on [controllable active] (if set) and fallback to [uncontrollable active]
     */
    const activeFn: boolean = propActive /*controllable*/ ?? (propClickable && activeDn /*uncontrollable*/);

    if (actived !== activeFn) { // change detected => apply the change & start animating
        setActived(activeFn);   // remember the last change
        setAnimating(activeFn); // start activating-animation/deactivating-animation
    }



    useEffect(() => {
        if (!propClickable)      return; // control is not clickable => no response required
        if (propActive !== null) return; // controllable [active] is set => no uncontrollable required



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
        if (!propClickable)      return; // control is not clickable => no response required
        if (propActive !== null) return; // controllable [active] is set => no uncontrollable required



        setActiveDn(true);
    }
    const handleIdle = () => {
        // clean up finished animation

        setAnimating(null); // stop activating-animation/deactivating-animation
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
        handleMouseDown    : ((e) => { // for Control
            if (!mouses || mouses.includes(e.type.toLowerCase())) handleActivating();
        }) as React.MouseEventHandler<HTMLElement>,
        handleKeyDown      : ((e) => { // for Control
            if (!keys || keys.includes(e.code.toLowerCase()) || keys.includes(e.key.toLowerCase())) handleActivating();
        }) as React.KeyboardEventHandler<HTMLElement>,
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
    const isHtmlCtrl   = props.tag && htmlCtrls.includes(props.tag);
    const isActionCtrl = props.actionCtrl ?? false;
    const propAccess   = usePropAccessibility(props);



    // jsx:
    return (
        <BasicComponent<TElement>
            // other props:
            {...props}


            // classes:
            mainClass={props.mainClass ?? styles.main}
            stateClasses={[...(props.stateClasses ?? []),
                (stateEnbDis.class ?? ((stateEnbDis.disabled && !isHtmlCtrl) ? 'disabled' : null)),
                stateActPass.class,
            ]}


            // Indicator props:
            {...(isHtmlCtrl ? {
                // accessibility:
                disabled: stateEnbDis.disabled,
            } : {})}
        

            // events:
            onMouseDown={(e) => { if (isActionCtrl) stateActPass.handleMouseDown(e); props.onMouseDown?.(e); }}
            onKeyDown=  {(e) => { if (isActionCtrl) stateActPass.handleKeyDown(e);   props.onKeyDown?.(e);   }}
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