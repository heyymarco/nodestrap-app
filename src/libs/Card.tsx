// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
}                           from 'jss'          // ts defs support for jss
import CssConfig            from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import * as stripOuts       from './strip-outs'
import spacers              from './spacers'    // configurable spaces defs
import {
    cssProps as ecssProps,
}                           from './BasicComponent'
import {
    default  as Content,
    ContentStylesBuilder,
    cssProps as ccssProps,
}                           from './Content'
import type * as Contents   from './Content'
import Button               from './Button'



// styles:

export class CardStylesBuilder extends ContentStylesBuilder {
    // variants:
    public /*override*/ size(size: string, Size: string): JssStyle { return {
        extend: [
            super.size(size, Size), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, Size)),
    }}



    // states:
    /* -- same as parent -- */



    // styles:
    protected /*virtual*/ imageBasicStyle(): JssStyle { return {
        extend: [
            stripOuts.image, // removes browser's default styling on image
        ] as JssStyle,



        // layout:
        display: 'block', // fill the entire parent's width



        // sizes:
        // span to maximum width including parent's paddings:
        boxSizing      : 'border-box', // the final size is including borders & paddings
        inlineSize     : 'fill-available',
        fallbacks      : {
            inlineSize : [['calc(100% + (', ccssProps.paddingInline, ' * 2))']],
        },



        // spacings:
        // cancel-out parent's padding with negative margin:
        marginInline : [['calc(0px -', ccssProps.paddingInline, ')']],
        marginBlock  : [['calc(0px -', ccssProps.paddingBlock,  ')']],

        // kill the top negative margin so the prev sibling can add a bottom space:
        '&:not(:first-child)': {
            marginBlockStart : 0,
        },

        // add a bottom space to the next sibling:
        '&:not(:last-child)': {
            marginBlockEnd   : ccssProps.paddingBlock,
        },



        // borders:
        //#region border-strokes as a separator
        border       : ecssProps.border,         // copy from children (can't inherit because border(Inline|Block)Width might have been modified)
        borderColor  : this.ref(this._borderFn), // copy from children (can't inherit because border(Inline|Block)Width might have been modified)

        borderInlineWidth         : 0,  // remove (left|right)-border for all-children

        // remove top-border at the first-child, so that it wouldn't collide with the (header|body|footer)'s top-border
        '&:first-child': {
            borderBlockStartWidth : 0,
        },

        // remove bottom-border at the last-child, so that it wouldn't collide with the (header|body|footer)'s bottom-border
        '&:last-child': {
            borderBlockEndWidth   : 0,
        },
        //#endregion border-strokes as a separator
    }}
    protected /*virtual*/ cardItemBasicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base
        ] as JssStyle,



        // layout:
        display: 'block',



        // borders:
        //#region strip out borders partially
        /*
            border & borderRadius are moved from here to parent,
            for making consistent border color when the element's color are filtered.
            so we need to disable the border & borderRadius here.
        */

       

        //#region border-strokes as a separator
        borderInlineWidth         : 0,  // remove (left|right)-border for all-children

        // remove bottom-border at the last-child, so that it wouldn't collide with the Card's bottom-border
        // and
        // remove double border by removing bottom-border starting from the third-last-child to the first-child
        // and
        // *exception* for the second-last-child, do not remove the bottom-border, we need it as the replacement for the footer's top-border
        // assumes the card *always* have a body, so the second-last-child always a body
        // a rare case the card only have a header & a footer, so the separator is from header (might affected by header's css filter)
        '&:not(:nth-last-child(2))': {
            borderBlockEndWidth   : 0,
        },

        // remove top-border at the first-child, so that it wouldn't collide with the Card's top-border
        // remove top-border at the footer, as the replacement => use second-last-child bottom-border
        '&:first-child, &:last-child': {
            borderBlockStartWidth : 0,
        },
        //#endregion border-strokes as a separator



        //#region border radiuses
        borderRadius : 0,
        //#endregion border radiuses
        //#endregion strip out borders partially



        // strip out shadows:
        // moved from here to parent,
        boxShadow : undefined,



        //#region children
        //#region links
        // handle <a> as card-link:
        '&>a': {
            '&+a': {
                // spacings:
                // add a space between links:
                marginInlineStart: cssProps.linkSpacing,
            },



            // customize:
            ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'link')), // apply *general* cssProps starting with link***
        },
        //#endregion links
        


        //#region images
        // handle <figure> & <img> as card-image:
        '&>figure': {
            extend: [
                stripOuts.figure, // clear browser's default styles
            ] as JssStyle,



            // children:
            '&>img': {
                extend: [
                    stripOuts.image, // removes browser's default styling on image
                ] as JssStyle,



                // layout:
                display: 'block', // fill the entire parent's width
            },
        },
        '&>figure, &>img': this.imageBasicStyle(), // figure & img are special content
        '&>figure>img, &>img': {
            // customize:
            ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'img')), // apply *general* cssProps starting with img***
        },
        //#endregion images
        //#endregion children



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'item')), // apply *general* cssProps starting with item***
    }}
    protected /*virtual*/ cardCaptionBasicStyle(): JssStyle { return {
        // sizes:
        // default card items' height are unresizeable (excepts for card's body):
        flex: [[0, 0]], // not growing, not shrinking



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'caption')), // apply *general* cssProps starting with caption***
    }}
    protected /*virtual*/ cardHeaderBasicStyle(): JssStyle { return {
        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'header')), // apply *general* cssProps starting with header***
    }}
    protected /*virtual*/ cardFooterBasicStyle(): JssStyle { return {
        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'footer')), // apply *general* cssProps starting with footer***
    }}
    protected /*virtual*/ cardBodyBasicStyle(): JssStyle { return {
        // sizes:
        // Enable `flex-grow: 1` for decks and groups so that card blocks take up
        // as much space as possible, ensuring footers are aligned to the bottom.
        flex: [[1, 1]], // allows growing, allows shrinking



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'body')), // apply *general* cssProps starting with body***
    }}
    public /*override*/ basicStyle(): JssStyle { return {
        // layout:
        display        : 'flex',    // use flexbox as the layout
        flexDirection  : 'column',  // items are stacked vertically
        justifyContent : 'start',   // items are placed starting from the top
        alignItems     : 'stretch', // items width are 100% of the parent



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
        border       : ecssProps.border,         // moved in from children
        borderColor  : this.ref(this._borderFn), // moved in from children
        //#endregion border-strokes



        //#region border radiuses
        borderRadius : ecssProps.borderRadius,   // moved in from children
        overflow     : 'hidden',                 // clip the children at the rounded corners
        //#endregion border radiuses
        //#endregion make a nicely rounded corners



        // shadows:
        boxShadow    : ecssProps.boxShadow,      // moved in from children



        // children:
        '&>header, &>.body, &>footer' : this.cardItemBasicStyle(),
        '&>header, &>footer'          : this.cardCaptionBasicStyle(),
        '&>header'                    : this.cardHeaderBasicStyle(),
        '&>footer'                    : this.cardFooterBasicStyle(),
        '&>.body'                     : this.cardBodyBasicStyle(),



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
}
export const styles = new CardStylesBuilder();



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
        boxSizing     : 'border-box', // the final size is including borders & paddings
        blockSize     : '100%',       // set height to maximum if parent container has specific height, otherwise no effect

        // typos:
        wordWrap      : 'break-word',

        captionFilter : [['brightness(70%)', 'contrast(140%)']],



        linkSpacing   : spacers.sm,
    };
}, /*prefix: */'crd');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// react components:

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        Contents.Props<TElement>
{
    // children:
    header? : React.ReactNode
    footer? : React.ReactNode
}
export default function Card<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    // styles:
    const crdStyles = styles.useStyles();



    // rest props:
    const {
        // children:
        children,
        header,
        footer,
    ...restProps} = props;
    

    
    // handlers:
    const handleAnimationEnd = (e: React.AnimationEvent<HTMLElement>) => {
        // triggers Card's onAnimationEnd event
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
            mainClass={props.mainClass ?? crdStyles.main}
        >
            { header && <header
                // triggers Card's onAnimationEnd event
                onAnimationEnd={handleAnimationEnd}
            >
                { header }
            </header> }
            { children && <div className='body'
                // triggers Card's onAnimationEnd event
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
                // triggers Card's onAnimationEnd event
                onAnimationEnd={handleAnimationEnd}
            >
                { footer }
            </footer> }
        </Content>
    );
}