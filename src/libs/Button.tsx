// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    ClassList,


    // components:
    CssConfig,
}                           from './nodestrap'   // nodestrap's core
import * as border          from './borders'     // configurable borders & border radiuses defs
import spacers              from './spacers'     // configurable spaces defs
import {
    ActionControlStyles,
    ActionControlProps,
    ActionControl,
}                           from './ActionControl'



// styles:

export class ButtonStyles extends ActionControlStyles {
    // variants:
    public /*override*/ variants(): ClassList { return [
        ...super.variants(), // copy variants from base



        [ 'link' , this.link()  ],
        [ 'ghost', this.ghost() ],
    ]}
    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}

    public /*virtual*/ link(): JssStyle { return {
        extend: [
            this.outlined(), // copy outlined style from base
        ] as JssStyle,



        //#region fully link style without outlined
        '&:not(.outlined)' : {
            // borders:
            border : 'none', // no_border if not outlined



            // backgrounds:
            ...this.toggleOffGradient(), // gradient is not supported because no_border
        },
        //#endregion fully link style without outlined



        //#region link styles
        // typos:
        textDecoration : 'underline',
        lineHeight     : 1,



        // borders:
        borderRadius   : border.radiuses.sm,



        // spacings:
        padding        : spacers.xs,



        // set the active theme as a default theme:
        ...this.themeActive(),

        // no switch active:
        [this.decl(this._activeForegTg)]: 'initial !important',
        [this.decl(this._activeBackgTg)]: 'initial !important',
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
                //#region enable gradient only if hover
                {'&:not(:hover)': {
                    // backgrounds:
                    ...this.toggleOffOutlined(), // gradient is not supported because no_border and not hover
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



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
}
export const buttonStyles = new ButtonStyles();



// configs:

const cssConfig = new CssConfig(() => {
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

export interface ButtonProps
    extends
        ActionControlProps<HTMLButtonElement>,
        
        VariantButton
{
    // actions:
    type?        : BtnType
    
    
    // accessibility:
    label?       : string
    text?        : string


    // children:
    children?    : React.ReactNode
}
export default function Button(props: ButtonProps) {
    // styles:
    const styles     = buttonStyles.useStyles();

    
    
    // variants:
    const variButton = useVariantButton(props);



    // rest props:
    const {
        // essentials:
        tag,


        // actions:
        type,


        // accessibility:
        active,
    ...restProps} = props;
    


    // fn props:
    const tagFn  = tag  ?? 'button';
    const typeFn = type ?? (['button', 'input'].includes(tagFn) ? 'button' : undefined);



    // jsx:
    return (
        <ActionControl<HTMLButtonElement>
            // other props:
            {...restProps}


            // essentials:
            tag={tagFn}


            // accessibility:
            aria-label={props.label}
            press={props.press ?? active}


            // variants:
            mild={props.mild ?? false}


            // classes:
            mainClass={props.mainClass ?? styles.main}
            variantClasses={[...(props.variantClasses ?? []),
                variButton.class,
            ]}


            // Button props:
            {...{
                // actions:
                type    : typeFn,
            }}
        >
            { props.text }
            { props.children }
        </ActionControl>
    );
}
export { Button }