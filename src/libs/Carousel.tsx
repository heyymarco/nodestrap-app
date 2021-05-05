// react (builds html using javascript):
import
    React, {
    useState,
    useEffect,
}                          from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
}                          from 'jss'          // ts defs support for jss
import {
    PropEx,
}                          from './Css'        // ts defs support for jss
import CssConfig           from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import * as stripOuts      from './strip-outs'
import colors              from './colors'     // configurable colors & theming defs
import {
    default  as Element,
    GenericElement,
    cssProps as ecssProps,
    ElementStylesBuilder,
}                          from './Element'
import type * as Elements  from './Element'
import CarouselItem        from './CarouselItem'
import Button              from './ButtonIcon'
import type * as Buttons   from './ButtonIcon'



// styles:

const itemsElm     = '&>.items';                // .items is the slideList
const itemElm      = '&>.items>li, &>.items>*'; // any children inside the slideList are slideItem
const indicatorElm = '&>.indicators';
const prevBtnElm   = '&>.prevBtn';
const nextBtnElm   = '&>.nextBtn';

export class CarouselStylesBuilder extends ElementStylesBuilder {
    // themes:
    public sizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {
        extend: [
            super.sizeOf(size, Size, sizeProp), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, Size)),
    }}



    // styles:
    protected carouselItemsBasicStyle(): JssStyle { return {
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
    protected carouselItemBasicStyle(): JssStyle { return {
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
        scrollSnapStop  : 'always', // scrolls one by one



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
    protected navBtnBasicStyle(): JssStyle { return {
        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'navBtn')), // apply *general* cssProps starting with navBtn***
    }}
    protected prevBtnBasicStyle(): JssStyle { return {
        // layout:
        gridArea : 'prevBtn',



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'prevBtn')), // apply *general* cssProps starting with prevBtn***
    }}
    protected nextBtnBasicStyle(): JssStyle { return {
        // layout:
        gridArea : 'nextBtn',



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'nextBtn')), // apply *general* cssProps starting with nextBtn***
    }}
    public basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base
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
            '".... indicator ...."',
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
    children?  : React.ReactNode
    prevBtn?   : React.ReactChild | boolean
    nextBtn?   : React.ReactChild | boolean
    indicator? : React.ReactChild | boolean
}
export default function Carousel<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    const crslStyles = styles.useStyles();

    // states:
    // TODO: add states here



    const {
        // essentials:
        itemsTag,
        itemTag,


        // children:
        children,
        prevBtn,
        nextBtn,
        indicator,
        ...otherProps } = props;
    const itemsTag2 = itemsTag ?? 'ul';
    const itemTag2  = itemTag  ?? ['ul', 'ol'].includes(itemsTag2) ? 'li' : 'div';

    return (
        <Element<TElement>
            // other props:
            {...otherProps}


            // classes:
            mainClass={props.mainClass ?? crslStyles.main}
        

            // events:
            // TODO: add events here
        >
            <GenericElement tag={itemsTag2} mainClass='items'>{
                (Array.isArray(children) ? children : [children]).map((child, index) =>
                    (
                        (React.isValidElement(child) && (child.type === CarouselItem))
                        ?
                        <child.type
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
                    )
                )
            }</GenericElement>

            {
                React.isValidElement(prevBtn)
                &&
                (
                    (Array.isArray(prevBtn.props.classes) && prevBtn.props.classes.includes('prevBtn'))
                    ||
                    (/(?<!\w)prevBtn(?!\w)/).test(prevBtn.props.className)
                )
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
                        const itemsElm = e.currentTarget.parentElement?.querySelector('.items') as HTMLElement;
                        if (!itemsElm) return;



                        const colGap = Number.parseInt(itemsElm.style.columnGap || '0');
                        if (itemsElm.scrollLeft > 0) {
                            const scrollMove = ((itemsElm.clientWidth + colGap) / 2) + 1;
                            itemsElm.scrollBy(-scrollMove, 0); // move to left a half, the scrollSnap will help scrolling to the prev slide
                        }
                        else {
                            const lastItem = itemsElm.lastElementChild as HTMLElement;
                            if (lastItem) {
                                const scrollPos = lastItem.offsetLeft - ((lastItem.offsetWidth + colGap) / 2) + 1;
                                itemsElm.scroll(scrollPos, 0); // move to a bit after the middle pos of the last slide, the scrollSnap will help scrolling to the last pos
                            } // if
                        } // if
                    }}
                >
                    { prevBtn }
                </NavButton>
            }

            {
                React.isValidElement(nextBtn)
                &&
                (
                    (Array.isArray(nextBtn.props.classes) && nextBtn.props.classes.includes('nextBtn'))
                    ||
                    (/(?<!\w)nextBtn(?!\w)/).test(nextBtn.props.className)
                )
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
                        const itemsElm = e.currentTarget.parentElement?.querySelector('.items') as HTMLElement;
                        if (!itemsElm) return;



                        const colGap = Number.parseInt(itemsElm.style.columnGap || '0');
                        if (itemsElm.scrollLeft < (itemsElm.scrollWidth - itemsElm.clientWidth)) {
                            const scrollMove = ((itemsElm.clientWidth + colGap) / 2) + 1;
                            itemsElm.scrollBy(scrollMove, 0); // move to right a half, the scrollSnap will help scrolling to the next slide
                        }
                        else {
                            const firstItem = itemsElm.firstElementChild as HTMLElement;
                            if (firstItem) {
                                const scrollPos = firstItem.offsetLeft + ((firstItem.offsetWidth + colGap) / 2) - 1;
                                itemsElm.scroll(scrollPos, 0); // move to a bit before the middle pos of the first slide, the scrollSnap will help scrolling to the zero pos
                            } // if
                        } // if
                    }}
                >
                    { nextBtn }
                </NavButton>
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