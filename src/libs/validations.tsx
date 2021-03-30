// react (builds html using javascript):
import
    React, {
    createContext,
}                          from 'react'             // base technology of our nodestrap components



/**
 * Validation was skipped because its not required. Neither success nor error shown.
 */
export type Nocheck = null
/**
 * Validation was failed because the value did not meet the criteria.
 */
export type Error   = false
/**
 * Validation was successful and the value meet the criteria.
 */
export type Success = true
export type Result  = Nocheck|Error|Success;



/**
 * Contains validation props.
 */
export interface Validation {
    /**
     * `undefined` : same as `true`.  
     * `true`      : validation feature is *enabled*, preserve `isValid` prop.  
     * `false`     : validation feature is *disabled*, equivalent as `isValid = null` (*uncheck*).
     */
    enableValidation? : boolean

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
    enableValidation : true,
    isValid          : undefined,
});
Context.displayName  = 'Validation';



export interface Props
    extends
        Validation
{
    // children:
    children?         : React.ReactNode
}
export default function ValidationProvider(props: Props) {
    return (
        <Context.Provider value={{
            enableValidation : props.enableValidation ?? true,
            isValid          : props.isValid,
        }}>
            {props.children}
        </Context.Provider>
    );
}