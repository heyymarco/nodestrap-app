// react (builds html using javascript):
import {
    default as React,
}                           from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    PropEx,
    ClassList,
    PropList,


    // components:
    CssConfig,
}                           from './nodestrap'  // nodestrap's core
import {
    cssProps as bcssProps,
}                           from './BasicComponent'
import {
    IndicatorStyles,
    cssDecls as icssDecls,
    IndicatorProps,
    Indicator,
}                           from './Indicator'



// styles:

export class PopupStyles extends IndicatorStyles {
    // states:
    public /*override*/ states(inherit: boolean): ClassList { return [
        ...super.states(inherit), // copy states from base



        [ null, {
            [icssDecls.filterActive] : cssProps.filterActive,
            [icssDecls.animActive]   : cssProps.animActive,
            [icssDecls.animPassive]  : cssProps.animPassive,
        }],
    ]}

    public /*override*/ passived()    : JssStyle { return {
        extend: [
            super.passived(),
        ] as JssStyle,



        display: 'none', // hide the popup
    }}
    public /*override*/ toggleOnActive()                 : PropList { return {} } // no active colors
    public /*override*/ toggleOffActive(inherit = false) : PropList { return {} } // no active colors
    public /*override*/ themeActive(theme = 'secondary') : JssStyle { return {} } // no active theme



    // functions:
    public /*override*/ activePropsFn(): PropList { return {} } // no active colors
}
export const popupStyles = new PopupStyles();



// configs:

const cssConfig = new CssConfig(() => {
    const keyframesActive    : PropEx.Keyframes = {
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
    const keyframesPassive   : PropEx.Keyframes = {
        from  : keyframesActive.to,
        '30%' : keyframesActive['70%'],
        to    : keyframesActive.from,
    };


    
    return {
        //#endregion animations
        filterActive         : bcssProps.filterNone,

        '@keyframes active'  : keyframesActive,
        '@keyframes passive' : keyframesPassive,
        animActive           : [['300ms', 'ease-out', 'both', keyframesActive ]],
        animPassive          : [['500ms', 'ease-out', 'both', keyframesPassive]],
        //#endregion animations
    };
}, /*prefix: */'pop');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// react components:

export interface PopupProps<TElement extends HTMLElement = HTMLElement>
    extends
        IndicatorProps<TElement>
{
}
export default function Popup<TElement extends HTMLElement = HTMLElement>(props: PopupProps<TElement>) {
    // styles:
    const styles = popupStyles.useStyles();



    // jsx:
    return (
        <Indicator<TElement>
            // other props:
            {...props}


            // classes:
            mainClass={props.mainClass ?? styles.main}
        />
    );
}
export { Popup }