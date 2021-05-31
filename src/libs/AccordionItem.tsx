// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    GenericElement,
}                           from './Element'
import ListgroupItem        from './ListgroupItem'
import type * as ListgroupItems from './ListgroupItem'



// react components:

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        ListgroupItems.Props<TElement>
{
    // accessibility:
    label? : string | React.ReactNode
}
export default function AccordionItem<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    const {
        // accessibility:
        label,


        // children:
        children,
        ...otherProps } = props;
    
    return (<>
        <ListgroupItem
            // behaviors:
            actionCtrl={true}


            // other props:
            {...otherProps}
        >
            { label }
        </ListgroupItem>
        <GenericElement>
            { children }
        </GenericElement>
    </>);
}
AccordionItem.prototype = ListgroupItem.prototype;