// react (builds html using javascript):
import
    React, {
    useState,
}                           from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
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
import {
    cssProps as ecssProps,
}                           from './Element'
import {
    cssProps as icssProps,
}                           from './Indicator'
import {
    default  as EditableControl,
    EditableControlStylesBuilder,
}                           from './EditableControl'
import type * as EditableControls   from './EditableControl'
import {
    styles as contentStyles,
}                           from './Content'
import {
    styles as iconStyles,
}                           from './Icon'



// styles:

const chkElm         = '& >:first-child';
const iconElm        = '&::before';
const nextElm        = '& >:nth-child(1n+2)';
const selfAndNextElm = '&,& ~*';

export class CheckStylesBuilder extends EditableControlStylesBuilder {
    //#region scoped css props
    /**
     * functional animations for the "icon" element.
     */
    public    readonly _animIconFn          = 'animIconFn'



    /**
     * themed foreground color for the label.
     */
    protected readonly _colorLabelTh        = 'colorLabelTh'

    /**
     * conditional foreground color for the label.
     */
    protected readonly _colorLabelIfIf      = 'colorLabelIfIf'

    /**
     * conditional unthemed foreground color for the label.
     */
    protected readonly _colorLabelIf        = 'colorLabelIf'

    /**
     * functional foreground color for the label.
     */
    public    readonly _colorLabelFn        = 'colorLabelFn'

    
    /**
     * active unthemed foreground color for the label.
     */
    protected readonly _colorLabelIfAct     = 'colorLabelIfAct'

    /**
     * valid-state foreground color for the label.
     */
    protected readonly _colorLabelIfVal     = 'colorLabelIfVal'

    /**
     * invalid-state foreground color for the label.
     */
    protected readonly _colorLabelIfInv     = 'colorLabelIfInv'



    // anim props:

    public    readonly _switchTransfIn      = 'switchTransfIn'
    public    readonly _switchTransfOut     = 'switchTransfOut'

    public    readonly _filterCheckClearIn  = 'filterCheckClearIn'
    public    readonly _filterCheckClearOut = 'filterCheckClearOut'
    protected readonly _animCheckClear      = 'animCheckClear'
    //#endregion scoped css props



    //#region mixins
    protected stateChecking(content: JssStyle): JssStyle { return {
        '&.check': content,
    }}
    protected stateCheck(content: JssStyle): JssStyle { return {
        '&.check,&.checked,&:checked': content,
    }}
    protected stateNotCheck(content: JssStyle): JssStyle { return {
        '&:not(.check):not(.checked):not(:checked)': content,
    }}
    protected stateClearing(content: JssStyle): JssStyle { return {
        '&.clear': content,
    }}
    protected stateNotClear(content: JssStyle): JssStyle { return {
        '&:not(.clear)': content,
    }}
    protected stateCheckClear(content: JssStyle): JssStyle { return {
        '&.check,&.checked,&:checked,&.clear': content,
    }}
    protected stateNotCheckClear(content: JssStyle): JssStyle { return {
        '&:not(.check):not(.checked):not(:checked):not(.clear)': content,
    }}
    protected stateNotCheckingClearing(content: JssStyle): JssStyle { return {
        '&:not(.check):not(.clear)': content,
    }}

    protected applyStateNoAnimStartup(): JssStyle {
        return this.stateNotCheckingClearing(
            super.applyStateNoAnimStartup()
        );
    }
    protected applyStateActive(): JssStyle { return {
        // apply an *active* color theme:
        extend: super.applyStateActive(), // copy active theme from base
        
        [nextElm]: {
            // apply an *active* color theme for the label:
            [this.decl(this._colorLabelIf)] : this.ref(this._colorLabelIfAct),
        },
    }}
    protected applyStateValid(): JssStyle { return {
        // apply a *valid* color theme:
        extend: super.applyStateValid(), // copy valid theme from base

        [nextElm]: {
            [this.decl(this._colorLabelIfIf)] : this.ref(this._colorLabelIfVal),
        }
    }}
    protected applyStateInvalid(): JssStyle { return {
        // apply an *invalid* color theme:
        extend: super.applyStateValid(), // copy invalid theme from base

        [nextElm]: {
            [this.decl(this._colorLabelIfIf)] : this.ref(this._colorLabelIfInv),
        }
    }}
    //#endregion mixins



    // themes:
    public themeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle { return {
        extend: super.themeOf(theme, Theme, themeProp, themeColor), // copy themes from base



        // customize the *themed* props:
    
        [this.decl(this._colorLabelTh)]: (colors as DictionaryOf<typeof colors>)[`${theme}Cont`],
    }}



    // states:
    protected themesIf(): JssStyle { return {
        extend: super.themesIf(), // copy themes from base



        // define a *default* color theme:
        [this.decl(this._colorLabelIf)]    : colors.secondaryCont,

        // define an *active* color theme:
        [this.decl(this._colorLabelIfAct)] : colors.primaryCont,



        // define a *valid* color theme:
        [this.decl(this._colorLabelIfVal)] : colors.successCont,

        // define an *invalid* color theme:
        [this.decl(this._colorLabelIfInv)] : colors.dangerCont,
    }}
    protected states(): JssStyle { return {
        //#region all initial states are none
        [this.decl(this._filterCheckClearIn)]  : cssProps.filterCheck,
        [this.decl(this._filterCheckClearOut)] : cssProps.filterClear,
        [this.decl(this._animCheckClear)]      : ecssProps.animNone,
        //#endregion all initial states are none



        //#region specific states
        extend: [
            super.states(), // copy states from base
    
    
    
            //#region check, clear
            this.stateCheckClear({ // [checking, checked, clearing]
                [nextElm]: { // transfer the check/clear state to the "next" element(s):
                    [this.decl(this._filterActivePassive)] : icssProps.filterActive,
                },
            }),
            this.stateCheck({ // [checking, checked]
                [nextElm]: { // transfer the check/clear state to the "next" element(s):
                    [this.decl(this._animActivePassive)]   : icssProps.animActive,
    
                    extend: [
                        this.applyStateActive(),
                    ] as JssStyle,
                },


                [this.decl(this._animCheckClear)]          : cssProps.animCheck,
            }),
            this.stateClearing({ // [clearing]
                [nextElm]: { // transfer the check/clear state to the "next" element(s):
                    [this.decl(this._animActivePassive)]   : icssProps.animPassive,
                },
            }),
            this.stateNotCheck({ // [not-checking, not-checked] => [clearing, cleared]
                [this.decl(this._animCheckClear)]          : cssProps.animClear,
            }),
            this.stateNotCheckingClearing( // [not-checking, not-clearing]
                this.applyStateNoAnimStartup()
            ),
            { // [cleared]
                '&.checked,&:checked:not(.check)': { // if ctrl was fully checked, disable the animation
                    [chkElm]: this.stateNotFocusBlur({ // still transfering the focus state to the "sibling" element(s):
                        // the "sibling" element(s):
                        '&~*': // transfer the checked state to the "sibling" element(s):
                            super.applyStateNoAnimStartup(),
                    }),
                },
            },
            //#endregion check, clear
        ] as JssStyle,
        //#endregion specific states
    }}



    // styles:
    protected inheritStyle(): JssStyle { return {
        fontSize           : null,      // inherit
        fontFamily         : null,      // inherit
        fontWeight         : null,      // inherit
        fontStyle          : null,      // inherit
        textDecoration     : null,      // inherit
        lineHeight         : null,      // inherit

        opacity            : null,      // inherit
        transition         : 'inherit',
        filter             : null,      // inherit
        color              : 'inherit',

        cursor             : 'inherit',
    }}
    protected checkStyle(): JssStyle { return {
        extend: [
            super.basicStyle(),                // copy basicStyle from base
            this.inheritStyle(),               // force some props inherited from parent
            this.filterGeneralProps(cssProps), // apply our filtered cssProps
        ] as JssStyle,
    
        //#region remove some cssProps
        spacing            : null, // delete
        img                : null, // delete
        switchImg          : null, // delete
        switchBorderRadius : null, // delete
        //#endregion remove some cssProps
    


        // layout:
        display       : 'inline-block',
        verticalAlign : 'baseline',
    

        // sizings:
        width     : '1em',
        height    : '1em',
        boxSizing : 'border-box',
        paddingX: 0, paddingY: 0,
    

        // spacings:
        '&:not(:last-child)': {
            marginInlineEnd: cssProps.spacing,
        },
    
    
    
        overflow: 'hidden', // clip the icon at borderRadius
    
        [iconElm]: {
            //#region apply img-icon
            extend: [
                iconStyles.basicStyle(),
                iconStyles.imgStyle(),
            ] as JssStyle,
    
            verticalAlign : null, // delete


            // setup icon's image:
            [iconStyles.decl(iconStyles._img)]     : cssProps.img,

            // setup icon's color:
            [iconStyles.decl(iconStyles._colorFn)] : this.ref(this._colorFn),
            //#endregion apply img-icon



            // layout:
            content : '""',
            display : 'block',

            // sizes:
            height  : '100%',
            width   : '100%',
            
            
            
            // apply *non conditional* fn props:
            anim : this.ref(this._animIconFn),
        },
    }}
    public basicStyle(): JssStyle { return {
    }}
}
export const styles = new CheckStylesBuilder();



// configs:

const cssConfig = new CssConfig(() => {
    // common css values:
    // const initial = 'initial';
    // const unset   = 'unset';
    // const none    = 'none';
    // const inherit = 'inherit';
    // const center  = 'center';
    // const middle  = 'middle';


    const keyframesCheck         : PropEx.Keyframes = {
        from: {
            filter: [[
                styles.ref(styles._filterCheckClearOut),
            ]],
        },
        to: {
            filter: [[
                styles.ref(styles._filterCheckClearIn),
            ]],
        },
    };
    const keyframesClear         : PropEx.Keyframes = {
        from : keyframesCheck.to,
        to   : keyframesCheck.from,
    };

    const keyframesSwitchCheck   : PropEx.Keyframes = {
        from: {
            filter: [[
                styles.ref(styles._filterCheckClearOut),
            ]],
            transform: [[
                styles.ref(styles._switchTransfOut),
            ]],
        },
        '75%': {
            transformOrigin: 'left',
            transform: [[
                'scaleX(1.1)',
                styles.ref(styles._switchTransfIn),
            ]],
        },
        to: {
            filter: [[
                styles.ref(styles._filterCheckClearIn),
            ]],
            transform: [[
                styles.ref(styles._switchTransfIn),
            ]],
        },
    };
    const keyframesSwitchClear   : PropEx.Keyframes = {
        from: {
            filter: [[
                styles.ref(styles._filterCheckClearIn),
            ]],
            transform: [[
                styles.ref(styles._switchTransfIn),
            ]],
        },
        '75%': {
            transformOrigin: 'right',
            transform: [[
                'scaleX(1.1)',
                styles.ref(styles._switchTransfOut),
            ]],
        },
        to: {
            filter: [[
                styles.ref(styles._filterCheckClearOut),
            ]],
            transform: [[
                styles.ref(styles._switchTransfOut),
            ]],
        },
    };

    return {
        spacing                  : '0.3em',
        
        // forked from Bootstrap 5:
        img                      : `url("data:image/svg+xml,${styles.escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path fill='none' stroke='#000' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3 6-6'/></svg>")}")`,
        
        // forked from Bootstrap 5:
        switchImg                : `url("data:image/svg+xml,${styles.escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='3' fill='#000'/></svg>")}")`,
        switchBorderRadius       : '0.5em',
        
        
        
        // anim props:

        filterCheck              : [['opacity(100%)']],
        filterClear              : [['opacity(0%)'  ]],

        switchFilterCheck        : [['opacity(100%)'     ]],
        switchFilterClear        : [['opacity(50%)'      ]],
        switchTransfCheck        : [['translateX(0.5em)' ]],
        switchTransfClear        : [['translateX(-0.5em)']],

        '@keyframes check'       : keyframesCheck,
        '@keyframes clear'       : keyframesClear,
        '@keyframes switchCheck' : keyframesSwitchCheck,
        '@keyframes switchClear' : keyframesSwitchClear,
        animCheck                : [['150ms', 'ease-out', 'both', keyframesCheck      ]],
        animClear                : [['150ms', 'ease-out', 'both', keyframesClear      ]],
        switchAnimCheck          : [['200ms', 'ease-out', 'both', keyframesSwitchCheck]],
        switchAnimClear          : [['200ms', 'ease-out', 'both', keyframesSwitchClear]],
    };
}, /*prefix: */'chk');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// hooks:

export function useStateCheckClear(props: Props) {
    const defaultChecked = false; // if [checked] and/or [defaultChecked] was not specified => the default value is checked=false
    const [checked,  setChecked ] = useState(props.checked ?? props.defaultChecked ?? defaultChecked);
    const [checking, setChecking] = useState(false);
    const [clearing, setClearing] = useState(false);


    const handleChangeInternal = (newCheck: boolean) => {
        if (checked !== newCheck) { // changes detected => apply the changes & start animating
            setChecked(newCheck);
            
            if (newCheck) {
                setClearing(false);
                setChecking(true);
            }
            else {
                setChecking(false);
                setClearing(true);
            }
        }
    }


    if (props.checked !== undefined) { // controllable prop => watch the changes
        handleChangeInternal(/*newCheck =*/props.checked);
    } // if

    
    const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        if (props.checked !== undefined) return; // controllable prop => let the prop determines the state

        handleChangeInternal(/*newCheck =*/target.checked);
    }
    const handleIdle = () => {
        // clean up expired animations

        if (checking) setChecking(false);
        if (clearing) setClearing(false);
    }
    return {
        checked :  checked,
        cleared : !checked,
        class: (checking? 'check' : (clearing ? 'clear': null)),
        handleChange: handleChange,
        handleAnimationEnd : (e: React.AnimationEvent<HTMLElement>) => {
            if (e.target !== e.currentTarget) return; // no bubbling
            if (/((?<![a-z])(check|clear)|(?<=[a-z])(Check|Clear))(?![a-z])/.test(e.animationName)) {
                handleIdle();
            }
        },
        handleAnimationEndPress : (e: React.AnimationEvent<HTMLElement>) => {
            if (e.target !== e.currentTarget) return; // no bubbling
            if (/((?<![a-z])(active|passive)|(?<=[a-z])(Active|Passive))(?![a-z])/.test(e.animationName)) {
                handleIdle();
            }
        },
    };
}