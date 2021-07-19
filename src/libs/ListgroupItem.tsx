// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import Indicator            from './Indicator'
import {
    ActionControlProps,
    ActionControl,
}                           from './ActionControl'



// react components:

export interface ListgroupItemProps<TElement extends HTMLElement = HTMLElement>
    extends
        ActionControlProps<TElement>
{
    // accessibility:
    // change default value to `true`
    /**
     * `undefined` : same as `true`.  
     * `true`      : inherits `active` from `Listgroup`.  
     * `false`     : independent `active`.
     */
    inheritActive? : boolean


    // behaviors:
    actionCtrl?    : boolean


    // children:
    children?      : React.ReactNode
}
export default function ListgroupItem<TElement extends HTMLElement = HTMLElement>(props: ListgroupItemProps<TElement>) {
    // jsx:
    return (
        props.actionCtrl
        ?
        <ActionControl<TElement>
            // other props:
            {...props}


            // accessibility:
            inheritActive={props.inheritActive ?? true} // change default value to `true`


            // variants:
            mild={props.mild ?? false}


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


            // variants:
            mild={props.mild ?? false}


            // classes:
            mainClass={props.mainClass ?? ''}
        />
    );
}
export { ListgroupItem }