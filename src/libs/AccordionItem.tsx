// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import ListgroupItem        from './ListgroupItem'
import type * as ListgroupItems from './ListgroupItem'



// react components:

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        ListgroupItems.Props<TElement>
{
}
export default function AccordionItem<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    return (
        <ListgroupItem
            // other props:
            {...props}
        />
    );
}