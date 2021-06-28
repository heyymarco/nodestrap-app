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
import * as border          from './borders'     // configurable borders & border radiuses defs
import spacers              from './spacers'     // configurable spaces defs
import {
    ControlStyles,
}                           from './Control'
import {
    ActionControlStyles,
    ActionControlProps,
    ActionControl,
}                           from './ActionControl'



// styles:

class GhostStyles extends ControlStyles {
    // variants:
    public /*override*/ themes()                     : ClassList { return [] } // disabled
    public /*override*/ sizes()                      : ClassList { return [] } // disabled
    public /*override*/ noGradient(inherit = false)  : JssStyle  { return {} } // disabled
    public /*override*/ gradient()                   : JssStyle  { return {} } // disabled
    public /*override*/ noOutlined(inherit = false)  : JssStyle  { return {
        // borders:
        border : 'none', // no_border if not outlined
    }}
    public /*override*/ outlined()                   : JssStyle  { return {} } // disabled
    public /*override*/ noMild(inherit = false)      : JssStyle  { return {} } // disabled
    public /*override*/ mild()                       : JssStyle  { return {} } // disabled



    // states:
    public /*override*/ themeDefault(theme: string|null): JssStyle { return {} } // disabled

    public /*override*/ enabled()     : JssStyle { return {} } // disabled
    public /*override*/ enabling()    : JssStyle { return {} } // disabled
    public /*override*/ disabling()   : JssStyle { return {} } // disabled
    public /*override*/ disabled()    : JssStyle { return {} } // disabled

    public /*override*/ actived()     : JssStyle { return {} } // disabled
    public /*override*/ activating()  : JssStyle { return {} } // disabled
    public /*override*/ passivating() : JssStyle { return {} } // disabled
    public /*override*/ passived()    : JssStyle { return {} } // disabled

    public /*override*/ focused()     : JssStyle { return {} } // disabled
    public /*override*/ focusing()    : JssStyle { return {} } // disabled
    public /*override*/ blurring()    : JssStyle { return {} } // disabled
    public /*override*/ blurred()     : JssStyle { return {} } // disabled

    public /*override*/ arrived()     : JssStyle {
        return this.arrive();
    }
    public /*override*/ arriving()    : JssStyle {
        return this.arrive();
    }
    public /*override*/ arrive()      : JssStyle { return {
        opacity: cssProps.ghostOpacityHover,
    }}
    public /*override*/ leaving()     : JssStyle { return {} } // disabled
    public /*override*/ left()        : JssStyle { return {
        extend: [
            super.noGradient(),
        ] as JssStyle,
    }}



    // functions:
    public /*override*/ propsFn(): PropList { return {} } // disabled



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.outlined(),
        ] as JssStyle,



        // borders:
        boxShadow : 'none !important', // no focus animation



        // no switch active:
        [this.decl(this._activeForegTg)]: 'initial !important',
        [this.decl(this._activeBackgTg)]: 'initial !important',



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'ghost')), // apply *general* cssProps starting with ghost***
    }}
}

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
            this.outlined(),
        ] as JssStyle,



        //#region fully link style without outlined
        '&:not(.outlined)' : {
            // borders:
            border : 'none', // no_border if not outlined



            // backgrounds:
            extend: [
                super.noGradient(), // gradient is not supported because no_border
            ] as JssStyle,
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
    public /*virtual*/ ghost(): JssStyle {
        const ghostStyles = new GhostStyles();

        return {
            extend: [
                // watch variant classes:
                ghostStyles.useVariants(),
                        
                // watch state classes/pseudo-classes:
                ghostStyles.useStates(),

                // after watching => use func props:
                ghostStyles.usePropsFn(),

                // all the required stuff has been loaded,
                // now load the basicStyle:
                ghostStyles.basicStyle(),
            ] as JssStyle,
        };
    }
    public /*virtual*/ ghostX(): JssStyle { return {
        extend: [
            this.outlined(),



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
                    ...this.noOutlined(), // gradient is not supported because no_border and not hover
                }},
                //#endregion enable gradient only if hover
            ] as JssStyle,



            // borders:
            border : 'none', // no_border if not outlined
        },
        //#endregion fully ghost style without outlined



        // borders:
        boxShadow : 'none !important', // no focus animation



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
    new GhostStyles().useStyles();
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