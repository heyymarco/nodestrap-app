// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
    Styles,
}                           from 'jss'          // ts defs support for jss
import CssConfig            from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.
import type {
    Dictionary,
    DictionaryOf,
}                          from './CssConfig'   // ts defs support for jss

// nodestrap (modular web components):
import * as stripOuts      from './strip-outs'
import * as border         from './borders'     // configurable borders & border radiuses defs
import spacers             from './spacers'     // configurable spaces defs
import {
    GenericElement,
    cssProps as ecssProps,
}                           from './Element'
import {
    default  as Content,
    ContentStylesBuilder,
    cssProps as ccssProps,
}                           from './Content'
import type * as Contents   from './Content'



// styles:

export class ListGroupStylesBuilder extends ContentStylesBuilder {
    //#region global css props
    protected filterGeneralProps<TCssProps>(cssProps: TCssProps): JssStyle {
        const cssPropsCopy: Dictionary<any> = {};
        for (const [name, prop] of Object.entries(super.filterGeneralProps(cssProps))) {
            // excludes the entry if the name matching with following:
            if ((/^(cap)/).test(name)) continue; // exclude
            
            // if not match => include it:
            cssPropsCopy[name] = prop;
        }
        return cssPropsCopy as JssStyle;
    }
    //#endregion global css props



    // themes:
    /* -- same as parent -- */



    // states:
    /* -- same as parent -- */



    // styles:
    protected basicImageStyle(): JssStyle { return {
        // layout:
        display: 'block',


        // sizes:
        // maximum width including parent's paddings:
        width   : [['calc(100% + (', ccssProps.paddingX, ' * 2))']], // Required because we use flexbox and this inherently applies align-self: stretch
     // height  : [['calc(100% + (', ccssProps.paddingY, ' * 2))']],

        // cancel-out parent's padding with negative margin:
        marginX : [['calc(0px - ', ccssProps.paddingX, ')']],
        marginY : [['calc(0px - ', ccssProps.paddingY, ')']],



        // add an extra spaces to the next sibling:
        '&:not(:last-child)': {
            marginBottom: ccssProps.paddingY,
        },
    }}
    protected basicCardItemStyle(): JssStyle { return {
        // layout:
        display: 'block',


        // sizes:
        // default card's items are unresizeable (excepts for card's body):
        flex: [[0, 0, 'auto']],


        // spacings:
        paddingX: ccssProps.paddingX, // moved in paddings from parent
        paddingY: ccssProps.paddingY, // moved in paddings from parent



        //#region children
        //#region links
        // handle <a> as card-link:
        '& >a': {
            '& +a': {
                // add spaces between links:
                marginLeft: spacers.default,
            },
        },
        //#endregion links
        

        //#region images
        // handle <figure> & <img> as card-image:
        '& >figure, & >img': this.basicImageStyle(),
        '& >figure': {
            extend: [
                stripOuts.figure, // clear browser's default styles
            ] as JssStyle,


            // children:
            '& >img': {
                // layout:
                display: 'block',


                // sizes:
                width: '100%',
            }
        },
        //#endregion images
        //#endregion children
    }}
    public basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(),                // copy basicStyle from base
            this.filterGeneralProps(cssProps), // apply *general* cssProps
        ] as JssStyle,
    

        // layout:
        display        : 'flex',
        flexDirection  : 'column',


        // sizes:
        minWidth       : 0, // See https://github.com/twbs/bootstrap/pull/22740#issuecomment-305868106
        

        // spacings:
        paddingX       : undefined, // moved out to [header, body, footer]
        paddingY       : undefined, // moved out to [header, body, footer]
    

        // typos:
        wordWrap       : 'break-word',
    

        // children:
        overflow       : 'hidden', // clip the children at rounded corners
        '& header, & .body, & footer': this.basicCardItemStyle(),
        '& header, & footer': {
            extend: [
                this.filterPrefixProps(cssProps, 'cap'),
            ] as JssStyle,
        },
        '& .body': {
            // borders:
            '&:not(:first-child)': {
                borderTop: 'inherit',    // add border between header & body
            },
            '&:not(:last-child)': {
                borderBottom: 'inherit', // add border between body & footer
            },


            // sizes:
            // Enable `flex-grow: 1` for decks and groups so that card blocks take up
            // as much space as possible, ensuring footers are aligned to the bottom.
            flex: [[1, 1, 'auto']],
        },
    }}
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
        height            : '100%', // set height to maximum if parent container has specific height, otherwise no effect

        capColor          : 'unset',
        capBackg          : 'unset',
        capBackdropFilter : 'brightness(0.8)',
    };
}, /*prefix: */'crd');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// react components: