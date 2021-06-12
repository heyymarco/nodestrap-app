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
    // accessibility:
    // change default value to `true`
    /**
     * `undefined` : same as `true`.  
     * `true`      : inherits `active` from `Listgroup`.  
     * `false`     : independent `active`.
     */
    inheritActive? : boolean


    // children:
    children?      : React.ReactNode
}
export default function ListgroupItem<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    // jsx:
    return (
        props.actionCtrl
        ?
        <ActionControl<TElement>
            // other props:
            {...props}


            // accessibility:
            inheritActive={props.inheritActive ?? true} // change default value to `true`


            // classes:
            mainClass={props.mainClass ?? ''}
            classes={[...(props.classes ?? []),
                'actionCtrl',
            ]}
        />
        :
        <Indicator<TElement>
            // other props:
            {...props}


            // accessibility:
            inheritActive={props.inheritActive ?? true} // change default value to `true`


            // classes:
            mainClass={props.mainClass ?? ''}
        />
    );
}