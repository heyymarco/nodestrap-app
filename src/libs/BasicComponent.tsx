// react (builds html using javascript):
import {
    default as React,
}                           from 'react'         // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    PropEx,
    Cust,
    DictionaryOf,
    ClassEntry,
    ClassList,
    PropList,

    
    // components:
    ElementStyles,
    CssConfig,
    ElementProps,
    Element,

    
    // utils:
    pascalCase,
}                           from './nodestrap'   // nodestrap's core
import
    colors,
    * as color              from './colors'      // configurable colors & theming defs
import
    borders,
    * as border             from './borders'     // configurable borders & border radiuses defs
import spacers              from './spacers'     // configurable spaces defs
import typos                from './typos/index' // configurable typography (texting) defs



// styles:

export class BasicComponentStyles extends ElementStyles {
    //#region props
    //#region foreground
    /**
     * themed foreground color.
     */
    protected readonly _foregTh            = 'foregTh'

    /**
     * conditional foreground color.
     */
    protected readonly _foregIfIf          = 'foregIfIf'

    /**
     * conditional unthemed foreground color.
     */
    protected readonly _foregIf            = 'foregIf'

    /**
     * functional foreground color.
     */
    public    readonly _foregFn            = 'foregFn'
    //#endregion foreground

    //#region background
    /**
     * none background.
     */
    protected readonly _backgNone          = 'backgNone'

    /**
     * themed background.
     */
    protected readonly _backgTh            = 'backgTh'

    /**
     * conditional background.
     */
    protected readonly _backgIfIf          = 'backgIfIf'

    /**
     * conditional unthemed background.
     */
    protected readonly _backgIf            = 'backgIf'

    /**
     * functional backgrounds.
     */
    public    readonly _backgFn            = 'backgFn'

    /**
     * toggles background gradient.
     */
    public    readonly _backgGradTg        = 'backgGradTg'
    //#endregion background

    //#region border
    /**
     * themed border color.
     */
    protected readonly _borderTh           = 'borderTh'

    /**
     * conditional border color.
     */
    protected readonly _borderIfIf         = 'borderIfIf'

    /**
     * conditional unthemed border color.
     */
    protected readonly _borderIf           = 'borderIf'

    /**
     * functional border color.
     */
    public    readonly _borderFn           = 'borderFn'
    //#endregion border



    //#region outlined - foreground
    /**
     * themed foreground color - at outlined variant.
     */
    protected readonly _outlinedForegTh    = 'outlinedForegTh'

    /**
     * conditional foreground color - at outlined variant.
     */
    protected readonly _outlinedForegIfIf  = 'outlinedForegIfIf'

    /**
     * conditional unthemed foreground color - at outlined variant.
     */
    protected readonly _outlinedForegIf    = 'outlinedForegIf'

    /**
     * functional foreground color - at outlined variant.
     */
    public    readonly _outlinedForegFn    = 'outlinedForegFn'

    /**
     * toggles *on* foreground color - at outlined variant.
     */
    public    readonly _outlinedForegTg    = 'outlinedForegTg'
    //#endregion outlined - foreground

    //#region outlined - background
    /**
     * functional backgrounds - at outlined variant.
     */
    public    readonly _outlinedBackgFn    = 'outlinedBackgFn'

    /**
     * toggles *on* backgrounds - at outlined variant.
     */
    public    readonly _outlinedBackgTg    = 'outlinedBackgTg'
    //#endregion outlined - background



    //#region mild - foreground
    /**
     * themed foreground color - at mild variant.
     */
    protected readonly _mildForegTh        = 'mildForegTh'

    /**
     * conditional foreground color - at mild variant.
     */
    protected readonly _mildForegIfIf      = 'mildForegIfIf'

    /**
     * conditional unthemed foreground color - at mild variant.
     */
    protected readonly _mildForegIf        = 'mildForegIf'

    /**
     * functional foreground color - at mild variant.
     */
    public    readonly _mildForegFn        = 'mildForegFn'

    /**
     * toggles *on* foreground color - at mild variant.
     */
    public    readonly _mildForegTg        = 'mildForegTg'
    //#endregion mild - foreground

    //#region mild - background
    /**
     * themed background - at mild variant.
     */
    protected readonly _mildBackgTh        = 'mildBackgTh'

    /**
     * conditional background - at mild variant.
     */
    protected readonly _mildBackgIfIf      = 'mildBackgIfIf'

    /**
     * conditional unthemed background - at mild variant.
     */
    protected readonly _mildBackgIf        = 'mildBackgIf'

    /**
     * functional backgrounds - at mild variant.
     */
    public    readonly _mildBackgFn        = 'mildBackgFn'

    /**
     * toggles *on* backgrounds - at mild variant.
     */
    public    readonly _mildBackgTg        = 'mildBackgTg'
    //#endregion mild - background



    //#region boxShadow-focus
    /**
     * Supports for Control
     */



    /**
     * focused themed box-shadow color.
     */
    protected readonly _boxShadowFocusTh   = 'boxShadowFocusTh'

    /**
     * focused conditional box-shadow color.
     */
    protected readonly _boxShadowFocusIfIf = 'boxShadowFocusIfIf'

    /**
     * focused conditional unthemed box-shadow color.
     */
    protected readonly _boxShadowFocusIf   = 'boxShadowFocusIf'

    /**
     * focused functional box-shadow color.
     */
    public    readonly _boxShadowFocusFn   = 'boxShadowFocusFn'
    //#endregion boxShadow-focus



    //#region finals
    /**
     * final foreground color.
     */
    public    readonly _foreg              = 'foreg'

    /**
     * final background color.
     */
    public    readonly _backgCol           = 'backgCol'
    /**
     * final background color as solid background.
     */
    public    readonly _backgSol           = 'backgSol'
    /**
     * final backgrounds.
     */
    public    readonly _backg              = 'backg'

    /**
     * final border color.
     */
    public    readonly _borderCol          = 'borderCol'

    /**
     * final box-shadow.
     */
    public    readonly _boxShadow          = 'boxShadow'

    /**
     * final filter.
     */
    public    readonly _filter             = 'filter'

    /**
     * final animation.
     */
    public    readonly _anim               = 'anim'
    //#endregion finals



    //#region animations
    /**
     * none box shadow.
     */
    public readonly _boxShadowNone         = 'boxShadowNone'

    /**
     * none filter.
     */
    public readonly _filterNone            = 'filterNone'

    /**
     * none animation.
     */
    public readonly _animNone              = 'animNone'
    //#endregion animations
    //#endregion props
    
    
    
    // variants:
    public /*override*/ variants(): ClassList { return [
        ...super.variants(), // copy variants from base



        [ null, {
            // requires usePropsFn() for using [_outlinedForegFn, _outlinedBackgFn, _mildForegFn, _mildBackgFn] in the [outlined() & mild()]
            // the code below causing useVariants() implicitly includes usePropsFn()
            ...this.usePropsFn(),
        }],



        ...this.themes(),
        ...this.sizes(),

        [ ':not(.gradient)', this.noGradient(/*inherit =*/true) ],
        [      '.gradient' , this.gradient()                    ],

        [ ':not(.outlined)', this.noOutlined(/*inherit =*/true) ],
        [      '.outlined' , this.outlined()                    ],

        [ ':not(.mild)'    , this.noMild(/*inherit =*/false)    ],
        [      '.mild'     , this.mild()                        ],
    ]}

    /**
     * Gets the all available theme options.
     * @returns A `string[]` represents the all available theme options.
     */
    public /*virtual*/ themeOptions(): string[] {
        return Object.keys(color.themes);
    }
    /**
     * Creates color definitions *for each* `themeOptions()`.
     * @returns A `ClassList` represents the color definitions *for each* `themeOptions()`.
     */
    public /*virtual*/ themes(): ClassList {
        return this.themeOptions().map((theme) => {
            const Theme     = pascalCase(theme);
            const themeProp = `th${Theme}`;

            return [
                themeProp,
                this.theme(theme)
            ] as ClassEntry;
        });
    }
    /**
     * Creates a color definition for the specified `theme`.
     * @param theme The current theme name written in camel case.
     * @returns A `JssStyle` represents the color definition for the current `theme`.
     */
    public /*virtual*/ theme(theme: string): JssStyle { return {
        [this.decl(this._foregTh)]          : (colors as DictionaryOf<typeof colors>)[`${theme}Text`],   // light on dark backg | dark on light backg
        [this.decl(this._backgTh)]          : (colors as DictionaryOf<typeof colors>)[theme],
        [this.decl(this._borderTh)]         : (colors as DictionaryOf<typeof colors>)[`${theme}Cont`],   // 20% background + 80% page's foreground
        [this.decl(this._outlinedForegTh)]  : this.ref(this._backgTh),
        [this.decl(this._mildForegTh)]      : this.ref(this._borderTh),
        [this.decl(this._mildBackgTh)]      : (colors as DictionaryOf<typeof colors>)[`${theme}Thin`],   // thin opacity with slightly color from background
        [this.decl(this._boxShadowFocusTh)] : (colors as DictionaryOf<typeof colors>)[`${theme}Transp`],
    }}

    /**
     * Gets the all available size options.
     * @returns A `string[]` represents the all available size options.
     */
    public /*virtual*/ sizeOptions(): string[] {
        return ['sm', 'lg'];
    }
    /**
     * Creates sizing definitions *for each* `sizeOptions()`.
     * @returns A `ClassList` represents the sizing definitions *for each* `sizeOptions()`.
     */
    public /*virtual*/ sizes(): ClassList {
        return this.sizeOptions().map((size) => {
            const Size     = pascalCase(size);
            const sizeProp = `sz${Size}`;

            return [
                sizeProp,
                this.size(size)
            ] as ClassEntry;
        });
    }
    /**
     * Creates a sizing definition for the specified `size`.
     * @param size The current size name written in camel case.
     * @returns A `JssStyle` represents the sizing definition for the current `size`.
     */
    public /*virtual*/ size(size: string): JssStyle { return {
        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}

    /**
     * Creates a no gradient definition when the gradient variant is disabled.
     * @returns A `JssStyle` represents the no gradient definition.
     */
    public /*virtual*/ noGradient(inherit = false): JssStyle { return {
        // *toggle off* the background gradient prop:
        [this.decl(this._backgGradTg)]     : inherit ? 'unset' : 'initial',
    }}
    /**
     * Creates a gradient definition when the gradient variant is enabled.
     * @returns A `JssStyle` represents the gradient definition.
     */
    public /*virtual*/ gradient(): JssStyle { return {
        // *toggle on* the background gradient prop:
        [this.decl(this._backgGradTg)]     : cssProps.backgGrad,
    }}

    /**
     * Creates a no outlined definition when the outlined variant is disabled.
     * @returns A `JssStyle` represents the no outlined definition.
     */
    public /*virtual*/ noOutlined(inherit = false): JssStyle { return {
        // *toggle off* the outlined props:
        [this.decl(this._outlinedForegTg)] : inherit ? 'unset' : 'initial',
        [this.decl(this._outlinedBackgTg)] : inherit ? 'unset' : 'initial',
    }}
    /**
     * Creates an outlined definition when the outlined variant is enabled.
     * @returns A `JssStyle` represents the outlined definition.
     */
    public /*virtual*/ outlined(): JssStyle { return {
        // *toggle on* the outlined props:
        [this.decl(this._outlinedForegTg)] : this.ref(this._outlinedForegFn),
        [this.decl(this._outlinedBackgTg)] : this.ref(this._outlinedBackgFn),
    }}

    /**
     * Creates a no mild definition when the mild variant is disabled.
     * @returns A `JssStyle` represents the no mild definition.
     */
    public /*virtual*/ noMild(inherit = false): JssStyle { return {
        // *toggle off* the mild props:
        [this.decl(this._mildForegTg)] : inherit ? 'unset' : 'initial',
        [this.decl(this._mildBackgTg)] : inherit ? 'unset' : 'initial',
    }}
    /**
     * Creates a mild definition when the mild variant is enabled.
     * @returns A `JssStyle` represents the mild definition.
     */
    public /*virtual*/ mild(): JssStyle { return {
        // *toggle on* the mild props:
        [this.decl(this._mildForegTg)] : this.ref(this._mildForegFn),
        [this.decl(this._mildBackgTg)] : this.ref(this._mildBackgFn),
    }}


    // states:
    public /*override*/ states(inherit: boolean): ClassList { return [
        ...super.states(inherit), // copy states from base



        [ null, {
            // reset filters/anims/toggles to initial/inherit state:
            ...this.resetDefaultState(inherit),
        }],
    ]}

    public /*virtual*/ resetDefaultState(inherit = false): PropList {
        return this.iif(!inherit,
            this.themeDefault() // reset theme to default
        );
    }

    public /*virtual*/ themeDefault(theme: string|null = null): PropList {
        if (theme) return this.themeIf(theme);
        
        
        
        return {
            [this.decl(this._foregIf)]          : cssProps.foreg,
            [this.decl(this._backgIf)]          : 'transparent',
            [this.decl(this._borderIf)]         : cssProps.borderColor,
            [this.decl(this._outlinedForegIf)]  : this.ref(this._foregIf),
            [this.decl(this._mildForegIf)]      : this.ref(this._foregIf),
            [this.decl(this._mildBackgIf)]      : this.ref(this._backgIf),
            [this.decl(this._boxShadowFocusIf)] : colors.secondaryTransp,
        };
    }
    /**
     * Creates a conditional color definition for the specified `theme`.
     * @param theme The theme name written in camel case.
     * @returns A `PropList` represents the conditional color definition for the specified `theme`.
     */
    public /*final*/ themeIf(theme: string): PropList { return {
        [this.decl(this._foregIf)]          : (colors as DictionaryOf<typeof colors>)[`${theme}Text`],   // light on dark backg | dark on light backg
        [this.decl(this._backgIf)]          : (colors as DictionaryOf<typeof colors>)[theme],
        [this.decl(this._borderIf)]         : (colors as DictionaryOf<typeof colors>)[`${theme}Cont`],   // 20% background + 80% page's foreground
        [this.decl(this._outlinedForegIf)]  : this.ref(this._backgIf),
        [this.decl(this._mildForegIf)]      : this.ref(this._borderIf),
        [this.decl(this._mildBackgIf)]      : (colors as DictionaryOf<typeof colors>)[`${theme}Thin`],   // thin opacity with slightly color from background
        [this.decl(this._boxShadowFocusIf)] : (colors as DictionaryOf<typeof colors>)[`${theme}Transp`],
    }}
    /**
     * Creates an important conditional color definition for the specified `theme`.
     * @param theme The theme name written in camel case.
     * @returns A `PropList` represents the important conditional color definition for the specified `theme`.
     */
    public /*final*/ themeIfIf(theme: string): PropList { return {
        [this.decl(this._foregIfIf)]          : (colors as DictionaryOf<typeof colors>)[`${theme}Text`],   // light on dark backg | dark on light backg
        [this.decl(this._backgIfIf)]          : (colors as DictionaryOf<typeof colors>)[theme],
        [this.decl(this._borderIfIf)]         : (colors as DictionaryOf<typeof colors>)[`${theme}Cont`],   // 20% background + 80% page's foreground
        [this.decl(this._outlinedForegIfIf)]  : this.ref(this._backgIfIf),
        [this.decl(this._mildForegIfIf)]      : this.ref(this._borderIfIf),
        [this.decl(this._mildBackgIfIf)]      : (colors as DictionaryOf<typeof colors>)[`${theme}Thin`],   // thin opacity with slightly color from background
        [this.decl(this._boxShadowFocusIfIf)] : (colors as DictionaryOf<typeof colors>)[`${theme}Transp`],
    }}



    // functions:
    public /*override*/ propsFn(): PropList { return {
        //#region nones
        // define a *none* background:
        [this.decl(this._backgNone)]     : this.solidBackg('transparent'),

        // define a *none* box shadow:
        [this.decl(this._boxShadowNone)] : [[0, 0, 'transparent']],

        // define a *none* filter:
        [this.decl(this._filterNone)]    : 'brightness(100%)',

        // define a *none* animation:
        [this.decl(this._animNone)]      : 'none',
        //#endregion nones



        // define a *foreground* color func:
        [this.decl(this._foregFn)] : this.ref(
            this._foregIfIf, // first  priority
            this._foregTh,   // second priority
            this._foregIf,   // third  priority
        ),
    
        // define a *backgrounds* func:
        [this.decl(this._backgFn)] : this.ref(
            this._backgIfIf, // first  priority
            this._backgTh,   // second priority
            this._backgIf,   // third  priority
        ),

        // define a *border* color func:
        [this.decl(this._borderFn)] : this.ref(
            this._borderIfIf, // first  priority
            this._borderTh,   // second priority
            this._borderIf,   // third  priority
        ),
    
        
        
        // define a *foreground* color func - at *outlined* state:
        [this.decl(this._outlinedForegFn)] : this.ref(
            this._outlinedForegIfIf, // first  priority
            this._outlinedForegTh,   // second priority
            this._outlinedForegIf,   // third  priority
        ),
    
        // define a *backgrounds* func - at *outlined* state:
        [this.decl(this._outlinedBackgFn)] : 'transparent',


        
        // define a mild *foreground* color func:
        [this.decl(this._mildForegFn)] : this.ref(
            this._mildForegIfIf, // first  priority
            this._mildForegTh,   // second priority
            this._mildForegIf,   // third  priority
        ),

        // define a mild *backgrounds* func:
        [this.decl(this._mildBackgFn)] : this.ref(
            this._mildBackgIfIf, // first  priority
            this._mildBackgTh,   // second priority
            this._mildBackgIf,   // third  priority
        ),

        

        // define a *focused box-shadow color* func:
        [this.decl(this._boxShadowFocusFn)]: [[
            cssProps.boxShadowFocus,      // box-shadow pos, width, spread, etc

            // box-shadow color:
            this.ref(
                this._boxShadowFocusIfIf, // first  priority
                this._boxShadowFocusTh,   // second priority
                this._boxShadowFocusIf    // third  priority
            )
        ]],



        //#region finals
        // define a final *foreground* color func:
        [this.decl(this._foreg)]     : this.ref(
            this._outlinedForegTg, // toggle outlined
            this._mildForegTg,     // toggle mild
            this._foregFn,
        ),

        // define a final *background* color func:
        [this.decl(this._backgCol)]  : this.ref(
            this._outlinedBackgTg, // toggle outlined
            this._mildBackgTg,     // toggle mild
            this._backgFn,
        ),
        [this.decl(this._backgSol)]  : this.solidBackg(this.ref(this._backgCol)),
        // define a final *backgrounds* func:
        [this.decl(this._backg)] : [
            // top layer:
            this.ref(
                this._backgGradTg,
                this._backgNone,
            ),

            // middle layer:
            this.ref(this._backgSol),

            // bottom layer:
            cssProps.backg,
        ],

        // define a final *border* color func:
        [this.decl(this._borderCol)] : this.ref(
            this._outlinedForegTg, // toggle outlined
            this._borderFn
        ),

        // define a final *box-shadow* func:
        [this.decl(this._boxShadow)] : this.boxShadowFn(), // single array (including from the returning function) => makes the JSS treat as comma separated values

        // define a final *filter* func:
        [this.decl(this._filter)]    : [this.filterFn()],  // double array (including from the returning function) => makes the JSS treat as space separated values

        // define a final *animation* func:
        [this.decl(this._anim)]      : this.animFn(),      // single array (including from the returning function) => makes the JSS treat as comma separated values
        //#endregion finals
    }}

    /**
     * Creates a composite boxShadow definition in which the boxShadows *depends on* the variants and/or the states.
     * @returns A `Cust.Ref[]` represents the composite boxShadow definition.
     */
    public /*virtual*/ boxShadowFn(): Cust.Ref[] { return [
        cssProps.boxShadow,
    ]}

    /**
     * Creates a composite filter definition in which the filters *depends on* the variants and/or the states.
     * @returns A `Cust.Ref[]` represents the composite filter definition.
     */
    public /*virtual*/ filterFn(): Cust.Ref[] { return [
        cssProps.filter,
    ]}

    /**
     * Creates a composite animation definition in which the animations *depends on* the variants and/or the states.
     * @returns A `Cust.Ref[]` represents the composite animation definition.
     */
    public /*virtual*/ animFn(): Cust.Ref[] { return [
        cssProps.anim,
    ]}



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    
    
    
        // apply final props:
        foreg       : this.ref(this._foreg),
        backg       : this.ref(this._backg),
        borderColor : this.ref(this._borderCol),
        boxShadow   : this.ref(this._boxShadow),
        filter      : this.ref(this._filter),
        anim        : this.ref(this._anim),
    }}



    // old:
    // TODO: remove...
    /**
     * Creates a composite animation definition in which the animations *depends on* the variants and/or the states.
     * @returns A `JssStyle` represents the composite animation definition.
     */
    public /*virtual*/ animFnOld(): JssStyle { return {
    }}
    protected /*virtual*/ applyStateNoAnimStartupOld(): JssStyle { return {
        animationDuration: [['0ms'], '!important'],
    }}
    public    readonly _animFnOld             = 'animFn'
}
export const basicComponentStyles = new BasicComponentStyles();



// configs:

const cssConfig = new CssConfig(() => {
    const keyframesNone : PropEx.Keyframes = { };

    
    
    return {
        //#region typos
        fontSize          : typos.fontSizeNm,
        fontSizeSm        : [['calc((', typos.fontSizeSm, '+', typos.fontSizeNm, ')/2)']],
        fontSizeLg        : typos.fontSizeMd,
        fontFamily        : 'inherit',
        fontWeight        : 'inherit',
        fontStyle         : 'inherit',
        textDecoration    : 'inherit',
        lineHeight        : 'inherit',
        //#endregion typos

        
        
        //#region foreg, backg, borders
        foreg             : 'currentColor',
        
        backg             : 'transparent',
        backgGrad         : [['linear-gradient(180deg, rgba(255,255,255, 0.2), rgba(0,0,0, 0.2))', 'border-box']],
        
        border            : borders.default,
        borderColor       : borders.color,
        borderRadius      : border.radiuses.md,
        borderRadiusSm    : border.radiuses.sm,
        borderRadiusLg    : border.radiuses.lg,
        //#endregion foreg, backg, borders

        
        
        //#region spacings
        paddingInline     : [['calc((', spacers.sm, '+', spacers.md, ')/2)']],
        paddingBlock      : [['calc((', spacers.xs, '+', spacers.sm, ')/2)']],
        paddingInlineSm   : spacers.sm,
        paddingBlockSm    : spacers.xs,
        paddingInlineLg   : spacers.md,
        paddingBlockLg    : spacers.sm,
        //#endregion spacings

        
        
        // appearances:
        opacity           : 1,


        
        //#region animations
        transition        : [
            ['color'      , '300ms', 'ease-out'],
            ['background' , '300ms', 'ease-out'],
            ['border'     , '300ms', 'ease-out'],
            ['inline-size', '300ms', 'ease-out'],
            ['block-size' , '300ms', 'ease-out'],
            ['font-size'  , '300ms', 'ease-out'],
            ['opacity'    , '300ms', 'ease-out'],
        ],

        // TODO: remove none...
        boxShadowNone     : [[0, 0, 'transparent']],
        boxShadow         : [[0, 0, 'transparent']],
        boxShadowFocus    : [[0, 0, 0, '0.25rem' ]], // supports for Control children's theming

        // TODO: remove none...
        filterNone        : 'brightness(100%)',
        filter            : 'brightness(100%)',

        '@keyframes none' : keyframesNone,
        // TODO: remove none...
        animNone          : [[keyframesNone]],
        anim              : [[keyframesNone]],
        //#endregion animations
    };
}, /*prefix: */'com');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



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
    gradient?: boolean
}
export function useVariantGradient(props: VariantGradient) {
    return {
        class: props.gradient ? 'gradient' : null,
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

export interface VariantMild {
    mild?: boolean
}
export function useVariantMild(props: VariantMild) {
    return {
        class: props.mild ? 'mild' : null,
    };
}

export type OrientationStyle = 'block'|'inline'
export interface VariantOrientation {
    orientation?: OrientationStyle
}
export function useVariantOrientation(props: VariantOrientation) {
    return {
        class: props.orientation ? props.orientation : null,
    };
}



// react components:

export interface BasicComponentProps<TElement extends HTMLElement = HTMLElement>
    extends
        ElementProps<TElement>,
        
        VariantTheme,
        VariantSize,
        VariantGradient,
        VariantOutlined,
        VariantMild
{
}
export default function BasicComponent<TElement extends HTMLElement = HTMLElement>(props: BasicComponentProps<TElement>) {
    // styles:
    const styles       = basicComponentStyles.useStyles();

    
    
    // variants:
    const variTheme    = useVariantTheme(props);
    const variSize     = useVariantSize(props);
    const variGradient = useVariantGradient(props);
    const variOutlined = useVariantOutlined(props);
    const variMild     = useVariantMild(props);



    // jsx:
    return (
        <Element<TElement>
            // other props:
            {...props}


            // classes:
            mainClass={props.mainClass ?? styles.main}
            variantClasses={[...(props.variantClasses ?? []),
                variTheme.class,
                variSize.class,
                variGradient.class,
                variOutlined.class,
                variMild.class,
            ]}
        />
    );
}
export { BasicComponent }
