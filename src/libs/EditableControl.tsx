// react (builds html using javascript):
import
    React, {
    useState,
    useEffect,
    useContext,
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
import colors               from './colors'     // configurable colors & theming defs
import {
    cssProps as ecssProps,
}                           from './Element'
import {
    default  as Control,
    ControlStylesBuilder,
}                           from './Control'
import type * as Controls   from './Control'
import * as validations     from './validations'
import type * as Val        from './validations'



// styles:

export interface IValidationStylesBuilder {
    // states:
    validationThemesIf(): JssStyle
    validationStates(inherit : boolean): JssStyle



    // fn props:
    validationFnProps(): JssStyle
}
export class EditableControlStylesBuilder extends ControlStylesBuilder implements IValidationStylesBuilder {
    //#region scoped css props
    /**
     * valid-state foreground color.
     */
    protected readonly _foregIfVal          = 'foregIfVal'

    /**
     * valid-state background color.
     */
    protected readonly _backgIfVal          = 'backgIfVal'

    /**
     * valid-state border color.
     */
    protected readonly _borderIfVal         = 'borderIfVal'

    /**
     * valid-state foreground color - at outlined state.
     */
    protected readonly _outlinedForegIfVal  = 'outlinedForegIfVal'

    /**
     * valid-state focused box-shadow color.
     */
    protected readonly _boxShadowFocusIfVal = 'boxShadowFocusIfVal'
 
 
    /**
     * invalid-state foreground color.
     */
    protected readonly _foregIfInv          = 'foregIfInv'

    /**
     * invalid-state background color.
     */
    protected readonly _backgIfInv          = 'backgIfInv'

    /**
     * invalid-state border color.
     */
    protected readonly _borderIfInv         = 'borderIfInv'

    /**
     * invalid-state foreground color - at outlined state.
     */
    protected readonly _outlinedForegIfInv  = 'outlinedForegIfInv'

    /**
     * invalid-state focused box-shadow color.
     */
    protected readonly _boxShadowFocusIfInv = 'boxShadowFocusIfInv'



    // anim props:

    protected readonly _animValUnval        = 'animValUnval'
    protected readonly _animInvUninv        = 'animInvUninv'
    //#endregion scoped css props



    //#region mixins
    protected stateValidating(content: JssStyle): JssStyle { return {
        '&.val': content,
    }}
    protected stateValid(content: JssStyle): JssStyle { return {
        '&.val,&.vald': content,
    }}
    protected stateNotValid(content: JssStyle): JssStyle { return {
        '&:not(.val):not(.vald)': content,
    }}
    protected stateUnvalidating(content: JssStyle): JssStyle { return {
        '&.unval': content,
    }}
    protected stateNotUnvalidating(content: JssStyle): JssStyle { return {
        '&:not(.unval)': content,
    }}
    protected stateValidUnvalidating(content: JssStyle): JssStyle { return {
        '&.val,&.vald,&.unval': content,
    }}
    protected stateNotValidUnvalidating(content: JssStyle): JssStyle { return {
        '&:not(.val):not(.vald):not(.unval)': content,
    }}
    protected stateNotValidatingUnvalidating(content: JssStyle): JssStyle { return {
        '&:not(.val):not(.unval)': content,
    }}
    


    protected stateInvalidating(content: JssStyle): JssStyle { return {
        '&.inv': content,
    }}
    protected stateInvalid(content: JssStyle): JssStyle { return {
        '&.inv,&.invd': content,
    }}
    protected stateNotInvalid(content: JssStyle): JssStyle { return {
        '&:not(.inv):not(.invd)': content,
    }}
    protected stateUninvalidating(content: JssStyle): JssStyle { return {
        '&.uninv': content,
    }}
    protected stateNotUninvalidating(content: JssStyle): JssStyle { return {
        '&:not(.uninv)': content,
    }}
    protected stateInvalidUninvalidating(content: JssStyle): JssStyle { return {
        '&.inv,&.invd,&.uninv': content,
    }}
    protected stateNotInvalidUninvalidating(content: JssStyle): JssStyle { return {
        '&:not(.inv):not(.invd):not(.uninv)': content,
    }}
    protected stateNotInvalidatingUninvalidating(content: JssStyle): JssStyle { return {
        '&:not(.inv):not(.uninv)': content,
    }}
    


    protected stateValidationDisabled(content: JssStyle): JssStyle { return {
        '&.valdis'       : content,
    }}
    protected stateValidationEnabled(content: JssStyle): JssStyle { return {
        '&:not(.valdis)' : content,
    }}
    


    protected applyStateValid(): JssStyle { return {
        // apply a *valid* color theme:
        [this.decl(this._foregIfIf)]          : this.ref(this._foregIfVal),
        [this.decl(this._backgIfIf)]          : this.ref(this._backgIfVal),
        [this.decl(this._borderIfIf)]         : this.ref(this._borderIfVal),
        [this.decl(this._boxShadowFocusIfIf)] : this.ref(this._boxShadowFocusIfVal),
        [this.decl(this._outlinedForegIfIf)]  : this.ref(this._outlinedForegIfVal),
    }}
    protected applyStateInvalid(): JssStyle { return {
        // apply an *invalid* color theme:
        [this.decl(this._foregIfIf)]          : this.ref(this._foregIfInv),
        [this.decl(this._backgIfIf)]          : this.ref(this._backgIfInv),
        [this.decl(this._borderIfIf)]         : this.ref(this._borderIfInv),
        [this.decl(this._boxShadowFocusIfIf)] : this.ref(this._boxShadowFocusIfInv),
        [this.decl(this._outlinedForegIfIf)]  : this.ref(this._outlinedForegIfInv),
    }}
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
    public validationThemesIf(): JssStyle { return {
        // define a *valid* color theme:
        [this.decl(this._foregIfVal)]           : colors.successText,
        [this.decl(this._backgIfVal)]           : this.solidBackg(colors.success),
        [this.decl(this._borderIfVal)]          : colors.successCont,
        [this.decl(this._outlinedForegIfVal)]   : colors.success,
        [this.decl(this._boxShadowFocusIfVal)]  : colors.successTransp,

        // define an *invalid* color theme:
        [this.decl(this._foregIfInv)]           : colors.dangerText,
        [this.decl(this._backgIfInv)]           : this.solidBackg(colors.danger),
        [this.decl(this._borderIfInv)]          : colors.dangerCont,
        [this.decl(this._outlinedForegIfInv)]   : colors.danger,
        [this.decl(this._boxShadowFocusIfInv)]  : colors.dangerTransp,
    }}
    public validationStates(inherit = false): JssStyle { return {
        extend: [
            this.iif(!inherit, {
                //#region all initial states are none
                [this.decl(this._animValUnval)] : ecssProps.animNone,
                [this.decl(this._animInvUninv)] : ecssProps.animNone,
                //#endregion all initial states are none
            }),



            //#region specific states
            this.stateValidating({
                [this.decl(this._animValUnval)] : cssProps.animValid,
            }),
            this.stateValid(this.applyStateValid()),
            this.stateUnvalidating({
                [this.decl(this._animValUnval)] : cssProps.animUnvalid,
            }),
    
            this.stateInvalidating({
                [this.decl(this._animInvUninv)] : cssProps.animInvalid,
            }),
            this.stateInvalid(this.applyStateInvalid()),
            this.stateUninvalidating({
                [this.decl(this._animInvUninv)] : cssProps.animUninvalid,
            }),
            //#endregion specific states
        ] as JssStyle,
    }}

    protected themesIf(): JssStyle { return {
        extend: [
            super.themesIf(),          // copy themes from base



            this.validationThemesIf(), // copy themes from validation
        ] as JssStyle,
    }}
    protected states(inherit = false): JssStyle { return {
        extend: [
            super.states(inherit),          // copy states from base



            this.validationStates(inherit), // copy states from validation
        ] as JssStyle,
    }}



    // fn props:
    public validationFnProps(): JssStyle { return {
        //#region re-arrange the animFn at different states
        ...this.stateValid({
            // define an *animations* func:
            [this.decl(this._animFn)]: [
                ecssProps.anim,
                this.ref(this._animInvUninv), // 2nd : ctrl already validated, move to the least priority
                this.ref(this._animValUnval), // 1st : rarely triggered => low probability
            ],
        }),

        // define an *animations* func:
        [this.decl(this._animFn)]: [
            ecssProps.anim,
            this.ref(this._animValUnval),
            this.ref(this._animInvUninv),
        ],
        //#endregion re-arrange the animFn at different states
    }}
    protected fnProps(): JssStyle { return {
        extend: [
            super.fnProps(), // copy functional props from base
        ] as JssStyle,



        //#region re-arrange the animFn at different states
        '&.active,&.actived': // if activated programmatically (not by user input)
            this.stateNotDisabled({ // if ctrl was not fully disabled
                ...this.stateValid({
                    // define an *animations* func:
                    [this.decl(this._animFn)]: [
                        ecssProps.anim,
                        this.ref(this._animActivePassive), // 6th : ctrl already pressed, move to the least priority
                        this.ref(this._animValUnval),      // 5th : ctrl already validated, move to the least priority
                        this.ref(this._animInvUninv),      // 4th : rarely triggered => low probability
                        this.ref(this._animHoverLeave),    // 3rd : cursor leaved   => low probability because holding press
                        this.ref(this._animFocusBlur),     // 2nd : ctrl lost focus => low probability because holding press
                        this.ref(this._animEnableDisable), // 1st : ctrl enable/disable => rarely used => low probability
                    ],
                }),
                // define an *animations* func:
                [this.decl(this._animFn)]: [
                    ecssProps.anim,
                    this.ref(this._animActivePassive), // 6th : ctrl already pressed, move to the least priority
                    this.ref(this._animValUnval),      // 5th : rarely triggered => low probability
                    this.ref(this._animInvUninv),      // 4th : rarely triggered => low probability
                    this.ref(this._animHoverLeave),    // 3rd : cursor leaved   => low probability because holding press
                    this.ref(this._animFocusBlur),     // 2nd : ctrl lost focus => low probability because holding press
                    this.ref(this._animEnableDisable), // 1st : ctrl enable/disable => rarely used => low probability
                ],
            }),

        ...this.stateValid({
            // define an *animations* func:
            [this.decl(this._animFn)]: [
                ecssProps.anim,
                this.ref(this._animValUnval),      // 6th : ctrl already validated, move to the least priority
                this.ref(this._animInvUninv),      // 5th : rarely triggered => low probability
                this.ref(this._animEnableDisable), // 4th : ctrl must be enabled
                this.ref(this._animHoverLeave),    // 3rd : cursor hovered over ctrl
                this.ref(this._animFocusBlur),     // 2nd : ctrl got focused (can interrupt hover/leave)
                this.ref(this._animActivePassive), // 1st : ctrl got pressed (can interrupt focus/blur)
            ],
        }),
        // define an *animations* func:
        [this.decl(this._animFn)]: [
            ecssProps.anim,
            this.ref(this._animValUnval),      // 6th : rarely triggered => low probability
            this.ref(this._animInvUninv),      // 5th : rarely triggered => low probability
            this.ref(this._animEnableDisable), // 4th : ctrl must be enabled
            this.ref(this._animHoverLeave),    // 3rd : cursor hovered over ctrl
            this.ref(this._animFocusBlur),     // 2nd : ctrl got focused (can interrupt hover/leave)
            this.ref(this._animActivePassive), // 1st : ctrl got pressed (can interrupt focus/blur)
        ],
        //#endregion re-arrange the animFn at different states
    }}



    // styles:
    public basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base
        ] as JssStyle,



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
}
export const styles = new EditableControlStylesBuilder();



// configs:

const cssConfig = new CssConfig(() => {
    // common css values:
    // const initial = 'initial';
    // const unset   = 'unset';
    // const none    = 'none';
    // const inherit = 'inherit';
    // const center  = 'center';
    // const middle  = 'middle';


    const keyframesValid     : PropEx.Keyframes = {
        from: {
            backg: colors.success,
        },
        to: {
            backg: styles.ref(styles._backgFn),
        },
    };
    const keyframesUnvalid   : PropEx.Keyframes = {
        from : keyframesValid.to,
        to   : keyframesValid.from,
    };

    const keyframesInvalid   : PropEx.Keyframes = {
        from: {
            backg: colors.danger,
        },
        to: {
            backg: styles.ref(styles._backgFn),
        }
    };
    const keyframesUninvalid : PropEx.Keyframes = {
        from : keyframesInvalid.to,
        to   : keyframesInvalid.from,
    };


    return {
        // anim props:
    
        '@keyframes valid'     : keyframesValid,
        '@keyframes unvalid'   : keyframesUnvalid,
        '@keyframes invalid'   : keyframesInvalid,
        '@keyframes uninvalid' : keyframesUninvalid,
        animValid              : [['500ms',  'ease-out', 'both', keyframesValid    ]],
        animUnvalid            : [['100ms',  'ease-out', 'both', keyframesUnvalid  ]],
        animInvalid            : [['1000ms', 'ease-out', 'both', keyframesInvalid  ]],
        animUninvalid          : [['100ms',  'ease-out', 'both', keyframesUninvalid]],
    };
}, /*prefix: */'ectrl');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// hooks:

type EditableControlElement        = HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement
export type ValidatorHandler       = () => Val.Result
export type CustomValidatorHandler = (state: ValidityState, value: string) => Val.Result
export function useInputValidator(customValidator?: CustomValidatorHandler) {
    let [isValid, setIsValid] = useState<Val.Result>(null);


    const handleVals = (target: EditableControlElement, immediately = false) => {
        const update = (validity: ValidityState, valuePrev?: string) => {
            const valueNow = target.value;
            if ((valuePrev !== undefined) && (valuePrev !== valueNow)) return; // has been modified during waiting => abort further validating
            

            isValid = (customValidator ? customValidator(validity, valueNow) : validity.valid);
            setIsValid(isValid);
        };



        if (immediately) {
            // instant validate:
            update(target.validity);
        }
        else {
            const valuePrev = target.value;
            const validity  = target.validity;
        
            // delay a while for the further validating, to avoid unpleasant effect
            setTimeout(
                () => update(validity, valuePrev),
                (validity.valid !== false) ? 100 : 500
            );
        } // if
    }
    const handleInit = (target: EditableControlElement | null) => {
        if (target) handleVals(target, /*immediately =*/true);
    }
    const handleChange = ({target}: React.ChangeEvent<EditableControlElement>) => {
        handleVals(target);
    }
    return {
        /**
         * Handles the validation result.
         * @returns  
         * `null`  = uncheck.  
         * `true`  = valid.  
         * `false` = invalid.
         */
        validator    : ((): Val.Result => isValid) as ValidatorHandler,

        handleInit   : handleInit,
        handleChange : handleChange,
    };
}
export function useStateValidInvalid(props: Val.Validation, validator?: ValidatorHandler) {
    const valContext = useContext(validations.Context);

    const defaultValided: Val.Result      = null; // if [isValid] nor validator was not specified => the default value is isValid=null (neither error nor success)
    const [valided,      setValided     ] = useState((): (Val.Result|undefined) => {
        // use context as the primary validator:
        if (valContext.enableValidation === false) return null;               // disabled => uncheck
        if (valContext.isValid !== undefined)      return valContext.isValid; // force state to uncheck/valid/invalid

        // use own controllable validator as secondary:
        if (props.enableValidation === false)      return null;          // disabled => uncheck
        if (props.isValid !== undefined)           return props.isValid; // force state to uncheck/valid/invalid

        // use input validator as tertiary:
        if (validator)                             return undefined; // undefined means => evaluate the validator *at startup*

        // use default value as fallback:
        return defaultValided;
    });
    const [succeeding,   setSucceeding  ] = useState(false);
    const [unsucceeding, setUnsucceeding] = useState(false);
    const [erroring,     setErroring    ] = useState(false);
    const [unerroring,   setUnerroring  ] = useState(false);


    const handleChangeInternal = (newValid: Val.Result) => {
        if (valided !== newValid) {
            setValided(newValid);

            if (newValid === null) { // neither success nor error
                if (valided === true) { // if was success
                    // fade out success mark:
                    setSucceeding(false);
                    setUnsucceeding(true);
                } // if

                if (valided === false) { // if was error
                    // fade out error mark:
                    setErroring(false);
                    setUnerroring(true);
                } // if
            }
            else if (newValid) { // success
                if (valided === false) { // if was error
                    // fade out error mark:
                    setErroring(false);
                    setUnerroring(true);
                } // if

                // fade in success mark:
                setUnsucceeding(false);
                setSucceeding(true);
            }
            else { // error
                if (valided === true) { // if was success
                    // fade out success mark:
                    setSucceeding(false);
                    setUnsucceeding(true);
                } // if

                // fade in error mark:
                setUnerroring(false);
                setErroring(true);
            } // if
        }
    }


    // watch the changes:
    const newValid = ((): (Val.Result|undefined) => {
        // use context as the primary validator:
        if (valContext.enableValidation === false) return null;               // disabled => uncheck
        if (valContext.isValid !== undefined)      return valContext.isValid; // force state to uncheck/valid/invalid

        // use own controllable validator as secondary:
        if (props.enableValidation === false)      return null;          // disabled => uncheck
        if (props.isValid !== undefined)           return props.isValid; // force state to uncheck/valid/invalid

        // use input validator as tertiary:
        if ((valided !== undefined) && validator)  return validator(); // now validator has been loaded => evaluate the validator *now*

        // no change needed:
        return undefined;
    })();
    if (newValid !== undefined) handleChangeInternal(/*newValid =*/newValid);

    
    // watch the changes once (only at startup):
    useEffect(() => {
        if (valided === undefined) {
            // now validator has been loaded => re-*set the initial* state of `valided` with any values other than `undefined`
            setValided(validator ? validator() : defaultValided);
        }
    }, [valided, validator]);

    
    const handleIdleSucc = () => {
        // clean up expired animations

        if (succeeding)   setSucceeding(false);
        if (unsucceeding) setUnsucceeding(false);
    }
    const handleIdleErr = () => {
        // clean up expired animations

        if (erroring)     setErroring(false);
        if (unerroring)   setUnerroring(false);
    }
    const valDisabled = // causing the validator() not evaluated (disabled):
        (valContext.enableValidation === false) ||
        (valContext.isValid === null) ||
        (props.enableValidation === false) ||
        (props.isValid === null) ||
        (!validator);
    return {
        /**
         * being/was valid or being/was invalid
        */
        valid: (valided ?? null) as Val.Result,
        valDisabled: valDisabled,
        class: [
            (succeeding ? 'val' : (unsucceeding ? 'unval' : ((valided === true)  ? 'vald'                          : null))),
            (erroring   ? 'inv' : (unerroring   ? 'uninv' : ((valided === false) ? 'invd'                          : null))),
                                                            ((valided === null)  ? (valDisabled ? 'valdis' : null) : null),
        ].join(' '),
        handleAnimationEnd : (e: React.AnimationEvent<HTMLElement>) => {
            if (e.target !== e.currentTarget) return; // no bubbling

            if (/((?<![a-z])(valid|unvalid)|(?<=[a-z])(Valid|Unvalid))(?![a-z])/.test(e.animationName)) {
                handleIdleSucc();
            }
            else if (/((?<![a-z])(invalid|uninvalid)|(?<=[a-z])(Invalid|Uninvalid))(?![a-z])/.test(e.animationName)) {
                handleIdleErr();
            }
        },
    };
}



// react components:

export interface Props<TElement extends EditableControlElement = EditableControlElement>
    extends
        Controls.Props<TElement>,
        Val.Validation
{
    // accessibility:
    readOnly?        : boolean


    // values:
    defaultValue?    : string | number | ReadonlyArray<string>
    value?           : string | number | ReadonlyArray<string>
    onChange?        : React.ChangeEventHandler<TElement>
    

    // validations:
    customValidator? : CustomValidatorHandler
    required?        : boolean
}
export default function EditableControl<TElement extends EditableControlElement = EditableControlElement>(props: Props<TElement>) {
    const ectrlStyles    = styles.useStyles();

    // states:
    const inputValidator = useInputValidator(props.customValidator);
    const stateValInval  = useStateValidInvalid(props, inputValidator.validator);

    

    const htmlEditCtrls   = [
        'input',
        'select',
        'textarea',
    ];


    
    return (
        <Control<TElement>
            // other props:
            {...props}


            // classes:
            mainClass={props.mainClass ?? ectrlStyles.main}
            stateClasses={[...(props.stateClasses ?? []),
                // validations:
                stateValInval.class,
            ]}


            // EditableControl props:
            elmRef={(elm) => {
                if (elm) {
                    if (elm.validity) {
                        inputValidator.handleInit(elm);
                    }
                    else {
                        const firstChild = elm.querySelector(htmlEditCtrls.join(','));
                        if (firstChild) inputValidator.handleInit(firstChild as TElement);
                    } // if
                } // if


                // forwards:
                const elmRef = props.elmRef;
                if (elmRef) {
                    if (typeof(elmRef) === 'function') {
                        elmRef(elm);
                    }
                    else {
                        // @ts-ignore
                        elmRef.current = elm;
                    } // if
                } // if
            }}
            onChange={(e: React.ChangeEvent<TElement>) => { // watch change event from current element or bubbling from children
                // validations:
                inputValidator.handleChange(e);


                // forwards:
                props.onChange?.(e);
            }}
        

            // events:
            onAnimationEnd={(e) => {
                // validations:
                stateValInval.handleAnimationEnd(e);


                // forwards:
                props.onAnimationEnd?.(e);
            }}
        />
    );
}