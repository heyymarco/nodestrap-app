// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,


    // components:
    CssConfig,
}                           from './nodestrap'   // nodestrap's core
import typos                from './typos/index' // configurable typography (texting) defs
import {
    cssProps as bcssProps,
    cssDecls as bcssDecls,
}                           from './BasicComponent'
import {
    OrientationStyle,
    VariantOrientation,

    BtnType,
    BtnStyle,
    VariantButton,

    ButtonStyles,
    cssProps as btcssProps,
    ButtonProps,
    Button,
}                           from './Button'
import {
    cssProps as icssProps,
    cssDecls as icssDecls,
    Icon,
}                           from './Icon'



// styles:

export class ButtonIconStyles extends ButtonStyles {
    // layouts:
    public /*override*/ layout(): JssStyle { return {
        extend: [
            super.layout(), // copy layout from base
        ] as JssStyle,



        //#region Icon
        // fills the entire parent text's height:
        [icssDecls.size]  : [['calc(1em *',
            `var(${bcssDecls.lineHeight},${typos.lineHeight})`,
        ')']],

        // set icon's color as parent's font color:
        [icssDecls.foreg] : 'currentColor',

        // modify icon's transition:
        [icssDecls.transition] : [
            icssProps.transition,

            ['color'      , '0s'], // no color      transition, follow Button's transition
            ['background' , '0s'], // no background transition, follow Button's transition
        ],
        //#endregion Icon



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
    
    
    
    // variants:
    public /*override*/ sizeOptions(): string[] {
        return ['xs', 'sm', 'lg', 'xl'];
    }
    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}
}
export const buttonIconStyles = new ButtonIconStyles();



// configs:

const cssConfig = new CssConfig(() => {
    return {
        //#region typos
        fontSize          : typos.fontSize,
        fontSizeXs        : typos.fontSizeSm,
        fontSizeSm        : typos.fontSizeSm,
        fontSizeLg        : typos.fontSizeLg,
        fontSizeXl        : typos.fontSizeLg,
        //#endregion typos

        
        
        //#region foreg, backg, borders
        borderRadius      : bcssProps.borderRadius,
        borderRadiusXs    : bcssProps.borderRadiusSm,
        borderRadiusSm    : bcssProps.borderRadiusSm,
        borderRadiusLg    : bcssProps.borderRadiusLg,
        borderRadiusXl    : bcssProps.borderRadiusLg,
        //#endregion foreg, backg, borders

        
        
        //#region spacings
        paddingInline     : bcssProps.paddingInline,
        paddingBlock      : bcssProps.paddingBlock,
        paddingInlineXs   : bcssProps.paddingInlineSm,
        paddingBlockXs    : bcssProps.paddingBlockSm,
        paddingInlineSm   : bcssProps.paddingInlineSm,
        paddingBlockSm    : bcssProps.paddingBlockSm,
        paddingInlineLg   : bcssProps.paddingInlineLg,
        paddingBlockLg    : bcssProps.paddingBlockLg,
        paddingInlineXl   : bcssProps.paddingInlineLg,
        paddingBlockXl    : bcssProps.paddingBlockLg,

        
        
        gapX              : btcssProps.gapX,
        gapY              : btcssProps.gapY,
        gapXXs            : btcssProps.gapXSm,
        gapYXs            : btcssProps.gapYSm,
        gapXSm            : btcssProps.gapXSm,
        gapYSm            : btcssProps.gapYSm,
        gapXLg            : btcssProps.gapXLg,
        gapYLg            : btcssProps.gapYLg,
        gapXXl            : btcssProps.gapXLg,
        gapYXl            : btcssProps.gapYLg,
        //#endregion spacings
    };
}, /*prefix: */'btni');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// react components:

export interface ButtonIconProps
    extends
        ButtonProps
{
    // appearances:
    icon?: string
}
export default function ButtonIcon(props: ButtonIconProps) {
    // styles:
    const styles  = buttonIconStyles.useStyles();



    // rest props:
    const {
        // appearances:
        icon,
    
    
        // accessibility:
        text,


        // children:
        children,
    ...restProps} = props;
    

    
    // jsx:
    return (
        <Button
            // other props:
            {...restProps}


            // classes:
            mainClass={props.mainClass ?? styles.main}
        >
            { icon && <Icon icon={icon} /> }
            { text }
            { children }
        </Button>
    );
}
ButtonIcon.prototype = Button.prototype; // mark as Button compatible
export { ButtonIcon }

export type { OrientationStyle, VariantOrientation }
export type { BtnType, BtnStyle, VariantButton }