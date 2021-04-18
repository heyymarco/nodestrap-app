// react (builds html using javascript):
import
    React, {
    useState,
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
    Prop,
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
import Button               from './Button'
import CloseButton          from './CloseButton'
import typos                from './typos/index' // configurable typography (texting) defs



// styles:

const cardElm        = '&>*';
const cardItemsElm   = '&>*';

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
            containerStyles.basicContainerGridStyle(), // apply responsive container functionality using css grid
            this.filterPrefixProps(cssProps, 'backg'), // apply cssProps starting with backg***
        ] as JssStyle,


        // layout:
     // display      : 'grid',             // already defined in containerStyles. we use grid, so we can align the card both horizontally & vertically
        justifyItems : cssProps.horzAlign, // align (default center) horizontally
        alignItems   : cssProps.vertAlign, // align (default center) vertically


        // sizes:
        // fill the entire screen:
        boxSizing : 'border-box', // the final size is including borders & paddings
        position  : 'fixed',
        left      : 0,
        top       : 0,
        width     : '100vw',
        height    : '100vh',
     // maxWidth  : 'fill-available', // hack to excluding scrollbar // not needed since all html pages are virtually full width
     // maxHeight : 'fill-available', // hack to excluding scrollbar // will be handle by javascript soon

            
        // scrollers:
        // scroller at modal layer & at card's body layer:
        '&, &>*>.body': {
            overflow : 'auto', // enable horz & vert scrolling
        },


        // apply *non conditional* fn props:
        anim : this.ref(this._animBackgFn),



        // children:
        //#region card
        ...((): JssStyle => {
            const newCardProps = this.overwriteParentProps(cssProps);

            return {
                ...this.backupProps(newCardProps), // backup cardProps
                [cardElm]: { // card layer
                    extend: [
                        stripOuts.focusableElement, // clear browser's default styles
                    ] as JssStyle,

                    '&:not(._)': { // force overwrite
                        // layout:
                        gridArea : 'content',


                        // sizes:
                        boxSizing  : 'border-box',  // the final size is including borders & paddings
                        inlineSize : 'max-content', // follows the content's width
                        blockSize  : 'max-content', // follows the content's height

                        // fix bug on firefox.
                        // setting *(inline|block)Size:max-content* guarantes the scrolling effect never occured (the *scrolling prop* will be ignored).
                        // but on firefox if the *scrolling prop* is not turned off => causing the element clipped off at the top.
                        overflow   : 'visible', // turn off the scrolling


                        // configs:
                        extend: [
                            newCardProps, // overwrite cardProps
                        ] as JssStyle,


                        // apply *non conditional* fn props:
                        [this.decl(this._animFn)] : 'inherit', // inherit from Modal
                    },
    
    
                    // card items:
                    [cardItemsElm] : this.restoreProps(newCardProps), // restore cardProps
                },
            };
        })(),
        //#endregion card


        //#region psedudo elm for filling the end of horz & vert scroll
        '&::before, &::after': {
            // layout:
            content     : '""',
            display     : 'block',


            // sizes:
            // fill the entire grid area:
            justifySelf : 'stretch',
            alignSelf   : 'stretch',


            // appearance:
            visibility  : 'hidden',
        },
        '&::before': {
            // layout:
            gridArea    : 'inlineEnd',
        },
        '&::after': {
            // layout:
            gridArea    : 'blockEnd',
        },
        //#endregion psedudo elm for filling the end of horz & vert scroll
    }}
    public scrollableStyle(): JssStyle { return {
        [cardElm]: { // card layer
            '&:not(._)': { // force overwrite
                // sizes:
                inlineSize    : 'auto', // follows the content's width, but
                maxInlineSize : '100%', // up to the maximum available parent's width
                blockSize     : 'auto', // follows the content's height, but
                maxBlockSize  : '100%', // up to the maximum available parent's height

                // this prop is not actually makes card scrollable,
                // but makes card's body scrollable (indirect effect)
                overflow      : 'auto', // turn on the scrolling
            },
        },
    }}
    public bodyStyle(): JssStyle { return {
        // kill the scroll on the body:
        overflow: 'hidden',
    }}
    public actionBarStyle(): JssStyle { return {
        // layout:
        display        : 'flex',
        justifyContent : 'space-between', // separates items horizontally
        alignItems     : 'center',        // center items vertically


        // children:
        '& :first-child:last-child': {
            marginInlineStart: 'auto',
        },
    }}
    protected styles(): Styles<'main'|'body'|'actionBar'> {
        const styles = super.styles();
        Object.assign(styles.main, {
            '&.scrollable' : this.scrollableStyle(),
        });
        return {
            ...styles,

            body      : this.bodyStyle(),
            actionBar : this.actionBarStyle(),
        };
    }
    public useStyles(): Classes<'main'|'body'|'actionBar'> {
        return super.useStyles() as Classes<'main'|'body'|'actionBar'>;
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
        horzAlign                 : center,
        vertAlign                 : center,

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
    modalStyle? : ModalStyle
}
export function useVariantModal(props: VariantModal) {
    return {
        class: props.modalStyle ? props.modalStyle : null,
    };
}

export interface AlignModal {
    horzAlign? : Prop.JustifyItems | Cust.Ref
    vertAlign? : Prop.AlignItems   | Cust.Ref
}
export function useAlignModal(props: AlignModal) {
    return {
        style: {
            [cssDecls.horzAlign] : props.horzAlign,
            [cssDecls.vertAlign] : props.vertAlign,
        },
    };
}



// react components:

export type CloseType = 'ui' | 'backg' | 'shortcut';
export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        Cards.Props<TElement>,
        VariantModal,
        AlignModal
{
    // accessibility:
    tabIndex?   : number


    // actions:
    onClose?    : (closeType: CloseType) => void
}
export default function Modal<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    const modStyles   = styles.useStyles();

    // layouts:
    const variModal   = useVariantModal(props);
    const alignModal  = useAlignModal(props);



    const stateActive = useState(props.active ?? false);
    const isActive    = stateActive[0];
    const cardRef     = useRef<TElement>();
    useEffect(() => {
        if (isActive) {
            document.body.classList.add(modStyles.body);


            cardRef.current?.focus(); // when actived => focus the dialog, so the user able to use [esc] key to close the dialog
        }
        else {
            document.body.classList.remove(modStyles.body);
        } // if
    }, [isActive, modStyles.body]);



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
            <CloseButton onClick={() => props.onClose?.('ui')} />
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


            // styles:
            style={{
                // additionals:
                ...(props.style ?? {}),


                // layouts:
                ...alignModal.style,
            }}


            // indications:
            active={active}


            // states:
            stateActive={[
                props.stateActive?.[0] ?? stateActive[0],
                (newValue: boolean) => {
                    props.stateActive?.[1](newValue);
                    stateActive[1](newValue);
                },
            ]}


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
            {/* <div>
            </div> */}
                <Card<TElement>
                    // other props:
                    {...otherProps}

                    
                    // essentials:
                    elmRef={(elm) => {
                        // @ts-ignore
                        cardRef.current = elm;


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
        </Indicator>
    );
}