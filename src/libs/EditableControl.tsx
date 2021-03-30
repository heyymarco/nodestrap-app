// react (builds html using javascript):
import
    React, {
    useState,
    useEffect,
    useContext,
}                           from 'react'             // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
}                           from 'jss'               // ts defs support for jss
import {
    PropEx,
    Cust,
}                           from './Css'             // ts defs support for jss
import CssPropsManager      from './CssPropsManager' // A *css custom property* manager that manages & updates the *css props* stored at specified `rule`.
import type {
    DictionaryOf,
}                           from './CssPropsManager' // ts defs support for jss

// nodestrap (modular web components):
import * as stripOuts       from './strip-outs'
import colors               from './colors'          // configurable colors & theming defs
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

export class EditableControlStylesBuilder extends ControlStylesBuilder {
    //#region scoped css props
    /**
     * valid-state foreground color.
     */
    protected readonly _colorIfVal          = 'colorIfVal'

    /**
     * valid-state background color.
     */
    protected readonly _backgIfVal          = 'backgIfVal'

    /**
     * valid-state foreground color - at outlined state.
     */
    protected readonly _colorOutlinedIfVal  = 'colorOutlinedIfVal'

    /**
     * valid-state focused box-shadow color.
     */
    protected readonly _boxShadowFocusIfVal = 'boxShadowFocusIfVal'
 
 
    /**
     * invalid-state foreground color.
     */
    protected readonly _colorIfInv          = 'colorIfInv'

    /**
     * invalid-state background color.
     */
    protected readonly _backgIfInv          = 'backgIfInv'

    /**
     * invalid-state foreground color - at outlined state.
     */
    protected readonly _colorOutlinedIfInv  = 'colorOutlinedIfInv'

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
    protected stateNotUnvalid(content: JssStyle): JssStyle { return {
        '&:not(.unval)': content,
    }}
    protected stateValidUnvalid(content: JssStyle): JssStyle { return {
        '&.val,&.vald,&.unval': content,
    }}
    protected stateNotValidUnvalid(content: JssStyle): JssStyle { return {
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
    protected stateNotUninvalid(content: JssStyle): JssStyle { return {
        '&:not(.uninv)': content,
    }}
    protected stateInvalidUninvalid(content: JssStyle): JssStyle { return {
        '&.inv,&.invd,&.uninv': content,
    }}
    protected stateNotInvalidUninvalid(content: JssStyle): JssStyle { return {
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
        // apply valid (success) colors:
        [this.decl(this._colorIfIf)]          : this.ref(this._colorIfVal),
        [this.decl(this._backgIfIf)]          : this.ref(this._backgIfVal),
        [this.decl(this._colorOutlinedIfIf)]  : this.ref(this._colorOutlinedIfVal),
        [this.decl(this._boxShadowFocusIfIf)] : this.ref(this._boxShadowFocusIfVal),
    }}
    protected applyStateInvalid(): JssStyle { return {
        // apply invalid (danger) colors:
        [this.decl(this._colorIfIf)]          : this.ref(this._colorIfInv),
        [this.decl(this._backgIfIf)]          : this.ref(this._backgIfInv),
        [this.decl(this._colorOutlinedIfIf)]  : this.ref(this._colorOutlinedIfInv),
        [this.decl(this._boxShadowFocusIfIf)] : this.ref(this._boxShadowFocusIfInv),
    }}
    //#endregion mixins



    // themes:
    /* -- same as parent -- */



    // states:
    protected ValidationFnProps(): JssStyle { return {
        // define an *animations* func:
        [this.decl(this._animFn)]: [
            ecssProps.anim,
            this.ref(this._animValUnval),
            this.ref(this._animInvUninv),
        ],
    }}
    protected ValidationThemesIf(): JssStyle { return {
        // define a *valid* color theme:
        [this.decl(this._colorIfVal)]           : colors.successText,
        [this.decl(this._backgIfVal)]           : this.solidBackg(colors.success),
        [this.decl(this._colorOutlinedIfVal)]   : colors.success,
        [this.decl(this._boxShadowFocusIfVal)]  : colors.successTransp,

        // define an *invalid* color theme:
        [this.decl(this._colorIfInv)]           : colors.dangerText,
        [this.decl(this._backgIfInv)]           : this.solidBackg(colors.danger),
        [this.decl(this._colorOutlinedIfInv)]   : colors.danger,
        [this.decl(this._boxShadowFocusIfInv)]  : colors.dangerTransp,
    }}
    protected ValidationStates(): JssStyle { return {
        // all initial states are none:

        [this.decl(this._animValUnval)] : ecssProps.animNone,
        [this.decl(this._animInvUninv)] : ecssProps.animNone,



        // specific states:
        
        extend:[
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
        ] as JssStyle,
    }}

    protected fnProps(): JssStyle { return {
        extend: super.fnProps(),



        //#region re-arrange the animFn at different states
        '&.active,&.actived': { // if activated programmatically (not by user input)
            // define an *animations* func:
            [this.decl(this._animFn)]: [
                ecssProps.anim,
                this.ref(this._animValUnval),
                this.ref(this._animInvUninv),
                this.ref(this._animActivePassive), // 1st : ctrl already pressed, move to the least priority
                this.ref(this._animHoverLeave),    // 2nd : cursor leaved
                this.ref(this._animFocusBlur),     // 3rd : ctrl lost focus (can interrupt hover/leave)
                this.ref(this._animEnableDisable), // 4th : ctrl enable/disable (can interrupt focus/blur)
            ],

            '&.disabled,&:disabled:not(.disable)': { // if ctrl was disabled programatically
                // define an *animations* func:
                [this.decl(this._animFn)]: [
                    ecssProps.anim,
                    this.ref(this._animValUnval),
                    this.ref(this._animInvUninv),
                    this.ref(this._animEnableDisable), // 1st : ctrl already disabled, move to the least priority
                    this.ref(this._animHoverLeave),    // 2nd : cursor leaved, should not happened, move to low priority
                    this.ref(this._animFocusBlur),     // 3rd : ctrl lost focus, might happened programaticaly, move to low priority (can interrupt hover/leave)
                    this.ref(this._animActivePassive), // 4th : ctrl deactivated programatically, move to moderate priority (can interrupt focus/blur)
                ],
            },
        },

        // define an *animations* func:
        [this.decl(this._animFn)]: [
            ecssProps.anim,
            this.ref(this._animValUnval),
            this.ref(this._animInvUninv),
            this.ref(this._animEnableDisable), // 1st : ctrl must be enable
            this.ref(this._animHoverLeave),    // 2nd : cursor hovered over ctrl
            this.ref(this._animFocusBlur),     // 3rd : ctrl got focused (can interrupt hover/leave)
            this.ref(this._animActivePassive), // 4th : ctrl got pressed (can interrupt focus/blur)
        ],
        //#endregion re-arrange the animFn at different states
    }}
    protected themesIf(): JssStyle { return {
        extend: [
            super.themesIf(),



            this.ValidationThemesIf(),
        ] as JssStyle,
    }}
    protected states(): JssStyle { return {
        extend:[
            super.states(),



            this.ValidationStates(),
        ] as JssStyle,
    }}



    // styles:
    protected basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(),
            this.filterGeneralProps(cssProps), // apply *general* cssProps
        ] as JssStyle,
    }}
}
export const styles = new EditableControlStylesBuilder();



// configs:

const cssPropsManager = new CssPropsManager(() => {
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
            //TODO: backg: styles.ref(styles._backgOutlineFn),
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
            //TODO: backg: styles.ref(styles._backgOutlineFn),
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
export const cssProps = cssPropsManager.refs;
export const cssDecls = cssPropsManager.decls;



// hooks:

type EditableControlElement        = HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement
export type ValidatorHandler       = () => Val.Result
export type CustomValidatorHandler = (state: ValidityState, value: string) => Val.Result
export function useNativeValidator(customValidator?: CustomValidatorHandler) {
    let [isValid, setIsValid] = useState<Val.Result>(null);


    const handleVals = (target: EditableControlElement) => {
        isValid = (customValidator ? customValidator(target.validity, target.value) : target.validity.valid);
        setIsValid(isValid);
    }
    const handleInit = (target: EditableControlElement | null) => {
        if (target) handleVals(target);
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

        // use native validator as tertiary:
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

        // use native validator as tertiary:
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
        (props.isValid !== null) ||
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

export interface Props
    extends
        Controls.Props,
        Val.Validation
{
    // accessibility:
    readonly?        : boolean


    // values:
    defaultValue?    : string | number | ReadonlyArray<string>
    value?           : string | number | ReadonlyArray<string>
    onChange?        : React.ChangeEventHandler<EditableControlElement>
    

    // validations:
    customValidator? : CustomValidatorHandler
    required?        : boolean
}
export default function EditableControl(props: Props) {
    const ectrlStyles     = styles.useStyles();

    // states:
    const nativeValidator = useNativeValidator(props.customValidator);
    const stateValInval   = useStateValidInvalid(props, nativeValidator.validator);

    

    const htmlEditCtrls = [
        'input',
        'select',
        'textarea',
    ];
    const isHtmlEditCtrl = props.tag && htmlEditCtrls.includes(props.tag);


    
    return (
        <Control
            // other props:
            {...props}


            // classes:
            classes={[
                // main:
                (props.classes ? null : ectrlStyles.main),


                // additionals:
                ...(props.classes ?? []),


                // validations:
                stateValInval.class,
            ]}


            // EditableControl props:
            {...(isHtmlEditCtrl ? {
                // accessibility:
                readOnly     : props.readonly,


                // values:
                defaultValue : props.defaultValue,
                value        : props.value,
                onChange     : (e: React.ChangeEvent<EditableControlElement>) => {
                    // validations:
                    nativeValidator.handleChange(e);
    

                    // forwards:
                    props.onChange?.(e);
                },


                // validations:
                required     : props.required,
                ref          : nativeValidator.handleInit,
            } : {})}
        

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