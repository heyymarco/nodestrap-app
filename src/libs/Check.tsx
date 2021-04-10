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

const chkElm         = '& >:first-child';
const iconElm        = '&::before';
const labelElm       = '& >:nth-child(1n+2)';

export class CheckStylesBuilder extends EditableControlStylesBuilder {
    //#region scoped css props
    /**
     * functional animations for the icon.
     */
    public    readonly _animIconFn          = 'animIconFn'


    
    //#region foreground - label
    /**
     * themed foreground color for the label.
     */
    protected readonly _foregLabelTh        = 'foregLabelTh'

    /**
     * conditional foreground color for the label.
     */
    protected readonly _foregLabelIfIf      = 'foregLabelIfIf'

    /**
     * conditional unthemed foreground color for the label.
     */
    protected readonly _foregLabelIf        = 'foregLabelIf'

    /**
     * functional foreground color for the label.
     */
    public    readonly _foregLabelFn        = 'foregLabelFn'

    
    /**
     * active unthemed foreground color for the label.
     */
    protected readonly _foregLabelIfAct     = 'foregLabelIfAct'

    /**
     * valid-state foreground color for the label.
     */
    protected readonly _foregLabelIfVal     = 'foregLabelIfVal'

    /**
     * invalid-state foreground color for the label.
     */
    protected readonly _foregLabelIfInv     = 'foregLabelIfInv'
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
        

        
        // apply an *active* color theme for the label:
        [this.decl(this._foregLabelIf)]   : this.ref(this._foregLabelIfAct),
    }}
    protected applyStateValid(): JssStyle { return {
        // apply a *valid* color theme:
        extend: super.applyStateValid(), // copy valid theme from base



        // apply a *valid* color theme for the label:
        [this.decl(this._foregLabelIfIf)] : this.ref(this._foregLabelIfVal),
    }}
    protected applyStateInvalid(): JssStyle { return {
        // apply an *invalid* color theme:
        extend: super.applyStateInvalid(), // copy invalid theme from base



        // apply an *invalid* color theme for the label:
        [this.decl(this._foregLabelIfIf)] : this.ref(this._foregLabelIfInv),
    }}
    //#endregion mixins



    // themes:
    protected checkThemeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle { return {}; }
    protected checkOutlined(): JssStyle {
        return this.stateNotCheck(
            super.outlined()
        );
    }

    protected labelThemeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle { return {
        // customize the *themed* props for the label:
        [this.decl(this._foregLabelTh)]: (colors as DictionaryOf<typeof colors>)[`${theme}Cont`],
    }}
    protected labelOutlined(): JssStyle  { return {}; }

    public themeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle { return {
        extend: [
            super.themeOf(theme, Theme, themeProp, themeColor), // copy themes from base

            this.checkThemeOf(theme, Theme, themeProp, themeColor),
            this.labelThemeOf(theme, Theme, themeProp, themeColor),
        ] as JssStyle,
    }}
    public outlined(): JssStyle { return {
        extend: [
            this.checkOutlined(),
            this.labelOutlined(),
        ] as JssStyle,
    }}



    // states:
    protected checkFnProps(): JssStyle { return {
        // define an *animations* func for the icon:
        [this.decl(this._animIconFn)]: [
            this.ref(this._animCheckClear),
        ],
    }}
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

    protected labelFnProps(): JssStyle { return {
        // define a *foreground* color func for the label:
        [this.decl(this._foregLabelFn)] : this.ref(
            this._foregLabelIfIf, // first  priority
            this._foregLabelTh,   // second priority
            this._foregLabelIf    // third  priority
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
    protected labelThemesIf(): JssStyle { return {
        // define a *default* color theme for the label:
        [this.decl(this._foregLabelIf)]    : colors.secondaryCont,

        // define an *active* color theme for the label:
        [this.decl(this._foregLabelIfAct)] : colors.primaryCont,



        // define a *valid* color theme for the label:
        [this.decl(this._foregLabelIfVal)] : colors.successCont,

        // define an *invalid* color theme for the label:
        [this.decl(this._foregLabelIfInv)] : colors.dangerCont,
    }}
    protected labelStates(inherit = false): JssStyle { return {
        extend: [
            //#region specific states
            //#region check, clear => label active, passive
            this.stateCheckClear({ // [checking, checked, clearing] => label [activating, actived, passivating]
                [labelElm]: {
                    [this.decl(this._filterActivePassive)] : icssProps.filterActive,
                },
            }),
            this.stateCheck({ // [checking, checked] => label [activating, actived]
                [labelElm]: {
                    [this.decl(this._animActivePassive)]   : icssProps.animActive,
    
                    extend: [
                        this.applyStateActive(),
                    ] as JssStyle,
                },
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

    protected fnProps(): JssStyle { return {
        extend: [
            super.fnProps(), // copy functional props from base

            this.checkFnProps(),
            this.labelFnProps(),
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
            super.basicStyle(),                // copy basicStyle from base
            this.inheritStyle(),               // force some props inherited from parent
            
            {
                ...this.filterGeneralProps(cssProps), // apply *general* cssProps
                
                //#region remove some cssProps
                spacing            : undefined, // delete
                img                : undefined, // delete
                switchImg          : undefined, // delete
                switchBorderRadius : undefined, // delete
                //#endregion remove some cssProps
            }
        ] as JssStyle,
    


        // layout:
        display       : 'inline-block',


        // positions:
        verticalAlign : 'baseline',
    

        // sizes:
        /* the size is exactly the same as current font size */
        inlineSize : '1em',
        blockSize  : '1em',
        boxSizing  : 'border-box', // the size is *including* the border
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
            content    : '""',
            display    : 'block',


            // sizes:
            // fill the entire parent:
            inlineSize     : 'fill-available',
            blockSize      : 'fill-available',
            fallbacks      : {
                inlineSize : '100%',
                blockSize  : '100%',
            },
            
            
            
            // apply *non conditional* fn props:
            anim : this.ref(this._animIconFn),
        },
    }}
    protected basicLabelStyle(): JssStyle { return {
        // apply *non conditional* fn props:
        foreg : this.ref(this._foregLabelFn),
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
    
    
    
        // the dummy text content, for making height as tall as line-height
        '&::before': {
            content    : '"\xa0"', // &nbsp;
            display    : 'inline',
            
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
            inlineSize: 0, blockSize: 0, border: 0,
            marginInlineEnd: 0,
        },

        [labelElm] : buttonStyles.basicStyle(),
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
            inlineSize   : '2em', // make the width twice the height
            borderRadius : cssProps.switchBorderRadius,



            // children:
            [iconElm]: {
                [iconStyles.decl(iconStyles._img)] : cssProps.switchImg,
            },
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
        EditableControls.Props,
        VariantCheck
{
    // essentials:
    elmRef? : React.Ref<HTMLInputElement>


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
        onChange,


        // validations:
        required,


        // formats:
        type,
    ...otherProps}  = props;

    return (
        <EditableControl
            // default props:
            tag='label' // default [tag]=label


            // other props:
            {...otherProps}


            // unchanged props:
            tabIndex={-1}


            // classes:
            classes={[
                // main:
                (props.classes ? null : chkStyles.main),


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
            />
            { (props.text || props.children) &&
                <span onAnimationEnd={stateChkClr.handleAnimationEndPress}>
                    { props.text }
                    { props.children }
                </span>
            }
        </EditableControl>
    );
}