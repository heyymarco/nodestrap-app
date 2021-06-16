// react (builds html using javascript):
import
    React, {
    useState,
}                          from 'react'        // base technology of our nodestrap components

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
    BasicComponentStyles,
    BasicComponentProps,
    BasicComponent,
}                           from './BasicComponent'
import {
    IContentStyles,
    contentStyles,
}                           from './Content'
import {
    useStateValidInvalid,
}                           from './EditableControl'
import type {
    IValidationStylesBuilder,
}                           from './EditableControl'
import {
    styles as editableTextControlStyles,
}                           from './EditableTextControl'
import {
    usePropValidation,
    ValidationProvider,
}                           from './validations'
import type * as Val        from './validations'
import type {
    Props as ValidationProps,
}                           from './validations'



// styles:

export class FormStylesBuilder extends BasicComponentStyles implements IContentStyles, IValidationStylesBuilder {
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
    public /*override*/ states()      : ClassList { return [
        ...super.states(), // copy states from base



        ...this.contentStates(),
    ]}
    public /*override*/ actived()     : JssStyle {
        return this.contentActived();
    }
    public /*override*/ activating()  : JssStyle {
        return this.contentActivating();
    }
    public /*override*/ passivating() : JssStyle {
        return this.contentPassivating();
    }
    public /*override*/ passived()    : JssStyle {
        return this.contentPassived();
    }

    public /*implement*/ contentStates()      : ClassList {
        return editableTextControlStyles.contentStates();
    }
    public /*implement*/ contentActived()     : JssStyle {
        return editableTextControlStyles.contentActived();
    }
    public /*implement*/ contentActivating()  : JssStyle {
        return editableTextControlStyles.contentActivating();
    }
    public /*implement*/ contentPassivating() : JssStyle {
        return editableTextControlStyles.contentPassivating();
    }
    public /*implement*/ contentPassived()    : JssStyle {
        return editableTextControlStyles.contentPassived();
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
        return editableTextControlStyles.contentPropsFn(); // copy functional props from Content
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
export const styles = new FormStylesBuilder();



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

export type ValidatorHandler = () => Val.Result;
export type CustomValidatorHandler = (isValid: Val.Result) => Val.Result;
export function useFormValidator(customValidator?: CustomValidatorHandler) {
    // states:
    let [isValid, setIsValid] = useState<Val.Result>(null);


    
    const handleVals = (target: HTMLFormElement, immediately = false) => {
        const getIsValid = (): Val.Result => target.matches(':valid') ? true : (target.matches(':invalid') ? false : null);

        
        
        const update = (validPrev?: Val.Result) => {
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
        validator    : ((): Val.Result => isValid) as ValidatorHandler,

        handleInit   : handleInit,
        handleChange : handleChange,
    };
}



// react components:

export interface Props
    extends
        BasicComponentProps<HTMLFormElement>,
        ValidationProps,
        React.FormHTMLAttributes<HTMLFormElement>
{
    // validations:
    customValidator? : CustomValidatorHandler


    // children:
    children?        : React.ReactNode
}
export default function Form(props: Props) {
    // styles:
    const formStyles     = styles.useStyles();

    
    
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
            mainClass={props.mainClass ?? formStyles.main}
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