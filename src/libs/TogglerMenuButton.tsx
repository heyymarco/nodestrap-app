// react (builds html using javascript):
import React                from 'react'         // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    PropEx,
    Cust,
    ClassList,
    PropList,


    // components:
    CssConfig,
}                           from './nodestrap'   // nodestrap's core
import typos                from './typos/index' // configurable typography (texting) defs
import {
    cssProps as ecssProps,
    cssDecls as ecssDecls,
}                           from './BasicComponent'
import {
    CheckStyles,
    CheckProps,
    Check,
}                           from './Check'



// styles:

const btnElm = '&>:nth-child(1n+2)';

export class TogglerMenuButtonStyles extends CheckStyles {
    //#region scoped css props
    /**
     * functional animations for the toggler top.
     */
    public    readonly _togglerTopAnimFn    = 'togglerTopAnimFn'
    /**
     * functional animations for the toggler middle.
     */
    public    readonly _togglerMidAnimFn    = 'togglerMidAnimFn'
    /**
     * functional animations for the toggler bottom.
     */
    public    readonly _togglerBtmAnimFn    = 'togglerBtmAnimFn'



    // anim props:

    protected readonly _togglerTopAnimOnOff = 'togglerTopAnimOnOff'
    protected readonly _togglerMidAnimOnOff = 'togglerMidAnimOnOff'
    protected readonly _togglerBtmAnimOnOff = 'togglerBtmAnimOnOff'
    //#endregion scoped css props



    // variants:
    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}



    // states:
    protected /*virtual*/ togglerThemesIf(): JssStyle { return {} }
    protected /*virtual*/ togglerStates(inherit = false): JssStyle { return {
        extend: [
            this.iif(!inherit, {
                //#region all initial states are none
                [this.decl(this._togglerTopAnimOnOff)] : ecssProps.animNone,
                [this.decl(this._togglerMidAnimOnOff)] : ecssProps.animNone,
                [this.decl(this._togglerBtmAnimOnOff)] : ecssProps.animNone,
                //#endregion all initial states are none
            }),



            //#region specific states
            //#region check, clear
            // this.stateCheck({ // [checking, checked]
            //     [this.decl(this._togglerTopAnimOnOff)] : cssProps.togglerTopAnimOn,
            //     [this.decl(this._togglerMidAnimOnOff)] : cssProps.togglerMidAnimOn,
            //     [this.decl(this._togglerBtmAnimOnOff)] : cssProps.togglerBtmAnimOn,
            // }),
            // this.stateNotCheck({ // [not-checking, not-checked] => [clearing, cleared]
            //     [this.decl(this._togglerTopAnimOnOff)] : cssProps.togglerTopAnimOff,
            //     [this.decl(this._togglerMidAnimOnOff)] : cssProps.togglerMidAnimOff,
            //     [this.decl(this._togglerBtmAnimOnOff)] : cssProps.togglerBtmAnimOff,
            // }),
            // this.stateNotCheckingClearing({ // if ctrl was fully checked/unchecked, disable the animation
            //     [btnElm]: {
            //         '&>svg>*': super.applyStateNoAnimStartupOld(),
            //     },
            // }),
            //#endregion check, clear
            //#endregion specific states
        ] as JssStyle,
    }}

    public /*override*/ themesIfOld(): JssStyle { return {
        extend: [
            super.themesIfOld(), // copy themes from base

            this.togglerThemesIf(),
        ] as JssStyle,
    }}
    public /*override*/ statesOld(inherit = false): JssStyle { return {
        extend: [
            super.statesOld(inherit), // copy states from base

            this.togglerStates(inherit),
        ] as JssStyle,
    }}



    // functions:
    protected /*virtual*/ togglerPropsFn(): JssStyle { return {
        ...this.togglerAnimFn(),
    }}
    protected /*virtual*/ togglerAnimFn(): JssStyle { return {
        // define an *animations* func for the toggler top:
        [this.decl(this._togglerTopAnimFn)]: [
            this.ref(this._togglerTopAnimOnOff),
        ],
        // define an *animations* func for the toggler middle:
        [this.decl(this._togglerMidAnimFn)]: [
            this.ref(this._togglerMidAnimOnOff),
        ],
        // define an *animations* func for the toggler bottom:
        [this.decl(this._togglerBtmAnimFn)]: [
            this.ref(this._togglerBtmAnimOnOff),
        ],
    }}

    public /*override*/ propsFnOld(): JssStyle { return {
        extend: [
            super.propsFnOld(), // copy functional props from base

            this.togglerPropsFn(),
        ] as JssStyle,
    }}



    // styles:
    protected /*virtual*/ togglerBasicStyle(): JssStyle { return {
        '&>svg': {
            // sizes:
            // fills the entire parent text's height:
            blockSize  : [['calc(1em *',
                `var(${ecssDecls.lineHeight},${typos.lineHeight})`,
            ')']],
            inlineSize : 'auto', // calculates the width by [height * aspect-ratio]



            // children:
            '&>*': {
                // appearances:
                stroke        : 'currentColor', // set menu color as parent's font color
                strokeWidth   : 4,              // set menu thickness, 4 of 24 might enough
                strokeLinecap : 'square',       // set menu edges square
                
                
                
                // apply fn props:
                '&:nth-child(1)': {
                    anim : this.ref(this._togglerTopAnimFn),
                },
                '&:nth-child(2)': {
                    anim : this.ref(this._togglerMidAnimFn),
                },
                '&:nth-child(3)': {
                    anim : this.ref(this._togglerBtmAnimFn),
                },
            },
        },
    }}
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base
        ] as JssStyle,


        
        [btnElm] : this.togglerBasicStyle(),



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
}
export const togglerMenuButtonStyles = new TogglerMenuButtonStyles();



// configs:

const cssConfig = new CssConfig(() => {
    // transforms hamburger menu to cross menu
    const keyframesTogglerTopOn  : PropEx.Keyframes = {
        from: {
            transformOrigin : '50% 50%',

            transform       : [['rotate(0deg)',   'scaleX(1)',    'translate(0, 0)',     ]],
        },
        '43%': {
            transform       : [['rotate(-45deg)', 'scaleX(1.35)', 'translate(0, 37.5%)', ]],
        },
        '71%': {
            transform       : [['rotate(-75deg)', 'scaleX(1.35)', 'translate(0, 37.5%)', ]],
        },
        to: {
            transformOrigin : '50% 50%',

            transform       : [['rotate(-45deg)', 'scaleX(1.35)', 'translate(0, 37.5%)', ]],
        },
    };
    const keyframesTogglerMidOn  : PropEx.Keyframes = {
        from: {
            transformOrigin : '50% 50%',

            transform       : [['scaleX(1)',   ]],
        },
        '19%': {
            transform       : [['scaleX(1.35)',]],
        },
        to: {
            transformOrigin : '50% 50%',

            transform       : [['scaleX(0)',   ]],
        },
    };
    const keyframesTogglerBtmOn  : PropEx.Keyframes = {
        from: {
            transformOrigin : '50% 50%',

            transform       : [['rotate(0deg)',   'scaleX(1)',    'translate(0, 0)',     ]],
        },
        '43%': {
            transform       : [['rotate(45deg)',  'scaleX(1.35)', 'translate(0, -37.5%)',]],
        },
        '71%': {
            transform       : [['rotate(75deg)',  'scaleX(1.35)', 'translate(0, -37.5%)',]],
        },
        to: {
            transformOrigin : '50% 50%',

            transform       : [['rotate(45deg)',  'scaleX(1.35)', 'translate(0, -37.5%)',]],
        },
    };

    
    
    const keyframesTogglerTopOff : PropEx.Keyframes = {
        from : keyframesTogglerTopOn.to,
        '43%': keyframesTogglerTopOn.from,
        '71%': {
            transformOrigin : '91.7% 12.5%',
            transform       : [['rotate(30deg)',  'scaleX(1)',    'translate(0, 0)',    ]],
        },
        to   : keyframesTogglerTopOn.from,
    };
    const keyframesTogglerMidOff : PropEx.Keyframes = {
        from : keyframesTogglerMidOn.to,
        '81%': keyframesTogglerMidOn['19%'],
        to   : keyframesTogglerMidOn.from,
    };
    const keyframesTogglerBtmOff : PropEx.Keyframes = {
        from : keyframesTogglerBtmOn.to,
        '43%': keyframesTogglerBtmOn.from,
        '71%': {
            transformOrigin : '91.7% 87.5%',
            transform       : [['rotate(-30deg)', 'scaleX(1)',    'translate(0, 0)',     ]],
        },
        to   : keyframesTogglerBtmOn.from,
    };

    
    
    return {
        //#region animations
        '@keyframes togglerTopOn'  : keyframesTogglerTopOn,
        '@keyframes togglerMidOn'  : keyframesTogglerMidOn,
        '@keyframes togglerBtmOn'  : keyframesTogglerBtmOn,
        '@keyframes togglerTopOff' : keyframesTogglerTopOff,
        '@keyframes togglerMidOff' : keyframesTogglerMidOff,
        '@keyframes togglerBtmOff' : keyframesTogglerBtmOff,
        togglerAnimDuration        :   '300ms',
        togglerTopAnimOn           : [['300ms', 'ease-out', 'both', keyframesTogglerTopOn ]],
        togglerMidAnimOn           : [['300ms', 'ease-out', 'both', keyframesTogglerMidOn ]],
        togglerBtmAnimOn           : [['300ms', 'ease-out', 'both', keyframesTogglerBtmOn ]],
        togglerTopAnimOff          : [['300ms', 'ease-out', 'both', keyframesTogglerTopOff]],
        togglerMidAnimOff          : [['300ms', 'ease-out', 'both', keyframesTogglerMidOff]],
        togglerBtmAnimOff          : [['300ms', 'ease-out', 'both', keyframesTogglerBtmOff]],
        //#endregion animations
    };
}, /*prefix: */'tgmn');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// react components:

export interface Props
    extends
        CheckProps
{
}
export default function TogglerMenuButton(props: Props) {
    // styles:
    const styles = togglerMenuButtonStyles.useStyles();



    // jsx fn props:
    const childrenFn = (() => {
        // default (unset):
        if (props.children === undefined) return (
            <svg viewBox='0 0 24 24'><polyline points='2,3 22,3' /><polyline points='2,12 22,12' /><polyline points='2,21 22,21' /></svg>
        );



        // other component:
        return props.children;
    })();



    // jsx:
    return (
        <Check
            // other props:
            {...props}


            // accessibility:
            aria-expanded={props.active}
            label={props.label ?? 'Toggle navigation'}


            // validations:
            enableValidation={props.enableValidation ?? false}


            // variants:
            chkStyle={props.chkStyle ?? 'btn'}


            // classes:
            mainClass={props.mainClass ?? styles.main}
        >
            { childrenFn }
        </Check>
    );
}
TogglerMenuButton.prototype = Check.prototype; // mark as Check compatible
export { TogglerMenuButton }