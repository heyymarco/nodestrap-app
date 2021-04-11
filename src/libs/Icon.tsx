// react (builds html using javascript):
import
    React, {
    useMemo,
}                          from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
    Styles,
}                          from 'jss'          // ts defs support for jss
import {
    Cust,
}                          from './Css'        // ts defs support for jss
import CssConfig           from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.
import type {
    DictionaryOf,
}                          from './CssConfig'   // ts defs support for jss

// nodestrap (modular web components):
import fontMaterial        from './Icon-font-material'
import {
    default  as Element,
    ElementStylesBuilder,
    cssProps as ecssProps,
}                          from './Element'
import type * as Elements  from './Element'



// styles:

export class IconStylesBuilder extends ElementStylesBuilder {
    //#region scoped css props
    /**
     * Icon's image url (with additional image's props).
     */
    public readonly _img = 'img'
    //#endregion scoped css props



    // themes:
    public themeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle { return {
        [this.decl(this._foregTh)] : themeColor,
    }}

    protected sizeOptions(): string[] {
        return ['sm', 'nm', 'md', 'lg', '1em'];
    }
    public sizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {
        // overwrite the global props with the *prop{Size}*:

        [cssDecls.size] : (size === '1em') ? '1em' : (cssProps as DictionaryOf<typeof cssProps>)[`size${Size}`],
    }}
    public outlined(): JssStyle  { return {}; } // remove outlined style



    // states:
    protected fnProps(): JssStyle { return {
        extend: super.fnProps(), // copy functional props from base



        //#region delete *unecessary* functional props from base:
        [this.decl(this._backgFn)]         : null,
        [this.decl(this._foregOutlinedFn)] : null,
        [this.decl(this._backgOutlinedFn)] : null,
        [this.decl(this._animFn)]          : null,
        //#endregion delete *unecessary* functional props from base:
    }}
    protected themesIf(): JssStyle { return {
        // define a *default* color theme:
        [this.decl(this._foregIf)] : cssProps.foreg,
    }}



    // styles:
    public basicStyle(): JssStyle { return {
        extend: [
            this.filterGeneralProps(cssProps), // apply *general* cssProps
        ] as JssStyle,



        // layout:
        display       : 'inline-flex',
        alignItems    : 'center', // center items vertically
        flexWrap      : 'nowrap',



        // positions:
        verticalAlign : 'baseline',



        // the dummy text content, for making height as tall as line-height
        '&::before': {
            // layout:
            content    : '"\xa0"', // &nbsp;
            display    : 'inline',
            

            // appearance:
            inlineSize : 0,
            overflow   : 'hidden',
            visibility : 'hidden',
        },



        // colors:
        foreg         : null, // delete from cssProps; in img-icon: foreg => backgColor ; in font-icon: foreg => foreg => color (font-color)

        // sizes:
        size          : null, // delete from cssProps, in img-icon: size => [width, height] ; in font-icon: size => fontSize
    }}
    public basicFontStyle(): JssStyle { return {
        '&::after': {
            // layout:
            content    : this.ref(this._img),
            display    : 'inline',
            

            // colors:
            backg         : 'transparent',           // setup backg color
            foreg         : this.ref(this._foregFn), // setup icon's color
            
    
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
    public basicImgStyle(): JssStyle { return {
        // colors:
        backg         : this.ref(this._foregFn), // setup icon's color
        
        
        // transition:
        transition    : ecssProps.transition,


        // sizes:
        //#region children
        // just a *dummy* element for filling the space (width)
        '& >img': {
            // appearance:
            visibility : [['hidden'], '!important'], // invisible but still filling the space


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

    public imgStyle(img: Cust.Ref, foreg?: Cust.Ref): JssStyle { return {
        extend: [
            this.basicStyle(),
            this.basicImgStyle(),
        ] as JssStyle,



        // setup icon's image:
        [this.decl(this._img)]     : img,

        // setup icon's color:
        [this.decl(this._foregFn)] : (foreg && (foreg !== this.decl(this._foregFn))) ? foreg : null,
    }}

    protected styles(): Styles<'main'> {
        const styles = super.styles();
        Object.assign(styles.main, {
            '&.font' : this.basicFontStyle(),
            '&.img'  : this.basicImgStyle(),
        });
        return styles;
    }



    //#region utils
    /**
     * Merges two specified url to final url.
     * @param target The relative or absolute target url.
     * @param base The relative or absolute base url.
     * @returns A final url.  
     * If `target` is an absolute url, the `base` discarded.  
     * Otherwise, the combination of `base` url followed by `target` url.
     */
    concatUrl(target: string, base: string) {
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
    formatOf(fileName: string) {
        if (!fileName) return null;
    
        const match = fileName.match(/(?<=[.])\w+$/)?.[0];
        if (match) {
            if (match === 'ttf') return 'format("truetype")';
            return `format("${match}")`;
        } // if
    
        return null;
    }
    //#endregion utils
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
        size   :            basics.sizeNm,
        sizeSm : [['calc(', basics.sizeNm, '*', 0.75  , ')']],
        sizeMd : [['calc(', basics.sizeNm, '*', 1.50  , ')']],
        sizeLg : [['calc(', basics.sizeNm, '*', 2.00  , ')']],
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

export function useIcon(props: Props) {
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
                // appearance:
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

export interface Props
    extends
        Elements.Props
{
    // appearance:
    icon: string
}
export default function Icon(props: Props) {
    const icoStyles = styles.useStyles();

    // appearance:
    const icon      = useIcon(props);



    return (
        <Element
            // default props:
            {...{
                tag : 'span', // default [tag]=span
            }}


            // other props:
            {...props}


            // classes:
            classes={[
                // main:
                (props.classes ? null : icoStyles.main),


                // additionals:
                ...(props.classes ?? []),


                // appearance:
                icon.class,
            ]}


            // appearance:
            style={{
                ...icon.style,
                ...props.style,
            }}
        >
            { icon.children }
            { props.children }
        </Element>
    );
}