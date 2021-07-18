// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    ChkStyle,
    VariantCheck,

    CheckProps,
    Check,
}                           from './Check'



// react components:

export interface Props
    extends
        CheckProps
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
export { Radio }

export type { ChkStyle, VariantCheck }