// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
}                           from 'jss'          // ts defs support for jss
import CssConfig            from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import {
    cssProps as ecssProps,
    cssDecls as ecssDecls,
}                           from './BasicComponent'
import {
    default  as Button,
    ButtonStylesBuilder,
    cssProps as bcssProps,
}                           from './Button'
import type * as Buttons    from './Button'
import {
    default  as Icon,
    cssDecls as icssDecls,
}                           from './Icon'
import typos                from './typos/index' // configurable typography (texting) defs



// styles:

export class ButtonIconStylesBuilder extends ButtonStylesBuilder {
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



    // states:
    /* -- same as parent -- */



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base
        ] as JssStyle,



        // Icon:
        // fill the entire parent text's height:
        [icssDecls.size]  : [['calc(1em *',
            `var(${ecssDecls.lineHeight},${typos.lineHeight})`,
        ')']],
        // set icon's color as parent's font color:
        [icssDecls.foreg] : 'currentColor',



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
}
export const styles = new ButtonIconStylesBuilder();



// configs:

const cssConfig = new CssConfig(() => {
    // common css values:
    // const initial = 'initial';
    // const unset   = 'unset';
    // const none    = 'none';
    // const inherit = 'inherit';
    // const center  = 'center';
    // const middle  = 'middle';


    return {
        //#region typos
        fontSize          : typos.fontSize,
        fontSizeXs        : typos.fontSizeSm,
        fontSizeXl        : typos.fontSizeLg,
        //#endregion typos

        //#region foreg, backg, borders
        borderRadius      : ecssProps.borderRadius,
        borderRadiusXs    : ecssProps.borderRadiusSm,
        borderRadiusXl    : ecssProps.borderRadiusLg,
        //#endregion foreg, backg, borders

        //#region spacings
        paddingInline     : ecssProps.paddingInline,
        paddingBlock      : ecssProps.paddingBlock,
        paddingInlineXs   : ecssProps.paddingInlineSm,
        paddingBlockXs    : ecssProps.paddingBlockSm,
        paddingInlineXl   : ecssProps.paddingInlineLg,
        paddingBlockXl    : ecssProps.paddingBlockLg,

        
        gapX              : bcssProps.gapX,
        gapY              : bcssProps.gapY,
        gapXXs            : bcssProps.gapXSm,
        gapYXs            : bcssProps.gapYSm,
        gapXXl            : bcssProps.gapXLg,
        gapYXl            : bcssProps.gapYLg,
        //#endregion spacings
    };
}, /*prefix: */'btni');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// react components:

export interface Props
    extends
        Buttons.Props
{
    // appearances:
    icon?: string
}
export default function ButtonIcon(props: Props) {
    // styles:
    const btnIcoStyles  = styles.useStyles();



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
            mainClass={props.mainClass ?? btnIcoStyles.main}
        >
            { icon && <Icon icon={icon} /> }
            { text }
            { children }
        </Button>
    );
}
ButtonIcon.prototype = Button.prototype; // mark as Button compatible