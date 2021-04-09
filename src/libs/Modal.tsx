// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
    Styles,
    Classes,
}                           from 'jss'          // ts defs support for jss
import {
    PropEx,
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
import typos                from './typos/index' // configurable typography (texting) defs



// styles:

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
    public    readonly _animBackgFn = 'animBackgFn'



    // anim props:

    protected readonly _animBackgActivePassive   = 'animBackgActivePassive'
    //#endregion scoped css props



    //#region mixins
    protected applyStateActive(): JssStyle { return {}; }
    //#endregion mixins



    // themes:
    /* -- same as parent -- */



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
            stripOuts.focusableElement, // clear browser's default styles

            super.basicStyle(),                        // copy basicStyle from base
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


        // apply *non conditional* fn props:
        anim : this.ref(this._animBackgFn),



        // children:
        // scroller props:
        overflowInline : 'hidden', // no horizontal scrolling
        overflowBlock  : 'auto',   // enable vertical scrolling
        '& >*': { // scrolling layer with additional paddings (responsive container)
            extend: [
                containerStyles.basicContainerStyle(), // applies responsive container functionality
            ] as JssStyle,


            // sizes:
            inlineSize : 'fit-content',
            blockSize  : 'fit-content',
            boxSizing  : 'content-box',



            // children:
            '& >*': { // card layer
                extend: [
                    this.overwriteParentProps(cssProps),
                ] as JssStyle,
            },
        },
    }}
    protected styles(): Styles<'main'|'title'|'actionBar'> {
        return {
            ...super.styles(),

            title: {
                display        : 'flex',
                justifyContent : 'space-between',
                alignItems     : 'center',
            },

            actionBar: {
                display        : 'flex',
                justifyContent : 'space-between',
                alignItems     : 'center',


                // children:
                '& :first-child:last-child': {
                    marginInlineStart: 'auto',
                },
            },
        };
    }
    public useStyles(): Classes<'main'|'title'|'actionBar'> {
        return super.useStyles() as Classes<'main'|'title'|'actionBar'>;
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



// react components:

export type CloseType = 'ui' | 'backg' | 'shortcut';
export interface Props
    extends
        Cards.Props
{
    // accessibility:
    tabIndex?   : number


    // actions:
    onClose?    : (closeType: CloseType) => void


    // layouts:
    scrollable? : boolean
}
export default function Modal(props: Props) {
    const modStyles = styles.useStyles();



    const {
        // accessibility:
        active,
        tabIndex,


        // actions:
        onClose,


        // layouts:
        scrollable,
        

        // children:
        header,
        footer,
        ...otherProps } = props;
    
    const header2 = ((header === undefined) || (typeof(header) === 'string')) ? (
        <h5 className={modStyles.title}>
            { header }
            <Button btnStyle='link' theme='secondary' aria-label='Close' onClick={() => props.onClose?.('ui')} />
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
            // indications:
            active={active}


            // classes:
            classes={[
                // main:
                (props.classes ? null : modStyles.main),


                // additionals:
                ...(props.classes ?? []),
            ]}


            // Control props:
            {...{
                // accessibility:
                tabIndex : tabIndex,
            }}


            // events:
            // watch [escape key] on the whole modal, including card & children:
            onKeyDown={(e) => {
                if ((e.code === 'Escape') || (e.key === 'Escape')) props.onClose?.('shortcut');


                // forwards:
                props.onKeyDown?.(e);
            }}

            // watch left click on the backg only (not at the card):
            onClick={(e) => {
                if ((e.target === e.currentTarget) && (e.type === 'click')) props.onClose?.('backg');


                // forwards:
                props.onClick?.(e);
            }}
        >
            <div>
                <Card
                    // other props:
                    {...otherProps}


                    // children:
                    header={header2}
                    footer={footer2}
                />
            </div>
        </Indicator>
    );
}