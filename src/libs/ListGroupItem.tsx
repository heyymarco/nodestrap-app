// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import Indicator            from './Indicator'
import type * as Indicators from './Indicator'
import Control              from './Control'
import type * as Controls   from './Control'



// react components:

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        Controls.Props<TElement>
{
    // children:
    children? : React.ReactNode
}
export default function ListGroupItem<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    return (
        props.actionCtrl
        ?
        <Control<TElement>
            // other props:
            {...props}


            // classes:
            mainClass={props.mainClass ?? 'actionCtrl'}
        />
        :
        <Indicator<TElement>
            // other props:
            {...props}


            // classes:
            mainClass={props.mainClass ?? ''}
        />
    );
}