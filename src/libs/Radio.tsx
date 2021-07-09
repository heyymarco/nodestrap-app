// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    default  as Check,
}                           from './Check'
import type * as Checks     from './Check'



// react components:

export interface Props
    extends
        Checks.CheckProps
{
}
export default function Radio(props: Props) {
    // jsx:
    return (
        <Check
            // other props:
            {...props}


            // formats:
            type={props.type ?? 'radio'}
        />
    );
}