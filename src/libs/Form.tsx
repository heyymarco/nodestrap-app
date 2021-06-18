// react (builds html using javascript):
import {
    default as React,
    useState,
}                           from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    ClassList,
    PropList,

    
    // components:
    CssConfig,
}                           from './nodestrap'   // nodestrap's core
import {
    Result as ValResult,
    usePropValidation,
    ValidationProps,
    ValidationProvider,
}                           from './validations'
import {
    BasicComponentStyles,
    BasicComponentProps,
    BasicComponent,
}                           from './BasicComponent'
import {
    useStateValidInvalid,
    IValidationStylesBuilder as ValidationStyles,
}                           from './EditableControl'
import {
    styles as editableTextControlStyles,
}                           from './EditableTextControl'
import {
    IContentStyles,
    contentStyles,
}                           from './Content'



// styles:

export class FormStyles extends BasicComponentStyles implements IContentStyles, ValidationStyles {
    // variants:
    public /*override*/ theme(theme: string): JssStyle { return {
        extend: [
            super.theme(theme), // copy themes from base

            this.contentTheme(theme),
        ] as JssStyle,
    }}
    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base

            this.contentSize(size),
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}

    public /*implement*/ contentTheme(theme: string): JssStyle {
        return editableTextControlStyles.contentTheme(theme); // copy themes from EditableTextControl
    }
    public /*implement*/ contentSize(size: string): JssStyle {
        return contentStyles.contentSize(size); // copy sizes from Content
    }



    // states:
    public /*override*/ states(inherit: boolean): ClassList { return [
        ...super.states(inherit), // copy states from base

        ...this.contentStates(inherit),
    ]}
    public /*implement*/ contentStates(inherit: boolean): ClassList {
        return editableTextControlStyles.contentStates(inherit); // copy states from EditableTextControl
    }

    public /*implement*/ validationThemesIf(): JssStyle {
        return editableTextControlStyles.validationThemesIf(); // copy themes from EditableTextControl
    }
    public /*implement*/ validationStates(inherit = false): JssStyle {
        return editableTextControlStyles.validationStates(inherit); // copy states from EditableTextControl
    }

    public /*override*/ themesIfOld(): JssStyle { return {
        extend: [
            super.themesIfOld(), // copy themes from base

            this.validationThemesIf(),
        ] as JssStyle,
    }}
    public /*override*/ statesOld(inherit = false): JssStyle { return {
        extend: [
            super.statesOld(inherit), // copy states from base

            this.validationStates(inherit),
        ] as JssStyle,
    }}



    // functions:
    public /*override*/ propsFn(): PropList { return {
        ...super.propsFn(), // copy functional props from base
        
        ...this.contentPropsFn(),
    }}
    public /*implement*/ contentPropsFn(): PropList {
        return editableTextControlStyles.contentPropsFn(); // copy functional props from EditableTextControl
    }

    public /*implement*/ validationPropsFn(): JssStyle {
        return editableTextControlStyles.validationPropsFn(); // copy functional props from EditableTextControl
    }
    public /*implement*/ validationAnimFn(): JssStyle {
        return editableTextControlStyles.validationAnimFn(); // copy functional anim from EditableTextControl
    }

    public /*override*/ propsFnOld(): JssStyle { return {
        extend: [
            super.propsFnOld(), // copy functional props from base

            this.validationPropsFn(),
        ] as JssStyle,
    }}
    public /*override*/ animFnOld(): JssStyle {
        return this.validationAnimFn();
    }



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base

            this.contentBasicStyle(),
        ] as JssStyle,



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
    public /*implement*/ contentBasicStyle(): JssStyle {
        return contentStyles.contentBasicStyle(); // copy basicStyle from Content
    }
}
export const formStyles = new FormStyles();



// configs:

const cssConfig = new CssConfig(() => {
    // common css values:
    // const initial = 'initial';
    // const unset   = 'unset';
    // const none    = 'none';
    // const inherit = 'inherit';
    // const center  = 'center';
    // const middle  = 'middle';


    return {
    };
}, /*prefix: */'frm');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// hooks:

export type ValidatorHandler = () => ValResult;
export type CustomValidatorHandler = (isValid: ValResult) => ValResult;
export function useFormValidator(customValidator?: CustomValidatorHandler) {
    // states:
    let [isValid, setIsValid] = useState<ValResult>(null);


    
    const handleVals = (target: HTMLFormElement, immediately = false) => {
        const getIsValid = (): ValResult => target.matches(':valid') ? true : (target.matches(':invalid') ? false : null);

        
        
        const update = (validPrev?: ValResult) => {
            const validNow = getIsValid();
            if ((validPrev !== undefined) && (validPrev !== validNow)) return; // has been modified during waiting => abort further validating
            

            
            isValid = (customValidator ? customValidator(validNow) : validNow);
            setIsValid(isValid);
        };



        if (immediately) {
            // instant validate:
            update();
        }
        else {
            const validPrev = getIsValid();
        
            // delay a while for the further validating, to avoid unpleasant effect
            setTimeout(
                () => update(validPrev),
                (validPrev !== false) ? 100 : 500
            );
        } // if
    }
    const handleInit = (target: HTMLFormElement | null) => {
        if (target) handleVals(target, /*immediately =*/true);
    }
    const handleChange = ({currentTarget}: React.FormEvent<HTMLFormElement>) => {
        handleVals(currentTarget);
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
                        // @ts-ignore
                        elmRef.current = elm;
                    } // if
                } // if
            }}
            onChange={(e: React.ChangeEvent<HTMLFormElement>) => { // watch change event bubbling from children
                // validations:
                formValidator.handleChange(e);


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