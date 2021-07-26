// react (builds html using javascript):
import {
    default as React,
    useState,
}                           from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    PropList,

    
    // components:
    CssConfig,
}                           from './nodestrap'  // nodestrap's core
import {
    Result as ValResult,
    usePropValidation,

    ValidationProps,
    ValidationProvider,
}                           from './validations'
import {
    BasicComponentProps,
    BasicComponent,
}                           from './BasicComponent'
import {
    useStateValidInvalid,

    EditableControlStyles,
}                           from './EditableControl'
import {
    IContentStyles,
    contentStyles,
}                           from './Content'



// styles:

export class FormStyles extends EditableControlStyles implements IContentStyles {
    // variants:
    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base

            this.contentSize(size),
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}
    public /*implement*/ contentSize(size: string): JssStyle {
        return contentStyles.contentSize(size); // copy sizes from Content
    }



    //#region discard all Control's states
    // states:
    public /*override*/ resetEnableDisable(inherit: boolean) : PropList  { return {} } // disabled
    public /*override*/ enabled()                            : JssStyle  { return {} } // disabled
    public /*override*/ enabling()                           : JssStyle  { return {} } // disabled
    public /*override*/ disabling()                          : JssStyle  { return {} } // disabled
    public /*override*/ disabled()                           : JssStyle  { return {} } // disabled

    public /*override*/ resetActivePassive(inherit: boolean) : PropList  { return {} } // disabled
    public /*override*/ actived()                            : JssStyle  { return {} } // disabled
    public /*override*/ activating()                         : JssStyle  { return {} } // disabled
    public /*override*/ passivating()                        : JssStyle  { return {} } // disabled
    public /*override*/ passived()                           : JssStyle  { return {} } // disabled
    public /*override*/ markActive()                         : JssStyle  { return {} } // disabled
    public /*override*/ themeActive(theme = 'primary')       : PropList  { return {} } // disabled

    public /*override*/ resetFocusBlur(inherit: boolean)     : PropList  { return {} } // disabled
    public /*override*/ focused()                            : JssStyle  { return {} } // disabled
    public /*override*/ focusing()                           : JssStyle  { return {} } // disabled
    public /*override*/ blurring()                           : JssStyle  { return {} } // disabled
    public /*override*/ blurred()                            : JssStyle  { return {} } // disabled

    public /*override*/ resetArriveLeave(inherit: boolean)   : PropList  { return {} } // disabled
    public /*override*/ arrived()                            : JssStyle  { return {} } // disabled
    public /*override*/ arriving()                           : JssStyle  { return {} } // disabled
    public /*override*/ leaving()                            : JssStyle  { return {} } // disabled
    public /*override*/ left()                               : JssStyle  { return {} } // disabled

    public /*override*/ resetPressRelease(inherit: boolean)  : PropList  { return {} } // disabled
    //#endregion discard all Control's states



    // styles:
    public /*override*/ layout(): JssStyle { return {
        extend: [
            super.layout(), // copy layout from base

            this.contentLayout(),
        ] as JssStyle,



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
    public /*implement*/ contentLayout(): JssStyle {
        return contentStyles.contentLayout(); // copy layout from Content
    }
}
export const formStyles = new FormStyles();



// configs:

const cssConfig = new CssConfig(() => {
    return {
    };
}, /*prefix: */'frm');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// hooks:

export type ValidatorHandler       = () => ValResult
export type CustomValidatorHandler = (isValid: ValResult) => ValResult
export function useFormValidator(customValidator?: CustomValidatorHandler) {
    // states:
    let [isValid, setIsValid] = useState<ValResult>(null);


    
    const handleValidation = (target: HTMLFormElement, immediately = false) => {
        const getIsValid = (): ValResult => target.matches(':valid') ? true : (target.matches(':invalid') ? false : null);

        
        
        const update = (validPrev?: ValResult) => {
            const validNow = getIsValid();
            if ((validPrev !== undefined) && (validPrev !== validNow)) return; // the validity has been modified during waiting => abort further validating
            

            
            // instantly update variable `isValid` without waiting state to refresh (re-render)
            // because the value is needed immediately by `useStateValidInvalid` at startup
            isValid = (customValidator ? customValidator(validNow) : validNow);
            setIsValid(isValid);
        };



        if (immediately) {
            // instant validate:
            update();
        }
        else {
            const validPrev = getIsValid();
        
            // delay a while for the further validating, to avoid unpleasant splash effect
            setTimeout(
                () => update(validPrev),
                (validPrev !== false) ? 300 : 600
            );
        } // if
    }
    const handleInit = (target: HTMLFormElement) => {
        handleValidation(target, /*immediately =*/true);
    }
    const handleChange = (target: HTMLFormElement) => {
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



// react components:

export interface FormProps
    extends
        BasicComponentProps<HTMLFormElement>,
        React.FormHTMLAttributes<HTMLFormElement>,

        ValidationProps
{
    // validations:
    customValidator? : CustomValidatorHandler


    // children:
    children?        : React.ReactNode
}
export default function Form(props: FormProps) {
    // styles:
    const styles         = formStyles.useStyles();

    
    
    // states:
    const formValidator  = useFormValidator(props.customValidator);
    const stateValInval  = useStateValidInvalid(props, formValidator.validator);



    // fn props:
    const propValidation = usePropValidation(props);



    // jsx:
    return (
        <BasicComponent<HTMLFormElement>
            // other props:
            {...props}


            // essentials:
            tag={props.tag ?? 'form'}


            // variants:
            mild={props.mild ?? true}


            // classes:
            mainClass={props.mainClass ?? styles.main}
            stateClasses={[...(props.stateClasses ?? []),
                stateValInval.class,
            ]}


            // validations:
            elmRef={(elm) => {
                if (elm) {
                    formValidator.handleInit(elm);
                } // if


                // forwards:
                const elmRef = props.elmRef;
                if (elmRef) {
                    if (typeof(elmRef) === 'function') {
                        elmRef(elm);
                    }
                    else {
                        (elmRef as React.MutableRefObject<HTMLFormElement|null>).current = elm;
                    } // if
                } // if
            }}
            onChange={(e) => { // watch change event bubbling from children
                // validations:
                formValidator.handleChange(e.currentTarget);


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
        >
            { props.children && <ValidationProvider {...propValidation}>
                { props.children }
            </ValidationProvider> }
        </BasicComponent>
    );
}
export { Form }