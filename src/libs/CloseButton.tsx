// react (builds html using javascript):
import React                 from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import ButtonIcon            from './ButtonIcon'
import type * as ButtonIcons from './ButtonIcon'



// react components:

export interface Props
    extends
        ButtonIcons.Props
{
}
export default function CloseButton(props: Props) {
    return (
        <ButtonIcon
            // arias:
            aria-label='Close'


            // appearances:
            icon='close'


            // themes:
            btnStyle='link'
            theme='secondary'


            // other props:
            {...props}
        />
    );
}