// react (builds html using javascript):
import React                 from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import ButtonIcon            from './ButtonIcon'
import type * as ButtonIcons from './ButtonIcon'



// react components:

export interface Props
    extends
        ButtonIcons.ButtonIconProps
{
}
export default function CloseButton(props: Props) {
    // jsx:
    return (
        <ButtonIcon
            // other props:
            {...props}


            // accessibility:
            label={props.label ?? 'Close'}


            // appearances:
            icon={props.icon ?? 'close'}


            // variants:
            btnStyle={props.btnStyle ?? 'link'}
            theme={props.theme ?? 'secondary'}
        />
    );
}
CloseButton.prototype = ButtonIcon.prototype; // mark as ButtonIcon compatible