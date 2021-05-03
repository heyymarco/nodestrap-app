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
import colors              from './colors'     // configurable colors & theming defs
import {
    default  as Element,
    GenericElement,
    cssProps as ecssProps,
    ElementStylesBuilder,
}                          from './Element'
import type * as Elements  from './Element'
import CarouselItem        from './CarouselItem'



// styles:

const itemsElm = '&>.items';
const itemElm  = '&>.items>*';

export class CarouselStylesBuilder extends ElementStylesBuilder {
    // styles:
    public basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base
        ] as JssStyle,



        // layout:
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
        ...otherProps } = props;
    const itemsTag2 = itemsTag ?? 'ul';
    const itemTag2  = itemTag  ?? ['ul', 'ol'].includes(itemsTag2) ? 'li' : 'div';

    return (
        <Element<TElement>
            // other props:
            {...otherProps}


            // main:
            mainClass={props.mainClass ?? crslStyles.main}


            // classes:
            classes={[
                // additionals:
                ...(props.classes ?? []),


                // states:
                // TODO: add states here
            ]}
        

            // events:
            // TODO: add events here
        >
            { children && <GenericElement tag={itemsTag2} mainClass='items'>{
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
            }</GenericElement> }
        </Element>
    );
}

export { CarouselItem, CarouselItem as Item }