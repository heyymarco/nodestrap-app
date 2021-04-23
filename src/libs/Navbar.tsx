// react (builds html using javascript):
import
    React, {
    useState,
    useEffect,
    useRef,
}                           from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
    Styles,
}                           from 'jss'          // ts defs support for jss
import {
    PropEx,
}                           from './Css'        // ts defs support for jss
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

const logoElm     = '&>.logo';
const togglerElm  = '&>.toggler';
const menusElm    = '&>.menus';
const menuItemElm = '&>.menus>*';

// Navbar is not a Control, but an Indicator wrapping of NavbarMenu (Control)
// We use ControlStylesBuilder for serving styling of NavbarMenu (Control)

export class NavbarStylesBuilder extends ControlStylesBuilder {
    //#region scoped css props
    /**
     * functional animations for the navbar's menus.
     */
    public    readonly _menusAnimFn            = 'menusAnimFn'



    // anim props:

    protected readonly _menusAnimActivePassive = 'menusAnimActivePassive'
    //#endregion scoped css props



    //#region mixins
    protected actionCtrl() { return false; }

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



    // fn props:
    public navbarFnProps(): JssStyle { return {
        // define an *animations* func for the modal's background:
        [this.decl(this._menusAnimFn)]: [
            this.ref(this._menusAnimActivePassive),
        ],
    }}
    protected fnProps(): JssStyle { return {
        extend: [
            super.fnProps(), // copy functional props from base

            this.navbarFnProps(),
        ] as JssStyle,
    }}



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
                //#region all initial states are none
                [this.decl(this._menusAnimActivePassive)] : ecssProps.animNone,
                //#endregion all initial states are none
            }),



            //#region specific states
            //#region compact/full
            this.stateFull({
                [[
                    // all sections:
                    logoElm,
                    togglerElm,
                    menusElm,
                ].join(',')]: {
                    // customize:
                    ...this.filterSuffixProps(this.filterPrefixProps(cssProps, 'items'), 'Full'),   // apply cssProps starting with items***   and ending with ***Full
                } as JssStyle,

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



                // customize:
                ...this.filterGeneralProps(this.filterSuffixProps(cssProps, 'Full')), // apply *general* cssProps ending with ***Full
            }),
            this.stateCompact({
                [[
                    // all sections:
                    logoElm,
                    togglerElm,
                    menusElm,
                ].join(',')]: {
                    // customize:
                    ...this.filterSuffixProps(this.filterPrefixProps(cssProps, 'items'), 'Compact'),   // apply cssProps starting with items***   and ending with ***Compact
                } as JssStyle,

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



                    // spacings:



                    // customize:
                    ...this.filterSuffixProps(this.filterPrefixProps(cssProps, 'menus'), 'Compact'),   // apply cssProps starting with menus***   and ending with ***Compact
                } as JssStyle,

                [menuItemElm] : {
                    // customize:
                    ...this.filterSuffixProps(this.filterPrefixProps(cssProps, 'menu'), 'Compact'),    // apply cssProps starting with menu***    and ending with ***Compact
                } as JssStyle,



                extend: [
                    //#region specific states
                    //#region compact && (active, passive)
                    this.stateActive({ // [activating, actived]
                        [this.decl(this._menusAnimActivePassive)] : cssProps.menusAnimActive,
                    }, /*actionCtrl =*/false),
                    this.statePassivating({ // [passivating]
                        [this.decl(this._menusAnimActivePassive)] : cssProps.menusAnimPassive,
                    }),
                    this.stateNotActivePassivating({
                        [menusElm] : {
                            // appearance:
                            display: 'none',
                        } as JssStyle,
                    }, /*actionCtrl =*/false),
                    {
                        // [actived]
                        '&.actived': { // if activated programmatically (not by user input), disable the animation
                            [menusElm] : this.applyStateNoAnimStartup(),
                        }
                    },
                    //#region compact && (active, passive)
                    //#endregion specific states
                ] as JssStyle,



                // customize:
                ...this.filterGeneralProps(this.filterSuffixProps(cssProps, 'Compact')), // apply *general* cssProps ending with ***Compact
            }),
            //#endregion compact/full



            //#region active, passive
            this.stateActivePassivating({ // [activating, actived, passivating]
                [this.decl(this._filterActivePassive)] : cssProps.filterActive, // override Indicator's filter active
            }, /*actionCtrl =*/false),
            //#endregion active, passive
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
            // wrapper elements:
            logoElm,
            togglerElm,
            menuItemElm,
        ].join(',')]: {
            // layout:
            display        : 'flex',
            flexDirection  : 'row',    // the flex direction to horz, so we can adjust the content's vertical position
            justifyContent : 'center', // center the content horizontally
            alignItems     : 'center', // if the content's height is shorter than the section, place it at the center



            // spacings:
            paddingInline  : ecssProps.paddingInline,
            paddingBlock   : ecssProps.paddingBlock,
        } as JssStyle,

        [[
            // secondary sections:
            logoElm,
            togglerElm,
        ].join(',')]: {
            paddingInline : 0,
        } as JssStyle,

        [[
            // all sections:
            logoElm,
            togglerElm,
            menusElm,
        ].join(',')]: {
            // customize:
            ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'items')), // apply cssProps starting with items***
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



            // sizes:
            inlineSize     : 'fill-available',
            fallbacks      : {
                inlineSize : '-moz-available',
            },


            
            // apply fn props:
            backg : this.ref(this._backgFn),
            anim  : this.ref(this._menusAnimFn),



            // customize:
            ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'menus')), // apply cssProps starting with menus***
        } as JssStyle,

        [menuItemElm] : {
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
                        // TODO: fix the outlined behavior
                        
                        '&.outlined': {
                            //#region forwards outlined to menu group & menu items
                            // children:
                            [[
                                menusElm, // includes menu group so we can disable the gradient at outlined
                                menuItemElm,
                            ].join(',')]: {
                                extend: [
                                    this.outlined(),
                                ] as JssStyle,
                            } as JssStyle,
                            //#endregion forwards outlined to menu group & menu items


                            //#region remove double gradient to menu group & menu items
                            '&.gradient': {
                                // children:
                                [[
                                    menusElm,
                                    menuItemElm,
                                ].join(',')]: {
                                    extend: [
                                        this.toggleOffGradient(),
                                    ] as JssStyle,
                                } as JssStyle,
                            },
                            //#endregion remove double gradient to menu group & menu items
                        } as JssStyle,
                    } as JssStyle,

                    // watch navbar state classes/pseudo-classes:
                    this.watchNavbarStates(),

                    // after watching => use func props:
                    this.fnProps(),           // for themes
                    this.indicationFnProps(), // overwrite animFn only for indication
                ] as JssStyle,



                // children:
                [menusElm]: this.fnProps(), // use func props so we can disable the gradient
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
                } as JssStyle,
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


    const keyframesMenusActive  : PropEx.Keyframes = {
        from: {
            overflow     : 'hidden',
            maxBlockSize : 0,
        },
        '99%': {
            overflow     : 'hidden',
            maxBlockSize : '100vh',
        },
        to: {
            overflow     : 'unset',
            maxBlockSize : 'unset',
        },
    };
    const keyframesMenusPassive : PropEx.Keyframes = {
        from : keyframesMenusActive.to,
        '1%' : keyframesMenusActive['99%'],
        to   : keyframesMenusActive.from,
    };


    return {
        zIndex        : 1020,
        position      : 'sticky',

        paddingInline : contCssProps.paddingInline, // override to Element
        paddingBlock  : ecssProps.paddingBlock,

        borderInline  : none,
        borderBlock   : none,
        borderRadius  : 0,

        gapX          : ecssProps.paddingInline,
        gapY          : ecssProps.paddingBlock,



        // anim props:

        filterActive  : ecssProps.filterNone,   // override to Indicator

        '@keyframes menusActive'  : keyframesMenusActive,
        '@keyframes menusPassive' : keyframesMenusPassive,
        menusAnimActive           : [['300ms', 'ease-out', 'both', keyframesMenusActive ]],
        menusAnimPassive          : [['300ms', 'ease-out', 'both', keyframesMenusPassive]],



        // menus:
        // kill margin top & bottom:
        itemsMarginBlock          : [['calc(0px -', ecssProps.paddingBlock, ')']],

        // on mobile, on the menu group, kill margin left & right:
        menusMarginInlineCompact  : [['calc(0px -', contCssProps.paddingInline, ')']],

        // on mobile, on the menu group, restore the margin top & bottom:
        menusMarginBlockCompact   : 0,



        //#region making menus floating (on mobile), not shifting the content
        ...{
            // do not make row spacing when the menus shown (we'll make the menus as ghost element, floating in front of the contents below the navbar)
            gapY: 0,



            // menus:
            menusPositionCompact         : 'absolute',
            menusMarginBlockStartCompact : ecssProps.paddingBlock,
            menusPaddingBlockEndCompact  : ecssProps.paddingBlock,
        } as JssStyle,
        //#endregion making menus floating (on mobile), not shifting the content
    };
}, /*prefix: */'navb');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// hooks:

export interface Compactable {
    compact? : boolean
}
export function useCompactable<TElement extends HTMLElement = HTMLElement>(props: Compactable, navbarRef: React.MutableRefObject<TElement|undefined>) {
    const [dynCompact, setDynCompact] = useState<boolean>(props.compact ?? false);
    const fnCompact = props.compact ?? dynCompact;



    useEffect(() => {
        const calculateDynCompact = () => {
            if (!navbarRef.current) return;



            // prepare the condition for dom measurement:
            const classList = navbarRef.current.classList;
            const hasCompact = classList.contains('compact');
            if (hasCompact) classList.remove('compact');



            // measuring dom props:
            const {
                scrollWidth,
                clientWidth,

                scrollHeight,
                clientHeight,
            } = navbarRef.current;



            // restore to original condition as before measurement:
            if (hasCompact) classList.add('compact');



            // decides the dynamic compact mode based on measured dom props:
            if ((scrollWidth > clientWidth) || (scrollHeight > clientHeight)) {
                setDynCompact(true);
            }
            else {
                setDynCompact(false);
            } // if
        };
        const handleWindowResize = () => {
            calculateDynCompact();
        };



        if (navbarRef.current && (props.compact === undefined)) {
            // calculates dync compact at the first load & every props.compact changed
            calculateDynCompact();


            
            // setup window resize watchdog:
            window.addEventListener('resize', handleWindowResize);



            // clean up window resize watchdog:
            return () => {
                window.removeEventListener('resize', handleWindowResize);
            };
        } // if
    }, [props.compact, navbarRef]);



    return {
        class: fnCompact ? 'compact' : null,
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
    const navbarRef   = useRef<TElement>();
    const compactable = useCompactable(props, navbarRef);

    
    
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
    const [dynActive, setDynActive] = useState<boolean>(active ?? defaultActive ?? false);
    const fnActive = active ?? dynActive;

    return (
        <Indicator<TElement>
            // default props:
            tag='nav'
            active={fnActive}


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


            // essentials:
            elmRef={(elm) => {
                // @ts-ignore
                navbarRef.current = elm;


                // forwards:
                const elmRef = props.elmRef;
                if (elmRef) {
                    if (typeof(elmRef) === 'function') {
                        elmRef(elm);
                    }
                    else {
                        // @ts-ignore
                        elmRef.current = elm;
                    } // if
                } // if
            }}    
        >
            { logo && <div className='logo'>{ logo }</div> }
            <div className='toggler'>{ toggler ?? (
                <TogglerMenuButton
                    checked={fnActive}
                    onChange={(e) => {
                        const newActiveState = e.target.checked;

                        onActiveChange?.(newActiveState);

                        // if uncontrollable prop => set new active state:
                        if (active === undefined) setDynActive(newActiveState);
                    }}
                />
            ) }</div>
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
        </Indicator>
    );
}

export { NavbarMenu, NavbarMenu as Menu }