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
    cssProps as ccssProps,
}                           from './Control'
import {
    default  as EditableControl,
    EditableControlStylesBuilder,
}                           from './EditableControl'
import type * as EditableControls   from './EditableControl'
import {
    styles as iconStyles,
}                           from './Icon'



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
        

        
        // apply an *active* color theme for the label:
        [this.decl(this._colorLabelIf)]   : this.ref(this._colorLabelIfAct),
    }}
    protected applyStateValid(): JssStyle { return {
        // apply a *valid* color theme:
        extend: super.applyStateValid(), // copy valid theme from base



        // apply a *valid* color theme for the label:
        [this.decl(this._colorLabelIfIf)] : this.ref(this._colorLabelIfVal),
    }}
    protected applyStateInvalid(): JssStyle { return {
        // apply an *invalid* color theme:
        extend: super.applyStateInvalid(), // copy invalid theme from base



        // apply an *invalid* color theme for the label:
        [this.decl(this._colorLabelIfIf)] : this.ref(this._colorLabelIfInv),
    }}
    //#endregion mixins



    // themes:
    public themeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle { return {
        extend: super.themeOf(theme, Theme, themeProp, themeColor), // copy themes from base



        // customize the *themed* props for the label:
        [this.decl(this._colorLabelTh)]: (colors as DictionaryOf<typeof colors>)[`${theme}Cont`],
    }}



    // states:
    protected checkFnProps(): JssStyle { return {
        // define an *animations* func for the icon:
        [this.decl(this._animIconFn)]: [
            this.ref(this._animCheckClear),
        ],
    }}
    protected checkThemesIf(): JssStyle { return {}; }
    protected checkStates(): JssStyle { return {
        //#region all initial states are none
        [this.decl(this._animCheckClear)]      : ecssProps.animNone,
        //#endregion all initial states are none



        //#region specific states
        extend: [
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
        ] as JssStyle,
        //#endregion specific states
    }}

    protected labelFnProps(): JssStyle { return {
        // define a *foreground* color func for the label:
        [this.decl(this._colorLabelFn)] : this.ref(
            this._colorLabelIfIf, // first  priority
            this._colorLabelTh,   // second priority
            this._colorLabelIf    // third  priority
        ),
    }}
    protected labelThemesIf(): JssStyle { return {
        // define a *default* color theme for the label:
        [this.decl(this._colorLabelIf)]    : colors.secondaryCont,

        // define an *active* color theme for the label:
        [this.decl(this._colorLabelIfAct)] : colors.primaryCont,



        // define a *valid* color theme for the label:
        [this.decl(this._colorLabelIfVal)] : colors.successCont,

        // define an *invalid* color theme for the label:
        [this.decl(this._colorLabelIfInv)] : colors.dangerCont,
    }}
    protected labelStates(): JssStyle { return {
        //#region specific states
        extend: [
            super.states(), // copy states from base
    
    
    
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
                    /* IF */[chkElm]: this.stateNotFocusBlur({ // but still transfering the focus state to the "sibling" element(s):
                        /* THEN [labelElm] */'&~*':
                            super.applyStateNoAnimStartup(),
                    }),
                },
            },
            //#endregion check, clear => label active, passive
    
    
    
            //#region focus, blur => label focus, blur
            this.stateBlurring({
                [labelElm]: {
                    [this.decl(this._boxShadowFocusBlur)]     : this.ref(this._boxShadowFocusFn),
                    [this.decl(this._animFocusBlur)]          : ccssProps.animBlur,
                },
            }),
            this.stateNotDisable({extend: [
                // state focus are possible when enabled
                this.stateFocus({
                    [labelElm]: {
                        [this.decl(this._boxShadowFocusBlur)] : this.ref(this._boxShadowFocusFn),
                        [this.decl(this._animFocusBlur)]      : ccssProps.animFocus,
                        
                        extend: [
                            this.applyStateActive(),
                        ] as JssStyle,
                    },
                }),
            ] as JssStyle}),
            //#endregion focus, blur => label focus, blur
        ] as JssStyle,
        //#endregion specific states
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
    protected states(): JssStyle { return {
        extend: [
            super.states(), // copy states from base

            this.checkStates(),
            this.labelStates(),
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
        color              : null,      // default inherit
        opacity            : null,      // pseudo  inherit
        transition         : 'inherit', // force   inherit
        filter             : null,      // pseudo  inherit

        // accessibility:
        cursor             : 'inherit', // force   inherit
    }}
    protected checkStyle(): JssStyle { return {
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


        // typos:
        verticalAlign : 'baseline',
    

        // sizes:
        /* the size is exactly the same as current font size */
        width     : '1em',
        height    : '1em',
        boxSizing : 'border-box', // the size is *including* the border
        paddingX: 0, paddingY: 0, // no padding
    

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
            content : '""',
            display : 'block',

            // sizes:
            height  : '100%',
            width   : '100%',
            
            
            
            // apply *non conditional* fn props:
            anim : this.ref(this._animIconFn),
        },
    }}
    protected labelStyle(): JssStyle { return {
        // apply *non conditional* fn props:
        color : this.ref(this._colorLabelFn),
    }}
    public basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base
        ] as JssStyle,
    
        

        // force backgroundless:
        backg         : [['none'], '!important'],
        boxShadow     : [['none'], '!important'],
        paddingX      : undefined as unknown as null, // delete
        paddingY      : undefined as unknown as null, // delete
        border        : undefined as unknown as null, // delete
        borderRadius  : undefined as unknown as null, // delete
        
    
        
        // layout:
        display       : 'inline-flex',
        verticalAlign : 'text-bottom',
        alignItems    : 'center',
        flexWrap      : 'wrap',
    
    
    
        // the dummy text content, for making height as tall as line-height
        '&::before': {
            content    : '"\xa0"', // &nbsp;
            display    : 'inline',
            
            width      : 0,
            overflow   : 'hidden',
            visibility : 'hidden',
        },
    
    
    
        [chkElm]   : this.checkStyle(),
        [labelElm] : this.labelStyle(),
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

export type ChkStyle = 'switch' | 'btn' // might be added more styles in the future
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



    const isBtnStyle  = props.chkStyle?.startsWith('btn');

    

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