// react (builds html using javascript):
import
    React, {
    useState,
}                          from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
}                          from 'jss'          // ts defs support for jss
import {
    Cust,
}                          from './Css'        // ts defs support for jss
import CssConfig           from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import {
    default  as Element,
    ElementStylesBuilder,
}                          from './Element'
import type * as Elements  from './Element'
import {
    styles as contentStyles,
}                          from './Content'
import {
    useStateValidInvalid,
}                          from './EditableControl'
import {
    styles as editableTextControlStyles,
}                          from './EditableTextControl'
import type * as Val       from './validations'



// styles:

export class FormStylesBuilder extends ElementStylesBuilder {
    // themes:
    public themeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle { return {
        extend: [
            super.themeOf(theme, Theme, themeProp, themeColor), // copy themes from base

            contentStyles.contentThemeOf(theme, Theme, themeProp, themeColor),
            {
                [contentStyles.decl(contentStyles._activeForegTh)] : undefined as unknown as null, // delete
                [contentStyles.decl(contentStyles._activeBackgTh)] : undefined as unknown as null, // delete
            },
        ] as JssStyle,
    }}
    public sizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {
        extend: [
            super.sizeOf(size, Size, sizeProp), // copy sizes from base

            contentStyles.contentSizeOf(size, Size, sizeProp),
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, Size)),
    }}



    // states:
    protected themesIf(): JssStyle { return {
        extend: [
            super.themesIf(),                               // copy themes from base

            editableTextControlStyles.validationThemesIf(), // copy themes from validation
            editableTextControlStyles.contentThemesIf(),
        ] as JssStyle,
    }}
    protected states(inherit = false): JssStyle { return {
        extend: [
            super.states(inherit),                               // copy states from base

            editableTextControlStyles.validationStates(inherit), // copy states from validation
            editableTextControlStyles.contentStates(inherit),
        ] as JssStyle,
    }}



    // fn props:
    protected fnProps(): JssStyle { return {
        extend: [
            super.fnProps(),                               // copy functional props from base

            editableTextControlStyles.validationFnProps(), // copy functional props from validation
            editableTextControlStyles.contentFnProps(),
        ] as JssStyle,
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
        Elements.Props<HTMLFormElement>,
        Val.Validation,
        React.FormHTMLAttributes<HTMLFormElement>
{
    // validations:
    customValidator? : CustomValidatorHandler


    // children:
    children?        : React.ReactNode
}
export default function Form(props: Props) {
    const formStyles    = styles.useStyles();

    // states:
    const formValidator = useFormValidator(props.customValidator);
    const stateValInval = useStateValidInvalid(props, formValidator.validator);



    return (
        <Element<HTMLFormElement>
            // default props:
            tag='form'


            // other props:
            {...props}


            // main:
            mainClass={props.mainClass ?? formStyles.main}


            // classes:
            classes={[
                // additionals:
                ...(props.classes ?? []),


                // validations:
                stateValInval.class,
            ]}


            // EditableControl props:
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
            onChange={(e: React.ChangeEvent<HTMLFormElement>) => { // watch change event from current element or bubbling from children
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
        />
    );
}