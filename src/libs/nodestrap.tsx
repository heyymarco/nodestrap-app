// react (builds html using javascript):
import {
    default as React,
    useContext,
    useMemo,
}                           from 'react'         // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
    Styles,
    Classes,
}                           from 'jss'           // ts defs support for jss
import {
    jss as jssDefault,
    createUseStyles,
    JssContext,
}                           from 'react-jss'     // base technology of our nodestrap components
import
    jssPluginNormalizeShorthands
                            from './jss-plugin-normalize-shorthands'
import {
    Prop,
    PropEx,
    Cust,
}                           from './Css'         // ts defs support for jss
import CssConfig            from './CssConfig'   // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.
import type {
    Dictionary,
    DictionaryOf,
}                           from './CssConfig'   // ts defs support for jss
import { pascalCase }       from 'pascal-case'   // pascal-case support for jss
import { camelCase }        from 'camel-case'    // camel-case  support for jss



// configs:

export { CssConfig }



// styles:

export type { JssStyle, Styles, Classes }
export type { Prop, PropEx, Cust }
export type { Dictionary, DictionaryOf }
export type ClassEntry = [string|null, JssStyle]
export type ClassList  = ClassEntry[]

/**
 * A css builder for styling Nodestrap's components.
 * Supports many variants like theming, sizes, gradient, outlined, orientation, and more.
 * Supports many states like disabled, active, pressed, and more.
 */
export class ComponentStyles {
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

            // prefixes:
            /**
             * For sub-component-variant
             * Eg:
             * fooSomething
             * booSomething
             * logoBackgColor
             * logoOpacity
             */
            if ((/^(icon|img|items|item|logo|toggler|menu|menus|label|control|btn|navBtn|prevBtn|nextBtn|nav|switch|link|bullet|ghost|overlay|caption|header|footer|body)[A-Z]/).test(name)) continue; // exclude

            // suffixes:
            /**
             * For size-variant
             * Eg:
             * somethingSm
             * something0em
             */
            if ((/(Xs|Sm|Nm|Md|Lg|Xl|Xxl|Xxxl|[0-9]+em|None)$/).test(name)) continue; // exclude

            // suffixes:
            /**
             * For state-variant
             * Eg:
             * animValid
             * animInvalidInline
             */
             if ((/(Enable|Disable|Active|Passive|Check|Clear|Hover|Leave|Focus|Blur|Valid|Unvalid|Invalid|Uninvalid|Full|Compact)(Block|Inline)?$/).test(name)) continue; // exclude

            // special props:
            /**
             * Eg:
             * foo
             * boo
             * size
             * orientation
             * valid   => (icon)Valid   => valid
             * invalid => (icon)Invalid => invalid
             */
            if ((/backgGrad|orientation|align|horzAlign|vertAlign|spacing|img|size|valid|invalid/).test(name)) continue; // exclude

            // @keyframes:
            if ((/@/).test(name)) continue; // exclude
            

            
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
            if (name.length <= prefix.length) continue; // at least 1 char left;

            // if match => remove the prefix => normalize the case => then include it:
            cssPropsCopy[camelCase(name.substr(prefix.length))] = prop;
        }
        return cssPropsCopy as JssStyle;
    }

    /**
     * Includes the prop names in the specified `cssProps` ending with specified `suffix`.
     * @param cssProps The collection of the prop name to be filtered.  
     * @param suffix The suffix name of the prop names to be *included*.  
     * @returns A `JssStyle` which is the copy of the `cssProps` that only having matching suffix names.  
     * The retuning prop names has been normalized (renamed), so it doesn't ending with `suffix`.
     */
    protected filterSuffixProps<TCssProps>(cssProps: TCssProps, suffix: string): JssStyle {
        suffix = pascalCase(suffix);
        const cssPropsCopy: Dictionary<any> = {};
        for (const [name, prop] of Object.entries(cssProps)) {
            // excludes the entry if the name not ending with specified suffix:
            if (!name.endsWith(suffix)) continue; // exclude
            if (name.length <= suffix.length) continue; // at least 1 char left;

            // if match => remove the suffix => then include it:
            cssPropsCopy[name.substr(0, name.length - suffix.length)] = prop;
        }
        return cssPropsCopy as JssStyle;
    }

    /**
     * Backups the value of the specified `cssProps`.
     * @param cssProps The props to be backed up.  
     * @param backupSuff The suffix name of the backup props.
     * @returns A `JssStyle` which is the copy of the `cssProps` that the prop names renamed with the specified `backupSuff`.
     */
    protected backupProps<TCssProps>(cssProps: TCssProps, backupSuff: string = 'Bak'): JssStyle {
        const cssPropsCopy: Dictionary<any> = {};
        for (const [name] of Object.entries(cssProps)) {
            cssPropsCopy[`${name}${backupSuff}`] = `var(${name})`;
        }
        return cssPropsCopy as JssStyle;
    }

    /**
     * Restores the value of the specified `cssProps`.
     * @param cssProps The props to be restored.  
     * @param backupSuff The suffix name of the backup props.
     * @returns A `JssStyle` which is the copy of the `cssProps` that the prop values pointed to the backed up values.
     */
    protected restoreProps<TCssProps>(cssProps: TCssProps, backupSuff: string = 'Bak'): JssStyle {
        const cssPropsCopy: Dictionary<any> = {};
        for (const [name] of Object.entries(cssProps)) {
            cssPropsCopy[name] = `var(${name}${backupSuff})`;
        }
        return cssPropsCopy as JssStyle;
    }

    /**
     * Overwrites prop declarations from the specified `cssProps` into the specified `cssDecls`.  
     * @param cssDecls The collection of the prop name to be overwritten. 
     * @param cssProps The collection of the prop name to overwrite.  
     * @returns A `JssStyle` which is the copy of the `cssProps` that overwrites the specified `cssDecls`.
     */
    protected overwriteProps<TCssDecls extends { [key in keyof TCssProps]: string }, TCssProps>(cssDecls: TCssDecls, cssProps: TCssProps): JssStyle {
        const cssPropsCopy: Dictionary<any> = {};
        for (const [name, prop] of Object.entries(cssProps)) {
            const varDecl = (cssDecls as unknown as DictionaryOf<typeof cssDecls>)[name];
            if (!varDecl) continue;
            cssPropsCopy[varDecl] = prop;
        }
        return cssPropsCopy as JssStyle;
    }

    /**
     * Overwrites prop declarations from the specified `cssProps` into the specified `cssDeclss`.  
     * @param cssDeclss The list of the parent's collection prop name to be overwritten.  
     * The order must be from the most specific parent to the least specific one.  
     * @param cssProps The collection of the prop name to overwrite.  
     * @returns A `JssStyle` which is the copy of the `cssProps` that overwrites the specified `cssDeclss`.
     */
    protected overwriteParentProps<TCssProps>(cssProps: TCssProps, ...cssDeclss: { [key in keyof unknown]: string }[]): JssStyle {
        const cssPropsCopy: Dictionary<any> = {};
        for (const [name, prop] of Object.entries(cssProps)) {
            const varDecl = ((): string => {
                for (const cssDecls of cssDeclss) {
                    if (name in cssDecls) return (cssDecls as DictionaryOf<typeof cssDecls>)[name]; // found => replace the cssDecl
                } // for

                return name; // not found => use the original decl name
            })();
            if (!varDecl) continue;
            cssPropsCopy[varDecl] = prop;
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
        this._useStylesCache = null;    // clear the cache
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



    // variants:
    /**
     * Watches & applies any variant related classes.
     * @returns A `JssStyle` represents the implementation of the variants.
     */
    public /*virtual*/ watchVariants(): JssStyle { return {
        extend: [
            // this.iif(!inherit,
            //     // variants always inherit
            // ),

            
            
            // variant rules:
            ...this.variants().map(([variant, style]) => ({ [variant ? (variant.includes('&') ? variant : `&.${variant}`) : '&'] : style })),
        ] as JssStyle,
    }}
    /**
     * Creates css rule definitions for all variants by overriding some *scoped css props*.
     * @returns A `ClassList` represents the css rule definitions for all variants.
     */
    public /*virtual*/ variants(): ClassList { return [] }



    // states:
    /**
     * Watches & applies any state related classes.
     * @param inherit `true` to inherit states from parent element -or- `false` to create independent states.
     * @returns A `JssStyle` represents the implementation of the states.
     */
    public /*virtual*/ watchStates(inherit = false): JssStyle { return {
        extend: [
            this.iif(!inherit,
                this.themesIf()   // conditional themes
            ),
            this.states(inherit), // state rules
            
            // TODO: state rules (experimental)
            // state rules:
            ...this.stateX().map(([state, style]) => ({ [state ? (state.includes('&') ? state : `&.${state}`) : '&'] : style })),
        ] as JssStyle,
    }}

    /**
     * Creates css rule definitions for every *specific* state by overriding some *scoped css props* and applied some `themesIf`.
     * @param inherit `true` to inherit states from parent element -or- `false` to create independent states.
     * @returns A `JssStyle` represents the css rule definitions for every *specific* state.
     */
    public /*virtual*/ states(inherit = false): JssStyle   { return {} }

    /**
     * Creates css rule definitions for all states by overriding some *scoped css props* and applied some `themesIf`.
     * @returns A `ClassList` represents the css rule definitions for all states.
     */
    public /*virtual*/ stateX(): ClassList { return [] }

    /**
     * Creates conditional color definitions for every *specific* condition (state).
     * @returns A `JssStyle` represents the conditional color definitions for every *specific* condition (state).
     */
    public /*virtual*/ themesIf(): JssStyle { return {} }



    // functions:
    /**
     * Creates a functional prop definitions in which the values *depends on* the variants and/or the states using *fallback* strategy.
     * @returns A `JssStyle` represents the functional prop definitions.
     */
    public /*virtual*/ propsFn(): JssStyle { return {} }



    // styles:
    /**
     * Creates a basic style of a component *without* any variants nor states applied.
     * @returns A `JssStyle` represents a basic style definition.
     */
    public /*virtual*/ basicStyle(): JssStyle { return {} }

    /**
     * Creates one/more composite styles, with the themes & states applied.
     * @returns A `Styles` represents the composite style definitions.
     */
    protected /*virtual*/ styles(): Styles<'main'> {
        return {
            main: {
                extend: [
                    // watch variant classes:
                    this.watchVariants(),
        
                    // watch state classes/pseudo-classes:
                    this.watchStates(),
                    
                    // after watching => use func props:
                    this.propsFn(),

                    // all the required stuff has been loaded,
                    // now load the basicStyle:
                    this.basicStyle(),
                ] as JssStyle,
            },
        };
    }

    protected _useStylesCache : ((() => Classes<'main'>)|null) = null;

    /**
     * Returns a jss stylesheet for styling dom.
     * @returns A jss stylesheet instance.
     */
    public /*virtual*/ useStyles(): Classes<'main'> {
        // hack: wrap with function twice and then unwrap twice:
        // so we can use *react hook* here:
        return (() => // wrap-1
            () => { // wrap-2
                const jssContext = useContext(JssContext);

                if (!this._useStylesCache) {
                    // console.log('creating style...');

                    const jss = jssContext.jss ?? jssDefault;
                    jss.use(
                        jssPluginNormalizeShorthands()
                    );

                    this._useStylesCache = createUseStyles(this.styles());
                }
                // else {
                //     console.log('use cached style');
                // }
                return this._useStylesCache();
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
export const componentStyles = new ComponentStyles();



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

export interface ComponentProps<TElement extends HTMLElement = HTMLElement>
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
export default function Component<TElement extends HTMLElement = HTMLElement>(props: ComponentProps<TElement>) {
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
export { Component }



// utils:

export { pascalCase, camelCase }

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