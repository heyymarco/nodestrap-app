// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    ActionControlProps,
    ActionControl,
}                           from './ActionControl'



// react components:

export interface NavbarMenuProps<TElement extends HTMLElement = HTMLAnchorElement>
    extends
        ActionControlProps<TElement>
{
}
export default function NavbarMenu<TElement extends HTMLElement = HTMLAnchorElement>(props: NavbarMenuProps<TElement>) {
    // jsx:
    return (
        <ActionControl<TElement>
            // other props:
            {...props}


            // essentials:
            tag={props.tag ?? 'a'}


            // classes:
            mainClass={props.mainClass ?? ''}
        />
    );
}
export { NavbarMenu }