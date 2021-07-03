// react (builds html using javascript):
import React                from 'react'         // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    PropEx,
    ClassList,
    PropList,

    
    // components:
    CssConfig,
    Element,
}                           from './nodestrap'   // nodestrap's core
import {
    useStateEnableDisable,
    useStateActivePassive,

    useTogglerActive,
    TogglerActiveProps,
}                           from './Indicator'
import {
    PopupStyles,
}                           from './Popup'
import {
    ListgroupItemProps,
    ListgroupItem,
}                           from './ListgroupItem'



// styles:

/*
    Basic ListgroupItem's styling *was done* by ListGroupStyles.
    We just add a *popup functionality* to the *body*.
*/

export class AccordionItemStyles extends PopupStyles {
    // variants:
    public /*override*/ variants(): ClassList { return [
        ...super.variants(), // copy variants from base


        
        [ '.inline>*>&', this.inline() ],
    ]}
    
    public /*override*/ themes()     : ClassList { return [] } // disabled

    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}

    public /*override*/ noGradient() : JssStyle { return {} }  // disabled
    public /*override*/ gradient()   : JssStyle { return {} }  // disabled

    public /*override*/ noOutlined() : JssStyle { return {} }  // disabled
    public /*override*/ outlined()   : JssStyle { return {} }  // disabled

    public /*override*/ noMild()     : JssStyle { return {} }  // disabled
    public /*override*/ mild()       : JssStyle { return {} }  // disabled

    public /*virtual*/ inline(): JssStyle { return {
        // overwrites propName = propName{Inline}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, 'Inline')),
    }}



    // states:
    public /*override*/ themeDefault(theme: string|null = 'secondary') : PropList { return {} } // disabled

    public /*override*/ resetEnableDisable(inherit: boolean) : PropList { return {} } // disabled
    public /*override*/ enabled()     : JssStyle { return {} } // disabled
    public /*override*/ enabling()    : JssStyle { return {} } // disabled
    public /*override*/ disabling()   : JssStyle { return {} } // disabled
    public /*override*/ disabled()    : JssStyle { return {} } // disabled

    public /*override*/ actived()     : JssStyle { return {
        extend: [
            super.actived(), // copy actived from base
        ] as JssStyle,



        [this.decl(this._filterActivePassive)] : 'unset',
    }}
    public /*override*/ activating()  : JssStyle { return {
        extend: [
            super.activating(), // copy activating from base
        ] as JssStyle,



        [this.decl(this._filterActivePassive)] : 'unset',
        [this.decl(this._animActivePassive)]   : cssProps.animActive,
    }}
    public /*override*/ passivating() : JssStyle { return {
        extend: [
            super.passivating(), // copy passivating from base
        ] as JssStyle,



        [this.decl(this._filterActivePassive)] : 'unset',
        [this.decl(this._animActivePassive)]   : cssProps.animPassive,
    }}
    public /*override*/ passived()    : JssStyle { return {
        extend: [
            super.passived(), // copy passived from base
        ] as JssStyle,



        /* --nothing-- */
    }}



    // functions:
    public /*override*/ propsFn(): PropList { return {
        ...super.propsFn(), // copy functional props from base



        //#region nones
        [this.decl(this._backgNone)]     : null,
        [this.decl(this._boxShadowNone)] : null,
        [this.decl(this._filterNone)]    : null,
        [this.decl(this._animNone)]      : null,
        //#endregion nones



        [this.decl(this._foregFn)]          : null,
        [this.decl(this._backgFn)]          : null,
        [this.decl(this._borderFn)]         : null,

        [this.decl(this._outlinedForegFn)]  : null,
        [this.decl(this._outlinedBackgFn)]  : null,

        [this.decl(this._mildForegFn)]      : null,
        [this.decl(this._mildBackgFn)]      : null,

        [this.decl(this._boxShadowFocusFn)] : null,



        //#region finals
        // define a final *foreground* color func:
     // [this.decl(this._foreg)]     : null, // necessary
     // [this.decl(this._backgCol)]  : null, // necessary
     // [this.decl(this._backgSol)]  : null, // necessary
     // [this.decl(this._backg)]     : null, // necessary
        [this.decl(this._borderCol)] : null,
        [this.decl(this._boxShadow)] : null,
        [this.decl(this._filter)]    : null,
        [this.decl(this._anim)]      : null,
        //#endregion finals
    }}



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
    public /*override*/ compositeStyle(): JssStyle { return {
        '&&': super.compositeStyle(), // makes AccordionItem more specific than ListGroupItem
    }}
}
export const accordionItemStyles = new AccordionItemStyles();



// configs:

const cssConfig = new CssConfig(() => {
    const keyframesActive  : PropEx.Keyframes = {
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
    const keyframesPassive : PropEx.Keyframes = {
        from : keyframesActive.to,
        '1%' : keyframesActive['99%'],
        to   : keyframesActive.from,
    };

    const keyframesActiveInline  : PropEx.Keyframes = {
        from: {
            overflow      : 'hidden',
            maxInlineSize : 0,
        },
        '99%': {
            overflow      : 'hidden',
            maxInlineSize : '100vh',
        },
        to: {
            overflow      : 'unset',
            maxInlineSize : 'unset',
        },
    };
    const keyframesPassiveInline : PropEx.Keyframes = {
        from : keyframesActiveInline.to,
        '1%' : keyframesActiveInline['99%'],
        to   : keyframesActiveInline.from,
    };


    return {
        // anim props:

        '@keyframes active'        : keyframesActive,
        '@keyframes passive'       : keyframesPassive,
        animActive                 : [['300ms', 'ease-out', 'both', keyframesActive ]],
        animPassive                : [['300ms', 'ease-out', 'both', keyframesPassive]],

        '@keyframes activeInline'  : keyframesActiveInline,
        '@keyframes passiveInline' : keyframesPassiveInline,
        animActiveInline           : [['300ms', 'ease-out', 'both', keyframesActiveInline ]],
        animPassiveInline          : [['300ms', 'ease-out', 'both', keyframesPassiveInline]],
    };
}, /*prefix: */'acci');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// react components:

export interface AccordionItemProps<TElement extends HTMLElement = HTMLElement>
    extends
        ListgroupItemProps<TElement>,
        TogglerActiveProps
{
    // accessibility:
    label?          : string | React.ReactNode
}
export default function AccordionItem<TElement extends HTMLElement = HTMLElement>(props: AccordionItemProps<TElement>) {
    // styles:
    const styles                = accordionItemStyles.useStyles();

    
    
    // states:
    const stateEnbDis           = useStateEnableDisable(props);
    const [isActive, setActive] = useTogglerActive(props);
    const stateActPass          = useStateActivePassive({
        // tag            : props.tag,
        // ...{
        //     type       : ((props as any).type,
        // },

        enabled        : props.enabled,
        inheritEnabled : props.inheritEnabled,

        active         : props.active,
        inheritActive  : props.inheritActive,
    }, /*activeDn: */isActive);

    
    
    // rest props:
    const {
        // accessibility:
        label,          // delete, moved to children

        defaultActive,  // delete, already handled by useTogglerActive
        onActiveChange, // delete, already handled by useTogglerActive
        active,         // delete, already handled by useTogglerActive


        // children:
        children,
    ...restProps} = props;
    
    
    
    // jsx:
    return (<>
        <ListgroupItem
            // other props:
            {...restProps}

            
            // essentials:
            tag={props.tag ?? 'h1'}


            // accessibility:
            aria-expanded={isActive}
            active={isActive}


            // behaviors:
            actionCtrl={props.actionCtrl ?? true}


            // events:
            onClick={(e) => {
                // backwards:
                props.onClick?.(e);
                
                
                
                if (!e.defaultPrevented) setActive(!isActive);
            }}
        >
            { label }
        </ListgroupItem>
        <Element<TElement>
            // classes:
            mainClass={props.mainClass ?? styles.main}
            stateClasses={[...(props.stateClasses ?? []),
                stateEnbDis.class,
                stateActPass.class,
            ]}


            // Control::disabled:
            {...stateEnbDis.props}


            // Check::checked:
            {...stateActPass.props}


            // events:
            onAnimationEnd={(e) => {
                // states:
                stateEnbDis.handleAnimationEnd(e);
                stateActPass.handleAnimationEnd(e);


                // forwards:
                props.onAnimationEnd?.(e);
            }}
        >
            { children }
        </Element>
    </>);
}
AccordionItem.prototype = ListgroupItem.prototype; // mark as ListgroupItem compatible
export { AccordionItem }