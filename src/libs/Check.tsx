// react (builds html using javascript):
import
    React, {
    useState,
}                           from 'react'        // base technology of our nodestrap components

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
    styles as iconStyles,
}                           from './Icon'
import {
    styles as buttonStyles,
}                           from './Button'



// styles:

const chkElm   = '&>:first-child';
const iconElm  = '&::before';
const labelElm = '&>:nth-child(1n+2)';

export class CheckStylesBuilder extends EditableControlStylesBuilder {
    //#region scoped css props
    /**
     * functional animations for the icon.
     */
    public    readonly _iconAnimFn          = 'iconAnimFn'


    
    //#region foreground - label
    /**
     * themed foreground color for the label.
     */
    protected readonly _labelForegTh        = 'labelForegTh'

    /**
     * conditional foreground color for the label.
     */
    protected readonly _labelForegIfIf      = 'labelForegIfIf'

    /**
     * conditional unthemed foreground color for the label.
     */
    protected readonly _labelForegIf        = 'labelForegIf'

    /**
     * functional foreground color for the label.
     */
    public    readonly _labelForegFn        = 'labelForegFn'

    
    /**
     * active unthemed foreground color for the label.
     */
    protected readonly _labelForegIfAct     = 'labelForegIfAct'

    /**
     * valid-state foreground color for the label.
     */
    protected readonly _labelForegIfVal     = 'labelForegIfVal'

    /**
     * invalid-state foreground color for the label.
     */
    protected readonly _labelForegIfInv     = 'labelForegIfInv'
    //#endregion foreground - label



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
    protected stateNotClearing(content: JssStyle): JssStyle { return {
        '&:not(.clear)': content,
    }}
    protected stateCheckClearing(content: JssStyle): JssStyle { return {
        '&.check,&.checked,&:checked,&.clear': content,
    }}
    protected stateNotCheckClearing(content: JssStyle): JssStyle { return {
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
        extend: [
            super.applyStateActive(), // copy active theme from base
        ] as JssStyle,
        

        
        // apply an *active* color theme for the label:
        [this.decl(this._labelForegIf)]   : this.ref(this._labelForegIfAct),
    }}
    protected applyStateValid(): JssStyle { return {
        // apply a *valid* color theme:
        extend: [
            super.applyStateValid(), // copy valid theme from base
        ] as JssStyle,



        // apply a *valid* color theme for the label:
        [this.decl(this._labelForegIfIf)] : this.ref(this._labelForegIfVal),
    }}
    protected applyStateInvalid(): JssStyle { return {
        // apply an *invalid* color theme:
        extend: [
            super.applyStateInvalid(), // copy invalid theme from base
        ] as JssStyle,



        // apply an *invalid* color theme for the label:
        [this.decl(this._labelForegIfIf)] : this.ref(this._labelForegIfInv),
    }}
    protected applyStateCheck(): JssStyle { return {
        extend: [
            // *toggle off* the outlined props:
            this.toggleOffOutlined(),
        ] as JssStyle,
    }}
    //#endregion mixins



    // themes:
    public sizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {
        extend: [
            super.sizeOf(size, Size, sizeProp), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, Size)),
    }}

    protected checkThemeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle { return {}; }
    protected labelThemeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle { return {
        // customize the *themed* props for the label:
        [this.decl(this._labelForegTh)]: (colors as DictionaryOf<typeof colors>)[`${theme}Cont`],
    }}
    public themeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle { return {
        extend: [
            super.themeOf(theme, Theme, themeProp, themeColor), // copy themes from base

            this.checkThemeOf(theme, Theme, themeProp, themeColor),
            this.labelThemeOf(theme, Theme, themeProp, themeColor),
        ] as JssStyle,
    }}



    // states:
    protected checkThemesIf(): JssStyle { return {}; }
    protected checkStates(inherit = false): JssStyle { return {
        extend: [
            this.iif(!inherit, {
                //#region all initial states are none
                [this.decl(this._animCheckClear)]      : ecssProps.animNone,
                //#endregion all initial states are none
            }),



            //#region specific states
            //#region check, clear
            { // [checking, checked, clearing, cleared => all states]
                [this.decl(this._filterCheckClearIn)]  : cssProps.filterCheck,
                [this.decl(this._filterCheckClearOut)] : cssProps.filterClear,
            },
            this.stateCheck({ // [checking, checked]
                [this.decl(this._animCheckClear)]      : cssProps.animCheck,

                extend: [
                    this.applyStateCheck(),
                ] as JssStyle,
            }),
            this.stateNotCheck({ // [not-checking, not-checked] => [clearing, cleared]
                [this.decl(this._animCheckClear)]      : cssProps.animClear,
            }),
            this.stateNotCheckingClearing( // [not-checking, not-clearing]
                this.applyStateNoAnimStartup()
            ),
            //#endregion check, clear
            //#endregion specific states
        ] as JssStyle,
    }}

    protected labelThemesIf(): JssStyle { return {
        // define a *default* color theme for the label:
        [this.decl(this._labelForegIf)]    : colors.secondaryCont,

        // define an *active* color theme for the label:
        [this.decl(this._labelForegIfAct)] : colors.primaryCont,



        // define a *valid* color theme for the label:
        [this.decl(this._labelForegIfVal)] : colors.successCont,

        // define an *invalid* color theme for the label:
        [this.decl(this._labelForegIfInv)] : colors.dangerCont,
    }}
    protected labelStates(inherit = false): JssStyle { return {
        extend: [
            //#region specific states
            //#region check, clear => label active, passive
            this.stateCheckClearing({ // [checking, checked, clearing] => label [activating, actived, passivating]
                [labelElm]: {
                    [this.decl(this._filterActivePassive)] : icssProps.filterActive,
                },
            }),
            this.stateCheck({ // [checking, checked] => label [activating, actived]
                [labelElm]: {
                    [this.decl(this._animActivePassive)]   : icssProps.animActive,
                },

                extend: [
                    this.applyStateActive(),
                ] as JssStyle,
            }),
            this.stateClearing({ // [clearing] => label [passivating]
                [labelElm]: {
                    [this.decl(this._animActivePassive)]   : icssProps.animPassive,
                },
            }),
            {
                // [cleared] => label [actived]
                '&.checked,&:checked:not(.check)': { // if ctrl was fully checked, disable the animation
                    /* IF */[chkElm]: this.stateNotFocusBlurring({ // but still transfering the focus state to the "sibling" element(s):
                        /* THEN [labelElm] */'&~*':
                            super.applyStateNoAnimStartup(),
                    }),
                },
            },
            //#endregion check, clear => label active, passive
            //#endregion specific states
        ] as JssStyle,
    }}

    protected themesIf(): JssStyle { return {
        extend: [
            super.themesIf(), // copy themes from base

            this.checkThemesIf(),
            this.labelThemesIf(),
        ] as JssStyle,
    }}
    protected states(inherit = false): JssStyle { return {
        extend: [
            super.states(inherit), // copy states from base

            this.checkStates(inherit),
            this.labelStates(inherit),
        ] as JssStyle,
    }}



    // fn props:
    protected checkFnProps(): JssStyle { return {
        // define an *animations* func for the icon:
        [this.decl(this._iconAnimFn)]: [
            this.ref(this._animCheckClear),
        ],
    }}
    protected labelFnProps(): JssStyle { return {
        // define a *foreground* color func for the label:
        [this.decl(this._labelForegFn)] : this.ref(
            this._labelForegIfIf, // first  priority
            this._labelForegTh,   // second priority
            this._labelForegIf    // third  priority
        ),



        //#region re-arrange the animFn at different states
        extend: [
            this.stateCheck(
                this.stateNotDisabled({ // if ctrl was not fully disabled
                    ...this.stateValid({
                        [labelElm]: {
                            // define an *animations* func:
                            [this.decl(this._animFn)]: [
                                ecssProps.anim,
                                this.ref(this._animInvUninv),
                                this.ref(this._animValUnval),
                                this.ref(this._animActivePassive), // 1st : ctrl already pressed, move to the least priority
                                this.ref(this._animHoverLeave),    // 2nd : cursor leaved
                                this.ref(this._animFocusBlur),     // 3rd : ctrl lost focus (can interrupt hover/leave)
                                this.ref(this._animEnableDisable), // 4th : ctrl enable/disable (can interrupt focus/blur)
                            ],
                        },
                    }),
                    [labelElm]: {
                        // define an *animations* func:
                        [this.decl(this._animFn)]: [
                            ecssProps.anim,
                            this.ref(this._animValUnval),
                            this.ref(this._animInvUninv),
                            this.ref(this._animActivePassive), // 1st : ctrl already pressed, move to the least priority
                            this.ref(this._animHoverLeave),    // 2nd : cursor leaved
                            this.ref(this._animFocusBlur),     // 3rd : ctrl lost focus (can interrupt hover/leave)
                            this.ref(this._animEnableDisable), // 4th : ctrl enable/disable (can interrupt focus/blur)
                        ],
                    },
                })
            ),
        ] as JssStyle,
        //#endregion re-arrange the animFn at different states
    }}
    protected fnProps(): JssStyle { return {
        extend: [
            super.fnProps(), // copy functional props from base

            this.checkFnProps(),
            this.labelFnProps(),
        ] as JssStyle,
    }}



    // styles:
    protected inheritStyle(): JssStyle { return {
        // typos:
        fontSize           : null,      // default inherit
        fontFamily         : null,      // default inherit
        fontWeight         : null,      // default inherit
        fontStyle          : null,      // default inherit
        textDecoration     : 'inherit', // force   inherit
        lineHeight         : null,      // default inherit

        // appearances:
        foreg              : null,      // default inherit
        color              : null,      // default inherit
        opacity            : null,      // pseudo  inherit
        transition         : 'inherit', // force   inherit
        filter             : null,      // pseudo  inherit

        // accessibility:
        cursor             : 'inherit', // force   inherit
    }}
    protected basicCheckStyle(): JssStyle { return {
        extend: [
            super.basicStyle(),  // copy basicStyle from base
            this.inheritStyle(), // force some props inherited from parent
        ] as JssStyle,
    


        // layout:
        display       : 'inline-block',


        // positions:
        verticalAlign : 'baseline',
    

        // sizes:
        boxSizing  : 'border-box', // the final size is including borders & paddings
        /* the size is exactly the same as current font size */
        inlineSize : '1em',
        blockSize  : '1em',
        paddingInline: 0, paddingBlock: 0, // no padding
    

        // spacing between check & label:
        '&:not(:last-child)': {
            marginInlineEnd: cssProps.spacing,
        },
    
    
    
        overflow: 'hidden', // clip the icon at borderRadius
    
        [iconElm]: {
            extend: [
                iconStyles.imgStyle( // apply icon
                    /*img   :*/ cssProps.img
                ),
            ] as JssStyle,



            // layout:
            content   : '""',
            display   : 'block', // fill the entire parent's width


            // sizes:
            // fill the entire parent:
            boxSizing : 'border-box', // the final size is including borders & paddings
            blockSize : '100%',
            
            
            
            // apply fn props:
            anim : this.ref(this._iconAnimFn),
        },



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
    protected basicLabelStyle(): JssStyle { return {
        // apply fn props:
        foreg : this.ref(this._labelForegFn),
    }}
    public basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base
        ] as JssStyle,
    
        

        // force backgroundless:
        backg         : [['none'], '!important'],
        boxShadow     : [['none'], '!important'],
        paddingInline : undefined as unknown as null, // delete
        paddingBlock  : undefined as unknown as null, // delete
        border        : undefined as unknown as null, // delete
        borderRadius  : undefined as unknown as null, // delete
        
    
        
        // layout:
        display       : 'inline-flex',
        alignItems    : 'center', // center items vertically
        flexWrap      : 'wrap',



        // positions:
        verticalAlign : 'baseline', // check's text should be aligned with sibling text, so the check behave like <span> wrapper
    
    
    
        // the dummy text content, for making parent's height as tall as line-height
        '&::before': {
            // layout:
            content    : '"\xa0"', // &nbsp;
            display    : 'inline',
            

            // appearances:
            inlineSize : 0,
            overflow   : 'hidden',
            visibility : 'hidden',
        },
    
    
    
        // children:
        [chkElm]   : this.basicCheckStyle(),
        [labelElm] : this.basicLabelStyle(),
    }}
    public buttonStyle(): JssStyle { return {
        // children:

        [chkElm]   : {
            // hides the checkbox while still preserving animation & focus working
            opacity: 0,
            boxSizing  : 'border-box', // the final size is including borders & paddings
            inlineSize: 0, blockSize: 0,
            border: 0, padding: 0,

            // spacing between check & label:
            '&:not(:last-child)': {
                marginInlineEnd: 0,
            },
        },

        [labelElm] : {
            extend: [
                buttonStyles.basicStyle(),
            ] as JssStyle,



            // customize:
            ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'btn')), // apply *general* cssProps starting with btn***
        },
    }}
    public switchStyle(): JssStyle { return {
        //#region specific states
        extend: [
            //#region check, clear
            { // [checking, checked, clearing, cleared => all states]
                [this.decl(this._filterCheckClearIn)]  : cssProps.switchFilterCheck,
                [this.decl(this._filterCheckClearOut)] : cssProps.switchFilterClear,

                [this.decl(this._switchTransfIn)]      : cssProps.switchTransfCheck,
                [this.decl(this._switchTransfOut)]     : cssProps.switchTransfClear,
            },
            this.stateCheck({ // [checking, checked]
                [this.decl(this._animCheckClear)]      : cssProps.switchAnimCheck,
            }),
            this.stateNotCheck({ // [not-checking, not-checked] => [clearing, cleared]
                [this.decl(this._animCheckClear)]      : cssProps.switchAnimClear,
            }),
            //#endregion check, clear
        ] as JssStyle,
        //#endregion specific states



        // children:
        [chkElm]: {
            inlineSize   : '2em',   // makes the width twice the height
            borderRadius : '0.5em', // makes circle corners



            // children:
            [iconElm]: {
                [iconStyles.decl(iconStyles._img)] : cssProps.switchImg,
            },



            // customize:
            ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'switch')), // apply *general* cssProps starting with switch***
        },
    }}
    protected styles(): Styles<'main'> {
        const styles = super.styles();
        Object.assign(styles.main, {
            '&.btn'    : this.buttonStyle(),
            '&.switch' : this.switchStyle(),
        });
        return styles;
    }
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
            transformOrigin: 'left', // todo: orientation aware transform => left will be top if the element rotated 90deg clockwise
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
            transformOrigin: 'right', // todo: orientation aware transform => right will be bottom if the element rotated 90deg clockwise
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

export type ChkStyle = 'btn' | 'switch' // might be added more styles in the future
export interface VariantCheck {
    chkStyle?: ChkStyle
}
export function useVariantCheck(props: VariantCheck, styles: Record<string, string>) {
    return {
        class: props.chkStyle ? props.chkStyle : null,
    };
}



// react components:

export interface Props
    extends
        EditableControls.Props<HTMLInputElement>,
        VariantCheck
{
    // values:
    defaultChecked? : boolean
    checked?        : boolean


    // formats:
    type?           : 'checkbox' | 'radio'


    // labels:
    text?           : string
    children?       : React.ReactNode
}
export default function Check(props: Props) {
    const chkStyles   = styles.useStyles();

    // themes:
    const variCheck   = useVariantCheck(props, chkStyles);

    // states:
    const stateChkClr = useStateCheckClear(props);



    const isBtnStyle  = props.chkStyle?.startsWith('btn') ?? false;

    

    const {
        // essentials:
        elmRef,


        // accessibility:
        tabIndex,
        readOnly,


        // values:
        defaultValue,
        value,
        defaultChecked,
        checked,
        // onChange, // let's bubbling to parent handle onChange


        // validations:
        required,


        // formats:
        type,
    ...otherProps}  = props;

    return (
        <EditableControl<HTMLInputElement>
            // default props:
            tag='label'


            // other props:
            {...otherProps}


            // main:
            mainClass={props.mainClass ?? chkStyles.main}


            // unchanged props:
            tabIndex={-1}


            // classes:
            classes={[
                // additionals:
                ...(props.classes ?? []),


                // themes:
                variCheck.class,


                // states:
                stateChkClr.class ?? (stateChkClr.checked ? 'checked' : null),
            ]}
        >
            <input
                // essentials:
                ref={elmRef}


                // accessibility:
                disabled={props.enabled === false}
                tabIndex={tabIndex}
                readOnly={readOnly}


                // values:
                defaultValue={defaultValue}
                value={value}
                defaultChecked={defaultChecked}
                checked={checked}
                onChange={stateChkClr.handleChange}


                // validations:
                required={required}


                // formats:
                type={type ?? 'checkbox'}


                // labels:
                aria-hidden={isBtnStyle}


                // events:
                // onFocus, onBlur // bubble to parent (unlike on native DOM that doesn't bubble, on react *do* bubbling)
                // onAnimationEnd  // bubble to parent, let's the parent handle the onAnimationEnd


                // events:
                // states:
                onAnimationEnd={stateChkClr.handleAnimationEnd}
            />
            { (props.text || props.children) &&
                <span
                    // events:
                    // states:
                    onAnimationEnd={stateChkClr.handleAnimationEndPress}
                >
                    { props.text }
                    { props.children }
                </span>
            }
        </EditableControl>
    );
}