// react (builds html using javascript):
import React                from 'react'       // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    Styles,
    ClassList,

    
    // components:
    CssConfig,
    Element,

    
    // utils:
    isTypeOf,
}                           from './nodestrap'   // nodestrap's core
import * as stripOuts       from './strip-outs'
import spacers              from './spacers'    // configurable spaces defs
import * as border          from './borders'    // configurable borders & border radiuses defs
import {
    OrientationStyle,
    VariantOrientation,
    useVariantOrientation,
    cssProps as ecssProps,
}                           from './BasicComponent'
import {
    ContentStyles,
    ContentProps,
    Content,
}                           from './Content'
import {
    ActionControlStyles,
}                           from './ActionControl'
import ListgroupItem        from './ListgroupItem'
import type * as ListgroupItems from './ListgroupItem'



// styles:

const wrapperElm  = '&>li, &>*';
const listItemElm = '&>*';

class ListgroupItemStyles extends ContentStyles {
    // variants:
    public /*override*/ variants(): ClassList { return [
        ...super.variants(), // copy variants from base


        
        [ '*:not(.inline)>*>&', this.block() ],
        [      '*.inline>*>&' , this.inline() ],
    ]}
    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}
    public /*virtual*/ block(): JssStyle { return {
        // borders:
        //#region strip out borders almost completely
        /*
            border & borderRadius are moved from here to parent,
            for making consistent border color when the element's color are filtered.
            so we need to disable the border & borderRadius here.
        */



        //#region border-strokes as a separator
        /*
            supports for AccordionItem:
            preserve the top-border for the AccordionItem's body,
            so it has a clear boundary between its header & body.

            we play with top-border,
            so if the AccordionItem's body is hidden,
            the top-border separating the header & body is also hidden
        */

        borderInlineWidth         : 0, // remove (left|right)-border for all-items

        // remove bottom-border at the last-item, so that it wouldn't collide with the wrapper's bottom-border
        // and
        // remove double border by removing bottom-border starting from the second-last-item to the first-item
        borderBlockEndWidth       : 0,

        // remove top-border at the first-item, so that it wouldn't collide with the wrapper's top-border
        '&:first-child': {
            borderBlockStartWidth : 0,
        },
        //#endregion border-strokes as a separator



        // border radiuses:
        borderRadius : 0, // strip out border radius
        //#endregion strip out borders almost completely



        // strip out shadows:
        // moved from here to parent,
        boxShadow : undefined as unknown as null,
    }}
    public /*virtual*/ inline(): JssStyle { return {
        // borders:
        //#region strip out borders almost completely
        /*
            border & borderRadius are moved from here to parent,
            for making consistent border color when the element's color are filtered.
            so we need to disable the border & borderRadius here.
        */
       
        
        
        //#region border-strokes as a separator
        /*
            supports for AccordionItem:
            preserve the left-border for the AccordionItem's body,
            so it has a clear boundary between its header & body.

            we play with left-border,
            so if the AccordionItem's body is hidden,
            the left-border separating the header & body is also hidden
        */

        borderBlockWidth           : 0, // remove (top|bottom)-border for all-items

        // remove right-border at the last-item, so that it wouldn't collide with the wrapper's right-border
        // and
        // remove double border by removing right-border starting from the second-last-item to the first-item
        borderInlineEndWidth       : 0,

        // remove left-border at the first-item, so that it wouldn't collide with the wrapper's left-border
        '&:first-child': {
            borderInlineStartWidth : 0,
        },
        //#endregion border-strokes as a separator



        // border radiuses:
        borderRadius : 0, // strip out border radius
        //#endregion strip out borders almost completely



        // strip out shadows:
        // moved from here to parent,
        boxShadow : undefined as unknown as null,
    }}



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base
        ] as JssStyle,


        
        // layout:
        display : 'block',



        // sizes:
        flex    : [[1, 1]], // growable & shrinkable, the size fills the wrapper
    }}
}

class ListgroupActionItemStyles extends ActionControlStyles {
    // states:
    public /*override*/ active()      : JssStyle { return {
        extend: [
            super.active(),

            super.markActive(), // keeps mark active on active
        ] as JssStyle,
    }}
    public /*override*/ markActive() : JssStyle { return {} } // do not mark active on focus, arrive
    
    
    
    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base
        ] as JssStyle,



        // strip out borders:
        border      : undefined,
        borderColor : undefined,
        borderRadius: undefined,



        // strip out shadows:
        boxShadow   : undefined,
    }}
}

export class ListgroupStyles extends ContentStyles {
    // variants:
    public /*override*/ variants(): ClassList { return [
        ...super.variants(), // copy variants from base



        [ '&:not(.inline)', this.block()  ],
        [      '&.inline',  this.inline() ],

        [ '&.bullet', this.bullet()       ],
        [ '&:not(.bullet)', {
            [wrapperElm] : {
                [listItemElm]: {
                    '&:not(.actionCtrl), &.actionCtrl': {
                        boxShadow : [['none'], '!important'], // no focus animation
                    },
                },
            },
        }]
    ]}
    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}
    public /*virtual*/ block(): JssStyle { return {
        // layout:
        display           : 'flex',   // use flexbox as the layout
        flexDirection     : 'column', // items are stacked vertically



        //#region children
        [wrapperElm]: { // wrapper of listItem
            // layout:
            flexDirection : 'column', // listItems are stacked vertically (supports for the Accordion at blockStyle)
    
    
    
            // borders:
            //#region border-strokes as a separator
            /*
                we play with top-border,
                because the top element is treated as the primary element
                and the next one is treated as the secondary, tertiary, and so on

                so if the secondary is hidden,
                the top-border separating the primary & secondary is also hidden
            */

            border       : ecssProps.border,       // moved in from children
            borderColor  : this.ref(this._border), // moved in from children

            borderInlineWidth         : 0, // remove (left|right)-border for all-wrappers

            // remove bottom-border at the last-child, so that it wouldn't collide with the Listgroup's bottom-border
            // and
            // remove double border by removing bottom-border starting from the second-last-child to the first-child
            borderBlockEndWidth       : 0,

            // remove top-border at the first-child, so that it wouldn't collide with the Listgroup's top-border
            '&:first-child': {
                borderBlockStartWidth : 0,
            },
            //#endregion border-strokes as a separator
        } as JssStyle, // wrapper of listItem
        //#endregion children
    }}
    public /*virtual*/ inline(): JssStyle { return {
        // layout:
        display        : 'inline-flex', // use flexbox as the layout
        flexDirection  : 'row',         // items are stacked horizontally



        //#region children
        [wrapperElm]: { // wrapper of listItem
            // layout:
            flexDirection  : 'row',     // listItems are stacked horizontally (supports for the Accordion at inlineStyle)



            // borders:
            //#region border-strokes as a separator
            /*
                we play with left-border,
                because the left element is treated as the primary element
                and the next one is treated as the secondary, tertiary, and so on

                so if the secondary is hidden,
                the left-border separating the primary & secondary is also hidden
            */

            border       : ecssProps.border,       // moved in from children
            borderColor  : this.ref(this._border), // moved in from children

            borderBlockWidth           : 0, // remove (top|bottom)-border for all-wrappers

            // remove right-border at the last-child, so that it wouldn't collide with the Listgroup's right-border
            // and
            // remove double border by removing right-border starting from the second-last-child to the first-child
            borderInlineEndWidth       : 0,

            // remove left-border at the first-child, so that it wouldn't collide with the Listgroup's left-border
            '&:first-child': {
                borderInlineStartWidth : 0,
            },
            //#endregion border-strokes as a separator
        } as JssStyle, // wrapper of listItem
        //#endregion children
    }}
    public /*virtual*/ bullet(): JssStyle { return {
        // layout:
        alignItems   : 'center', // child items are centered horizontally



        // borders:
        // kill borders surrounding Listgroup:
        borderWidth  : 0,
        borderRadius : 0,
        overflow     : 'unset',



        // spacings:
        // add space between bullets:
        gap          : cssProps.bulletSpacing,



        //#region children
        '&:not(.inline), &.inline': { // for .block and .inline style
            [wrapperElm]: { // wrapper of listItem
                // kill separator between bullets:
                borderWidth : 0,
            },
        } as JssStyle, // wrapper of listItem

        [wrapperElm]: { // wrapper of listItem
            // children:
            [listItemElm]: {
                '&:not(.actionCtrl), &.actionCtrl': {
                    // borders:
                    //#region bullet style border
                    //#region border-strokes
                    border       : ecssProps.border,       // moved in from children
                    borderColor  : this.ref(this._border), // moved in from children
                    //#endregion border-strokes
    
    
    
                    //#region border radiuses
                    borderRadius : border.radiuses.pill,   // big rounded corner
                    overflow     : 'hidden',               // clip the children at the rounded corners
                    //#endregion border radiuses
                    //#endregion bullet style border
    
    
    
                    // customize:
                    ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'bullet')), // apply *general* cssProps starting with bullet***
                },
            } as JssStyle,
        } as JssStyle, // wrapper of listItem
        //#endregion children
    }}



    // states:
    /* -- same as parent -- */



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            //#region clear browser's default styles
            (() => {
                const style = stripOuts.list;
                delete (style as any)['&>li'].display;

                return style;
            })(),
            //#endregion clear browser's default styles
        ] as JssStyle,



        // layout:
        justifyContent : 'center',  // items are placed starting from the center and then spread to both sides
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
        border       : ecssProps.border,       // moved in from children
        borderColor  : this.ref(this._border), // moved in from children
        //#endregion border-strokes



        //#region border radiuses
        borderRadius : ecssProps.borderRadius, // moved in from children
        overflow     : 'hidden',               // clip the children at the rounded corners
        //#endregion border radiuses
        //#endregion make a nicely rounded corners



        // shadows:
        boxShadow    : ecssProps.boxShadow, // moved in from children



        //#region children
        [wrapperElm]: { // wrapper of listItem
            // layout:
            display        : 'flex',    // use flexbox as the layout
            justifyContent : 'stretch', // listItems height are 100% of the wrapper (the listItems also need to have growable & shrinkable)
            alignItems     : 'stretch', // listItems width  are 100% of the wrapper
        } as JssStyle, // wrapper of listItem
        //#endregion children



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
    protected /*override*/ styles(): Styles<'main'|'@global'> {
        const styles                    = super.styles();
        const listgroupItemStyles       = new ListgroupItemStyles();
        const listgroupActionItemStyles = new ListgroupActionItemStyles();



        styles.main = {
            extend: [
                styles.main,

                {
                    [wrapperElm]: { [listItemElm]: {
                        extend: [
                            // watch variant classes:
                            listgroupItemStyles.useVariants(),
                
                            // watch state classes/pseudo-classes:
                            listgroupItemStyles.useStates(),
                            
                            // after watching => use func props:
                            listgroupItemStyles.usePropsFn(),

                            // all the required stuff has been loaded,
                            // now load the basicStyle:
                            listgroupItemStyles.basicStyle(),
                        ] as JssStyle,



                        '&.actionCtrl': { extend: [
                            // watch variant classes:
                            listgroupActionItemStyles.useVariants(),
                
                            // watch state classes/pseudo-classes:
                            listgroupActionItemStyles.useStates(),
                            
                            // after watching => use func props:
                            listgroupActionItemStyles.usePropsFn(),

                            // all the required stuff has been loaded,
                            // now load the basicStyle:
                            listgroupActionItemStyles.basicStyle(),
                        ] as JssStyle },



                        // customize:
                        '&:not(.actionCtrl), &.actionCtrl': this.filterGeneralProps(this.filterPrefixProps(cssProps, 'item')), // apply *general* cssProps starting with item***
                    }},
                },
            ] as JssStyle,
        };



        return styles;
    }
}
export const listgroupStyles = new ListgroupStyles();



// configs:

const cssConfig = new CssConfig(() => {
    return {
        //#region spacings
        bulletSpacing   : spacers.sm,
        bulletSpacingSm : spacers.xs,
        bulletSpacingLg : spacers.md,
        
        bulletPadding   : spacers.xs,
        bulletPaddingSm : spacers.xxs,
        bulletPaddingLg : spacers.sm,
        //#endregion spacings
    };
}, /*prefix: */'lg');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// hooks:

export type ListStyle = 'bullet' // might be added more styles in the future
export interface VariantList {
    listStyle?: ListStyle
}
export function useVariantList(props: VariantList) {
    return {
        class: props.listStyle ? props.listStyle : null,
    };
}



// react components:

export interface ListgroupProps<TElement extends HTMLElement = HTMLElement>
    extends
        ContentProps<TElement>,

        VariantOrientation,
        VariantList
{
}
export default function Listgroup<TElement extends HTMLElement = HTMLElement>(props: ListgroupProps<TElement>) {
    // styles:
    const styles          = listgroupStyles.useStyles();

    
    
    // variants:
    const variOrientation = useVariantOrientation(props);
    const variList        = useVariantList(props);



    // rest props:
    const {
        // essentials:
        tag,


        // behaviors:
        actionCtrl,


        // children:
        children,
    ...restProps} = props;



    // fn props:
    const parentTag = tag ?? 'ul';
    const wrapTag   = ['ul', 'ol'].includes(parentTag) ? 'li' : 'div';



    // jsx:
    return (
        <Content<TElement>
            // other props:
            {...restProps}


            // essentials:
            tag={parentTag}
            

            // classes:
            mainClass={props.mainClass ?? styles.main}
            variantClasses={[...(props.variantClasses ?? []),
                variOrientation.class,
                variList.class,
            ]}
        >
            {children && (Array.isArray(children) ? children : [children]).map((child, index) => (
                <Element
                    // essentials:
                    key={index}
                    tag={wrapTag}
                >
                    {
                        isTypeOf(child, ListgroupItem)
                        ?
                        <child.type
                            // other props:
                            {...child.props}


                            // behaviors:
                            actionCtrl={child.props.actionCtrl ?? actionCtrl} // the default value of [actionCtrl] is belong to Listgroup's [actionCtrl]

                            
                            // events:
                            onAnimationEnd={(e) => {
                                // triggers Listgroup's onAnimationEnd event
                                e.currentTarget.parentElement?.parentElement?.dispatchEvent(new AnimationEvent('animationend', { animationName: e.animationName, bubbles: true }));


                                // forwards:
                                child.props.onAnimationEnd?.(e);
                            }}
                        />
                        :
                        <ListgroupItem
                            // behaviors:
                            actionCtrl={actionCtrl} // the default value of [actionCtrl] is belong to Listgroup's [actionCtrl]

                            
                            // events:
                            onAnimationEnd={(e) =>
                                // triggers Listgroup's onAnimationEnd event
                                e.currentTarget.parentElement?.parentElement?.dispatchEvent(new AnimationEvent('animationend', { animationName: e.animationName, bubbles: true }))
                            }
                        >
                            { child }
                        </ListgroupItem>
                    }
                </Element>
            ))}
        </Content>
    );
}
export { Listgroup }

export type { OrientationStyle, VariantOrientation }

export { ListgroupItem, ListgroupItem as Item }
export type { ListgroupItems, ListgroupItems as Items }