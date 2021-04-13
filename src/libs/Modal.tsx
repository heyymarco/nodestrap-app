// react (builds html using javascript):
import
    React, {
    useRef,
    useEffect,
}                           from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
    Styles,
    Classes,
}                           from 'jss'          // ts defs support for jss
import {
    PropEx,
    Cust,
}                           from './Css'        // ts defs support for jss
import CssConfig            from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.
import type {
    Dictionary,
}                          from './CssConfig'   // ts defs support for jss

// nodestrap (modular web components):
import * as stripOuts       from './strip-outs'
import {
    cssProps as ecssProps,
    cssDecls as ecssDecls,
}                           from './Element'
import {
    styles as containerStyles,
}                           from './Container'
import {
    default  as Indicator,
    IndicatorStylesBuilder,
    cssProps as icssProps,
    cssDecls as icssDecls,
}                           from './Indicator'
import {
    cssProps as ccssProps,
    cssDecls as ccssDecls,
}                           from './Content'
import {
    default  as Card,
    cssProps as rcssProps,
    cssDecls as rcssDecls,
}                           from './Card'
import type * as Cards      from './Card'
import Button               from './ButtonIcon'
import typos                from './typos/index' // configurable typography (texting) defs



// styles:

const scrollElm      = '& >*';
const cardElm        = '& >*';
const cardItemsElm   = '& >*';

export class ModalStylesBuilder extends IndicatorStylesBuilder {
    //#region global css props
    protected overwriteParentProps<TCssProps>(cssProps: TCssProps): JssStyle {
        const cssPropsCopy: Dictionary<any> = {};
        for (const [name, prop] of Object.entries(this.filterGeneralProps(cssProps))) {
            cssPropsCopy[
                (((() => {
                         if (name in rcssProps) return rcssDecls; // parent: Card
                    else if (name in ccssProps) return ccssDecls; // parent: Content
                    else if (name in icssProps) return icssDecls; // parent: Indicator
                    else if (name in ecssProps) return ecssDecls; // parent: Element
                    else                        return null;      // no parent found
                })() ?? name) as Dictionary<any>)[name]
            ] = prop;
        }
        return cssPropsCopy as JssStyle;
    }
    //#endregion global css props



    //#region scoped css props
    /**
     * functional animations for the modal's background.
     */
    public    readonly _animBackgFn              = 'animBackgFn'



    // anim props:

    protected readonly _animBackgActivePassive   = 'animBackgActivePassive'
    //#endregion scoped css props



    //#region mixins
    protected applyStateActive(): JssStyle { return {}; }
    //#endregion mixins



    // themes:
    // disable themes:
    public themeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle { return {}; }
    public sizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {}; }
    public gradient(): JssStyle { return {}; }
    public outlined(): JssStyle  { return {}; }



    // states:
    public indicationFnProps(): JssStyle { return {}; }
    public indicationThemesIf(): JssStyle { return {}; }
    public indicationStates(inherit = false): JssStyle { return {}; }

    public modalFnProps(): JssStyle { return {
        // define an *animations* func for the modal's content:
        [this.decl(this._animFn)]: [
            ecssProps.anim,
            this.ref(this._animActivePassive),
        ],

        // define an *animations* func for the modal's background:
        [this.decl(this._animBackgFn)]: [
            this.ref(this._animBackgActivePassive),
        ],
    }}
    public modalThemesIf(): JssStyle { return {}; }
    public modalStates(inherit = false): JssStyle { return {
        extend: [
            this.iif(!inherit, {
                //#region all initial states are none
                [this.decl(this._animActivePassive)]      : ecssProps.animNone,
                [this.decl(this._animBackgActivePassive)] : ecssProps.animNone,
                //#endregion all initial states are none
            }),

    
    
            //#region specific states
            //#region active, passive
            this.stateActive({ // [activating, actived]
                [this.decl(this._animActivePassive)]      : cssProps.animActive,
                [this.decl(this._animBackgActivePassive)] : cssProps.animBackgActive,
    
                extend: [
                    this.applyStateActive(),
                ] as JssStyle,
            }),
            this.statePassivating({ // [passivating]
                [this.decl(this._animActivePassive)]      : cssProps.animPassive,
                [this.decl(this._animBackgActivePassive)] : cssProps.animBackgPassive,
            }),
            this.stateNotActivePassivating({ // hides the modal if not [activating, actived, passivating]
                display: 'none',
            }),
            {
                // [actived]
                '&.actived': // if activated programmatically (not by user input), disable the animation
                    this.applyStateNoAnimStartup(),
            },
            //#endregion active, passive
            //#endregion specific states
        ] as JssStyle,
    }}

    protected fnProps(): JssStyle { return {
        extend: [
            super.fnProps(), // copy functional props from base

            this.modalFnProps(),
        ] as JssStyle,
    }}
    protected themesIf(): JssStyle { return {
        extend: [
            super.themesIf(), // copy themes from base

            this.modalThemesIf(),
        ] as JssStyle,
    }}
    protected states(inherit = false): JssStyle { return {
        extend: [
            super.states(inherit), // copy states from base
    
            this.modalStates(inherit),
        ] as JssStyle,
    }}



    // styles:
    public basicStyle(): JssStyle { return {
        extend: [
            this.filterPrefixProps(cssProps, 'backg'), // apply cssProps starting with backg***
        ] as JssStyle,


        // layout:
        display      : 'grid',         // we use grid, so we can align the card both horizontally & vertically
        justifyItems : 'center',       // align center horizontally
        alignItems   : cssProps.align, // align (defaults center) vertically


        // sizes:
        // fill the entire screen:
        position : 'fixed',
        inset    : 0,

            
        // scrollers:
        // scroller at modal layer & at content's body layer:
        '&, & >* >* >.body': {
            overflowInline : 'hidden', // no horizontal scrolling
            overflowBlock  : 'auto',   // enable vertical scrolling
            fallbacks: {
                overflowX  : 'hidden', // no horizontal scrolling
                overflowY  : 'auto',   // enable vertical scrolling
            },
        },


        // apply *non conditional* fn props:
        anim : this.ref(this._animBackgFn),



        // wrapper (add scrolling paddings):
        [scrollElm]: { // scrolling layer with additional paddings (responsive container)
            extend: [
                containerStyles.basicContainerStyle(), // applies responsive container functionality
            ] as JssStyle,


            // layout:
            display      : 'inherit',
            justifyItems : 'inherit',
            alignItems   : 'inherit',


            // sizes:
            blockSize    : 'fit-content', // follows the content's height (or switch to the maximum available parent's height)
            boxSizing    : 'border-box',


            // scrollers:
            overflow     : 'hidden', // force content to shrink if overflowed



            // children:
            ...(() => {
                const newCardProps = this.overwriteParentProps(cssProps);

                return {
                    ...this.backupProps(newCardProps), // backup cardProps
                    [cardElm]: { // card layer
                        extend: [
                            stripOuts.focusableElement, // clear browser's default styles
                        ] as JssStyle,

                        '&:not(._)': { // force overwrite
                            [this.decl(this._animFn)]: 'inherit', // inherit from Modal

                            blockSize    : 'auto', // follows the content's height
                            maxBlockSize : '100%', // but limits the height up to the parent's height

                            extend: [
                                newCardProps, // overwrite cardProps
                            ] as JssStyle,
                        },
        
        
                        // card items:
                        [cardItemsElm]: this.restoreProps(newCardProps), // restore cardProps
                    },
                };
            })(),
        },
    }}
    public scrollableStyle(): JssStyle { return {
        [scrollElm]: { // scrolling layer with additional paddings (responsive container)
            // sizes:
            blockSize : '100%', // switch to the maximum available parent's height
        },
    }}
    protected styles(): Styles<'main'|'actionBar'> {
        const styles = super.styles();
        Object.assign(styles.main, {
            '&.scrollable' : this.scrollableStyle(),
        });
        return {
            ...styles,

            actionBar: {
                // layout:
                display        : 'flex',
                justifyContent : 'space-between', // separates items horizontally
                alignItems     : 'center', // center items vertically


                // children:
                '& :first-child:last-child': {
                    marginInlineStart: 'auto',
                },
            },
        };
    }
    public useStyles(): Classes<'main'|'actionBar'> {
        return super.useStyles() as Classes<'main'|'actionBar'>;
    }
}
export const styles = new ModalStylesBuilder();



// configs:

const cssConfig = new CssConfig(() => {
    // common css values:
    // const initial = 'initial';
    // const unset   = 'unset';
    // const none    = 'none';
    // const inherit = 'inherit';
    const center  = 'center';
    // const middle  = 'middle';


    const keyframesActive       : PropEx.Keyframes = {
        from: {
            opacity   : 0,
            transform : 'scale(0)',
        },
        '70%': {
            transform : 'scale(1.1)',
        },
        to: {
            opacity   : 1,
            transform : 'scale(1)',
        },
    };
    const keyframesPassive      : PropEx.Keyframes = {
        from  : keyframesActive.to,
        '30%' : keyframesActive['70%'],
        to    : keyframesActive.from,
    };

    const keyframesBackgActive  : PropEx.Keyframes = {
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
            background: 'rgba(0,0,0, 0.5)',
        },
    };
    const keyframesBackgPassive : PropEx.Keyframes = {
        from : keyframesBackgActive.to,
        to   : keyframesBackgActive.from,
    };


    return {
        align                     : center,

        backg                     : typos.backg,
        boxShadow                 : [[0, 0, '10px', 'black']],
        

        // anim props:

        '@keyframes active'       : keyframesActive,
        '@keyframes passive'      : keyframesPassive,
        animActive                : [['300ms', 'ease-out', 'both', keyframesActive ]],
        animPassive               : [['500ms', 'ease-out', 'both', keyframesPassive]],

        '@keyframes backgActive'  : keyframesBackgActive,
        '@keyframes backgPassive' : keyframesBackgPassive,
        animBackgActive           : [['300ms', 'ease-out', 'both', keyframesBackgActive ]],
        animBackgPassive          : [['500ms', 'ease-out', 'both', keyframesBackgPassive]],
    };
}, /*prefix: */'mod');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// hooks:

export type ModalStyle = 'scrollable' // might be added more styles in the future
export interface VariantModal {
    modalStyle?: ModalStyle
}
export function useVariantModal(props: VariantModal) {
    return {
        class: props.modalStyle ? props.modalStyle : null,
    };
}



// react components:

export type CloseType = 'ui' | 'backg' | 'shortcut';
export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        Cards.Props<TElement>,
        VariantModal
{
    // accessibility:
    tabIndex?   : number


    // actions:
    onClose?    : (closeType: CloseType) => void
}
export default function Modal<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    const modStyles = styles.useStyles();

    // layouts:
    const variModal = useVariantModal(props);



    const modRef = useRef<HTMLElement>();
    useEffect(() => {
        if (props.active) {
            modRef.current?.focus(); // when actived => focus the dialog, so the user able to use [esc] key to close the dialog
        }
    }, [props.active]);



    const {
        // accessibility:
        active,
        tabIndex,


        // actions:
        onClose,


        // layouts:
        modalStyle,
        

        // children:
        header,
        footer,
        ...otherProps } = props;
    
    const header2 = ((header === undefined) || (typeof(header) === 'string')) ? (
        <h5 className={modStyles.actionBar}>
            { header }
            <Button btnStyle='link' theme='secondary' aria-label='Close' icon='close' onClick={() => props.onClose?.('ui')} />
        </h5>
    ) : header;

    const footer2 = ((footer === undefined) || (typeof(footer) === 'string')) ? (
        <p className={modStyles.actionBar}>
            { footer }
            <Button theme='primary' text='Close' onClick={() => props.onClose?.('ui')} />
        </p>
    ) : footer;

    return (
        <Indicator
            // main:
            mainClass={props.mainClass ?? modStyles.main}


            // classes:
            classes={[
                // additionals:
                ...(props.classes ?? []),


                // themes:
                variModal.class,
            ]}


            // indications:
            active={active}


            // events:
            // watch [escape key] on the whole modal, including card & children:
            onKeyDown={(e) => {
                if ((e.code === 'Escape') || (e.key === 'Escape')) props.onClose?.('shortcut');
            }}

            // watch left click on the backg only (not at the card):
            onClick={(e) => {
                if ((e.target === e.currentTarget) && (e.type === 'click')) props.onClose?.('backg');
            }}
        >
            <div>
                <Card<TElement>
                    // other props:
                    {...otherProps}

                    
                    // essentials:
                    elmRef={(elm) => {
                        // @ts-ignore
                        modRef.current = elm;


                        // forwards:
                        const elmRef = props.elmRef;
                        if (elmRef) {
                            if (typeof(elmRef) === 'function') {
                                elmRef(elm);
                            }
                            else {
                                // @ts-ignore
                                elmRef.current = elm;
                            } // if
                        } // if
                    }}


                    // Control props:
                    {...{
                        // accessibility:
                        tabIndex : tabIndex ?? -1,
                    }}


                    // children:
                    header={header2}
                    footer={footer2}
                />
            </div>
        </Indicator>
    );
}