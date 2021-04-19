// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
    Styles,
}                           from 'jss'          // ts defs support for jss
import CssConfig            from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import colors               from './colors'     // configurable colors & theming defs
import {
    cssProps as ecssProps,
}                           from './Element'
import {
    cssProps as contCssProps,
}                           from './Container'
import {
    styles as indicatorStyles,
}                           from './Indicator'
import {
    default  as Control,
    ControlStylesBuilder,
}                           from './Control'
import type * as Controls   from './Control'
import NavbarMenu           from './NavbarMenu'
import TogglerMenuButton    from './TogglerMenuButton'



// styles:

const logoElm     = '& .logo';
const togglerElm  = '& .toggler';
const menusElm    = '& .menus';
const menuItemElm = '& .menus>*';

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
        ] as JssStyle,



        // layout:
        display             : 'grid', // use css grid for layouting, so we can customize the desired area later.
        gridTemplateRows    : [['auto'/*fluid height*/]],
        gridTemplateColumns : [['max-content'/*fixed width*/, 'auto'/*fluid width*/, 'max-content'/*fixed width*/]],
        gridTemplateAreas   : [[
            '"logo menus toggler"',
        ]],
        // the grid's size configured as *minimum* size required => no free space left to distribute => so (justify|algin)Content is *not required*
        // default placement for each navbar's sections:
        justifyItems        : 'stretch', // each section fill the entire area's width
        alignItems          : 'stretch', // each section fill the entire area's height (the shorter sections follow the tallest one)



        // accessibility:
        cursor: 'initial',



        // children:
        //#region children
        [logoElm]    : {
            // layout:
            gridArea       : 'logo',



            // customize:
            ...this.filterPrefixProps(cssProps, 'logo'), // apply cssProps starting with logo***
        } as JssStyle,

        [togglerElm] : {
            // layout:
            gridArea       : 'toggler',



            // customize:
            ...this.filterPrefixProps(cssProps, 'toggler'), // apply cssProps starting with toggler***
        } as JssStyle,

        [menusElm]   : {
            // layout:
            gridArea       : 'menus',
            display        : 'flex',    // use flexbox to place the menus sequentially
            flexDirection  : 'row',     // place the menus horizontally
            justifyContent : 'start',   // place the menus from the begining, leave a free space (if any) at the end
            alignItems     : 'stretch', // each menu fill the entire section's height
        } as JssStyle,

        [menuItemElm] : {
            // customize:
            ...this.filterPrefixProps(cssProps, 'menu'), // apply cssProps starting with menu***
        } as JssStyle,

        [[
            logoElm,
            togglerElm,
            menuItemElm,
        ].join(',')]: {
            extend: [
                super.basicStyle(),
                //#region overrides some base's basicStyle
                {
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
                },
                //#endregion overrides some base's basicStyle
            ] as JssStyle,



            // layout:
            display        : 'flex',
            flexDirection  : 'row',    // the flex direction to horz, so we can adjust the content's vertical position
            alignItems     : 'center', // if the content's height is shorter than the section, place it at the center
        } as JssStyle,

        [[
            logoElm,
            togglerElm,
        ].join(',')]: {
            paddingInline : 0,
        } as JssStyle,
        //#endregion children



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
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
                            //#region forwards outlined to menu items
                            // children:
                            [menuItemElm]: {
                                extend: [
                                    this.outlined(),
                                ] as JssStyle,
                            } as JssStyle, // menu items
                            //#endregion forwards outlined to menu items


                            //#region remove double gradient to menu items
                            '&.gradient': {
                                // children:
                                [menuItemElm]: {
                                    extend: [
                                        this.toggleOffGradient(),
                                    ] as JssStyle,
                                } as JssStyle, // menu items
                            },
                            //#endregion remove double gradient to menu items
                        } as JssStyle,
                    } as JssStyle,

                    // watch indication state classes/pseudo-classes:
                    //#region watchIndicationStates
                    // @ts-ignore
                    indicatorStyles.themesIf(),
                    // @ts-ignore
                    indicatorStyles.states(),
                    //#endregion watchIndicationStates
                    this.applySupressManualActive(),

                    // after watching => use func props:
                    this.fnProps(),           // for themes
                    this.indicationFnProps(), // overwrite animFn only for indication
                ] as JssStyle,



                // children:
                [menuItemElm]: {
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

        borderInline         : none,
        borderBlock          : none,
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
    logo?     : React.ReactChild
    toggler?  : React.ReactChild
}
export default function Navbar<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    const navbStyles = styles.useStyles();

    
    
    const {
        // children:
        children,
        logo,
        toggler,
        ...otherProps } = props;

    return (
        <Control<TElement>
            // default props:
            tag='nav'
            actionCtrl={false}
            tabIndex={-1}


            // other props:
            {...otherProps}


            // main:
            mainClass={props.mainClass ?? navbStyles.main}
        >
            { logo && <div className='logo'>{ logo }</div> }
            { children && <div className='menus'>{
                (Array.isArray(children) ? children : [children]).map((child, index) =>
                    (
                        ((child as React.ReactElement).type === NavbarMenu)
                        ?
                        child
                        :
                        <NavbarMenu
                            // essentials:
                            key={index}


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
            }</div> }
            <div className='toggler'>{ toggler ?? <TogglerMenuButton /> }</div>
        </Control>
    );
}

export { NavbarMenu, NavbarMenu as Menu }