// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
}                           from 'jss'          // ts defs support for jss
import {
    PropEx,
}                           from './Css'        // ts defs support for jss
import CssConfig            from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import {
    cssProps as ecssProps,
    cssDecls as ecssDecls,
}                           from './Element'
import {
    default  as Check,
    CheckStylesBuilder,
}                           from './Check'
import type * as Checks     from './Check'
import typos                from './typos/index' // configurable typography (texting) defs



// styles:

const btnElm = '&>:nth-child(1n+2)';

export class TogglerMenuButtonStylesBuilder extends CheckStylesBuilder {
    //#region scoped css props
    /**
     * functional animations for the toggler top.
     */
    public    readonly _animTogglerTopFn    = 'animTogglerTopFn'
    /**
     * functional animations for the toggler middle.
     */
    public    readonly _animTogglerMidFn    = 'animTogglerMidFn'
    /**
     * functional animations for the toggler bottom.
     */
    public    readonly _animTogglerBtmFn    = 'animTogglerBtmFn'



    // anim props:

    protected readonly _animTogglerTopOnOff = 'animTogglerTopOnOff'
    protected readonly _animTogglerMidOnOff = 'animTogglerMidOnOff'
    protected readonly _animTogglerBtmOnOff = 'animTogglerBtmOnOff'
    //#endregion scoped css props



    // states:
    protected togglerFnProps(): JssStyle { return {
        // define an *animations* func for the toggler top:
        [this.decl(this._animTogglerTopFn)]: [
            this.ref(this._animTogglerTopOnOff),
        ],
        // define an *animations* func for the toggler middle:
        [this.decl(this._animTogglerMidFn)]: [
            this.ref(this._animTogglerMidOnOff),
        ],
        // define an *animations* func for the toggler bottom:
        [this.decl(this._animTogglerBtmFn)]: [
            this.ref(this._animTogglerBtmOnOff),
        ],
    }}
    protected togglerThemesIf(): JssStyle { return {}; }
    protected togglerStates(inherit = false): JssStyle { return {
        extend: [
            this.iif(!inherit, {
                //#region all initial states are none
                [this.decl(this._animTogglerTopOnOff)] : ecssProps.animNone,
                [this.decl(this._animTogglerMidOnOff)] : ecssProps.animNone,
                [this.decl(this._animTogglerBtmOnOff)] : ecssProps.animNone,
                //#endregion all initial states are none
            }),



            //#region specific states
            //#region check, clear
            this.stateCheck({ // [checking, checked]
                [this.decl(this._animTogglerTopOnOff)] : cssProps.togglerAnimOnTop,
                [this.decl(this._animTogglerMidOnOff)] : cssProps.togglerAnimOnMid,
                [this.decl(this._animTogglerBtmOnOff)] : cssProps.togglerAnimOnBtm,
            }),
            this.stateNotCheck({ // [not-checking, not-checked] => [clearing, cleared]
                [this.decl(this._animTogglerTopOnOff)] : cssProps.togglerAnimOffTop,
                [this.decl(this._animTogglerMidOnOff)] : cssProps.togglerAnimOffMid,
                [this.decl(this._animTogglerBtmOnOff)] : cssProps.togglerAnimOffBtm,
            }),
            this.stateNotCheckingClearing({ // if ctrl was fully checked/unchecked, disable the animation
                [btnElm]: {
                    '&>svg>*': super.applyStateNoAnimStartup(),
                },
            }),
            //#endregion check, clear
            //#endregion specific states
        ] as JssStyle,
    }}

    protected fnProps(): JssStyle { return {
        extend: [
            super.fnProps(), // copy functional props from base

            this.togglerFnProps(),
        ] as JssStyle,
    }}
    protected themesIf(): JssStyle { return {
        extend: [
            super.themesIf(), // copy themes from base

            this.togglerThemesIf(),
        ] as JssStyle,
    }}
    protected states(inherit = false): JssStyle { return {
        extend: [
            super.states(inherit), // copy states from base

            this.togglerStates(inherit),
        ] as JssStyle,
    }}



    // styles:
    protected basicTogglerStyle(): JssStyle { return {
        '&>svg': {
            // sizes:
            // fill the entire parent text's height:
            blockSize  : [['calc(1em *',
                `var(${ecssDecls.lineHeight},${typos.lineHeight})`,
            ')']],
            inlineSize : 'auto',    // calculates the width by [height * aspect-ratio]



            // children:
            '&>*': {
                // appearance:
                stroke        : 'currentColor', // set menu color as parent's font color
                strokeWidth   : 4,              // set menu thickness, 4 of 24 might enough
                strokeLinecap : 'square',       // set menu edges square
                
                
                
                // apply fn props:
                '&:nth-child(1)': {
                    anim : this.ref(this._animTogglerTopFn),
                },
                '&:nth-child(2)': {
                    anim : this.ref(this._animTogglerMidFn),
                },
                '&:nth-child(3)': {
                    anim : this.ref(this._animTogglerBtmFn),
                },
            },
        },
    }}
    public basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base
        ] as JssStyle,


        
        [btnElm] : this.basicTogglerStyle(),
    }}
}
export const styles = new TogglerMenuButtonStylesBuilder();



// configs:

const cssConfig = new CssConfig(() => {
    // common css values:
    // const initial = 'initial';
    // const unset   = 'unset';
    // const none    = 'none';
    // const inherit = 'inherit';
    // const center  = 'center';
    // const middle  = 'middle';


    // transform hamburger menu to cross menu
    const keyframesTogglerOnTop  : PropEx.Keyframes = {
        from: {
            transformOrigin: '50% 50%',

            transform: [['rotate(0deg)',   'scaleX(1)',    'translate(0, 0)',    ]],
        },
        '43%': {
            transform: [['rotate(-45deg)', 'scaleX(1.35)', 'translate(0, 37.5%)',]],
        },
        '71%': {
            transform: [['rotate(-75deg)', 'scaleX(1.35)', 'translate(0, 37.5%)',]],
        },
        to: {
            transformOrigin: '50% 50%',

            transform: [['rotate(-45deg)', 'scaleX(1.35)', 'translate(0, 37.5%)',]],
        },
    };
    const keyframesTogglerOnMid  : PropEx.Keyframes = {
        from: {
            transformOrigin: '50% 50%',

            transform: [['scaleX(1)',   ]],
        },
        '19%': {
            transform: [['scaleX(1.35)',]],
        },
        to: {
            transformOrigin: '50% 50%',

            transform: [['scaleX(0)',   ]],
        },
    };
    const keyframesTogglerOnBtm  : PropEx.Keyframes = {
        from: {
            transformOrigin: '50% 50%',

            transform: [['rotate(0deg)',   'scaleX(1)',    'translate(0, 0)',    ]],
        },
        '43%': {
            transform: [['rotate(45deg)',  'scaleX(1.35)', 'translate(0, -37.5%)',]],
        },
        '71%': {
            transform: [['rotate(75deg)',  'scaleX(1.35)', 'translate(0, -37.5%)',]],
        },
        to: {
            transformOrigin: '50% 50%',

            transform: [['rotate(45deg)',  'scaleX(1.35)', 'translate(0, -37.5%)',]],
        },
    };

    const keyframesTogglerOffTop : PropEx.Keyframes = {
        from : keyframesTogglerOnTop.to,
        '43%': keyframesTogglerOnTop.from,
        '71%': {
            transformOrigin: '91.7% 12.5%',
            transform: [['rotate(30deg)',  'scaleX(1)',    'translate(0, 0)',    ]],
        },
        to   : keyframesTogglerOnTop.from,
    };
    const keyframesTogglerOffMid : PropEx.Keyframes = {
        from : keyframesTogglerOnMid.to,
        '81%': keyframesTogglerOnMid['19%'],
        to   : keyframesTogglerOnMid.from,
    };
    const keyframesTogglerOffBtm : PropEx.Keyframes = {
        from : keyframesTogglerOnBtm.to,
        '43%': keyframesTogglerOnBtm.from,
        '71%': {
            transformOrigin: '91.7% 87.5%',
            transform: [['rotate(-30deg)', 'scaleX(1)',    'translate(0, 0)',     ]],
        },
        to   : keyframesTogglerOnBtm.from,
    };

    return {
        // anim props:

        '@keyframes togglerOnTop'  : keyframesTogglerOnTop,
        '@keyframes togglerOnMid'  : keyframesTogglerOnMid,
        '@keyframes togglerOnBtm'  : keyframesTogglerOnBtm,
        '@keyframes togglerOffTop' : keyframesTogglerOffTop,
        '@keyframes togglerOffMid' : keyframesTogglerOffMid,
        '@keyframes togglerOffBtm' : keyframesTogglerOffBtm,
        togglerAnimDuration        :   '300ms',
        togglerAnimOnTop           : [['300ms', 'ease-out', 'both', keyframesTogglerOnTop ]],
        togglerAnimOnMid           : [['300ms', 'ease-out', 'both', keyframesTogglerOnMid ]],
        togglerAnimOnBtm           : [['300ms', 'ease-out', 'both', keyframesTogglerOnBtm ]],
        togglerAnimOffTop          : [['300ms', 'ease-out', 'both', keyframesTogglerOffTop]],
        togglerAnimOffMid          : [['300ms', 'ease-out', 'both', keyframesTogglerOffMid]],
        togglerAnimOffBtm          : [['300ms', 'ease-out', 'both', keyframesTogglerOffBtm]],
    };
}, /*prefix: */'tgmn');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// react components:

export interface Props
    extends
        Checks.Props
{
}
export default function TogglerMenuButton(props: Props) {
    const togglerStyles = styles.useStyles();



    return (
        <Check
            // default props:
            aria-label='Toggle navigation'
            chkStyle='btn'
            enableValidation={false}


            // other props:
            {...props}


            // main:
            mainClass={props.mainClass ?? togglerStyles.main}
        >
            { props.children || (
                <svg viewBox='0 0 24 24'><polyline points='2,3 22,3' /><polyline points='2,12 22,12' /><polyline points='2,21 22,21' /></svg>
            ) }
        </Check>
    );
}