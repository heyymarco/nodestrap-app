// react (builds html using javascript):
import
    React, {
    useState,
}                          from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
    Styles,
}                          from 'jss'          // ts defs support for jss
import {
    PropEx,
    Cust,
}                          from './Css'        // ts defs support for jss
import CssConfig           from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.
import type {
    Dictionary,
    DictionaryOf,
}                          from './CssConfig'   // ts defs support for jss

// nodestrap (modular web components):
import colors              from './colors'     // configurable colors & theming defs
import Path                from 'path'
import fontMaterial        from './Icon-font-material'
import {
    default  as Element,
    cssProps as ecssProps,
    ElementStylesBuilder,
}                          from './Element'
import type * as Elements  from './Element'



// styles:

export class IconStylesBuilder extends ElementStylesBuilder {
    //#region scoped css props
    /**
     * Icon's image url.
     */
    public readonly _img = 'img'
    //#endregion scoped css props



    // themes:
    protected themeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle { return {
        [this.decl(this._colorTh)] : themeColor,
    }}

    protected sizeOptions(): string[] {
        return ['sm', 'nm', 'md', 'lg', '1em'];
    }
    protected sizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {
        // overwrite the global props with the *prop{Size}*:

        [cssDecls.size] : (size === '1em') ? '1em' : (cssProps as DictionaryOf<typeof cssProps>)[`size${Size}`],
    }}
    protected outlined(): JssStyle  { return {}; } // remove outlined style



    // states:
    protected fnProps(): JssStyle { return {
        ...super.fnProps(),



        // delete unecessary props from base:
        [this.decl(this._backgFn)]         : null,
        [this.decl(this._colorOutlinedFn)] : null,
        [this.decl(this._backgOutlinedFn)] : null,
        [this.decl(this._animFn)]          : null,
    }}
    protected themesIf(): JssStyle { return {
        // define a *default* color theme:
        [this.decl(this._colorIf)] : cssProps.color,
    }}



    // styles:
    public basicStyle(): JssStyle { return {
        // apply *general* cssProps
        ...this.filterGeneralProps(cssProps),
    
    
    
        // apply *non conditional* fn props:
        backg : this.ref(this._colorFn),



        // layout:
        display       : 'inline-block',
        verticalAlign : 'middle',

        // colors:
        color         : null, // delete; in img-icon: color => backgColor ; in font-icon: color => color (font-color)

        // sizes:
        size          : null, // delete, in img-icon: size => [width, height] ; in font-icon: size => fontSize
        height        : cssProps.size,
        width         : 'min-content',
    }}
    public fontStyle(): JssStyle { return {
        //#region custom font
        // load custom font:
        '@global': {
            '@font-face': config.font.styles,
        },



        // apply custom font:
        ...config.font.styles,
        //#endregion custom font



        //#region font settings
        fontSize      : cssProps.size,
        overflowY     : 'hidden', // hide the pseudo-inherited underline

        backg         : 'transparent',
        color         : cssProps.color,

        userSelect    : 'none', // disable selecting icon's text

        lineHeight    : 1,
        textTransform : 'none',
        letterSpacing : 'normal',
        wordWrap      : 'normal',
        whiteSpace    : 'nowrap',
        direction     : 'ltr',
        //#endregion font settings



        //#region browser supports
        // support for all WebKit browsers
        '-webkit-font-smoothing'  : 'antialiased',

        // support for Safari and Chrome
        'textRendering'           : 'optimizeLegibility',

        // support for Firefox
        '-moz-osx-font-smoothing' : 'grayscale',

        // support for IE
        fontFeatureSettings       : 'liga',
        //#endregion browser supports
    }}
    public imgStyle(): JssStyle { return {
        //#region image settings
        backg         : cssProps.color,



        //#region image masking
        mask          : this.ref(this._img),
        maskSize      : 'contain',
        maskRepeat    : 'no-repeat',
        maskPosition  : 'center',

        '-webkit-mask'          : this.ref(this._img),
        '-webkit-maskSize'      : 'contain',
        '-webkit-maskRepeat'    : 'no-repeat',
        '-webkit-maskPosition'  : 'center',
        //#endregion image masking
        //#endregion image settings



        //#region children
        '& >img': {
            visibility : 'hidden !important',
            height     : '100%', // follow parent's height
        },
        //#endregion children
    }}

    protected styles(): Styles<'main'|'font'|'img'> {
        return {
            ...super.styles(),

            font : this.fontStyle(),
            img  : this.imgStyle(),
        };
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
        size   :  basics.sizeNm,
        sizeSm : [['calc(', basics.sizeNm, '*', 0.75  , ')']],
        sizeMd : [['calc(', basics.sizeNm, '*', 1.50  , ')']],
        sizeLg : [['calc(', basics.sizeNm, '*', 2.00  , ')']],
    };
}, /*prefix: */'ico');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;


const config = {
    font: {
        // path           : '~@nodestrap/icon/dist/fonts/',
        path           : '/fonts/',
        files          : [
            'MaterialIcons-Regular.woff2',
            'MaterialIcons-Regular.woff',
            'MaterialIcons-Regular.ttf',
        ],

        styles: {
            fontFamily     : '"Material Icons"',
            fontWeight     : 400,
            fontStyle      : 'normal',
            textDecoration : 'none',
        } as JssStyle,

        items          : fontMaterial,
    },
    img: {
        // path           : '~@nodestrap/icon/dist/icons/',
        path           : '/icons/',
        files          : [
            'instagram.svg',
            'whatsapp.svg',
            'close.svg',
        ],
    },
};



// hooks: