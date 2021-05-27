// react (builds html using javascript):
import
    React, {
    useRef,
}                          from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
}                          from 'jss'          // ts defs support for jss
import {
    Cust,
}                          from './Css'        // ts defs support for jss
import CssConfig           from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import * as stripOuts      from './strip-outs'
import {
    default  as Element,
    GenericElement,
    ElementStylesBuilder,
}                          from './Element'
import type * as Elements  from './Element'
import {
    styles as contentStyles,
}                          from './Content'
import type {
    IContentStylesBuilder,
}                          from './Content'
import CarouselItem        from './CarouselItem'
import Button              from './ButtonIcon'
import type * as Buttons   from './ButtonIcon'
import {
    default as Navscroll,
    NavscrollItem,
    Dimension,
}                          from './Navscroll'



// styles:

const itemsElm   = '&>.items';                // .items is the slideList
const itemElm    = '&>.items>li, &>.items>*'; // any children inside the slideList are slideItem
const navElm     = '&>.nav';
const prevBtnElm = '&>.prevBtn';
const nextBtnElm = '&>.nextBtn';

export class CarouselStylesBuilder extends ElementStylesBuilder implements IContentStylesBuilder {
    // themes:
    public /*implement*/ contentThemeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle {
        return contentStyles.contentThemeOf(theme, Theme, themeProp, themeColor); // copy themes from Content
    }
    public /*implement*/ contentSizeOf(size: string, Size: string, sizeProp: string): JssStyle {
        return contentStyles.contentSizeOf(size, Size, sizeProp); // copy sizes from Content
    }

    public /*override*/ themeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle { return {
        extend: [
            super.themeOf(theme, Theme, themeProp, themeColor), // copy themes from base
            
            this.contentThemeOf(theme, Theme, themeProp, themeColor),
        ] as JssStyle,
    }}
    public /*override*/ sizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {
        extend: [
            super.sizeOf(size, Size, sizeProp), // copy sizes from base

            this.contentSizeOf(size, Size, sizeProp),
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, Size)),
    }}



    // states:
    public /*implement*/ contentThemesIf(): JssStyle {
        return contentStyles.contentThemesIf(); // copy themes from Content
    }
    public /*implement*/ contentStates(inherit = false): JssStyle {
        return contentStyles.contentStates(inherit); // copy states from Content
    }

    public /*override*/ themesIf(): JssStyle { return {
        extend: [
            super.themesIf(), // copy themes from base

            this.contentThemesIf(),
        ] as JssStyle,
    }}
    public /*override*/ states(inherit = false): JssStyle { return {
        extend: [
            super.states(inherit), // copy states from base

            this.contentStates(inherit),
        ] as JssStyle,
    }}



    // functions:
    public /*implement*/ contentPropsFn(): JssStyle {
        return contentStyles.contentPropsFn(); // copy functional props from Content
    }
    public /*override*/ propsFn(): JssStyle { return {
        extend: [
            super.propsFn(), // copy functional props from base

            this.contentPropsFn(),
        ] as JssStyle,
    }}



    // styles:
    public /*implement*/ contentBasicStyle(): JssStyle {
        return contentStyles.contentBasicStyle(); // copy basicStyle from Content
    }

    protected /*virtual*/ carouselItemsBasicStyle(): JssStyle { return {
        extend: [
            //#region clear browser's default styles
            (() => {
                const style = stripOuts.list;
                delete style.marginBlockStart;
                delete style.marginBlockEnd;
                delete style.marginInlineStart;
                delete style.marginInlineEnd;
                delete (style as any)['&>li'].display;

                return style;
            })(),
            //#endregion clear browser's default styles

            // hides browser's scrollbar
            stripOuts.scrollbar,
        ] as JssStyle,



        // layout:
        gridArea       : '1 / 1 / -1 / -1', // fill the entire grid areas, from the first row/column to the last row/column
        display        : 'flex',    // use flexbox as the layout
        flexDirection  : 'row',     // child items stacked horizontally
        justifyContent : 'start',   // child items placed starting from the left
        alignItems     : 'stretch', // child items width are follow the tallest one
        flexWrap       : 'nowrap',  // no wrapping



        // positions:
        position       : [['relative'], '!important'], // makes calculating slide's pos easier



        // spacings:
        // cancel-out parent's padding with negative margin:
        marginInline   : [['calc(0px -', cssProps.paddingInline, ')']],
        marginBlock    : [['calc(0px -', cssProps.paddingBlock,  ')']],



        // scrolls:
        overflowX      : 'scroll',                  // enable horizontal scrolling
        scrollSnapType : [['inline', 'mandatory']], // enable horizontal scroll snap
        scrollBehavior : 'smooth',                  // smooth scrolling when it's triggered by the navigation or CSSOM scrolling APIs
        '-webkit-overflow-scrolling': 'touch',      // supports for iOS Safari



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'items')), // apply *general* cssProps starting with items***
    }}
    protected /*virtual*/ carouselItemBasicStyle(): JssStyle { return {
        // layout:
        display         : 'flex',
        flexDirection   : 'row',    // the flex direction to horz, so we can adjust the content's vertical position
        justifyContent  : 'center', // center the content horizontally
        alignItems      : 'center', // if the content's height is shorter than the section, place it at the center



        // sizes:
        boxSizing       : 'border-box', // the final size is including borders & paddings
        inlineSize      : '100%',           // fill the entire parent's width
        flex            : [[0, 0, '100%']], // not growing, not shrinking, fill the entire parent's width



        // scrolls:
        scrollSnapAlign : 'center', // put a magnet at the center
        scrollSnapStop  : 'normal', // scrolls one by one or multiple at once



        // children:
        '&>img, &>svg': {
            '&:first-child:last-child': { // only one child
                extend: [
                    stripOuts.image,   // removes browser's default styling on image
                ] as JssStyle,



                // layout:
                display   : 'block',   // fill the entire parent's width



                // sizes:
                // alignSelf : 'stretch', // fill the entire flex's cross-axis (full height)



                // backgrounds:
                // objectFit : 'contain',
            },
        },



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'item')), // apply *general* cssProps starting with item***
    }}

    protected /*virtual*/ navBtnBasicStyle(): JssStyle { return {
        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'navBtn')), // apply *general* cssProps starting with navBtn***
    }}
    protected /*virtual*/ prevBtnBasicStyle(): JssStyle { return {
        // layout:
        gridArea : 'prevBtn',



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'prevBtn')), // apply *general* cssProps starting with prevBtn***
    }}
    protected /*virtual*/ nextBtnBasicStyle(): JssStyle { return {
        // layout:
        gridArea : 'nextBtn',



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'nextBtn')), // apply *general* cssProps starting with nextBtn***
    }}

    protected /*virtual*/ navBasicStyle(): JssStyle { return {
        // layout:
        gridArea : 'nav',



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'nav')), // apply *general* cssProps starting with nav***
    }}

    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base

            this.contentBasicStyle(),
        ] as JssStyle,



        // layout:
        display             : 'grid',

        // explicit areas:
        gridTemplateRows    : [[
            '1fr',
            'min-content',
        ]],
        gridTemplateColumns : [['15%', 'auto', '15%']],
        gridTemplateAreas   : [[
            '"prevBtn main nextBtn"',
            '"prevBtn nav  nextBtn"',
        ]],

        // child alignments:
        justifyItems        : 'stretch', // each section fill the entire area's width
        alignItems          : 'stretch', // each section fill the entire area's height



        // borders:
        overflow            : 'hidden', // clip the children at the rounded corners



        // children:
        //#region children
        [itemsElm]   : this.carouselItemsBasicStyle(),
        [itemElm]    : this.carouselItemBasicStyle(),

        [[
            prevBtnElm,
            nextBtnElm,
        ].join(',')] : this.navBtnBasicStyle(),
        [prevBtnElm] : this.prevBtnBasicStyle(),
        [nextBtnElm] : this.nextBtnBasicStyle(),

        [navElm]     : this.navBasicStyle(),
        //#endregion children



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
}
export const styles = new CarouselStylesBuilder();



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
        paddingInline      : 0,
        paddingBlock       : 0,



        navBtnBorderRadius : 0
    };
}, /*prefix: */'crsl');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// hooks:



// react components:

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        Elements.Props<TElement>
{
    // essentials:
    itemsTag? : keyof JSX.IntrinsicElements
    itemTag?  : keyof JSX.IntrinsicElements



    // children:
    children? : React.ReactNode
    prevBtn?  : React.ReactChild | boolean
    nextBtn?  : React.ReactChild | boolean
    nav?      : React.ReactChild | boolean
}
export default function Carousel<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    const crslStyles = styles.useStyles();

    // states:
    // TODO: add states here



    // scrolls:
    const listRef = useRef<HTMLElement>(null);



    const {
        // essentials:
        elmRef,
        itemsTag,
        itemTag,


        // children:
        children,
        prevBtn,
        nextBtn,
        nav,
        ...otherProps } = props;
    const itemsTag2 = itemsTag ?? 'ul';
    const itemTag2  = itemTag  ?? ['ul', 'ol'].includes(itemsTag2) ? 'li' : 'div';

    const scrollBy = (itemsElm: HTMLElement, nextSlide: boolean) => {
        const parent = itemsElm;



        const [limDeltaScrollLeft, limDeltaScrollTop] = [
            nextSlide ? ((parent.scrollWidth  - parent.clientWidth ) - parent.scrollLeft) : -parent.scrollLeft,
            nextSlide ? ((parent.scrollHeight - parent.clientHeight) - parent.scrollTop)  : -parent.scrollTop,
        ];

        const [deltaScrollLeft, deltaScrollTop] = [
            nextSlide ? Math.min(parent.clientWidth,  limDeltaScrollLeft) : Math.max(-parent.clientWidth,  limDeltaScrollLeft),
            nextSlide ? Math.min(parent.clientHeight, limDeltaScrollTop ) : Math.max(-parent.clientHeight, limDeltaScrollTop),
        ];



        parent.scrollBy({
            left     : deltaScrollLeft,
            top      : deltaScrollTop,
            behavior : 'smooth',
        });
    }
    const scrollTo = (targetSlide: HTMLElement|null) => {
        if (!targetSlide) return;
        const parent = targetSlide.parentElement! as HTMLElement;



        const [maxDeltaScrollLeft, maxDeltaScrollTop] = [
            (parent.scrollWidth  - parent.clientWidth ) - parent.scrollLeft,
            (parent.scrollHeight - parent.clientHeight) - parent.scrollTop,
        ];

        const [deltaScrollLeft, deltaScrollTop] = (() => {
            const dimension = Dimension.from(targetSlide);

            return [
                Math.min(dimension.offsetLeft, maxDeltaScrollLeft),
                Math.min(dimension.offsetTop,  maxDeltaScrollTop ),
            ];
        })();



        parent.scrollBy({
            left     : deltaScrollLeft,
            top      : deltaScrollTop,
            behavior : 'smooth',
        });
    };

    return (
        <Element<TElement>
            // other props:
            {...otherProps}


            // classes:
            mainClass={props.mainClass ?? crslStyles.main}
        >
            { children && <GenericElement<TElement>
                    // essentials:
                    tag={itemsTag2}
                    elmRef={(elm) => {
                        // @ts-ignore
                        listRef.current = elm;
        
        
                        // forwards:
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


                    // classes:
                    mainClass='items'
                >
                {(Array.isArray(children) ? children : [children]).map((child, index) => (
                    (React.isValidElement(child) && (child.type === CarouselItem))
                    ?
                    <CarouselItem
                        // essentials:
                        key={index}
                        tag={itemTag2}


                        // other props:
                        {...child.props}
                    />
                    :
                    <CarouselItem
                        // essentials:
                        key={index}
                        tag={itemTag2}
                    >
                        { child }
                    </CarouselItem>
                ))}
            </GenericElement> }

            {
                //#region has class prevBtn
                React.isValidElement(prevBtn)
                &&
                (
                    (Array.isArray(prevBtn.props.classes) && prevBtn.props.classes.includes('prevBtn'))
                    ||
                    (/(?<!\w)prevBtn(?!\w)/).test(prevBtn.props.className)
                )
                //#endregion has class prevBtn
                ?
                prevBtn
                :
                <NavButton
                    id='prevBtn'


                    // accessibility:
                    label='Previous'


                    // appearances:
                    icon='arrow_back_ios'


                    // events:
                    onClick={(e) => {
                        const itemsElm = listRef.current;
                        if (!itemsElm) return;



                        if (
                            (itemsElm.scrollLeft <= 0.5)
                            &&
                            (itemsElm.scrollTop  <= 0.5)
                        ) {
                            // scroll to last
                            scrollTo(itemsElm.lastElementChild as (HTMLElement|null));
                        }
                        else {
                            // scroll to previous:
                            scrollBy(itemsElm, false);
                        } // if
                    }}
                >
                    { prevBtn }
                </NavButton>
            }

            {
                //#region has class nextBtn
                React.isValidElement(nextBtn)
                &&
                (
                    (Array.isArray(nextBtn.props.classes) && nextBtn.props.classes.includes('nextBtn'))
                    ||
                    (/(?<!\w)nextBtn(?!\w)/).test(nextBtn.props.className)
                )
                //#endregion has class nextBtn
                ?
                nextBtn
                :
                <NavButton
                    id='nextBtn'


                    // accessibility:
                    label='Next'


                    // appearances:
                    icon='arrow_forward_ios'


                    // events:
                    onClick={(e) => {
                        const itemsElm = listRef.current;
                        if (!itemsElm) return;



                        if (
                            (((itemsElm.scrollWidth  - itemsElm.clientWidth ) - itemsElm.scrollLeft) <= 0.5)
                            &&
                            (((itemsElm.scrollHeight - itemsElm.clientHeight) - itemsElm.scrollTop ) <= 0.5)
                        ) {
                            // scroll to first
                            scrollTo(itemsElm.firstElementChild as (HTMLElement|null));
                        }
                        else {
                            // scroll to next:
                            scrollBy(itemsElm, true);
                        } // if
                    }}
                >
                    { nextBtn }
                </NavButton>
            }

            {
                nav
                ?
                (
                    React.isValidElement(nav)
                    ?
                    <nav.type
                        // essentials:
                        key={nav.key}


                        // other props:
                        {...nav.props}


                        // classes:
                        classes={[...(nav.props.classes ?? []),
                            'nav',
                        ]}


                        // NavScroll props:
                        {...((nav.type === Navscroll) ? {
                            // scrolls:
                            targetRef: listRef,
                        } : {})}
                    />
                    :
                    nav
                )
                :
                <Navscroll
                    // themes:
                    theme={props.theme}
                    size={props.size}
                    listStyle='bullet'
                    orientation='inline'


                    // classes:
                    classes={[
                        'nav',
                    ]}


                    // behaviors:
                    actionCtrl={true}


                    // scrolls:
                    targetRef={listRef}
                    interpolation={true}
                >
                    {children && (Array.isArray(children) ? children : [children]).map((child, index) => (
                        <NavscrollItem
                            // essentials:
                            key={index}
                            tag='button'


                            // labels:
                            {...(React.isValidElement<React.HTMLAttributes<HTMLElement>>(child) ? {
                                title : child.props.title,
                            } : {})}
                        />
                    ))}
                </Navscroll>
            }
        </Element>
    );
}

interface NavButtonProps
    extends
        Buttons.Props
{
    id? : string
}
function NavButton(props: NavButtonProps) {
    return (
        <Button
            // themes:
            size='lg'
            enableGradient={true}
            btnStyle='ghost'


            // other props:
            {...props}


            // classes:
            classes={[...(props.classes ?? []),
                // ids:
                props.id,
            ]}
        />
    );
}

export { CarouselItem, CarouselItem as Item }