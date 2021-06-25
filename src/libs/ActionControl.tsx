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
    PropEx,
    Cust,
    ClassList,


    // components:
    CssConfig,
}                           from './nodestrap'  // nodestrap's core
import {
    usePropEnabled,
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
 // public    readonly _filterPressRelease  = 'filterPressRelease' // already defined in Indicator
    protected readonly _animPressRelease    = 'animPressRelease'
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
            //#region reset toggles/filters/anims to initial/inherit state
            [this.decl(this._filterPressRelease)] : inherit ? 'unset' : 'initial',
            [this.decl(this._animPressRelease)]   : inherit ? 'unset' : 'initial',
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

    public /*virtual*/ pressed()   : JssStyle { return {
        [this.decl(this._filterPressRelease)] : cssProps.filterPress,



        extend: [
            this.press(),
        ] as JssStyle,
    }}
    public /*virtual*/ pressing()  : JssStyle { return {
        [this.decl(this._filterPressRelease)] : cssProps.filterPress,
        [this.decl(this._animPressRelease)]   : cssProps.animPress,



        extend: [
            this.press(),
        ] as JssStyle,
    }}
    public /*virtual*/ releasing() : JssStyle { return {
        [this.decl(this._filterPressRelease)] : cssProps.filterPress,
        [this.decl(this._animPressRelease)]   : cssProps.animRelease,



        extend: [
            this.release(),
        ] as JssStyle,
    }}
    public /*virtual*/ released()  : JssStyle { return {
        /* --nothing-- */



        extend: [
            this.release(),
        ] as JssStyle,
    }}
    public /*virtual*/ press()     : JssStyle { return {
    }}
    public /*virtual*/ release()   : JssStyle { return {
    }}



    // functions:
    public /*override*/ animFn(): Cust.Ref[] { return [
        ...super.animFn(),



        this.ref(this._animPressRelease, this._animNone), // 1st : ctrl got pressed
    ]}



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
    const keyframesPress  : PropEx.Keyframes = {
        from: {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...actionControlStyles.filterFn().filter((f) => f !== actionControlStyles.ref(actionControlStyles._filterPressRelease, actionControlStyles._filterNone)),

             // actionControlStyles.ref(actionControlStyles._filterPressRelease, actionControlStyles._filterNone), // missing the last => let's the browser interpolated it
            ]],
        },
        to: {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...actionControlStyles.filterFn().filter((f) => f !== actionControlStyles.ref(actionControlStyles._filterPressRelease, actionControlStyles._filterNone)),

                actionControlStyles.ref(actionControlStyles._filterPressRelease, actionControlStyles._filterNone), // existing the last => let's the browser interpolated it
            ]],
        },
    };
    const keyframesRelease : PropEx.Keyframes = {
        from : keyframesPress.to,
        to   : keyframesPress.from,
    };



    return {
        //#region animations
        filterPress          : icssProps.filterActive,

        '@keyframes press'   : keyframesPress,
        '@keyframes release' : keyframesRelease,
        animPress            : [['150ms', 'ease-out', 'both', keyframesPress  ]],
        animRelease          : [['300ms', 'ease-out', 'both', keyframesRelease]],
        //#endregion animations
    };
}, /*prefix: */'act');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// hooks:

export function useStatePressRelease(props: IndicationProps, classes = { active: 'press' as (string|null), actived: 'pressed' as (string|null), passive: 'release' as (string|null) }, mouses: number[]|null = [0], keys: string[]|null = ['space']) {
    // fn props:
    const propEnabled = usePropEnabled(props);



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
        if (!propEnabled) return; // control is disabled => no response required



        const handleReleasing = () => {
            setActiveDn(false);
        }
        window.addEventListener('mouseup', handleReleasing);
        window.addEventListener('keyup',   handleReleasing);
        return () => {
            window.removeEventListener('mouseup', handleReleasing);
            window.removeEventListener('keyup',   handleReleasing);
        }
    }, [propEnabled]);



    const handlePressing = () => {
        if (!propEnabled) return; // control is disabled => no response required



        setActiveDn(true);
    }
    return {
        ...stateActPass,

        
        handleMouseDown : ((e) => { // for ActionControl
            if (!mouses || mouses.includes(e.button)) handlePressing();
        }) as React.MouseEventHandler<HTMLElement>,
        handleKeyDown   : ((e) => { // for ActionControl
            if (!keys || keys.includes(e.code.toLowerCase()) || keys.includes(e.key.toLowerCase())) handlePressing();
        }) as React.KeyboardEventHandler<HTMLElement>,

        handleAnimationEnd : (e: React.AnimationEvent<HTMLElement>) => {
            if (e.target !== e.currentTarget) return; // no bubbling
            if (/((?<![a-z])(press|release)|(?<=[a-z])(Press|Release))(?![a-z])/.test(e.animationName)) {
                stateActPass.handleIdle();
            }
        },
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