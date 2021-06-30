// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    ClassList,
    PropList,


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

    BtnStyle,
    VariantButton,

    ButtonStyles,
    cssProps as btcssProps,
    ButtonProps,
    Button,
}                           from './Button'
import {
    cssDecls as icssDecls,
    Icon,
}                           from './Icon'



// styles:

export class ButtonIconStyles extends ButtonStyles {
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



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base
        ] as JssStyle,



        // Icon:
        // fill the entire parent text's height:
        [icssDecls.size]  : [['calc(1em *',
            `var(${bcssDecls.lineHeight},${typos.lineHeight})`,
        ')']],
        // set icon's color as parent's font color:
        [icssDecls.foreg] : 'currentColor',



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
}
export const buttonIconStyles = new ButtonIconStyles();



// configs:

const cssConfig = new CssConfig(() => {
    return {
        //#region typos
        fontSize          : typos.fontSize,
        fontSizeXs        : typos.fontSizeSm,
        fontSizeXl        : typos.fontSizeLg,
        //#endregion typos

        
        
        //#region foreg, backg, borders
        borderRadius      : bcssProps.borderRadius,
        borderRadiusXs    : bcssProps.borderRadiusSm,
        borderRadiusXl    : bcssProps.borderRadiusLg,
        //#endregion foreg, backg, borders

        
        
        //#region spacings
        paddingInline     : bcssProps.paddingInline,
        paddingBlock      : bcssProps.paddingBlock,
        paddingInlineXs   : bcssProps.paddingInlineSm,
        paddingBlockXs    : bcssProps.paddingBlockSm,
        paddingInlineXl   : bcssProps.paddingInlineLg,
        paddingBlockXl    : bcssProps.paddingBlockLg,

        
        
        gapX              : btcssProps.gapX,
        gapY              : btcssProps.gapY,
        gapXXs            : btcssProps.gapXSm,
        gapYXs            : btcssProps.gapYSm,
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
export type { BtnStyle, VariantButton }