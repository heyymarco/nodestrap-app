// react (builds html using javascript):
import
    React, {
    useState,
}                           from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
    Styles,
}                           from 'jss'          // ts defs support for jss
import CssConfig            from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import colors               from './colors'     // configurable colors & theming defs
import spacers              from './spacers'    // configurable spaces defs
import {
    cssProps as ecssProps,
}                           from './Element'
import {
    cssProps as contCssProps,
}                           from './Container'
import {
    default  as Indicator,
    styles as indicatorStyles,
}                           from './Indicator'
import type * as Indicators from './Indicator'
import {
    ControlStylesBuilder,
}                           from './Control'
import NavbarMenu           from './NavbarMenu'
import TogglerMenuButton    from './TogglerMenuButton'



// styles:

const logoElm     = '& .logo';
const togglerElm  = '& .toggler';
const menusElm    = '& .menus';
const menuItemElm = '& .menus>*';

// Navbar is not a Control, but an Indicator wrapping of NavbarMenu (Control)
// We use ControlStylesBuilder for serving styling of NavbarMenu (Control)

export class NavbarStylesBuilder extends ControlStylesBuilder {
    //#region mixins
    protected stateCompact(content: JssStyle): JssStyle { return {
        '&.compact': content,
    }}
    protected stateNotCompact(content: JssStyle): JssStyle { return {
        '&:not(.compact)': content,
    }}
    protected stateFull(content: JssStyle): JssStyle {
        return this.stateNotCompact(content);
    }
    //#endregion mixins



    // themes:
    public sizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {
        extend: super.sizeOf(size, Size, sizeProp), // copy sizes from base



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, Size)),
    }}



    // states:
    public navbarThemesIf(): JssStyle { return {
        extend: [
            // @ts-ignore
            indicatorStyles.themesIf(),
        ] as JssStyle,
    }}
    public navbarStates(inherit = false): JssStyle { return {
        extend: [
            // @ts-ignore
            indicatorStyles.states(inherit),



            this.iif(!inherit, {
            }),



            //#region specific states
            //#region compact/full
            this.stateFull({
                [logoElm]     : {
                    // customize:
                    ...this.filterSuffixProps(this.filterPrefixProps(cssProps, 'logo'), 'Full'),    // apply cssProps starting with logo***    and ending with ***Full
                } as JssStyle,

                [togglerElm]  : {
                    // appearance:
                    display: 'none', // hides toggler on full version



                    // customize:
                    ...this.filterSuffixProps(this.filterPrefixProps(cssProps, 'toggler'), 'Full'), // apply cssProps starting with toggler*** and ending with ***Full
                } as JssStyle,

                [menusElm]    : {
                    // customize:
                    ...this.filterSuffixProps(this.filterPrefixProps(cssProps, 'menus'), 'Full'),   // apply cssProps starting with menus***   and ending with ***Full
                } as JssStyle,

                [menuItemElm] : {
                    // customize:
                    ...this.filterSuffixProps(this.filterPrefixProps(cssProps, 'menu'), 'Full'),    // apply cssProps starting with menu***    and ending with ***Full
                } as JssStyle,
            }),
            this.stateCompact({
                [logoElm]     : {
                    // customize:
                    ...this.filterSuffixProps(this.filterPrefixProps(cssProps, 'logo'), 'Compact'),    // apply cssProps starting with logo***    and ending with ***Compact
                } as JssStyle,

                [togglerElm]  : {
                    // customize:
                    ...this.filterSuffixProps(this.filterPrefixProps(cssProps, 'toggler'), 'Compact'), // apply cssProps starting with toggler*** and ending with ***Compact
                } as JssStyle,

                [menusElm]    : {
                    // layout:
                    gridArea      : '-1 / -3 / -1 / 3',
                    flexDirection : 'column',  // place the menus vertically



                    // customize:
                    ...this.filterSuffixProps(this.filterPrefixProps(cssProps, 'menus'), 'Compact'),   // apply cssProps starting with menus***   and ending with ***Compact
                } as JssStyle,

                [menuItemElm] : {
                    // customize:
                    ...this.filterSuffixProps(this.filterPrefixProps(cssProps, 'menu'), 'Compact'),    // apply cssProps starting with menu***    and ending with ***Compact
                } as JssStyle,



                ...this.stateNotActivePassivating({
                    [menusElm] : {
                        // appearance:
                        display: 'none',
                    } as JssStyle,
                }),
            }),
            //#endregion compact/full



            //#region active, passive
            this.stateActivePassivating({ // [activating, actived, passivating]
                [this.decl(this._filterActivePassive)] : cssProps.filterActive, // override Indicator's filter active
            }),
            //#endregion active, passive



            this.applySupressManualActive(),
            //#endregion specific states
        ] as JssStyle,
    }}
    public watchNavbarStates(inherit = false): JssStyle { return {
        extend: [
            this.iif(!inherit,
                this.navbarThemesIf()   // conditional themes
            ),
            this.navbarStates(inherit), // state rules
        ] as JssStyle,
    }}

    protected themesIf(): JssStyle { return {
        extend: [
            // super.themesIf(),        // skip using Control's theming => uses Control's base theming
            // @ts-ignore
            indicatorStyles.themesIf(), // copy themes from Indicator (Control's base)
        ] as JssStyle,



        // define a *default* color theme:
        [this.decl(this._boxShadowFocusIf)]    : colors.secondaryTransp,

        // define an *active* color theme:
        [this.decl(this._boxShadowFocusIfAct)] : colors.secondaryTransp,
    }}
    protected states(inherit = false): JssStyle { return {
        extend: [
            super.states(inherit), // copy states from base
    
            
            
            //#region specific states
            //#region focus
            this.stateNotDisable({extend: [
                this.stateFocusBlurring({
                    zIndex: 1, // making focus-boxShadow not being clipped by nearby siblings
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

        // explicit areas:
        gridTemplateRows    : [['auto'/*fluid height*/]],
        // gridTemplateColumns : [['max-content'/*fixed width*/, 'auto'/*fluid width*/, 'max-content'/*fixed width*/]],
        // gridTemplateAreas   : [[
        //     '"logo menus toggler"',
        // ]],
        // just one explicit area: menus
        // logo & toggler rely on implicit area
        gridTemplateColumns : [['auto']],
        gridTemplateAreas   : [[
            '"menus"',
        ]],

        // implicit areas:
        gridAutoFlow        : 'column',      // if child's grid are is not specified => place automatically at horz direction
        gridAutoColumns     : 'min-content', // other areas than menus should take a minimum required width
        gridAutoRows        : 'min-content', // other areas than menus should take a minimum required height
        // the grid's size configured as *minimum* size required => no free space left to distribute => so (justify|algin)Content is *not required*
        // default placement for each navbar's sections:

        // child alignments:
        justifyItems        : 'stretch', // each section fill the entire area's width
        alignItems          : 'stretch', // each section fill the entire area's height (the shorter sections follow the tallest one)



        // accessibility:
        cursor: 'initial',



        // children:
        //#region children
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
            justifyContent : 'center', // center the content horizontally
            alignItems     : 'center', // if the content's height is shorter than the section, place it at the center
        } as JssStyle,

        [[
            logoElm,
            togglerElm,
        ].join(',')]: {
            paddingInline : 0,
        } as JssStyle,

        [logoElm]    : {
            // layout:
            gridArea : '1 / -3', // place the same row as menus / place at the 3rd column from the right (negative columns are placed after all positive ones are placed)



            // customize:
            ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'logo')), // apply cssProps starting with logo***
        } as JssStyle,

        [togglerElm] : {
            // layout:
            gridArea : '1 / 2', // place the same row as menus / place at the 2nd column from the left



            // customize:
            ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'toggler')), // apply cssProps starting with toggler***
        } as JssStyle,

        [menusElm]   : {
            // layout:
            gridArea       : 'menus',
            display        : 'flex',    // use flexbox to place the menus sequentially
            flexDirection  : 'row',     // place the menus horizontally
            justifyContent : 'start',   // place the menus from the begining, leave a free space (if any) at the end
            alignItems     : 'stretch', // each menu fill the entire section's height


            
            // customize:
            ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'menus')), // apply cssProps starting with menus***
        } as JssStyle,

        [menuItemElm] : {
            // customize:
            ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'menu')), // apply cssProps starting with menu***
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

                    // watch navbar state classes/pseudo-classes:
                    this.watchNavbarStates(),

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
        paddingInline : contCssProps.paddingInline, // override to Element
        paddingBlock  : 0,

        borderInline  : none,
        borderBlock   : none,
        borderRadius  : 0,

        gapX          : spacers.sm,
        gapY          : spacers.sm,
        gapXSm        : spacers.xs,
        gapYSm        : spacers.xs,
        gapXLg        : spacers.md,
        gapYLg        : spacers.md,



        // anim props:

        filterActive  : ecssProps.filterNone,   // override to Indicator



        // menu:
        // menuPaddingInline    : ecssProps.paddingInline,
        // menuPaddingBlock     : ecssProps.paddingBlock,
    };
}, /*prefix: */'navb');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// hooks:

export interface Compactable {
    compact? : boolean
}
export function useCompactable(props: Compactable) {
    return {
        class: props.compact ? 'compact' : null,
    };
}



// react components:

// Navbar is not a Control, but an Indicator wrapping of NavbarMenu (Control)

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        Indicators.Props<TElement>,
        Compactable
{
    // accessibility:
    defaultActive?  : boolean
    onActiveChange? : (active: boolean) => void



    // children:
    children? : React.ReactNode
    logo?     : React.ReactChild | boolean
    toggler?  : React.ReactChild | boolean
}
export default function Navbar<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    const navbStyles  = styles.useStyles();

    // layouts:
    const compactable = useCompactable(props);

    
    
    const {
        // accessibility:
        defaultActive,
        active,
        onActiveChange,


        // children:
        children,
        logo,
        toggler,
        ...otherProps } = props;

    // states:
    if ((defaultActive !== undefined) && (active !== undefined)) {
        console.warn('defaultActive & active are both set.');
    } // if
    const [activeState, setActiveState] = useState<boolean>(active ?? defaultActive ?? false);
    const currentActive = active ?? activeState;

    return (
        <Indicator<TElement>
            // default props:
            tag='nav'
            active={currentActive}


            // other props:
            {...otherProps}


            // main:
            mainClass={props.mainClass ?? navbStyles.main}


            // classes:
            classes={[
                // additionals:
                ...(props.classes ?? []),


                // themes:
                compactable.class,
            ]}
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
            <div className='toggler'>{ toggler ?? (
                <TogglerMenuButton
                    checked={currentActive}
                    onChange={(e) => {
                        const newActiveState = e.target.checked;

                        onActiveChange?.(newActiveState);

                        // if uncontrollable prop => set new active state:
                        if (active === undefined) setActiveState(newActiveState);
                    }}
                />
            ) }</div>
        </Indicator>
    );
}

export { NavbarMenu, NavbarMenu as Menu }