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
    Basic ListgroupItem's styling **was done** by ListGroupStyles.
    We just watches **popup functionality** at the AccordionItem
    and forward the functionality to the sibling `.body`.
*/

const bodyElm = '&~.body.body'; // double the .body for winning to Listgroup's *:not(.actionCtrl)

export class AccordionItemStyles extends PopupStyles {
    // variants:
    public /*override*/ variants(): ClassList { return [
        ...super.variants(), // copy variants from base


        
        [ '.inline>*>&', this.inline() ],
    ]}
    
    public /*override*/ themes()     : ClassList { return [] } // disabled

    public /*override*/ size(size: string): JssStyle { return {
        // overwrites propName = propName{Size}:
        [bodyElm]: this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}

    public /*override*/ noGradient() : JssStyle { return {} }  // disabled
    public /*override*/ gradient()   : JssStyle { return {} }  // disabled

    public /*override*/ noOutlined() : JssStyle { return {} }  // disabled
    public /*override*/ outlined()   : JssStyle { return {} }  // disabled

    public /*override*/ noMild()     : JssStyle { return {} }  // disabled
    public /*override*/ mild()       : JssStyle { return {} }  // disabled

    public /*virtual*/ inline(): JssStyle { return {
        // overwrites propName = propName{Inline}:
        [bodyElm]: this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, 'Inline')),
    }}



    // states:
    public /*override*/ themeDefault(theme: string|null = 'secondary') : PropList { return {} } // disabled

    public /*override*/ resetEnableDisable(inherit: boolean) : PropList { return {} } // disabled
    public /*override*/ enabled()     : JssStyle { return {} } // disabled
    public /*override*/ enabling()    : JssStyle { return {} } // disabled
    public /*override*/ disabling()   : JssStyle { return {} } // disabled
    public /*override*/ disabled()    : JssStyle { return {} } // disabled

    public /*override*/ actived()     : JssStyle { return {
        // children:
        [bodyElm]: {
            extend: [
                super.actived(), // copy actived from base
            ] as JssStyle,



            [this.decl(this._filterActivePassive)] : null,
        } as JssStyle,
    }}
    public /*override*/ activating()  : JssStyle { return {
        // children:
        [bodyElm]: {
            extend: [
                super.activating(), // copy activating from base
            ] as JssStyle,



            [this.decl(this._filterActivePassive)] : null,
            [this.decl(this._animActivePassive)]   : cssProps.bodyAnimActive,
        } as JssStyle,
    }}
    public /*override*/ passivating() : JssStyle { return {
        // children:
        [bodyElm]: {
            extend: [
                super.passivating(), // copy passivating from base
            ] as JssStyle,



            [this.decl(this._filterActivePassive)] : null,
            [this.decl(this._animActivePassive)]   : cssProps.bodyAnimPassive,
        } as JssStyle,
    }}
    public /*override*/ passived()    : JssStyle { return {
        // children:
        [bodyElm]: {
            extend: [
                super.passived(), // copy passived from base
            ] as JssStyle,



            /* --nothing-- */
        } as JssStyle,
    }}



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        // children:
        [bodyElm]: this.bodyBasicStyle(),



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
    protected /*virtual*/ bodyBasicStyle(): JssStyle { return {
        // apply fn props:
        anim : this.ref(this._anim),



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'body')), // apply *general* cssProps starting with body***
    }}
}
export const accordionItemStyles = new AccordionItemStyles();



// configs:

const cssConfig = new CssConfig(() => {
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

    const keyframesBodyActiveInline  : PropEx.Keyframes = {
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
    const keyframesBodyPassiveInline : PropEx.Keyframes = {
        from : keyframesBodyActiveInline.to,
        '1%' : keyframesBodyActiveInline['99%'],
        to   : keyframesBodyActiveInline.from,
    };


    return {
        // anim props:

        '@keyframes bodyActive'        : keyframesBodyActive,
        '@keyframes bodyPassive'       : keyframesBodyPassive,
        bodyAnimActive                 : [['300ms', 'ease-out', 'both', keyframesBodyActive ]],
        bodyAnimPassive                : [['300ms', 'ease-out', 'both', keyframesBodyPassive]],

        '@keyframes bodyActiveInline'  : keyframesBodyActiveInline,
        '@keyframes bodyPassiveInline' : keyframesBodyPassiveInline,
        bodyAnimActiveInline           : [['300ms', 'ease-out', 'both', keyframesBodyActiveInline ]],
        bodyAnimPassiveInline          : [['300ms', 'ease-out', 'both', keyframesBodyPassiveInline]],
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


            // classes:
            mainClass={props.mainClass ?? styles.main}


            // events:
            onClick={(e) => {
                // backwards:
                props.onClick?.(e);
                
                
                
                if (!e.defaultPrevented) setActive(!isActive);
            }}
        >
            { label }
        </ListgroupItem>
        <Element
            // classes:
            mainClass='body'
        >
            { children }
        </Element>
    </>);
}
AccordionItem.prototype = ListgroupItem.prototype; // mark as ListgroupItem compatible
export { AccordionItem }