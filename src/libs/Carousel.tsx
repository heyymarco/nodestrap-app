// react (builds html using javascript):
import {
    default as React,
    useRef,
}                           from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,

    
    // components:
    CssConfig,
    ElementProps,
    Element,


    // utils:
    isTypeOf,
}                           from './nodestrap'  // nodestrap's core
import * as stripOuts       from './strip-outs'
import {
    BasicComponentStyles,
    BasicComponentProps,
    BasicComponent,
}                           from './BasicComponent'
import {
    IContentStyles,
    contentStyles,
}                           from './Content'
import {
    ButtonIconProps,
    ButtonIcon,
}                           from './ButtonIcon'
import {
    Dimension,
    
    NavscrollProps,
    Navscroll,

    NavscrollItem,
}                           from './Navscroll'



// styles:

const itemsElm   = '&>.items';                // .items is the slideList
const itemElm    = '&>.items>li, &>.items>*'; // any children inside the slideList are slideItem
const navElm     = '&>.nav';
const prevBtnElm = '&>.prevBtn';
const nextBtnElm = '&>.nextBtn';

export class CarouselStyles extends BasicComponentStyles implements IContentStyles {
    // variants:
    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base

            this.contentSize(size),
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}
    public /*implement*/ contentSize(size: string): JssStyle {
        return contentStyles.contentSize(size); // copy sizes from Content
    }



    // styles:
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
        gridTemplateColumns : [['15%', '1fr', '15%']],
        gridTemplateAreas   : [[
            '"prevBtn main nextBtn"',
            '"prevBtn nav  nextBtn"',
        ]],

        // child alignments:
        justifyItems        : 'stretch', // each section fills the entire area's width
        alignItems          : 'stretch', // each section fills the entire area's height



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
    public /*implement*/ contentBasicStyle(): JssStyle {
        return contentStyles.contentBasicStyle(); // copy basicStyle from Content
    }

    protected /*virtual*/ carouselItemsBasicStyle(): JssStyle { return {
        extend: [
            //#region clear browser's default styles
            (() => {
                const style = stripOuts.list;

                delete style.marginBlockStart;         // marginBlock  is already handled
                delete style.marginBlockEnd;           // marginBlock  is already handled
                delete style.marginInlineStart;        // marginInline is already handled
                delete style.marginInlineEnd;          // marginInline is already handled
                delete (style as any)['&>li'].display; // li's display is already handled

                return style;
            })(),
            //#endregion clear browser's default styles

            // hides browser's scrollbar
            stripOuts.scrollbar,
        ] as JssStyle,



        // layout:
        gridArea       : '1 / 1 / -1 / -1', // fills the entire grid areas, from the first row/column to the last row/column
        display        : 'flex',    // use block flexbox, so it takes the entire parent's width
        flexDirection  : 'row',     // items are stacked horizontally
        justifyContent : 'start',   // items are placed starting from the left
        alignItems     : 'stretch', // items height are follow the tallest one
        flexWrap       : 'nowrap',  // no wrapping



        // positions:
        position       : 'relative', // (optional) makes calculating slide's offsetLeft/offsetTop faster



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
        flexDirection   : 'row',    // the flex direction to horz, so we can adjust the content's height
        justifyContent  : 'center', // center the content horizontally
        alignItems      : 'center', // if the content's height is shorter than the section, place it at the center



        // sizes:
        boxSizing       : 'border-box',     // the final size is including borders & paddings
        inlineSize      : '100%',           // fills the entire parent's width
        flex            : [[0, 0, '100%']], // not growing, not shrinking, fills the entire parent's width



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
                display   : 'block',   // fills the entire parent's width
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
}
export const carouselStyles = new CarouselStyles();



// configs:

const cssConfig = new CssConfig(() => {
    return {
        //#region spacings
        paddingInline      : 0,
        paddingBlock       : 0,
        //#endregion spacings



        navBtnBorderRadius : 0,
    };
}, /*prefix: */'crsl');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// react components:

export interface CarouselItemProps<TElement extends HTMLElement = HTMLDivElement>
    extends
        ElementProps<TElement>
{
}
export function CarouselItem<TElement extends HTMLElement = HTMLDivElement>(props: CarouselItemProps<TElement>) {
    // jsx:
    return (
        <Element<TElement>
            // other props:
            {...props}


            // essentials:
            tag={props.tag ?? 'div'}


            // classes:
            mainClass={props.mainClass ?? ''}
        />
    );
}

export type { CarouselItemProps as ItemProps }
export { CarouselItem as Item }



export interface CarouselProps<TElement extends HTMLElement = HTMLElement>
    extends
        BasicComponentProps<TElement>
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
export default function Carousel<TElement extends HTMLElement = HTMLElement>(props: CarouselProps<TElement>) {
    // styles:
    const styles    = carouselStyles.useStyles();



    // rest props:
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
    ...restProps} = props;



    // fn props:
    const itemsTagFn = itemsTag ?? 'ul';
    const itemTagFn  = itemTag  ?? ['ul', 'ol'].includes(itemsTagFn) ? 'li' : 'div';



    // dom effects:
    const listRef   = useRef<HTMLElement|null>(null);



    // functions:
    const scrollBy  = (itemsElm: HTMLElement, nextSlide: boolean) => {
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
    const scrollTo  = (targetSlide: HTMLElement|null) => {
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



    // jsx:
    return (
        <BasicComponent<TElement>
            // other props:
            {...restProps}


            // variants:
            mild={props.mild ?? true}


            // classes:
            mainClass={props.mainClass ?? styles.main}
        >
            { children && <Element<TElement>
                    // essentials:
                    tag={itemsTagFn}
                    elmRef={(elm) => {
                        listRef.current = elm;
        
        
                        // forwards:
                        if (elmRef) {
                            if (typeof(elmRef) === 'function') {
                                elmRef(elm);
                            }
                            else {
                                (elmRef as React.MutableRefObject<TElement|null>).current = elm;
                            } // if
                        } // if
                    }}


                    // classes:
                    mainClass='items'
                >
                {(Array.isArray(children) ? children : [children]).map((child, index) => (
                    isTypeOf(child, CarouselItem)
                    ?
                    <child.type
                        // other props:
                        {...child.props}


                        // essentials:
                        key={child.key ?? index}
                        tag={child.props.tag ?? itemTagFn}
                    />
                    :
                    <CarouselItem
                        // essentials:
                        key={index}
                        tag={itemTagFn}
                    >
                        { child }
                    </CarouselItem>
                ))}
            </Element> }

            {
                //#region has class prevBtn
                isTypeOf(prevBtn, Element)
                &&
                prevBtn.props.classes?.includes('prevBtn')
                //#endregion has class prevBtn
                ?
                prevBtn
                :
                <NavButton
                    // classes:
                    classes={[
                        'prevBtn',
                    ]}


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
                isTypeOf(nextBtn, Element)
                &&
                nextBtn.props.classes?.includes('nextBtn')
                //#endregion has class nextBtn
                ?
                nextBtn
                :
                <NavButton
                    // classes:
                    classes={[
                        'nextBtn',
                    ]}


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
                    isTypeOf(nav, Element)
                    ?
                    <nav.type
                        // other props:
                        {...nav.props}


                        // essentials:
                        key={nav.key}


                        // classes:
                        classes={[...(nav.props.classes ?? []),
                            'nav', // inject nav class
                        ]}


                        {...(isTypeOf(nav, Navscroll) ? ({
                            // scrolls:
                            targetRef     : (nav.props as NavscrollProps).targetRef ?? listRef,
                            interpolation : (nav.props as NavscrollProps).interpolation ?? true,
                        } as NavscrollProps) : {})}
                    />
                    :
                    nav
                )
                :
                <Navscroll
                    // variants:
                    theme={props.theme}
                    size={props.size}
                    listStyle='bullet'
                    orientation='inline'


                    // behaviors:
                    actionCtrl={true}


                    // classes:
                    classes={[
                        'nav', // inject nav class
                    ]}


                    // scrolls:
                    targetRef={listRef}
                    interpolation={true}
                >
                    {children && (Array.isArray(children) ? children : [children]).map((child, index) => (
                        <NavscrollItem
                            // essentials:
                            key={index}
                            tag='button'


                            // accessibility:
                            {...(React.isValidElement<React.HTMLAttributes<HTMLElement>>(child) ? ({
                                title : child.props.title,
                            } as React.HTMLAttributes<HTMLElement>) : {})}
                        />
                    ))}
                </Navscroll>
            }
        </BasicComponent>
    );
}
export { Carousel }



interface NavButtonProps
    extends
        ButtonIconProps
{
}
function NavButton(props: NavButtonProps) {
    // jsx:
    return (
        <ButtonIcon
            // other props:
            {...props}


            // variants:
            size={props.size ?? 'lg'}
            gradient={props.gradient ?? true}
            btnStyle={props.btnStyle ?? 'ghost'}
        />
    );
}