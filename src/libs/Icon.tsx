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
import Path                from 'path'
import fontMaterial        from './Icon-font-material'
import {
    default  as Element,
    ElementStylesBuilder,
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
        [this.decl(this._colorTh)] : themeColor,
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
        ...super.fnProps(), // copy functional props from base



        //#region delete *unecessary* functional props from base:
        [this.decl(this._backgFn)]         : null,
        [this.decl(this._colorOutlinedFn)] : null,
        [this.decl(this._backgOutlinedFn)] : null,
        [this.decl(this._animFn)]          : null,
        //#endregion delete *unecessary* functional props from base:
    }}
    protected themesIf(): JssStyle { return {
        // define a *default* color theme:
        [this.decl(this._colorIf)] : cssProps.color,
    }}



    // styles:
    public basicStyle(): JssStyle { return {
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps



        // layout:
        display       : 'inline-block',
        verticalAlign : 'middle',

        // colors:
        color         : null, // delete from cssProps; in img-icon: color => backgColor ; in font-icon: color => color (font-color)

        // sizes:
        size          : null, // delete from cssProps, in img-icon: size => [width, height] ; in font-icon: size => fontSize
        height        : cssProps.size,
        width         : 'min-content',
    }}
    public fontStyle(): JssStyle { return {
        // colors:
        backg         : 'transparent',           // setup backg color
        color         : this.ref(this._colorFn), // setup icon's color


        // sizes:
        fontSize      : cssProps.size,  // setup icon's size
        overflowY     : 'hidden',       // hide the pseudo-inherited underline


        // accessibility:
        userSelect    : 'none',         // disable selecting icon's text


        //#region fonts
        //#region custom font
        // load custom font:
        '@global': {
            '@font-face': {
                ...config.font.styles,
                src: config.font.files.map((file) => `url("${this.resolveUrl(file, config.font.path)}") ${this.formatOf(file)}`).join(','),
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
    }}
    public imgStyle(): JssStyle { return {
        // colors:
        backg         : this.ref(this._colorFn), // setup icon's color


        // sizes:
        //#region children
        // just a *dummy* element for filling the space
        '& >img': {
            // appearance:
            visibility : [['hidden'], '!important'], // invisible but still filling the space


            // sizes:
            width      : 'auto',           // calculates the width by [height * aspect-ratio]
            height     : 'fill-available', // follow parent's height
            fallbacks  : {
                height : '100%',
            },


            // accessibility:
            userSelect : 'none', // disable selecting icon's text
        },
        //#endregion children


        //#region image masking
        maskSize      : 'contain',           // default image props
        maskRepeat    : 'no-repeat',         // default image props
        maskPosition  : 'center',            // default image props
        mask          : this.ref(this._img), // image with additional image's props
        //#endregion image masking
    }}

    protected styles(): Styles<'main'> {
        const styles = super.styles();
        Object.assign(styles.main, {
            '&.font' : this.fontStyle(),
            '&.img'  : this.imgStyle(),
        });
        return styles;
    }



    //#region utils
    /**
     * Gets the file path relative to the specified `path`.
     * @param fileName The file name to retrieve.
     * @param path The relative path.
     * @returns A string represent relative file path.
     */
    resolveUrl(fileName: string, path: string) {
        if (!fileName) return fileName;
    
        if (fileName[0] === '~') fileName = Path.join('/node_modules', fileName.substr(1));
        return Path.join(path, fileName);
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
        color  : 'currentColor',
        
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
        path  : './fonts/',
        files : [
            'MaterialIcons-Regular.woff2',
            'MaterialIcons-Regular.woff',
            'MaterialIcons-Regular.ttf',
        ],

        styles : {
            fontFamily     : '"Material Icons"',
            fontWeight     : 400,
            fontStyle      : 'normal',
            textDecoration : 'none',
        } as JssStyle,

        items : fontMaterial,
    },
    img: {
        path  : './icons/',
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
            const file = config.img.files.find((file) => file.match(/[\w-.]+(?=[.]\w+$)/)?.[0] === props.icon);
            if (!file) return null;
            return styles.resolveUrl(file, config.img.path);
        })();

        const isFontIcon = config.font.items.includes(props.icon);



        return {
            class: imgIcon ? 'img' : (isFontIcon ? 'font' : null),

            style: {
                ...(imgIcon ? {
                    // appearance:
                    [styles.decl(styles._img)] : `url("${imgIcon}")`,
                } : {}),
            },

            children: [
                (imgIcon ? (
                    <img key='ico-img' src={imgIcon} alt='' />
                ) : null),

                ((!imgIcon && isFontIcon) ? props.icon : null),
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