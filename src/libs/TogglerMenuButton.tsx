// react (builds html using javascript):
import React                from 'react'         // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    PropEx,
    Cust,
    PropList,


    // components:
    CssConfig,
}                           from './nodestrap'   // nodestrap's core
import {
    usePropActive,
}                           from './accessibilities'
import typos                from './typos/index' // configurable typography (texting) defs
import {
    cssDecls as bcssDecls,
}                           from './BasicComponent'
import {
    CheckStyles,
    CheckProps,
    Check,
}                           from './Check'



// styles:

const svgElm = '&>:nth-child(1n+2)>svg';

export class TogglerMenuButtonStyles extends CheckStyles {
    //#region props
    //#region finals
    /**
     * final transform for the svg top.
     */
    public    readonly _svgTopTransf = 'svgTopTransf'
    /**
     * final transform for the svg middle.
     */
    public    readonly _svgMidTransf = 'svgMidTransf'
    /**
     * final transform for the svg bottom.
     */
    public    readonly _svgBtmTransf = 'svgBtmTransf'

    /**
     * final animation for the svg top.
     */
    public    readonly _svgTopAnim   = 'svgTopAnim'
    /**
     * final animation for the svg middle.
     */
    public    readonly _svgMidAnim   = 'svgMidAnim'
    /**
     * final animation for the svg bottom.
     */
    public    readonly _svgBtmAnim   = 'svgBtmAnim'
    //#endregion finals



    //#region animations
    public    readonly _svgTopTransfToggleOn  = 'svgTopTransfToggleOn'
    public    readonly _svgMidTransfToggleOn  = 'svgMidTransfToggleOn'
    public    readonly _svgBtmTransfToggleOn  = 'svgBtmTransfToggleOn'

    public    readonly _svgTopTransfToggleOff = 'svgTopTransfToggleOff'
    public    readonly _svgMidTransfToggleOff = 'svgMidTransfToggleOff'
    public    readonly _svgBtmTransfToggleOff = 'svgBtmTransfToggleOff'

    protected readonly _svgTopAnimToggle      = 'svgTopAnimToggle'
    protected readonly _svgMidAnimToggle      = 'svgMidAnimToggle'
    protected readonly _svgBtmAnimToggle      = 'svgBtmAnimToggle'
    //#endregion animations
    //#endregion props



    // variants:
    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}



    // states:
    public /*override*/ resetActivePassive(inherit: boolean) : PropList { return {
        ...super.resetActivePassive(inherit), // copy resetActivePassive from base



        [this.decl(this._svgTopTransfToggleOn)]  : inherit ? 'unset' : 'initial',
        [this.decl(this._svgMidTransfToggleOn)]  : inherit ? 'unset' : 'initial',
        [this.decl(this._svgBtmTransfToggleOn)]  : inherit ? 'unset' : 'initial',

        [this.decl(this._svgTopTransfToggleOff)] : inherit ? 'unset' : 'initial',
        [this.decl(this._svgMidTransfToggleOff)] : inherit ? 'unset' : 'initial',
        [this.decl(this._svgBtmTransfToggleOff)] : inherit ? 'unset' : 'initial',

        [this.decl(this._svgTopAnimToggle)]      : inherit ? 'unset' : 'initial',
        [this.decl(this._svgMidAnimToggle)]      : inherit ? 'unset' : 'initial',
        [this.decl(this._svgBtmAnimToggle)]      : inherit ? 'unset' : 'initial',
    }}
    public /*override*/ actived()     : JssStyle { return {
        extend: [
            super.actived(), // copy actived from base
        ] as JssStyle,



        [this.decl(this._svgTopTransfToggleOn)]  : cssProps.svgTopTransfOn,
        [this.decl(this._svgMidTransfToggleOn)]  : cssProps.svgMidTransfOn,
        [this.decl(this._svgBtmTransfToggleOn)]  : cssProps.svgBtmTransfOn,
    }}
    public /*override*/ activating()  : JssStyle { return {
        extend: [
            super.activating(), // copy activating from base
        ] as JssStyle,



        [this.decl(this._svgTopTransfToggleOn)]  : cssProps.svgTopTransfOn,
        [this.decl(this._svgMidTransfToggleOn)]  : cssProps.svgMidTransfOn,
        [this.decl(this._svgBtmTransfToggleOn)]  : cssProps.svgBtmTransfOn,

        [this.decl(this._svgTopTransfToggleOff)] : cssProps.svgTopTransfOff,
        [this.decl(this._svgMidTransfToggleOff)] : cssProps.svgMidTransfOff,
        [this.decl(this._svgBtmTransfToggleOff)] : cssProps.svgBtmTransfOff,

        [this.decl(this._svgTopAnimToggle)]      : cssProps.svgTopAnimOn,
        [this.decl(this._svgMidAnimToggle)]      : cssProps.svgMidAnimOn,
        [this.decl(this._svgBtmAnimToggle)]      : cssProps.svgBtmAnimOn,



        [this.decl(this._animActivePassive)]     : cssProps.animActive,
    }}
    public /*override*/ passivating() : JssStyle { return {
        extend: [
            super.passivating(), // copy passivating from base
        ] as JssStyle,



        [this.decl(this._svgTopTransfToggleOn)]  : cssProps.svgTopTransfOn,
        [this.decl(this._svgMidTransfToggleOn)]  : cssProps.svgMidTransfOn,
        [this.decl(this._svgBtmTransfToggleOn)]  : cssProps.svgBtmTransfOn,

        [this.decl(this._svgTopTransfToggleOff)] : cssProps.svgTopTransfOff,
        [this.decl(this._svgMidTransfToggleOff)] : cssProps.svgMidTransfOff,
        [this.decl(this._svgBtmTransfToggleOff)] : cssProps.svgBtmTransfOff,

        [this.decl(this._svgTopAnimToggle)]      : cssProps.svgTopAnimOff,
        [this.decl(this._svgMidAnimToggle)]      : cssProps.svgMidAnimOff,
        [this.decl(this._svgBtmAnimToggle)]      : cssProps.svgBtmAnimOff,



        [this.decl(this._animActivePassive)]     : cssProps.animPassive,
    }}
    public /*override*/ passived()    : JssStyle { return {
        extend: [
            super.passived(), // copy passived from base
        ] as JssStyle,



        [this.decl(this._svgTopTransfToggleOff)] : cssProps.svgTopTransfOff,
        [this.decl(this._svgMidTransfToggleOff)] : cssProps.svgMidTransfOff,
        [this.decl(this._svgBtmTransfToggleOff)] : cssProps.svgBtmTransfOff,
    }}



    // functions:
    public /*override*/ propsFn(): PropList { return {
        ...super.propsFn(), // copy functional props from base
        
        
        
        //#region finals
        // define a final *transform* func for the svg top:
        [this.decl(this._svgTopTransf)] : [this.svgTopTransfFn()], // double array (including from the returning function) => makes the JSS treat as space separated values

        // define a final *transform* func for the svg middle:
        [this.decl(this._svgMidTransf)] : [this.svgMidTransfFn()], // double array (including from the returning function) => makes the JSS treat as space separated values

        // define a final *transform* func for the svg bottom:
        [this.decl(this._svgBtmTransf)] : [this.svgBtmTransfFn()], // double array (including from the returning function) => makes the JSS treat as space separated values


        // define a final *animation* func for the svg top:
        [this.decl(this._svgTopAnim)]   : this.svgTopAnimFn(),     // single array (including from the returning function) => makes the JSS treat as comma separated values

        // define a final *animation* func for the svg middle:
        [this.decl(this._svgMidAnim)]   : this.svgMidAnimFn(),     // single array (including from the returning function) => makes the JSS treat as comma separated values

        // define a final *animation* func for the svg bottom:
        [this.decl(this._svgBtmAnim)]   : this.svgBtmAnimFn(),     // single array (including from the returning function) => makes the JSS treat as comma separated values
        //#endregion finals
    }}

    public /*virtual*/ svgTopTransfFn(): Cust.Ref[] { return [
        this.ref(this._svgTopTransfToggleOn,  this._transfNone),
        this.ref(this._svgTopTransfToggleOff, this._transfNone),
    ]}
    public /*virtual*/ svgMidTransfFn(): Cust.Ref[] { return [
        this.ref(this._svgMidTransfToggleOn,  this._transfNone),
        this.ref(this._svgMidTransfToggleOff, this._transfNone),
    ]}
    public /*virtual*/ svgBtmTransfFn(): Cust.Ref[] { return [
        this.ref(this._svgBtmTransfToggleOn,  this._transfNone),
        this.ref(this._svgBtmTransfToggleOff, this._transfNone),
    ]}

    public /*virtual*/ svgTopAnimFn(): Cust.Ref[] { return [
        this.ref(this._svgTopAnimToggle, this._animNone),
    ]}
    public /*virtual*/ svgMidAnimFn(): Cust.Ref[] { return [
        this.ref(this._svgMidAnimToggle, this._animNone),
    ]}
    public /*virtual*/ svgBtmAnimFn(): Cust.Ref[] { return [
        this.ref(this._svgBtmAnimToggle, this._animNone),
    ]}



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base
        ] as JssStyle,


        
        // children:
        [svgElm] : this.svgBasicStyle(),



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
    protected /*virtual*/ svgBasicStyle(): JssStyle { return {
        // sizes:
        // fills the entire parent text's height:
        blockSize  : [['calc(1em *',
            `var(${bcssDecls.lineHeight},${typos.lineHeight})`,
        ')']],
        inlineSize : 'auto', // calculates the width by [height * aspect-ratio]



        // children:
        overflow: 'visible', // allows graphics to overflow the canvas
        '&>*': {
            // appearances:
            stroke        : 'currentColor', // set menu color as parent's font color
            strokeWidth   : 4,              // set menu thickness, 4 of 24 might enough
            strokeLinecap : 'square',       // set menu edges square
            
            
            
            // states & animations:
            transformOrigin : '50% 50%',
            '&:nth-child(1)': {
                transform : this.ref(this._svgTopTransf),
                anim      : this.ref(this._svgTopAnim),
            },
            '&:nth-child(2)': {
                transform : this.ref(this._svgMidTransf),
                anim      : this.ref(this._svgMidAnim),
            },
            '&:nth-child(3)': {
                transform : this.ref(this._svgBtmTransf),
                anim      : this.ref(this._svgBtmAnim),
            },
        },
    }}
}
export const togglerMenuButtonStyles = new TogglerMenuButtonStyles();



// configs:

const cssConfig = new CssConfig(() => {
    // transforms hamburger menu to cross menu
    const keyframesSvgTopOn  : PropEx.Keyframes = {
        from : {
            transform: [[
                togglerMenuButtonStyles.ref(togglerMenuButtonStyles._svgTopTransfToggleOff),
            ]],
        },
        '43%': {
            transform: [['rotate(-45deg)', 'scaleX(1.35)', 'translate(0, 37.5%)', ]],
        },
        '71%': {
            transform: [['rotate(-60deg)', 'scaleX(1.35)', 'translate(0, 37.5%)', ]],
        },
        to   : {
            transform: [[
                togglerMenuButtonStyles.ref(togglerMenuButtonStyles._svgTopTransfToggleOn),
            ]],
        },
    };
    const keyframesSvgMidOn  : PropEx.Keyframes = {
        from : {
            transform: [[
                togglerMenuButtonStyles.ref(togglerMenuButtonStyles._svgMidTransfToggleOff),
            ]],
        },
        '19%': {
            transform: [['scaleX(1.35)',]],
        },
        to   : {
            transform: [[
                togglerMenuButtonStyles.ref(togglerMenuButtonStyles._svgMidTransfToggleOn),
            ]],
        },
    };
    const keyframesSvgBtmOn  : PropEx.Keyframes = {
        from : {
            transform: [[
                togglerMenuButtonStyles.ref(togglerMenuButtonStyles._svgBtmTransfToggleOff),
            ]],
        },
        '43%': {
            transform: [['rotate(45deg)',  'scaleX(1.35)', 'translate(0, -37.5%)',]],
        },
        '71%': {
            transform: [['rotate(60deg)',  'scaleX(1.35)', 'translate(0, -37.5%)',]],
        },
        to   : {
            transform: [[
                togglerMenuButtonStyles.ref(togglerMenuButtonStyles._svgBtmTransfToggleOn),
            ]],
        },
    };

    
    
    const keyframesSvgTopOff : PropEx.Keyframes = {
        from : keyframesSvgTopOn.to,
        '43%': keyframesSvgTopOn.from,
        '71%': {
            transformOrigin : '91.7% 12.5%',
            transform       : [['rotate(15deg)',  'scaleX(1)',    'translate(0, 0)',     ]],
        },
        to   : keyframesSvgTopOn.from,
    };
    const keyframesSvgMidOff : PropEx.Keyframes = {
        from : keyframesSvgMidOn.to,
        '81%': keyframesSvgMidOn['19%'],
        to   : keyframesSvgMidOn.from,
    };
    const keyframesSvgBtmOff : PropEx.Keyframes = {
        from : keyframesSvgBtmOn.to,
        '43%': keyframesSvgBtmOn.from,
        '71%': {
            transformOrigin : '91.7% 87.5%',
            transform       : [['rotate(-15deg)', 'scaleX(1)',    'translate(0, 0)',     ]],
        },
        to   : keyframesSvgBtmOn.from,
    };
    
    
    
    const keyframesActive    : PropEx.Keyframes = { };
    const keyframesPassive   : PropEx.Keyframes = { };

    
    
    const animDuration = '300ms';



    return {
        //#region animations
        svgTopTransfOn         : [['rotate(-45deg)', 'scaleX(1.35)', 'translate(0, 37.5%)', ]],
        svgMidTransfOn         : [['scaleX(0)',   ]],
        svgBtmTransfOn         : [['rotate(45deg)',  'scaleX(1.35)', 'translate(0, -37.5%)',]],

        svgTopTransfOff        : [['rotate(0deg)',   'scaleX(1)',    'translate(0, 0)',     ]],
        svgMidTransfOff        : [['scaleX(1)',   ]],
        svgBtmTransfOff        : [['rotate(0deg)',   'scaleX(1)',    'translate(0, 0)',     ]],

        '@keyframes svgTopOn'  : keyframesSvgTopOn,
        '@keyframes svgMidOn'  : keyframesSvgMidOn,
        '@keyframes svgBtmOn'  : keyframesSvgBtmOn,
        '@keyframes svgTopOff' : keyframesSvgTopOff,
        '@keyframes svgMidOff' : keyframesSvgMidOff,
        '@keyframes svgBtmOff' : keyframesSvgBtmOff,
        svgAnimDuration        :   animDuration,
        svgTopAnimOn           : [[animDuration, 'ease-out', 'both', keyframesSvgTopOn ]],
        svgMidAnimOn           : [[animDuration, 'ease-out', 'both', keyframesSvgMidOn ]],
        svgBtmAnimOn           : [[animDuration, 'ease-out', 'both', keyframesSvgBtmOn ]],
        svgTopAnimOff          : [[animDuration, 'ease-out', 'both', keyframesSvgTopOff]],
        svgMidAnimOff          : [[animDuration, 'ease-out', 'both', keyframesSvgMidOff]],
        svgBtmAnimOff          : [[animDuration, 'ease-out', 'both', keyframesSvgBtmOff]],

        '@keyframes active'    : keyframesActive,
        '@keyframes passive'   : keyframesPassive,
        animActive             : [[animDuration, 'ease-out', 'both', keyframesActive ]],
        animPassive            : [[animDuration, 'ease-out', 'both', keyframesPassive]],
        //#endregion animations
    };
}, /*prefix: */'tgmn');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// react components:

export interface TogglerMenuButtonProps
    extends
        CheckProps
{
}
export default function TogglerMenuButton(props: TogglerMenuButtonProps) {
    // styles:
    const styles      = togglerMenuButtonStyles.useStyles();



    // jsx fn props:
    const childrenFn  = (() => {
        // default (unset):
        if (props.children === undefined) return (
            <svg viewBox='0 0 24 24'>
                <polyline points='2,3 22,3' />
                <polyline points='2,12 22,12' />
                <polyline points='2,21 22,21' />
            </svg>
        );



        // other component:
        return props.children;
    })();



    // fn props:
    const propActive  = usePropActive(props);
    
    const ariaRole    = props.role            ?? 'button';
    const ariaPressed = props['aria-pressed'] ?? ((ariaRole === 'button') ? propActive : undefined);



    // jsx:
    return (
        <Check
            // other props:
            {...props}


            // accessibility:
            role={ariaRole}
            aria-pressed={ariaPressed}
            aria-expanded={props['aria-expanded'] ?? propActive}
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