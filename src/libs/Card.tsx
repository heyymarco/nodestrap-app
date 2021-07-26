// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    RuleList,

    
    // components:
    CssConfig,
}                           from './nodestrap'  // nodestrap's core
import spacers              from './spacers'    // configurable spaces defs
import * as stripOuts       from './strip-outs'
import {
    OrientationStyle,
    VariantOrientation,
    useVariantOrientation,

    cssProps as bcssProps,
}                           from './BasicComponent'
import {
    ContentStyles,
    cssProps as ccssProps,
    ContentProps,
    Content,
}                           from './Content'
import Button               from './Button'



// styles:

export class CardStyles extends ContentStyles {
    // layouts:
    public /*override*/ layout(): JssStyle { return {
        // layouts:
     // display        : 'flex',        // customizable orientation // already defined in block()/inline()
     // flexDirection  : 'column',      // customizable orientation // already defined in block()/inline()
        justifyContent : 'start',       // items are placed starting from the top
        alignItems     : 'stretch',     // items width are 100% of the parent



        // sizes:
        minInlineSize  : 0, // See https://github.com/twbs/bootstrap/pull/22740#issuecomment-305868106
        


        // borders:
        //#region make a nicely rounded corners
        /*
            border & borderRadius are moved from children to here,
            for making consistent border color when the children's color are filtered.
            so we need to reconstruct the border & borderRadius here.
        */



        //#region border-strokes
        border       : bcssProps.border,          // moved in from children
        borderColor  : this.ref(this._borderCol), // moved in from children
        //#endregion border-strokes



        //#region border radiuses
        borderRadius : bcssProps.borderRadius, // moved in from children
        overflow     : 'hidden',               // clip the children at the rounded corners
        //#endregion border radiuses
        //#endregion make a nicely rounded corners



        // shadows:
        boxShadow    : bcssProps.boxShadow, // moved in from children



        // children:
        '&>header, &>.body, &>footer' : this.cardItemLayout(),
        '&>header, &>footer'          : this.cardCaptionLayout(),
        '&>header'                    : this.cardHeaderLayout(),
        '&>footer'                    : this.cardFooterLayout(),
        '&>.body'                     : this.cardBodyLayout(),



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
    protected /*virtual*/ cardItemLayout(): JssStyle { return {
        extend: [
            super.layout(), // copy layout from base
        ] as JssStyle,



        // layouts:
        display   : 'block', // fills the entire parent's width



        // strip out shadows:
        // moved from here to parent,
        boxShadow : undefined,



        //#region children
        //#region links
        // handle <a> as card-link:
        '&>a': {
            '&+a': { // following by another <a>
                // spacings:
                // add a space between links:
                marginInlineStart: cssProps.linkSpacing,
            } as JssStyle,



            // customize:
            ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'link')), // apply *general* cssProps starting with link***
        } as JssStyle,
        //#endregion links
        


        //#region images
        // handle <figure> & <img> as card-image:

        
        
        //#region first: reset top_level <figure> and inner <img>
        '&>figure': {
            extend: [
                stripOuts.figure, // clear browser's default styling on figure
            ] as JssStyle,



            // children:
            '&>img': {
                extend: [
                    stripOuts.image, // clear browser's default styling on image
                ] as JssStyle,



                // layouts:
                display: 'block', // fills the entire parent's width
            },
        },
        //#endregion first: reset top_level <figure> and inner <img>



        // then: styling top_level <figure> & top_level <img>:
        '&>figure, &>img': this.imageLayout(),
        //#endregion images
        //#endregion children



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'item')), // apply *general* cssProps starting with item***
    }}
    protected /*virtual*/ cardCaptionLayout(): JssStyle { return {
        // sizes:
        // default card's items height are unresizeable (excepts for the card's body):
        flex: [[0, 0]], // not growing, not shrinking



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'caption')), // apply *general* cssProps starting with caption***
    }}
    protected /*virtual*/ cardHeaderLayout(): JssStyle { return {
        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'header')), // apply *general* cssProps starting with header***
    }}
    protected /*virtual*/ cardFooterLayout(): JssStyle { return {
        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'footer')), // apply *general* cssProps starting with footer***
    }}
    protected /*virtual*/ cardBodyLayout(): JssStyle { return {
        // sizes:
        // default card's body height is resizeable, ensuring footers are aligned to the bottom:
        flex: [[1, 1]], // allows growing, allows shrinking



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'body')), // apply *general* cssProps starting with body***
    }}
    protected /*virtual*/ imageLayout(): JssStyle { return {
        extend: [
            stripOuts.image, // clear browser's default styling on image
        ] as JssStyle,



        // layouts:
        display: 'block', // fills the entire parent's width



        // sizes:
        // span to maximum width including parent's paddings:
        boxSizing      : 'border-box', // the final size is including borders & paddings
        inlineSize     : 'fill-available',
        fallbacks      : {
            inlineSize : [['calc(100% + (', cssProps.itemPaddingInline, ' * 2))']],
        },



        // spacings:
        // cancel-out parent's padding with negative margin:
        marginInline   : [['calc(0px -', cssProps.itemPaddingInline, ')']],
        marginBlock    : [['calc(0px -', cssProps.itemPaddingBlock,  ')']],

        // kill the top negative margin so the prev sibling can add a bottom space:
        '&:not(:first-child)': {
            marginBlockStart : 0,
        },

        // add a bottom space to the next sibling:
        '&:not(:last-child)': {
            marginBlockEnd   : cssProps.itemPaddingBlock,
        },



        // borders:
        //#region border-strokes as a separator
        border       : bcssProps.border,          // copy from children (can't inherit because border(Inline|Block)Width might have been modified)
        borderColor  : this.ref(this._borderCol), // copy from children (can't inherit because border(Inline|Block)Width might have been modified)

        borderInlineWidth         : 0, // remove (left|right)-border for all-images

        // remove top-border at the first-image, so that it wouldn't collide with the (header|body|footer)'s top-border
        '&:first-child': {
            borderBlockStartWidth : 0,
        },

        // remove bottom-border at the last-image, so that it wouldn't collide with the (header|body|footer)'s bottom-border
        '&:last-child': {
            borderBlockEndWidth   : 0,
        },
        //#endregion border-strokes as a separator



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'img')), // apply *general* cssProps starting with img***
    }}
    
    
    
    // variants:
    public /*override*/ variants(): RuleList { return [
        ...super.variants(), // copy variants from base



        [ ':not(.inline)', this.block()  ],
        [      '.inline' , this.inline() ],
    ]}

    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}

    public /*virtual*/ block(): JssStyle { return {
        // layouts:
        display        : 'flex',        // use block flexbox, so it takes the entire parent's width
        flexDirection  : 'column',      // items are stacked vertically



        // children:
        '&>header, &>.body, &>footer': {
            // borders:
            //#region strip out borders partially
            /*
                border & borderRadius are moved from here to parent,
                for making consistent border color when the element's color are filtered.
                so we need to disable the border & borderRadius here.
            */

        

            //#region border-strokes as a separator
            borderInlineWidth          : 0, // remove (left|right)-border for all-items

            // assumes the card *always* have a body, so the second-last-item is always a body
            // remove bottom-border at the last-item, so that it wouldn't collide with the Card's bottom-border
            // and
            // remove double border by removing bottom-border starting from the third-last-item to the first-item
            // and
            // an *exception* for the second-last-item (the body), do not remove the bottom-border, we need it for the replacement of the footer's top-border
            '&:not(:nth-last-child(2))': {
                borderBlockEndWidth    : 0,
            },

            // remove top-border at the header, so that it wouldn't collide with the Card's top-border
            // remove top-border at the footer, as the replacement => use second-last-item bottom-border (from the body)
            '&:first-child, &:last-child': {
                borderBlockStartWidth  : 0,
            },
            //#endregion border-strokes as a separator



            // border radiuses:
            borderRadius : 0, // strip out border radius
            //#endregion strip out borders partially
        } as JssStyle,
    }}
    public /*virtual*/ inline(): JssStyle { return {
        // layouts:
        display        : 'inline-flex', // use inline flexbox, so it takes the width & height as needed
        flexDirection  : 'row',         // items are stacked horizontally



        // children:
        '&>header, &>.body, &>footer': {
            // borders:
            //#region strip out borders partially
            /*
                border & borderRadius are moved from here to parent,
                for making consistent border color when the element's color are filtered.
                so we need to disable the border & borderRadius here.
            */

        

            //#region border-strokes as a separator
            borderBlockWidth           : 0, // remove (top|bottom)-border for all-items

            // assumes the card *always* have a body, so the second-last-item is always a body
            // remove right-border at the last-item, so that it wouldn't collide with the Card's right-border
            // and
            // remove double border by removing right-border starting from the third-last-item to the first-item
            // and
            // an *exception* for the second-last-item (the body), do not remove the right-border, we need it for the replacement of the footer's left-border
            '&:not(:nth-last-child(2))': {
                borderInlineEndWidth   : 0,
            },

            // remove left-border at the header, so that it wouldn't collide with the Card's left-border
            // remove left-border at the footer, as the replacement => use second-last-item right-border (from the body)
            '&:first-child, &:last-child': {
                borderInlineStartWidth : 0,
            },
            //#endregion border-strokes as a separator



            // border radiuses:
            borderRadius : 0, // strip out border radius
            //#endregion strip out borders partially
        } as JssStyle,
    }}
}
export const cardStyles = new CardStyles();



// configs:

const cssConfig = new CssConfig(() => {
    return {
        // typos:
        wordWrap          : 'break-word',



        // sizes:
        boxSizing         : 'border-box', // the final size is including borders & paddings
        blockSize         : '100%',       // fills the entire parent's height if the parent has a specific height, otherwise no effect



        // items:
        itemPaddingInline : ccssProps.paddingInline,
        itemPaddingBlock  : ccssProps.paddingBlock,

        
        
        // captions:
        captionFilter     : [['brightness(70%)', 'contrast(140%)']],



        // links:
        linkSpacing       : spacers.sm,
    };
}, /*prefix: */'crd');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// react components:

export interface CardProps<TElement extends HTMLElement = HTMLElement>
    extends
        ContentProps<TElement>,

        VariantOrientation
{
    // children:
    header? : React.ReactNode
    footer? : React.ReactNode
}
export default function Card<TElement extends HTMLElement = HTMLElement>(props: CardProps<TElement>) {
    // styles:
    const styles = cardStyles.useStyles();



    // variants:
    const variOrientation = useVariantOrientation(props);



    // rest props:
    const {
        // children:
        children,
        header,
        footer,
    ...restProps} = props;
    

    
    // handlers:
    const handleAnimationEnd = (e: React.AnimationEvent<HTMLElement>) => {
        // triggers `Card`'s onAnimationEnd event
        e.currentTarget.parentElement?.dispatchEvent(new AnimationEvent('animationend', { animationName: e.animationName, bubbles: true }))
    };



    // jsx:
    return (
        <Content<TElement>
            // other props:
            {...restProps}


            // essentials:
            tag={props.tag ?? 'article'}


            // classes:
            mainClass={props.mainClass ?? styles.main}
            variantClasses={[...(props.variantClasses ?? []),
                variOrientation.class,
            ]}
        >
            { header && <header
                // triggers `Card`'s onAnimationEnd event
                onAnimationEnd={handleAnimationEnd}
            >
                { header }
            </header> }
            { children && <div className='body'
                // triggers `Card`'s onAnimationEnd event
                onAnimationEnd={handleAnimationEnd}
            >
                {(Array.isArray(children) ? children : [children]).map((child, index) => (
                    (React.isValidElement(child) && (child.type === 'a'))
                    ?
                    <Button
                        // other props:
                        {...child.props}


                        // essentials:
                        key={child.key ?? index}
                        tag='a'


                        // variants:
                        btnStyle='link'
                    />
                    :
                    child
                ))}
            </div> }
            { footer && <footer
                // triggers `Card`'s onAnimationEnd event
                onAnimationEnd={handleAnimationEnd}
            >
                { footer }
            </footer> }
        </Content>
    );
}
export { Card }

export type { OrientationStyle, VariantOrientation }