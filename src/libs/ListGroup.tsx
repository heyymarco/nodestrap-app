// react (builds html using javascript):
import React                from 'react'       // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
    Styles,
}                           from 'jss'          // ts defs support for jss
import CssConfig            from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import * as stripOuts       from './strip-outs'
import spacers              from './spacers'    // configurable spaces defs
import * as border          from './borders'    // configurable borders & border radiuses defs
import {
    GenericElement,
    cssProps as ecssProps,
}                           from './Element'
import {
    cssProps as icssProps,
}                           from './Indicator'
import {
    default  as Content,
    ContentStylesBuilder,
    styles as contentStyles,
}                           from './Content'
import type * as Contents   from './Content'
import {
    ControlStylesBuilder,
    styles as controlStyles,
}                           from './Control'
import type {
    IControlStylesBuilder,
}                           from './Control'
import ListGroupItem        from './ListGroupItem'



// styles:

const wrapperElm  = '&>li, &>*';
const listItemElm = '&>*';

class ListItemStylesBuilder extends ContentStylesBuilder {
    // themes:
    public /*override*/ sizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {
        extend: [
            super.sizeOf(size, Size, sizeProp), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, Size)),
    }}



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base
        ] as JssStyle,


        
        // layout:
        display      : 'block',



        // sizes:
        flex         : [[1, 1]], // growable & shrinkable, the size fills the wrapper



        // borders:
        //#region strip out borders completely
        /*
            border & borderRadius are moved from here to parent,
            for making consistent border color when the element's color are filtered.
            so we need to disable the border & borderRadius here.
        */



        borderWidth  : 0,
        borderRadius : 0,
        //#endregion strip out borders completely



        // strip out shadows:
        // moved from here to parent,
        boxShadow : undefined as unknown as null,



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'item')), // apply *general* cssProps starting with item***
    }}
}
const listItemStyles = new ListItemStylesBuilder();

class NonActionControlStylesBuilder extends ControlStylesBuilder {
    //#region mixins
    protected /*override*/ actionCtrl() { return false; }
    //#endregion mixins
}
class ListItemActionCtrlStylesBuilder extends ListItemStylesBuilder implements IControlStylesBuilder {
    //#region scoped css props
    // @ts-ignore
    protected readonly _animHoverLeave     = controlStyles._animHoverLeave
    // @ts-ignore
    protected readonly _animFocusBlur      = controlStyles._animFocusBlur



    public    readonly _filterPressRelease = 'filterPressRelease'
    protected readonly _animPressRelease   = 'animPressRelease'
    //#endregion scoped css props



    //#region mixins
    protected statePressing(content: JssStyle): JssStyle { return {
        '&.press,&:active:not(.disable):not(.disabled):not(:disabled)': content,
    }}
    protected statePress(content: JssStyle): JssStyle { return {
        '&.press,&.pressed,&:active:not(.disable):not(.disabled):not(:disabled)': content,
    }}
    protected stateNotPress(content: JssStyle): JssStyle { return {
        '&:not(.press):not(.pressed):not(:active), &:not(.press):not(.pressed).disable, &:not(.press):not(.pressed).disabled, &:not(.press):not(.pressed):disabled': content,
    }}
    protected stateNotPressed(content: JssStyle): JssStyle { return {
        // not fully pressed
        '&:not(.pressed)': content,
    }}
    protected stateReleasing(content: JssStyle): JssStyle { return {
        '&.release': content,
    }}
    protected stateNotReleasing(content: JssStyle): JssStyle { return {
        '&:not(.release)': content,
    }}
    protected statePressReleasing(content: JssStyle): JssStyle { return {
        '&.press,&.pressed,&:active:not(.disable):not(.disabled):not(:disabled),&.release': content,
    }}
    protected stateNotPressReleasing(content: JssStyle): JssStyle { return {
        '&:not(.press):not(.pressed):not(:active):not(.release), &:not(.press):not(.pressed).disable:not(.release), &:not(.press):not(.pressed).disabled:not(.release), &:not(.press):not(.pressed):disabled:not(.release)': content,
    }}
    protected stateNotPressingReleasing(content: JssStyle): JssStyle { return {
        '&:not(.press):not(:active):not(.release), &:not(.press).disable:not(.release), &:not(.press).disabled:not(.release), &:not(.press):disabled:not(.release)': content,
    }}



    protected /*override*/ actionCtrl() { return true; }



    protected /*override*/ applyStateNoAnimStartup(): JssStyle {
        return this.stateNotPressingReleasing(
            // @ts-ignore
            controlStyles.applyStateNoAnimStartup(),
        );
    }
    //#endregion mixins



    // states:
    public /*override*/ indicationStates(inherit = false): JssStyle { return {
        extend: [
            // doesn't support smooth hover/leave/focus/blur:
            // return indicatorStyles.indicationStates(inherit); // non-action indicationStates
    
            // supports smooth hover/leave/focus/blur:
            (new NonActionControlStylesBuilder()).indicationStates(inherit), // non-action indicationStates



            // this.iif(!inherit, { // do not inherit: parent element doesn't have [press, release]
            {
                //#region all initial states are none
                [this.decl(this._filterPressRelease)] : ecssProps.filterNone,
                [this.decl(this._animPressRelease)]   : ecssProps.animNone,
                //#endregion all initial states are none
            },
            // }),



            //#region specific states
            //#region active, passive
            this.statePressReleasing({ // [pressing, pressed, releasing]
                [this.decl(this._filterPressRelease)] : icssProps.filterActive,
            }),
            this.statePress({ // [pressing, pressed]
                [this.decl(this._animPressRelease)]   : icssProps.animActive,
            }),
            this.stateReleasing({ // [releasing]
                [this.decl(this._animPressRelease)]   : icssProps.animPassive,
            }),
            {
                // [pressed]
                '&.pressed': // if activated programmatically (not by user input), disable the animation
                    this.applyStateNoAnimStartup(),
            },
            //#endregion active, passive
            //#endregion specific states
        ] as JssStyle,
    }}
    public /*override*/ contentStates(inherit = false): JssStyle {
        return contentStyles.contentStates(inherit); // non-action contentStates
    }

    public /*implement*/ controlThemesIf(): JssStyle {
        return controlStyles.controlThemesIf(); // copy themes from Control
    }
    public /*implement*/ controlStates(inherit = false): JssStyle {
        return controlStyles.controlStates(inherit); // copy states from Control
    }
    
    public /*override*/ themesIf(): JssStyle { return {
        extend: [
            super.themesIf(), // copy themes from base

            this.controlThemesIf(),
        ] as JssStyle,
    }}
    public /*override*/ states(inherit = false): JssStyle { return {
        extend: [
            super.states(inherit), // copy states from base
            
            this.controlStates(/*inherit =*/false), // do not inherit: parent element doesn't have [hover, leave, focus, blur]
        ] as JssStyle,
    }}



    // functions:
    public /*implement*/ controlPropsFn(): JssStyle {
        return controlStyles.controlPropsFn(); // copy functional props from Control
    }
    public /*implement*/ controlAnimFn(): JssStyle { return {
        //#region re-arrange the animFn at different states
        '&.press,&.pressed': // if activated programmatically (not by user input)
            this.stateNotDisabled({ // if ctrl was not fully disabled
                // define an *animations* func:
                [this.decl(this._animFn)]: [
                    ecssProps.anim,
                    this.ref(this._animPressRelease),  // 5th : ctrl already pressed, move to the least priority
                    this.ref(this._animHoverLeave),    // 4th : cursor leaved   => low probability because holding press
                    this.ref(this._animFocusBlur),     // 3rd : ctrl lost focus => low probability because holding press
                    this.ref(this._animEnableDisable), // 2nd : ctrl enable/disable => rarely used => low probability
                    this.ref(this._animActivePassive), // 1st : ctrl got activated  => the most likely happened
                ],
            }),

        // define an *animations* func:
        [this.decl(this._animFn)]: [
            ecssProps.anim,
            this.ref(this._animEnableDisable), // 5th : ctrl must be enabled
            this.ref(this._animActivePassive), // 4th : rarely happened => low probability
            this.ref(this._animHoverLeave),    // 3rd : cursor hovered over ctrl
            this.ref(this._animFocusBlur),     // 2nd : ctrl got focused (can interrupt hover/leave)
            this.ref(this._animPressRelease),  // 1st : ctrl got pressed (can interrupt focus/blur)
        ],
        //#endregion re-arrange the animFn at different states
    }}

    public /*override*/ propsFn(): JssStyle { return {
        extend: [
            super.propsFn(), // copy functional props from base

            this.controlPropsFn(),
        ] as JssStyle,
    }}
    public /*override*/ animFn(): JssStyle {
        return this.controlAnimFn();
    }



    // styles:
    public /*implement*/ controlBasicStyle(): JssStyle {
        return controlStyles.controlBasicStyle(); // copy basicStyle from Control
    }
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            stripOuts.control,  // clear browser's default styles

            super.basicStyle(), // copy basicStyle from base

            this.controlBasicStyle(),
        ] as JssStyle,
    }}
}
const listItemActionCtrlStyles = new ListItemActionCtrlStylesBuilder();

export class ListGroupStylesBuilder extends ContentStylesBuilder {
    // themes:
    public /*override*/ sizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {
        extend: [
            super.sizeOf(size, Size, sizeProp), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, Size)),
    }}



    // states:
    /* -- same as parent -- */



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            //#region clear browser's default styles
            (() => {
                const style = stripOuts.list;
                delete (style as any)['&>li'].display;

                return style;
            })(),
            //#endregion clear browser's default styles
        ] as JssStyle,



        // layout:
        display        : 'flex',    // use flexbox as the layout
        flexDirection  : 'column',  // child items stacked vertically
        justifyContent : 'center',  // child items placed starting from the center and then spread to both sides
        alignItems     : 'stretch', // child items width are 100% of the parent



        // sizes:
        minInlineSize  : 0, // See https://github.com/twbs/bootstrap/pull/22740#issuecomment-305868106



        // borders:
        //#region make a nicely rounded corners
        /*
            border & borderRadius are moved from children to here,
            for making consistent border color when the children's color are filtered.
            so we need to reconstruct the border & borderRadius here.
        */



        //#region border-strokes
        border       : ecssProps.border,         // moved in from children
        borderColor  : this.ref(this._borderFn), // moved in from children
        //#endregion border-strokes



        //#region border radiuses
        borderRadius : ecssProps.borderRadius,   // moved in from children
        overflow     : 'hidden',                 // clip the children at the rounded corners
        //#endregion border radiuses
        //#endregion make a nicely rounded corners



        // shadows:
        boxShadow      : ecssProps.boxShadow, // moved in from children



        //#region children
        [wrapperElm]: { // wrapper of listItem
            // layout:
            display        : 'flex',    // use flexbox as the layout
            flexDirection  : 'row',     // listItem stacked horizontally (or change to vertically, the listItem is just one, the direction is not matter)
            justifyContent : 'stretch', // listItem width  is 100% of the wrapper (the listItem also need to have growable & shrinkable)
            alignItems     : 'stretch', // listItem height is 100% of the wrapper
    
    
    
            // borders:
            //#region make a nicely rounded corners
            /*
                border & borderRadius are moved from children to here,
                for making consistent border color when the children's color are filtered.
                so we need to reconstruct the border & borderRadius here.
            */



            //#region border-strokes as a separator
            border       : ecssProps.border,         // moved in from children
            borderColor  : this.ref(this._borderFn), // moved in from children

            borderInlineWidth         : 0,  // remove  (left|right)-border for all-wrapper

            // remove top-border at the first-child, so that it wouldn't collide with the listGroup's top-border
            // and
            // remove double border by removing top-border starting from the second-child to the last-child
            borderBlockStartWidth     : 0,

            // remove bottom-border at the last-child, so that it wouldn't collide with the listGroup's bottom-border
            '&:last-child': {
                borderBlockEndWidth   : 0,
            },
            //#endregion border-strokes as a separator
            //#endregion make a nicely rounded corners
    
    
    
            // children:
            [listItemElm]: {
                '&:not(.actionCtrl)' : listItemStyles.basicStyle(),
                '&.actionCtrl'       : listItemActionCtrlStyles.basicStyle(),
            },
        } as JssStyle, // wrapper of listItem
        '&:not(.bullet)' : {
            [wrapperElm] : {
                [listItemElm]: {
                    '&:not(.actionCtrl), &.actionCtrl': {
                        boxShadow : [['none'], '!important'], // no focus animation
                    },
                },
            },
        },
        //#endregion children



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
    public /*virtual*/ inlineStyle(): JssStyle { return {
        // layout:
        display        : 'inline-flex', // use flexbox as the layout
        flexDirection  : 'row',         // child items stacked horizontally



        //#region children
        [wrapperElm]: { // wrapper of listItem
            // borders:
            //#region make a nicely rounded corners
            /*
                border & borderRadius are moved from children to here,
                for making consistent border color when the children's color are filtered.
                so we need to reconstruct the border & borderRadius here.
            */



            //#region border-strokes as a separator
            border       : ecssProps.border,         // moved in from children
            borderColor  : this.ref(this._borderFn), // moved in from children

            borderBlockWidth          : 0,  // remove  (top|bottom)-border for all-wrapper

            // remove left-border at the first-child, so that it wouldn't collide with the listGroup's left-border
            // and
            // remove double border by removing left-border starting from the second-child to the last-child
            borderInlineStartWidth    : 0,

            // remove right-border at the last-child, so that it wouldn't collide with the listGroup's right-border
            '&:last-child': {
                borderInlineEndWidth  : 0,
            },
            //#endregion border-strokes as a separator
            //#endregion make a nicely rounded corners
        } as JssStyle, // wrapper of listItem
        //#endregion children
    }}
    public /*virtual*/ bulletStyle(): JssStyle { return {
        // layout:
        alignItems   : 'center', // child items are centered horizontally



        // borders:
        // kill borders surrounding ListGroup:
        borderWidth  : 0,
        borderRadius : 0,
        overflow     : 'unset',



        // spacings:
        // add space between bullets:
        gap          : cssProps.bulletSpacing,



        //#region children
        '&, &.inline': { // for normal and .inline style
            [wrapperElm]: { // wrapper of listItem
                // kill separator between bullets:
                borderWidth : 0,
            },
        } as JssStyle, // wrapper of listItem

        [wrapperElm]: { // wrapper of listItem
            // children:
            [listItemElm]: {
                '&:not(.actionCtrl), &.actionCtrl': {
                    // borders:
                    //#region bullet style border
                    //#region border-strokes
                    border       : ecssProps.border,         // moved in from children
                    borderColor  : this.ref(this._borderFn), // moved in from children
                    //#endregion border-strokes
    
    
    
                    //#region border radiuses
                    borderRadius : border.radiuses.pill, // big rounded corner
                    overflow     : 'hidden',             // clip the children at the rounded corners
                    //#endregion border radiuses
                    //#endregion bullet style border
    
    
    
                    // customize:
                    ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'bullet')), // apply *general* cssProps starting with bullet***
                },
            } as JssStyle,
        } as JssStyle, // wrapper of listItem
        //#endregion children
    }}
    protected /*override*/ styles(): Styles<'main'> {
        const styles = super.styles();
        styles.main = {
            extend: [
                styles.main,
                {
                    //#region forwards outlined to list items
                    /**
                     * -- fix imperfection by design --
                     * because outlined() depended on toggleOnOutlined() depended on propsFn()
                     * and we re-define propsFn() on [wrapperElm]>[listItemElm]
                     * so we need to re-define outlined() on [wrapperElm]>[listItemElm]
                     */
                    '&.outlined': {
                        [wrapperElm]: {
                            [listItemElm]: {
                                '&:not(.actionCtrl), &.actionCtrl': this.outlined(),
                            },
                        },
                    },
                    ...this.stateActive({
                        [wrapperElm]: {
                            [listItemElm]: {
                                '&:not(.actionCtrl), &.actionCtrl': {
                                    '&:not(._)': this.toggleOffOutlined(),
                                },
                            },
                        },
                    }),
                    //#endregion forwards outlined to list items
        
        
        
                    // children:
                    [wrapperElm]: {
                        [listItemElm]: {
                            '&:not(.actionCtrl)': {
                                extend: [
                                    // watch theme classes:
                                    listItemStyles.watchThemes(), // always inherit
            
                                    // watch state classes/pseudo-classes:
                                    listItemStyles.watchStates(/*inherit =*/true), // inherit from parent element: [enable, disable, active, passive]
            
                                    // after watching => use func props:
                                    listItemStyles.propsFn(),
                                ] as JssStyle,
                            },
                            '&.actionCtrl': {
                                extend: [
                                    // watch theme classes:
                                    listItemActionCtrlStyles.watchThemes(), // always inherit
            
                                    // watch state classes/pseudo-classes:
                                    listItemActionCtrlStyles.watchStates(/*inherit =*/true),
            
                                    // after watching => use func props:
                                    listItemActionCtrlStyles.propsFn(),
                                ] as JssStyle,
                            },
                        },
                    },
                },
                {
                    '&.inline' : this.inlineStyle(),
                    '&.bullet' : this.bulletStyle(),
                },
            ] as JssStyle,
        };
        

        
        return styles;
    }
}
export const styles = new ListGroupStylesBuilder();



// configs:

const cssConfig = new CssConfig(() => {
    // common css values:
    // const initial = 'initial';
    // const unset   = 'unset';
    // const none    = 'none';
    // const inherit = 'inherit';
    // const center  = 'center';
    // const middle  = 'middle';


    return {
        bulletSpacing   : spacers.sm,
        bulletSpacingSm : spacers.xs,
        bulletSpacingLg : spacers.md,
        
        bulletPadding   : spacers.xs,
        bulletPaddingSm : spacers.xxs,
        bulletPaddingLg : spacers.sm,
    };
}, /*prefix: */'lg');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// hooks:

export type OrientationStyle = 'block'|'inline'
export interface VariantOrientation {
    orientation?: OrientationStyle
}
export function useVariantOrientation(props: VariantOrientation) {
    return {
        class: props.orientation ? props.orientation : null,
    };
}

export type ListStyle = 'bullet' // might be added more styles in the future
export interface VariantList {
    listStyle?: ListStyle
}
export function useVariantList(props: VariantList) {
    return {
        class: props.listStyle ? props.listStyle : null,
    };
}



// react components:

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        Contents.Props<TElement>,
        VariantOrientation,
        VariantList
{
}
export default function ListGroup<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    const lgStyles        = styles.useStyles();

    // themes:
    const variOrientation = useVariantOrientation(props);
    const variList        = useVariantList(props);



    const {
        // essentials:
        tag,


        // children:
        children,
        ...otherProps } = props;
    const parentTag = tag ?? 'ul';
    const wrapTag   = ['ul', 'ol'].includes(parentTag) ? 'li' : 'div';

    return (
        <Content<TElement>
            // essentials:
            tag={parentTag}


            // other props:
            {...otherProps}


            // classes:
            mainClass={props.mainClass ?? lgStyles.main}
            themeClasses={[...(props.themeClasses ?? []),
                // themes:
                variOrientation.class,
                variList.class,
            ]}
        >
            {children && (Array.isArray(children) ? children : [children]).map((child, index) => (
                <GenericElement
                    // essentials:
                    key={index}
                    tag={wrapTag}
                >
                    {
                        (React.isValidElement(child) && (child.type === ListGroupItem))
                        ?
                        <ListGroupItem
                            // other props:
                            {...child.props}

                            
                            // events:
                            onAnimationEnd={(e) => {
                                // triggers ListGroup's onAnimationEnd event
                                e.currentTarget.parentElement?.parentElement?.dispatchEvent(new AnimationEvent('animationend', { animationName: e.animationName, bubbles: true }));


                                // forwards:
                                child.props.onAnimationEnd?.(e);
                            }}
                        />
                        :
                        <ListGroupItem
                            // events:
                            onAnimationEnd={(e) =>
                                // triggers ListGroup's onAnimationEnd event
                                e.currentTarget.parentElement?.parentElement?.dispatchEvent(new AnimationEvent('animationend', { animationName: e.animationName, bubbles: true }))
                            }
                        >
                            { child }
                        </ListGroupItem>
                    }
                </GenericElement>
            ))}
        </Content>
    );
}

export { ListGroupItem, ListGroupItem as Item }
