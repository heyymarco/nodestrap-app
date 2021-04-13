// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
}                           from 'jss'          // ts defs support for jss
import CssConfig            from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.
import type {
    Dictionary,
}                           from './CssConfig'  // ts defs support for jss

// nodestrap (modular web components):
import * as stripOuts       from './strip-outs'
import spacers              from './spacers'    // configurable spaces defs
import {
    default  as Content,
    ContentStylesBuilder,
    cssProps as ccssProps,
}                           from './Content'
import type * as Contents   from './Content'



// styles:

export class CardStylesBuilder extends ContentStylesBuilder {
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
        // span to maximum width including parent's paddings:
        inlineSize     : 'fill-available',
        fallbacks      : {
            inlineSize : [['calc(100% + (', ccssProps.paddingInline, ' * 2))']],
        },


        // spacings:
        // cancel-out parent's padding with negative margin:
        marginInline : [['calc(0px - ', ccssProps.paddingInline, ')']],
        marginBlock  : [['calc(0px - ', ccssProps.paddingBlock,  ')']],

        // kill negative margin so the prev sibling can add spaces:
        '&:not(:first-child)': {
            marginBlockStart : 0,
        },

        // add an extra spaces to the next sibling:
        '&:not(:last-child)': {
            marginBlockEnd   : ccssProps.paddingBlock,
        },
    }}
    protected basicCardItemStyle(): JssStyle { return {
        // layout:
        display: 'block',


        // sizes:
        // default card items' height are unresizeable (excepts for card's body):
        flex: [[0, 0, 'auto']], // not shrinking, not growing


        // spacings:
        paddingInline : ccssProps.paddingInline, // moved in paddings from parent
        paddingBlock  : ccssProps.paddingBlock,  // moved in paddings from parent



        //#region children
        //#region links
        // handle <a> as card-link:
        '& >a': {
            '& +a': {
                // add spaces between links:
                marginInlineStart: spacers.default,
            },
        },
        //#endregion links
        

        //#region images
        // handle <figure> & <img> as card-image:
        '& >figure': {
            extend: [
                stripOuts.figure, // clear browser's default styles
            ] as JssStyle,


            // children:
            '& >img': {
                // layout:
                display: 'block',


                // sizes:
                // span to maximum width:
                inlineSize     : 'fill-available',
                fallbacks      : {
                    inlineSize : '100%',
                },
            }
        },
        '& >figure, & >img': this.basicImageStyle(),
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
        minInlineSize  : 0, // See https://github.com/twbs/bootstrap/pull/22740#issuecomment-305868106
        

        // spacings:
        paddingInline  : undefined, // moved out to [header, body, footer]
        paddingBlock   : undefined, // moved out to [header, body, footer]
    

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
            // sizes:
            // Enable `flex-grow: 1` for decks and groups so that card blocks take up
            // as much space as possible, ensuring footers are aligned to the bottom.
            flex: [[1, 1, 'auto']],

            
            // borders:
            '&:not(:first-child)': {
                borderBlockStart : 'inherit', // add border between header & body
            },
            '&:not(:last-child)' : {
                borderBlockEnd   : 'inherit', // add border between body & footer
            },
        },
    }}
}
export const styles = new CardStylesBuilder();



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
        blockSize         : '100%', // set height to maximum if parent container has specific height, otherwise no effect

        capColor          : 'unset',
        capBackg          : 'unset',
        capBackdropFilter : 'brightness(0.8)',
    };
}, /*prefix: */'crd');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// react components:

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        Contents.Props<TElement>
{
    // children:
    header? : React.ReactNode
    footer? : React.ReactNode
}
export default function Card<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    const crdStyles = styles.useStyles();



    return (
        <Content<TElement>
            // default props:
            tag='article'


            // other props:
            {...props}


            // main:
            mainClass={props.mainClass ?? crdStyles.main}
        >
            {props.header && <header>
                { props.header }
            </header>}
            {props.children && <div className='body'>
                { props.children }
            </div>}
            {props.footer && <footer>
                { props.footer }
            </footer>}
        </Content>
    );
}