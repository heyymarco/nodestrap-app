// react (builds html using javascript):
import React                from 'react'         // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    PropEx,
    RuleList,

    
    // components:
    CssConfig,
}                           from './nodestrap'   // nodestrap's core
import {
    usePropEnabled,
}                           from './accessibilities'
import {
    OrientationStyle,
    VariantOrientation,

    ListStyle,
    VariantList,

    ListgroupItemProps,
    ListgroupItem,

    ListgroupProps,
    Listgroup,
}                           from './Listgroup'
import {
    TogglerActiveProps,
    useTogglerActive,
}                           from './Indicator'
import {
    IContentStyles,
    contentStyles,
}                           from './Content'
import {
    PopupStyles,
    Popup,
}                           from './Popup'



// styles:

/*
    AccordionItem is just a composite component made of
    ListGroupItem
    and
    *modified* Popup
*/

export class AccordionItemStyles extends PopupStyles implements IContentStyles {
    // variants:
    public /*override*/ variants(): RuleList { return [
        ...super.variants(), // copy variants from base


        
        [ '.inline>*>&', this.inline() ],
    ]}
    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}
    public /*virtual*/ inline(): JssStyle { return {
        // overwrites propName = propName{Inline}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, 'Inline')),
    }}
    public /*implement*/ contentSize(size: string): JssStyle { return {} } // not implemented, already belong to ListgroupActionItemStyles



    // states:
    public /*override*/ actived()     : JssStyle { return {
        extend: [
            super.actived(), // copy actived from base
        ] as JssStyle,



        [this.decl(this._filterActivePassive)] : null,
    }}
    public /*override*/ activating()  : JssStyle { return {
        extend: [
            super.activating(), // copy activating from base
        ] as JssStyle,



        [this.decl(this._filterActivePassive)] : null,
        [this.decl(this._animActivePassive)]   : cssProps.animActive,
    }}
    public /*override*/ passivating() : JssStyle { return {
        extend: [
            super.passivating(), // copy passivating from base
        ] as JssStyle,



        [this.decl(this._filterActivePassive)] : null,
        [this.decl(this._animActivePassive)]   : cssProps.animPassive,
    }}



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base

            this.contentBasicStyle(),
        ] as JssStyle,


        
        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
    public /*implement*/ contentBasicStyle(): JssStyle {
        return contentStyles.contentBasicStyle(); // copy basicStyle from Content
    }
    public /*override*/ compositeStyle(): JssStyle { return {
        '&&': super.compositeStyle(), // makes AccordionItem more specific than ListGroupItem
    }}
}
export const accordionItemStyles = new AccordionItemStyles();



// configs:

const cssConfig = new CssConfig(() => {
    const keyframesActive        : PropEx.Keyframes = {
        from : {
            overflow     : 'hidden',
            maxBlockSize : 0,
        },
        '99%': {
            overflow     : 'hidden',
            maxBlockSize : '100vh',
        },
        to   : {
            overflow     : 'unset',
            maxBlockSize : 'unset',
        },
    };
    const keyframesPassive       : PropEx.Keyframes = {
        from : keyframesActive.to,
        '1%' : keyframesActive['99%'],
        to   : keyframesActive.from,
    };

    const keyframesActiveInline  : PropEx.Keyframes = {
        from : {
            overflow      : 'hidden',
            maxInlineSize : 0,
        },
        '99%': {
            overflow      : 'hidden',
            maxInlineSize : '100vh',
        },
        to   : {
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
        //#region animations
        '@keyframes active'        : keyframesActive,
        '@keyframes passive'       : keyframesPassive,
        animActive                 : [['300ms', 'ease-out', 'both', keyframesActive ]],
        animPassive                : [['300ms', 'ease-out', 'both', keyframesPassive]],

        '@keyframes activeInline'  : keyframesActiveInline,
        '@keyframes passiveInline' : keyframesPassiveInline,
        animActiveInline           : [['300ms', 'ease-out', 'both', keyframesActiveInline ]],
        animPassiveInline          : [['300ms', 'ease-out', 'both', keyframesPassiveInline]],
        //#endregion animations
    };
}, /*prefix: */'accr');
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
export function AccordionItem<TElement extends HTMLElement = HTMLElement>(props: AccordionItemProps<TElement>) {
    // styles:
    const styles                = accordionItemStyles.useStyles();

    
    
    // states:
    const [isActive, setActive] = useTogglerActive(props);

    
    
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



    // fn props:
    const propEnabled = usePropEnabled(props);
    
    
    
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
                
                
                
                if (!e.defaultPrevented) {
                    setActive(!isActive); // toggle active
                    e.preventDefault();
                } // if
            }}
        >
            { label }
        </ListgroupItem>
        <Popup<TElement>
            // variants:
            theme={props.theme}
            size={props.size}
            gradient={props.gradient}
            outlined={props.outlined}
            mild={props.mild}


            // accessibility:
            inheritEnabled={props.inheritEnabled}
            enabled={propEnabled}
            inheritActive={props.inheritActive ?? true} // change default value to `true`
            active={isActive}

            
            // classes:
            mainClass={props.mainClass ?? styles.main}
        >
            { children }
        </Popup>
    </>);
}
AccordionItem.prototype = ListgroupItem.prototype; // mark as ListgroupItem compatible

export type { AccordionItemProps as ItemProps }
export { AccordionItem as Item }



// Accordion => Listgroup

export type { ListgroupProps, ListgroupProps as AccordionProps }
export { Listgroup as default, Listgroup as Accordion }

export type { OrientationStyle, VariantOrientation }
export type { ListStyle, VariantList }