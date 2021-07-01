// react (builds html using javascript):
import React                 from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    OrientationStyle,
    VariantOrientation,

    BtnType,
    BtnStyle,
    VariantButton,

    ButtonIconProps,
    ButtonIcon,
}                           from './ButtonIcon'



// react components:

export interface CloseButtonProps
    extends
        ButtonIconProps
{
}
export default function CloseButton(props: CloseButtonProps) {
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
export { CloseButton }

export type { OrientationStyle, VariantOrientation }
export type { BtnType, BtnStyle, VariantButton }