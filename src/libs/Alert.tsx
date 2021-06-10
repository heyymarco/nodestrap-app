// react (builds html using javascript):
import {
    default as React,
}                           from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
}                           from 'jss'          // ts defs support for jss
import {
    Cust,
}                           from './Css'        // ts defs support for jss
import CssConfig            from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import {
    GenericElement,
    isTypeOf,
}                           from './Element'
import {
    default  as Popup,
    PopupStylesBuilder,
}                           from './Popup'
import type * as Popups     from './Popup'
import {
    styles as contentStyles,
}                           from './Content'
import type {
    IContentStylesBuilder,
}                           from './Content'
import CloseButton          from './CloseButton'



// styles:

const iconElm    = '&>.icon';
const bodyElm    = '&>.body';
const controlElm = '&>.control';

export class AlertStylesBuilder extends PopupStylesBuilder implements IContentStylesBuilder {
    // themes:
    public /*implement*/ contentThemeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle {
        return contentStyles.contentThemeOf(theme, Theme, themeProp, themeColor); // copy themes from Content
    }
    public /*implement*/ contentSizeOf(size: string, Size: string, sizeProp: string): JssStyle {
        return contentStyles.contentSizeOf(size, Size, sizeProp); // copy sizes from Content
    }

    public /*override*/ themeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle { return {
        extend: [
            super.themeOf(theme, Theme, themeProp, themeColor), // copy themes from base
            
            this.contentThemeOf(theme, Theme, themeProp, themeColor),
        ] as JssStyle,
    }}
    public /*override*/ sizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {
        extend: [
            super.sizeOf(size, Size, sizeProp), // copy sizes from base

            this.contentSizeOf(size, Size, sizeProp),
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, Size)),
    }}



    // states:
    public /*implement*/ contentThemesIf(): JssStyle { return {} } // not implemented
    public /*implement*/ contentStates(inherit = false): JssStyle { return {} } // not implemented

    public /*override*/ themesIf(): JssStyle { return {
        extend: [
            super.themesIf(), // copy themes from base

            this.contentThemesIf(),
        ] as JssStyle,
    }}
    public /*override*/ states(inherit = false): JssStyle { return {
        extend: [
            super.states(inherit), // copy states from base

            this.contentStates(inherit),
        ] as JssStyle,
    }}



    // functions:
    public /*implement*/ contentPropsFn(): JssStyle {
        return contentStyles.contentPropsFn(); // copy functional props from Content
    }
    public /*override*/ propsFn(): JssStyle { return {
        extend: [
            super.propsFn(), // copy functional props from base

            this.contentPropsFn(),
        ] as JssStyle,
    }}



    // styles:
    public /*implement*/ contentBasicStyle(): JssStyle {
        return contentStyles.contentBasicStyle(); // copy basicStyle from Content
    }
    protected /*virtual*/ iconBasicStyle(): JssStyle { return {
        // layout:
        gridArea    : 'icon',
        justifySelf : 'center', // align horizontally to center
        alignSelf   : 'start',  // align vertically   to top


        
        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'icon')), // apply *general* cssProps starting with icon***
    }}
    protected /*virtual*/ bodyBasicStyle(): JssStyle { return {
        // layout:
        gridArea : 'body',



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'body')), // apply *general* cssProps starting with body***
    }}
    protected /*virtual*/ controlBasicStyle(): JssStyle { return {
        // layout:
        gridArea    : 'control',
        justifySelf : 'center', // align horizontally to center
        alignSelf   : 'start',  // align vertically   to top


        
        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'control')), // apply *general* cssProps starting with control***
    }}
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base

            this.contentBasicStyle(),
        ] as JssStyle,



        // layout:
        display             : 'grid', // use css grid for layouting, so we can customize the desired area later.

        // explicit areas:
        gridTemplateRows    : [['auto']],
        gridTemplateColumns : [['min-content', 'auto', 'min-content']],
        gridTemplateAreas   : [[
            '"icon body control"',
        ]],

        // child alignments:
        justifyItems        : 'stretch', // each section fill the entire area's width
        alignItems          : 'stretch', // each section fill the entire area's height



        // children:
        [iconElm] : this.iconBasicStyle(),
        [bodyElm]    : this.bodyBasicStyle(),
        [controlElm] : this.controlBasicStyle(),



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
}
export const styles = new AlertStylesBuilder();



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
    };
}, /*prefix: */'alrt');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// react components:

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        Popups.Props<TElement>
{
    // actions:
    onClose?  : () => void


    // children:
    children? : React.ReactNode
    icon?     : React.ReactChild | boolean | string
    control?  : React.ReactChild | boolean
}
export default function Alert<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    // styles:
    const alrtStyles = styles.useStyles();



    // rest props:
    const {
        // children:
        icon,
        children: body,
        control,
    ...restProps} = props;



    // jsx fn props:
    const iconFn = (() => {
        // default (unset):
        if (icon === undefined) return (
            <CloseButton
                // themes:
                size='sm'


                // classes:
                classes={[
                    'icon',
                ]}


                // actions:
                onClick={() => props.onClose?.()}
            />
        );

        
        
        // nodestrap's component:
        if (isTypeOf(icon, GenericElement)) return (
            <icon.type
                // classes:
                classes={[...(icon.props.classes ?? []),
                    'icon', // inject icon class
                ]}


                // actions:
                onClick={props.onClick ?? (() => props.onClose?.())}
            />
        );



        // other component:
        return icon && (
            <div
                // classes:
                className='icon'
            >
                { icon }
            </div>
        );
    })();

    const bodyFn = (() => {
        return body && (
            <div
                // classes:
                className='body'
            >
                { body }
            </div>
        );
    })();

    const controlFn = (() => {
        // default (unset):
        if (control === undefined) return (
            <CloseButton
                // themes:
                size='sm'


                // classes:
                classes={[
                    'control',
                ]}


                // actions:
                onClick={() => props.onClose?.()}
            />
        );

        
        
        // nodestrap's component:
        if (isTypeOf(control, GenericElement)) return (
            <control.type
                // classes:
                classes={[...(control.props.classes ?? []),
                    'control', // inject control class
                ]}


                // actions:
                onClick={props.onClick ?? (() => props.onClose?.())}
            />
        );



        // other component:
        return control && (
            <div
                // classes:
                className='control'
            >
                { control }
            </div>
        );
    })();



    // jsx:
    return (
        <Popup
            // other props:
            {...restProps}


            // classes:
            mainClass={props.mainClass ?? alrtStyles.main}
        >
            { iconFn }

            { bodyFn }

            { controlFn }
        </Popup>
    );
}