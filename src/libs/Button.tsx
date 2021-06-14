// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
}                           from 'jss'          // ts defs support for jss
import CssConfig            from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import * as border          from './borders'     // configurable borders & border radiuses defs
import spacers              from './spacers'     // configurable spaces defs
import type {
    ClassList,
}                           from './Element'
import {
    default  as Control,
    ControlStylesBuilder,
}                           from './Control'
import type * as Controls   from './Control'



// styles:

export class ButtonStylesBuilder extends ControlStylesBuilder {
    // variants:
    public /*override*/ variants(): ClassList { return [
        ...super.variants(), // copy variants from base



        [ 'link' , this.link()  ],
        [ 'ghost', this.ghost() ],
    ]}
    public /*override*/ size(size: string, Size: string): JssStyle { return {
        extend: [
            super.size(size, Size), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, Size)),
    }}
    protected /*virtual*/ staticOutlinedStyle(): JssStyle { return {
        '&:not(.outlined)' : {
            extend: [
                //#region disable dynamic outlined
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
                //#endregion disable dynamic outlined
            ] as JssStyle,
        },
    }}
    public /*virtual*/ link(): JssStyle { return {
        extend: [
            this.outlined(), // copy outlined style from base
        ] as JssStyle,



        //#region fully link style without outlined
        '&:not(.outlined)' : {
            extend: [
                this.staticOutlinedStyle(), // disable dynamic outlined
            ] as JssStyle,



            // borders:
            borderWidth  : 0, // hides the border if not outlined



            // backgrounds:
            [this.decl(this._backgGradTg)] : 'initial', // gradient is not supported if not outlined
        },
        //#endregion fully link style without outlined



        //#region link styles
        // typos:
        textDecoration : 'underline',
        lineHeight     : 1,



        // spacings:
        padding        : spacers.xs,



        // borders:
        borderRadius   : border.radiuses.sm,



        // re-define a default theme:
        ...this.themeDefault('primary'),
        //#endregion link styles



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'link')), // apply *general* cssProps starting with link***
    }}
    public /*virtual*/ ghost(): JssStyle { return {
        extend: [
            this.outlined(), // copy outlined style from base



            //#region fully opaque if enable & hover
            this.stateNotDisable({extend: [
                this.stateHover({
                    opacity: cssProps.ghostOpacityHover,
                }),
            ] as JssStyle}),
            //#endregion fully opaque if enable & hover
        ] as JssStyle,



        //#region fully ghost style without outlined
        '&:not(.outlined)' : {
            extend: [
                this.staticOutlinedStyle(), // disable dynamic outlined



                //#region enable gradient only if hover
                {'&:not(:hover)': {
                    // backgrounds:
                    [this.decl(this._backgGradTg)] : 'initial', // gradient is not supported if not outlined and not hover
                }},
                //#endregion enable gradient only if hover
            ] as JssStyle,



            // borders:
            borderWidth  : 0, // hides the border if not outlined
        },
        //#endregion fully ghost style without outlined



        // borders:
        boxShadow : [['none'], '!important'], // no focus animation



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'ghost')), // apply *general* cssProps starting with ghost***
    }}



    // states:
    /* -- same as parent -- */



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base
        ] as JssStyle,



        // layout:
        display        : 'inline-flex',        // use flexbox as the layout
        flexDirection  : cssProps.orientation, // customizable orientation
        justifyContent : 'center',             // center items horizontally
        alignItems     : 'center',             // center items vertically

        

        // positions:
        verticalAlign  : 'baseline', // button's text should be aligned with sibling text, so the button behave like <span> wrapper



        // sizes:
        /* -- auto size depends on the text's/content's size -- */
        boxSizing      : 'content-box', // the final size is excluding borders & paddings



        // typos:
        textAlign      : 'center',



        // accessibility:
        userSelect     : 'none', // disable selecting button's text



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
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

        //#region spacings
        gapX        : spacers.sm,
        gapY        : spacers.sm,
        gapXSm      : spacers.xs,
        gapYSm      : spacers.xs,
        gapXLg      : spacers.md,
        gapYLg      : spacers.md,
        //#endregion spacings



        ghostOpacity      : 0.5,
        ghostOpacityHover : 1,
    };
}, /*prefix: */'btn');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// hooks:

export type BtnStyle = 'link'|'ghost' // might be added more styles in the future
export interface VariantButton {
    btnStyle?: BtnStyle
}
export function useVariantButton(props: VariantButton) {
    return {
        class: props.btnStyle ? props.btnStyle : null,
    };
}



// react components:

export type BtnType = 'button'|'submit'|'reset'

export interface Props
    extends
        Controls.Props<HTMLButtonElement>,
        VariantButton
{
    // actions:
    type?        : BtnType
    onClick?     : React.MouseEventHandler<HTMLButtonElement>
    
    
    // accessibility:
    label?       : string
    text?        : string


    // children:
    children?    : React.ReactNode
}
export default function Button(props: Props) {
    // styles:
    const btnStyles  = styles.useStyles();

    
    
    // variants:
    const variButton = useVariantButton(props);



    // rest props:
    const {
        // essentials:
        tag,


        // actions:
        type,
    ...restProps} = props;
    


    // fn props:
    const tagFn  = tag  ?? 'button';
    const typeFn = type ?? (['button', 'input'].includes(tagFn) ? 'button' : undefined);



    // jsx:
    return (
        <Control<HTMLButtonElement>
            // other props:
            {...restProps}


            // essentials:
            tag={tagFn}


            // accessibility:
            aria-label={props.label}


            // classes:
            mainClass={props.mainClass ?? btnStyles.main}
            variantClasses={[...(props.variantClasses ?? []),
                variButton.class,
            ]}


            // Button props:
            {...{
                // actions:
                type    : typeFn,
                onClick : props.onClick,
            }}
        >
            { props.text }
            { props.children }
        </Control>
    );
}