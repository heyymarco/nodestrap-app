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
    StateList,
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
    
    indicatorStyles,
    IndicatorProps,
    Indicator,
}                           from './Indicator'
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
    public /*virtual*/ focus()    : JssStyle { return {
        extend: [
            super.focus(), // copy focus from base
        ] as JssStyle,



        zIndex: 1, // prevent boxShadowFocus from clipping
    }}

    public /*override*/ actived()     : JssStyle  { return super.pressed()   }
    public /*override*/ activating()  : JssStyle  { return super.pressing()  }
    public /*override*/ passivating() : JssStyle  { return super.releasing() }
    public /*override*/ passived()    : JssStyle  { return super.released()  }
    public /*override*/ markActive()   : JssStyle { return {
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



        // typos:
        fontSize       : bcssProps.fontSize,
        fontFamily     : undefined,
        fontWeight     : undefined,
        fontStyle      : undefined,
        textDecoration : undefined,
        lineHeight     : undefined,



        // borders:
        border         : undefined,
        borderRadius   : undefined,



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'menu')), // apply *general* cssProps starting with menu***
    }}
}

export class NavbarStyles extends BasicComponentStyles {
    // variants:
    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}

    public /*override*/ outlined(): JssStyle { return {
        extend: [
            super.outlined(), // copy outlined from base
        ] as JssStyle,

        
        
        // on NavbarMenu, *toggle on* the outlined with their own theme:
        [menuElm]: {
            '&:not(._)': // increase the specificity
                super.outlined(),
        } as JssStyle,
    }}
    public /*override*/ mild(): JssStyle { return {
        extend: [
            super.mild(), // copy mild from base
        ] as JssStyle,



        // on NavbarMenu, *toggle on* the mild with their own theme:
        [menuElm]: {
            '&:not(._)': // increase the specificity
                super.mild(),
        } as JssStyle,
    }}



    // styles:
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
        justifyItems        : 'stretch', // each section fills the entire area's width
        alignItems          : 'stretch', // each section fills the entire area's height (the shorter sections follow the tallest one)



        //#region children
        [[
            // wrapper elements:
            // logoElm,
            // togglerElm,
            wrapperElm,
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
        display        : 'flex',
        flexDirection  : 'row',    // the flex direction to horz, so we can adjust the content's height
        justifyContent : 'center', // center the content horizontally
        alignItems     : 'center', // if the content's height is shorter than the section, place it at the center



        // spacings:
        paddingInline  : bcssProps.paddingInline,
        paddingBlock   : bcssProps.paddingBlock,
    }}
    protected /*virtual*/ navbarSecondaryItemLayout(): JssStyle { return {
        // layout:
        justifySelf    : 'center', // center horizontally
        alignSelf      : 'center', // center vertically



        // spacings:
        paddingInline  : 0,
    }}
    protected /*virtual*/ navbarItemLayout(): JssStyle { return {
        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'item')), // apply *general* cssProps starting with item***
    }}
    protected /*virtual*/ navbarLogoLayout(): JssStyle { return {
        // layout:
        gridArea       : '1 / -3', // place the same row as menus / place at the 3rd column from the right (negative columns are placed after all positive ones are placed)



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'logo')), // apply *general* cssProps starting with logo***
    }}
    protected /*virtual*/ navbarTogglerLayout(): JssStyle { return {
        // layout:
        gridArea       : '1 / 2', // place the same row as menus / place at the 2nd column from the left



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'toggler')), // apply *general* cssProps starting with toggler***
    }}
    protected /*virtual*/ navbarMenusLayout(): JssStyle { return {
        // layout:
        gridArea       : 'menus',
        display        : 'flex',    // use flexbox to place the menus sequentially
        flexDirection  : 'row',     // place the menus horizontally
        justifyContent : 'start',   // place the menus from the begining, leave a free space (if any) at the end
        alignItems     : 'stretch', // each menu fills the entire section's height



        // sizes:
        inlineSize     : 'fill-available',
        fallbacks      : {
            inlineSize : '-moz-available',
        },


        
        // apply fn props:
        // backg          : this.ref(this._backg),
        // todo: anim           : this.ref(this._menusAnimFn),



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
    const keyframesMenusActive  : PropEx.Keyframes = {
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
    const keyframesMenusPassive : PropEx.Keyframes = {
        from : keyframesMenusActive.to,
        '1%' : keyframesMenusActive['99%'],
        to   : keyframesMenusActive.from,
    };


    
    return {
        zIndex        : 1020,
        position      : 'sticky',

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
        filterActive  : bcssProps.filterNone,   // override to Indicator

        '@keyframes menusActive'  : keyframesMenusActive,
        '@keyframes menusPassive' : keyframesMenusPassive,
        menusAnimActive           : [['300ms', 'ease-out', 'both', keyframesMenusActive ]],
        menusAnimPassive          : [['300ms', 'ease-out', 'both', keyframesMenusPassive]],
        //#endregion animations



        // menus:
        // kill margin top & bottom:
        menusMarginBlock          : [['calc(0px -', bcssProps.paddingBlock, ')']],

        // on mobile, on the menu group, kill margin left & right:
        menusMarginInlineCompact  : [['calc(0px -', ccssProps.paddingInline, ')']],

        // on mobile, on the menu group, restore the margin top & bottom:
        menusMarginBlockCompact   : 0,



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

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        IndicatorProps<TElement>,
        TogglerActiveProps

        // Compactable
{
    // children:
    logo?     : React.ReactChild | boolean
    toggler?  : React.ReactChild | boolean
    children? : React.ReactNode
}
export default function Navbar<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    // styles:
    const navbStyles            = navbarStyles.useStyles();

    
    
    // states:
    const [isActive, setActive] = useTogglerActive(props);

    const navbarRef             = useRef<TElement>(null);
    // const stateCompact          = useStateCompact(props, navbarRef);

    
    
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
        <BasicComponent<TElement>
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
            // active={isActive}


            // variants:
            mild={mildFn}


            // classes:
            mainClass={props.mainClass ?? navbStyles.main}
            stateClasses={[...(props.stateClasses ?? []),
                // stateCompact.class,
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
        </BasicComponent>
    );
}
export { Navbar }