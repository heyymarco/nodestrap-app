// react (builds html using javascript):
import {
    default as React,
    createContext,
    useContext,
}                           from 'react'             // base technology of our nodestrap components



// validation results:

/**
 * Validation was skipped because its not required. Neither success nor error shown.
 */
export type Uncheck = null
/**
 * Validation was failed because the value did not meet the criteria.
 */
export type Error   = false
/**
 * Validation was successful and the value meet the criteria.
 */
export type Success = true
export type Result  = Uncheck|Error|Success;



// contexts:

/**
 * Contains validation props.
 */
export interface Validation {
    /**
     * `true`      : validation feature is *enabled*, preserve `isValid` prop.  
     * `false`     : validation feature is *disabled*, equivalent as `isValid = null` (*uncheck*).
     */
    enableValidation  : boolean

    /**
     * `undefined` : *automatic* detect valid/invalid state.  
     * `null`      : force validation state to *uncheck*.  
     * `true`      : force validation state to *valid*.  
     * `false`     : force validation state to *invalid*.
     */
    isValid?          : Result
}

/**
 * A react context for validation stuff.
 */
export const Context = createContext<Validation>(/*defaultValue =*/{
    enableValidation  : true,
    isValid           : undefined,
});
Context.displayName  = 'Validation';



// hooks:

export function usePropValidation(props: ValidationProps): Validation {
    // contexts:
    const valContext = useContext(Context);



    const isInheritValidation = (props.inheritValidation ?? true); // if [inheritValidation] was not specified => the default value is [inheritValidation=true]
    const enableValidation = (
        (
            isInheritValidation          // check if the [inheritValidation] was enabled
            ?
            valContext.enableValidation  // => if parent's validation is enabled => current component's validation is *might* enabled too, otherwise *always* disabled
            :
            true                         // otherwise => treat parent's validation as enabled
        )
        &&
        (props.enableValidation ?? true) // if [enableValidation] was not specified => the default value is [enableValidation=true]
    );
    const isValid = ((): Result|undefined => {
        if (!enableValidation) return null; // if validation was disabled => treat validity as *uncheck* (null)

        
        
        const contextIsValid = (
            isInheritValidation          // check if the [inheritValidation] was enabled
            ?
            valContext.isValid           // => use the parent's validity
            :
            undefined                    // otherwise => treat parent's validity as *auto* (undefined)
        );
        if (contextIsValid !== undefined) return contextIsValid; // if the parent's validity was set other than *auto* (undefined) => use it
        
        
        
        return props.isValid;                                    // otherwise => use the component's validity
    })();
    return {
        enableValidation : enableValidation,
        isValid          : isValid,
    };
}



// react components:

export interface ValidationProps
{
    /**
     * `undefined` : same as `true`.  
     * `true`      : validation feature is *enabled*, preserve `isValid` prop.  
     * `false`     : validation feature is *disabled*, equivalent as `isValid = null` (*uncheck*).
     */
    enableValidation?  : boolean

    /**
     * `undefined` : *automatic* detect valid/invalid state.  
     * `null`      : force validation state to *uncheck*.  
     * `true`      : force validation state to *valid*.  
     * `false`     : force validation state to *invalid*.
     */
    isValid?           : Result

    /**
     * `undefined` : same as `true`.  
     * `true`      : inherits `enableValidation` & `isValid` from parent (`ValidationProvider` context).  
     * `false`     : independent `enableValidation` & `isValid`.
     */
    inheritValidation? : boolean



    // children:
    children?          : React.ReactNode
}
export default function ValidationProvider(props: ValidationProps) {
    return (
        <Context.Provider value={{
            enableValidation : props.enableValidation ?? true,
            isValid          : props.isValid,
        }}>
            {props.children}
        </Context.Provider>
    );
}
export { ValidationProvider }