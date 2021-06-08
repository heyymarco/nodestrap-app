// react (builds html using javascript):
import {
    default as React,
    useState,
}                           from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
    Styles,
}                           from 'jss'          // ts defs support for jss
import {
    PropEx,
}                           from './Css'        // ts defs support for jss
import CssConfig            from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
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
import {
    usePropEnabled,
}                           from './accessibilities'



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
    protected stateNotChecked(content: JssStyle): JssStyle { return {
        // not fully checked
        '&:not(.checked):not(:checked),&:not(.checked):checked.check': content,
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


    
    protected /*override*/ applyStateNoAnimStartup(): JssStyle {
        return this.stateNotCheckingClearing(
            super.applyStateNoAnimStartup()
        );
    }
    protected /*virtual*/ applyStateCheck(): JssStyle { return {
        extend: [
            // *toggle off* the outlined props:
            this.toggleOffOutlined(),
        ] as JssStyle,
    }}
    //#endregion mixins



    // themes:
    public /*override*/ sizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {
        extend: [
            super.sizeOf(size, Size, sizeProp), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, Size)),
    }}



    // states:
    protected /*virtual*/ checkThemesIf(): JssStyle { return {} }
    protected /*virtual*/ checkStates(inherit = false): JssStyle { return {
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

    protected /*virtual*/ labelThemesIf(): JssStyle { return {} }
    protected /*virtual*/ labelStates(inherit = false): JssStyle { return {
        /*
            watch state on current element but forward the action to sibling element (label)
        */
        
        
        
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
                    /* IF */[chkElm]: this.stateNotFocusingBlurring({ // but still transfering the focus state to the "sibling" element(s):
                        /* THEN [labelElm] */'&~*':
                            super.applyStateNoAnimStartup(),
                    }),
                },
            },
            //#endregion check, clear => label active, passive
            //#endregion specific states
        ] as JssStyle,
    }}

    public /*override*/ themesIf(): JssStyle { return {
        extend: [
            super.themesIf(), // copy themes from base

            this.checkThemesIf(),
            this.labelThemesIf(),
        ] as JssStyle,
    }}
    public /*override*/ states(inherit = false): JssStyle { return {
        extend: [
            super.states(inherit), // copy states from base

            this.checkStates(inherit),
            this.labelStates(inherit),
        ] as JssStyle,
    }}



    // functions:
    protected /*virtual*/ checkPropsFn(): JssStyle { return {
        ...this.checkAnimFn(),
    }}
    protected /*virtual*/ checkAnimFn(): JssStyle { return {
        // define an *animations* func for the icon:
        [this.decl(this._iconAnimFn)]: [
            this.ref(this._animCheckClear),
        ],
    }}

    protected /*virtual*/ labelPropsFn(): JssStyle { return {} }

    public /*override*/ propsFn(): JssStyle { return {
        extend: [
            super.propsFn(), // copy functional props from base

            this.checkPropsFn(),
            this.labelPropsFn(),
        ] as JssStyle,
    }}



    // styles:
    protected /*virtual*/ checkBasicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base
        ] as JssStyle,
    


        // layout:
        display       : 'inline-block',



        // positions:
        verticalAlign : 'baseline', // check's icon should be aligned with sibling text, so the check behave like <span> wrapper
    


        // sizes:
        boxSizing     : 'border-box', // the final size is including borders & paddings
        /* the size is exactly the same as current font size */
        inlineSize    : '1em',
        blockSize     : '1em',



        // spacings:
        paddingInline : undefined as unknown as null,
        paddingBlock  : undefined as unknown as null,

        // spacing between check & label:
        '&:not(:last-child)': {
            marginInlineEnd : cssProps.spacing,
        },
    
    
    
        overflow      : 'hidden', // clip the icon at borderRadius
    
        // children:
        [iconElm]: {
            extend: [
                iconStyles.imgStyle( // apply icon
                    /*img :*/ cssProps.img
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
            anim      : this.ref(this._iconAnimFn),
        },



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
    protected /*virtual*/ labelBasicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base
        ] as JssStyle,
    


        // layout:
        display       : 'inline',



        // positions:
        verticalAlign : 'baseline', // check's text should be aligned with sibling text, so the check behave like <span> wrapper



        // borders:
        border        : undefined as unknown as null,
        borderRadius  : undefined as unknown as null,



        // spacings:
        paddingInline : undefined as unknown as null,
        paddingBlock  : undefined as unknown as null,
        
    
        
        // apply fn props:
        foreg         : this.ref(this._borderFn),



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'label')), // apply *general* cssProps starting with label***
    }}
    public /*override*/ basicStyle(): JssStyle { return {
        // layout:
        display        : 'inline-flex', // use flexbox as the layout
        flexDirection  : 'row',         // items are stacked horizontally
        justifyContent : 'start',       // items are placed starting from the left
        alignItems     : 'center',      // items are placed at the middle vertically
        flexWrap       : 'wrap',



        // positions:
        verticalAlign  : 'baseline', // check's text should be aligned with sibling text, so the check behave like <span> wrapper
    
    
    
        // the dummy text content, for making parent's height as tall as line-height
        // the flex's first-child is used for calibrating the flex's vertical position
        '&::before': {
            // layout:
            content    : '"\xa0"', // &nbsp;
            display    : 'inline-block', // use inline-block, so we can kill the width
            


            // appearances:
            overflow   : 'hidden', // crop the text (&nbsp;)
            visibility : 'hidden', // hide the element, but still consume the dimension
            
            
            
            // sizes:
            inlineSize : 0,        // kill the width, we just need the height
        },
    
    
    
        // children:
        [chkElm]       : this.checkBasicStyle(),
        [labelElm]     : this.labelBasicStyle(),
        '&:not(.btn)'  : {
            [labelElm] : {
                // backgroundless on check/switch mode, but not in btn mode:
                backg     : [['none'], '!important'], // no valid/invalid animation
                boxShadow : [['none'], '!important'], // no focus animation
            },
        },
    }}
    public /*virtual*/ buttonStyle(): JssStyle { return {
        // children:

        [chkElm]   : {
            //#region hides the checkbox while still preserving animation & focus working
            // appearances:
            opacity    : 0,



            // sizes:
            boxSizing  : 'border-box', // the final size is including borders & paddings
            inlineSize : 0,
            blockSize  : 0,



            // spacings:
            padding    : 0,



            // borders:
            border     : 0,
            //#endregion hides the checkbox while still preserving animation & focus working



            // spacings:
            // kill spacing between check & label:
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
    public /*virtual*/ switchStyle(): JssStyle { return {
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
            // sizes:
            inlineSize   : '2em',   // makes the width twice the height



            // borders:
            borderRadius : '0.5em', // makes circle corners



            // children:
            [iconElm]: {
                [iconStyles.decl(iconStyles._img)] : cssProps.switchImg,
            },



            // customize:
            ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'switch')), // apply *general* cssProps starting with switch***
        },
    }}
    protected /*override*/ styles(): Styles<'main'> {
        const styles = super.styles();
        styles.main = {
            extend: [
                styles.main,
                {
                    '&.btn'    : this.buttonStyle(),
                    '&.switch' : this.switchStyle(),
                },
            ] as JssStyle,
        };



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
    // defaults:
    const defaultChecked: boolean = false; // true => checked, false => cleared


    
    // states:
    const [checked,   setChecked  ] = useState<boolean>(props.checked        ?? defaultChecked); // true => checked, false => cleared
    const [animating, setAnimating] = useState<boolean|null>(null);                              // null => no-animation, true => checking-animation, false => clearing-animation

    const [checkedDn, setCheckedDn] = useState<boolean>(props.defaultChecked ?? defaultChecked); // uncontrollable (dynamic) state: true => user checked, false => user cleared



    /*
     * state is checked/cleared based on [controllable checked] (if set) and fallback to [uncontrollable checked]
     */
    const checkedFn: boolean = props.checked /*controllable*/ ?? checkedDn /*uncontrollable*/;

    if (checked !== checkedFn) { // change detected => apply the change & start animating
        setChecked(checkedFn);   // remember the last change
        setAnimating(checkedFn); // start checking-animation/clearing-animation
    }

    
    
    const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        if (props.checked !== undefined) return; // controllable [checked] is set => no uncontrollable required

        
        
        setCheckedDn(target.checked);
    }
    const handleIdle = () => {
        // clean up finished animation

        setAnimating(null); // stop checking-animation/clearing-animation
    }
    return {
        /**
         * partially/fully checked
        */
        checked :  checked,

        /**
         * partially/fully cleared
         */
        cleared : !checked,

        class   : ((): string|null => {
            if (animating === true)  return 'check';
            if (animating === false) return 'clear';

         // if (checked) return 'checked'; // use pseudo :checked

            return null;
        })(),
        handleChange: handleChange,
        handleAnimationEnd : (e: React.AnimationEvent<HTMLElement>) => {
            if (e.target !== e.currentTarget) return; // no bubbling
            if (/((?<![a-z])(check|clear)|(?<=[a-z])(Check|Clear))(?![a-z])/.test(e.animationName)) {
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


    // accessibility:
    label?          : string
    text?           : string


    // children:
    children?       : React.ReactNode
}
export default function Check(props: Props) {
    // styles:
    const chkStyles   = styles.useStyles();

    
    
    // themes:
    const variCheck   = useVariantCheck(props, chkStyles);

    
    
    // states:
    const stateChkClr = useStateCheckClear(props);

    

    // rest props:
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
    ...restProps}  = props;



    // fn props:
    const propEnabled = usePropEnabled(props);
    const isBtnStyle  = props.chkStyle?.startsWith('btn') ?? false;

    
    
    // jsx:
    return (
        <EditableControl<HTMLInputElement>
            // other props:
            {...restProps}


            // essentials:
            tag={props.tag ?? 'label'}


            // accessibility:
            aria-label={props.label}
            tabIndex={-1} // [tabIndex] is negative => act as *wrapper* element, if input is :focus (pseudo) => the wrapper is also .focus (synthetic)


            // classes:
            mainClass={props.mainClass ?? chkStyles.main}
            themeClasses={[...(props.themeClasses ?? []),
                // themes:
                variCheck.class,
            ]}
            stateClasses={[...(props.stateClasses ?? []),
                // states:
                stateChkClr.class ?? (stateChkClr.checked ? 'checked' : null),
            ]}
        >
            <input
                // essentials:
                ref={elmRef}


                // accessibility:
                aria-hidden={isBtnStyle} // if btnStyle => hides the check
                disabled={!propEnabled}
                tabIndex={tabIndex}
                readOnly={readOnly}


                // values:
                defaultValue={defaultValue}
                value={value}
                defaultChecked={defaultChecked}
                checked={checked}
                onChange={stateChkClr.handleChange} // let's bubbling to parent handle onChange


                // validations:
                required={required}


                // formats:
                type={type ?? 'checkbox'}


                // events:
                // onFocus, onBlur // bubble to parent (unlike on native DOM that doesn't bubble, on react *do* bubbling)
                onAnimationEnd={(e) => {
                    // states:
                    stateChkClr.handleAnimationEnd(e);


                    // triggers Listgroup's onAnimationEnd event
                    e.currentTarget.parentElement?.dispatchEvent(new AnimationEvent('animationend', { animationName: e.animationName, bubbles: true }));
                }}
            />
            { (props.text || props.children) &&
                <span>
                    { props.text }
                    { props.children }
                </span>
            }
        </EditableControl>
    );
}