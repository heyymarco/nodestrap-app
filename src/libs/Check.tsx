// react (builds html using javascript):
import {
    default as React,
    useRef,
}                           from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    PropEx,
    Cust,
    RuleList,
    PropList,


    // components:
    CssConfig,
}                           from './nodestrap'  // nodestrap's core
import {
    usePropEnabled,
}                           from './accessibilities'
import {
    TogglerActiveProps,
    useTogglerActive,
}                           from './Indicator'
import {
    ActionControlStyles,
}                           from './ActionControl'
import {
    EditableActionControlStyles,
    EditableActionControlProps,
    EditableActionControl,
}                           from './EditableActionControl'
import {
    iconStyles,
}                           from './Icon'
import {
    buttonStyles,
}                           from './Button'



// styles:

const inputElm = '&>:first-child';
const checkElm = '&::before';
const labelElm = '&>:nth-child(1n+2)';

class BtnStyles extends ActionControlStyles {
    // variants:
    public /*override*/ themes()                             : RuleList { return [] } // disabled

    public /*override*/ sizes()                              : RuleList { return [] } // disabled

    public /*override*/ noGradient(inherit = false)          : JssStyle { return {} } // disabled
    public /*override*/ gradient()                           : JssStyle { return {} } // disabled

    public /*override*/ noOutlined(inherit = false)          : JssStyle { return {} } // disabled
    public /*override*/ outlined()                           : JssStyle { return {} } // disabled

    public /*override*/ noMild(inherit = false)              : JssStyle { return {} } // disabled
    public /*override*/ mild()                               : JssStyle { return {} } // disabled



    // states:
    public /*override*/ resetDefaultState(inherit = false)   : PropList { return {} } // disabled

    public /*override*/ resetEnableDisable(inherit: boolean) : PropList { return {} } // disabled
    public /*override*/ enabled()                            : JssStyle { return {} } // disabled
    public /*override*/ enabling()                           : JssStyle { return {} } // disabled
    public /*override*/ disabling()                          : JssStyle { return {} } // disabled
    public /*override*/ disabled()                           : JssStyle { return {} } // disabled

    // active/passive => press/release
    public /*override*/ resetActivePassive(inherit: boolean) : PropList { return {} } // disabled
    public /*override*/ actived()                            : JssStyle { return {} } // disabled
    public /*override*/ activating()                         : JssStyle { return {} } // disabled
    public /*override*/ passivating()                        : JssStyle { return {} } // disabled
    public /*override*/ passived()                           : JssStyle { return {} } // disabled
    public /*override*/ markActive()                         : JssStyle { return {} } // disabled
    public /*override*/ themeActive(theme = 'primary')       : PropList { return {} } // disabled

    public /*override*/ resetFocusBlur(inherit: boolean)     : PropList { return {} } // disabled
    public /*override*/ focused()                            : JssStyle { return {} } // disabled
    public /*override*/ focusing()                           : JssStyle { return {} } // disabled
    public /*override*/ blurring()                           : JssStyle { return {} } // disabled
    public /*override*/ blurred()                            : JssStyle { return {} } // disabled

    public /*override*/ resetArriveLeave(inherit: boolean)   : PropList { return {} } // disabled
    public /*override*/ arrived()                            : JssStyle { return {} } // disabled
    public /*override*/ arriving()                           : JssStyle { return {} } // disabled
    public /*override*/ leaving()                            : JssStyle { return {} } // disabled
    public /*override*/ left()                               : JssStyle { return {} } // disabled

    public /*override*/ resetPressRelease(inherit: boolean)  : PropList { return {} } // disabled
    public /*override*/ pressed()                            : JssStyle { return {} } // disabled
    public /*override*/ pressing()                           : JssStyle { return {} } // disabled
    public /*override*/ releasing()                          : JssStyle { return {} } // disabled
    public /*override*/ released()                           : JssStyle { return {} } // disabled



    // functions:
    public /*override*/ propsFn()                            : PropList { return {} } // disabled



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        [labelElm]: {
            extend: [
                buttonStyles.basicStyle(),
            ] as JssStyle,
    
    
    
            // customize:
            ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'btn')), // apply *general* cssProps starting with btn***
        } as JssStyle,
    }}
}

class TogglerBtnStyles extends BtnStyles {
    // states:
    // active/passive => press/release
    public /*override*/ actived()     : JssStyle { return super.pressed()   }
    public /*override*/ activating()  : JssStyle { return super.pressing()  }
    public /*override*/ passivating() : JssStyle { return super.releasing() }
    public /*override*/ passived()    : JssStyle { return super.released()  }
}

export class CheckStyles extends EditableActionControlStyles {
    //#region props
    //#region finals
    /**
     * final filter for the check.
     */
    public    readonly _checkFilter         = 'checkFilter'

    /**
     * final transform for the check.
     */
    public    readonly _checkTransf         = 'checkTransf'

    /**
     * final animation for the check.
     */
    public    readonly _checkAnim           = 'checkAnim'
    //#endregion finals



    //#region animations
    public    readonly _filterCheckClearIn  = 'filterCheckClearIn'
    public    readonly _filterCheckClearOut = 'filterCheckClearOut'

    public    readonly _transfCheckClearIn  = 'transfCheckClearIn'
    public    readonly _transfCheckClearOut = 'transfCheckClearOut'

    protected readonly _animCheckClear      = 'animCheckClear'
    //#endregion animations
    //#endregion props



    // variants:
    public /*override*/ variants(): RuleList { return [
        ...super.variants(), // copy variants from base



        [ 'btn'       , this.button()        ],
        [ 'togglerBtn', this.togglerButton() ],
        [ 'switch'    , this.switch()        ],
    ]}
    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}
    protected /*virtual*/ hideInput(): JssStyle { return {
        // children:
        [inputElm] : {
            // hides the checkbox while still preserving animations
            
            
            
            // appearances:
            visibility : 'hidden', // invisible but still exists
    
    
    
            // sizes:
            boxSizing  : 'border-box', // the final size is including borders & paddings
            inlineSize : 0, // kill the width
            blockSize  : 0, // kill the height
    
    
    
            // borders:
            border     : 0, // kill the border
    
    
    
            // spacings:
            padding    : 0, // kill the paddings
    
            '&:not(:last-child)': {
                marginInlineEnd : 0, // kill the spacing between input & label
            },
        } as JssStyle,
    }}
    public /*virtual*/ button(): JssStyle { return {
        extend: [
            this.hideInput(),

            (new BtnStyles()).compositeStyle(),
        ] as JssStyle,
    }}
    public /*virtual*/ togglerButton(): JssStyle { return {
        extend: [
            this.hideInput(),

            (new TogglerBtnStyles()).compositeStyle(),
        ] as JssStyle,
    }}
    public /*virtual*/ switch(): JssStyle { return {
        // children:
        [inputElm]: {
            // sizes:
            inlineSize   : '2em',   // make the width twice the height



            // borders:
            borderRadius : '0.5em', // make circle corners



            // customize:
            ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'switch')), // apply *general* cssProps starting with switch***
        },


        
        // overwrites propName = {switch}propName:
        ...this.overwriteProps(cssDecls, this.filterPrefixProps(cssProps, 'switch')),
    }}



    // states:
    public /*override*/ resetActivePassive(inherit: boolean) : PropList { return {
        ...super.resetActivePassive(inherit), // copy resetActivePassive from base



        [this.decl(this._filterCheckClearIn)]  : inherit ? 'unset' : 'initial',
        [this.decl(this._filterCheckClearOut)] : inherit ? 'unset' : 'initial',

        [this.decl(this._transfCheckClearIn)]  : inherit ? 'unset' : 'initial',
        [this.decl(this._transfCheckClearOut)] : inherit ? 'unset' : 'initial',

        [this.decl(this._animCheckClear)]      : inherit ? 'unset' : 'initial',
    }}
    public /*override*/ actived()     : JssStyle { return {
        extend: [
            super.actived(), // copy actived from base
        ] as JssStyle,



        [this.decl(this._filterCheckClearIn)]  : cssProps.filterCheck,
        [this.decl(this._transfCheckClearIn)]  : cssProps.transfCheck,
    }}
    public /*override*/ activating()  : JssStyle { return {
        extend: [
            super.activating(), // copy activating from base
        ] as JssStyle,



        [this.decl(this._filterCheckClearIn)]  : cssProps.filterCheck,
        [this.decl(this._filterCheckClearOut)] : cssProps.filterClear,

        [this.decl(this._transfCheckClearIn)]  : cssProps.transfCheck,
        [this.decl(this._transfCheckClearOut)] : cssProps.transfClear,

        [this.decl(this._animCheckClear)]      : cssProps.animCheck,
    }}
    public /*override*/ passivating() : JssStyle { return {
        extend: [
            super.passivating(), // copy passivating from base
        ] as JssStyle,



        [this.decl(this._filterCheckClearIn)]  : cssProps.filterCheck,
        [this.decl(this._filterCheckClearOut)] : cssProps.filterClear,

        [this.decl(this._transfCheckClearIn)]  : cssProps.transfCheck,
        [this.decl(this._transfCheckClearOut)] : cssProps.transfClear,

        [this.decl(this._animCheckClear)]      : cssProps.animClear,
    }}
    public /*override*/ passived()    : JssStyle { return {
        extend: [
            super.passived(), // copy passived from base
        ] as JssStyle,



        [this.decl(this._filterCheckClearOut)] : cssProps.filterClear,
        [this.decl(this._transfCheckClearOut)] : cssProps.transfClear,
    }}



    // functions:
    public /*override*/ propsFn(): PropList { return {
        ...super.propsFn(), // copy functional props from base
        
        
        
        //#region finals
        // define a final *filter* func for the icon:
        [this.decl(this._checkFilter)] : [this.checkFilterFn()], // double array (including from the returning function) => makes the JSS treat as space separated values

        // define a final *transform* func for the icon:
        [this.decl(this._checkTransf)] : [this.checkTransfFn()], // double array (including from the returning function) => makes the JSS treat as space separated values

        // define a final *animation* func for the icon:
        [this.decl(this._checkAnim)]   : this.checkAnimFn(),     // single array (including from the returning function) => makes the JSS treat as comma separated values
        //#endregion finals
    }}
    public /*virtual*/ checkFilterFn(): Cust.Ref[] { return [
        this.ref(this._filterCheckClearIn,  this._filterNone),
        this.ref(this._filterCheckClearOut, this._filterNone),
    ]}
    public /*virtual*/ checkTransfFn(): Cust.Ref[] { return [
        this.ref(this._transfCheckClearIn,  this._transfNone),
        this.ref(this._transfCheckClearOut, this._transfNone),
    ]}
    public /*virtual*/ checkAnimFn(): Cust.Ref[] { return [
        this.ref(this._animCheckClear, this._animNone),
    ]}



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base
        ] as JssStyle,



        // layout:
        display        : 'inline-flex', // use inline flexbox, so it takes the width & height as we set
        flexDirection  : 'row',         // flow to the document's writting flow
        justifyContent : 'start',       // items are placed starting from the left
        alignItems     : 'center',      // center items vertically
        flexWrap       : 'wrap',        // allows the children to wrap to the next row



        // positions:
        verticalAlign  : 'baseline', // check's text should be aligned with sibling text, so the check behave like <span> wrapper



        // foregrounds:
        foreg          : this.ref(this._mildForegFn),
        
        
        
        // backgrounds:
        backg          : 'initial !important', // no valid/invalid animation



        // borders:
        border         : undefined as unknown as null, // discard basicStyle's border
        borderRadius   : undefined as unknown as null, // discard basicStyle's borderRadius



        // spacings:
        paddingInline  : undefined as unknown as null, // discard basicStyle's paddingInline
        paddingBlock   : undefined as unknown as null, // discard basicStyle's paddingBlock



        // states & animations:
        boxShadow      : 'initial !important', // no focus animation
    
    
    
        // a dummy text content, for making parent's height as tall as line-height
        // the dummy is also used for calibrating the flex's vertical position
        '&::before': {
            // layout:
            content    : '"\xa0"',       // &nbsp;
            display    : 'inline-block', // use inline-block, so we can kill the width
            


            // appearances:
            overflow   : 'hidden', // crop the text width (&nbsp;)
            visibility : 'hidden', // hide the element, but still consumes the dimension

            
            
            // sizes:
            inlineSize : 0,        // kill the width, we just need the height
        },
    
    
    
        // children:
        [inputElm]     : this.inputBasicStyle(),
        [labelElm]     : this.labelBasicStyle(),
    }}
    protected /*virtual*/ inputBasicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base
        ] as JssStyle,
    


        // layout:
        display       : 'inline-block', // use inline-block, so it takes the width & height as we set



        // sizes:
        boxSizing     : 'border-box', // the final size is including borders & paddings
        // the size is exactly the same as current font size:
        inlineSize    : '1em',
        blockSize     : '1em',



        // spacings:
        paddingInline : undefined as unknown as null, // discard basicStyle's paddingInline
        paddingBlock  : undefined as unknown as null, // discard basicStyle's paddingBlock

        // spacing between input & label:
        '&:not(:last-child)': {
            marginInlineEnd : cssProps.spacing,
        },
    
    
    
        // borders:
        overflow      : 'hidden', // clip the icon at borderRadius



        // accessibility:
        pointerEvents : 'none', // just an overlay element (ghost), no mouse interaction, clicking on it will focus on the parent
    
        
        
        // children:
        [checkElm]    : this.checkBasicStyle(),



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
    protected /*virtual*/ checkBasicStyle(): JssStyle { return {
        extend: [
            iconStyles.useIcon( // apply icon
                /*img   :*/ cssProps.img,
                /*foreg :*/ this.ref(this._foreg)
            ),
        ] as JssStyle,



        // layout:
        content   : '""',
        display   : 'block', // fills the entire parent's width



        // sizes:
        // fills the entire parent:
        boxSizing : 'border-box', // the final size is including borders & paddings
        blockSize : '100%', // fills the entire parent's height
        
        
        
        // states & animations:
        filter    : this.ref(this._checkFilter),
        transform : this.ref(this._checkTransf),
        anim      : this.ref(this._checkAnim),
    }}
    protected /*virtual*/ labelBasicStyle(): JssStyle { return {
        // layout:
        display       : 'inline', // use inline, so it takes the width & height automatically



        // positions:
        verticalAlign : 'baseline', // label's text should be aligned with sibling text, so the label behave like <span> wrapper



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'label')), // apply *general* cssProps starting with label***
    }}
}
export const checkStyles = new CheckStyles();



// configs:

const cssConfig = new CssConfig(() => {
    const keyframesCheck         : PropEx.Keyframes = {
        from: {
            filter: [[
                checkStyles.ref(checkStyles._filterCheckClearOut),
            ]],
            transform: [[
                checkStyles.ref(checkStyles._transfCheckClearOut),
            ]],
        },
        to: {
            filter: [[
                checkStyles.ref(checkStyles._filterCheckClearIn),
            ]],
            transform: [[
                checkStyles.ref(checkStyles._transfCheckClearIn),
            ]],
        },
    };
    const keyframesClear         : PropEx.Keyframes = {
        from : keyframesCheck.to,
        to   : keyframesCheck.from,
    };

    
    
    const keyframesSwitchCheck   : PropEx.Keyframes = {
        from : keyframesCheck.from,
        '75%': {
            transformOrigin: 'left', // todo: orientation aware transform => left will be top if the element rotated 90deg clockwise
            transform: [[
                'scaleX(1.2)', // add a bumpy effect
                checkStyles.ref(checkStyles._transfCheckClearIn),
            ]],
        },
        to   : keyframesCheck.to,
    };
    const keyframesSwitchClear   : PropEx.Keyframes = {
        from : keyframesSwitchCheck.to,
        '75%': {
            transformOrigin: 'right', // todo: orientation aware transform => right will be bottom if the element rotated 90deg clockwise
            transform: [[
                'scaleX(1.2)', // add a bumpy effect
                checkStyles.ref(checkStyles._transfCheckClearOut),
            ]],
        },
        to   : keyframesSwitchCheck.from,
    };

    
    
    return {
        // spacings:
        spacing                  : '0.3em',
        
        
        
        //#region indicators
        // forked from Bootstrap 5:
        img                      : `url("data:image/svg+xml,${checkStyles.escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path fill='none' stroke='#000' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3 6-6'/></svg>")}")`,
        
        // forked from Bootstrap 5:
        switchImg                : `url("data:image/svg+xml,${checkStyles.escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='3' fill='#000'/></svg>")}")`,
        //#endregion indicators
        
        
        
        //#region animations
        filterCheck              : [['opacity(100%)']],
        filterClear              : [['opacity(0%)'  ]],
        transfCheck              : 'initial',
        transfClear              : 'initial',

        '@keyframes check'       : keyframesCheck,
        '@keyframes clear'       : keyframesClear,
        animCheck                : [['150ms', 'ease-out', 'both', keyframesCheck      ]],
        animClear                : [['150ms', 'ease-out', 'both', keyframesClear      ]],



        switchFilterCheck        : [['opacity(100%)'     ]],
        switchFilterClear        : [['opacity(50%)'      ]],
        switchTransfCheck        : [['translateX(0.5em)' ]],
        switchTransfClear        : [['translateX(-0.5em)']],

        '@keyframes switchCheck' : keyframesSwitchCheck,
        '@keyframes switchClear' : keyframesSwitchClear,
        switchAnimCheck          : [['200ms', 'ease-out', 'both', keyframesSwitchCheck]],
        switchAnimClear          : [['200ms', 'ease-out', 'both', keyframesSwitchClear]],
        //#endregion animations
    };
}, /*prefix: */'chk');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// hooks:

export type ChkStyle = 'btn' | 'togglerBtn' | 'switch' // might be added more styles in the future
export interface VariantCheck {
    chkStyle?: ChkStyle
}
export function useVariantCheck(props: VariantCheck, styles: Record<string, string>) {
    return {
        class: props.chkStyle ? props.chkStyle : null,
    };
}



// react components:

export interface CheckProps
    extends
        EditableActionControlProps<HTMLInputElement>,
        TogglerActiveProps,

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


    // events:
    onChange?       : React.ChangeEventHandler<HTMLInputElement>


    // children:
    children?       : React.ReactNode
}
export default function Check(props: CheckProps) {
    // styles:
    const styles    = checkStyles.useStyles();

    
    
    // variants:
    const variCheck = useVariantCheck(props, styles);

    
    
    // states:
    const inputRef  = useRef<HTMLInputElement|null>(null);
    const [isActive, setActive] = useTogglerActive({
        ...props,

        defaultActive : props.defaultActive ?? props.defaultChecked, // forwards `defaultChecked` to `defaultActive`
        active        : props.active        ?? props.checked,        // forwards `checked`        to `active`
    }, /*changeEventTarget :*/inputRef);

    

    // rest props:
    const {
        // essentials:
        elmRef,


        // accessibility:
        defaultActive,  // delete, already handled by `useTogglerActive`
        active,         // delete, already handled by `useTogglerActive`
        onActiveChange, // delete, already handled by `useTogglerActive`

        defaultChecked, // delete, already forwarded to `defaultActive`
        checked,        // delete, already forwarded to `active`
        onChange,       // forwards to `input[type='checkbox']`


        // values:
        defaultValue,
        value,


        // validations:
        required,


        // formats:
        type,
    ...restProps}  = props;



    // handlers:
    const handleToggleActive = () => {
        setActive(!isActive); // toggle active
    }



    // fn props:
    const propEnabled = usePropEnabled(props);

    const ariaRole    = props.role            ?? 'checkbox';
    const ariaChecked = props['aria-checked'] ?? ((ariaRole === 'checkbox') ? isActive : undefined);

    
    
    // jsx:
    return (
        <EditableActionControl<HTMLInputElement>
            // other props:
            {...restProps}


            // essentials:
            tag={props.tag ?? 'span'}


            // accessibility:
            role={ariaRole}
            aria-checked={ariaChecked}
            aria-label={props.label}
            active={isActive}


            // variants:
            mild={props.mild ?? false}


            // classes:
            mainClass={props.mainClass ?? styles.main}
            variantClasses={[...(props.variantClasses ?? []),
                variCheck.class,
            ]}


            // events:
            onClick={(e) => {
                // backwards:
                props.onClick?.(e);
                
                
                
                if (!e.defaultPrevented) {
                    handleToggleActive();
                    e.preventDefault();
                } // if
            }}
            onKeyUp={(e) => {
                // backwards:
                props.onKeyUp?.(e);



                if (!e.defaultPrevented) {
                    if ((e.key === ' ') || (e.code === 'Space')) {
                        handleToggleActive();
                        e.preventDefault();
                    } // if
                } // if
            }}
        >
            <input
                // essentials:
                ref={(elm) => {
                    inputRef.current = elm;
    
    
                    // forwards:
                    if (elmRef) {
                        if (typeof(elmRef) === 'function') {
                            elmRef(elm);
                        }
                        else {
                            (elmRef as React.MutableRefObject<HTMLInputElement|null>).current = elm;
                        } // if
                    } // if
                }}


                // accessibility:
                aria-hidden={true} // the input just for check indicator & storing value
                tabIndex={-1}      // non focusable
                
                disabled={!propEnabled} // do not submit the value if disabled
                readOnly={true}    // for satisfying React of **controllable readOnly check**
                checked={isActive} // **controllable check**


                // values:
                defaultValue={defaultValue}
                value={value}


                // validations:
                required={required}


                // formats:
                type={type ?? 'checkbox'}


                // events:
                onAnimationEnd={(e) => {
                    // triggers parent's onAnimationEnd event
                    e.currentTarget.parentElement?.dispatchEvent(new AnimationEvent('animationend', { animationName: e.animationName, bubbles: true }));
                }}

                onChange={onChange} // forwards `onChange` event
                onClick={(e) => e.stopPropagation()} // prevents firing `change` event triggering parent's `onClick`
            />
            { (props.text || props.children) &&
                <span
                    // events:
                    // listening input's onAnimationEnd is enough
                    // onAnimationEnd={(e) => {
                    //     // triggers parent's onAnimationEnd event
                    //     e.currentTarget.parentElement?.dispatchEvent(new AnimationEvent('animationend', { animationName: e.animationName, bubbles: true }));
                    // }}
                >
                    { props.text }
                    { props.children }
                </span>
            }
        </EditableActionControl>
    );
}
export { Check }