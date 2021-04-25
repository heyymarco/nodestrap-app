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
import * as border          from './borders'     // configurable borders & border radiuses defs
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
    /* -- same as parent -- */



    // states:
    /* -- same as parent -- */



    // styles:
    public basicStyle(): JssStyle { return {
        extend: [
            stripOuts.list,                    // clear browser's default styles
            this.filterGeneralProps(cssProps), // apply *general* cssProps
        ] as JssStyle,



        // layout:
        display        : 'flex',    // use flexbox as the layout
        flexDirection  : 'column',  // child items stacked vertically
        justifyContent : 'start',   // child items placed starting from the top
        alignItems     : 'stretch', // child items width are 100% of the parent



        // sizes:
        minInlineSize  : 0, // See https://github.com/twbs/bootstrap/pull/22740#issuecomment-305868106



        // children:
        [wrapperElm]: { // wrapper element
            // layout:
            display: 'block',
    
    
    
            // borders:
            //#region make a nicely rounded corners
            //#region border-strokes as a separator
            border      : ecssProps.border,         // moved in from children
            borderColor : this.ref(this._borderFn), // moved in from children

            // remove double border by removing top-border starting from the second-child to the last-child
            '&:not(:first-child)': {
                borderBlockStartWidth: 0,
            },
            //#endregion border-strokes as a separator



            //#region border radiuses
            '&:first-child' : border.radius.top(ecssProps.borderRadius),    // moved in from children
            '&:last-child'  : border.radius.bottom(ecssProps.borderRadius), // moved in from children
            overflow        : 'hidden', // clip the children at the rounded corners
            //#endregion border radiuses
            //#endregion make a nicely rounded corners
    
    
    
            [listItemElm]: { // main child elements
                extend: [
                    super.basicStyle(), // copy basicStyle from base
                ] as JssStyle,
    


                // layout:
                display      : 'block',
    


                // borders:
                border       : [['none'], '!important'], // moved out to wrapper & prevent @keyframes to set the border
                borderColor  : undefined,                // moved out to wrapper
                borderRadius : [[0],      '!important'], // moved out to wrapper & prevent @keyframes to set the border radius
            } as JssStyle, // main child elements
        } as JssStyle, // wrapper element
    }}
    protected styles(): Styles<'main'> {
        const styles = super.styles();
        Object.assign(styles.main, {
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
        });
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
            // default props:
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
                        tag={wrapTag}
                        key={index}
                    >
                        {
                            ((child as React.ReactElement).type === ListGroupItem) ?
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
