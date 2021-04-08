// react (builds html using javascript):
import
    React, {
    useContext,
    useMemo,
}                          from 'react'         // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
    Styles,
    Classes,
}                          from 'jss'           // ts defs support for jss
import {
    jss as jssDefault,
    createUseStyles,
    JssContext,
}                          from 'react-jss'     // base technology of our nodestrap components
import
    jssPluginNormalizeShorthands
                           from './jss-plugin-normalize-shorthands'
import {
    Prop,
    PropEx,
    Cust,
}                          from './Css'         // ts defs support for jss
import CssConfig           from './CssConfig'   // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.
import type {
    Dictionary,
    DictionaryOf,
}                          from './CssConfig'   // ts defs support for jss
import { pascalCase }      from 'pascal-case'   // pascal-case support for jss
import { camelCase }       from 'camel-case'    // camel-case  support for jss

// nodestrap (modular web components):
import
    colors,
    * as color             from './colors'      // configurable colors & theming defs
import
    borders,
    * as border            from './borders'     // configurable borders & border radiuses defs
import spacers             from './spacers'     // configurable spaces defs
import typos               from './typos/index' // configurable typography (texting) defs



// configs:

const cssConfig = new CssConfig(() => {
    // common css values:
    // const initial = 'initial';
    // const unset   = 'unset';
    // const none    = 'none';
    const inherit = 'inherit';
    // const center  = 'center';
    // const middle  = 'middle';


    const keyframesNone   : PropEx.Keyframes = { };

    return {
        fontSize          : typos.fontSizeNm,
        fontSizeSm        : [['calc((', typos.fontSizeSm, '+', typos.fontSizeNm, ')/2)']],
        fontSizeLg        : typos.fontSizeMd,
        fontFamily        : inherit,
        fontWeight        : inherit,
        fontStyle         : inherit,
        textDecoration    : inherit,
        lineHeight        : inherit,

        color             : 'currentColor',
        backg             : 'transparent',
        backgGrad         : [['linear-gradient(180deg, rgba(255,255,255, 0.2), rgba(0,0,0, 0.2))', 'border-box']],

        opacity           : 1,

        paddingInline     : [['calc((', spacers.sm, '+', spacers.md, ')/2)']],
        paddingBlock      : [['calc((', spacers.xs, '+', spacers.sm, ')/2)']],
        paddingInlineSm   : spacers.sm,
        paddingBlockSm    : spacers.xs,
        paddingInlineLg   : spacers.md,
        paddingBlockLg    : spacers.sm,
        border            : borders.default,
        borderColor       : borders.color,
        borderRadius      : border.radiuses.md,
        borderRadiusSm    : border.radiuses.sm,
        borderRadiusLg    : border.radiuses.lg,


        // anim props:

        transition        : [
            ['background' , '300ms', 'ease-out'],
            ['color'      , '300ms', 'ease-out'],
            ['border'     , '300ms', 'ease-out'],
            ['font-size'  , '300ms', 'ease-out'],
            ['width'      , '300ms', 'ease-out'],
            ['height'     , '300ms', 'ease-out'],
        ],

        boxShadowNone     : [[0, 0, 'transparent']],
        boxShadow         : [[0, 0, 'transparent']],

        filterNone        : 'brightness(100%)',
        filter            : 'brightness(100%)',

        '@keyframes none' : keyframesNone,
        animNone          : [[keyframesNone]],
        anim              : [[keyframesNone]],
    };
}, /*prefix: */'elm');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// styles:

/**
 * A css builder for styling our components.
 * Supports theming, styling, resizeable.
 * Supports many states.
 */
export class StylesBuilder {
    //#region global css props
    /**
     * Includes the *general* prop names in the specified `cssProps`.  
     * @param cssProps The collection of the prop name to be filtered.  
     * @returns A `JssStyle` which is the copy of the `cssProps` that only having *general* prop names.
     */
    protected filterGeneralProps<TCssProps>(cssProps: TCssProps): JssStyle {
        const cssPropsCopy: Dictionary<any> = {};
        for (const [name, prop] of Object.entries(cssProps)) {
            // excludes the entry if the name matching with following:
            if ((/^(icon)|(Xs|Sm|Nm|Md|Lg|Xl|Xxl|Xxxl|None|Enable|Disable|Active|Passive|Check|Clear|Hover|Leave|Focus|Blur|Valid|Unvalid|Invalid|Uninvalid)$|^(@)|color|backg|backgGrad|anim|orientation|align/).test(name)) continue; // exclude
            
            // if not match => include it:
            cssPropsCopy[name] = prop;
        }
        return cssPropsCopy as JssStyle;
    }

    /**
     * Includes the prop names in the specified `cssProps` starting with specified `prefix`.
     * @param cssProps The collection of the prop name to be filtered.  
     * @param prefix The prefix name of the prop names to be *included*.  
     * @returns A `JssStyle` which is the copy of the `cssProps` that only having matching prefix names.  
     * The retuning prop names has been normalized (renamed), so it doesn't starting with `prefix`.
     */
    protected filterPrefixProps<TCssProps>(cssProps: TCssProps, prefix: string): JssStyle {
        const cssPropsCopy: Dictionary<any> = {};
        for (const [name, prop] of Object.entries(cssProps)) {
            // excludes the entry if the name not starting with specified prefix:
            if (!name.startsWith(prefix)) continue; // exclude

            // if match => remove the prefix => normalize the case => then include it:
            cssPropsCopy[camelCase(name.substr(prefix.length))] = prop;
        }
        return cssPropsCopy as JssStyle;
    }
    //#endregion global css props


    
    //#region scoped css props
    /**
     * Holds the prefix name of the generated css props.  
     * Useful to avoid name collision if working with another css frameworks.
     */
    private _prefix   : string = 'ns';
    /**
     * Gets the prefix name of the generated css props.  
     */
    public  get prefix() { return this._prefix }
    /**
     * Sets the prefix name of the generated css props.  
     * Useful to avoid name collision if working with another css frameworks.
     */
    public  set prefix(newValue: string) {
        if (this._prefix === newValue) return; // already the same => no change required
        this._prefix        = newValue; // update the new prefix
        this._useStyleCache = null;     // clear the cache
    }

    /**
     * Gets the declaration name of the specified `propName`.
     * @param propName The name of prop to retrieve.
     * @returns A generated prop name for declaring the prop.
     */
    public decl(name: string) {
        const prefix = this._prefix;
        if (prefix) return `--${prefix}-${name}`;
        return `--${name}`;
    }

    /**
     * Gets the *value* (reference) of the specified `propName`.
     * @param propName The name of prop to retrieve.
     * @param fallbacks The name of secondary/next prop to retrieve if the `propName` was not found.
     * @returns A generated css expression for retrieving the value.
     */
    public ref(propName: string, ...fallbacks: string[]) {
        const prefix = this._prefix ? `--${this._prefix}-` : '--';



        const fallbackRecursive = (...fallbacks: string[]): string => {
            const [curentFallback, ...restFallbacks] = fallbacks;

            if (!curentFallback) return ''; // no more fallback => return empty

            // handle the curentFallback and recursively handle the restFallbacks:
            return `,var(${prefix}${curentFallback}${fallbackRecursive(...restFallbacks)})`;
        };



        return `var(${prefix}${propName}${fallbackRecursive(...fallbacks)})`;
    }
    //#endregion scoped css props



    //#region mixins
    protected iif(condition: boolean, content: JssStyle): JssStyle {
        return condition ? content : {};
    }
    //#endregion mixins



    // themes:
    /**
     * Gets the all available theme options.
     * @returns A `[string, Cust.Ref][]` represents the all available theme options.
     */
    protected themeOptions(): [string, Cust.Ref][] {
        return Object.entries(color.themes);
    }
    /**
     * Creates color definitions *for each* theme `options`.
     * @param themes The previous theme definitions to *extend*.
     * @param options The list of the theme options.
     * @returns A `JssStyle` represents the color definitions *for each* theme `options`.
     */
    protected themes(themes: Dictionary<JssStyle> = {}, options = this.themeOptions()): JssStyle {
        for (const [theme, themeColor] of options) {
            const Theme     = pascalCase(theme);
            const themeProp = `&.th${Theme}`;
            themes[themeProp] = {
                ...themes[themeProp],
                extend: ((): JssStyle[] => {
                    const newEntry = this.themeOf(
                        theme,     // camel  case
                        Theme,     // pascal case
                        themeProp, // prop name
                        themeColor // current theme color
                    );

                    const extend = (themes[themeProp] as any)?.extend as (undefined|JssStyle|JssStyle[]);
                    if (Array.isArray(extend)) {
                        extend.push(newEntry);
                        return extend;
                    }
                    else {
                        return [
                            ...(extend ? [extend] : []),
                            newEntry
                        ];
                    }
                })() as JssStyle,
            };
        }
        return themes;
    }
    /**
     * Creates a color definition for the specified `theme`.
     * @param theme The current theme name written in camel case.
     * @param Theme The current theme name written in pascal case.
     * @param themeProp The prop name of the current `theme`.
     * @param themeColor The backg color of the current `theme`.
     * @returns A `JssStyle` represents the color definition for the current `theme`.
     */
    public themeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle { return {}; }

    /**
     * Gets the all available size options.
     * @returns A `string[]` represents the all available size options.
     */
    protected sizeOptions(): string[] {
        return ['sm', 'lg'];
    }
    /**
     * Creates sizing definitions *for each* size `options`.
     * @param sizes The previous size definitions to *extend*.
     * @param options The list of the size options.
     * @returns A `JssStyle` represents the sizing definitions *for each* size `options`.
     */
    protected sizes(sizes: Dictionary<JssStyle> = {}, options = this.sizeOptions()): JssStyle {
        for (const size of options) {
            const Size     = pascalCase(size);
            const sizeProp = `&.sz${Size}`;
            sizes[sizeProp] = {
                ...sizes[sizeProp],
                extend: ((): JssStyle[] => {
                    const newEntry = this.sizeOf(
                        size,    // camel  case
                        Size,    // pascal case
                        sizeProp // prop name
                    );

                    const extend = (sizes[sizeProp] as any)?.extend as (undefined|JssStyle|JssStyle[]);
                    if (Array.isArray(extend)) {
                        extend.push(newEntry);
                        return extend;
                    }
                    else {
                        return [
                            ...(extend ? [extend] : []),
                            newEntry
                        ];
                    }
                })() as JssStyle,
            };
        }
        return sizes;
    }
    /**
     * Creates a sizing definition for the specified `size`.
     * @param size The current size name written in camel case.
     * @param Size The current size name written in pascal case.
     * @param sizeProp The prop name of the current `size`.
     * @returns A `JssStyle` represents the sizing definition for the current `size`.
     */
    public sizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {}; }

    /**
     * Creates a gradient definition for if the gradient feature is enabled.
     * @returns A `JssStyle` represents the gradient definition.
     */
    public gradient(): JssStyle { return {}; }

    /**
     * Creates an outlined definition for if the outlined feature is enabled.
     * @returns A `JssStyle` represents the outlined definition.
     */
    public outlined(): JssStyle  { return {}; }

    /**
     * Watches & applies any theme related classes.
     * @returns A `JssStyle` represents the implementation of the themes.
     */
    public watchThemes(): JssStyle { return {
        extend: [
            this.themes(),                      // variant themes
            this.sizes(),                       // variant sizes
            { '&.gradient' : this.gradient() }, // variant gradient
            { '&.outlined' : this.outlined() }, // variant outlined
        ] as JssStyle,
    }}



    // states:
    /**
     * Creates functional prop definitions in which the values *depends on* another *scoped css props* and/or *global css props* using *fallback* strategy.
     * @returns A `JssStyle` represents the functional prop definitions.
     */
    protected fnProps(): JssStyle  { return {}; }

    /**
     * Creates conditional color definitions for every *specific* condition (state).
     * @returns A `JssStyle` represents the conditional color definitions for every *specific* condition (state).
     */
    protected themesIf(): JssStyle { return {}; }

    /**
     * Creates css rule definitions for every *specific* state by overriding some *scoped css props* and applied some `themesIf`.
     * @param inherit `true` to inherit states from parent element -or- `false` to create independent states.
     * @returns A `JssStyle` represents the css rule definitions for every *specific* state.
     */
    protected states(inherit = false): JssStyle   { return {}; }

    /**
     * Watches & applies any state related classes.
     * @param inherit `true` to inherit states from parent element -or- `false` to create independent states.
     * @returns A `JssStyle` represents the implementation of the states.
     */
    public watchStates(inherit = false): JssStyle { return {
        extend: [
            this.iif(!inherit,
                this.themesIf()   // conditional themes
            ),
            this.fnProps(),       // functional  props
            this.states(inherit), // state rules
        ] as JssStyle,
    }}



    // styles:
    /**
     * Creates a basic style of a component *without* any themes nor states applied.
     * @returns A `JssStyle` represents the basic style definition.
     */
    public basicStyle(): JssStyle { return {}; }

    /**
     * Creates one/more composite styles, with the themes & states applied.
     * @returns A `Styles` represents the composite style definitions.
     */
    protected styles(): Styles<'main'> {
        return {
            main: {
                extend: [
                    this.basicStyle(), // basic style
        
                    // themes:
                    this.watchThemes(),
        
                    // states:
                    this.watchStates(),
                ] as JssStyle,
            },
        };
    }

    protected _useStyleCache : ((() => Classes<'main'>)|null) = null;

    /**
     * Returns a jss stylesheet for styling dom.
     * @returns A jss stylesheet instance.
     */
    public useStyles() {
        // hack: wrap with function twice and then unwrap twice:
        // so we can use *react hook* here:
        return (() => // wrap-1
            () => { // wrap-2
                const jssContext = useContext(JssContext);

                if (!this._useStyleCache) {
                    // console.log('creating style...');

                    const jss = jssContext.jss ?? jssDefault;
                    jss.use(
                        jssPluginNormalizeShorthands()
                    );

                    this._useStyleCache = createUseStyles(this.styles());
                }
                // else {
                //     console.log('use cached style');
                // }
                return this._useStyleCache();
            }
        )()(); // unwrap-1 & unwrap-2
    }



    // utilities:
    /**
     * Escapes some sets of character in svg data, so it will be valid to be written in css.
     * @param svgData The raw svg data to be escaped.
     * @returns An escaped svg data.
     */
    public escapeSvg(svgData: string) {
        const escapedChars: Dictionary<string> = {
            '<': '%3c',
            '>': '%3e',
            '#': '%23',
            '(': '%28',
            ')': '%29',
        };

        const svgDataCopy = Array.from(svgData);
        for (const index in svgDataCopy) {
            const char = svgDataCopy[index];
            if (char in escapedChars) svgDataCopy[index] = escapedChars[char];
        }
    
        return svgDataCopy.join('');
    }

    /**
     * Creates a single layer solid background based on specified `color`.
     * @param color The color of the solid background to create.
     * @returns An object represents a solid background in css.
     */
    public solidBackg(color: Cust.Ref, clip : Prop.BackgroundClip = 'border-box') {
        return [[`linear-gradient(${color},${color})`, clip]];
    }
}

export class ElementStylesBuilder extends StylesBuilder {
    //#region scoped css props
    //#region foreground
    /**
     * themed foreground color.
     */
    protected readonly _foregTh           = 'foregTh'

    /**
     * conditional foreground color.
     */
    protected readonly _foregIfIf         = 'foregIfIf'

    /**
     * conditional unthemed foreground color.
     */
    protected readonly _foregIf           = 'foregIf'

    /**
     * functional foreground color.
     */
    public    readonly _foregFn           = 'foregFn'
    //#endregion foreground

    

    //#region background
    /**
     * none background.
     */
    protected readonly _backgNone         = 'backgNone'

    /**
     * themed background.
     */
    protected readonly _backgTh           = 'backgTh'

    /**
     * conditional background.
     */
    protected readonly _backgIfIf         = 'backgIfIf'

    /**
     * conditional unthemed background.
     */
    protected readonly _backgIf           = 'backgIf'

    /**
     * functional backgrounds.
     */
    public    readonly _backgFn           = 'backgFn'

    /**
     * layered backgrounds.
     */
    public    readonly _backgLy           = 'backgLy'

    /**
     * toggles background gradient.
     */
    protected readonly _backgGradTg       = 'backgGradTg'
    //#endregion background



    //#region border
    /**
     * themed border color.
     */
    protected readonly _borderTh          = 'borderTh'

    /**
     * conditional border color.
     */
    protected readonly _borderIfIf        = 'borderIfIf'

    /**
     * conditional unthemed border color.
     */
    protected readonly _borderIf          = 'borderIf'

    /**
     * functional border color.
     */
    public    readonly _borderFn          = 'borderFn'
    //#endregion border



    //#region foreground - outlined
    /**
     * themed foreground color - at outlined state.
     */
    protected readonly _foregOutlinedTh   = 'foregOutlinedTh'

    /**
     * conditional foreground color - at outlined state.
     */
    protected readonly _foregOutlinedIfIf = 'foregOutlinedIfIf'

    /**
     * conditional unthemed foreground color - at outlined state.
     */
    protected readonly _foregOutlinedIf   = 'foregOutlinedIf'

    /**
     * functional foreground color - at outlined state.
     */
    public    readonly _foregOutlinedFn   = 'foregOutlinedFn'

    /**
     * toggles *on* foreground color - at outlined state.
     */
    protected readonly _foregOutlinedTg   = 'foregOutlinedTg'
    //#endregion foreground - outlined



    //#region background - outlined
    /**
     * functional backgrounds - at outlined state.
     */
    public    readonly _backgOutlinedFn   = 'backgOutlinedFn'

    /**
     * toggles *on* backgrounds - at outlined state.
     */
    protected readonly _backgOutlinedTg   = 'backgOutlinedTg'
    //#endregion background - outlined



    /**
     * functional animations.
     */
    public    readonly _animFn            = 'animFn'
    //#endregion scoped css props



    // themes:
    public themeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle { return {
        // customize the *themed* props:
    
        [this.decl(this._foregTh)]         : (colors as DictionaryOf<typeof colors>)[`${theme}Text`], // light on dark backg | dark on light backg
        [this.decl(this._backgTh)]         : this.solidBackg(themeColor),
        [this.decl(this._borderTh)]        : (colors as DictionaryOf<typeof colors>)[`${theme}Cont`], // 20% background + 80% page's foreground
        [this.decl(this._foregOutlinedTh)] : themeColor,
    }}
    public sizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {
        // overwrite the global props with the *prop{Size}*:

        [cssDecls.fontSize]      : (cssProps as DictionaryOf<typeof cssProps>)[`fontSize${Size}`],
        [cssDecls.paddingInline] : (cssProps as DictionaryOf<typeof cssProps>)[`paddingInline${Size}`],
        [cssDecls.paddingBlock]  : (cssProps as DictionaryOf<typeof cssProps>)[`paddingBlock${Size}`],
        [cssDecls.borderRadius]  : (cssProps as DictionaryOf<typeof cssProps>)[`borderRadius${Size}`],
    }}
    public gradient(): JssStyle { return {
        // *toggle on* the background gradient prop:
        [this.decl(this._backgGradTg)]     : cssProps.backgGrad,
    }}
    public outlined(): JssStyle { return {
        // *toggle on* the outlined props:
        [this.decl(this._foregOutlinedTg)] : this.ref(this._foregOutlinedFn),
        [this.decl(this._backgOutlinedTg)] : this.ref(this._backgOutlinedFn),
    }}



    // states:
    protected fnProps(): JssStyle { return {
        // define a *foreground* color func:
        [this.decl(this._foregFn)] : this.ref(
            this._foregOutlinedTg, // toggle outlined

            this._foregIfIf, // first  priority
            this._foregTh,   // second priority
            this._foregIf,   // third  priority
        ),
    
        // define a *backgrounds* layers:
        [this.decl(this._backgLy)] : [
            // top layer:
            this.ref(
                this._backgGradTg,
                this._backgNone,
            ),

            // middle layer:
            this.ref(
                this._backgIfIf, // first  priority
                this._backgTh,   // second priority
                this._backgIf,   // third  priority
            ),

            // bottom layer:
            cssProps.backg,
        ],
        // define a *backgrounds* func:
        [this.decl(this._backgFn)] : this.ref(
            this._backgOutlinedTg, // toggle outlined

            this._backgLy,
        ),

        // define a *border* color func:
        [this.decl(this._borderFn)] : this.ref(
            this._foregOutlinedTg, // toggle outlined
            
            this._borderIfIf, // first  priority
            this._borderTh,   // second priority
            this._borderIf,   // third  priority
        ),
    
    
    
        // define a *foreground* color func - at *outlined* state:
        [this.decl(this._foregOutlinedFn)] : this.ref(
            this._foregOutlinedIfIf, // first  priority
            this._foregOutlinedTh,   // second priority
            this._foregOutlinedIf,   // third  priority
        ),
    
        // define a *backgrounds* func - at *outlined* state:
        [this.decl(this._backgOutlinedFn)] : this.ref(
            this._backgGradTg,
            this._backgNone,
        ),
    
    
    
        // define an *animations* func:
        [this.decl(this._animFn)] : [
            cssProps.anim,
        ],
    }}
    protected themesIf(): JssStyle { return {
        // define a *default* color theme:
        [this.decl(this._foregIf)]         : cssProps.color,
        [this.decl(this._backgIf)]         : this.ref(this._backgNone),
        [this.decl(this._borderIf)]        : cssProps.borderColor,
        [this.decl(this._foregOutlinedIf)] : cssProps.color,
    }}
    protected states(inherit = false): JssStyle { return {
        extend: [
            this.iif(!inherit, {
                //#region all initial states are none
                // define a *none* background:
                [this.decl(this._backgNone)]       : this.solidBackg('transparent'),



                // *toggle off* the background gradient prop:
                [this.decl(this._backgGradTg)]     : 'initial',



                // *toggle off* the outlined props:
                [this.decl(this._foregOutlinedTg)] : 'initial',
                [this.decl(this._backgOutlinedTg)] : 'initial',
                //#endregion all initial states are none
            }),
        ] as JssStyle,
    }}



    // styles:
    public basicStyle(): JssStyle { return {
        extend: [
            this.filterGeneralProps(cssProps), // apply *general* cssProps
        ] as JssStyle,
    
    
    
        // apply *non conditional* fn props:
        color       : this.ref(this._foregFn),
        backg       : this.ref(this._backgFn),
        borderColor : this.ref(this._borderFn),
        anim        : this.ref(this._animFn),
    }}
}
export const styles = new ElementStylesBuilder();



// hooks:

export interface VariantTheme {
    theme?: string
}
export function useVariantTheme(props: VariantTheme, themeDefault?: () => (string|undefined)) {
    const theme = props.theme ?? themeDefault?.();
    return {
        class: theme ? `th${pascalCase(theme)}` : null,
    };
}

export interface VariantSize {
    size?: 'sm' | 'lg' | string
}
export function useVariantSize(props: VariantSize) {
    return {
        class: props.size ? `sz${pascalCase(props.size)}` : null,
    };
}

export interface VariantGradient {
    enableGradient?: boolean
}
export function useVariantGradient(props: VariantGradient) {
    return {
        class: props.enableGradient ? 'gradient' : null,
    };
}

export interface VariantOutlined {
    outlined?: boolean
}
export function useVariantOutlined(props: VariantOutlined) {
    return {
        class: props.outlined ? 'outlined' : null,
    };
}



// react components:

const htmlPropList = [
    // All HTML Attributes
    'accept',
    'acceptCharset',
    'action',
    'allowFullScreen',
    'allowTransparency',
    'alt',
    'as',
    'async',
    'autoComplete',
    'autoFocus',
    'autoPlay',
    'capture',
    'cellPadding',
    'cellSpacing',
    'charSet',
    'challenge',
    'checked',
    'cite',
    'classID',
    'cols',
    'colSpan',
    'content',
    'controls',
    'coords',
    'crossOrigin',
    'data',
    'dateTime',
    'default',
    'defer',
    'disabled',
    'download',
    'encType',
    'form',
    'formAction',
    'formEncType',
    'formMethod',
    'formNoValidate',
    'formTarget',
    'frameBorder',
    'headers',
    'height',
    'high',
    'href',
    'hrefLang',
    'htmlFor',
    'httpEquiv',
    'integrity',
    'keyParams',
    'keyType',
    'kind',
    'label',
    'list',
    'loop',
    'low',
    'manifest',
    'marginHeight',
    'marginWidth',
    'max',
    'maxLength',
    'media',
    'mediaGroup',
    'method',
    'min',
    'minLength',
    'multiple',
    'muted',
    'name',
    'nonce',
    'noValidate',
    'open',
    'optimum',
    'pattern',
    'placeholder',
    'playsInline',
    'poster',
    'preload',
    'readOnly',
    'rel',
    'required',
    'reversed',
    'rows',
    'rowSpan',
    'sandbox',
    'scope',
    'scoped',
    'scrolling',
    'seamless',
    'selected',
    'shape',
    'size',
    'sizes',
    'span',
    'src',
    'srcDoc',
    'srcLang',
    'srcSet',
    'start',
    'step',
    'summary',
    'target',
    'type',
    'useMap',
    'value',
    'width',
    'wmode',
    'wrap',

    // Standard HTML Attributes:
    'accessKey',
    // 'className',
    'contentEditable',
    'contextMenu',
    'dir',
    'draggable',
    'hidden',
    'id',
    'lang',
    'slot',
    'spellCheck',
    'style',
    'title',
    'translate',
    
    // accessibility:
    'tabIndex',

    // values:
    'defaultValue',
];
const isHtmlProp = (propName: string) => propName.startsWith('on') || propName.startsWith('aria-') || htmlPropList.includes(propName)

export interface GenericProps<TElement extends HTMLElement = HTMLElement>
    extends
        React.DOMAttributes<TElement>
{
    // essentials:
    tag?     : keyof JSX.IntrinsicElements
    classes? : (string|null)[]
    style?   : React.CSSProperties
    elmRef?  : React.Ref<TElement>
}
export function GenericElement(props: GenericProps) {
    const htmlProps = useMemo(() => {
        const htmlProps = {
            ref : props.elmRef as any,
        };

        for (const name in props) {
            if (isHtmlProp(name)) {
                (htmlProps as any)[name] = (props as any)[name];
            } // if
        } // for
        return htmlProps;
    }, [props]);



    const Tag = (props.tag ?? 'div');

    return (
        <Tag
            // other props:
            {...htmlProps}


            // classes:
            className={(props.classes ?? []).filter((c) => !!c).join(' ') || undefined}
        >
            { props.children }
        </Tag>
    );
};



export interface Props
    extends
        GenericProps,
        
        VariantTheme,
        VariantSize,
        VariantGradient,
        VariantOutlined
{
}
export default function Element(props: Props) {
    const elmStyles    = styles.useStyles();

    // themes:
    const variTheme    = useVariantTheme(props);
    const variSize     = useVariantSize(props);
    const variGradient = useVariantGradient(props);
    const variOutlined = useVariantOutlined(props);



    return (
        <GenericElement
            // other props:
            {...props}


            // classes:
            classes={[
                // main:
                (props.classes ? null : elmStyles.main),


                // additionals:
                ...(props.classes ?? []),


                // themes:
                variTheme.class,
                variSize.class,
                variGradient.class,
                variOutlined.class,
            ]}
        />
    );
};
