// react (builds html using javascript):
import
    React, {
    useState,
}                           from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
}                           from 'jss'          // ts defs support for jss
import {
    PropEx,
}                           from './Css'        // ts defs support for jss
import CssConfig            from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import * as stripOuts       from './strip-outs'
import colors               from './colors'     // configurable colors & theming defs
import {
    cssProps as ecssProps,
}                           from './Element'
import {
    default  as Indicator,
    IndicatorStylesBuilder,
}                           from './Indicator'
import type * as Indicators from './Indicator'



// styles:

export class ControlStylesBuilder extends IndicatorStylesBuilder {
    //#region scoped css props
    // anim props:

 // public    readonly _filterHoverLeave   = 'filterHoverLeave' // already defined in Indicator
    protected readonly _animHoverLeave      = 'animHoverLeave'
    
    public    readonly _boxShadowFocusBlur  = 'boxShadowFocusBlur'
    protected readonly _animFocusBlur       = 'animFocusBlur'
    //#endregion scoped css props



    //#region mixins
    protected stateHover(content: JssStyle): JssStyle { return {
        // hover: hover by mouse || hover by keyboard (focus)
        '&:hover,&.focus,&:focus': content,
    }}
    protected stateNotHover(content: JssStyle): JssStyle { return {
        '&:not(:hover):not(.focus):not(:focus)': content,
    }}
    protected stateLeaving(content: JssStyle): JssStyle {
        // leave: leave by mouse && leave by keyboard (blur)
        // mouse-leave but still keybd-focus => not leave
        // keybd-blur  but still mouse-hover => not leave
        return this.stateNotHover({
            '&.leave,&.blur': content,
        });
    }
    protected stateNotLeaving(content: JssStyle): JssStyle { return {
        '&:not(.leave):not(.blur)': content,
    }}
    protected stateHoverLeaving(content: JssStyle): JssStyle { return {
        '&:hover,&.focus,&:focus,&.leave,&.blur': content,
    }}
    protected stateNotHoverLeaving(content: JssStyle): JssStyle { return {
        '&:not(:hover):not(.focus):not(:focus):not(.leave):not(.blur)': content,
    }}
    
    protected stateFocus(content: JssStyle): JssStyle { return {
        '&.focus,&:focus': content,
    }}
    protected stateNotFocus(content: JssStyle): JssStyle { return {
        '&:not(.focus):not(:focus)': content,
    }}
    protected stateBlurring(content: JssStyle): JssStyle { return {
        '&.blur': content,
    }}
    protected stateNotBlurring(content: JssStyle): JssStyle { return {
        '&:not(.blur)': content,
    }}
    protected stateFocusBlurring(content: JssStyle): JssStyle { return {
        '&.focus,&:focus,&.blur': content,
    }}
    protected stateNotFocusBlurring(content: JssStyle): JssStyle { return {
        '&:not(.focus):not(:focus):not(.blur)': content,
    }}
    
    protected actionCtrl() { return true; }
    
    // override base: pseudo + non-pseudo active
    protected applyStateNoAnimStartup(): JssStyle {
        return this.stateNotHoverLeaving(
            this.stateNotFocusBlurring(
                super.applyStateNoAnimStartup()
            )
        );
    }
    //#endregion mixins



    // themes:
    public sizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {
        extend: [
            super.sizeOf(size, Size, sizeProp), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, Size)),
    }}



    // states:
    public controlThemesIf(): JssStyle { return {
        // define a *default* color theme:
        [this.decl(this._foregIf)]             : colors.secondaryText,
        [this.decl(this._backgIf)]             : this.solidBackg(colors.secondary),
        [this.decl(this._borderIf)]            : colors.secondaryCont,
        [this.decl(this._boxShadowFocusIf)]    : colors.secondaryTransp,
        [this.decl(this._outlinedForegIf)]     : colors.secondary,

        // define an *active* color theme:
        [this.decl(this._foregIfAct)]          : colors.primaryText,
        [this.decl(this._backgIfAct)]          : this.solidBackg(colors.primary),
        [this.decl(this._borderIfAct)]         : colors.primaryCont,
        [this.decl(this._boxShadowFocusIfAct)] : colors.primaryTransp,
        [this.decl(this._outlinedForegIfAct)]  : colors.primary,
    }}
    public controlStates(inherit = false): JssStyle { return {
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
                        this.applyStateActive(),
                    ] as JssStyle,
                }),
                this.stateFocus({
                    [this.decl(this._boxShadowFocusBlur)] : this.ref(this._boxShadowFocusFn),
                    [this.decl(this._animFocusBlur)]      : cssProps.animFocus,
    
                    extend: [
                        this.applyStateActive(),
                    ] as JssStyle,
                }),
            ] as JssStyle}),
            //#endregion hover, leave, focus, blur
            //#endregion specific states
        ] as JssStyle,
    }}

    protected themesIf(): JssStyle { return {
        extend: [
            super.themesIf(), // copy themes from base

            this.controlThemesIf(),
        ] as JssStyle,
    }}
    protected states(inherit = false): JssStyle { return {
        extend: [
            super.states(inherit), // copy states from base
            
            this.controlStates(inherit),
        ] as JssStyle,
    }}



    // fn props:
    public controlFnProps(): JssStyle { return {
        //#region re-arrange the animFn at different states
        '&.active,&.actived': // if activated programmatically (not by user input)
            this.stateNotDisabled({ // if ctrl was not fully disabled
                // define an *animations* func:
                [this.decl(this._animFn)]: [
                    ecssProps.anim,
                    this.ref(this._animActivePassive), // 1st : ctrl already pressed, move to the least priority
                    this.ref(this._animHoverLeave),    // 2nd : cursor leaved
                    this.ref(this._animFocusBlur),     // 3rd : ctrl lost focus (can interrupt hover/leave)
                    this.ref(this._animEnableDisable), // 4th : ctrl enable/disable (can interrupt focus/blur)
                ],
            }),

        // define an *animations* func:
        [this.decl(this._animFn)]: [
            ecssProps.anim,
            this.ref(this._animEnableDisable), // 1st : ctrl must be enable
            this.ref(this._animHoverLeave),    // 2nd : cursor hovered over ctrl
            this.ref(this._animFocusBlur),     // 3rd : ctrl got focused (can interrupt hover/leave)
            this.ref(this._animActivePassive), // 4th : ctrl got pressed (can interrupt focus/blur)
        ],
        //#endregion re-arrange the animFn at different states
    }}
    protected fnProps(): JssStyle { return {
        extend: [
            super.fnProps(), // copy functional props from base

            this.controlFnProps(),
        ] as JssStyle,
    }}



    // styles:
    public basicStyle(): JssStyle { return {
        extend: [
            stripOuts.control,  // clear browser's default styles

            super.basicStyle(), // copy basicStyle from base
        ] as JssStyle,



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
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
            filter: [[
                ecssProps.filter,
                styles.ref(styles._filterEnableDisable), // last priority, rarely happened
                styles.ref(styles._filterActivePassive),
             // styles.ref(styles._filterHoverLeave),    // first priority, serving smooth responsiveness
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
    const keyframesLeave   : PropEx.Keyframes = {
        from : keyframesHover.to,
        to   : keyframesHover.from,
    };

    const keyframesFocus   : PropEx.Keyframes = {
        from: {
            boxShadow: [[[
                ecssProps.boxShadow,
             // styles.ref(styles._boxShadowFocusBlur),
            ]]],
        } as JssStyle,
        to: {
            boxShadow: [[[
                ecssProps.boxShadow,
                styles.ref(styles._boxShadowFocusBlur),
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

        filterHover        : [['brightness(85%)']],

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
    const stateEnabled = (props.enabled!==false);

    const defaultFocused = false; // if [focus] was not specified => the default value is focus=false
    const [focused,  setFocused ] = useState((props.focus ?? defaultFocused) && stateEnabled);
    const [blurring, setBlurring] = useState(false);


    const handleChangeInternal = (newFocus: boolean) => {
        if (focused !== newFocus) { // changes detected => apply the changes & start animating
            setFocused(newFocus);
    
            if (newFocus) {
                setBlurring(false); // stop  blurring anim
            }
            else {
                setBlurring(true);  // start blurring anim
            } // if
        }
    }


    if (stateEnabled) {
        if (props.focus !== undefined) { // controllable prop => watch the changes
            handleChangeInternal(/*newFocus =*/props.focus);
        }
    }
    else {
        // loosing focus because of the control has been disabled
        handleChangeInternal(/*newFocus =*/false);
    } // if


    const handleFocus = () => {
        if (props.focus !== undefined) return; // controllable prop => let the prop determines the state

        // control disabled => no response
        // onFocus can be triggered by custom control, because it doesn't have "native :disabled" state
        if (!stateEnabled) return;
        
        handleChangeInternal(/*newFocus =*/true);
    }
    const handleBlurring = () => {
        if (props.focus !== undefined) return; // controllable prop => let the prop determines the state

        // control disabled => no response
        // onBlur can be triggered by custom control, because it doesn't have "native :disabled" state
        if (!stateEnabled) return;
        
        handleChangeInternal(/*newFocus =*/false);
    }
    const handleIdle = () => {
        // clean up expired animations

        if (blurring) setBlurring(false);
    }
    return {
        /**
         * partially/fully focus
        */
        focus    : focused,

        /**
         * blurring
         */
        blurring : blurring,

        class: blurring ? 'blur' : (focused ? ((props.focus !== undefined) ? 'focus' : null) : null),
        handleFocus        : handleFocus,
        handleBlur         : handleBlurring,
        handleAnimationEnd : (e: React.AnimationEvent<HTMLElement>) => {
            if (e.target !== e.currentTarget) return; // no bubbling
            if (/((?<![a-z])(blur)|(?<=[a-z])(Blur))(?![a-z])/.test(e.animationName)) {
                handleIdle();
            }
        },
    };
}

export function useStateLeave<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>, stateFocusBlur: { focus: boolean, blurring: boolean }) {
    const stateEnabled = (props.enabled!==false);

    const [hovered, setHovered] = useState(false);
    const [leaving, setLeaving] = useState(false);


    const handleChangeInternal = (newHover: boolean) => {
        if (hovered !== newHover) { // changes detected => apply the changes & start animating
            setHovered(newHover);
    
            if (newHover) {
                setLeaving(false); // stop  leaving anim
            }
            else {
                setLeaving(true);  // start leaving anim
            } // if
        }
    }


    if (!stateEnabled && hovered) {
        // loosing hover because of the control has been disabled
        handleChangeInternal(/*newHover =*/false);
    } // if
    

    const handleHover = () => {
        // control disabled => no response
        // onMouseEnter can be triggered by custom control, because it doesn't have "native :disabled" state
        if (!stateEnabled) return;

        handleChangeInternal(/*newHover =*/true);
    }
    const handleLeaving = () => {
        // control disabled => no response
        // onMouseLeave can be triggered by custom control, because it doesn't have "native :disabled" state
        if (!stateEnabled) return;

        handleChangeInternal(/*newHover =*/false);
    }
    const handleIdle = () => {
        // clean up expired animations

        if (leaving) setLeaving(false);
    }
    return {
        /**
         * partially/fully hover
        */
        hover   : hovered,

        /**
         * leaving
         */
        leaving : leaving,

        /// leave: leave by mouse && leave by keyboard (blur)
        // mouse-leave but still keybd-focus => not leave
        // keybd-blur  but still mouse-hover => not leave
        class: ((leaving && !stateFocusBlur.focus) || (stateFocusBlur.blurring && !hovered)) ? 'leave': null,
        handleMouseEnter   : handleHover,
        handleMouseLeave   : handleLeaving,
        handleAnimationEnd : (e: React.AnimationEvent<HTMLElement>) => {
            if (e.target !== e.currentTarget) return; // no bubbling
            if (/((?<![a-z])(leave)|(?<=[a-z])(Leave))(?![a-z])/.test(e.animationName)) {
                handleIdle();
            }
        },
    };
}



// react components:

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        Indicators.Props<TElement>
{
    // accessibility:
    focus?    : boolean
    tabIndex? : number
}
export default function Control<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    const ctrlStyles     = styles.useStyles();

    // states:
    const stateFocusBlur = useStateFocusBlur(props);
    const stateLeave     = useStateLeave(props, stateFocusBlur);

    

    return (
        <Indicator<TElement>
            // behaviors:
            actionCtrl={true}


            // other props:
            {...props}


            // classes:
            mainClass={props.mainClass ?? ctrlStyles.main}
            stateClasses={[...(props.stateClasses ?? []),
                // states:
                
                // if [tabIndex] is negative => treats Control as *wrapper* element, so there's no *:focus* => replace with synthetic *.focus*
                (stateFocusBlur.class ?? ((stateFocusBlur.focus && ((props.tabIndex ?? 0) < 0)) ? 'focus' : null)),

                stateLeave.class,
            ]}


            // Control props:
            {...{
                // accessibility:
                tabIndex : (props.enabled ?? true) ? (props.tabIndex ?? 0) : -1,
            }}
        

            // events:
            onFocus=        {(e) => { stateFocusBlur.handleFocus();  props.onFocus?.(e);      }}
            onBlur=         {(e) => { stateFocusBlur.handleBlur();   props.onBlur?.(e);       }}
            onMouseEnter=   {(e) => { stateLeave.handleMouseEnter(); props.onMouseEnter?.(e); }}
            onMouseLeave=   {(e) => { stateLeave.handleMouseLeave(); props.onMouseLeave?.(e); }}
            onAnimationEnd= {(e) => {
                // states:
                stateFocusBlur.handleAnimationEnd(e);
                stateLeave.handleAnimationEnd(e);


                // forwards:
                props.onAnimationEnd?.(e);
            }}
        />
    );
}