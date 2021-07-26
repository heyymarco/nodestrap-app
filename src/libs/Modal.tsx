// react (builds html using javascript):
import {
    default as React,
    useRef,
    useEffect,
}                           from 'react'         // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    Classes,
    Prop,
    PropEx,
    Cust,
    ClassList,
    RuleList,
    PropList,

    
    // components:
    CssConfig,
}                           from './nodestrap'   // nodestrap's core
import * as stripOuts       from './strip-outs'
import typos                from './typos/index' // configurable typography (texting) defs
import {
    cssDecls as bcssDecls,
}                           from './BasicComponent'
import {
    containerStyles,
}                           from './Container'
import {
    useStateActivePassive,

    cssDecls as icssDecls,
}                           from './Indicator'
import {
    PopupStyles,
    cssProps as pcssProps,
    Popup,
}                           from './Popup'
import {
    cssDecls as ccssDecls,
}                           from './Content'
import {
    OrientationStyle,
    VariantOrientation,

    cssDecls as rcssDecls,
    CardProps,
    Card,
}                           from './Card'
import Button               from './Button'
import CloseButton          from './CloseButton'



// styles:

const cardElm      = '&>*';
const cardItemsElm = '&>*';
const cardBodyElm  = '&>.body';

export class ModalStyles extends PopupStyles {
    //#region props
    //#region finals
    /**
     * forwards final animation.
     */
    public    readonly _animFw                    = 'animFw'

    /**
     * final backgrounds for the Modal's overlay.
     */
    public    readonly _overlayBackg              = 'overlayBackg'
    /**
     * final animation for the Modal's overlay.
     */
    public    readonly _overlayAnim               = 'overlayAnim'
    //#endregion finals



    //#region animations
    public    readonly _overlayBackgActivePassive = 'overlayBackgActivePassive'
    protected readonly _overlayAnimActivePassive  = 'overlayAnimActivePassive'
    //#endregion animations
    //#endregion props



    // variants:
    public /*override*/ variants(): RuleList { return [
        ...super.variants(), // copy variants from base


        
        [ ':not(.scrollable)', this.notScrollable() ],
        [      '.scrollable' , this.scrollable()    ],
    ]}

    public /*override*/ themes()                    : RuleList { return [] } // disabled

    public /*override*/ size(size: string): JssStyle { return {
        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}

    public /*override*/ noGradient(inherit = false) : JssStyle { return {} } // disabled
    public /*override*/ gradient()                  : JssStyle { return {} } // disabled

    public /*override*/ noOutlined(inherit = false) : JssStyle { return {} } // disabled
    public /*override*/ outlined()                  : JssStyle { return {} } // disabled

    public /*override*/ noMild(inherit = false)     : JssStyle { return {} } // disabled
    public /*override*/ mild()                      : JssStyle { return {} } // disabled

    public /*virtual*/ notScrollable()  : JssStyle { return {
        // scrolls:
        // scroller at Modal's layer (for the `.scrollable` turned off)
        overflow : 'auto', // enable horz & vert scrolling



        [cardElm]: { // Card's layer
            // sizes:
            boxSizing  : 'content-box', // the final size is excluding borders & paddings
            inlineSize : 'max-content', // forcing the Card's width follows the Card's items width
            blockSize  : 'max-content', // forcing the Card's height follows the Card's items height

            // fix bug on firefox.
            // setting *(inline|block)Size:max-content* guarantes the scrolling effect never occured (the *scrolling prop* will be ignored).
            // but on firefox if the *scrolling prop* is not turned off => causing the element clipped off at the top.
         // overflow   : 'visible', // turn off the scrolling; side effect the rounded corners won't be clipped
         // overflow   : '-moz-hidden-unscrollable', // not working; use JS solution
        } as JssStyle,
    }}
    public /*virtual*/ scrollable()  : JssStyle { return {
        [cardElm]: { // Card's layer
            // sizes:
            boxSizing     : 'border-box', // the final size is including borders & paddings
            inlineSize    : 'auto',       // follows the content's width, but
            maxInlineSize : '100%',       // up to the maximum available parent's width
            blockSize     : 'auto',       // follows the content's height, but
            maxBlockSize  : '100%',       // up to the maximum available parent's height



            [cardBodyElm]: { // Card's body layer
                // scrolls:
                // scroller at Card's body layer (for the `.scrollable` turned on)
                overflow : 'auto', // enable horz & vert scrolling
            } as JssStyle,
        } as JssStyle,
    }}



    // states:
    public /*override*/ resetActivePassive(inherit: boolean) : PropList { return {
        ...super.resetActivePassive(inherit), // copy resetActivePassive from base



        [this.decl(this._overlayBackgActivePassive)] : inherit ? 'unset' : 'initial',
        [this.decl(this._overlayAnimActivePassive)]   : inherit ? 'unset' : 'initial',
    }}
    public /*override*/ actived()     : JssStyle { return {
        extend: [
            super.actived(), // copy actived from base
        ] as JssStyle,



        [this.decl(this._filterActivePassive)]       : null,

        [this.decl(this._overlayBackgActivePassive)] : cssProps.overlayBackgActive,
    }}
    public /*override*/ activating()  : JssStyle { return {
        extend: [
            super.activating(), // copy activating from base
        ] as JssStyle,



        [this.decl(this._filterActivePassive)]       : null,
        [this.decl(this._animActivePassive)]         : cssProps.animActive,

        [this.decl(this._overlayBackgActivePassive)] : cssProps.overlayBackgActive,
        [this.decl(this._overlayAnimActivePassive)]  : cssProps.overlayAnimActive,
    }}
    public /*override*/ passivating() : JssStyle { return {
        extend: [
            super.passivating(), // copy passivating from base
        ] as JssStyle,



        [this.decl(this._filterActivePassive)]       : null,
        [this.decl(this._animActivePassive)]         : cssProps.animPassive,

        [this.decl(this._overlayBackgActivePassive)] : cssProps.overlayBackgActive,
        [this.decl(this._overlayAnimActivePassive)]  : cssProps.overlayAnimPassive,
    }}



    // functions:
    public /*override*/ propsFn(): PropList { return {
        ...super.propsFn(), // copy functional props from base
        
        
        
        //#region finals
        // define a final *backgrounds* func for the Modal's overlay:
        [this.decl(this._overlayBackg)] : this.overlayBackgFn(), // single array (including from the returning function) => makes the JSS treat as comma separated values

        // define a final *animation* func for the Modal's overlay:
        [this.decl(this._overlayAnim)]  : this.overlayAnimFn(),  // single array (including from the returning function) => makes the JSS treat as comma separated values
        //#endregion finals
    }}
    /**
     * Creates a composite backgrounds definition for the Modal's overlay in which the backgrounds *depends on* the variants and/or the states.
     * @returns A `Cust.Ref[]` represents the composite backgrounds definition for the Modal's overlay.
     */
    public /*virtual*/ overlayBackgFn(): Cust.Ref[] { return [
        this.ref(this._overlayBackgActivePassive, this._backgNone),
    ]}
    /**
     * Creates a composite animation definition for the Modal's overlay in which the animations *depends on* the variants and/or the states.
     * @returns A `Cust.Ref[]` represents the composite animation definition for the Modal's overlay.
     */
    public /*virtual*/ overlayAnimFn(): Cust.Ref[] { return [
        this.ref(this._overlayAnimActivePassive, this._animNone),
    ]}



    // styles:
    public /*override*/ useStyles(): Classes<'main'|'body'|'actionBar'> {
        return super.useStyles() as Classes<'main'|'body'|'actionBar'>;
    }
    protected /*override*/ styles(): ClassList { return [
        ...super.styles(),

        
        
        [ 'body'     , this.bodyStyle()      ],
        [ 'actionBar', this.actionBarStyle() ],
    ]}

    
    
    // layouts:
    public /*override*/ layout(): JssStyle { return {
        extend: [
            containerStyles.useContainerGrid(), // applies responsive container functionality using css grid
        ] as JssStyle,



        // layouts:
     // display      : 'grid',             // already defined in `useContainerGrid()`. We use a grid for the layout, so we can align the Card both horizontally & vertically
        justifyItems : cssProps.horzAlign, // align (default center) horizontally
        alignItems   : cssProps.vertAlign, // align (default center) vertically



        // sizes:
        // fills the entire screen:
        boxSizing : 'border-box', // the final size is including borders & paddings
        position  : 'fixed',
        inset     : 0,
        width     : '100vw',
        height    : '100vh',
     // maxWidth  : 'fill-available', // hack to excluding scrollbar // not needed since all html pages are virtually full width
     // maxHeight : 'fill-available', // hack to excluding scrollbar // will be handle by javascript soon
        
        
        
        // backgrounds:
        backg                     : this.ref(this._overlayBackg),



        // states & animations:
        anim                      : this.ref(this._overlayAnim),
        [this.decl(this._animFw)] : this.ref(this._anim), // store _anim into _animFw for overwriting Card's _anim



        //#region children
        //#region Card
        ...((): JssStyle => {
            const newCardProps = this.overwriteParentProps(
                this.filterGeneralProps(cssProps), // apply *general* cssProps

                // parents:
                rcssDecls, // Card
                ccssDecls, // Content
                icssDecls, // Indicator
                bcssDecls, // BasicComponent
            );



            return {
                ...this.backupProps(newCardProps), // backup Card's cssProps before overwriting



                [cardElm]: { // Card's layer
                    extend: [
                        stripOuts.focusableElement, // clear browser's default styles
                    ] as JssStyle,



                    '&:not(._)': { // force overwrite
                        // layouts:
                        gridArea : 'content',
                        
                        
                        
                        // apply fn props:
                        anim     : this.ref(this._animFw),
                        
                        
                        
                        // customize:
                        ...newCardProps, // overwrite Card's cssProps
                    } as JssStyle,
    
    

                    // Card's items:
                    [cardItemsElm] : this.restoreProps(newCardProps), // restore Card's cssProps


                        
                    // special conditions:
                    '&.outlined': {
                        [cssDecls.backg]: 'none',
                    } as JssStyle,
                } as JssStyle,
            };
        })(),
        //#endregion Card



        //#region psedudo elm for filling the end of horz & vert scroll
        '&::before, &::after': {
            // layouts:
            content     : '""',
            display     : 'block',


            // sizes:
            // fills the entire grid area:
            justifySelf : 'stretch',
            alignSelf   : 'stretch',


            // appearances:
            visibility  : 'hidden',
        } as JssStyle,
        '&::before': {
            // layouts:
            gridArea    : 'inlineEnd',
        } as JssStyle,
        '&::after': {
            // layouts:
            gridArea    : 'blockEnd',
        } as JssStyle,
        //#endregion psedudo elm for filling the end of horz & vert scroll
        //#endregion children



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'overlay')), // apply *general* cssProps starting with overlay***
    }}



    // styles:
    public /*virtual*/ bodyStyle(): JssStyle { return {
        // kill the scroll on the body:
        overflow: 'hidden',
    }}
    public /*virtual*/ actionBarStyle(): JssStyle { return {
        // layouts:
        display        : 'flex',          // use block flexbox, so it takes the entire parent's width
        flexDirection  : 'row',           // items are stacked horizontally
        justifyContent : 'space-between', // items are separated horizontally
        alignItems     : 'center',        // items are centered vertically



        // children:
        '&>:first-child:last-child': { // only one child
            marginInlineStart: 'auto',
        },
    }}
}
export const modalStyles = new ModalStyles();



// configs:

const cssConfig = new CssConfig(() => {
    const keyframesOverlayActive  : PropEx.Keyframes = {
        from : {
            opacity    : 0,
            background : modalStyles.overlayBackgFn(),
            // background : [ // double array => makes the JSS treat as comma separated values
            //     ...modalStyles.overlayBackgFn().filter((b) => b !== modalStyles.ref(modalStyles._overlayBackgActivePassive, modalStyles._backgNone)),

            //  // modalStyles.ref(modalStyles._overlayBackgActivePassive, modalStyles._backgNone), // missing the last => let's the browser interpolated it
            // ],
        },
        to   : {
            opacity    : 1,
            background : modalStyles.overlayBackgFn(),
            // background : [ // double array => makes the JSS treat as comma separated values
            //     ...modalStyles.overlayBackgFn().filter((b) => b !== modalStyles.ref(modalStyles._overlayBackgActivePassive, modalStyles._backgNone)),

            //     modalStyles.ref(modalStyles._overlayBackgActivePassive, modalStyles._backgNone), // existing the last => let's the browser interpolated it
            // ],
        },
    };
    const keyframesOverlayPassive : PropEx.Keyframes = {
        from : keyframesOverlayActive.to,
        to   : keyframesOverlayActive.from,
    };


    
    return {
        // positions:
        horzAlign                   : 'center',
        vertAlign                   : 'center',

        
        
        // backgrounds:
        backg                       : typos.backg,
        boxShadow                   : [[0, 0, '10px', 'black']],
        

        
        //#region animations
        animActive                  : pcssProps.animActive,
        animPassive                 : pcssProps.animPassive,

        overlayBackgActive          : 'rgba(0,0,0, 0.5)',

        '@keyframes overlayActive'  : keyframesOverlayActive,
        '@keyframes overlayPassive' : keyframesOverlayPassive,
        overlayAnimActive           : [['300ms', 'ease-out', 'both', keyframesOverlayActive ]],
        overlayAnimPassive          : [['500ms', 'ease-out', 'both', keyframesOverlayPassive]],
        //#endregion animations
    };
}, /*prefix: */'mdl');
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

export type CloseType = 'ui'|'overlay'|'shortcut'

export interface ModalProps<TElement extends HTMLElement = HTMLElement>
    extends
        CardProps<TElement>,

        VariantModal,
        AlignModal
{
    // accessibility:
    tabIndex?   : number


    // actions:
    onClose?    : (closeType: CloseType) => void
}
export default function Modal<TElement extends HTMLElement = HTMLElement>(props: ModalProps<TElement>) {
    // styles:
    const styles       = modalStyles.useStyles();

    
    
    // variants:
    const variModal    = useVariantModal(props);
    const alignModal   = useAlignModal(props);



    // states:
    const stateActPass = useStateActivePassive(props);
    const isVisible    = stateActPass.active || (!!stateActPass.class);



    // rest props:
    const {
        // essentials:
        elmRef,


        // accessibility:
        active,         // from accessibilities
        inheritActive,  // from accessibilities
        tabIndex,       // from Modal


        // actions:
        onClose,        // from Modal


        // variants:
        modalStyle,
        

        // children:
        header,
        footer,
    ...restProps} = props;



    // dom effects:
    const cardRef      = useRef<TElement|null>(null);
    useEffect(() => {
        if (isVisible) {
            if (cardRef.current && navigator.userAgent.toLowerCase().includes('firefox')) {
                cardRef.current.style.overflow = (modalStyle === 'scrollable') ? '' : 'visible';

                // setTimeout(() => {
                //     if (cardRef.current) cardRef.current.style.overflow = 'clip';
                // }, 0);
            } // if firefox

            document.body.classList.add(styles.body);


            cardRef.current?.focus(); // when actived => focus the dialog, so the user able to use [esc] key to close the dialog
        }
        else {
            if (cardRef.current && navigator.userAgent.toLowerCase().includes('firefox')) {
                cardRef.current.style.overflow = '';
            } // if firefox

            document.body.classList.remove(styles.body);
        } // if
    }, [isVisible, styles.body, modalStyle]);
    


    // jsx fn props:
    const headerFn = (() => {
        // default (unset) or string:
        if ((header === undefined) || (typeof header === 'string')) return (
            <h5
                // classes:
                className={styles.actionBar}
            >
                { header }
                <CloseButton onClick={() => props.onClose?.('ui')} />
            </h5>
        );



        // other component:
        return header;
    })();

    const footerFn = (() => {
        // default (unset) or string:
        if ((footer === undefined) || (typeof footer === 'string')) return (
            <p
                // classes:
                className={styles.actionBar}
            >
                { footer }
                <Button text='Close' onClick={() => props.onClose?.('ui')} />
            </p>
        );



        // other component:
        return footer;
    })();



    // jsx:
    return (
        <Popup
            // accessibility:
            role={active ? 'dialog' : undefined}
            aria-modal={active ? true : undefined}
            active={active}
            inheritActive={inheritActive}


            // classes:
            mainClass={props.mainClass ?? styles.main}
            variantClasses={[...(props.variantClasses ?? []),
                variModal.class,
            ]}


            // styles:
            style={{...(props.style ?? {}),
                // variants:
                ...alignModal.style,
            }}


            // events:
            // watch left click on the overlay only (not at the Card):
            onClick={(e) => {
                if (e.target === e.currentTarget) props.onClose?.('overlay');
            }}

            // watch [escape key] on the whole Modal, including Card & Card's children:
            onKeyUp={(e) => {
                if ((e.key === 'Escape') || (e.code === 'Escape')) props.onClose?.('shortcut');
            }}

            onAnimationEnd={(e) => {
                // states:
                stateActPass.handleAnimationEnd(e);
            }}
        >
            <Card<TElement>
                // other props:
                {...restProps}

                
                // essentials:
                elmRef={(elm) => {
                    cardRef.current = elm;


                    // forwards:
                    if (elmRef) {
                        if (typeof(elmRef) === 'function') {
                            elmRef(elm);
                        }
                        else {
                            (elmRef as React.MutableRefObject<TElement|null>).current = elm;
                        } // if
                    } // if
                }}


                // Control props:
                {...{
                    // accessibility:
                    tabIndex : tabIndex ?? -1,
                }}


                // children:
                header={headerFn}
                footer={footerFn}
            />
        </Popup>
    );
}
export { Modal }

export type { OrientationStyle, VariantOrientation }