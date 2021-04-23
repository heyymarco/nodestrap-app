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
}                           from './CssConfig'   // ts defs support for jss

// nodestrap (modular web components):
import colors               from './colors'     // configurable colors & theming defs
import * as border          from './borders'     // configurable borders & border radiuses defs
import spacers              from './spacers'     // configurable spaces defs
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



        // overwrite the global props ending with **{Size}:

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
        justifyContent : 'center', // center items horizontally
        alignItems     : 'center', // center items vertically

        
        // positions:
        verticalAlign  : 'baseline', // button's text should be aligned with sibling text, so the button behave like <span> wrapper


        // sizes:
        /* -- auto size depends on the text/content's size -- */
        boxSizing      : 'content-box', // the final size is excluding borders & paddings


        // typos:
        textAlign      : 'center',


        // accessibility:
        userSelect     : 'none', // disable selecting button's text
    }}
    public linkStyle(): JssStyle { return {
        extend: this.outlined(), // copy outlined style from base



        '&:not(.outlined)' : {
            extend: [
                this.stateActive( // [activating, actived]
                    // always *toggle on* the outlined props:
                    this.toggleOnOutlined(),
                ),
                this.stateNotDisable({extend: [
                    this.stateHover(
                        // always *toggle on* the outlined props:
                        this.toggleOnOutlined(),
                    ),
                    this.stateFocus(
                        // always *toggle on* the outlined props:
                        this.toggleOnOutlined(),
                    ),
                ] as JssStyle}),
            ] as JssStyle,


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
        [this.decl(this._foregIf)]          : colors.primaryText,
        [this.decl(this._backgIf)]          : this.solidBackg(colors.primary),
        [this.decl(this._borderIf)]         : colors.primaryCont,
        [this.decl(this._outlinedForegIf)]  : colors.primary,
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
        Controls.Props<HTMLButtonElement>,
        VariantButton
{
    // actions:
    onClick?     : React.MouseEventHandler<HTMLButtonElement>


    // children:
    text?        : string
    children?    : React.ReactNode
}
export default function Button(props: Props) {
    const btnStyles  = styles.useStyles();

    // themes:
    const variButton = useVariantButton(props);



    return (
        <Control<HTMLButtonElement>
            // default props:
            tag='button'


            // other props:
            {...props}


            // main:
            mainClass={props.mainClass ?? btnStyles.main}


            // classes:
            classes={[
                // additionals:
                ...(props.classes ?? []),


                // themes:
                variButton.class,
            ]}


            // Button props:
            {...{
                // actions:
                onClick : props.onClick,
                type    : 'button',
            }}
        >
            { props.text }
            { props.children }
        </Control>
    );
}