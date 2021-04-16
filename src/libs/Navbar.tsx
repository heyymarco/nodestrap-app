// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
    Styles,
}                           from 'jss'          // ts defs support for jss
import {
    PropEx,
    Cust,
}                           from './Css'        // ts defs support for jss
import CssConfig            from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.
import type {
    DictionaryOf,
}                           from './CssConfig'  // ts defs support for jss

// nodestrap (modular web components):
import colors               from './colors'     // configurable colors & theming defs
import spacers              from './spacers'    // configurable spaces defs
import {
    cssProps as ecssProps,
}                           from './Element'
import {
    cssProps as contCssProps,
}                           from './Container'
import {
    default  as Indicator,
    IndicatorStylesBuilder,
}                           from './Indicator'
import type * as Indicators from './Indicator'
import NavbarMenu           from './NavbarMenu'



// styles:

const menuElm = '& >.menu';

export class NavbarStylesBuilder extends IndicatorStylesBuilder {
    //#region scoped css props
    //#region foreground - active
    /**
     * actived themed foreground color.
     */
    public    readonly _foregActiveTh = 'foregActiveTh'

    /**
     * actived functional foreground color.
     */
    public    readonly _foregActiveFn = 'foregActiveFn'
    //#endregion foreground - active



    //#region background - active
    /**
     * actived themed background.
     */
    public    readonly _backgActiveTh = 'backgActiveTh'

    /**
     * actived functional backgrounds.
     */
    public    readonly _backgActiveFn = 'backgActiveFn'
    //#endregion background - active
    //#endregion scoped css props



    // themes:
    /* -- same as parent -- */



    // states:
    /* -- same as parent -- */



    // styles:
    public basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(),
            this.filterGeneralProps(cssProps), // apply *general* cssProps
        ] as JssStyle,



        // children:
        [menuElm]: { // main child elements
            extend: [
                super.basicStyle(), // copy basicStyle from base
            ] as JssStyle,



            // layout:
            display      : 'inline-block',
        } as JssStyle, // main child elements
    }}
    protected styles(): Styles<'main'> {
        const styles = super.styles();
        Object.assign(styles.main, {
            [menuElm]: {
                extend: [
                    // themes:
                    this.watchThemes(), // always inherit

                    // states:
                    this.watchStates(/*inherit =*/true),
                ] as JssStyle,
            },
        });
        return styles;
    }
}
export const styles = new NavbarStylesBuilder();



// configs:

const cssConfig = new CssConfig(() => {
    // common css values:
    // const initial = 'initial';
    // const unset   = 'unset';
    // const none    = 'none';
    // const inherit = 'inherit';
    // const center  = 'center';
    // const middle  = 'middle';


    const keyframesActive    : PropEx.Keyframes = {
        from: {
            //#region copy from Indicator
            filter: [[
                ecssProps.filter,
                styles.ref(styles._filterEnableDisable), // last priority, rarely happened
             // styles.ref(styles._filterActivePassive),
                styles.ref(styles._filterHoverLeave),    // first priority, serving smooth responsiveness
            ]],
            //#endregion copy from Indicator

            foreg: styles.ref(styles._foregFn),
            backg: styles.ref(styles._backgFn),
        },
        to: {
            //#region copy from Indicator
            filter: [[
                ecssProps.filter,
                styles.ref(styles._filterEnableDisable), // last priority, rarely happened
                styles.ref(styles._filterActivePassive),
                styles.ref(styles._filterHoverLeave),    // first priority, serving smooth responsiveness
            ]],
            //#endregion copy from Indicator

            foreg: styles.ref(styles._foregActiveFn),
            backg: styles.ref(styles._backgActiveFn),
        },
    };
    const keyframesPassive   : PropEx.Keyframes = {
        from : keyframesActive.to,
        to   : keyframesActive.from,
    };

    return {
        paddingInline        : contCssProps.paddingInline, // override to Element
        paddingBlock         : contCssProps.paddingBlock,  // override to Element


        // anim props:

        filterActive         : ecssProps.filterNone, // override to Indicator

        '@keyframes active'  : keyframesActive,      // override to Indicator
        '@keyframes passive' : keyframesPassive,     // override to Indicator
        animActive           : [['150ms', 'ease-out', 'both', keyframesActive ]], // override to Indicator
        animPassive          : [['300ms', 'ease-out', 'both', keyframesPassive]], // override to Indicator
    };
}, /*prefix: */'navb');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// react components:

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        Indicators.Props<TElement>
{
    // children:
    children? : React.ReactNode
}
export default function Navbar<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    const ctStyles = styles.useStyles();

    
    
    return (
        <Indicator<TElement>
            // default props:
            tag='nav'


            // other props:
            {...props}


            // main:
            mainClass={props.mainClass ?? ctStyles.main}
        >
            {
                props.children && (Array.isArray(props.children) ? props.children : [props.children]).map((child, index) =>
                    (
                        ((child as React.ReactElement).type === NavbarMenu) ?
                        child
                        :
                        <NavbarMenu
                            // events:
                            onAnimationEnd={(e) =>
                                // triggers ListGroup's onAnimationEnd event
                                e.currentTarget.parentElement?.parentElement?.dispatchEvent(new AnimationEvent('animationend', { animationName: e.animationName, bubbles: true }))
                            }
                        >
                            { child }
                        </NavbarMenu>
                    )
                )
            }
        </Indicator>
    );
}

export { NavbarMenu, NavbarMenu as Menu }