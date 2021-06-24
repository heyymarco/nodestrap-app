// react (builds html using javascript):
import {
    default as React,
    useEffect,
    useState,
}                           from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    ClassList,


    // components:
    CssConfig,
}                           from './nodestrap'  // nodestrap's core
import {
    usePropAccessibility,
}                           from './accessibilities'
import {
    cssProps as ecssProps,
}                           from './BasicComponent'
import {
    useStateActivePassive,
    cssProps as icssProps,
    IndicationProps,
}                           from './Indicator'
import {
    ControlStyles,
    ControlProps,
    Control,
}                           from './Control'



// styles:

export class ActionControlStyles extends ControlStyles {
    //#region props
    //#region animations
    public    readonly _filterPressRelease = 'filterPressRelease'
    protected readonly _animPressRelease   = 'animPressRelease'
    //#endregion animations
    //#endregion props



    //#region mixins
    // turn off default actionCtrl behavior, use a new actionCtrl implementation
    protected /*override*/ actionCtrl() { return false; }



    protected statePressing(content: JssStyle): JssStyle { return {
        '&.press,&:active:not(.disable):not(.disabled):not(:disabled)': content,
    }}
    protected statePress(content: JssStyle): JssStyle { return {
        '&.press,&.pressed,&:active:not(.disable):not(.disabled):not(:disabled)': content,
    }}
    protected stateNotPress(content: JssStyle): JssStyle { return {
        '&:not(.press):not(.pressed):not(:active), &:not(.press):not(.pressed).disable, &:not(.press):not(.pressed).disabled, &:not(.press):not(.pressed):disabled': content,
    }}
    protected stateNotPressed(content: JssStyle): JssStyle { return {
        // not fully pressed
        '&:not(.pressed)': content,
    }}
    protected stateReleasing(content: JssStyle): JssStyle { return {
        '&.release': content,
    }}
    protected stateNotReleasing(content: JssStyle): JssStyle { return {
        '&:not(.release)': content,
    }}
    protected statePressReleasing(content: JssStyle): JssStyle { return {
        '&.press,&.pressed,&:active:not(.disable):not(.disabled):not(:disabled),&.release': content,
    }}
    protected stateNotPressReleasing(content: JssStyle): JssStyle { return {
        '&:not(.press):not(.pressed):not(:active):not(.release), &:not(.press):not(.pressed).disable:not(.release), &:not(.press):not(.pressed).disabled:not(.release), &:not(.press):not(.pressed):disabled:not(.release)': content,
    }}
    protected stateNotPressingReleasing(content: JssStyle): JssStyle { return {
        '&:not(.press):not(:active):not(.release), &:not(.press).disable:not(.release), &:not(.press).disabled:not(.release), &:not(.press):disabled:not(.release)': content,
    }}



    protected /*override*/ applyStateNoAnimStartupOld(): JssStyle {
        return this.stateNotPressingReleasing(
            super.applyStateNoAnimStartupOld(),
        );
    }
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
            // requires usePropsFn() for using _foregFn & _backgFn in the actived() & activating() => active() => toggleOnActive()
            // the code below causing useStates() implicitly includes usePropsFn()
            ...this.usePropsFn(),



            //#region reset toggles/filters/anims to initial/inherit state
            [this.decl(this._filterActivePassive)] : inherit ? 'unset' : 'initial',
            [this.decl(this._animActivePassive)]   : inherit ? 'unset' : 'initial',
            //#endregion reset toggles/filters/anims to initial/inherit state
        }],



        // .pressed will be added after pressing-animation done
        [ '&.pressed'                                                                                      , this.pressed()   ],

        // .press = programatically press, :active = user press
        [ '&.press,' +
          '&:active:not(.disabled):not(.disable):not(:disabled):not(.pressed):not(.release):not(.released)', this.pressing()  ],

        // .release will be added after loosing press and will be removed after releasing-animation done
        [ '&.release'                                                                                      , this.releasing() ],

        // if all above are not set => released
        // optionally use .released to kill pseudo :active
        [ '&:not(.pressed):not(.press):not(:active):not(.release),' +
          '&:not(.pressed):not(.press).disabled:not(.release),'     +
          '&:not(.pressed):not(.press).disable:not(.release),'      +
          '&:not(.pressed):not(.press):disabled:not(.release),'     +
          '&.released'                                                                                     , this.released()  ],
    ]}

    public /*virtual*/ pressed()   : JssStyle { return {} }
    public /*virtual*/ pressing()  : JssStyle { return {} }
    public /*virtual*/ releasing() : JssStyle { return {} }
    public /*virtual*/ released()  : JssStyle { return {} }



    // old:
    public /*override*/ controlStatesOld(inherit = false): JssStyle { return {
        extend: [
            super.controlStatesOld(inherit), // copy controlStates from base



            this.iif(!inherit, {
                //#region all initial states are none
                [this.decl(this._animPressRelease)]    : ecssProps.animNone,
                //#endregion all initial states are none
            }),



            //#region specific states
            //#region press, release
            this.statePressReleasing({ // [pressing, pressed, releasing]
                [this.decl(this._filterActivePassive)] : icssProps.filterActive,
            }),
            this.statePress({ // [pressing, pressed]
                [this.decl(this._animPressRelease)]    : icssProps.animActive,
            }),
            this.stateReleasing({ // [releasing]
                [this.decl(this._animPressRelease)]    : icssProps.animPassive,
            }),
            {
                // [pressed]
                '&.pressed': // if activated programmatically (not by user input), disable the animation
                    this.applyStateNoAnimStartupOld(),
            },
            //#endregion press, release
            //#endregion specific states
        ] as JssStyle,
    }}
    public /*override*/ controlAnimFnOld(): JssStyle { return {
        //#region re-arrange the animFn at different states
        '&.press,&.pressed': // if activated programmatically (not by user input)
            this.stateNotDisabled({ // if ctrl was not fully disabled
                // define an *animations* func:
                [this.decl(this._animFnOld)]: [
                    ecssProps.anim,
                    this.ref(this._animPressRelease),  // 5th : ctrl already pressed, move to the least priority
                    this.ref(this._animArriveLeave),    // 4th : cursor leaved   => low probability because holding press
                    this.ref(this._animFocusBlur),     // 3rd : ctrl lost focus => low probability because holding press
                    this.ref(this._animEnableDisable), // 2nd : ctrl enable/disable => rarely used => low probability
                    this.ref(this._animActivePassive), // 1st : ctrl got activated  => the most likely happened
                ],
            }),

        // define an *animations* func:
        [this.decl(this._animFnOld)]: [
            ecssProps.anim,
            this.ref(this._animEnableDisable), // 5th : ctrl must be enabled
            this.ref(this._animActivePassive), // 4th : rarely happened => low probability
            this.ref(this._animArriveLeave),    // 3rd : cursor hovered over ctrl
            this.ref(this._animFocusBlur),     // 2nd : ctrl got focused (can interrupt hover/leave)
            this.ref(this._animPressRelease),  // 1st : ctrl got pressed (can interrupt focus/blur)
        ],
        //#endregion re-arrange the animFn at different states
    }}
}
export const actionControlStyles = new ActionControlStyles();



// configs:

const cssConfig = new CssConfig(() => {
    

    
    
    return {
        //#region animations
        //#endregion animations
    };
}, /*prefix: */'act');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// hooks:

export function useStatePressRelease(props: IndicationProps, classes = { active: 'press' as (string|null), actived: 'pressed' as (string|null), passive: 'release' as (string|null) }, mouses: string[]|null = ['click'], keys: string[]|null = ['space']) {
    // fn props:
    const propAccess  = usePropAccessibility<boolean, null>(props, undefined, null);
    const propEnabled = propAccess.enabled;
    const propActive  = propAccess.active;



    // states:
    const [activeDn, setActiveDn] = useState<boolean>(false); // uncontrollable (dynamic) state: true => user press, false => user release

    const stateActPass = useStateActivePassive({
        // other props:
        ...props,


        // accessibility:
        active        : undefined, // do not `.press`/`.release` when [active] (no *controllable active*)
        inheritActive : false,     // do not `.press`/`.release` when parent [active]


        // behaviors:
        actionCtrl    : true,      // always use actionCtrl implementation
    }, activeDn, classes);



    
    useEffect(() => {
        if (!propEnabled)        return; // control is disabled => no response required
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
    }, [propEnabled, propActive]);



    const handleActivating = () => {
        if (!propEnabled)        return; // control is disabled => no response required
        if (propActive !== null) return; // controllable [active] is set => no uncontrollable required



        setActiveDn(true);
    }
    return {
        ...stateActPass,

        
        handleMouseDown : ((e) => { // for ActionControl
            if (!mouses || mouses.includes(e.type.toLowerCase())) handleActivating();
        }) as React.MouseEventHandler<HTMLElement>,
        handleKeyDown   : ((e) => { // for ActionControl
            if (!keys || keys.includes(e.code.toLowerCase()) || keys.includes(e.key.toLowerCase())) handleActivating();
        }) as React.KeyboardEventHandler<HTMLElement>,
    };
}



// react components:

export interface ActionControlProps<TElement extends HTMLElement = HTMLElement>
    extends
        ControlProps<TElement>
{
}
export default function ActionControl<TElement extends HTMLElement = HTMLElement>(props: ActionControlProps<TElement>) {
    // styles:
    const styles       = actionControlStyles.useStyles();

    
    
    // states:
    const statePrssRls = useStatePressRelease(props);



    // jsx:
    return (
        <Control<TElement>
            // other props:
            {...props}


            // behaviors:
            actionCtrl={false} // turn off default actionCtrl behavior, use a new actionCtrl implementation


            // classes:
            mainClass={props.mainClass ?? styles.main}
            stateClasses={[...(props.stateClasses ?? []),
                statePrssRls.class,
            ]}
        

            // events:
            onMouseDown={(e) => { statePrssRls.handleMouseDown(e); props.onMouseDown?.(e); }}
            onKeyDown=  {(e) => { statePrssRls.handleKeyDown(e);   props.onKeyDown?.(e);   }}
            onAnimationEnd={(e) => {
                // states:
                statePrssRls.handleAnimationEnd(e);


                // forwards:
                props.onAnimationEnd?.(e);
            }}
        />
    );
}
export { ActionControl }