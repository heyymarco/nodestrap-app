// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    ElementProps,
    Element,
}                           from './nodestrap'  // nodestrap's core



// react components:

export interface CarouselItemProps<TElement extends HTMLElement = HTMLDivElement>
    extends
        ElementProps<TElement>
{
}
export default function CarouselItem<TElement extends HTMLElement = HTMLDivElement>(props: CarouselItemProps<TElement>) {
    // jsx:
    return (
        <Element<TElement>
            // other props:
            {...props}


            // essentials:
            tag={props.tag ?? 'div'}


            // classes:
            mainClass={props.mainClass ?? ''}
        />
    );
}
export { CarouselItem }