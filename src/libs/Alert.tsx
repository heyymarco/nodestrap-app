// react (builds html using javascript):
import {
    default as React,
}                           from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    ClassList,
    PropList,


    // components:
    CssConfig,
    Element,


    // utils:
    isTypeOf,
}                           from './nodestrap'  // nodestrap's core
import {
    PopupStyles,
    PopupProps,
    Popup,
}                           from './Popup'
import {
    IContentStyles,
    contentStyles,
}                           from './Content'
import Icon                 from './Icon'
import CloseButton          from './CloseButton'
import spacers              from './spacers'     // configurable spaces defs



// styles:

const iconElm    = '&>.icon';
const bodyElm    = '&>.body';
const controlElm = '&>.control';

export class AlertStylesBuilder extends PopupStyles implements IContentStyles {
    // variants:
    public /*override*/ theme(theme: string): JssStyle { return {
        extend: [
            super.theme(theme), // copy themes from base
            
            this.contentTheme(theme),
        ] as JssStyle,
    }}
    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base

            this.contentSize(size),
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}

    public /*implement*/ contentTheme(theme: string): JssStyle {
        return contentStyles.contentTheme(theme); // copy themes from Content
    }
    public /*implement*/ contentSize(size: string): JssStyle {
        return contentStyles.contentSize(size); // copy sizes from Content
    }



    // states:
    public /*override*/ states(inherit: boolean): ClassList { return [
        ...super.states(inherit), // copy states from base

        ...this.contentStates(inherit),
    ]}
    public /*implement*/ contentStates(inherit: boolean): ClassList {
        return contentStyles.contentStates(inherit); // copy states from Content
    }



    // functions:
    public /*override*/ propsFn(): PropList { return {
        ...super.propsFn(), // copy functional props from base
        
        ...this.contentPropsFn(),
    }}
    public /*implement*/ contentPropsFn(): PropList {
        return contentStyles.contentPropsFn(); // copy functional props from Content
    }



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base

            this.contentBasicStyle(),
        ] as JssStyle,



        // layout:
        display             : 'grid', // use css grid for layouting, so we can customize the desired area later.

        // explicit areas:
        gridTemplateRows    : [['auto']],
        gridTemplateColumns : [['auto']],
        gridTemplateAreas   : [[
            '"body"',
        ]],

        // implicit areas:
        gridAutoFlow        : 'column',
        gridAutoRows        : 'min-content',
        gridAutoColumns     : 'min-content',

        // child alignments:
        justifyItems        : 'stretch', // each section fill the entire area's width
        alignItems          : 'stretch', // each section fill the entire area's height



        // children:
        [iconElm]    : this.iconBasicStyle(),
        [bodyElm]    : this.bodyBasicStyle(),
        [controlElm] : this.controlBasicStyle(),



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
    public /*implement*/ contentBasicStyle(): JssStyle {
        return contentStyles.contentBasicStyle(); // copy basicStyle from Content
    }
    protected /*virtual*/ iconBasicStyle(): JssStyle { return {
        // layout:
        gridArea    : '1 / -3', // the first row / the third column starting from the last
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
        gridArea    : '1 / 2',  // the first row / the second column
        justifySelf : 'center', // align horizontally to center
        alignSelf   : 'start',  // align vertically   to top


        
        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'control')), // apply *general* cssProps starting with control***
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
        //#region spacings
        gapX : spacers.default,
        gapY : spacers.default,
        //#endregion spacings
    };
}, /*prefix: */'alrt');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// react components:

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        PopupProps<TElement>
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
        // default (unset) or string:
        if ((icon === undefined) || (typeof icon === 'string')) return (
            <Icon
                // appearances:
                icon={icon ?? (() => {
                    switch (props.theme) {
                        case 'success'   : return 'check_circle';
                        case 'warning'   : return 'warning';
                        case 'danger'    : return 'error';
                     // case 'primary'   :
                     // case 'secondary' :
                     // case 'info'      :
                     // case 'light'     :
                     // case 'dark'      :
                        default          : return 'info';
                    } // switch
                })()}


                // variants:
                theme={props.theme}
                size='md'


                // classes:
                classes={[
                    'icon', // inject icon class
                ]}
            />
        );

        
        
        // nodestrap's component:
        if (isTypeOf(icon, Element)) return (
            <icon.type
                // classes:
                classes={[...(icon.props.classes ?? []),
                    'icon', // inject icon class
                ]}
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
                // variants:
                size='xs'


                // classes:
                classes={[
                    'control', // inject control class
                ]}


                // actions:
                onClick={() => props.onClose?.()}
            />
        );

        
        
        // nodestrap's component:
        if (isTypeOf(control, Element)) return (
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