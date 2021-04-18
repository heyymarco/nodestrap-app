// react (builds html using javascript):
import React                 from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):

// nodestrap (modular web components):
import ButtonIcon            from './ButtonIcon'
import type * as ButtonIcons from './ButtonIcon'



// react components:

export interface Props
    extends
        ButtonIcons.Props
{
}
export default function TogglerButton(props: Props) {
    return (
        <ButtonIcon
            // default props:
            aria-label='Toggle navigation'
            icon='close'


            // other props:
            {...props}
        />
    );
}