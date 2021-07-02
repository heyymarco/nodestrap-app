// react (builds html using javascript):
import {
    default as React,
    useMemo,
}                           from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    Cust,
    ClassList,
    PropList,


    // components:
    CssConfig,
}                           from './nodestrap'  // nodestrap's core
import fontItems            from './Icon-font-material'
import {
    BasicComponentStyles,
    cssProps as bcssProps,
    BasicComponentProps,
    BasicComponent,
}                           from './BasicComponent'



// styles:

export class IconStyles extends BasicComponentStyles {
    //#region props
    /**
     * Icon's image url or icon's name.
     */
    public readonly _img = 'img'
    //#endregion props



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



        /*
            to be able to inherit theme from parent, we use:
            _backg**     as the normal color
            _mildBackg** as the mild   color
        */



        // other unnecessary variables are deleted
        [this.decl(this._foregTh)]          : null,
     // [this.decl(this._backgTh)]          : null, // necessary
        [this.decl(this._borderTh)]         : null,
        [this.decl(this._outlinedForegTh)]  : null,
        [this.decl(this._mildForegTh)]      : null,
     // [this.decl(this._mildBackgTh)]      : null, // necessary
        [this.decl(this._boxShadowFocusTh)] : null,
    }}

    public /*override*/ sizeOptions(): string[] {
        return ['sm', 'nm', 'md', 'lg', '1em'];
    }
    public /*override*/ size(size: string): JssStyle { return {
        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}

    public /*override*/ noGradient(inherit = false) : JssStyle { return {} } // disabled
    public /*override*/ gradient()                  : JssStyle { return {} } // disabled

    public /*override*/ noOutlined(inherit = false) : JssStyle { return {} } // disabled
    public /*override*/ outlined()                  : JssStyle { return {} } // disabled

    public /*virtual*/ font(): JssStyle { return {
        '&::after': {
            // layout:
            content       : this.ref(this._img), // put the icon's name here, the font system will replace the name to the actual image
            display       : 'inline',            // use inline, so it takes the width & height automatically
            

            
            // colors:
            backg         : 'transparent',         // set backg color
            foreg         : this.ref(this._foreg), // set icon's color
            
    
            
            // sizes:
            fontSize      : cssProps.size, // set icon's size
            overflowY     : 'hidden',      // hides the pseudo-inherited underline
            
            
            
            // transition:
            transition    : 'inherit',
    
    
            
            // accessibility:
            userSelect    : 'none', // disable selecting icon's text
    
    
            
            //#region fonts
            //#region custom font
            // load a custom font:
            '@global': {
                '@font-face': {
                    ...config.font.styles, // define the font's properties

                    src: config.font.files.map((file) => `url("${this.concatUrl(config.font.path, file)}") ${this.formatOf(file)}`).join(','),
                },
            },
    
    
    
            // use the loaded custom font:
            ...config.font.styles, // apply the defined font's properties
            //#endregion custom font
    
    
            
            // typos:
            lineHeight    : 1,
            textTransform : 'none',
            letterSpacing : 'normal',
            wordWrap      : 'normal',
            whiteSpace    : 'nowrap',
            direction     : 'ltr',
    
    
            
            //#region turn on available browser features
            '-webkit-font-smoothing'  : 'antialiased',        // support for all WebKit browsers
            'textRendering'           : 'optimizeLegibility', // support for Safari and Chrome
            '-moz-osx-font-smoothing' : 'grayscale',          // support for Firefox
            fontFeatureSettings       : 'liga',               // support for IE
            //#endregion turn on available browser features
            //#endregion fonts
        },
    }}
    public /*virtual*/ image(): JssStyle { return {
        // colors:
        backg         : this.ref(this._foreg), // set icon's color
        
        
        
        // sizes:
        //#region children
        // a dummy element, for making the image's width
        '&>img': {
            // layout:
            display    : 'inline-block', // use inline-block, so it takes the width & height as we set



            // appearances:
            visibility : 'hidden', // hide the element, but still consumes the dimension



            // sizes:
            blockSize  : cssProps.size, // set icon's size
            inlineSize : 'auto',        // calculates the width by [blockSize * aspect_ratio]



            // transition:
            transition : 'inherit', // inherit transition for smooth sizing changes



            // accessibility:
            userSelect : 'none', // disable selecting icon's img
        },
        //#endregion children


        
        //#region image masking
        maskSize      : 'contain',           // image's size is as big as possible without being cropped
        maskRepeat    : 'no-repeat',         // just one image, no repetition
        maskPosition  : 'center',            // place the image at the center
        maskImage     : this.ref(this._img), // set icon's image
        //#endregion image masking
    }}



    // states:
    public /*virtual*/ themeDefault(theme: string|null = null): PropList {
        /*
            to be able to inherit theme from parent, we use:
            _backg**     as the normal color
            _mildBackg** as the mild   color
        */

        
        
        if (theme) return {
            ...this.themeIf(theme),

            
            
            // other unnecessary variables are deleted
            [this.decl(this._foregIf)]          : null,
         // [this.decl(this._backgIf)]          : null, // necessary
            [this.decl(this._borderIf)]         : null,
            [this.decl(this._outlinedForegIf)]  : null,
            [this.decl(this._mildForegIf)]      : null,
         // [this.decl(this._mildBackgIf)]      : null, // necessary
            [this.decl(this._boxShadowFocusIf)] : null,
        };



        return {
            [this.decl(this._backgIf)]          : cssProps.foreg,
            [this.decl(this._mildBackgIf)]      : this.ref(this._backgIf),
        };
    }



    // functions:
    public /*override*/ propsFn(): PropList { return {
        ...super.propsFn(), // copy functional props from base



        //#region nones
        [this.decl(this._backgNone)]     : null,
        [this.decl(this._boxShadowNone)] : null,
        [this.decl(this._filterNone)]    : null,
        [this.decl(this._animNone)]      : null,
        //#endregion nones



        // prevent theme from inheritance, so the Icon always use currentColor if the theme is not set
        [this.decl(this._backgTh)]          : 'initial',
        [this.decl(this._mildBackgTh)]      : 'initial',



        /*
            to be able to inherit theme from parent, we use:
            _backg**     as the normal color
            _mildBackg** as the mild   color
        */



        // other unnecessary variables are deleted
        [this.decl(this._foregFn)]          : null,
     // [this.decl(this._backgFn)]          : null, // necessary
        [this.decl(this._borderFn)]         : null,

        [this.decl(this._outlinedForegFn)]  : null,
        [this.decl(this._outlinedBackgFn)]  : null,

        [this.decl(this._mildForegFn)]      : null,
     // [this.decl(this._mildBackgFn)]      : null, // necessary

        [this.decl(this._boxShadowFocusFn)] : null,



        //#region finals
        // define a final *foreground* color func:
        [this.decl(this._foreg)]     : this.ref(
            this._mildBackgTg,     // toggle mild
            this._backgFn,
        ),

        [this.decl(this._backgCol)]  : null,
        [this.decl(this._backgSol)]  : null,
        [this.decl(this._backg)]     : null,
        [this.decl(this._borderCol)] : null,
        [this.decl(this._boxShadow)] : null,
        [this.decl(this._filter)]    : null,
        [this.decl(this._anim)]      : null,
        //#endregion finals
    }}



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        // layout:
        display       : 'inline-flex', // use inline flexbox, so it takes the width & height as we set
        flexDirection : 'row',         // flow to the document's writting flow
        alignItems    : 'center',      // center items vertically
        flexWrap      : 'nowrap',      // do not wrap the children to the next row



        // positions:
        verticalAlign : 'baseline', // icon's text should be aligned with sibling text, so the icon behave like <span> wrapper



        // a dummy text content, for making parent's height as tall as line-height
        '&::before'   : {
            // layout:
            content    : '"\xa0"',       // &nbsp;
            display    : 'inline-block', // use inline-block, so we can kill the width
            


            // appearances:
            overflow   : 'hidden', // crop the text width (&nbsp;)
            visibility : 'hidden', // hide the element, but still consumes the dimension

            
            
            // sizes:
            inlineSize : 0,        // kill the width, we just need the height
        },



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps

        foreg         : null, // delete from cssProps; in img-icon: foreg => backgColor ; in font-icon: foreg => font-color
    }}
    public /*virtual*/ useIcon(img: Cust.Ref, foreg?: Cust.Ref): JssStyle { return {
        extend: [
            // basicStyle + image => img-icon
            this.basicStyle(),
            this.image(),
        ] as JssStyle,



        // setup icon's image:
        [this.decl(this._img)]       : img,

        // setup icon's color:
        ...((foreg && (foreg !== this.ref(this._foreg))) ? {
            [this.decl(this._foreg)] : foreg,
        } : {}),
    }}



    // utilities:
    /**
     * Merges two specified url to final url.
     * @param base The relative or absolute base url.
     * @param target The relative or absolute target url.
     * @returns A final url.  
     * If `target` is an absolute url, the `base` discarded.  
     * Otherwise, the combination of `base` url followed by `target` url.
     */
    public concatUrl(base: string, target: string) {
        const dummyUrl  = new URL('http://dummy')
        const baseUrl   = new URL(base, dummyUrl);
        const targetUrl = new URL(target, baseUrl);

        const result = targetUrl.href;
        if (result.startsWith(dummyUrl.origin)) return result.substr(dummyUrl.origin.length);
        return result;
    }

    /**
     * Gets the file format based on the extension of the specified `fileName`.
     * @param fileName The name of the file to retrieve.
     * @returns  
     * A `string` represents the file format.  
     * -or-  
     * `null` if the format file is unknown.
     */
    public formatOf(fileName: string) {
        if (!fileName) return null;
    
        
        
        const match = fileName.match(/(?<=\.)\w+$/)?.[0];
        if (match) {
            if (match === 'ttf') return 'format("truetype")';

            return                      `format("${match}")`;
        } // if
    
        
        
        return null;
    }
}
export const iconStyles = new IconStyles();



// configs:

const cssConfig = new CssConfig(() => {
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



        // animations:
        transition : bcssProps.transition,
    };
}, /*prefix: */'ico');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



const config = {
    font: {
        /**
         * A `url directory` pointing to the collection of the icon's fonts.  
         * It's the `front-end url`, not the physical path on the server.
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
        items : fontItems,

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
         * A `url directory` pointing to the collection of the icon's images.  
         * It's the `front-end url`, not the physical path on the server.
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

export function useIcon<TElement extends HTMLElement = HTMLElement>(props: IconProps<TElement>) {
    return useMemo(() => {
        const imgIcon = (() => {
            const file = config.img.files.find((file) => file.match(/[\w-.]+(?=\.\w+$)/)?.[0] === props.icon);
            if (!file) return null;
            return iconStyles.concatUrl(config.img.path, file);
        })();

        const isFontIcon = config.font.items.includes(props.icon);



        return {
            class: (() => {
                if (imgIcon)    return 'img';  // icon name is found in imgIcon

                if (isFontIcon) return 'font'; // icon name is found in fontIcon

                return null; // icon name is not found in both imgIcon & fontIcon
            })(),

            style: {
                // appearances:
                [iconStyles.decl(iconStyles._img)]: (() => {
                    if (imgIcon)    return `url("${imgIcon}")`; // the url of the icon's image

                    if (isFontIcon) return `"${props.icon}"`;   // the string of the icon's name

                    return undefined; // icon name is not found in both imgIcon & fontIcon
                })(),
            },

            children: [
                (imgIcon && (
                    <img key='ico-img' src={imgIcon} alt='' />
                )),
            ].filter((child) => !!child) as React.ReactNode,
        };
    }, [props.icon]);
}



// react components:

export interface IconProps<TElement extends HTMLElement = HTMLElement>
    extends
        BasicComponentProps<TElement>
{
    // appearances:
    icon: string
}
export default function Icon<TElement extends HTMLElement = HTMLElement>(props: IconProps<TElement>) {
    // styles:
    const styles = iconStyles.useStyles();

    
    
    // appearances:
    const icon   = useIcon(props);



    // jsx:
    return (
        <BasicComponent<TElement>
            // other props:
            {...props}


            // essentials:
            tag={props.tag ?? 'span'}


            // classes:
            mainClass={props.mainClass ?? styles.main}
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
        </BasicComponent>
    );
}
export { Icon }