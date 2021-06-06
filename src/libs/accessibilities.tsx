// react (builds html using javascript):
import {
    default as React,
    createContext,
    useContext,
}                          from 'react'             // base technology of our nodestrap components



// contexts:

/**
 * Contains accessibility props.
 */
export interface Accessibility {
    /**
     * `true`      : component is enabled  - responses any user interaction.  
     * `false`     : component is disabled - ignores any user interaction.
     */
    enabled  : boolean

    /**
     * `true`      : component is in active state.  
     * `false`     : component is in passive state.
     */
    active   : boolean
}

/**
 * A react context for accessibility stuff.
 */
export const Context = createContext<Accessibility>(/*defaultValue =*/{
    enabled  : true,
    active   : false,
});
Context.displayName  = 'Accessibility';



// hooks:

export function usePropAccessibility(props: Props): Accessibility {
    // contexts:
    const accessContext = useContext(Context);



    return {
        enabled:
            accessContext.enabled   // if parent is enabled => current component *can be* enabled, otherwise disabled
            &&
            (props.enabled ?? true) // if [enabled] was not specified => the default value is [enabled=true] (enabled)
            ,
        active:
            accessContext.active    // if parent is active => current component *is always* active, otherwise can be actived
            ||
            (props.active ?? false) // if [active] was not specified => the default value is [active=false] (passive)
            ,
    };
}

export function usePropEnabled(props: Props): boolean {
    // contexts:
    const accessContext = useContext(Context);



    return (
        accessContext.enabled   // if parent is enabled => current component *can be* enabled, otherwise disabled
        &&
        (props.enabled ?? true) // if [enabled] was not specified => the default value is [enabled=true] (enabled)
    );
}

export function usePropActive(props: Props): boolean {
    // contexts:
    const accessContext = useContext(Context);



    return (
        accessContext.active    // if parent is active => current component *is always* active, otherwise can be actived
        ||
        (props.active ?? false) // if [active] was not specified => the default value is [active=false] (passive)
    );
}



// react components:

export interface Props
{
    /**
     * `undefined` : same as `true`.  
     * `true`      : component is enabled  - responses any user interaction.  
     * `false`     : component is disabled - ignores any user interaction.
     */
    enabled? : boolean

    /**
     * `undefined` : same as `false`.  
     * `true`      : component is in active state.  
     * `false`     : component is in normal state.
     */
    active?  : boolean



    // children:
    children? : React.ReactNode
}
export default function AccessibilityProvider(props: Props) {
    return (
        <Context.Provider value={{
            enabled  : props.enabled ?? true,
            active   : props.active  ?? false,
        }}>
            {props.children}
        </Context.Provider>
    );
}
export { AccessibilityProvider }