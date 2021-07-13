// react (builds html using javascript):
import {
    default as React,
    createContext,
    useContext,
}                           from 'react'             // base technology of our nodestrap components



// defaults:
const _defaultEnabled         = true;
const _defaultReadonly        = false;
const _defaultActive          = false;

const _defaultInheritEnabled  = true;
const _defaultInheritReadonly = true;
const _defaultInheritActive   = false;



// contexts:

export interface TAccessibility<TDefaultEnabled = boolean, TDefaultReadonly = boolean, TDefaultActive = boolean> {
    enabled  : boolean|TDefaultEnabled
    readonly : boolean|TDefaultReadonly
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
     * `true`      : component is readonly - ignores any user editing.  
     * `false`     : component is editable - responses any user editing.
     */
    readonly : boolean

    /**
     * `true`      : component is in active state.  
     * `false`     : component is in normal state.
     */
    active   : boolean
}

/**
 * A react context for accessibility stuff.
 */
export const Context = createContext<Accessibility>(/*defaultValue :*/{
    enabled  : _defaultEnabled,
    readonly : _defaultReadonly,
    active   : _defaultActive,
});
Context.displayName  = 'Accessibility';



// hooks:
export function usePropAccessibility<TDefaultEnabled = boolean, TDefaultReadonly = boolean, TDefaultActive = boolean>(props: AccessibilityProps, defaultEnabled: boolean|TDefaultEnabled = _defaultEnabled, defaultReadonly: boolean|TDefaultReadonly = _defaultReadonly, defaultActive: boolean|TDefaultActive = _defaultActive): Accessibility|TAccessibility<TDefaultEnabled, TDefaultReadonly, TDefaultActive> {
    // contexts:
    const accessContext = useContext(Context);



    return {
        enabled: (
            (
                (props.inheritEnabled ?? _defaultInheritEnabled)
                ?
                accessContext.enabled  // inherit
                :
                true                   // independent
            )
            &&
            (props.enabled ?? defaultEnabled)
        ),
        readonly: (
            (
                (props.inheritReadonly ?? _defaultInheritReadonly)
                ?
                accessContext.readonly // inherit
                :
                false                  // independent
            )
            ||
            (props.readonly ?? defaultReadonly)
        ),
        active: (
            (
                (props.inheritActive ?? _defaultInheritActive)
                ?
                accessContext.active   // inherit
                :
                false                  // independent
            )
            ||
            (props.active ?? defaultActive)
        ),
    };
}

export function usePropEnabled<TDefaultEnabled = boolean>(props: AccessibilityProps, defaultEnabled: boolean|TDefaultEnabled = _defaultEnabled): boolean|TDefaultEnabled {
    // contexts:
    const accessContext = useContext(Context);



    return (
        (
            (props.inheritEnabled ?? _defaultInheritEnabled)
            ?
            accessContext.enabled  // inherit
            :
            true                   // independent
        )
        &&
        (props.enabled ?? defaultEnabled)
    );
}

export function usePropActive<TDefaultActive = boolean>(props: AccessibilityProps, defaultActive: boolean|TDefaultActive = _defaultActive): boolean|TDefaultActive {
    // contexts:
    const accessContext = useContext(Context);



    return (
        (
            (props.inheritActive ?? _defaultInheritActive)
            ?
            accessContext.active   // inherit
            :
            false                  // independent
        )
        ||
        (props.active ?? defaultActive)
    );
}



// react components:

export interface AccessibilityProps
{
    /**
     * `undefined` : same as `true`.  
     * `true`      : component is enabled  - responses any user interaction.  
     * `false`     : component is disabled - ignores any user interaction.
     */
    enabled?         : boolean

    /**
     * `undefined` : same as `true`.  
     * `true`      : inherits `enabled` from parent (`AccessibilityProvider` context).  
     * `false`     : independent `enabled`.
     */
    inheritEnabled?  : boolean



    /**
     * `undefined` : same as `false`.  
     * `true`      : component is readonly - ignores any user editing.  
     * `false`     : component is editable - responses any user editing.
     */
    readonly?        : boolean

    /**
     * `undefined` : same as `true`.  
     * `true`      : inherits `readonly` from parent (`AccessibilityProvider` context).  
     * `false`     : independent `readonly`.
     */
    inheritReadonly? : boolean

    
    
    /**
     * `undefined` : same as `false`.  
     * `true`      : component is in active state.  
     * `false`     : component is in normal state.
     */
    active?          : boolean

    /**
     * `undefined` : same as `false`.  
     * `true`      : inherits `active` from parent (`AccessibilityProvider` context).  
     * `false`     : independent `active`.
     */
    inheritActive?   : boolean



    // children:
    children?        : React.ReactNode
}
export default function AccessibilityProvider(props: AccessibilityProps) {
    return (
        <Context.Provider value={{
            enabled  : props.enabled  ?? _defaultEnabled,
            readonly : props.readonly ?? _defaultReadonly,
            active   : props.active   ?? _defaultActive,
        }}>
            {props.children}
        </Context.Provider>
    );
}
export { AccessibilityProvider }