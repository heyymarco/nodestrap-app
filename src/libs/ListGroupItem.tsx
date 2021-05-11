// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    default as Indicator,
    useStateActivePassive,
}                           from './Indicator'
import Control              from './Control'
import type * as Controls   from './Control'



// react components:

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        Controls.Props<TElement>
{
    // children:
    children? : React.ReactNode
}
export default function ListGroupItem<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    // states:
    const stateActPass = useStateActivePassive({}, {
        active  : 'press',
        actived : 'pressed',
        passive : 'release',
    });



    const {
        // behaviors:
        actionCtrl,
        ...otherProps } = props;

    return (
        actionCtrl
        ?
        <Control<TElement>
            // behaviors:
            actionCtrl={false}


            // other props:
            {...otherProps}


            // classes:
            mainClass={props.mainClass ?? 'actionCtrl'}
            stateClasses={[...(props.stateClasses ?? []),
                // states:
                stateActPass.class,
            ]}
        

            // events:
            onMouseDown={(e) => { stateActPass.handleMouseDown(); props.onMouseDown?.(e); }}
            onKeyDown=  {(e) => { stateActPass.handleKeyDown();   props.onKeyDown?.(e);   }}
            onMouseUp=  {(e) => { stateActPass.handleMouseUp();   props.onMouseUp?.(e);   }}
            onKeyUp=    {(e) => { stateActPass.handleKeyUp();     props.onKeyUp?.(e);     }}
            onAnimationEnd={(e) => {
                // states:
                stateActPass.handleAnimationEnd(e);


                // forwards:
                props.onAnimationEnd?.(e);
            }}
        />
        :
        <Indicator<TElement>
            // other props:
            {...otherProps}


            // classes:
            mainClass={props.mainClass ?? ''}
        />
    );
}