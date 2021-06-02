// react (builds html using javascript):
import React               from 'react'       // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
}                          from 'jss'          // ts defs support for jss
import {
    PropEx,
}                          from './Css'        // ts defs support for jss
import CssConfig           from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import {
    cssProps as ecssProps,
}                           from './Element'
import {
    default as Indicator,
    IndicatorStylesBuilder,
}                           from './Indicator'
import type * as Indicators from './Indicator'



// styles:

export class PopupStylesBuilder extends IndicatorStylesBuilder {
    //#region mixins
    protected /*override*/ applyStateActive(): JssStyle { return {} } // no changing themes & toggleOffOutlined
    //#endregion mixins


    
    // states:
    public /*override*/ indicationStates(inherit = false): JssStyle { return {
        extend: [
            super.indicationStates(inherit), // copy indicationStates from base



            //#region specific states
            //#region active, passive
            this.stateActivePassivating({ // [activating, actived, passivating]
                [this.decl(this._filterActivePassive)] : cssProps.filterActive,
            }),
            this.stateActive({ // [activating, actived]
                [this.decl(this._animActivePassive)]   : cssProps.animActive,
            }),
            this.statePassivating({ // [passivating]
                [this.decl(this._animActivePassive)]   : cssProps.animPassive,
            }),
            this.stateNotActivePassivating({ // hides the Popup if not [activating, actived, passivating]
                display: 'none',
            }),
            //#endregion active, passive
            //#endregion specific states
        ] as JssStyle,
    }}
}
export const styles = new PopupStylesBuilder();



// configs:

const cssConfig = new CssConfig(() => {
    // common css values:
    // const initial = 'initial';
    // const unset   = 'unset';
    // const none    = 'none';
    // const inherit = 'inherit';
    // const center  = 'center';
    // const middle  = 'middle';


    const keyframesActive  : PropEx.Keyframes = {
        from: {
            opacity   : 0,
            transform : 'scale(0)',
        },
        '70%': {
            transform : 'scale(1.1)',
        },
        to: {
            opacity   : 1,
            transform : 'scale(1)',
        },
    };
    const keyframesPassive : PropEx.Keyframes = {
        from  : keyframesActive.to,
        '30%' : keyframesActive['70%'],
        to    : keyframesActive.from,
    };


    return {
        // anim props:

        filterActive         : ecssProps.filterNone,

        '@keyframes active'  : keyframesActive,
        '@keyframes passive' : keyframesPassive,
        animActive           : [['300ms', 'ease-out', 'both', keyframesActive ]],
        animPassive          : [['500ms', 'ease-out', 'both', keyframesPassive]],
    };
}, /*prefix: */'pop');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// react components:

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        Indicators.Props<TElement>
{
}
export default function Popup<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    const popStyles = styles.useStyles();



    return (
        <Indicator<TElement>
            // other props:
            {...props}


            // classes:
            mainClass={props.mainClass ?? popStyles.main}
        />
    );
}