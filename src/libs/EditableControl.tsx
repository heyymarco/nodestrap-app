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
    PropList,

    
    // components:
    CssConfig,
}                           from './nodestrap'  // nodestrap's core
import colors               from './colors'     // configurable colors & theming defs
import {
    Result as ValResult,
    usePropValidation,
    
    ValidationProps,
}                           from './validations'
import {
    cssProps as bcssProps,
}                           from './BasicComponent'
import {
    ControlStyles,
    ControlProps,
    Control,
}                           from './Control'



// styles:

export interface IValidationStylesBuilder {
    // states:
    validationThemesIf(): JssStyle
    validationStates(inherit : boolean): JssStyle



    // functions:
    validationPropsFn(): JssStyle
    validationAnimFn(): JssStyle
}
export class EditableControlStyles extends ControlStyles implements IValidationStylesBuilder {
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
     * valid-state focused box-shadow color.
     */
    protected readonly _boxShadowFocusIfVal = 'boxShadowFocusIfVal'

    /**
     * valid-state foreground color - at outlined variant.
     */
    protected readonly _outlinedForegIfVal  = 'outlinedForegIfVal'
 
 
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
     * invalid-state focused box-shadow color.
     */
    protected readonly _boxShadowFocusIfInv = 'boxShadowFocusIfInv'

    /**
     * invalid-state foreground color - at outlined variant.
     */
    protected readonly _outlinedForegIfInv  = 'outlinedForegIfInv'



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
    


    protected /*virtual*/ applyStateValid(): JssStyle { return {
        //TODO: update....
        // apply a *valid* color theme:
        // [this.decl(this._foregIfIf)]          : this.ref(this._foregIfVal),
        // [this.decl(this._backgIfIf)]          : this.ref(this._backgIfVal),
        // [this.decl(this._borderIfIf)]         : this.ref(this._borderIfVal),
        // [this.decl(this._outlinedForegIfIf)]  : this.ref(this._outlinedForegIfVal),
        // [this.decl(this._boxShadowFocusIfIf)] : this.ref(this._boxShadowFocusIfVal),
    }}
    protected /*virtual*/ applyStateInvalid(): JssStyle { return {
        //TODO: update....
        // apply an *invalid* color theme:
        // [this.decl(this._foregIfIf)]          : this.ref(this._foregIfInv),
        // [this.decl(this._backgIfIf)]          : this.ref(this._backgIfInv),
        // [this.decl(this._borderIfIf)]         : this.ref(this._borderIfInv),
        // [this.decl(this._outlinedForegIfIf)]  : this.ref(this._outlinedForegIfInv),
        // [this.decl(this._boxShadowFocusIfIf)] : this.ref(this._boxShadowFocusIfInv),
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
    public /*virtual*/ validationThemesIf(): JssStyle { return {
        //TODO: update....
        // define a *valid* color theme:
        [this.decl(this._foregIfVal)]           : colors.successText,
        [this.decl(this._backgIfVal)]           : this.solidBackg(colors.success),
        [this.decl(this._borderIfVal)]          : colors.successCont,
        [this.decl(this._boxShadowFocusIfVal)]  : colors.successTransp,
        [this.decl(this._outlinedForegIfVal)]   : colors.success,

        //TODO: update....
        // define an *invalid* color theme:
        [this.decl(this._foregIfInv)]           : colors.dangerText,
        [this.decl(this._backgIfInv)]           : this.solidBackg(colors.danger),
        [this.decl(this._borderIfInv)]          : colors.dangerCont,
        [this.decl(this._boxShadowFocusIfInv)]  : colors.dangerTransp,
        [this.decl(this._outlinedForegIfInv)]   : colors.danger,
    }}
    public /*virtual*/ validationStates(inherit = false): JssStyle { return {
        extend: [
            this.iif(!inherit, {
                //#region all initial states are none
                [this.decl(this._animValUnval)] : bcssProps.animNone,
                [this.decl(this._animInvUninv)] : bcssProps.animNone,
                //#endregion all initial states are none
            }),



            //#region specific states
            this.stateValidating({
                [this.decl(this._animValUnval)] : cssProps.animValid,
            }),
            //TODO: update....
            this.stateValid(this.applyStateValid()),
            this.stateUnvalidating({
                [this.decl(this._animValUnval)] : cssProps.animUnvalid,
            }),
    
            this.stateInvalidating({
                [this.decl(this._animInvUninv)] : cssProps.animInvalid,
            }),
            //TODO: update....
            this.stateInvalid(this.applyStateInvalid()),
            this.stateUninvalidating({
                [this.decl(this._animInvUninv)] : cssProps.animUninvalid,
            }),
            //#endregion specific states
        ] as JssStyle,
    }}

    public /*override*/ themesIfOld(): JssStyle { return {
        extend: [
            super.themesIfOld(),          // copy themes from base



            this.validationThemesIf(), // copy themes from validation
        ] as JssStyle,
    }}
    public /*override*/ statesOld(inherit = false): JssStyle { return {
        extend: [
            super.statesOld(inherit),          // copy states from base



            this.validationStates(inherit), // copy states from validation
        ] as JssStyle,
    }}



    // functions:
    public /*virtual*/ validationPropsFn(): JssStyle { return {} }
    public /*virtual*/ validationAnimFn(): JssStyle { return {
        //#region re-arrange the animFn at different states
        ...this.stateValid({
            // define an *animations* func:
            [this.decl(this._animFnOld)]: [
                bcssProps.anim,
                this.ref(this._animValUnval), // 2nd : ctrl already validated, move to the least priority
                this.ref(this._animInvUninv), // 1st : rarely triggered => low probability
            ],
        }),

        // define an *animations* func:
        [this.decl(this._animFnOld)]: [
            bcssProps.anim,
            this.ref(this._animInvUninv),
            this.ref(this._animValUnval),
        ],
        //#endregion re-arrange the animFn at different states
    }}

    public /*override*/ propsFnOld(): JssStyle { return {
        extend: [
            super.propsFnOld(), // copy functional props from base

            this.validationPropsFn(),
        ] as JssStyle,
    }}
    public /*override*/ animFnOld(): JssStyle { return {
        //#region re-arrange the animFn at different states
        '&.active,&.actived': // if activated programmatically (not by user input)
            this.stateNotDisabled({ // if ctrl was not fully disabled
                ...this.stateValid({
                    // define an *animations* func:
                    [this.decl(this._animFnOld)]: [
                        bcssProps.anim,
                        this.ref(this._animActivePassive), // 6th : ctrl already pressed, move to the least priority
                        this.ref(this._animValUnval),      // 5th : ctrl already validated, move to the least priority
                        this.ref(this._animInvUninv),      // 4th : rarely triggered => low probability
                        this.ref(this._animArriveLeave),    // 3rd : cursor leaved   => low probability because holding press
                        this.ref(this._animFocusBlur),     // 2nd : ctrl lost focus => low probability because holding press
                        this.ref(this._animEnableDisable), // 1st : ctrl enable/disable => rarely used => low probability
                    ],
                }),
                // define an *animations* func:
                [this.decl(this._animFnOld)]: [
                    bcssProps.anim,
                    this.ref(this._animActivePassive), // 6th : ctrl already pressed, move to the least priority
                    this.ref(this._animInvUninv),      // 5th : rarely triggered => low probability
                    this.ref(this._animValUnval),      // 4th : rarely triggered => low probability
                    this.ref(this._animArriveLeave),    // 3rd : cursor leaved   => low probability because holding press
                    this.ref(this._animFocusBlur),     // 2nd : ctrl lost focus => low probability because holding press
                    this.ref(this._animEnableDisable), // 1st : ctrl enable/disable => rarely used => low probability
                ],
            }),

        ...this.stateValid({
            // define an *animations* func:
            [this.decl(this._animFnOld)]: [
                bcssProps.anim,
                this.ref(this._animValUnval),      // 6th : ctrl already validated, move to the least priority
                this.ref(this._animInvUninv),      // 5th : rarely triggered => low probability
                this.ref(this._animEnableDisable), // 4th : ctrl must be enabled
                this.ref(this._animArriveLeave),    // 3rd : cursor hovered over ctrl
                this.ref(this._animFocusBlur),     // 2nd : ctrl got focused (can interrupt hover/leave)
                this.ref(this._animActivePassive), // 1st : ctrl got pressed (can interrupt focus/blur)
            ],
        }),
        // define an *animations* func:
        [this.decl(this._animFnOld)]: [
            bcssProps.anim,
            this.ref(this._animInvUninv),      // 6th : rarely triggered => low probability
            this.ref(this._animValUnval),      // 5th : rarely triggered => low probability
            this.ref(this._animEnableDisable), // 4th : ctrl must be enabled
            this.ref(this._animArriveLeave),    // 3rd : cursor hovered over ctrl
            this.ref(this._animFocusBlur),     // 2nd : ctrl got focused (can interrupt hover/leave)
            this.ref(this._animActivePassive), // 1st : ctrl got pressed (can interrupt focus/blur)
        ],
        //#endregion re-arrange the animFn at different states
    }}



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base
        ] as JssStyle,



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
}
export const editableControlStyles = new EditableControlStyles();



// configs:

const cssConfig = new CssConfig(() => {
    const keyframesValid     : PropEx.Keyframes = {
        from: {
            backg: colors.success,
        },
        to: {
            backg: editableControlStyles.ref(editableControlStyles._backg),
        },
    };
    const keyframesUnvalid   : PropEx.Keyframes = {};

    const keyframesInvalid   : PropEx.Keyframes = {
        from: {
            backg: colors.danger,
        },
        to: {
            backg: editableControlStyles.ref(editableControlStyles._backg),
        },
    };
    const keyframesUninvalid : PropEx.Keyframes = {};


    
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
export type ValidatorHandler       = () => ValResult
export type CustomValidatorHandler = (state: ValidityState, value: string) => ValResult
export function useInputValidator(customValidator?: CustomValidatorHandler) {
    // states:
    let [isValid, setIsValid] = useState<ValResult>(null);


    
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
        validator    : ((): ValResult => isValid) as ValidatorHandler,

        handleInit   : handleInit,
        handleChange : handleChange,
    };
}
export function useStateValidInvalid(props: ValidationProps, validator?: ValidatorHandler) {
    // fn props:
    const propValidation = usePropValidation(props);



    // defaults:
    const defaultValided: ValResult         = null; // if [isValid] was not specified => the default value is [isValid=null] (neither error nor success)


    
    // states:
    const [valided,       setValided      ] = useState<ValResult|undefined>((): (ValResult|undefined) => {
        // use prop as the primary validator:
        if (propValidation.isValid !== undefined) return propValidation.isValid; // validity is set => set state to uncheck/valid/invalid

        
        
        // use input validator as secondary:
        if (validator)                            return undefined; // undefined means => evaluate the validator *at startup*

        
        
        // use default value as fallback:
        return defaultValided;
    });

    const [succAnimating, setSuccAnimating] = useState<boolean|null>(null); // null => no-succ-animation, true => succ-animation, false => unsucc-animation
    const [errAnimating,  setErrAnimating ] = useState<boolean|null>(null); // null => no-err-animation,  true => err-animation,  false => unerr-animation
    
    
    
    /*
     * state is set as [context and / or controllable] if [            validation is enabled] && [            validity is set]
     * state is set as validator                       if [validator's validation is enabled] && [validator's validity is set]
     * otherwise return undefined (represents no change needed)
     */
    const validFn = ((): (ValResult|undefined) => {
        // use prop as the primary validator:
        if (propValidation.isValid !== undefined) return propValidation.isValid; // validity is set => set state to uncheck/valid/invalid

        
        
        // use input validator as secondary:
        if ((valided !== undefined) && validator) return validator(); // now validator has been loaded => evaluate the validator *now*

        
        
        // no change needed:
        return undefined;
    })();

    if ((validFn !== undefined) && (valided !== validFn)) { // change detected => apply the change & start animating
        setValided(validFn);   // remember the last change

        switch (validFn) {
            case true: // success
                // if was error => un-error:
                if (valided === false) setErrAnimating(false);  // start unerr-animation

                setSuccAnimating(true); // start succ-animation
                break;

            case false: // error
                // if was success => un-success:
                if (valided === true)  setSuccAnimating(false); // start unsucc-animation

                setErrAnimating(true);  // start err-animation
                break;
                
            case null: // uncheck
                // if was success => un-success:
                if (valided === true)  setSuccAnimating(false); // start unsucc-animation

                // if was error => un-error:
                if (valided === false) setErrAnimating(false);  // start unerr-animation
                break;
        } // switch
    }

    
    
    // watch the changes once (only at startup):
    useEffect(() => {
        if (valided === undefined) {
            // now validator has been loaded => re-*set the initial* state of `valided` with any values other than `undefined`
            // once set, this effect will never be executed again
            setValided(validator ? validator() : defaultValided);
        }
    }, [valided, validator]);

    
    
    const handleIdleSucc = () => {
        // clean up finished animation

        setSuccAnimating(null); // stop succ-animation/unsucc-animation
    }
    const handleIdleErr = () => {
        // clean up finished animation

        setErrAnimating(null);  // stop err-animation/unerr-animation
    }
    const valDisabled = // causing the validator() not evaluated (disabled):
        (propValidation.isValid === null) ||
        (!validator);
    return {
        /**
         * `true`  : validating/valid
         * `false` : invalidating/invalid
         * `null`  : uncheck/unvalidating/uninvalidating
        */
        valid: (valided ?? null) as ValResult,
        valDisabled: valDisabled,
        class: [
            ((): string|null => {
                if (succAnimating === true)  return   'val';
                if (succAnimating === false) return 'unval';
    
                if (valided === true)        return   'vald';
    
                return null;
            })(),

            ((): string|null => {
                if (errAnimating === true)   return   'inv';
                if (errAnimating === false)  return 'uninv';
    
                if (valided === false)       return   'invd';
    
                return null;
            })(),

            ((): string|null => {
                if ((valided === null) && valDisabled) return 'valdis';
    
                return null;
            })(),
        ].filter((c) => !!c).join(' ') || undefined,
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

export interface EditableControlProps<TElement extends EditableControlElement = EditableControlElement>
    extends
        ControlProps<TElement>,

        ValidationProps
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
export default function EditableControl<TElement extends EditableControlElement = EditableControlElement>(props: EditableControlProps<TElement>) {
    // styles:
    const styles         = editableControlStyles.useStyles();

    
    
    // states:
    const inputValidator = useInputValidator(props.customValidator);
    const stateValInval  = useStateValidInvalid(props, inputValidator.validator);

    

    // fn props:
    const htmlEditCtrls  = [
        'input',
        'select',
        'textarea',
    ];


    
    // jsx:
    return (
        <Control<TElement>
            // other props:
            {...props}


            // classes:
            mainClass={props.mainClass ?? styles.main}
            stateClasses={[...(props.stateClasses ?? []),
                stateValInval.class,
            ]}


            // validations:
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
export { EditableControl }