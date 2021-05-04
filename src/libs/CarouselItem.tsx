// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import { GenericElement }   from './Element'
import type * as Elements   from './Element'



// react components:

export interface Props<TElement extends HTMLElement = HTMLAnchorElement>
    extends
        Elements.GenericProps<TElement>
{
}
export default function CarouselItem<TElement extends HTMLElement = HTMLAnchorElement>(props: Props<TElement>) {
    return (
        <GenericElement<TElement>
            // default props:
            tag='div'


            // other props:
            {...props}


            // classes:
            mainClass={props.mainClass ?? ''}
        />
    );
}