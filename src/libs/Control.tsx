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

    
    // components:
    CssConfig,
}                           from './nodestrap'   // nodestrap's core
import {
    usePropEnabled,
}                           from './accessibilities'
import * as stripOuts       from './strip-outs'
import {
    cssProps as bcssProps,
}                           from './BasicComponent'
import {
    IndicatorStyles,
    IndicatorProps,
    Indicator,
}                           from './Indicator'



// styles:

export interface IControlStylesBuilderOld {
    // states:
    controlStatesOld(inherit : boolean): JssStyle



    // functions:
    controlPropsFn(): JssStyle
    controlAnimFn(): JssStyle



    // styles:
    controlBasicStyle(): JssStyle
}
export class ControlStyles extends IndicatorStyles {
    //#region props
    //#region animations
    public    readonly _boxShadowFocusBlur = 'boxShadowFocusBlur'
    protected readonly _animFocusBlur      = 'animFocusBlur'

 // public    readonly _filterArriveLeave  = 'filterArriveLeave' // already defined in Indicator
    protected readonly _animArriveLeave    = 'animArriveLeave'
    //#endregion animations
    //#endregion props



    //#region mixins
    // stateHovering => not exist, because .hovered doesn't exist
    protected stateHover(content: JssStyle): JssStyle { return {
        // hover: hover by mouse || hover by keyboard (focus)
        '&:hover,&.focus,&:focus': content,
    }}
    protected stateNotHover(content: JssStyle): JssStyle { return {
        '&:not(:hover):not(.focus):not(:focus)': content,
    }}
    // stateNotHovered => not exist, because .hovered doesn't exist
    protected stateLeaving(content: JssStyle): JssStyle {
        // leave: leave by mouse && leave by keyboard (blur)
        // mouse-leave but still keybd-focus => not leave
        // keybd-blur  but still mouse-hover => not leave
        return this.stateNotHover({
            '&.leave,&.blur': content,
        });
    }
    protected stateNotLeaving(content: JssStyle): JssStyle { return {
        // not-leave: not leave by mouse && not leave by keyboard (blur)
        '&:not(.leave):not(.blur)': content,
    }}
    protected stateHoverLeaving(content: JssStyle): JssStyle { return {
        '&:hover,&.focus,&:focus,&.leave,&.blur': content,
    }}
    protected stateNotHoverLeaving(content: JssStyle): JssStyle { return {
        '&:not(:hover):not(.focus):not(:focus):not(.leave):not(.blur)': content,
    }}
    // stateNotHoveringLeaving => not exist, because .hovered doesn't exist
    


    protected stateFocusing(content: JssStyle): JssStyle { return {
        '&.focus,&:focus': content,
    }}
    protected stateFocus(content: JssStyle): JssStyle { return {
        '&.focus,&.focused,&:focus': content,
    }}
    protected stateNotFocus(content: JssStyle): JssStyle { return {
        '&:not(.focus):not(.focused):not(:focus)': content,
    }}
    protected stateNotFocused(content: JssStyle): JssStyle { return {
        // not fully focused
        '&:not(.focused)': content,
    }}
    protected stateBlurring(content: JssStyle): JssStyle { return {
        '&.blur': content,
    }}
    protected stateNotBlurring(content: JssStyle): JssStyle { return {
        '&:not(.blur)': content,
    }}
    protected stateFocusBlurring(content: JssStyle): JssStyle { return {
        '&.focus,&.focused,&:focus,&.blur': content,
    }}
    protected stateNotFocusBlurring(content: JssStyle): JssStyle { return {
        '&:not(.focus):not(.focused):not(:focus):not(.blur)': content,
    }}
    protected stateNotFocusingBlurring(content: JssStyle): JssStyle { return {
        '&:not(.focus):not(:focus):not(.blur)': content,
    }}
    


    protected /*override*/ actionCtrl() { return true; }
    


    protected /*override*/ applyStateNoAnimStartupOld(): JssStyle {
        return this.stateNotHoverLeaving(
            this.stateNotFocusingBlurring(
                super.applyStateNoAnimStartupOld()
            )
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
            // requires usePropsFn() for using [_foregFn, _backgFn, & _boxShadowFocusFn] in the [focused(), focusing(), arrived(), arriving()] => [focus(), arrive()] => toggleOnActive()
            // the code below causing useStates() implicitly includes usePropsFn()
            ...this.usePropsFn(),



            //#region reset toggles/filters/anims to initial/inherit state
            [this.decl(this._boxShadowFocusBlur)] : inherit ? 'unset' : 'initial',
            [this.decl(this._animFocusBlur)]      : inherit ? 'unset' : 'initial',
            [this.decl(this._filterArriveLeave)]  : inherit ? 'unset' : 'initial',
            [this.decl(this._animArriveLeave)]    : inherit ? 'unset' : 'initial',

            ...this.toggleOffActive(inherit),
            //#endregion reset toggles/filters/anims to initial/inherit state
        }],



        // .focused will be added after focusing-animation done
        [ '&.focused'                                                                        , this.focused()  ],

        // .focus = programatically focus, :focus = user focus
        [ '&.focus,&:focus:not(.focused)'                                                    , this.focusing() ],

        // .blur will be added after loosing focus and will be removed after blurring-animation done
        [ '&.blur'                                                                           , this.blurring() ],

        // if all above are not set => blurred
        [ '&:not(.focused):not(.focus):not(:focus):not(.blur)'                               , this.blurred()  ],



        // .arrived will be added after arriving-animation done
        [ '&.arrived'                                                                        , this.arrived()  ],

        // .arrive = programatically arrive (not implemented yet), :hover = user arrive
        // focus triggers arriving too
        [ '&:hover:not(.arrived):not(.disabled):not(:disabled):not(.disable),' +
          '&.focused,&.focus,&:focus'                                                        , this.arriving() ],

        // .leave will be added after loosing arrive and will be removed after leaving-animation done
        [ '.leave'                                                                           , this.leaving()  ],

        // if all above are not set => left
        [ '&:not(.arrived):not(:hover):not(.focused):not(.focus):not(:focus):not(.leave),' +
          '&:not(.arrived).disabled:not(.focused):not(.focus):not(:focus):not(.leave),'    +
          '&:not(.arrived):disabled:not(.focused):not(.focus):not(:focus):not(.leave),'    +
          '&:not(.arrived).disable:not(.focused):not(.focus):not(:focus):not(.leave)'        , this.left()    ],
    ]}

    public /*override*/ disable() : JssStyle { return {
        extend: [
            super.disable(), // copy disable from base
        ] as JssStyle,



        // accessibility:
        cursor     : cssProps.cursorDisable,
        userSelect : 'none',
    }}

    public /*virtual*/ focused()  : JssStyle { return {
        [this.decl(this._boxShadowFocusBlur)] : this.ref(this._boxShadowFocusFn),
        
        
        
        extend: [
            this.focus(),
        ] as JssStyle,
    }}
    public /*virtual*/ focusing() : JssStyle { return {
        [this.decl(this._boxShadowFocusBlur)] : this.ref(this._boxShadowFocusFn),
        [this.decl(this._animFocusBlur)]      : cssProps.animFocus,

        
        
        extend: [
            this.focus(),
        ] as JssStyle,
    }}
    public /*virtual*/ blurring() : JssStyle { return {
        [this.decl(this._boxShadowFocusBlur)] : this.ref(this._boxShadowFocusFn),
        [this.decl(this._animFocusBlur)]      : cssProps.animBlur,



        extend: [
            this.blur(),
        ] as JssStyle,
    }}
    public /*virtual*/ blurred()  : JssStyle { return {
        /* --nothing-- */



        extend: [
            this.blur(),
        ] as JssStyle,
    }}
    public /*virtual*/ focus()    : JssStyle { return {
        extend: [
            this.active(),
        ] as JssStyle,
    }}
    public /*virtual*/ blur()     : JssStyle { return {
    }}

    public /*virtual*/ arrived()  : JssStyle { return {
        [this.decl(this._filterArriveLeave)]   : cssProps.filterArrive,



        extend: [
            this.arrive(),
        ] as JssStyle,
    }}
    public /*virtual*/ arriving() : JssStyle { return {
        [this.decl(this._filterArriveLeave)]   : cssProps.filterArrive,
        [this.decl(this._animArriveLeave)]     : cssProps.animArrive,



        extend: [
            this.arrive(),
        ] as JssStyle,
    }}
    public /*virtual*/ leaving()  : JssStyle { return {
        [this.decl(this._filterArriveLeave)]   : cssProps.filterArrive,
        [this.decl(this._animArriveLeave)]     : cssProps.animLeave,



        extend: [
            this.leave(),
        ] as JssStyle,
    }}
    public /*virtual*/ left()     : JssStyle { return {
        /* --nothing-- */



        extend: [
            this.leave(),
        ] as JssStyle,
    }}
    public /*virtual*/ arrive()   : JssStyle { return {
        extend: [
            this.active(),
        ] as JssStyle,
    }}
    public /*virtual*/ leave()    : JssStyle { return {
    }}

    public /*override*/ themeDefault(theme: string|null = 'secondary'): JssStyle {
        // change default parameter from null to 'secondary'
        return super.themeDefault(theme);
    }
    public /*override*/ themeActive(theme = 'primary'): JssStyle {
        // change default parameter from 'secondary' to 'primary'
        return super.themeActive(theme);
    }



    // functions:
    public /*override*/ boxShadowFn(): Cust.Ref[] { return [
        ...super.boxShadowFn(),



        this.ref(this._boxShadowFocusBlur, this._boxShadowNone),
    ]}
    public /*override*/ animFn(): Cust.Ref[] { return [
        ...super.animFn(),



        this.ref(this._animFocusBlur, this._animNone),   // 2nd : ctrl got focus
        this.ref(this._animArriveLeave, this._animNone), // 1st : mouse arrive in
    ]}



    // styles:
    public /*virtual*/ controlBasicStyle(): JssStyle { return {
        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            stripOuts.control,  // clear browser's default styles

            super.basicStyle(), // copy basicStyle from base

            this.controlBasicStyle(),
        ] as JssStyle,
    }}



    // old:
    public /*virtual*/ controlStatesOld(inherit = false): JssStyle { return {} }
    public /*virtual*/ controlPropsFnOld(): JssStyle { return {} }
    public /*virtual*/ controlAnimFnOld(): JssStyle { return {} }
}
export const controlStyles = new ControlStyles();



// configs:

const cssConfig = new CssConfig(() => {
    const keyframesFocus   : PropEx.Keyframes = {
        from: {
            boxShadow: [[[ // triple array => makes the JSS treat as comma separated values
                ...controlStyles.boxShadowFn().filter((b) => b !== controlStyles.ref(controlStyles._boxShadowFocusBlur, controlStyles._boxShadowNone)),

             // styles.ref(styles._boxShadowFocusBlur, styles._boxShadowNone), // missing the last => let's the browser interpolated it
            ]]],
        } as JssStyle,
        to: {
            boxShadow: [[[ // triple array => makes the JSS treat as comma separated values
                ...controlStyles.boxShadowFn().filter((b) => b !== controlStyles.ref(controlStyles._boxShadowFocusBlur, controlStyles._boxShadowNone)),

                controlStyles.ref(controlStyles._boxShadowFocusBlur, controlStyles._boxShadowNone), // existing the last => let's the browser interpolated it
            ]]],
        } as JssStyle,
    };
    const keyframesBlur    : PropEx.Keyframes = {
        from : keyframesFocus.to,
        to   : keyframesFocus.from,
    };



    const keyframesArrive  : PropEx.Keyframes = {
        from: {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...controlStyles.filterFn().filter((f) => f !== controlStyles.ref(controlStyles._filterArriveLeave, controlStyles._filterNone)),

             // controlStyles.ref(controlStyles._filterArriveLeave, controlStyles._filterNone), // missing the last => let's the browser interpolated it
            ]],
        },
        to: {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...controlStyles.filterFn().filter((f) => f !== controlStyles.ref(controlStyles._filterArriveLeave, controlStyles._filterNone)),

                controlStyles.ref(controlStyles._filterArriveLeave, controlStyles._filterNone), // existing the last => let's the browser interpolated it
            ]],
        },
    };
    const keyframesLeave   : PropEx.Keyframes = {
        from : keyframesArrive.to,
        to   : keyframesArrive.from,
    };

    
    
    return {
        cursor              : 'pointer',
        cursorDisable       : 'not-allowed',
    
    

        //#region animations
        filterArrive        : [['brightness(85%)', 'drop-shadow(0 0 0.01px rgba(0,0,0,0.4))']],

        '@keyframes focus'  : keyframesFocus,
        '@keyframes blur'   : keyframesBlur,
        '@keyframes arrive' : keyframesArrive,
        '@keyframes leave'  : keyframesLeave,
        animFocus           : [['150ms', 'ease-out', 'both', keyframesFocus ]],
        animBlur            : [['300ms', 'ease-out', 'both', keyframesBlur  ]],
        animArrive          : [['150ms', 'ease-out', 'both', keyframesArrive]],
        animLeave           : [['300ms', 'ease-out', 'both', keyframesLeave ]],
        //#endregion animations
    };
}, /*prefix: */'ctrl');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// hooks:

export function useStateFocusBlur<TElement extends HTMLElement = HTMLElement>(props: ControlProps<TElement>) {
    // fn props:
    const propEnabled = usePropEnabled(props);



    // states:
    const [focused,   setFocused  ] = useState<boolean>(props.focus ?? false); // true => focus, false => blur
    const [animating, setAnimating] = useState<boolean|null>(null); // null => no-animation, true => focusing-animation, false => blurring-animation

    const [focusDn,   setFocusDn  ] = useState<boolean>(false);     // uncontrollable (dynamic) state: true => user focus, false => user blur


    
    /*
     * state is always blur if disabled
     * state is focus/blur based on [controllable focus] (if set) and fallback to [uncontrollable focus]
     */
    const focusFn: boolean = propEnabled && (props.focus /*controllable*/ ?? focusDn /*uncontrollable*/);

    if (focused !== focusFn) { // change detected => apply the change & start animating
        setFocused(focusFn);   // remember the last change
        setAnimating(focusFn); // start focusing-animation/blurring-animation
    }


    
    const handleFocus = () => {
        if (!propEnabled)              return; // control is disabled => no response required
        if (props.focus !== undefined) return; // controllable [focus] is set => no uncontrollable required



        setFocusDn(true);
    }
    const handleBlur = () => {
        if (!propEnabled)              return; // control is disabled => no response required
        if (props.focus !== undefined) return; // controllable [focus] is set => no uncontrollable required



        setFocusDn(false);
    }
    const handleIdle = () => {
        // clean up finished animation

        setAnimating(null); // stop focusing-animation/blurring-animation
    }
    return {
        focus    : focused,
        blurring : (animating === false),

        class    : ((): string|null => {
            // focusing:
            if (animating === true) {
                // focusing by controllable prop => use class .focus
                if (props.focus !== undefined) return 'focus';

                // negative tabIndex => can't be focused by user input => treats Control as *wrapper* element => use class .focus
                if ((props.tabIndex ?? 0) < 0) return 'focus';

                // otherwise use pseudo :focus
                return null;
            } // if

            // blurring:
            if (animating === false) return 'blur';

            // fully focused:
            if (focused) return 'focused';

            // fully blurred:
            return null;
        })(),

        handleFocus        : handleFocus,
        handleBlur         : handleBlur,
        handleAnimationEnd : (e: React.AnimationEvent<HTMLElement>) => {
            if (e.target !== e.currentTarget) return; // no bubbling
            if (/((?<![a-z])(focus|blur)|(?<=[a-z])(Focus|Blur))(?![a-z])/.test(e.animationName)) {
                handleIdle();
            }
        },
    };
}

export function useStateArriveLeave<TElement extends HTMLElement = HTMLElement>(props: ControlProps<TElement>, stateFocusBlur: { focus: boolean, blurring: boolean }) {
    // fn props:
    const propEnabled = usePropEnabled(props);



    // states:
    const [arrived,   setArrived  ] = useState<boolean>(false);     // true => arrive, false => leave
    const [animating, setAnimating] = useState<boolean|null>(null); // null => no-animation, true => arriving-animation, false => leaving-animation

    const [arriveDn,   setArriveDn ] = useState<boolean>(false);    // uncontrollable (dynamic) state: true => user arrive, false => user leave



    /*
     * state is always leave if disabled
     * state is arrive/leave based on [uncontrollable arrive]
     * [controllable arrive] is not supported
     */
    const arriveFn: boolean = propEnabled && arriveDn /*uncontrollable*/;

    if (arrived !== arriveFn) { // change detected => apply the change & start animating
        setArrived(arriveFn);   // remember the last change
        setAnimating(arriveFn); // start arriving-animation/leaving-animation
    }


    
    const handleArrive = () => {
        if (!propEnabled) return; // control is disabled => no response required



        setArriveDn(true);
    }
    const handleLeave  = () => {
        if (!propEnabled) return; // control is disabled => no response required



        setArriveDn(false);
    }
    const handleIdle   = () => {
        // clean up finished animation

        setAnimating(null); // stop arriving-animation/leaving-animation
    }
    return {
        arrive : arrived,
        class  : ((): string|null => {
            if (animating === true)  return null; // use pseudo :hover

            /*
             * in our nodestrap, the leave-state is defined as (not arrive && not focus) && (leave || blur)
             * so, when (not arrive && not focus), the blur also treated as leave
             * mouse-leave but still keybd-focus => not leave
             * keybd-blur  but still mouse-arrive => not leave
             */
            if (
                (
                    !arrived              // not arrive(ing|ed)
                    &&
                    !stateFocusBlur.focus // not focus(ing|ed)
                )
                &&
                (
                    (animating === false)   // leave
                    ||
                    stateFocusBlur.blurring // blur as leave
                )
            ) return 'leave';

            /*
             * .arrived class is not supported,
             * because in our nodestrap, the arrive-state is defined as the union of [:hover || .focus || :focus]
             * so the focus can also trigger the arriving-animation
             * thus when the focus trigger the arriving-animation until the animation ended,
             * then the arrive occured after it, the arriving-animation will never triggered and the onAnimationEnd will never triggered too
             */
            // if (arrived) return 'arrived';

            return null;
        })(),
        handleMouseEnter   : handleArrive,
        handleMouseLeave   : handleLeave,
        handleAnimationEnd : (e: React.AnimationEvent<HTMLElement>) => {
            if (e.target !== e.currentTarget) return; // no bubbling
            if (/((?<![a-z])(arrive|leave)|(?<=[a-z])(Arrive|Leave))(?![a-z])/.test(e.animationName)) {
                handleIdle();
            }
        },
    };
}



// react components:

export interface ControlProps<TElement extends HTMLElement = HTMLElement>
    extends
        IndicatorProps<TElement>
{
    // accessibility:
    focus?    : boolean
    tabIndex? : number
}
export default function Control<TElement extends HTMLElement = HTMLElement>(props: ControlProps<TElement>) {
    // styles:
    const styles           = controlStyles.useStyles();

    
    
    // states:
    const stateFocusBlur   = useStateFocusBlur(props);
    // TODO: temporary disabled # const stateArriveLeave = useStateArriveLeave(props, stateFocusBlur);



    // fn props:
    const propEnabled      = usePropEnabled(props);

    

    // jsx:
    return (
        <Indicator<TElement>
            // other props:
            {...props}


            // behaviors:
            actionCtrl={props.actionCtrl ?? true}


            // classes:
            mainClass={props.mainClass ?? styles.main}
            stateClasses={[...(props.stateClasses ?? []),
                stateFocusBlur.class,
                // TODO: temporary disabled # stateArriveLeave.class,
            ]}


            // Control props:
            {...{
                // accessibility:
                tabIndex : props.tabIndex ?? (propEnabled ? 0 : -1),
            }}
        

            // events:
            onFocus=        {(e) => { stateFocusBlur.handleFocus();        props.onFocus?.(e);      }}
            onBlur=         {(e) => { stateFocusBlur.handleBlur();         props.onBlur?.(e);       }}
            // TODO: temporary disabled # onMouseEnter=   {(e) => { stateArriveLeave.handleMouseEnter(); props.onMouseEnter?.(e); }}
            // TODO: temporary disabled # onMouseLeave=   {(e) => { stateArriveLeave.handleMouseLeave(); props.onMouseLeave?.(e); }}
            onAnimationEnd= {(e) => {
                // states:
                stateFocusBlur.handleAnimationEnd(e);
                // TODO: temporary disabled # stateArriveLeave.handleAnimationEnd(e);


                // forwards:
                props.onAnimationEnd?.(e);
            }}
        />
    );
}
export { Control }