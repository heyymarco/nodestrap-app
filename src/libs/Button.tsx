// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
    Styles,
}                           from 'jss'          // ts defs support for jss
import CssConfig            from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.
import type {
    DictionaryOf,
}                          from './CssConfig'   // ts defs support for jss

// nodestrap (modular web components):
import colors               from './colors'     // configurable colors & theming defs
import * as border         from './borders'     // configurable borders & border radiuses defs
import spacers             from './spacers'     // configurable spaces defs
import {
    styles as indicatorStyles,
}                           from './Indicator'
import {
    default  as Control,
    ControlStylesBuilder,
}                           from './Control'
import type * as Controls   from './Control'



// styles:

export class ButtonStylesBuilder extends ControlStylesBuilder {
    // themes:
    public sizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {
        extend: super.sizeOf(size, Size, sizeProp), // copy sizes from base



        // overwrite the global props with the *prop{Size}*:

        [cssDecls.gapX] : (cssProps as DictionaryOf<typeof cssProps>)[`gapX${Size}`],
        [cssDecls.gapY] : (cssProps as DictionaryOf<typeof cssProps>)[`gapY${Size}`],
    }}



    // states:
    /* -- same as parent -- */



    // styles:
    public basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(),                // copy basicStyle from base
            this.filterGeneralProps(cssProps), // apply *general* cssProps
        ] as JssStyle,



        // layout:
        display        : 'inline-flex',
        flexDirection  : cssProps.orientation,
        justifyContent : 'center',
        alignItems     : 'center',


        // sizes:
        boxSizing      : 'content-box',


        // typos:
        textAlign      : 'center',
        verticalAlign  : 'baseline', // button's text should aligned with sibling text, so the button behave like <span> wrapper


        // accessibility:
        userSelect     : 'none', // disable selecting button's text
    }}
    public linkStyle(): JssStyle { return {
        // extend: this.outlined(), // copy outlined style from base
        extend: indicatorStyles.outlined(), // copy outlined style from base's base



        '&:not(.outlined)' : {
            borderColor    : 'transparent', // hides the border if not outlined


            [this.decl(this._backgGradTg)] : 'initial', // gradient is not supported if not outlined
        },



        //#region link styles
        // typos:
        textDecoration : 'underline',
        lineHeight     : 1,


        // borders:
        padding        : spacers.xs,
        borderRadius   : border.radiuses.sm,


        // re-define a *default* color theme:
        [this.decl(this._colorIf)]          : colors.primaryText,
        [this.decl(this._backgIf)]          : this.solidBackg(colors.primary),
        [this.decl(this._colorOutlinedIf)]  : colors.primary,
        [this.decl(this._boxShadowFocusIf)] : colors.primaryTransp,
        //#endregion link styles
    }}
    protected styles(): Styles<'main'> {
        const styles = super.styles();
        Object.assign(styles.main, {
            '&.link' : this.linkStyle(),
        });
        return styles;
    }
}
export const styles = new ButtonStylesBuilder();



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
        orientation : 'row',
        whiteSpace  : 'normal',

        gapX        : spacers.sm,
        gapY        : spacers.sm,
        gapXSm      : spacers.xs,
        gapYSm      : spacers.xs,
        gapXLg      : spacers.md,
        gapYLg      : spacers.md,
    };
}, /*prefix: */'btn');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// hooks:

export type BtnStyle = 'link' // might be added more styles in the future
export interface VariantButton {
    btnStyle?: BtnStyle
}
export function useVariantButton(props: VariantButton) {
    return {
        class: props.btnStyle ? props.btnStyle : null,
    };
}



// react components:

export interface Props
    extends
        Controls.Props,
        VariantButton
{
    // actions:
    onClick?     : React.MouseEventHandler<HTMLButtonElement>


    // labels:
    text?        : string
    children?    : React.ReactNode
}
export default function Button(props: Props) {
    const btnStyles  = styles.useStyles();

    // themes:
    const variButton = useVariantButton(props);



    return (
        <Control
            // default props:
            {...{
                tag : 'button', // default [tag]=button
            }}


            // other props:
            {...props}


            // classes:
            classes={[
                // main:
                (props.classes ? null : btnStyles.main),


                // additionals:
                ...(props.classes ?? []),


                // themes:
                variButton.class,
            ]}


            // Button props:
            {...{
                // actions:
                onClick: props.onClick,
            }}
        >
            { props.text }
            { props.children }
        </Control>
    );
}