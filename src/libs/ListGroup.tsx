// react (builds html using javascript):
import React                from 'react'       // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
    Styles,
}                           from 'jss'          // ts defs support for jss

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

const wrapperElm  = '& >li, & >*';
const listItemElm = '& >*';

export class ListGroupStylesBuilder extends ContentStylesBuilder {
    // themes:
    /* -- same as parent -- */



    // states:
    /* -- same as parent -- */



    // styles:
    public basicStyle(): JssStyle { return {
        extend: [
            stripOuts.list, // clear browser's default styles
        ] as JssStyle,



        // layout:
        display        : 'flex',    // use flexbox as the layout
        flexDirection  : 'column',  // child items stacked vertically
        justifyContent : 'start',   // child items placed starting from the top
        alignItems     : 'stretch', // child items width are 100% of the parent



        // children:
        [wrapperElm]: { // wrapper element
            // layout:
            display: 'block',
    
    
    
            // borders:
            //#region make a nicely rounded corners
            //#region border-strokes
            border      : ecssProps.border,         // moved in from children
            borderColor : this.ref(this._borderFn), // moved in from children

            '&:not(:first-child)': { // only first-child having top-border
                borderBlockStartWidth: 0,
            },
            //#endregion border-strokes



            //#region border radiuses
            '&:first-child' : border.radius.top(ecssProps.borderRadius),    // moved in from children
            '&:last-child'  : border.radius.bottom(ecssProps.borderRadius), // moved in from children
            overflow        : 'hidden', // clip overflowed children at the rounded corner
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
                        // themes:
                        this.watchThemes(), // always inherit

                        // states:
                        this.watchStates(/*inherit =*/true),
                    ] as JssStyle,
                },
            },
        });
        return styles;
    }
}
export const styles = new ListGroupStylesBuilder();



// react components:

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        Contents.Props<TElement>
{
}
export default function ListGroup<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    const lgStyles = styles.useStyles();



    const { tag, ...otherProps } = props;
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
                props.children && (Array.isArray(props.children) ? props.children : [props.children]).map((child, index) =>
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
