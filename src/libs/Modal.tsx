// react (builds html using javascript):
import {
    default as React,
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

// nodestrap (modular web components):
import {
    ClassList,
}                           from './nodestrap'  // nodestrap's core
import * as stripOuts       from './strip-outs'
import {
    cssProps as ecssProps,
    cssDecls as ecssDecls,
}                           from './BasicComponent'
import {
    containerStyles,
}                           from './Container'
import {
    cssDecls as icssDecls,
    useStateActivePassive,
}                           from './Indicator'
import {
    default  as Popup,
    cssProps as pcssProps,
    PopupStyles,
}                           from './Popup'
import {
    cssDecls as ccssDecls,
}                           from './Content'
import {
    default  as Card,
    cssDecls as rcssDecls,
}                           from './Card'
import type * as Cards      from './Card'
import Button               from './Button'
import CloseButton          from './CloseButton'
import typos                from './typos/index' // configurable typography (texting) defs



// styles:

const cardElm        = '&>*';
const cardItemsElm   = '&>*';

export class ModalStylesBuilder extends PopupStyles {
    //#region scoped css props
    /**
     * forwards functional animations to target element.
     */
    public    readonly _animFnFw                 = 'animFnFw'

    /**
     * functional animations for the Modal's overlay.
     */
    public    readonly _overlayAnimFn            = 'overlayAnimFn'



    // anim props:

    protected readonly _overlayAnimActivePassive = 'overlayAnimActivePassive'
    //#endregion scoped css props



    // variants:
    public /*override*/ variants(): ClassList { return [
        ...super.variants(), // copy variants from base


        
        [ 'scrollable', this.scrollable() ],
    ]}
    public /*override*/ themes(): ClassList { return [] } // disabled
    public /*override*/ size(size: string): JssStyle { return {
        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}
    public /*override*/ gradient(): JssStyle { return {} } // disabled
    public /*override*/ outlined(): JssStyle { return {} } // disabled
    public /*virtual*/ scrollable(): JssStyle { return {
        [cardElm]: { // Card's layer
            '&:not(._)': { // force overwrite
                // sizes:
                inlineSize    : 'auto', // follows the content's width, but
                maxInlineSize : '100%', // up to the maximum available parent's width
                blockSize     : 'auto', // follows the content's height, but
                maxBlockSize  : '100%', // up to the maximum available parent's height

                // this prop is not actually makes Card scrollable,
                // but makes Card's body scrollable (indirect effect)
                overflow      : 'auto', // turn on the scrolling
            },
        },
    }}



    // states:
    public /*override*/ indicationStatesOld(inherit = false): JssStyle { return {
        /*
        skip indication's [enable, disable] states

        watch [active, passive] state => apply to [animBody, animOverlay]
        */



        extend: [
            this.iif(!inherit, {
                //#region all initial states are none
                [this.decl(this._animActivePassive)]        : ecssProps.animNone,
                [this.decl(this._overlayAnimActivePassive)] : ecssProps.animNone,
                //#endregion all initial states are none
            }),

    
    
            //#region specific states
            //#region active, passive
            this.stateActive({ // [activating, actived]
                [this.decl(this._animActivePassive)]        : cssProps.animActive,
                [this.decl(this._overlayAnimActivePassive)] : cssProps.overlayAnimActive,
    
                extend: [
                    //TODO: update....
                    this.themeActive(),
                ] as JssStyle,
            }),
            this.statePassivating({ // [passivating]
                [this.decl(this._animActivePassive)]        : cssProps.animPassive,
                [this.decl(this._overlayAnimActivePassive)] : cssProps.overlayAnimPassive,
            }),
            this.stateNotActivePassivating({ // hides the Modal if not [activating, actived, passivating]
                display: 'none',
            }),
            {
                // [actived]
                '&.actived': // if activated programmatically (not by user input), disable the animation
                    this.applyStateNoAnimStartupOld(),
            },
            //#endregion active, passive
            //#endregion specific states
        ] as JssStyle,
    }}

    public /*override*/ statesOld(inherit = false): JssStyle {
        // skip Element's states
        // jump to indication's states
        return this.indicationStatesOld(inherit);
    }



    // functions:
    public /*override*/ indicationAnimFnOld(): JssStyle { return {
        // define an *animations* func for the Modal's content:
        [this.decl(this._animFnOld)]: [
            ecssProps.anim,
            this.ref(this._animActivePassive), // if Modal is active(d)  => the Modal's content is visible
        ],

        // define an *animations* func for the Modal's overlay:
        [this.decl(this._overlayAnimFn)]: [
            this.ref(this._overlayAnimActivePassive), // if Modal is active(d)  => the Modal's overlay is visible
        ],
    }}

    public /*override*/ propsFnOld(): JssStyle { return {
        // skip Element's propsFn but preserves animFn
        // jump to indication's propsFn

        extend: [
            //TODO: update...
            // this.indicationPropsFn(),
        ] as JssStyle,



        ...this.animFnOld(),
    }}
    public /*override*/ animFnOld(): JssStyle {
        // skip Element's animFn
        // jump to indication's animFn
        return this.indicationAnimFnOld();
    }



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            containerStyles.containerGridBasicStyle(), // apply responsive container functionality using css grid
        ] as JssStyle,



        // layout:
     // display      : 'grid',             // already defined in containerStyles. we use grid, so we can align the Card both horizontally & vertically
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
        // scroller at Modal's layer & at Card's body layer:
        '&, &>*>.body': {
            overflow : 'auto', // enable horz & vert scrolling
        },



        // apply fn props:
        anim                        : this.ref(this._overlayAnimFn),
        [this.decl(this._animFnFw)] : this.ref(this._animFnOld),



        // children:
        //#region Card
        ...((): JssStyle => {
            const newCardProps = this.overwriteParentProps(
                this.filterGeneralProps(cssProps), // apply *general* cssProps

                rcssDecls, // Card
                ccssDecls, // Content
                icssDecls, // Indicator
                ecssDecls, // Element
            );



            return {
                ...this.backupProps(newCardProps), // backup cardProps



                [cardElm]: { // Card's layer
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
                     // overflow   : 'visible', // turn off the scrolling; side effect the rounded corners won't be clipped
                     // overflow   : '-moz-hidden-unscrollable', // not working; use JS solution



                        // apply fn props:
                        anim       : this.ref(this._animFnFw),



                        // customize:
                        ...newCardProps, // overwrite cardProps
                    },
    
    

                    // Card's items:
                    [cardItemsElm] : this.restoreProps(newCardProps), // restore cardProps
                },
            };
        })(),
        //#endregion Card



        //#region psedudo elm for filling the end of horz & vert scroll
        '&::before, &::after': {
            // layout:
            content     : '""',
            display     : 'block',


            // sizes:
            // fill the entire grid area:
            justifySelf : 'stretch',
            alignSelf   : 'stretch',


            // appearances:
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



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'overlay')), // apply *general* cssProps starting with overlay***
    }}
    public /*virtual*/ bodyStyle(): JssStyle { return {
        // kill the scroll on the body:
        overflow: 'hidden',
    }}
    public /*virtual*/ actionBarStyle(): JssStyle { return {
        // layout:
        display        : 'flex',
        flexDirection  : 'row',           // items are stacked horizontally
        justifyContent : 'space-between', // items are separated horizontally
        alignItems     : 'center',        // items are centered vertically



        // children:
        '&>:first-child:last-child': {
            marginInlineStart: 'auto',
        },
    }}
    protected /*override*/ styles(): Styles<'main'|'@global'|'body'|'actionBar'> { return {
        ...super.styles(),

        
        
        body      : this.bodyStyle(),
        actionBar : this.actionBarStyle(),
    }}
    public /*override*/ useStyles(): Classes<'main'|'body'|'actionBar'> {
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


    const keyframesOverlayActive  : PropEx.Keyframes = {
        from: {
            opacity    : 0,
        },
        to: {
            opacity    : 1,
            background : 'rgba(0,0,0, 0.5)',
        },
    };
    const keyframesOverlayPassive : PropEx.Keyframes = {
        from : keyframesOverlayActive.to,
        to   : keyframesOverlayActive.from,
    };


    return {
        horzAlign                   : center,
        vertAlign                   : center,

        backg                       : typos.backg,
        boxShadow                   : [[0, 0, '10px', 'black']],
        

        // anim props:

        animActive                  : pcssProps.animActive,
        animPassive                 : pcssProps.animPassive,

        '@keyframes overlayActive'  : keyframesOverlayActive,
        '@keyframes overlayPassive' : keyframesOverlayPassive,
        overlayAnimActive           : [['300ms', 'ease-out', 'both', keyframesOverlayActive ]],
        overlayAnimPassive          : [['500ms', 'ease-out', 'both', keyframesOverlayPassive]],
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

export type CloseType = 'ui' | 'overlay' | 'shortcut';
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
    // styles:
    const modStyles    = styles.useStyles();

    
    
    // variants:
    const variModal    = useVariantModal(props);
    const alignModal   = useAlignModal(props);



    // states:
    const stateActPass = useStateActivePassive(props);
    const isActive     = stateActPass.active || (!!stateActPass.class);



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
    const cardRef      = useRef<TElement>(null);
    useEffect(() => {
        if (isActive) {
            if (cardRef.current && navigator.userAgent.toLowerCase().includes('firefox')) {
                cardRef.current.style.overflow = (modalStyle === 'scrollable') ? '' : 'visible';

                // setTimeout(() => {
                //     if (cardRef.current) cardRef.current.style.overflow = 'clip';
                // }, 0);
            } // if firefox

            document.body.classList.add(modStyles.body);


            cardRef.current?.focus(); // when actived => focus the dialog, so the user able to use [esc] key to close the dialog
        }
        else {
            if (cardRef.current && navigator.userAgent.toLowerCase().includes('firefox')) {
                cardRef.current.style.overflow = '';
            } // if firefox

            document.body.classList.remove(modStyles.body);
        } // if
    }, [isActive, modStyles.body, modalStyle]);
    


    // jsx fn props:
    const headerFn = (() => {
        // default (unset) or string:
        if ((header === undefined) || (typeof header === 'string')) return (
            <h5
                // classes:
                className={modStyles.actionBar}
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
                className={modStyles.actionBar}
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
            mainClass={props.mainClass ?? modStyles.main}
            variantClasses={[...(props.variantClasses ?? []),
                variModal.class,
            ]}


            // styles:
            style={{...(props.style ?? {}),
                // variants:
                ...alignModal.style,
            }}


            // events:
            // watch [escape key] on the whole Modal, including Card & Card's children:
            onKeyDown={(e) => {
                if ((e.code === 'Escape') || (e.key === 'Escape')) props.onClose?.('shortcut');
            }}

            // watch left click on the overlay only (not at the Card):
            onClick={(e) => {
                if ((e.target === e.currentTarget) && (e.type === 'click')) props.onClose?.('overlay');
            }}
        >
            <Card<TElement>
                // other props:
                {...restProps}

                
                // essentials:
                elmRef={(elm) => {
                    // @ts-ignore
                    cardRef.current = elm;


                    // forwards:
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
                header={headerFn}
                footer={footerFn}
            />
        </Popup>
    );
}