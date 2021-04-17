// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
    Styles,
}                           from 'jss'          // ts defs support for jss
import {
    PropEx,
    Cust,
}                           from './Css'        // ts defs support for jss
import CssConfig            from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.
import type {
    DictionaryOf,
}                           from './CssConfig'  // ts defs support for jss

// nodestrap (modular web components):
import * as stripOuts       from './strip-outs'
import colors               from './colors'     // configurable colors & theming defs
import spacers              from './spacers'    // configurable spaces defs
import {
    cssProps as ecssProps,
}                           from './Element'
import {
    cssProps as contCssProps,
}                           from './Container'
import {
    cssProps as icssProps,
    styles as indicatorStyles,
}                           from './Indicator'
import {
    default  as Control,
    ControlStylesBuilder,
    cssProps as ccssProps,
}                           from './Control'
import type * as Controls   from './Control'
import NavbarMenu           from './NavbarMenu'



// styles:

const menusElm = '& .menus';
const menuElm  = '& >*';

export class NavbarStylesBuilder extends ControlStylesBuilder {
    // themes:
    protected themesIf(): JssStyle { return {
        extend: [
            // @ts-ignore
            indicatorStyles.themesIf(), // copy themes from Indicator
        ] as JssStyle,



        // define a *default* color theme:
        [this.decl(this._boxShadowFocusIf)]    : colors.secondaryTransp,

        // define an *active* color theme:
        [this.decl(this._boxShadowFocusIfAct)] : colors.secondaryTransp,
    }}



    // states:
    protected states(inherit = false): JssStyle { return {
        extend: [
            super.states(inherit), // copy states from base



            //#region specific states
            //#region focus
            this.stateNotDisable({extend: [
                this.stateFocusBlurring({
                    zIndex: 1,
                }),
            ] as JssStyle}),
            //#endregion focus
            //#endregion specific states
        ] as JssStyle,
    }}



    // styles:
    public basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(),
            this.filterGeneralProps(cssProps), // apply *general* cssProps
        ] as JssStyle,



        // layout:
        display             : 'grid',   // use css grid for layouting, so we can customize the area later.
        gridTemplateRows    : [['auto']],
        gridTemplateColumns : [['fit-content', 'auto', 'fit-content']],
        gridTemplateAreas   : [[
            '"logo menus toggler"',
        ]],
        justifyItems        : 'center', // align horizontally
        alignItems          : 'center', // align vertically



        // accessibility:
        cursor: 'initial',



        // children:
        [menusElm]: {
            // layout:
            gridArea       : 'menus',
            display        : 'flex',
            flexDirection  : 'row',
            justifyContent : 'start',   // child items placed starting from the begining
            alignItems     : 'stretch', // child items height are 100% of the parent



            [menuElm]: { // main child elements
                extend: [
                    super.basicStyle(),

                    this.filterPrefixProps(cssProps, 'menu'), // apply cssProps starting with backg***

                    // this.toggleOnOutlined(),
                ] as JssStyle,
    
    
    
                // layout:
                display    : 'inline-flex',
                alignItems : 'center', // if the height is stretched, place text at the center



                // typos:
                fontSize       : ecssProps.fontSize,
                fontFamily     : undefined,
                fontWeight     : undefined,
                fontStyle      : undefined,
                textDecoration : undefined,
                lineHeight     : undefined,



                // borders:
                border         : undefined,
                borderRadius   : undefined,
            } as JssStyle, // menu items
        } as JssStyle, // menus
    }}
    protected styles(): Styles<'main'> {
        return {
            main: {
                extend: [
                    this.basicStyle(), // basic style
        
                    // watch theme classes:
                    this.watchThemes(),
                    {
                        '&.outlined': {
                            // children:
                            [menusElm]: {
                                [menuElm]: {
                                    extend: [
                                        this.outlined(),
                                    ] as JssStyle,
                                } as JssStyle, // menu items
                            } as JssStyle, // menus
                        } as JssStyle,
                    } as JssStyle,

                    // watch indication state classes/pseudo-classes:
                    this.indicationThemesIf(),
                    this.indicationStates(),
                    this.applySupressManualActive(),

                    // after watching => use func props:
                    this.fnProps(),           // for themes
                    this.indicationFnProps(), // overwrite animFn only for indication
                ] as JssStyle,



                [menusElm]: {
                    [menuElm]: {
                        extend: [
                            // watch theme classes:
                            this.watchThemes(), // always inherit
        
                            // watch state classes/pseudo-classes:
                            this.watchStates(/*inherit =*/false),

                            // force inherit for enable/disable state props:
                            {
                                [this.decl(this._filterEnableDisable)] : 'inherit',
                                [this.decl(this._animEnableDisable)]   : 'inherit',
                            },

                            // after watching => use func props:
                            this.fnProps(),
                        ] as JssStyle,
                    } as JssStyle, // menu items
                } as JssStyle, // menus
            },
        };
    }
}
export const styles = new NavbarStylesBuilder();



// configs:

const cssConfig = new CssConfig(() => {
    // common css values:
    // const initial = 'initial';
    // const unset   = 'unset';
    const none    = 'none';
    // const inherit = 'inherit';
    // const center  = 'center';
    // const middle  = 'middle';


    return {
        paddingInline        : contCssProps.paddingInline, // override to Element
        paddingBlock         : 0,
        border               : none,
        borderRadius         : 0,



        // menu:
        // menuPaddingInline    : ecssProps.paddingInline,
        // menuPaddingBlock     : ecssProps.paddingBlock,
    };
}, /*prefix: */'navb');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// react components:

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        Controls.Props<TElement>
{
    // children:
    children? : React.ReactNode
}
export default function Navbar<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    const navbStyles = styles.useStyles();

    
    
    return (
        <Control<TElement>
            // default props:
            tag='nav'
            actionCtrl={false}
            tabIndex={-1}


            // other props:
            {...props}


            // main:
            mainClass={props.mainClass ?? navbStyles.main}
        >
            <div className='menus'>{
                props.children && (Array.isArray(props.children) ? props.children : [props.children]).map((child, index) =>
                    (
                        ((child as React.ReactElement).type === NavbarMenu)
                        ?
                        child
                        :
                        <NavbarMenu
                            // events:
                            onAnimationEnd={(e) =>
                                // triggers ListGroup's onAnimationEnd event
                                e.currentTarget.parentElement?.parentElement?.dispatchEvent(new AnimationEvent('animationend', { animationName: e.animationName, bubbles: true }))
                            }
                        >
                            { child }
                        </NavbarMenu>
                    )
                )
            }</div>
        </Control>
    );
}

export { NavbarMenu, NavbarMenu as Menu }