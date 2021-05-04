// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import Control              from './Control'
import type * as Controls   from './Control'



// react components:

export interface Props<TElement extends HTMLElement = HTMLAnchorElement>
    extends
        Controls.Props<TElement>
{
}
export default function NavbarMenu<TElement extends HTMLElement = HTMLAnchorElement>(props: Props<TElement>) {
    return (
        <Control<TElement>
            // default props:
            tag='a'


            // other props:
            {...props}


            // classes:
            mainClass={props.mainClass ?? ''}
        />
    );
}