// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
}                           from 'jss'          // ts defs support for jss
import {
    Cust,
}                           from './Css'        // ts defs support for jss

// nodestrap (modular web components):
import {
    GenericElement,
}                           from './Element'
import type * as Elements   from './Element'
import {
    IndicatorStylesBuilder,
    useStateEnableDisable,
    useStateActivePassive,
}                           from './Indicator'
import type * as Indicators from './Indicator'



// styles:

export class ListGroupItemStylesBuilder extends IndicatorStylesBuilder {
    // swipe out all themes:
    // themes are already defined in ListGroup wrapper.
    public themeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle { return {}; }
    public sizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {}; }
    public gradient(): JssStyle { return {}; }
    public outlined(): JssStyle  { return {}; }



    // swipe out conditional themes:
    // conditional themes are already defined in ListGroup wrapper.
    public themesIf(): JssStyle  { return {}; }
}
export const styles = new ListGroupItemStylesBuilder();



// react components:

export interface Props
    extends
        Elements.GenericProps,
        Indicators.IndicationProps
{
    // children:
    children? : React.ReactNode
}
export default function ListGroupItem(props: Props) {
    const lgItmStyles  = styles.useStyles();

    // states:
    const stateEnbDis  = useStateEnableDisable(props);
    const stateActPass = useStateActivePassive(props);



    return (
        <GenericElement
            // other props:
            {...props}


            // classes:
            classes={[
                // main:
                (props.classes ? null : lgItmStyles.main),


                // additionals:
                ...(props.classes ?? []),


                // states:
                (stateEnbDis.class ?? (stateEnbDis.disabled ? 'disabled' : null)),
                stateActPass.class,
            ]}
        

            // events:
            onAnimationEnd={(e) => {
                // states:
                stateEnbDis.handleAnimationEnd(e);
                stateActPass.handleAnimationEnd(e);


                // forwards:
                props.onAnimationEnd?.(e);
            }}
        />
    );
}