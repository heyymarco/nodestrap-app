// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import Indicator            from './Indicator'
import ActionControl        from './ActionControl'
import type * as ActCtrls   from './ActionControl'



// react components:

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        ActCtrls.Props<TElement>
{
    // children:
    children? : React.ReactNode
}
export default function ListgroupItem<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    return (
        props.actionCtrl
        ?
        <ActionControl<TElement>
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