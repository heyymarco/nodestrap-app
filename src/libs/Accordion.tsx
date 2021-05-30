// react (builds html using javascript):
import
    React, {
    useEffect,
    useReducer,
}                           from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import Listgroup            from './Listgroup'
import type * as Listgroups from './Listgroup'
import AccordionItem        from './AccordionItem'
import type * as AccordionItems from './AccordionItem'



// react components:

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        Listgroups.Props<TElement>
{
}

export default function Accordion<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {



    const {
        // children:
        children,
        ...otherProps } = props;
    
    return (
        <Listgroup
            // other props:
            {...otherProps}
        >
            { children }
        </Listgroup>
    );
}

type OrientationStyle   = Listgroups.OrientationStyle
type VariantOrientation = Listgroups.VariantOrientation
type ListStyle          = Listgroups.ListStyle
export type { OrientationStyle, VariantOrientation, ListStyle }

export { AccordionItem, AccordionItem as Item }
export type { AccordionItems, AccordionItems as Items }