// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import { GenericElement }   from './Element'
import type * as Elements   from './Element'



// react components:

export interface Props<TElement extends HTMLElement = HTMLDivElement>
    extends
        Elements.GenericProps<TElement>
{
}
export default function CarouselItem<TElement extends HTMLElement = HTMLDivElement>(props: Props<TElement>) {
    // jsx:
    return (
        <GenericElement<TElement>
            // other props:
            {...props}


            // essentials:
            tag={props.tag ?? 'div'}


            // classes:
            mainClass={props.mainClass ?? ''}
        />
    );
}