// react (builds html using javascript):
import React                from 'react'       // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
}                           from 'jss'          // ts defs support for jss
import {
    PropEx,
}                           from './Css'        // ts defs support for jss
import CssConfig            from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.
import type {
    Dictionary,
}                           from './CssConfig'   // ts defs support for jss

// nodestrap (modular web components):
import {
    cssProps as ecssProps,
    GenericElement,
}                           from './Element'
import {
    IndicatorStylesBuilder,
    useDynActivation,
}                           from './Indicator'
import type * as Indicators from './Indicator'
import ListgroupItem        from './ListgroupItem'
import type * as ListgroupItems from './ListgroupItem'



// styles:

const bodyElm   = '&~*';

export class AccordionItemStylesBuilder extends IndicatorStylesBuilder {
    //#region scoped css props
    /**
     * functional animations for the AccordionItem's body.
     */
    public    readonly _bodyAnimFn            = 'bodyAnimFn'



    // anim props:

    protected readonly _bodyAnimActivePassive = 'bodyAnimActivePassive'
    //#endregion scoped css props



    // themes:
    public /*override*/ themes(themes: Dictionary<JssStyle> = {}, options = this.themeOptions()): JssStyle { return {} }
    public /*override*/ sizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {
        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, Size)),
    }}
    public /*override*/ gradient(): JssStyle { return {} }
    public /*override*/ outlined(): JssStyle  { return {} }


    
    // states:
    protected /*virtual*/ bodyThemesIf(): JssStyle { return {} }
    protected /*virtual*/ bodyStates(inherit = false): JssStyle { return {
        /*
            watch state on current element but forward the action to sibling element (body)
        */
        
        
        
        extend: [
            this.iif(!inherit, {
                //#region all initial states are none
                [bodyElm]: {
                    [this.decl(this._bodyAnimActivePassive)] : ecssProps.animNone,
                },
                //#endregion all initial states are none
            }),



            //#region specific states
            //#region active, passive => body active, passive
            this.stateActive({ // [activating, actived]
                [bodyElm]: {
                    [this.decl(this._bodyAnimActivePassive)] : cssProps.bodyAnimActive,
                },
            }, /*actionCtrl =*/false),
            this.statePassivating({ // [passivating]
                [bodyElm]: {
                    [this.decl(this._bodyAnimActivePassive)] : cssProps.bodyAnimPassive,
                },
            }),
            this.stateNotActivePassivating({ // hides the modal if not [activating, actived, passivating]
                [bodyElm]: {
                    display: 'none',
                },
            }, /*actionCtrl =*/false),
            {
                // [actived]
                '&.actived': { // if activated programmatically (not by user input), disable the animation
                    [bodyElm] : this.applyStateNoAnimStartup(),
                },
            },
            //#endregion active, passive => body active, passive
            //#endregion specific states
        ] as JssStyle,
    }}

    public /*override*/ themesIf(): JssStyle {
        return this.bodyThemesIf();
    }
    public /*override*/ states(inherit = false): JssStyle {
        return this.bodyStates(inherit);
    }



    // functions:
    protected /*virtual*/ bodyPropsFn(): JssStyle { return {
        ...this.bodyAnimFn(),
    }}
    protected /*virtual*/ bodyAnimFn(): JssStyle { return {
        // define an *animations* func for the AccordionItem's body:
        [this.decl(this._bodyAnimFn)]: [
            this.ref(this._bodyAnimActivePassive),
        ],
    }}

    public /*override*/ propsFn(): JssStyle { return {
        // children:
        [bodyElm]: this.bodyPropsFn(),
    }}



    // styles:
    protected /*virtual*/ bodyBasicStyle(): JssStyle { return {
        // apply fn props:
        anim : this.ref(this._bodyAnimFn),



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'body')), // apply *general* cssProps starting with body***
    }}
    public /*override*/ basicStyle(): JssStyle { return {
        // children:
        [bodyElm]: this.bodyBasicStyle(),



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
}
export const styles = new AccordionItemStylesBuilder();



// configs:

const cssConfig = new CssConfig(() => {
    // common css values:
    // const initial = 'initial';
    // const unset   = 'unset';
    // const none    = 'none';
    // const inherit = 'inherit';
    // const center  = 'center';
    // const middle  = 'middle';


    const keyframesBodyActive  : PropEx.Keyframes = {
        from: {
            overflow     : 'hidden',
            maxBlockSize : 0,
        },
        '99%': {
            overflow     : 'hidden',
            maxBlockSize : '100vh',
        },
        to: {
            overflow     : 'unset',
            maxBlockSize : 'unset',
        },
    };
    const keyframesBodyPassive : PropEx.Keyframes = {
        from : keyframesBodyActive.to,
        '1%' : keyframesBodyActive['99%'],
        to   : keyframesBodyActive.from,
    };


    return {
        // anim props:

        '@keyframes bodyActive'  : keyframesBodyActive,
        '@keyframes bodyPassive' : keyframesBodyPassive,
        bodyAnimActive           : [['300ms', 'ease-out', 'both', keyframesBodyActive ]],
        bodyAnimPassive          : [['300ms', 'ease-out', 'both', keyframesBodyPassive]],
    };
}, /*prefix: */'acci');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// react components:

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        ListgroupItems.Props<TElement>,
        Indicators.DynActivationProps
{
    // accessibility:
    label?          : string | React.ReactNode
}
export default function AccordionItem<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    const accItemStyles         = styles.useStyles();

    // states:
    const [isActive, setActive] = useDynActivation(props);

    
    
    const {
        // accessibility:
        label,

        /*delete*/ defaultActive,
        /*delete*/ active,
        /*delete*/ onActiveChange,


        // children:
        children,
        ...otherProps } = props;
    
    return (<>
        <ListgroupItem
            // essentials:
            tag='h1'


            // behaviors:
            actionCtrl={true}


            // accessibility:
            active={isActive}


            // other props:
            {...otherProps}


            // classes:
            mainClass={props.mainClass ?? [
                accItemStyles.main,
                'actionCtrl',
            ].join(' ')}


            // events:
            onClick={(e) => {
                // backwards:
                props.onClick?.(e);
                
                
                
                if (!e.defaultPrevented) setActive(!isActive);
            }}
        >
            { label }
        </ListgroupItem>
        <GenericElement>
            { children }
        </GenericElement>
    </>);
}
AccordionItem.prototype = ListgroupItem.prototype;