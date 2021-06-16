// react (builds html using javascript):
import {
    default as React,
}                           from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
}                           from 'jss'          // ts defs support for jss
import {
    PropEx,
}                           from './Css'        // ts defs support for jss
import CssConfig            from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import {
    ClassList,
    Element,
}                           from './nodestrap'  // nodestrap's core
import {
    cssProps as ecssProps,
}                           from './BasicComponent'
import {
    cssProps as icssProps,
    useTogglerActive,
}                           from './Indicator'
import type * as Indicators from './Indicator'
import {
    PopupStyles,
}                           from './Popup'
import ListgroupItem        from './ListgroupItem'
import type * as ListgroupItems from './ListgroupItem'



// styles:

const bodyElm = '&~.body.body'; // double the .body for winning to Listgroup's *:not(.actionCtrl)

export class AccordionItemStylesBuilder extends PopupStyles {
    // variants:
    public /*override*/ themes(): ClassList { return [] } // disabled
    public /*override*/ size(size: string): JssStyle { return {
        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}
    public /*override*/ gradient(): JssStyle { return {} } // disabled
    public /*override*/ outlined(): JssStyle { return {} } // disabled


    
    // states:
    public /*override*/ indicationStatesOld(inherit = false): JssStyle { return {
        /*
        watch [enable, disable] state on current element but forward the action to sibling element (body)
        watch [active, passive] state on current element but forward the action to sibling element (body)
        */
        
        
        
        extend: [
            this.iif(!inherit, {
                //#region all initial states are none
                [bodyElm]: {
                    [this.decl(this._filterEnableDisable)] : ecssProps.filterNone,
                    [this.decl(this._animEnableDisable)]   : ecssProps.animNone,

                    [this.decl(this._animActivePassive)]   : ecssProps.animNone,
                },
                //#endregion all initial states are none
            }),



            //#region specific states
            //#region enable, disable => body enable, disable
            this.stateEnablingDisable({ // [enabling, disabling, disabled]
                [bodyElm]: {
                    [this.decl(this._filterEnableDisable)] : icssProps.filterDisable,
                },
            }),
            this.stateEnabling({ // [enabling]
                [bodyElm]: {
                    [this.decl(this._animEnableDisable)]   : icssProps.animEnable,
                },
            }),
            this.stateDisable({ // [disabling, disabled]
                [bodyElm]: {
                    [this.decl(this._animEnableDisable)]   : icssProps.animDisable,
                },
            }),
            { // [disabled]
                '&.disabled,&:disabled:not(.disable)': { // if ctrl was fully disabled programatically, disable first animation
                    [bodyElm]: this.applyStateNoAnimStartupOld(),
                },
            },
            //#endregion enable, disable => body enable, disable



            //#region active, passive => body active, passive
            this.stateActive({ // [activating, actived]
                [bodyElm]: {
                    [this.decl(this._animActivePassive)]   : cssProps.bodyAnimActive,
                },

                extend: [
                    //TODO: update....
                    this.themeActive(),
                ] as JssStyle,
            }),
            this.statePassivating({ // [passivating]
                [bodyElm]: {
                    [this.decl(this._animActivePassive)]   : cssProps.bodyAnimPassive,
                },
            }),
            this.stateNotActivePassivating({ // hides the AccordionItem's body if not [activating, actived, passivating]
                [bodyElm]: {
                    display: 'none',
                },
            }),
            {
                // [actived]
                '&.actived': { // if activated programmatically (not by user input), disable the animation
                    [bodyElm]: this.applyStateNoAnimStartupOld(),
                },
            },
            //#endregion active, passive => body active, passive
            //#endregion specific states
        ] as JssStyle,



        // apply the orientation variants:
        '*.inline>*>&': {
            [bodyElm]: {
                // overwrites propName = propName{Inline}:
                ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, 'Inline')),
            },
        },
    }}

    public /*override*/ statesOld(inherit = false): JssStyle {
        // skip Element's states
        // jump to indication's states
        return this.indicationStatesOld(inherit);
    }



    // functions:
    public /*override*/ indicationAnimFnOld(): JssStyle { return {
        // define an *animations* func for the AccordionItem's body:
        [bodyElm]: {
            [this.decl(this._animFnOld)]: [
                ecssProps.anim,
                this.ref(this._animEnableDisable), // 2nd : if AccordionItem's header is disable(d) => the AccordionItem's body is disable(d) too
                this.ref(this._animActivePassive), // 1st : if AccordionItem's header is active(d)  => the AccordionItem's body is visible
            ],
        },
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
    protected /*virtual*/ bodyBasicStyle(): JssStyle { return {
        // apply fn props:
        anim : this.ref(this._animFnOld),



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

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        ListgroupItems.Props<TElement>,
        Indicators.TogglerActiveProps
{
    // accessibility:
    label?          : string | React.ReactNode
}
export default function AccordionItem<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    // styles:
    const accItemStyles         = styles.useStyles();

    
    
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
            mainClass={props.mainClass ?? accItemStyles.main}


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