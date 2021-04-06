// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    GenericElement,
}                           from './Element'
import type * as Elements   from './Element'
import {
    useStateEnableDisable,
    useStateActivePassive,
}                           from './Indicator'
import type * as Indicators from './Indicator'



// react components:

export interface Props
    extends
        Elements.GenericProps,
        Indicators.IndicationProps
{
    // children:
    children? : React.ReactNode
}
export default function ListGroupItem(props: Props) {
    // states:
    const stateEnbDis  = useStateEnableDisable(props);
    const stateActPass = useStateActivePassive(props);



    return (
        <GenericElement
            // other props:
            {...props}


            // classes:
            classes={[
                // additionals:
                ...(props.classes ?? []),


                // states:
                (stateEnbDis.class ?? (stateEnbDis.disabled ? 'disabled' : null)),
                stateActPass.class,
            ]}
        />
    );
}