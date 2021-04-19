// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
}                           from 'jss'          // ts defs support for jss

// nodestrap (modular web components):
import {
    cssDecls as ecssDecls,
}                           from './Element'
import {
    default  as Button,
    ButtonStylesBuilder,
}                           from './Button'
import type * as Buttons    from './Button'
import {
    default  as Icon,
    cssDecls as icssDecls,
}                           from './Icon'
import typos               from './typos/index' // configurable typography (texting) defs



// styles:

export class ButtonIconStylesBuilder extends ButtonStylesBuilder {
    // themes:
    /* -- same as parent -- */



    // states:
    /* -- same as parent -- */



    // styles:
    public basicStyle(): JssStyle { return {
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
    }}
}
export const styles = new ButtonIconStylesBuilder();



// react components:

export interface Props
    extends
        Buttons.Props
{
    // appearance:
    icon?: string
}
export default function ButtonIcon(props: Props) {
    const btnIcoStyles  = styles.useStyles();



    const {
        // appearance:
        icon,


        // children:
        text,
        children,
        ...otherProps } = props;
    
    return (
        <Button
            // other props:
            {...otherProps}


            // main:
            mainClass={props.mainClass ?? btnIcoStyles.main}
        >
            { icon && <Icon icon={icon} /> }
            { text }
            { children }
        </Button>
    );
}