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
import {
    GenericElement,
    cssProps as ecssProps,
}                           from './Element'
import {
    default  as Content,
    ContentStylesBuilder,
}                           from './Content'
import type * as Contents   from './Content'
import ListGroupItem        from './ListGroupItem'



// styles:

const wrapperElm  = '&>li, &>*';
const listItemElm = '&>*';

export class ListGroupStylesBuilder extends ContentStylesBuilder {
    // themes:
    public sizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {
        extend: [
            super.sizeOf(size, Size, sizeProp), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, Size)),
    }}



    // states:
    /* -- same as parent -- */



    // styles:
    protected listItemBasicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base
        ] as JssStyle,



        // layout:
        display      : 'block',



        // borders:
        //#region strip out borders completely
        /*
            border & borderRadius are moved from here to parent,
            for making consistent border color when the element's color are filtered.
            so we need to disable the border & borderRadius here.
        */



        borderWidth  : 0,
        borderRadius : 0,
        //#endregion strip out borders completely



        // strip out shadows:
        // moved from here to parent,
        boxShadow : undefined,



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'item')), // apply *general* cssProps starting with item***
    }}
    public basicStyle(): JssStyle { return {
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
        flexDirection  : 'column',  // child items stacked vertically
        justifyContent : 'start',   // child items placed starting from the top
        alignItems     : 'stretch', // child items width are 100% of the parent



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
        [wrapperElm]: { // wrapper element
            // layout:
            display: 'block',
    
    
    
            // borders:
            //#region make a nicely rounded corners
            /*
                border & borderRadius are moved from children to here,
                for making consistent border color when the children's color are filtered.
                so we need to reconstruct the border & borderRadius here.
            */



            //#region border-strokes as a separator
            border       : ecssProps.border,         // moved in from children
            borderColor  : this.ref(this._borderFn), // moved in from children

            borderInlineWidth         : 0,  // remove  (left|right)-border for all-wrapper

            // remove top-border at the first-child, so that it wouldn't collide with the listGroup's top-border
            // and
            // remove double border by removing top-border starting from the second-child to the last-child
            borderBlockStartWidth     : 0,

            // remove bottom-border at the last-child, so that it wouldn't collide with the listGroup's bottom-border
            '&:last-child': {
                borderBlockEndWidth   : 0,
            },
            //#endregion border-strokes as a separator
            //#endregion make a nicely rounded corners
    
    
    
            [listItemElm]: this.listItemBasicStyle(),
        } as JssStyle, // wrapper element
        //#endregion children



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
    protected styles(): Styles<'main'> {
        const styles = super.styles();
        styles.main = {
            extend: [
                styles.main,
                {
                    //#region forwards outlined to list items
                    /**
                     * -- fix imperfection by design --
                     * because outlined() depended on toggleOnOutlined() depended on fnProps()
                     * and we re-define fnProps() on [wrapperElm]>[listItemElm]
                     * so we need to re-define outlined() on [wrapperElm]>[listItemElm]
                     */
                    '&.outlined': {
                        [wrapperElm]: {
                            [listItemElm]: this.outlined(),
                        },
                    },
                    ...this.stateActive({
                        [wrapperElm]: {
                            [listItemElm]: {
                                '&:not(._)': this.toggleOffOutlined(),
                            },
                        },
                    }),
                    //#endregion forwards outlined to list items
        
        
        
                    // children:
                    [wrapperElm]: {
                        [listItemElm]: {
                            extend: [
                                // watch theme classes:
                                this.watchThemes(), // always inherit
        
                                // watch state classes/pseudo-classes:
                                this.watchStates(/*inherit =*/true),
        
                                // after watching => use func props:
                                this.fnProps(),
                            ] as JssStyle,
                        },
                    },
                },
            ] as JssStyle,
        };
        

        
        return styles;
    }
}
export const styles = new ListGroupStylesBuilder();



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
    };
}, /*prefix: */'lg');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// react components:

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        Contents.Props<TElement>
{
}
export default function ListGroup<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    const lgStyles = styles.useStyles();



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
            // essentials:
            tag={parentTag}


            // other props:
            {...otherProps}


            // main:
            mainClass={props.mainClass ?? lgStyles.main}
        >
            {
                children && (Array.isArray(children) ? children : [children]).map((child, index) =>
                    <GenericElement
                        // essentials:
                        key={index}
                        tag={wrapTag}
                    >
                        {
                            (React.isValidElement(child) && (child.type === ListGroupItem)) ?
                            child
                            :
                            <ListGroupItem
                                // events:
                                onAnimationEnd={(e) =>
                                    // triggers ListGroup's onAnimationEnd event
                                    e.currentTarget.parentElement?.parentElement?.dispatchEvent(new AnimationEvent('animationend', { animationName: e.animationName, bubbles: true }))
                                }
                            >
                                { child }
                            </ListGroupItem>
                        }
                    </GenericElement>
                )
            }
        </Content>
    );
}

export { ListGroupItem, ListGroupItem as Item }
