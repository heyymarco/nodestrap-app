// react (builds html using javascript):
import {
    default as React,
    useMemo,
}                           from 'react'         // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    CssConfig,

    JssStyle,

    PropEx,
    Cust,

    DictionaryOf,

    ClassEntry,
    ClassList,

    StylesBuilder,

    pascalCase,
}                           from './nodestrap'
import
    colors,
    * as color              from './colors'      // configurable colors & theming defs
import
    borders,
    * as border             from './borders'     // configurable borders & border radiuses defs
import spacers              from './spacers'     // configurable spaces defs
import typos                from './typos/index' // configurable typography (texting) defs



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
        //#region typos
        fontSize          : typos.fontSizeNm,
        fontSizeSm        : [['calc((', typos.fontSizeSm, '+', typos.fontSizeNm, ')/2)']],
        fontSizeLg        : typos.fontSizeMd,
        fontFamily        : inherit,
        fontWeight        : inherit,
        fontStyle         : inherit,
        textDecoration    : inherit,
        lineHeight        : inherit,
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

        opacity           : 1,


        // anim props:

        transition        : [
            ['color'      , '300ms', 'ease-out'],
            ['background' , '300ms', 'ease-out'],
            ['border'     , '300ms', 'ease-out'],
            ['inline-size', '300ms', 'ease-out'],
            ['block-size' , '300ms', 'ease-out'],
            ['font-size'  , '300ms', 'ease-out'],
            ['opacity'    , '300ms', 'ease-out'],
        ],

        boxShadowNone     : [[0, 0, 'transparent']],
        boxShadow         : [[0, 0, 'transparent']],
        boxShadowFocus    : [[0, 0, 0, '0.25rem' ]], // supports for Control children's theming
        
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

export class ElementStylesBuilder extends StylesBuilder {
    //#region scoped css props
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
     * layered backgrounds.
     */
    public    readonly _backgLy            = 'backgLy'

    /**
     * toggles background gradient.
     */
    protected readonly _backgGradTg        = 'backgGradTg'
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



    //#region outlined - foreground
    /**
     * themed foreground color - at outlined state.
     */
    protected readonly _outlinedForegTh    = 'outlinedForegTh'

    /**
     * conditional foreground color - at outlined state.
     */
    protected readonly _outlinedForegIfIf  = 'outlinedForegIfIf'

    /**
     * conditional unthemed foreground color - at outlined state.
     */
    protected readonly _outlinedForegIf    = 'outlinedForegIf'

    /**
     * functional foreground color - at outlined state.
     */
    public    readonly _outlinedForegFn    = 'outlinedForegFn'

    /**
     * toggles *on* foreground color - at outlined state.
     */
    protected readonly _outlinedForegTg    = 'outlinedForegTg'
    //#endregion outlined - foreground



    //#region outlined - background
    /**
     * functional backgrounds - at outlined state.
     */
    public    readonly _outlinedBackgFn    = 'outlinedBackgFn'

    /**
     * toggles *on* backgrounds - at outlined state.
     */
    protected readonly _outlinedBackgTg    = 'outlinedBackgTg'
    //#endregion outlined - background



    /**
     * functional animations.
     */
    public    readonly _animFn             = 'animFn'
    //#endregion scoped css props



    //#region mixins
    protected /*virtual*/ applyStateNoAnimStartup(): JssStyle { return {
        animationDuration: [['0ms'], '!important'],
    }}
    //#endregion mixins



    // variants:
    public /*override*/ variants(): ClassList { return [
        ...super.variants(), // copy variants from base



        //#region all initial states are none
        // *toggle off* the background gradient prop:
        // but still be able to *toggle on* by parent (inherit)
        [ null, this.toggleOffGradient(/*inherit =*/true) ],



        // *toggle off* the outlined props:
        // but still be able to *toggle on* by parent (inherit)
        [ null, this.toggleOffOutlined(/*inherit =*/true) ],
        //#endregion all initial states are none



        ...this.themes(),
        ...this.sizes(),
        [ 'gradient', this.gradient() ],
        [ 'outlined', this.outlined() ],
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
                this.theme(
                    theme, // camel  case
                    Theme, // pascal case
                )
            ] as ClassEntry;
        });
    }
    /**
     * Creates a color definition for the specified `theme`.
     * @param theme The current theme name written in camel case.
     * @param Theme The current theme name written in pascal case.
     * @returns A `JssStyle` represents the color definition for the current `theme`.
     */
    public /*virtual*/ theme(theme: string, Theme: string): JssStyle { return {
        [this.decl(this._foregTh)]          : (colors as DictionaryOf<typeof colors>)[`${theme}Text`], // light on dark backg | dark on light backg
        [this.decl(this._backgTh)]          : this.solidBackg((colors as DictionaryOf<typeof colors>)[theme]),
        [this.decl(this._borderTh)]         : (colors as DictionaryOf<typeof colors>)[`${theme}Cont`], // 20% background + 80% page's foreground
        [this.decl(this._boxShadowFocusTh)] : (colors as DictionaryOf<typeof colors>)[`${theme}Transp`],
        [this.decl(this._outlinedForegTh)]  : (colors as DictionaryOf<typeof colors>)[theme],
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
                this.size(
                    size, // camel  case
                    Size, // pascal case
                )
            ] as ClassEntry;
        });
    }
    /**
     * Creates a sizing definition for the specified `size`.
     * @param size The current size name written in camel case.
     * @param Size The current size name written in pascal case.
     * @returns A `JssStyle` represents the sizing definition for the current `size`.
     */
    public /*virtual*/ size(size: string, Size: string): JssStyle { return {
        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, Size)),
    }}

    /**
     * Creates a gradient definition for if the gradient feature is enabled.
     * @returns A `JssStyle` represents the gradient definition.
     */
    public /*virtual*/ gradient(): JssStyle {
        // *toggle on* the background gradient prop:
        return this.toggleOnGradient();
    }
    public /*virtual*/ toggleOnGradient(): JssStyle { return {
        // *toggle on* the background gradient prop:
        [this.decl(this._backgGradTg)]     : cssProps.backgGrad,
    }}
    public /*virtual*/ toggleOffGradient(inherit = false): JssStyle { return {
        // *toggle off* the background gradient prop:
        [this.decl(this._backgGradTg)]     : inherit ? 'unset' : 'initial',
    }}

    /**
     * Creates an outlined definition for if the outlined feature is enabled.
     * @returns A `JssStyle` represents the outlined definition.
     */
    public /*virtual*/ outlined(): JssStyle {
        // *toggle on* the outlined props:
        return this.toggleOnOutlined();
    }
    public /*virtual*/ toggleOnOutlined(): JssStyle { return {
        // *toggle on* the outlined props:
        [this.decl(this._outlinedForegTg)] : this.ref(this._outlinedForegFn),
        [this.decl(this._outlinedBackgTg)] : this.ref(this._outlinedBackgFn),
    }}
    public /*virtual*/ toggleOffOutlined(inherit = false): JssStyle { return {
        // *toggle off* the outlined props:
        [this.decl(this._outlinedForegTg)] : inherit ? 'unset' : 'initial',
        [this.decl(this._outlinedBackgTg)] : inherit ? 'unset' : 'initial',
    }}


    // states:
    public /*override*/ watchStates(inherit = false): JssStyle { return {
        extend: [
            this.iif(!inherit,
                this.themeDefault() // reset theme to default
            ),



            super.watchStates(inherit), // copy state rules from base
        ] as JssStyle,
    }}
    public /*virtual*/ themeDefault(theme: string|null = null): JssStyle {
        if (theme) return this.themeIf(theme);
        
        return {
            [this.decl(this._foregIf)]          : cssProps.foreg,
            [this.decl(this._backgIf)]          : this.ref(this._backgNone),
            [this.decl(this._borderIf)]         : cssProps.borderColor,
            [this.decl(this._boxShadowFocusIf)] : colors.secondaryTransp,
            [this.decl(this._outlinedForegIf)]  : cssProps.foreg,
        };
    }
    /**
     * Creates a conditional color definition for the specified `theme`.
     * @param theme The theme name written in camel case.
     * @returns A `JssStyle` represents the conditional color definition for the specified `theme`.
     */
    public /*final*/ themeIf(theme: string): JssStyle { return {
        [this.decl(this._foregIf)]          : (colors as DictionaryOf<typeof colors>)[`${theme}Text`], // light on dark backg | dark on light backg
        [this.decl(this._backgIf)]          : this.solidBackg((colors as DictionaryOf<typeof colors>)[theme]),
        [this.decl(this._borderIf)]         : (colors as DictionaryOf<typeof colors>)[`${theme}Cont`], // 20% background + 80% page's foreground
        [this.decl(this._boxShadowFocusIf)] : (colors as DictionaryOf<typeof colors>)[`${theme}Transp`],
        [this.decl(this._outlinedForegIf)]  : (colors as DictionaryOf<typeof colors>)[theme],
    }}
    /**
     * Creates an important conditional color definition for the specified `theme`.
     * @param theme The theme name written in camel case.
     * @returns A `JssStyle` represents the important conditional color definition for the specified `theme`.
     */
    public /*final*/ themeIfIf(theme: string): JssStyle { return {
        [this.decl(this._foregIfIf)]          : (colors as DictionaryOf<typeof colors>)[`${theme}Text`], // light on dark backg | dark on light backg
        [this.decl(this._backgIfIf)]          : this.solidBackg((colors as DictionaryOf<typeof colors>)[theme]),
        [this.decl(this._borderIfIf)]         : (colors as DictionaryOf<typeof colors>)[`${theme}Cont`], // 20% background + 80% page's foreground
        [this.decl(this._boxShadowFocusIfIf)] : (colors as DictionaryOf<typeof colors>)[`${theme}Transp`],
        [this.decl(this._outlinedForegIfIf)]  : (colors as DictionaryOf<typeof colors>)[theme],
    }}



    // functions:
    public /*override*/ propsFn(): JssStyle { return {
        // define a *none* background:
        [this.decl(this._backgNone)] : this.solidBackg('transparent'),



        // define a *foreground* color func:
        [this.decl(this._foregFn)] : this.ref(
            this._outlinedForegTg, // toggle outlined

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
            this._outlinedBackgTg, // toggle outlined

            this._backgLy,
        ),

        // define a *border* color func:
        [this.decl(this._borderFn)] : this.ref(
            this._outlinedForegTg, // toggle outlined
            
            this._borderIfIf, // first  priority
            this._borderTh,   // second priority
            this._borderIf,   // third  priority
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
    
    
    
        // define a *foreground* color func - at *outlined* state:
        [this.decl(this._outlinedForegFn)] : this.ref(
            this._outlinedForegIfIf, // first  priority
            this._outlinedForegTh,   // second priority
            this._outlinedForegIf,   // third  priority
        ),
    
        // define a *backgrounds* func - at *outlined* state:
        [this.decl(this._outlinedBackgFn)] : this.ref(
            this._backgGradTg,
            this._backgNone,
        ),
    
    
    
        // TODO: remove
        ...this.animFnOld(),
    }}

    /**
     * Creates a composite animation definition in which the animations *depends on* the variants and/or the states.
     * @returns A `JssStyle` represents the composite animation definition.
     */
    public /*virtual*/ animFnOld(): JssStyle { return {
        // define an *animations* func:
        [this.decl(this._animFn)] : cssProps.anim,
    }}
    /**
     * Creates a composite animation definition in which the animations *depends on* the variants and/or the states.
     * @returns A `Cust.Ref[]` represents the composite animation definition.
     */
    public /*virtual*/ animFn(): Cust.Ref[] { return [
        cssProps.anim,
    ]}

    /**
     * Creates a composite filter definition in which the filters *depends on* the variants and/or the states.
     * @returns A `Cust.Ref[]` represents the composite filter definition.
     */
    public /*virtual*/ filterFn(): Cust.Ref[] { return [
        cssProps.filter,
    ]}

    /**
     * Creates a composite boxShadow definition in which the boxShadows *depends on* the variants and/or the states.
     * @returns A `Cust.Ref[]` represents the composite boxShadow definition.
     */
    public /*virtual*/ boxShadowFn(): Cust.Ref[] { return [
        cssProps.boxShadow,
    ]}



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    
    
    
        // apply fn props:
        foreg       : this.ref(this._foregFn),
        backg       : this.ref(this._backgFn),
        borderColor : this.ref(this._borderFn),
        
        // apply special fn props:
        anim        : this.animFn(),                      // single array (including from the returning function) => makes the JSS treat as comma separated values
        filter      : [this.filterFn()],                  // double array (including from the returning function) => makes the JSS treat as space separated values
        boxShadow   : [[this.boxShadowFn()]] as JssStyle, // triple array (including from the returning function) => bug fix in JSS => makes the JSS treat as comma separated values
    }}
}
export const styles = new ElementStylesBuilder();



// utils:

export function isTypeOf<TProps>(element: React.ReactNode, funcComponent: React.JSXElementConstructor<TProps>): element is React.ReactElement<TProps, React.JSXElementConstructor<TProps>> {
    return (
        React.isValidElement<TProps>(element)
        &&
        (
            (element.type === funcComponent)
            ||
            (
                (typeof element.type === 'function')
                &&
                (
                    (element.type.prototype instanceof funcComponent)
                    ||
                    (element.type.prototype === funcComponent.prototype)
                )
            )
        )
    );
}



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
        React.DOMAttributes<TElement>,
        React.AriaAttributes
{
    // essentials:
    tag?            : keyof JSX.IntrinsicElements
    style?          : React.CSSProperties
    elmRef?         : React.Ref<TElement>


    // accessibility:
    role?           : React.AriaRole


    // classes:
    mainClass?      :  string|null|undefined
    classes?        : (string|null|undefined)[]
    variantClasses? : (string|null|undefined)[]
    stateClasses?   : (string|null|undefined)[]
}
export function GenericElement<TElement extends HTMLElement = HTMLElement>(props: GenericProps<TElement>) {
    // html props:
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



    // fn props:
    const Tag = (props.tag ?? 'div');

    
    
    // jsx:
    return (
        <Tag
            // other props:
            {...htmlProps}


            // accessibility:
            role={props.role}


            // classes:
            className={[
                // main:
                props.mainClass,


                // additionals:
                ...(props.classes ?? []),


                // variants:
                ...(props.variantClasses ?? []),


                // states:
                ...(props.stateClasses ?? []),
            ].filter((c) => !!c).join(' ') || undefined}
        >
            { props.children }
        </Tag>
    );
};



export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        GenericProps<TElement>,
        
        VariantTheme,
        VariantSize,
        VariantGradient,
        VariantOutlined
{
}
export default function Element<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    // styles:
    const elmStyles    = styles.useStyles();

    
    
    // variants:
    const variTheme    = useVariantTheme(props);
    const variSize     = useVariantSize(props);
    const variGradient = useVariantGradient(props);
    const variOutlined = useVariantOutlined(props);



    // jsx:
    return (
        <GenericElement<TElement>
            // other props:
            {...props}


            // classes:
            mainClass={props.mainClass ?? elmStyles.main}
            variantClasses={[...(props.variantClasses ?? []),
                variTheme.class,
                variSize.class,
                variGradient.class,
                variOutlined.class,
            ]}
        />
    );
};
