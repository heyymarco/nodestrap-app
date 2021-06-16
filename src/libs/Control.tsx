// react (builds html using javascript):
import {
    default as React,
    useState,
}                           from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
}                           from 'jss'          // ts defs support for jss
import {
    PropEx,
    Cust,
}                           from './Css'        // ts defs support for jss
import CssConfig            from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import * as stripOuts       from './strip-outs'
import {
    cssProps as ecssProps,
}                           from './BasicComponent'
import {
    default as Indicator,
    IndicatorStyles,
}                           from './Indicator'
import type * as Indicators from './Indicator'
import {
    usePropEnabled,
}                           from './accessibilities'



// styles:

export interface IControlStylesBuilder {
    // states:
    controlStates(inherit : boolean): JssStyle



    // functions:
    controlPropsFn(): JssStyle
    controlAnimFn(): JssStyle



    // styles:
    controlBasicStyle(): JssStyle
}
export class ControlStylesBuilder extends IndicatorStyles implements IControlStylesBuilder {
    //#region scoped css props
    // anim props:

 // public    readonly _filterHoverLeave   = 'filterHoverLeave' // already defined in Indicator
    protected readonly _animHoverLeave      = 'animHoverLeave'
    
    public    readonly _boxShadowFocusBlur  = 'boxShadowFocusBlur'
    protected readonly _animFocusBlur       = 'animFocusBlur'
    //#endregion scoped css props



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
    public /*override*/ themeDefault(theme: string|null = 'secondary'): JssStyle {
        // change default parameter from null to 'secondary'
        return super.themeDefault(theme);
    }
    public /*override*/ themeActive(theme = 'primary'): JssStyle {
        // change default parameter from 'secondary' to 'primary'
        return super.themeActive(theme);
    }

    public /*virtual*/ controlStates(inherit = false): JssStyle { return {
        extend: [
            this.iif(!inherit, {
                //#region all initial states are none
             // [this.decl(this._filterHoverLeave)]    : ecssProps.filterNone, // was supported from Indicator
                [this.decl(this._animHoverLeave)]      : ecssProps.animNone,
        
                [this.decl(this._boxShadowFocusBlur)]  : ecssProps.boxShadowNone,
                [this.decl(this._animFocusBlur)]       : ecssProps.animNone,
                //#endregion all initial states are none
            }),
    
    
    
            //#region specific states
            //#region disable
            this.stateDisable({ // [disabling, disabled]
                // accessibility:
                cursor     : cssProps.cursorDisable,
                userSelect : 'none',
            }),
            //#endregion disable
    
    
    
            //#region hover, leave, focus, blur
            this.stateLeaving({
                [this.decl(this._filterHoverLeave)]       : cssProps.filterHover,
                [this.decl(this._animHoverLeave)]         : cssProps.animLeave,
            }),
            this.stateBlurring({
                [this.decl(this._boxShadowFocusBlur)]     : this.ref(this._boxShadowFocusFn),
                [this.decl(this._animFocusBlur)]          : cssProps.animBlur,
            }),
            this.stateNotDisable({extend: [
                // state hover & focus are possible when enabled
                this.stateHover({
                    [this.decl(this._filterHoverLeave)]   : cssProps.filterHover,
                    [this.decl(this._animHoverLeave)]     : cssProps.animHover,
    
                    extend: [
                        //TODO: update....
                        this.themeActive(),
                    ] as JssStyle,
                }),
                this.stateFocus({
                    [this.decl(this._boxShadowFocusBlur)] : this.ref(this._boxShadowFocusFn),
                    [this.decl(this._animFocusBlur)]      : cssProps.animFocus,
    
                    extend: [
                        //TODO: update....
                        this.themeActive(),
                    ] as JssStyle,
                }),
            ] as JssStyle}),
            //#endregion hover, leave, focus, blur
            //#endregion specific states
        ] as JssStyle,
    }}

    public /*override*/ statesOld(inherit = false): JssStyle { return {
        extend: [
            super.statesOld(inherit), // copy states from base
            
            this.controlStates(inherit),
        ] as JssStyle,
    }}



    // functions:
    public /*virtual*/ controlPropsFn(): JssStyle { return {} }
    public /*virtual*/ controlAnimFn(): JssStyle { return {
        //#region re-arrange the animFn at different states
        '&.active,&.actived': // if activated programmatically (not by user input)
            this.stateNotDisabled({ // if ctrl was not fully disabled
                // define an *animations* func:
                [this.decl(this._animFn)]: [
                    ecssProps.anim,
                    this.ref(this._animActivePassive), // 4th : ctrl already pressed, move to the least priority
                    this.ref(this._animHoverLeave),    // 3rd : cursor leaved   => low probability because holding press
                    this.ref(this._animFocusBlur),     // 2nd : ctrl lost focus => low probability because holding press
                    this.ref(this._animEnableDisable), // 1st : ctrl enable/disable => rarely used => low probability
                ],
            }),

        // define an *animations* func:
        [this.decl(this._animFn)]: [
            ecssProps.anim,
            this.ref(this._animEnableDisable), // 4th : ctrl must be enabled
            this.ref(this._animHoverLeave),    // 3rd : cursor hovered over ctrl
            this.ref(this._animFocusBlur),     // 2nd : ctrl got focused (can interrupt hover/leave)
            this.ref(this._animActivePassive), // 1st : ctrl got pressed (can interrupt focus/blur)
        ],
        //#endregion re-arrange the animFn at different states
    }}

    public /*override*/ propsFnOld(): JssStyle { return {
        extend: [
            super.propsFnOld(), // copy functional props from base

            this.controlPropsFn(),
        ] as JssStyle,
    }}
    public /*override*/ animFnOld(): JssStyle {
        return this.controlAnimFn();
    }
    public /*override*/ boxShadowFn(): Cust.Ref[] { return [
        ...super.boxShadowFn(),



        this.ref(this._boxShadowFocusBlur),
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
}
export const styles = new ControlStylesBuilder();



// configs:

const cssConfig = new CssConfig(() => {
    // common css values:
    // const initial = 'initial';
    // const unset   = 'unset';
    // const none    = 'none';
    // const inherit = 'inherit';
    // const center  = 'center';
    // const middle  = 'middle';


    const keyframesHover   : PropEx.Keyframes = {
        from: {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...styles.filterFn().filter((f) => f !== styles.ref(styles._filterHoverLeave)),

             // styles.ref(styles._filterHoverLeave), // missing the last => let's the browser interpolated it
            ]],
        },
        to: {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...styles.filterFn().filter((f) => f !== styles.ref(styles._filterHoverLeave)),

                styles.ref(styles._filterHoverLeave), // existing the last => let's the browser interpolated it
            ]],
        },
    };
    const keyframesLeave   : PropEx.Keyframes = {
        from : keyframesHover.to,
        to   : keyframesHover.from,
    };

    const keyframesFocus   : PropEx.Keyframes = {
        from: {
            boxShadow: [[[ // triple array => makes the JSS treat as comma separated values
                ...styles.boxShadowFn().filter((b) => b !== styles.ref(styles._boxShadowFocusBlur)),

             // styles.ref(styles._boxShadowFocusBlur), // missing the last => let's the browser interpolated it
            ]]],
        } as JssStyle,
        to: {
            boxShadow: [[[ // triple array => makes the JSS treat as comma separated values
                ...styles.boxShadowFn().filter((b) => b !== styles.ref(styles._boxShadowFocusBlur)),

                styles.ref(styles._boxShadowFocusBlur), // existing the last => let's the browser interpolated it
            ]]],
        } as JssStyle,
    };
    const keyframesBlur    : PropEx.Keyframes = {
        from : keyframesFocus.to,
        to   : keyframesFocus.from,
    };

    return {
        cursor             : 'pointer',
        cursorDisable      : 'not-allowed',
    
    

        // anim props:

        filterHover        : [['brightness(85%)', 'drop-shadow(0 0 0.01px rgba(0,0,0,0.4))']],

        '@keyframes hover' : keyframesHover,
        '@keyframes leave' : keyframesLeave,
        '@keyframes focus' : keyframesFocus,
        '@keyframes blur'  : keyframesBlur,
        animHover          : [['150ms', 'ease-out', 'both', keyframesHover]],
        animLeave          : [['300ms', 'ease-out', 'both', keyframesLeave]],
        animFocus          : [['150ms', 'ease-out', 'both', keyframesFocus]],
        animBlur           : [['300ms', 'ease-out', 'both', keyframesBlur ]],
    };
}, /*prefix: */'ctrl');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// hooks:

export function useStateFocusBlur<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
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
            if (animating === true)  return ((props.focus !== undefined) ? 'focus' : null); // focusing by controllable prop => use .focus, otherwise use pseudo :focus
            if (animating === false) return 'blur';

            if (focused) return 'focused';

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

export function useStateHoverLeave<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>, stateFocusBlur: { focus: boolean, blurring: boolean }) {
    // fn props:
    const propEnabled = usePropEnabled(props);



    // states:
    const [hovered,   setHovered  ] = useState<boolean>(false);     // true => hover, false => leave
    const [animating, setAnimating] = useState<boolean|null>(null); // null => no-animation, true => hovering-animation, false => leaving-animation

    const [hoverDn,   setHoverDn  ] = useState<boolean>(false);     // uncontrollable (dynamic) state: true => user hover, false => user leave



    /*
     * state is always leave if disabled
     * state is hover/leave based on [uncontrollable hover]
     * [controllable hover] is not supported
     */
    const hoverFn: boolean = propEnabled && hoverDn /*uncontrollable*/;

    if (hovered !== hoverFn) { // change detected => apply the change & start animating
        setHovered(hoverFn);   // remember the last change
        setAnimating(hoverFn); // start hovering-animation/leaving-animation
    }


    
    const handleHover = () => {
        if (!propEnabled) return; // control is disabled => no response required



        setHoverDn(true);
    }
    const handleLeave = () => {
        if (!propEnabled) return; // control is disabled => no response required



        setHoverDn(false);
    }
    const handleIdle = () => {
        // clean up finished animation

        setAnimating(null); // stop hovering-animation/leaving-animation
    }
    return {
        hover : hovered,
        class : ((): string|null => {
            if (animating === true)  return null; // use pseudo :hover

            /*
             * in our nodestrap, the leave-state is defined as (not hover && not focus) && (leave || blur)
             * so, when (not hover && not focus), the blur also treated as leave
             * mouse-leave but still keybd-focus => not leave
             * keybd-blur  but still mouse-hover => not leave
             */
            if (
                (
                    !hovered              // not hover(ing|ed)
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
             * .hovered class is not supported,
             * because in our nodestrap, the hover-state is defined as the union of [:hover || .focus || :focus]
             * so the focus can also trigger the hovering-animation
             * thus when the focus trigger the hovering-animation until the animation ended,
             * then the hover occured after it, the hovering-animation will never triggered and the onAnimationEnd will never triggered too
             */
            // if (hovered) return 'hovered';

            return null;
        })(),
        handleMouseEnter   : handleHover,
        handleMouseLeave   : handleLeave,
        handleAnimationEnd : (e: React.AnimationEvent<HTMLElement>) => {
            if (e.target !== e.currentTarget) return; // no bubbling
            if (/((?<![a-z])(hover|leave)|(?<=[a-z])(Hover|Leave))(?![a-z])/.test(e.animationName)) {
                handleIdle();
            }
        },
    };
}



// react components:

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        Indicators.IndicatorProps<TElement>
{
    // accessibility:
    focus?    : boolean
    tabIndex? : number
}
export default function Control<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    // styles:
    const ctrlStyles      = styles.useStyles();

    
    
    // states:
    const stateFocusBlur  = useStateFocusBlur(props);
    const stateHoverLeave = useStateHoverLeave(props, stateFocusBlur);



    // fn props:
    const propEnabled     = usePropEnabled(props);

    

    // jsx:
    return (
        <Indicator<TElement>
            // other props:
            {...props}


            // behaviors:
            actionCtrl={props.actionCtrl ?? true}


            // classes:
            mainClass={props.mainClass ?? ctrlStyles.main}
            stateClasses={[...(props.stateClasses ?? []),
                
                // if [tabIndex] is negative => treats Control as *wrapper* element, so there's no :focus (pseudo) => replace with .focus (synthetic)
                (stateFocusBlur.class ?? ((stateFocusBlur.focus && ((props.tabIndex ?? 0) < 0)) ? 'focus' : null)),

                stateHoverLeave.class,
            ]}


            // Control props:
            {...{
                // accessibility:
                tabIndex : propEnabled ? (props.tabIndex ?? 0) : -1,
            }}
        

            // events:
            onFocus=        {(e) => { stateFocusBlur.handleFocus();       props.onFocus?.(e);      }}
            onBlur=         {(e) => { stateFocusBlur.handleBlur();        props.onBlur?.(e);       }}
            onMouseEnter=   {(e) => { stateHoverLeave.handleMouseEnter(); props.onMouseEnter?.(e); }}
            onMouseLeave=   {(e) => { stateHoverLeave.handleMouseLeave(); props.onMouseLeave?.(e); }}
            onAnimationEnd= {(e) => {
                // states:
                stateFocusBlur.handleAnimationEnd(e);
                stateHoverLeave.handleAnimationEnd(e);


                // forwards:
                props.onAnimationEnd?.(e);
            }}
        />
    );
}