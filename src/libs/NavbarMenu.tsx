// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import Control              from './Control'
import type * as Controls   from './Control'



// react components:

export interface Props<TElement extends HTMLElement = HTMLAnchorElement>
    extends
        Controls.ControlProps<TElement>
{
}
export default function NavbarMenu<TElement extends HTMLElement = HTMLAnchorElement>(props: Props<TElement>) {
    // jsx:
    return (
        <Control<TElement>
            // other props:
            {...props}


            // essentials:
            tag={props.tag ?? 'a'}


            // classes:
            mainClass={props.mainClass ?? ''}
        />
    );
}