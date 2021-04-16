// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import Indicator            from './Indicator'
import type * as Indicators from './Indicator'



// react components:

export interface Props<TElement extends HTMLElement = HTMLAnchorElement>
    extends
        Indicators.Props<TElement>
{
}
export default function NavbarMenu<TElement extends HTMLElement = HTMLAnchorElement>(props: Props<TElement>) {
    return (
        <Indicator<TElement>
            // default props:
            tag='a'


            // other props:
            {...props}


            // main:
            mainClass='menu'
        />
    );
}