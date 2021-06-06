// react (builds html using javascript):
import React                from 'react'       // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
    Styles,
}                           from 'jss'          // ts defs support for jss
import CssConfig            from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import * as stripOuts       from './strip-outs'
import spacers              from './spacers'    // configurable spaces defs
import * as border          from './borders'    // configurable borders & border radiuses defs
import {
    GenericElement,
    cssProps as ecssProps,
    useVariantOrientation,
    isTypeOf,
}                           from './Element'
import type {
    OrientationStyle,
    VariantOrientation,
}                           from './Element'
import {
    default  as Content,
    ContentStylesBuilder,
}                           from './Content'
import type * as Contents   from './Content'
import type {
    IControlStylesBuilder,
}                           from './Control'
import {
    styles as actionControlStyles,
}                           from './ActionControl'
import ListgroupItem        from './ListgroupItem'
import type * as ListgroupItems from './ListgroupItem'



// styles:

const wrapperElm  = '&>li, &>*';
const listItemElm = '&>*';

class ListItemStylesBuilder extends ContentStylesBuilder {
    // themes:
    public /*override*/ sizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {
        extend: [
            super.sizeOf(size, Size, sizeProp), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, Size)),
    }}



    // states:
    public /*override*/ watchStates(inherit = true): JssStyle {
        // change default inherit to true
        return super.watchStates(inherit);
    }



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base
        ] as JssStyle,


        
        // layout:
        display      : 'block',



        // sizes:
        flex         : [[1, 1]], // growable & shrinkable, the size fills the wrapper



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



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'item')), // apply *general* cssProps starting with item***
    }}
    public /*virtual*/ inlineStyle(): JssStyle { return {
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

        border       : ecssProps.border,         // reset border from blockStyle
        borderColor  : this.ref(this._borderFn), // reset border from blockStyle

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
        //#endregion strip out borders almost completely
    }}
}
const listItemStyles = new ListItemStylesBuilder();

class ListItemActionCtrlStylesBuilder extends ListItemStylesBuilder implements IControlStylesBuilder {
    //#region mixins
    protected /*override*/ applyStateNoAnimStartup(): JssStyle {
        // @ts-ignore
        return actionControlStyles.applyStateNoAnimStartup(); // copy no-anim-startup from ActionControl
    }
    //#endregion mixins



    // states:
    public /*implement*/ controlThemesIf(): JssStyle {
        return actionControlStyles.controlThemesIf(); // copy themes from ActionControl
    }
    public /*implement*/ controlStates(inherit = false): JssStyle {
        return actionControlStyles.controlStates(inherit); // copy states from ActionControl
    }
    
    public /*override*/ themesIf(): JssStyle { return {
        extend: [
            super.themesIf(), // copy themes from base

            this.controlThemesIf(),
        ] as JssStyle,
    }}
    public /*override*/ states(inherit = false): JssStyle { return {
        extend: [
            super.states(inherit), // copy states from base
            
            this.controlStates(/*inherit =*/false), // do not inherit: Listgroup doesn't have [hover, leave, focus, blur]
        ] as JssStyle,
    }}



    // functions:
    public /*implement*/ controlPropsFn(): JssStyle {
        return actionControlStyles.controlPropsFn(); // copy functional props from ActionControl
    }
    public /*implement*/ controlAnimFn(): JssStyle {
        return actionControlStyles.controlAnimFn(); // copy functional anim from ActionControl
    }

    public /*override*/ propsFn(): JssStyle { return {
        extend: [
            super.propsFn(), // copy functional props from base

            this.controlPropsFn(),
        ] as JssStyle,
    }}
    public /*override*/ animFn(): JssStyle {
        return this.controlAnimFn();
    }



    // styles:
    public /*implement*/ controlBasicStyle(): JssStyle {
        return actionControlStyles.controlBasicStyle(); // copy basicStyle from ActionControl
    }
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            stripOuts.control,  // clear browser's default styles

            super.basicStyle(), // copy basicStyle from base

            this.controlBasicStyle(),
        ] as JssStyle,
    }}
}
const listItemActionCtrlStyles = new ListItemActionCtrlStylesBuilder();

export class ListgroupStylesBuilder extends ContentStylesBuilder {
    // themes:
    public /*override*/ sizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {
        extend: [
            super.sizeOf(size, Size, sizeProp), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, Size)),
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
        display        : 'flex',    // use flexbox as the layout
        flexDirection  : 'column',  // items are stacked vertically
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
        border       : ecssProps.border,         // moved in from children
        borderColor  : this.ref(this._borderFn), // moved in from children
        //#endregion border-strokes



        //#region border radiuses
        borderRadius : ecssProps.borderRadius,   // moved in from children
        overflow     : 'hidden',                 // clip the children at the rounded corners
        //#endregion border radiuses
        //#endregion make a nicely rounded corners



        // shadows:
        boxShadow      : ecssProps.boxShadow, // moved in from children



        //#region children
        [wrapperElm]: { // wrapper of listItem
            // layout:
            display        : 'flex',    // use flexbox as the layout
            flexDirection  : 'column',  // listItems are stacked vertically (supports for the Accordion at blockStyle)
            justifyContent : 'stretch', // listItems height are 100% of the wrapper (the listItems also need to have growable & shrinkable)
            alignItems     : 'stretch', // listItems width  are 100% of the wrapper
    
    
    
            // borders:
            //#region border-strokes as a separator
            /*
                we play with top-border,
                because the top element is treated as the primary element
                and the next one is treated as the secondary, tertiary, and so on

                so if the secondary is hidden,
                the top-border separating the primary & secondary is also hidden
            */

            border       : ecssProps.border,         // moved in from children
            borderColor  : this.ref(this._borderFn), // moved in from children

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
    
    
    
            // children:
            [listItemElm]: {
                '&:not(.actionCtrl)' : listItemStyles.basicStyle(),
                '&.actionCtrl'       : listItemActionCtrlStyles.basicStyle(),
            },
        } as JssStyle, // wrapper of listItem
        '&:not(.bullet)' : {
            [wrapperElm] : {
                [listItemElm]: {
                    '&:not(.actionCtrl), &.actionCtrl': {
                        boxShadow : [['none'], '!important'], // no focus animation
                    },
                },
            },
        },
        //#endregion children



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
    public /*virtual*/ inlineStyle(): JssStyle { return {
        // layout:
        display        : 'inline-flex', // use flexbox as the layout
        flexDirection  : 'row',         // items are stacked horizontally



        //#region children
        [wrapperElm]: { // wrapper of listItem
            // layout:
            flexDirection  : 'row',  // listItems are stacked horizontally (supports for the Accordion at inlineStyle)



            // borders:
            //#region border-strokes as a separator
            /*
                we play with left-border,
                because the left element is treated as the primary element
                and the next one is treated as the secondary, tertiary, and so on

                so if the secondary is hidden,
                the left-border separating the primary & secondary is also hidden
            */

            border       : ecssProps.border,         // moved in from children
            borderColor  : this.ref(this._borderFn), // moved in from children

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



            // children:
            [listItemElm]: {
                '&:not(.actionCtrl)' : listItemStyles.inlineStyle(),
                '&.actionCtrl'       : listItemActionCtrlStyles.inlineStyle(),
            },
        } as JssStyle, // wrapper of listItem
        //#endregion children
    }}
    public /*virtual*/ bulletStyle(): JssStyle { return {
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
        '&, &.inline': { // for normal and .inline style
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
                    border       : ecssProps.border,         // moved in from children
                    borderColor  : this.ref(this._borderFn), // moved in from children
                    //#endregion border-strokes
    
    
    
                    //#region border radiuses
                    borderRadius : border.radiuses.pill, // big rounded corner
                    overflow     : 'hidden',             // clip the children at the rounded corners
                    //#endregion border radiuses
                    //#endregion bullet style border
    
    
    
                    // customize:
                    ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'bullet')), // apply *general* cssProps starting with bullet***
                },
            } as JssStyle,
        } as JssStyle, // wrapper of listItem
        //#endregion children
    }}
    protected /*override*/ styles(): Styles<'main'> {
        const styles = super.styles();
        styles.main = {
            extend: [
                styles.main,
                {
                    //#region forwards outlined to list items
                    /**
                     * -- fix imperfection by design --
                     * because outlined() depended on toggleOnOutlined() depended on propsFn()
                     * and we re-define propsFn() on [wrapperElm]>[listItemElm]
                     * so we need to re-define outlined() on [wrapperElm]>[listItemElm]
                     */
                    '&.outlined': {
                        [wrapperElm]: {
                            [listItemElm]: {
                                '&:not(.actionCtrl), &.actionCtrl': this.outlined(),
                            },
                        },
                    },
                    ...this.stateActive({
                        [wrapperElm]: {
                            [listItemElm]: {
                                '&:not(.actionCtrl), &.actionCtrl': {
                                    '&:not(._)': this.toggleOffOutlined(),
                                },
                            },
                        },
                    }),
                    //#endregion forwards outlined to list items
        
        
        
                    // children:
                    [wrapperElm]: {
                        [listItemElm]: {
                            '&:not(.actionCtrl)': {
                                extend: [
                                    // watch theme classes:
                                    listItemStyles.watchThemes(),
            
                                    // watch state classes/pseudo-classes:
                                    listItemStyles.watchStates(),
            
                                    // after watching => use func props:
                                    listItemStyles.propsFn(),
                                ] as JssStyle,
                            },
                            '&.actionCtrl': {
                                extend: [
                                    // watch theme classes:
                                    listItemActionCtrlStyles.watchThemes(),
            
                                    // watch state classes/pseudo-classes:
                                    listItemActionCtrlStyles.watchStates(),
            
                                    // after watching => use func props:
                                    listItemActionCtrlStyles.propsFn(),
                                ] as JssStyle,
                            },
                        },
                    },
                },
                {
                    '&.inline' : this.inlineStyle(),
                    '&.bullet' : this.bulletStyle(),
                },
            ] as JssStyle,
        };
        

        
        return styles;
    }
}
export const styles = new ListgroupStylesBuilder();



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

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        Contents.Props<TElement>,
        VariantOrientation,
        VariantList
{
}
export default function Listgroup<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    const lgStyles        = styles.useStyles();

    // themes:
    const variOrientation = useVariantOrientation(props);
    const variList        = useVariantList(props);



    const {
        // essentials:
        tag,


        // children:
        children,
        ...otherProps } = props;
    const parentTag = tag ?? 'ul';
    const wrapTag   = ['ul', 'ol'].includes(parentTag) ? 'li' : 'div';

    return (
        <Content<TElement>
            // other props:
            {...otherProps}


            // essentials:
            tag={parentTag}


            // accessibility:
            inheritActive={props.inheritActive ?? true} // if Listgroup is active => the ListGroupItems are also active
            

            // classes:
            mainClass={props.mainClass ?? lgStyles.main}
            themeClasses={[...(props.themeClasses ?? []),
                // themes:
                variOrientation.class,
                variList.class,
            ]}
        >
            {children && (Array.isArray(children) ? children : [children]).map((child, index) => (
                <GenericElement
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
                            actionCtrl={child.props.actionCtrl ?? props.actionCtrl} // the default value of [actionCtrl] is belong to Listgroup's [actionCtrl]

                            
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
                            actionCtrl={props.actionCtrl} // the default value of [actionCtrl] is belong to Listgroup's [actionCtrl]

                            
                            // events:
                            onAnimationEnd={(e) =>
                                // triggers Listgroup's onAnimationEnd event
                                e.currentTarget.parentElement?.parentElement?.dispatchEvent(new AnimationEvent('animationend', { animationName: e.animationName, bubbles: true }))
                            }
                        >
                            { child }
                        </ListgroupItem>
                    }
                </GenericElement>
            ))}
        </Content>
    );
}

export type { OrientationStyle, VariantOrientation }

export { ListgroupItem, ListgroupItem as Item }
export type { ListgroupItems, ListgroupItems as Items }