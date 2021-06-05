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
            // other props:
            {...props}


            // accessibility:
            label={props.label ?? 'Close'}


            // appearances:
            icon={props.icon ?? 'close'}


            // themes:
            btnStyle={props.btnStyle ?? 'link'}
            theme={props.theme ?? 'secondary'}
        />
    );
}