// react (builds html using javascript):
import {
    default as React,
    useState,
    useEffect,
    useRef,
}                           from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    PropEx,
    Cust,
    RuleList,
    PropList,

    
    // components:
    CssConfig,
    Element,

    
    // utils:
    isTypeOf,
}                           from './nodestrap'  // nodestrap's core
import fontItems            from './Icon-font-material'
import {
    BasicComponentStyles,
    cssProps as bcssProps,
    BasicComponentProps,
    BasicComponent,
}                           from './BasicComponent'
import {
    cssProps as ccssProps,
}                           from './Container'
import {
    TogglerActiveProps,
    useTogglerActive,
    
    IndicatorStyles,
    IndicatorProps,
    Indicator,
}                           from './Indicator'
import {
    PopupStyles,
    PopupProps,
    Popup,
}                           from './Popup'
import {
    ControlStyles,
}                           from './Control'
import {
    ActionControlProps,
    ActionControl,
    ActionControlStyles,
}                           from './ActionControl'
import {
    CheckProps,
    Check,
}                           from './Check'
import TogglerMenuButton    from './TogglerMenuButton'



// styles:

const wrapperElm = '& .wrapper';
const logoElm    = '&>.logo';
const togglerElm = '&>.toggler';
const menusElm   = '&>.menus';
const menuElm    = '&>.menus>*';

class NavbarMenuStyles extends ActionControlStyles {
    // states:
    public /*override*/ focusBlurring()    : JssStyle { return {
        extend: [
            super.focusBlurring(), // copy focusBlurring from base
        ] as JssStyle,



        zIndex: 1, // prevent boxShadowFocus from clipping
    }}

    // active/passive => press/release
    public /*override*/ actived()     : JssStyle { return super.pressed()   }
    public /*override*/ activating()  : JssStyle { return super.pressing()  }
    public /*override*/ passivating() : JssStyle { return super.releasing() }
    public /*override*/ passived()    : JssStyle { return super.released()  }
    public /*override*/ markActive()  : JssStyle { return {
        ...this.noOutlined(),  // kill .outlined variant
     // ...this.noMild(),      // do not kill .mild variant

        ...this.themeActive(), // switch to active theme
    }}

    public /*override*/ themeDefault(theme: string|null = null): PropList {
        // change default parameter from 'secondary' to null
        return super.themeDefault(theme);
    }
    public /*override*/ themeActive(theme = 'secondary'): PropList {
        // change default parameter from 'primary' to 'secondary'
        return super.themeActive(theme);
    }



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base
        ] as JssStyle,



        // borders:
        border       : undefined as unknown as null, // discard basicStyle's border
        borderRadius : undefined as unknown as null, // discard basicStyle's borderRadius



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'menu')), // apply *general* cssProps starting with menu***
    }}
}

export class NavbarStyles extends PopupStyles {
    // variants:
    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}



    // states:
    public /*override*/ states(inherit: boolean): RuleList { return [
        ...super.states(inherit), // copy states from base



        [ '.compact'       , this.compact() ],
        [ ':not(.compact)' , this.full()    ],
    ]}

    public /*override*/ actived()     : JssStyle { return {
        extend: [
            super.actived(), // copy actived from base
        ] as JssStyle,



        [this.decl(this._filterActivePassive)] : cssProps.filterActive,
    }}
    public /*override*/ activating()  : JssStyle { return {
        extend: [
            super.activating(), // copy activating from base
        ] as JssStyle,



        [this.decl(this._filterActivePassive)] : cssProps.filterActive,
        [this.decl(this._animActivePassive)]   : cssProps.animActive,
    }}
    public /*override*/ passivating() : JssStyle { return {
        extend: [
            super.passivating(), // copy passivating from base
        ] as JssStyle,



        [this.decl(this._filterActivePassive)] : cssProps.filterActive,
        [this.decl(this._animActivePassive)]   : cssProps.animPassive,
    }}
    public /*override*/ passived()    : JssStyle { return {
        extend: [
            super.passived(), // copy passived from base
        ] as JssStyle,



        // appearances:
        display: undefined as unknown as null, // discard passived's display



        '&.compact': {
            [menusElm]: {
                // appearances:
                display: 'none',
            } as JssStyle,
        } as JssStyle,
    }}

    public /*virtual*/ compact() : JssStyle { return {
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



            // customize:
            ...this.filterSuffixProps(this.filterPrefixProps(cssProps, 'menus'), 'Compact'),   // apply *general* cssProps starting with menus***   and ending with ***Compact
        } as JssStyle,

        [menuElm]    : {
            // customize:
            ...this.filterSuffixProps(this.filterPrefixProps(cssProps, 'menu'), 'Compact'),    // apply *general* cssProps starting with menu***    and ending with ***Compact
        } as JssStyle,



        // customize:
        ...this.filterGeneralProps(this.filterSuffixProps(cssProps, 'Compact')),               // apply *general* cssProps ending with ***Compact
    }}
    public /*virtual*/ full()    : JssStyle { return {
        [[
            // all sections:
            logoElm,
            togglerElm,
            menusElm,
        ].join(',')] : {
            // customize:
            ...this.filterSuffixProps(this.filterPrefixProps(cssProps, 'item'), 'Full'),       // apply *general* cssProps starting with item***    and ending with ***Full
        } as JssStyle,

        [logoElm]    : {
            // customize:
            ...this.filterSuffixProps(this.filterPrefixProps(cssProps, 'logo'), 'Full'),       // apply *general* cssProps starting with logo***    and ending with ***Full
        } as JssStyle,

        [togglerElm] : {
            // appearances:
            display: 'none', // hides toggler on full version



            // customize:
            ...this.filterSuffixProps(this.filterPrefixProps(cssProps, 'toggler'), 'Full'),    // apply *general* cssProps starting with toggler*** and ending with ***Full
        } as JssStyle,

        [menusElm]   : {
            // customize:
            ...this.filterSuffixProps(this.filterPrefixProps(cssProps, 'menus'), 'Full'),      // apply *general* cssProps starting with menus***   and ending with ***Full
        } as JssStyle,

        [menuElm]    : {
            // customize:
            ...this.filterSuffixProps(this.filterPrefixProps(cssProps, 'menu'), 'Full'),       // apply *general* cssProps starting with menu***    and ending with ***Full
        } as JssStyle,



        // customize:
        ...this.filterGeneralProps(this.filterSuffixProps(cssProps, 'Full')),                  // apply *general* cssProps ending with ***Full
    }}

    public /*override*/ resetEnableDisable(inherit: boolean) : PropList { return {} } // disabled
    public /*override*/ enabled()                            : JssStyle { return {} } // disabled
    public /*override*/ enabling()                           : JssStyle { return {} } // disabled
    public /*override*/ disabling()                          : JssStyle { return {} } // disabled
    public /*override*/ disabled()                           : JssStyle { return {} } // disabled

    public /*override*/ resetArriveLeave(inherit: boolean)   : PropList { return {} } // disabled
    public /*override*/ resetPressRelease(inherit: boolean)  : PropList { return {} } // disabled



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        // extend: [
        //     super.basicStyle(), // copy basicStyle from base
        // ] as JssStyle,



        // layout:
        display             : 'grid', // use css grid for layouting, so we can customize the desired area later.

        // explicit areas:
        /*
            just one explicit area: `menus`
            logo & toggler rely on implicit area
        */
        gridTemplateRows    : [['auto'/*fluid height*/]],
        gridTemplateColumns : [['auto'/*fluid width, the rest of maximum width - logo's width - toggler's width*/]],
        gridTemplateAreas   : [[
            '"menus"',
        ]],

        // implicit areas:
        gridAutoFlow        : 'column',      // if child's gridArea was not specified => place it automatically at horz direction
        gridAutoRows        : 'min-content', // other areas than `menus` should take the minimum required height
        gridAutoColumns     : 'min-content', // other areas than `menus` should take the minimum required width
        // the gridArea's size configured as *minimum* content's size required => no free space left to distribute => so (justify|algin)Content is *not required*

        // child alignments:
        justifyItems        : 'stretch', // each section fills the entire area's width
        alignItems          : 'stretch', // each section fills the entire area's height (the shorter sections follow the tallest one)



        //#region children
        [[
            // wrapper elements:
            wrapperElm, // wrapped logo & wrapped toggler
            menuElm,
        ].join(',')] : this.wrapperLayout(),

        [[
            // secondary sections:
            logoElm,
            togglerElm,
        ].join(',')] : this.navbarSecondaryItemLayout(),

        [[
            // all sections:
            logoElm,
            togglerElm,
            menusElm,
        ].join(',')] : this.navbarItemLayout(),

        [logoElm]    : this.navbarLogoLayout(),

        [togglerElm] : this.navbarTogglerLayout(),

        [menusElm]   : this.navbarMenusLayout(),
        //#endregion children



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
    protected /*virtual*/ wrapperLayout(): JssStyle { return {
        // layout:
        display        : 'flex',   // use block flexbox, so it takes the entire parent's width
        flexDirection  : 'row',    // the flex direction to horz, so we can adjust the content's height
        justifyContent : 'center', // center items horizontally
        alignItems     : 'center', // if the content's height is shorter than the section, place it at the center



        // spacings:
        paddingInline  : bcssProps.paddingInline,
        paddingBlock   : bcssProps.paddingBlock,
    }}
    protected /*virtual*/ navbarSecondaryItemLayout(): JssStyle { return {
        // layout:
        justifySelf    : 'center', // center self horizontally
        alignSelf      : 'center', // center self vertically



        // spacings:
        paddingInline  : 0,
    }}
    protected /*virtual*/ navbarItemLayout(): JssStyle { return {
        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'item')), // apply *general* cssProps starting with item***
    }}
    protected /*virtual*/ navbarLogoLayout(): JssStyle { return {
        // layout:
        gridArea       : '1 / -3', // place at the same `menus`' row / place at the 3rd column from the right (negative columns are placed after all positive ones was placed)



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'logo')), // apply *general* cssProps starting with logo***
    }}
    protected /*virtual*/ navbarTogglerLayout(): JssStyle { return {
        // layout:
        gridArea       : '1 / 2', // place at the same `menus`' row / place at the 2nd column from the left



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'toggler')), // apply *general* cssProps starting with toggler***
    }}
    protected /*virtual*/ navbarMenusLayout(): JssStyle { return {
        // layout:
        gridArea       : 'menus',   // place at the defined `menus` area
        display        : 'flex',    // use flexbox to place the menus sequentially
        flexDirection  : 'row',     // menus are stacked horizontally
        justifyContent : 'start',   // menus are placed starting from the left, leaving a free space (if any) at the end
        alignItems     : 'stretch', // menus height are follow the tallest one



        // sizes:
        // todo: what's this????
        inlineSize     : 'fill-available',
        fallbacks      : {
            inlineSize : '-moz-available',
        },


        
        // states & animations:
        filter      : this.ref(this._filter),
        anim        : this.ref(this._anim),



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'menus')), // apply *general* cssProps starting with menus***
    }}
    public /*override*/ compositeStyle(): JssStyle { return {
        extend: [
            super.compositeStyle(), // copy compositeStyle from base
        ] as JssStyle,
        
        
        
        // children:
        [menuElm]: (new NavbarMenuStyles()).compositeStyle(),
    }}
}
export const navbarStyles = new NavbarStyles();



// configs:

const cssConfig = new CssConfig(() => {
    const keyframesActive  : PropEx.Keyframes = {
        from : {
            overflow     : 'hidden',
            maxBlockSize : 0,
        },
        '99%': {
            overflow     : 'hidden',
            maxBlockSize : '100vh',
        },
        to   : {
            overflow     : 'unset',
            maxBlockSize : 'unset',
        },
    };
    const keyframesPassive : PropEx.Keyframes = {
        from : keyframesActive.to,
        '1%' : keyframesActive['99%'],
        to   : keyframesActive.from,
    };


    
    return {
        //#region positions
        zIndex        : 1020,
        position      : 'sticky',
        //#endregion positions

        
        
        //#region borders
        borderInline  : 'none',
        borderBlock   : 'none',
        borderRadius  : 0,
        //#endregion borders

        
        
        //#region spacings
        paddingInline : ccssProps.paddingInline, // override to Element
        paddingBlock  : bcssProps.paddingBlock,

        gapX          : bcssProps.paddingInline,
        gapY          : bcssProps.paddingBlock,
        //#endregion spacings



        //#region animations
        filterActive             : 'initial',

        '@keyframes active'      : keyframesActive,
        '@keyframes passive'     : keyframesPassive,
        animActive               : [['300ms', 'ease-out', 'both', keyframesActive ]],
        animPassive              : [['300ms', 'ease-out', 'both', keyframesPassive]],
        //#endregion animations



        // menus:
        // kill margin top & bottom:
        menusMarginBlock         : [['calc(0px -', bcssProps.paddingBlock, ')']],

        // on mobile, on the menu group, kill margin left & right:
        menusMarginInlineCompact : [['calc(0px -', ccssProps.paddingInline, ')']],

        // on mobile, on the menu group, restore the margin top & bottom:
        menusMarginBlockCompact  : 0,



        //#region making menus floating (on mobile), not shifting the content
        ...{
            // do not make row spacing when the menus shown (we'll make the menus as ghost element, floating in front of the contents below the navbar)
            gapY: 0,



            // menus:
            menusPositionCompact         : 'absolute',
            menusMarginBlockStartCompact : bcssProps.paddingBlock,
            menusPaddingBlockEndCompact  : bcssProps.paddingBlock,
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
export function useStateCompact<TElement extends HTMLElement = HTMLElement>(props: Compactable, navbarRef: React.RefObject<TElement>) {
    // states:
    const [compactDn, setCompactDn] = useState<boolean>(false); // uncontrollable (dynamic) state: true => compact mode, false => full mode



    /*
     * state is compact/full based on [controllable compact] (if set) and fallback to [uncontrollable compact]
     */
    const compactFn: boolean = props.compact /*controllable*/ ?? compactDn /*uncontrollable*/;



    useEffect(() => {
        const navbar = navbarRef.current;
        if (!navbar)                     return; // navbar was unloaded => nothing to do
        if (props.compact !== undefined) return; // controllable [compact] is set => no uncontrollable required
        
        
        
        const handleUpdate = async () => { // keeps the UI responsive (not blocking) while handling the event
            // prepare the condition for dom measurement:
            const classList  = navbar.classList;
            const hasCompact = classList.contains('compact');
            if (hasCompact) classList.remove('compact');



            // measuring dom props:
            const {
                scrollWidth,
                clientWidth,

                scrollHeight,
                clientHeight,
            } = navbar;



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



        // update for the first time:
        handleUpdate();


        
        //#region update in the future
        //#region when items resized
        const resizeObserver = ResizeObserver ? new ResizeObserver(async (entries) => {
            // filter only the existing items
            const exist = ((): boolean => {
                if (navbar.parentElement) { // navbar is still exist on the document
                    return true; // confirmed
                } // if

                
                
                resizeObserver?.unobserve(navbar); // no longer exist => remove from observer
                return false; // not exist
            })();
            if (!exist) return; // no existing items => nothing to do



            // update after being resized:
            await handleUpdate();
        }) : null;
        if (resizeObserver) {
            // update in the future:
            resizeObserver.observe(navbar, { box: 'border-box' });
        } // if
        //#endregion when items resized
        //#endregion update in the future



        // cleanups:
        return () => {
            resizeObserver?.disconnect();
        };
    }, [props.compact, navbarRef]);



    return {
        class: compactFn ? 'compact' : null,
    };
}



// react components:

export interface NavbarMenuProps<TElement extends HTMLElement = HTMLElement>
    extends
        ActionControlProps<TElement>
{
}
export function NavbarMenu<TElement extends HTMLElement = HTMLElement>(props: NavbarMenuProps<TElement>) {
    // jsx:
    return (
        <ActionControl<TElement>
            // other props:
            {...props}


            // essentials:
            tag={props.tag ?? 'a'}


            // variants:
            mild={props.mild ?? false}


            // classes:
            mainClass={props.mainClass ?? ''}
        />
    );
}

export type { NavbarMenuProps as MenuProps }
export { NavbarMenu as Menu }



export interface NavbarProps<TElement extends HTMLElement = HTMLElement>
    extends
        PopupProps<TElement>,
        TogglerActiveProps,

        Compactable
{
    // children:
    logo?     : React.ReactChild | boolean
    toggler?  : React.ReactChild | boolean
    children? : React.ReactNode
}
export default function Navbar<TElement extends HTMLElement = HTMLElement>(props: NavbarProps<TElement>) {
    // styles:
    const styles                = navbarStyles.useStyles();

    
    
    // states:
    const [isActive, setActive] = useTogglerActive(props);

    const navbarRef             = useRef<TElement|null>(null);
    const stateCompact          = useStateCompact(props, navbarRef);

    
    
    // rest props:
    const {
        // accessibility:
        defaultActive,  // delete, already handled by `useTogglerActive`
        active,         // delete, already handled by `useTogglerActive`
        onActiveChange, // delete, already handled by `useTogglerActive`


        // children:
        logo,
        toggler,
        children,
    ...restProps} = props;



    // fn props:
    const mildFn = props.mild ?? false;



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
                // variants:
                mild={mildFn}
                
                
                // classes:
                classes={[
                    'toggler', // inject toggler class
                ]}


                // values:
                active={isActive}
                onActiveChange={(newActive) => {
                    setActive(newActive);
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


                {...(isTypeOf(toggler, Indicator) ? ({
                    // values:
                    active         : (toggler.props as IndicatorProps).active ?? isActive,
                } as IndicatorProps) : {})}

                
                {...(isTypeOf(toggler, Check) ? ({
                    // values:
                    onActiveChange : (toggler.props as CheckProps).onActiveChange ?? ((newActive) => {
                        setActive(newActive);
                    }),
                } as CheckProps) : {})}
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
        <Popup<TElement>
            // other props:
            {...restProps}


            // essentials:
            tag={props.tag ?? 'nav'}
            elmRef={(elm) => {
                navbarRef.current = elm;


                // forwards:
                const elmRef = props.elmRef;
                if (elmRef) {
                    if (typeof(elmRef) === 'function') {
                        elmRef(elm);
                    }
                    else {
                        (elmRef as React.MutableRefObject<TElement|null>).current = elm;
                    } // if
                } // if
            }}


            // accessibility:
            active={isActive}


            // variants:
            mild={mildFn}


            // classes:
            mainClass={props.mainClass ?? styles.main}
            stateClasses={[...(props.stateClasses ?? []),
                stateCompact.class,
            ]}


            // events:
            // watch [escape key] on the whole navbar, including menus & toggler:
            onKeyUp={(e) => {
                // backwards:
                props.onKeyUp?.(e);
                
                
                
                if (!e.defaultPrevented) {
                    if (isActive && ((e.key === 'Escape') || (e.code === 'Escape'))) {
                        setActive(false);
                        e.preventDefault();
                    } // if
                } // if
            }}
        >
            { logoFn }
            { togglerFn }
            <div
                // classes:
                className='menus'


                // events:
                onAnimationEnd={(e) => {
                    // triggers `Navbar`'s onAnimationEnd event
                    e.currentTarget.parentElement?.dispatchEvent(new AnimationEvent('animationend', { animationName: e.animationName, bubbles: true }));
                }}
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
                            // triggers `Navbar`'s onAnimationEnd event
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
                            // triggers `Navbar`'s onAnimationEnd event
                            e.currentTarget.parentElement?.parentElement?.dispatchEvent(new AnimationEvent('animationend', { animationName: e.animationName, bubbles: true }))
                        }
                    >
                        { child }
                    </NavbarMenu>
                ))}
            </div>
        </Popup>
    );
}
export { Navbar }