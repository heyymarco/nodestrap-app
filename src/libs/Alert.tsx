// react (builds html using javascript):
import {
    default as React,
}                           from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,


    // components:
    CssConfig,
    Element,


    // utils:
    isTypeOf,
}                           from './nodestrap'  // nodestrap's core
import spacers              from './spacers'    // configurable spaces defs
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



// styles:

const iconElm    = '&>.icon';
const bodyElm    = '&>.body';
const controlElm = '&>.control';

export class AlertStyles extends PopupStyles implements IContentStyles {
    // variants:
    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base

            this.contentSize(size),
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}
    public /*implement*/ contentSize(size: string): JssStyle {
        return contentStyles.contentSize(size); // copy sizes from Content
    }



    // layouts:
    public /*override*/ layout(): JssStyle { return {
        extend: [
            super.layout(), // copy layout from base

            this.contentLayout(),
        ] as JssStyle,



        // layouts:
        display             : 'grid', // use css grid for layouting, so we can customize the desired area later.

        // explicit areas:
        /*
            just one explicit area: `body`
            icon & control rely on implicit area
        */
        gridTemplateRows    : [['auto'/*fluid height*/]],
        gridTemplateColumns : [['auto'/*fluid width*/ ]],
        gridTemplateAreas   : [[
            '"body"',
        ]],

        // implicit areas:
        gridAutoFlow        : 'column',      // if child's gridArea was not specified => place it automatically at horz direction
        gridAutoRows        : 'min-content', // other areas than `body` should take the minimum required height
        gridAutoColumns     : 'min-content', // other areas than `body` should take the minimum required width
        // the gridArea's size configured as *minimum* content's size required => no free space left to distribute => so (justify|algin)Content is *not required*

        // child alignments:
        justifyItems        : 'stretch', // each section fills the entire area's width
        alignItems          : 'stretch', // each section fills the entire area's height



        // children:
        [iconElm]    : this.iconLayout(),
        [bodyElm]    : this.bodyLayout(),
        [controlElm] : this.controlLayout(),



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
    public /*implement*/ contentLayout(): JssStyle {
        return contentStyles.contentLayout(); // copy layout from Content
    }
    protected /*virtual*/ iconLayout(): JssStyle { return {
        // layouts:
        gridArea    : '1 / -3', // the first row / the third column starting from the last
        justifySelf : 'center', // align horizontally to center
        alignSelf   : 'start',  // align vertically   to top


        
        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'icon')), // apply *general* cssProps starting with icon***
    }}
    protected /*virtual*/ bodyLayout(): JssStyle { return {
        // layouts:
        gridArea : 'body',



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'body')), // apply *general* cssProps starting with body***
    }}
    protected /*virtual*/ controlLayout(): JssStyle { return {
        // layouts:
        gridArea    : '1 / 2',  // the first row / the second column
        justifySelf : 'center', // align horizontally to center
        alignSelf   : 'start',  // align vertically   to top


        
        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'control')), // apply *general* cssProps starting with control***
    }}
}
export const alertStyles = new AlertStyles();



// configs:

const cssConfig = new CssConfig(() => {
    return {
        //#region spacings
        gapX            : spacers.default,
        gapY            : spacers.default,
        //#endregion spacings
    };
}, /*prefix: */'alrt');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// react components:

export interface AlertProps<TElement extends HTMLElement = HTMLElement>
    extends
        PopupProps<TElement>
{
    // actions:
    onClose?  : () => void


    // children:
    icon?     : React.ReactChild | boolean | null | string
    children? : React.ReactNode
    control?  : React.ReactChild | boolean | null
}
export default function Alert<TElement extends HTMLElement = HTMLElement>(props: AlertProps<TElement>) {
    // styles:
    const styles = alertStyles.useStyles();



    // rest props:
    const {
        // children:
        icon,
        children: body,
        control,
    ...restProps} = props;



    // fn props:
    const mildFn = props.mild ?? false;



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
                mild={!mildFn}


                // classes:
                classes={[
                    'icon', // inject icon class
                ]}
            />
        );

        
        
        // nodestrap's component:
        if (isTypeOf(icon, Element)) return (
            <icon.type
                // other props:
                {...icon.props}


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
                // other props:
                {...control.props}

                
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
        <Popup<TElement>
            // other props:
            {...restProps}


            // variants:
            mild={mildFn}


            // classes:
            mainClass={props.mainClass ?? styles.main}
        >
            { iconFn }

            { bodyFn }

            { controlFn }
        </Popup>
    );
}
export { Alert }