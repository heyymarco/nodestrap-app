// react (builds html using javascript):
import {
    default as React,
    createContext,
    useContext,
}                          from 'react'             // base technology of our nodestrap components



// contexts:

export interface TAccessibility<TDefaultEnabled = boolean, TDefaultActive = boolean> {
    enabled  : boolean|TDefaultEnabled
    active   : boolean|TDefaultActive
}

/**
 * Contains accessibility props.
 */
export interface Accessibility extends TAccessibility {
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
export function usePropAccessibility<TDefaultEnabled = boolean, TDefaultActive = boolean>(props: Props, defaultEnabled: boolean|TDefaultEnabled = true, defaultActive: boolean|TDefaultActive = false): Accessibility|TAccessibility<TDefaultEnabled, TDefaultActive> {
    // contexts:
    const accessContext = useContext(Context);



    return {
        enabled: (
            (!(props.inheritEnabled ?? true) || accessContext.enabled) // if parent is enabled => current component *can be* enabled, otherwise disabled
            &&
            (props.enabled ?? defaultEnabled) // if [enabled] was not specified => the default value is [enabled=defaultEnabled] (enabled)
        ),
        active: (
            ((props.inheritActive ?? false) && accessContext.active) // if parent is active => current component *is always* active, otherwise can be actived
            ||
            (props.active ?? defaultActive) // if [active] was not specified => the default value is [active=defaultActive]
        ),
    };
}

export function usePropEnabled<TDefaultEnabled = boolean>(props: Props, defaultEnabled: boolean|TDefaultEnabled = true): boolean|TDefaultEnabled {
    // contexts:
    const accessContext = useContext(Context);



    return (
        (!(props.inheritEnabled ?? true) || accessContext.enabled) // if parent is enabled => current component *can be* enabled, otherwise disabled
        &&
        (props.enabled ?? defaultEnabled) // if [enabled] was not specified => the default value is [enabled=defaultEnabled] (enabled)
    );
}

export function usePropActive<TDefaultActive = boolean>(props: Props, defaultActive: boolean|TDefaultActive = false): boolean|TDefaultActive {
    // contexts:
    const accessContext = useContext(Context);



    return (
        ((props.inheritActive ?? false) && accessContext.active) // if parent is active => current component *is always* active, otherwise can be actived
        ||
        (props.active ?? defaultActive) // if [active] was not specified => the default value is [active=defaultActive]
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
    enabled?        : boolean

    /**
     * `undefined` : same as `true`.  
     * `true`      : inherits `enabled` from parent (`AccessibilityProvider` context).  
     * `false`     : independent `enabled`.
     */
    inheritEnabled? : boolean

    
    
    /**
     * `undefined` : same as `false`.  
     * `true`      : component is in active state.  
     * `false`     : component is in normal state.
     */
    active?         : boolean

    /**
     * `undefined` : same as `false`.  
     * `true`      : inherits `active` from parent (`AccessibilityProvider` context).  
     * `false`     : independent `active`.
     */
    inheritActive?  : boolean



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