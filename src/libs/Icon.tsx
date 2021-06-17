// react (builds html using javascript):
import {
    default as React,
    useMemo,
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
    ClassList,
}                           from './nodestrap'  // nodestrap's core
import fontMaterial         from './Icon-font-material'
import {
    default  as Element,
    BasicComponentStyles,
    cssProps as ecssProps,
}                           from './BasicComponent'
import type * as Elements   from './BasicComponent'



// styles:

export class IconStylesBuilder extends BasicComponentStyles {
    //#region scoped css props
    /**
     * Icon's image url (with additional image's props).
     */
    public readonly _img = 'img'
    //#endregion scoped css props



    // variants:
    public /*override*/ variants(): ClassList { return [
        ...super.variants(), // copy variants from base



        [ 'font', this.font()  ],
        [ 'img' , this.image() ],
    ]}
    public /*override*/ theme(theme: string): JssStyle { return {
        extend: [
            super.theme(theme), // copy themes from base
        ] as JssStyle,



        // to be able to inherit theme from parent, we use _outlinedForegTh** as the variable name
        // other unecessary variables are deleted
        [this.decl(this._foregTh)]          : null,
        [this.decl(this._backgTh)]          : null,
        [this.decl(this._borderTh)]         : null,
     // [this.decl(this._outlinedForegTh)]  : null,
        [this.decl(this._boxShadowFocusTh)] : null,
    }}
    public /*override*/ sizeOptions(): string[] {
        return ['sm', 'nm', 'md', 'lg', '1em'];
    }
    public /*override*/ size(size: string): JssStyle { return {
        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}
    public /*override*/ outlined(): JssStyle { return {} } // remove outlined style
    public /*virtual*/ font(): JssStyle { return {
        '&::after': {
            // layout:
            content    : this.ref(this._img),
            display    : 'inline',
            

            // colors:
            backg         : 'transparent',                   // setup backg color
            foreg         : this.ref(this._outlinedForegFn), // setup icon's color
            
    
            // sizes:
            fontSize      : cssProps.size,  // setup icon's size
            overflowY     : 'hidden',       // hide the pseudo-inherited underline
            
            
            // transition:
            transition    : ecssProps.transition,
    
    
            // accessibility:
            userSelect    : 'none',         // disable selecting icon's text
    
    
            //#region fonts
            //#region custom font
            // load custom font:
            '@global': {
                '@font-face': {
                    ...config.font.styles,
                    src: config.font.files.map((fileName) => `url("${styles.concatUrl(fileName, config.font.path)}") ${this.formatOf(fileName)}`).join(','),
                },
            },
    
    
    
            // apply custom font:
            ...config.font.styles,
            //#endregion custom font
    
    
            lineHeight    : 1,
            textTransform : 'none',
            letterSpacing : 'normal',
            wordWrap      : 'normal',
            whiteSpace    : 'nowrap',
            direction     : 'ltr',
    
    
            //#region browser supports
            '-webkit-font-smoothing'  : 'antialiased',        // support for all WebKit browsers
            'textRendering'           : 'optimizeLegibility', // support for Safari and Chrome
            '-moz-osx-font-smoothing' : 'grayscale',          // support for Firefox
            fontFeatureSettings       : 'liga',               // support for IE
            //#endregion browser supports
            //#endregion fonts
        },
    }}
    public /*virtual*/ image(): JssStyle { return {
        // colors:
        backg         : this.ref(this._outlinedForegFn), // setup icon's color
        
        
        // transition:
        transition    : ecssProps.transition,


        // sizes:
        //#region children
        // just a *dummy* element for calculating the image's width
        '&>img': {
            // layout:
            display    : 'inline-block', // use inline-block



            // appearances:
            visibility : 'hidden', // hide the element, but still consume the dimension



            // sizes:
            blockSize  : cssProps.size, // follow config's size
            inlineSize : 'auto',        // calculates the width by [height * aspect-ratio]



            // transition:
            transition : 'inherit',



            // accessibility:
            userSelect : 'none', // disable selecting icon's img
        },
        //#endregion children


        //#region image masking
        maskSize      : 'contain',           // default image props
        maskRepeat    : 'no-repeat',         // default image props
        maskPosition  : 'center',            // default image props
        mask          : this.ref(this._img), // image with additional image's props
        //#endregion image masking
    }}



    // states:
    public /*override*/ themesIfOld(): JssStyle { return {
        extend: [
            super.themesIfOld(), // copy themes from base
        ] as JssStyle,



        // to be able to inherit theme from parent, we use _outlinedForegTh** as the variable name
        // other unecessary variables are deleted
        [this.decl(this._foregIf)]          : null,
        [this.decl(this._backgIf)]          : null,
        [this.decl(this._borderIf)]         : null,
     // [this.decl(this._outlinedForegIf)]  : null,
        [this.decl(this._boxShadowFocusIf)] : null,
    }}



    // functions:
    public /*override*/ propsFnOld(): JssStyle { return {
        extend: [
            super.propsFnOld(), // copy functional props from base
        ] as JssStyle,



        [this.decl(this._outlinedForegTh)]  : 'initial', // prevent theme from inheritance, so the Icon always use currentColor if the theme is not set



        // to be able to inherit theme from parent, we use _outlinedForegTh** as the variable name
        // other unecessary variables are deleted
        [this.decl(this._backgNone)]        : null,
        // TODO: add another none
        [this.decl(this._foregFn)]          : null,
        // [this.decl(this._backgLy)]          : null,
        [this.decl(this._backgFn)]          : null,
        [this.decl(this._borderFn)]         : null,
     // [this.decl(this._outlinedForegFn)]  : null,
        [this.decl(this._outlinedBackgFn)]  : null,
        [this.decl(this._boxShadowFocusFn)] : null,
    }}
    public /*override*/ animFnOld(): JssStyle { return {} } // remove animations



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        // layout:
        display       : 'inline-flex',
        alignItems    : 'center', // center items vertically
        flexWrap      : 'nowrap',



        // positions:
        verticalAlign : 'baseline',



        // the dummy text content, for making parent's height as tall as line-height
        '&::before': {
            // layout:
            content    : '"\xa0"', // &nbsp;
            display    : 'inline-block', // use inline-block, so we can kill the width
            


            // appearances:
            overflow   : 'hidden', // crop the text (&nbsp;)
            visibility : 'hidden', // hide the element, but still consume the dimension

            
            
            // sizes:
            inlineSize : 0,        // kill the width, we just need the height
        },



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps

        foreg         : null, // delete from cssProps; in img-icon: foreg => backgColor ; in font-icon: foreg => foreg => color (font-color)
    }}
    public /*virtual*/ useIcon(img: Cust.Ref, foreg?: Cust.Ref): JssStyle { return {
        extend: [
            this.basicStyle(),
            this.image(),
        ] as JssStyle,



        // setup icon's image:
        [this.decl(this._img)]     : img,

        // setup icon's color:
        ...((foreg && (foreg !== this.ref(this._outlinedForegFn))) ? {
            [this.decl(this._outlinedForegFn)] : foreg,
        } : {}),
    }}



    // utilities:
    /**
     * Merges two specified url to final url.
     * @param target The relative or absolute target url.
     * @param base The relative or absolute base url.
     * @returns A final url.  
     * If `target` is an absolute url, the `base` discarded.  
     * Otherwise, the combination of `base` url followed by `target` url.
     */
    public concatUrl(target: string, base: string) {
        const dummyUrl  = new URL('http://dummy')
        const baseUrl   = new URL(base, dummyUrl);
        const targetUrl = new URL(target, baseUrl);

        const result = targetUrl.href;
        if (result.startsWith(dummyUrl.origin)) return result.substr(dummyUrl.origin.length);
        return result;
    }

    /**
     * Gets the file format based on the extension of the specified `fileName`.
     * @param fileName The name of file to retrieve.
     * @returns  
     * A `string` represents the file format.  
     * -or-  
     * `null` if the format file is unknown.
     */
    public formatOf(fileName: string) {
        if (!fileName) return null;
    
        const match = fileName.match(/(?<=[.])\w+$/)?.[0];
        if (match) {
            if (match === 'ttf') return 'format("truetype")';
            return `format("${match}")`;
        } // if
    
        return null;
    }
}
export const styles = new IconStylesBuilder();



// configs:

const cssConfig = new CssConfig(() => {
    // common css values:
    // const initial = 'initial';
    // const unset   = 'unset';
    // const none    = 'none';
    // const inherit = 'inherit';
    // const center  = 'center';
    // const middle  = 'middle';


    const basics = {
        foreg  : 'currentColor',
        
        sizeNm : '24px',
    };

    return {
        ...basics,
        size    :            basics.sizeNm,
        sizeSm  : [['calc(', basics.sizeNm, '*', 0.75  , ')']],
        sizeMd  : [['calc(', basics.sizeNm, '*', 1.50  , ')']],
        sizeLg  : [['calc(', basics.sizeNm, '*', 2.00  , ')']],
        size1em : '1em',
    };
}, /*prefix: */'ico');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;


const config = {
    font: {
        /**
         * A *url directory* pointing to the collection of icon's fonts.  
         * It's the *front-end url*, not the physical path on the server.
         */
        path  : '/fonts/',

        /**
         * A list of icon's fonts with extensions.  
         * The order does matter. Place the most preferred file on the first.
         */
        files : [
            'MaterialIcons-Regular.woff2',
            'MaterialIcons-Regular.woff',
            'MaterialIcons-Regular.ttf',
        ],

        /**
         * A list of valid icon-font's content.
         */
        items : fontMaterial,

        /**
         * The css style of icon-font to be loaded.
         */
        styles : {
            fontFamily     : '"Material Icons"',
            fontWeight     : 400,
            fontStyle      : 'normal',
            textDecoration : 'none',
        } as JssStyle,
    },
    img: {
        /**
         * A *url directory* pointing to the collection of icon's images.  
         * It's the *front-end url*, not the physical path on the server.
         */
        path  : '/icons/',

        /**
         * A list of icon's images with extensions.  
         * The order doesn't matter, but if there are any files with the same name but different extensions, the first one will be used.
         */
        files : [
            'instagram.svg',
            'whatsapp.svg',
            'close.svg',
        ],
    },
};



// hooks:

export function useIcon<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    return useMemo(() => {
        const imgIcon = (() => {
            const fileName = config.img.files.find((file) => file.match(/[\w-.]+(?=[.]\w+$)/)?.[0] === props.icon);
            if (!fileName) return null;
            return styles.concatUrl(fileName, config.img.path);
        })();

        const isFontIcon = config.font.items.includes(props.icon);



        return {
            class: imgIcon ? 'img' : (isFontIcon ? 'font' : null),

            style: {
                // appearances:
                [styles.decl(styles._img)] : imgIcon ? `url("${imgIcon}")` : `"${props.icon}"`,
            },

            children: [
                (imgIcon ? (
                    <img key='ico-img' src={imgIcon} alt='' />
                ) : null),
            ].filter((child) => (child !== null)) as React.ReactNode,
        };
    }, [props.icon]);
}



// react components:

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        Elements.BasicComponentProps<TElement>
{
    // appearances:
    icon: string
}
export default function Icon<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    // styles:
    const icoStyles = styles.useStyles();

    
    
    // appearances:
    const icon      = useIcon(props);



    // jsx:
    return (
        <Element<TElement>
            // other props:
            {...props}


            // essentials:
            tag={props.tag ?? 'span'}


            // classes:
            mainClass={props.mainClass ?? icoStyles.main}
            classes={[...(props.classes ?? []),
                // appearances:
                icon.class,
            ]}


            // styles:
            style={{...(props.style ?? {}),
                // appearances:
                ...icon.style,
            }}
        >
            { icon.children }
            { props.children }
        </Element>
    );
}