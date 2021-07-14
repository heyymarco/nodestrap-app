// react (builds html using javascript):
import {
    default as React,
    useState,
    useEffect,
    useRef,
}                           from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    PropEx,
    Cust,
    StateList,
    PropList,

    
    // components:
    CssConfig,
}                           from './nodestrap'  // nodestrap's core
import colors               from './colors'     // configurable colors & theming defs
import {
    usePropEnabled,
    usePropReadOnly,
}                           from './accessibilities'
import {
    Result as ValResult,
    usePropValidation,
    
    ValidationProps,
}                           from './validations'
import {
    ControlStyles,
    ControlProps,
    Control,
}                           from './Control'



// styles:

export class EditableControlStyles extends ControlStyles {
    //#region props
    //#region animations
    protected readonly _animValUnval = 'animValUnval'
    protected readonly _animInvUninv = 'animInvUninv'
    //#endregion animations
    //#endregion props



    // variants:
    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}



    // states:
    public /*override*/ states(inherit: boolean): StateList { return [
        ...super.states(inherit), // copy states from base



        [ null, {
            // reset filters/anims/toggles to initial/inherit state:
            ...this.resetValidUnvalid(inherit),
            ...this.resetInvalidUninvalid(inherit),
        }],



        // .vald will be added after validating-animation done
        [  '.vald'                                                              , [this.valid()     , this.valided()       ] ],

        // .val = programatically valid, :valid = user valid
        [ ['.val',
           ':valid:not(.vald):not(.unval):not(.noval):not(.invd):not(.inv)']    , [this.valid()     , this.validating()    ] ],

        // .unval will be added after loosing valid and will be removed after unvalidating-animation done
        [  '.unval'                                                             , [this.unvalid()   , this.unvalidating()  ] ],

        // if all above are not set => unvalided
        // optionally use .noval to kill pseudo :valid
        [ [':not(.vald):not(.val):not(:valid):not(.unval)',
           '.noval']                                                            , [this.unvalid()   , this.unvalided()     ] ],



        // .invd will be added after invalidating-animation done
        [  '.invd'                                                              , [this.invalid()   , this.invalided()     ] ],

        // .inv = programatically invalid, :invalid = user invalid
        [ ['.inv',
           ':invalid:not(.invd):not(.uninv):not(.noval):not(.vald):not(.val)']  , [this.invalid()   , this.invalidating()  ] ],

        // .uninv will be added after loosing invalid and will be removed after uninvalidating-animation done
        [  '.uninv'                                                             , [this.uninvalid() , this.uninvalidating()] ],

        // if all above are not set => uninvalided
        // optionally use .noval to kill pseudo :invalid
        [ [':not(.invd):not(.inv):not(:invalid):not(.uninv)',
           '.noval']                                                            , [this.uninvalid() , this.uninvalided()   ] ],
        
        
        
        // if all above are not set => noValidation
        // optionally use .noval to kill pseudo :valid & :invalid
        [ [':not(.vald):not(.val):not(:valid):not(.unval)' +
           ':not(.invd):not(.inv):not(:invalid):not(.uninv)',
           '.noval']                                                            , this.noValidation()                        ],
    ]}

    public /*virtual*/ resetValidUnvalid(inherit: boolean) : PropList { return {
        [this.decl(this._animValUnval)] : inherit ? 'unset' : 'initial',
    }}
    public /*virtual*/ valided()        : JssStyle { return {
        /* --nothing-- */
    }}
    public /*virtual*/ validating()     : JssStyle { return {
        [this.decl(this._animValUnval)] : cssProps.animValid,
    }}
    public /*virtual*/ unvalidating()   : JssStyle { return {
        [this.decl(this._animValUnval)] : cssProps.animUnvalid,
    }}
    public /*virtual*/ unvalided()      : JssStyle { return {
        /* --nothing-- */
    }}
    public /*virtual*/ valid()          : JssStyle { return {
        extend: [
            this.markValid(),
        ] as JssStyle,
    }}
    public /*virtual*/ unvalid()        : JssStyle { return {
    }}

    public /*virtual*/ markValid()      : JssStyle { return {
        ...this.themeValid(),
    }}
    public /*virtual*/ themeValid(theme = 'success'): PropList {
        return this.themeIfIf(theme);
    }



    public /*virtual*/ resetInvalidUninvalid(inherit: boolean) : PropList { return {
        [this.decl(this._animInvUninv)] : inherit ? 'unset' : 'initial',
    }}
    public /*virtual*/ invalided()      : JssStyle { return {
        /* --nothing-- */
    }}
    public /*virtual*/ invalidating()   : JssStyle { return {
        [this.decl(this._animInvUninv)] : cssProps.animInvalid,
    }}
    public /*virtual*/ uninvalidating() : JssStyle { return {
        [this.decl(this._animInvUninv)] : cssProps.animUninvalid,
    }}
    public /*virtual*/ uninvalided()    : JssStyle { return {
        /* --nothing-- */
    }}
    public /*virtual*/ invalid()        : JssStyle { return {
        extend: [
            this.markInvalid(),
        ] as JssStyle,
    }}
    public /*virtual*/ uninvalid()      : JssStyle { return {
    }}

    public /*virtual*/ markInvalid()    : JssStyle { return {
        ...this.themeInvalid(),
    }}
    public /*virtual*/ themeInvalid(theme = 'danger'): PropList {
        return this.themeIfIf(theme);
    }



    public /*virtual*/ noValidation()   : JssStyle { return {
    }}



    // functions:
    public /*override*/ animFn(): Cust.Ref[] { return [
        ...super.animFn(), // copy functional animations from base



        this.ref(this._animValUnval, this._animNone),
        this.ref(this._animInvUninv, this._animNone),
    ]}



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
        //#region animations
        '@keyframes valid'     : keyframesValid,
        '@keyframes unvalid'   : keyframesUnvalid,
        '@keyframes invalid'   : keyframesInvalid,
        '@keyframes uninvalid' : keyframesUninvalid,
        animValid              : [['1000ms', 'ease-out', 'both', keyframesValid    ]],
        animUnvalid            : [[ '100ms', 'ease-out', 'both', keyframesUnvalid  ]],
        animInvalid            : [['1000ms', 'ease-out', 'both', keyframesInvalid  ]],
        animUninvalid          : [[ '100ms', 'ease-out', 'both', keyframesUninvalid]],
        //#endregion animations
    };
}, /*prefix: */'ectrl');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// hooks:

export type EditableControlElement = HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement
export type ValidatorHandler       = () => ValResult
export type CustomValidatorHandler = (state: ValidityState, value: string) => ValResult
export function useInputValidator(customValidator?: CustomValidatorHandler) {
    // states:
    let [isValid, setIsValid] = useState<ValResult>(null);


    
    const handleValidation = (target: EditableControlElement, immediately = false) => {
        const update = (validity: ValidityState, valuePrev?: string) => {
            const valueNow = target.value;
            if ((valuePrev !== undefined) && (valuePrev !== valueNow)) return; // the value has been modified during waiting => abort further validating
            

            
            // instantly update variable `isValid` without waiting state to refresh (re-render)
            // because the value is needed immediately by `useStateValidInvalid` at startup
            isValid = (customValidator ? customValidator(validity, valueNow) : validity.valid);
            setIsValid(isValid);
        };



        if (immediately) {
            // instant validate:
            update(target.validity);
        }
        else {
            const validity  = target.validity;
            const valuePrev = target.value;
        
            // delay a while for the further validating, to avoid unpleasant splash effect
            setTimeout(
                () => update(validity, valuePrev),
                (validity.valid !== false) ? 100 : 500
            );
        } // if
    }
    const handleInit = (target: EditableControlElement) => {
        handleValidation(target, /*immediately =*/true);
    }
    const handleChange = (target: EditableControlElement) => {
        handleValidation(target);
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
    const propEnabled    = usePropEnabled(props);
    const propReadOnly   = usePropReadOnly(props);



    // defaults:
    const defaultValided: ValResult         = null; // if [isValid] was not specified => the default value is [isValid=null] (neither valid nor invalid)


    
    // states:
    const [valided,       setValided      ] = useState<ValResult|undefined>((): (ValResult|undefined) => {
        // if disabled or readOnly => no validation
        if (!propEnabled || propReadOnly)         return null;



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
     * state is set as [context and / or controllable] if [            validation is enabled] && [validity is set]
     * state is set as validator                       if [validator's validation is enabled] && [validator has loaded]
     * otherwise return undefined (represents no change needed)
     */
    const validFn = ((): (ValResult|undefined) => {
        // if disabled or readOnly => no validation
        if (!propEnabled || propReadOnly)         return null;



        // use prop as the primary validator:
        if (propValidation.isValid !== undefined) return propValidation.isValid; // validity is set => set state to uncheck/valid/invalid

        
        
        // use input validator as secondary:
        if ((valided !== undefined)) return (validator ? validator() : defaultValided); // if validator has loaded => evaluate the validator *now*

        
        
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
    const noValidation = // causing the validFn *always* `null`:
        (!propEnabled || propReadOnly)
        ||
        (propValidation.isValid === null)
        ||
        (!validator);
    return {
        /**
         * `true`  : validating/valided
         * `false` : invalidating/invalided
         * `null`  : uncheck/unvalidating/uninvalidating
        */
        valid        : (valided ?? null) as ValResult,
        noValidation : noValidation,

        class: [
            // valid classes:
            ((): string|null => {
                if (succAnimating === true)  return   'val';
                if (succAnimating === false) return 'unval';
    
                if (valided === true)        return   'vald';
    
                return null;
            })(),



            // invalid classes:
            ((): string|null => {
                if (errAnimating === true)   return   'inv';
                if (errAnimating === false)  return 'uninv';
    
                if (valided === false)       return   'invd';
    
                return null;
            })(),



            // neutral classes:
            ((): string|null => {
                if (valided === null) {
                    // if (noValidation) {
                    //     return 'noval'; // validation_disabled by controllable prop => use class .noval to kill [:valid || :invalid]
                    // }
                    // else {
                    //     return null; // discard all classes above
                    // } // if

                    return 'noval';
                } // if
    
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
    // values:
    defaultValue?    : string | number | ReadonlyArray<string>
    value?           : string | number | ReadonlyArray<string>
    // onChange?        : React.ChangeEventHandler<TElement>
    // onChange?        : React.FormEventHandler<TElement>
    

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


    
    // jsx:
    const inputRef       = useRef<TElement|null>(null);
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
                        inputRef.current = elm;
                    }
                    else {
                        const firstChild = elm.querySelector('input,select,textarea');
                        if (firstChild) inputRef.current = firstChild as TElement;
                    } // if

                    if (inputRef.current) inputValidator.handleInit(inputRef.current);
                } // if


                // forwards:
                const elmRef = props.elmRef;
                if (elmRef) {
                    if (typeof(elmRef) === 'function') {
                        elmRef(elm);
                    }
                    else {
                        (elmRef as React.MutableRefObject<TElement|null>).current = elm;
                    } // if
                } // if
            }}
            onChange={(e: React.ChangeEvent<TElement>) => { // watch change event from current element or bubbling from children
                // validations:
                if (inputRef.current) inputValidator.handleChange(inputRef.current);


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