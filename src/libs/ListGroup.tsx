// react (builds html using javascript):
import React                from 'react'       // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
}                           from 'jss'          // ts defs support for jss

// nodestrap (modular web components):
import * as stripOuts       from './strip-outs'
import * as border          from './borders'     // configurable borders & border radiuses defs
import {
    default  as Element,
    cssProps as ecssProps,
}                           from './Element'
import type * as Elements   from './Element'
import {
    IndicatorStylesBuilder,
}                           from './Indicator'
import ListGroupItem        from './ListGroupItem'



// styles:

const wrapperElm  = '& >li, & >*';
const listItemElm = '& >*';

export class ListGroupStylesBuilder extends IndicatorStylesBuilder {
    // themes:
    /* -- same as parent -- */



    // states:
    // disable functional props & states:
    // func props & states will be delegated on ListGroupItem.
    protected fnProps(): JssStyle  { return {}; }
    protected states(): JssStyle  { return {}; }



    // styles:
    public basicStyle(): JssStyle { return {
        extend: [
            stripOuts.list,     // clear browser's default styles
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
            border: ecssProps.border, // moved in from children

            '&:not(:first-child)': { // only first-child having top-border
                borderTopWidth: 0,   // remove duplicate border
            },
            //#endregion border-strokes



            //#region border radiuses
            '&:first-child' : border.radius.top(ecssProps.borderRadius),    // moved in from children
            '&:last-child'  : border.radius.bottom(ecssProps.borderRadius), // moved in from children
            //#endregion border radiuses
            //#endregion make a nicely rounded corners
    
    
    
            [listItemElm]: { // main child elements
                extend: [
                    super.basicStyle(), // copy basicStyle from base
                ] as JssStyle,
    

                // borders:
                border        : [['none'], '!important'], // moved out to wrapper
                borderRadius  : [[0],      '!important'], // moved out to wrapper
    


                // layout:
                display       : 'block',
                position      : 'relative',
            } // main child elements
        }, // wrapper element
    }}
}
export const styles = new ListGroupStylesBuilder();



// react components:

export interface Props
    extends
        Elements.Props
{
}
export default function ListGroup(props: Props) {
    const lgStyles = styles.useStyles();



    return (
        <Element
            // default props:
            {...{
                tag : 'ul', // default [tag]=ul
            }}


            // other props:
            {...props}


            // classes:
            classes={[
                // main:
                (props.classes ? null : lgStyles.main),


                // additionals:
                ...(props.classes ?? []),
            ]}
        >
            {
                props.children && (Array.isArray(props.children) ? props.children : [props.children]).map((child, index) =>
                    <li key={index}>
                        <ListGroupItem>
                            { child }
                        </ListGroupItem>
                    </li>
                )
            }
        </Element>
    );
}
