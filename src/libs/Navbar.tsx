// react (builds html using javascript):
import {
    default as React,
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
import {
    Element,
    isTypeOf,
}                           from './nodestrap'  // nodestrap's core
import {
    cssProps as ecssProps,
}                           from './BasicComponent'
import {
    cssProps as contCssProps,
}                           from './Container'
import {
    default  as Indicator,
    indicatorStyles,
    useTogglerActive,
}                           from './Indicator'
import type * as Indicators from './Indicator'
import {
    ControlStylesBuilder,
}                           from './Control'
import NavbarMenu           from './NavbarMenu'
import Check                from './Check'
import type * as Checks     from './Check'
import TogglerMenuButton    from './TogglerMenuButton'



// styles:

const wrapperElm    = '& .wrapper';
const logoElm       = '&>.logo';
const togglerElm    = '&>.toggler';
const menusElm      = '&>.menus';
const menuElm       = '&>.menus>*';

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
    protected /*override*/ actionCtrl() { return false; }


    
    protected /*virtual*/ stateCompact(content: JssStyle): JssStyle { return {
        '&.compact': content,
    }}
    protected /*virtual*/ stateNotCompact(content: JssStyle): JssStyle { return {
        '&:not(.compact)': content,
    }}
    protected /*virtual*/ stateFull(content: JssStyle): JssStyle {
        return this.stateNotCompact(content);
    }
    //#endregion mixins



    // variants:
    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}



    // states:
    protected /*virtual*/ navbarThemesIf(): JssStyle { return {
        extend: [
            indicatorStyles.themesIfOld(),
        ] as JssStyle,
    }}
    protected /*virtual*/ navbarStates(inherit = false): JssStyle { return {
        extend: [
            indicatorStyles.statesOld(inherit),



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
                ].join(',')] : {
                    // customize:
                    ...this.filterSuffixProps(this.filterPrefixProps(cssProps, 'item'), 'Full'),    // apply *general* cssProps starting with item***    and ending with ***Full
                } as JssStyle,

                [logoElm]    : {
                    // customize:
                    ...this.filterSuffixProps(this.filterPrefixProps(cssProps, 'logo'), 'Full'),    // apply *general* cssProps starting with logo***    and ending with ***Full
                } as JssStyle,

                [togglerElm] : {
                    // appearances:
                    display: 'none', // hides toggler on full version



                    // customize:
                    ...this.filterSuffixProps(this.filterPrefixProps(cssProps, 'toggler'), 'Full'), // apply *general* cssProps starting with toggler*** and ending with ***Full
                } as JssStyle,

                [menusElm]   : {
                    // customize:
                    ...this.filterSuffixProps(this.filterPrefixProps(cssProps, 'menus'), 'Full'),   // apply *general* cssProps starting with menus***   and ending with ***Full
                } as JssStyle,

                [menuElm]    : {
                    // customize:
                    ...this.filterSuffixProps(this.filterPrefixProps(cssProps, 'menu'), 'Full'),    // apply *general* cssProps starting with menu***    and ending with ***Full
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
                ].join(',')] : {
                    // customize:
                    ...this.filterSuffixProps(this.filterPrefixProps(cssProps, 'item'), 'Compact'),    // apply *general* cssProps starting with item***    and ending with ***Compact
                } as JssStyle,

                [logoElm]    : {
                    // customize:
                    ...this.filterSuffixProps(this.filterPrefixProps(cssProps, 'logo'), 'Compact'),    // apply *general* cssProps starting with logo***    and ending with ***Compact
                } as JssStyle,

                [togglerElm] : {
                    // customize:
                    ...this.filterSuffixProps(this.filterPrefixProps(cssProps, 'toggler'), 'Compact'), // apply *general* cssProps starting with toggler*** and ending with ***Compact
                } as JssStyle,

                [menusElm]   : {
                    // layout:
                    gridArea      : '-1 / -3 / -1 / 3',
                    flexDirection : 'column',  // place the menus vertically



                    // spacings:



                    // customize:
                    ...this.filterSuffixProps(this.filterPrefixProps(cssProps, 'menus'), 'Compact'),   // apply *general* cssProps starting with menus***   and ending with ***Compact
                } as JssStyle,

                [menuElm]    : {
                    // customize:
                    ...this.filterSuffixProps(this.filterPrefixProps(cssProps, 'menu'), 'Compact'),    // apply *general* cssProps starting with menu***    and ending with ***Compact
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
                            // appearances:
                            display: 'none',
                        } as JssStyle,
                    }, /*actionCtrl =*/false),
                    {
                        // [actived]
                        '&.actived': { // if activated programmatically (not by user input), disable the animation
                            [menusElm] : this.applyStateNoAnimStartupOld(),
                        }
                    },
                    //#endregion compact && (active, passive)
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
    protected /*virtual*/ navbarWatchStates(inherit = false): JssStyle { return {
        extend: [
            this.iif(!inherit,
                this.navbarThemesIf()   // conditional themes
            ),
            this.navbarStates(inherit), // state rules
        ] as JssStyle,
    }}

    public /*override*/ themesIfOld(): JssStyle { return {
        extend: [
            // super.themesIf(),        // skip using Control's theming => uses Control's base's theming
            
            indicatorStyles.themesIfOld(), // copy themes from Indicator (Control's base)
        ] as JssStyle,
    }}
    public /*override*/ statesOld(inherit = false): JssStyle { return {
        extend: [
            super.statesOld(inherit), // copy states from base
    
            
            
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



    // functions:
    protected /*virtual*/ navbarPropsFn(): JssStyle { return {
        ...this.navbarAnimFn(),
    }}
    protected /*virtual*/ navbarAnimFn(): JssStyle { return {
        // define an *animations* func for the navbar's menus:
        [this.decl(this._menusAnimFn)]: [
            this.ref(this._menusAnimActivePassive),
        ],
    }}

    public /*override*/ propsFnOld(): JssStyle { return {
        extend: [
            super.propsFnOld(), // copy functional props from base

            this.navbarPropsFn(),
        ] as JssStyle,
    }}



    // styles:
    protected /*virtual*/ wrapperBasicStyle(): JssStyle { return {
        // layout:
        display        : 'flex',
        flexDirection  : 'row',    // the flex direction to horz, so we can adjust the content's height
        justifyContent : 'center', // center the content horizontally
        alignItems     : 'center', // if the content's height is shorter than the section, place it at the center



        // spacings:
        paddingInline  : ecssProps.paddingInline,
        paddingBlock   : ecssProps.paddingBlock,
    }}
    protected /*virtual*/ navbarSecondaryItemBasicStyle(): JssStyle { return {
        // layout:
        justifySelf    : 'center', // center horizontally
        alignSelf      : 'center', // center vertically



        // spacings:
        paddingInline  : 0,
    }}
    protected /*virtual*/ navbarItemBasicStyle(): JssStyle { return {
        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'item')), // apply *general* cssProps starting with item***
    }}
    protected /*virtual*/ navbarLogoBasicStyle(): JssStyle { return {
        // layout:
        gridArea       : '1 / -3', // place the same row as menus / place at the 3rd column from the right (negative columns are placed after all positive ones are placed)



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'logo')), // apply *general* cssProps starting with logo***
    }}
    protected /*virtual*/ navbarTogglerBasicStyle(): JssStyle { return {
        // layout:
        gridArea       : '1 / 2', // place the same row as menus / place at the 2nd column from the left



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'toggler')), // apply *general* cssProps starting with toggler***
    }}
    protected /*virtual*/ navbarMenusBasicStyle(): JssStyle { return {
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
        backg          : this.ref(this._backgFn),
        anim           : this.ref(this._menusAnimFn),



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'menus')), // apply *general* cssProps starting with menus***
    }}
    protected /*virtual*/ navbarMenuBasicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base
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
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'menu')), // apply *general* cssProps starting with menu***
    }}
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base
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
        gridAutoRows        : 'min-content', // other areas than menus should take a minimum required height
        gridAutoColumns     : 'min-content', // other areas than menus should take a minimum required width
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
            // logoElm,
            // togglerElm,
            wrapperElm,
            menuElm,
        ].join(',')] : this.wrapperBasicStyle(),

        [[
            // secondary sections:
            logoElm,
            togglerElm,
        ].join(',')] : this.navbarSecondaryItemBasicStyle(),

        [[
            // all sections:
            logoElm,
            togglerElm,
            menusElm,
        ].join(',')] : this.navbarItemBasicStyle(),

        [logoElm]    : this.navbarLogoBasicStyle(),

        [togglerElm] : this.navbarTogglerBasicStyle(),

        [menusElm]   : this.navbarMenusBasicStyle(),

        [menuElm]    : this.navbarMenuBasicStyle(),
        //#endregion children



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
    protected /*override*/ styles(): Styles<'main'> {
        return {
            main: {
                extend: [
                    // watch variant classes:
                    this.useVariants(),
                    {
                        // TODO: fix the outlined behavior
                        
                        /**
                         * -- fix imperfection by design --
                         * because outlined() depended on toggleOnOutlined() depended on propsFn()
                         * and we re-define propsFn() on [menusElm|menuElm]
                         * so we need to re-define outlined() on [menusElm|menuElm]
                         */
                        '&.outlined': {
                            //#region forwards outlined to menu group & menu items
                            // children:
                            [[
                                menusElm, // includes menu group so we can disable the gradient at outlined
                                menuElm,
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
                                    menuElm,
                                ].join(',')]: {
                                    ...this.toggleOffGradient(),
                                } as JssStyle,
                            },
                            //#endregion remove double gradient to menu group & menu items
                        } as JssStyle,
                    } as JssStyle,

                    // watch navbar state classes/pseudo-classes:
                    this.navbarWatchStates(),

                    // after watching => use func props:
                    this.propsFnOld(),           // for themes
                    //TODO: update...
                    // this.indicationPropsFn(), // overwrite animFn only for indication

                    // all the required stuff has been loaded,
                    // now load the basicStyle:
                    this.basicStyle(), // basic style
                ] as JssStyle,



                // children:
                [menusElm] : this.propsFnOld(), // use func props so we can disable the gradient
                [menuElm]  : {
                    extend: [
                        // watch variant classes:
                        this.useVariants(), // always inherit
    
                        // watch state classes/pseudo-classes:
                        this.useStates(),

                        // force inherit for enable/disable states:
                        {
                            [this.decl(this._filterEnableDisable)] : 'inherit',
                            [this.decl(this._animEnableDisable)]   : 'inherit',
                        },

                        // after watching => use func props:
                        this.propsFnOld(),
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

        //#region borders
        borderInline  : none,
        borderBlock   : none,
        borderRadius  : 0,
        //#endregion borders

        //#region spacings
        paddingInline : contCssProps.paddingInline, // override to Element
        paddingBlock  : ecssProps.paddingBlock,

        gapX          : ecssProps.paddingInline,
        gapY          : ecssProps.paddingBlock,
        //#endregion spacings



        // anim props:

        filterActive  : ecssProps.filterNone,   // override to Indicator

        '@keyframes menusActive'  : keyframesMenusActive,
        '@keyframes menusPassive' : keyframesMenusPassive,
        menusAnimActive           : [['300ms', 'ease-out', 'both', keyframesMenusActive ]],
        menusAnimPassive          : [['300ms', 'ease-out', 'both', keyframesMenusPassive]],



        // menus:
        // kill margin top & bottom:
        menusMarginBlock          : [['calc(0px -', ecssProps.paddingBlock, ')']],

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
export function useStateCompact<TElement extends HTMLElement = HTMLElement>(props: Compactable, navbarRef: React.MutableRefObject<TElement|null>) {
    // states:
    const [compactDn, setCompactDn] = useState<boolean>(false); // uncontrollable (dynamic) state: true => compact mode is needed, false => compact mode is not needed



    /*
     * state is compact/full based on [controllable compact] (if set) and fallback to [uncontrollable compact]
     */
    const compactFn: boolean = props.compact /*controllable*/ ?? compactDn /*uncontrollable*/;



    useEffect(() => {
        const calculateCompactDn = () => {
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



            // decides the dynamic compact mode based on the measured dom props:
            if ((scrollWidth > clientWidth) || (scrollHeight > clientHeight)) {
                setCompactDn(true);
            }
            else {
                setCompactDn(false);
            } // if
        };
        const handleWindowResize = () => {
            calculateCompactDn();
        };



        if (navbarRef.current) {
            if (props.compact !== undefined) return; // controllable [compact] is set => no uncontrollable required



            // calculates compactDn at the first load:
            calculateCompactDn();


            
            //#region calculates compactDn every window's size changed
            // setup window resize watchdog:
            window.addEventListener('resize', handleWindowResize);



            // clean up window resize watchdog:
            return () => {
                window.removeEventListener('resize', handleWindowResize);
            };
            //#endregion calculates compactDn every window's size changed
        } // if
    }, [props.compact, navbarRef]);



    return {
        class: compactFn ? 'compact' : null,
    };
}



// react components:

// Navbar is not a Control, but an Indicator wrapping of NavbarMenu (Control)

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        Indicators.IndicatorProps<TElement>,
        Indicators.TogglerActiveProps,
        Compactable
{
    // children:
    logo?     : React.ReactChild | boolean
    toggler?  : React.ReactChild | boolean
    children? : React.ReactNode
}
export default function Navbar<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    // styles:
    const navbStyles            = styles.useStyles();

    
    
    // states:
    const [isActive, setActive] = useTogglerActive(props);

    const navbarRef             = useRef<TElement>(null);
    const stateCompact          = useStateCompact(props, navbarRef);

    
    
    // rest props:
    const {
        // accessibility:
        defaultActive,  // delete, already handled by useTogglerActive
        onActiveChange, // delete, already handled by useTogglerActive
        active,         // delete, already handled by useTogglerActive


        // children:
        logo,
        toggler,
        children,
    ...restProps} = props;



    // jsx fn props:
    const logoFn = (() => {
        // nodestrap's component:
        if (isTypeOf(logo, Element)) return (
            <logo.type
                // classes:
                classes={[...(logo.props.classes ?? []),
                    'logo', // inject logo class
                ]}
            />
        );



        // other component:
        return logo && (
            <div
                // classes:
                className='logo wrapper'
            >
                { logo }
            </div>
        );
    })();

    const togglerFn = (() => {
        // default (unset):
        if (toggler === undefined) return (
            <TogglerMenuButton
                // classes:
                classes={[
                    'toggler', // inject toggler class
                ]}


                // values:
                checked={isActive}
                onChange={(e) => {
                    setActive(e.target.checked);
                }}
            />
        );



        // nodestrap's component:
        if (isTypeOf(toggler, Element)) return (
            <toggler.type
                // classes:
                classes={[...(toggler.props.classes ?? []),
                    'toggler', // inject toggler class
                ]}


                {...(isTypeOf(toggler, Check) ? ({
                    // values:
                    checked  : toggler.props.checked  ?? isActive,
                    onChange : toggler.props.onChange ?? ((e) => {
                        setActive(e.target.checked);
                    }),
                } as Checks.Props) : {})}
            />
        );



        // other component:
        return toggler && (
            <div
                // classes:
                className='toggler wrapper'
            >
                { toggler }
            </div>
        );
    })();



    // jsx:
    return (
        <Indicator<TElement>
            // other props:
            {...restProps}


            // essentials:
            tag={props.tag ?? 'nav'}
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


            // accessibility:
            active={isActive}


            // classes:
            mainClass={props.mainClass ?? navbStyles.main}
            stateClasses={[...(props.stateClasses ?? []),
                stateCompact.class,
            ]}


            // events:
            // watch [escape key] on the whole navbar, including menus & toggler:
            onKeyDown={(e) => {
                if (isActive && ((e.code === 'Escape') || (e.key === 'Escape'))) setActive(false);


                // forwards:
                props.onKeyDown?.(e);
            }}
        >
            { logoFn }
            { togglerFn }
            { children && <div
                // classes:
                className='menus'


                // events:
                onAnimationEnd={(e) =>
                    // triggers Navbar's onAnimationEnd event
                    e.currentTarget.parentElement?.dispatchEvent(new AnimationEvent('animationend', { animationName: e.animationName, bubbles: true }))
                }
            >
                {(Array.isArray(children) ? children : [children]).map((child, index) => (
                    isTypeOf(child, NavbarMenu)
                    ?
                    <child.type
                        // other props:
                        {...child.props}


                        // essentials:
                        key={child.key ?? index}

                        
                        // events:
                        onAnimationEnd={(e) => {
                            // triggers Navbar's onAnimationEnd event
                            e.currentTarget.parentElement?.parentElement?.dispatchEvent(new AnimationEvent('animationend', { animationName: e.animationName, bubbles: true }));


                            // forwards:
                            child.props.onAnimationEnd?.(e);
                        }}
                    />
                    :
                    <NavbarMenu
                        // essentials:
                        key={index}


                        // events:
                        onAnimationEnd={(e) =>
                            // triggers Navbar's onAnimationEnd event
                            e.currentTarget.parentElement?.parentElement?.dispatchEvent(new AnimationEvent('animationend', { animationName: e.animationName, bubbles: true }))
                        }
                    >
                        { child }
                    </NavbarMenu>
                ))}
            </div> }
        </Indicator>
    );
}

export { NavbarMenu, NavbarMenu as Menu }