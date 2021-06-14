// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    ComponentProps,
    Component,
}                           from './nodestrap'



// react components:

export interface Props<TElement extends HTMLElement = HTMLDivElement>
    extends
        ComponentProps<TElement>
{
}
export default function CarouselItem<TElement extends HTMLElement = HTMLDivElement>(props: Props<TElement>) {
    // jsx:
    return (
        <Component<TElement>
            // other props:
            {...props}


            // essentials:
            tag={props.tag ?? 'div'}


            // classes:
            mainClass={props.mainClass ?? ''}
        />
    );
}