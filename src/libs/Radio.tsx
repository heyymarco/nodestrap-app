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
        Checks.Props
{
}
export default function Radio(props: Props) {
    return (
        <Check
            // default props:
            type='radio' // default [type]=radio


            // other props:
            {...props}
        />
    );
}