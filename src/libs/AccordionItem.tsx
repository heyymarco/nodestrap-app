// react (builds html using javascript):
import
    React, {
    useState,
    useEffect,
    useRef,
}                           from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
    Styles,
}                           from 'jss'          // ts defs support for jss
import CssConfig            from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import {
    GenericElement,
}                           from './Element'
import {
    IndicatorStylesBuilder,
    useDynActivation,
}                           from './Indicator'
import type * as Indicators from './Indicator'
import ListgroupItem        from './ListgroupItem'
import type * as ListgroupItems from './ListgroupItem'



// styles:

const bodyElm   = '&~*';

export class AccordionItemStylesBuilder extends IndicatorStylesBuilder {
    // themes:
    // disable theming:
    public /*override*/ watchThemes(): JssStyle { return {} }


    
    // states:
    public /*override*/ states(inherit = false): JssStyle { return {
        extend: [
            super.states(inherit), // copy states from base



            //#region specific states
            //#region active, passive
            this.stateNotActivePassivating({ // hides the modal if not [activating, actived, passivating]
                [bodyElm]: {
                    display: 'none',
                },
            }),
            //#endregion active, passive
            //#endregion specific states
        ] as JssStyle,
    }}



    // styles:
    protected /*virtual*/ bodyBasicStyle(): JssStyle { return {
    }}
    public /*override*/ basicStyle(): JssStyle { return {
        // extend: [
        //     super.basicStyle(), // copy basicStyle from base
        // ] as JssStyle,



        // children:
        [bodyElm]: this.bodyBasicStyle(),
    }}
}
export const styles = new AccordionItemStylesBuilder();



// react components:

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        ListgroupItems.Props<TElement>,
        Indicators.DynActivationProps
{
    // accessibility:
    label?          : string | React.ReactNode
}
export default function AccordionItem<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    const accItemStyles         = styles.useStyles();

    // states:
    const [isActive, setActive] = useDynActivation(props);

    
    
    const {
        // accessibility:
        label,

        /*delete*/ defaultActive,
        /*delete*/ active,
        /*delete*/ onActiveChange,


        // children:
        children,
        ...otherProps } = props;
    
    return (<>
        <ListgroupItem
            // essentials:
            tag='h1'


            // behaviors:
            actionCtrl={true}


            // accessibility:
            active={isActive}


            // other props:
            {...otherProps}


            // classes:
            mainClass={props.mainClass ?? [
                accItemStyles.main,
                'actionCtrl',
            ].join(' ')}


            // events:
            onClick={(e) => {
                // backwards:
                props.onClick?.(e);
                
                
                
                if (!e.defaultPrevented) setActive(!isActive);
            }}
        >
            { label }
        </ListgroupItem>
        <GenericElement>
            { children }
        </GenericElement>
    </>);
}
AccordionItem.prototype = ListgroupItem.prototype;