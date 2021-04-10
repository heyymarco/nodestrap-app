"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.GenericElement = exports.useVariantOutlined = exports.useVariantGradient = exports.useVariantSize = exports.useVariantTheme = exports.styles = exports.ElementStylesBuilder = exports.StylesBuilder = exports.cssDecls = exports.cssProps = void 0;
// react (builds html using javascript):
var react_1 = require("react"); // base technology of our nodestrap components
var react_jss_1 = require("react-jss"); // base technology of our nodestrap components
var jss_plugin_normalize_shorthands_1 = require("./jss-plugin-normalize-shorthands");
var CssConfig_1 = require("./CssConfig"); // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.
var pascal_case_1 = require("pascal-case"); // pascal-case support for jss
var camel_case_1 = require("camel-case"); // camel-case  support for jss
// nodestrap (modular web components):
var colors_1 = require("./colors"), color = colors_1; // configurable colors & theming defs
var borders_1 = require("./borders"), border = borders_1; // configurable borders & border radiuses defs
var spacers_1 = require("./spacers"); // configurable spaces defs
var index_1 = require("./typos/index"); // configurable typography (texting) defs
// configs:
var cssConfig = new CssConfig_1["default"](function () {
    // common css values:
    // const initial = 'initial';
    // const unset   = 'unset';
    // const none    = 'none';
    var inherit = 'inherit';
    // const center  = 'center';
    // const middle  = 'middle';
    var keyframesNone = {};
    return {
        fontSize: index_1["default"].fontSizeNm,
        fontSizeSm: [['calc((', index_1["default"].fontSizeSm, '+', index_1["default"].fontSizeNm, ')/2)']],
        fontSizeLg: index_1["default"].fontSizeMd,
        fontFamily: inherit,
        fontWeight: inherit,
        fontStyle: inherit,
        textDecoration: inherit,
        lineHeight: inherit,
        foreg: 'currentColor',
        backg: 'transparent',
        backgGrad: [['linear-gradient(180deg, rgba(255,255,255, 0.2), rgba(0,0,0, 0.2))', 'border-box']],
        opacity: 1,
        paddingInline: [['calc((', spacers_1["default"].sm, '+', spacers_1["default"].md, ')/2)']],
        paddingBlock: [['calc((', spacers_1["default"].xs, '+', spacers_1["default"].sm, ')/2)']],
        paddingInlineSm: spacers_1["default"].sm,
        paddingBlockSm: spacers_1["default"].xs,
        paddingInlineLg: spacers_1["default"].md,
        paddingBlockLg: spacers_1["default"].sm,
        border: borders_1["default"]["default"],
        borderColor: borders_1["default"].color,
        borderRadius: border.radiuses.md,
        borderRadiusSm: border.radiuses.sm,
        borderRadiusLg: border.radiuses.lg,
        // anim props:
        transition: [
            ['background', '300ms', 'ease-out'],
            ['color', '300ms', 'ease-out'],
            ['border', '300ms', 'ease-out'],
            ['font-size', '300ms', 'ease-out'],
            ['width', '300ms', 'ease-out'],
            ['height', '300ms', 'ease-out'],
        ],
        boxShadowNone: [[0, 0, 'transparent']],
        boxShadow: [[0, 0, 'transparent']],
        filterNone: 'brightness(100%)',
        filter: 'brightness(100%)',
        '@keyframes none': keyframesNone,
        animNone: [[keyframesNone]],
        anim: [[keyframesNone]]
    };
}, /*prefix: */ 'elm');
exports.cssProps = cssConfig.refs;
exports.cssDecls = cssConfig.decls;
// styles:
/**
 * A css builder for styling our components.
 * Supports theming, styling, resizeable.
 * Supports many states.
 */
var StylesBuilder = /** @class */ (function () {
    function StylesBuilder() {
        //#endregion global css props
        //#region scoped css props
        /**
         * Holds the prefix name of the generated css props.
         * Useful to avoid name collision if working with another css frameworks.
         */
        this._prefix = 'ns';
        this._useStyleCache = null;
    }
    //#region global css props
    /**
     * Includes the *general* prop names in the specified `cssProps`.
     * @param cssProps The collection of the prop name to be filtered.
     * @returns A `JssStyle` which is the copy of the `cssProps` that only having *general* prop names.
     */
    StylesBuilder.prototype.filterGeneralProps = function (cssProps) {
        var cssPropsCopy = {};
        for (var _i = 0, _a = Object.entries(cssProps); _i < _a.length; _i++) {
            var _b = _a[_i], name = _b[0], prop = _b[1];
            // excludes the entry if the name matching with following:
            if ((/^(icon)|(Xs|Sm|Nm|Md|Lg|Xl|Xxl|Xxxl|None|Enable|Disable|Active|Passive|Check|Clear|Hover|Leave|Focus|Blur|Valid|Unvalid|Invalid|Uninvalid)$|^(@)|backgGrad|anim|orientation|align/).test(name))
                continue; // exclude
            // if not match => include it:
            cssPropsCopy[name] = prop;
        }
        return cssPropsCopy;
    };
    /**
     * Includes the prop names in the specified `cssProps` starting with specified `prefix`.
     * @param cssProps The collection of the prop name to be filtered.
     * @param prefix The prefix name of the prop names to be *included*.
     * @returns A `JssStyle` which is the copy of the `cssProps` that only having matching prefix names.
     * The retuning prop names has been normalized (renamed), so it doesn't starting with `prefix`.
     */
    StylesBuilder.prototype.filterPrefixProps = function (cssProps, prefix) {
        var cssPropsCopy = {};
        for (var _i = 0, _a = Object.entries(cssProps); _i < _a.length; _i++) {
            var _b = _a[_i], name = _b[0], prop = _b[1];
            // excludes the entry if the name not starting with specified prefix:
            if (!name.startsWith(prefix))
                continue; // exclude
            // if match => remove the prefix => normalize the case => then include it:
            cssPropsCopy[camel_case_1.camelCase(name.substr(prefix.length))] = prop;
        }
        return cssPropsCopy;
    };
    Object.defineProperty(StylesBuilder.prototype, "prefix", {
        /**
         * Gets the prefix name of the generated css props.
         */
        get: function () { return this._prefix; },
        /**
         * Sets the prefix name of the generated css props.
         * Useful to avoid name collision if working with another css frameworks.
         */
        set: function (newValue) {
            if (this._prefix === newValue)
                return; // already the same => no change required
            this._prefix = newValue; // update the new prefix
            this._useStyleCache = null; // clear the cache
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Gets the declaration name of the specified `propName`.
     * @param propName The name of prop to retrieve.
     * @returns A generated prop name for declaring the prop.
     */
    StylesBuilder.prototype.decl = function (name) {
        var prefix = this._prefix;
        if (prefix)
            return "--" + prefix + "-" + name;
        return "--" + name;
    };
    /**
     * Gets the *value* (reference) of the specified `propName`.
     * @param propName The name of prop to retrieve.
     * @param fallbacks The name of secondary/next prop to retrieve if the `propName` was not found.
     * @returns A generated css expression for retrieving the value.
     */
    StylesBuilder.prototype.ref = function (propName) {
        var fallbacks = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            fallbacks[_i - 1] = arguments[_i];
        }
        var prefix = this._prefix ? "--" + this._prefix + "-" : '--';
        var fallbackRecursive = function () {
            var fallbacks = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                fallbacks[_i] = arguments[_i];
            }
            var curentFallback = fallbacks[0], restFallbacks = fallbacks.slice(1);
            if (!curentFallback)
                return ''; // no more fallback => return empty
            // handle the curentFallback and recursively handle the restFallbacks:
            return ",var(" + prefix + curentFallback + fallbackRecursive.apply(void 0, restFallbacks) + ")";
        };
        return "var(" + prefix + propName + fallbackRecursive.apply(void 0, fallbacks) + ")";
    };
    //#endregion scoped css props
    //#region mixins
    StylesBuilder.prototype.iif = function (condition, content) {
        return condition ? content : {};
    };
    //#endregion mixins
    // themes:
    /**
     * Gets the all available theme options.
     * @returns A `[string, Cust.Ref][]` represents the all available theme options.
     */
    StylesBuilder.prototype.themeOptions = function () {
        return Object.entries(color.themes);
    };
    /**
     * Creates color definitions *for each* theme `options`.
     * @param themes The previous theme definitions to *extend*.
     * @param options The list of the theme options.
     * @returns A `JssStyle` represents the color definitions *for each* theme `options`.
     */
    StylesBuilder.prototype.themes = function (themes, options) {
        var _this = this;
        if (themes === void 0) { themes = {}; }
        if (options === void 0) { options = this.themeOptions(); }
        var _loop_1 = function (theme, themeColor) {
            var Theme = pascal_case_1.pascalCase(theme);
            var themeProp = "&.th" + Theme;
            themes[themeProp] = __assign(__assign({}, themes[themeProp]), { extend: (function () {
                    var _a;
                    var newEntry = _this.themeOf(theme, // camel  case
                    Theme, // pascal case
                    themeProp, // prop name
                    themeColor // current theme color
                    );
                    var extend = (_a = themes[themeProp]) === null || _a === void 0 ? void 0 : _a.extend;
                    if (Array.isArray(extend)) {
                        extend.push(newEntry);
                        return extend;
                    }
                    else {
                        return __spreadArrays((extend ? [extend] : []), [
                            newEntry
                        ]);
                    }
                })() });
        };
        for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
            var _a = options_1[_i], theme = _a[0], themeColor = _a[1];
            _loop_1(theme, themeColor);
        }
        return themes;
    };
    /**
     * Creates a color definition for the specified `theme`.
     * @param theme The current theme name written in camel case.
     * @param Theme The current theme name written in pascal case.
     * @param themeProp The prop name of the current `theme`.
     * @param themeColor The backg color of the current `theme`.
     * @returns A `JssStyle` represents the color definition for the current `theme`.
     */
    StylesBuilder.prototype.themeOf = function (theme, Theme, themeProp, themeColor) { return {}; };
    /**
     * Gets the all available size options.
     * @returns A `string[]` represents the all available size options.
     */
    StylesBuilder.prototype.sizeOptions = function () {
        return ['sm', 'lg'];
    };
    /**
     * Creates sizing definitions *for each* size `options`.
     * @param sizes The previous size definitions to *extend*.
     * @param options The list of the size options.
     * @returns A `JssStyle` represents the sizing definitions *for each* size `options`.
     */
    StylesBuilder.prototype.sizes = function (sizes, options) {
        var _this = this;
        if (sizes === void 0) { sizes = {}; }
        if (options === void 0) { options = this.sizeOptions(); }
        var _loop_2 = function (size) {
            var Size = pascal_case_1.pascalCase(size);
            var sizeProp = "&.sz" + Size;
            sizes[sizeProp] = __assign(__assign({}, sizes[sizeProp]), { extend: (function () {
                    var _a;
                    var newEntry = _this.sizeOf(size, // camel  case
                    Size, // pascal case
                    sizeProp // prop name
                    );
                    var extend = (_a = sizes[sizeProp]) === null || _a === void 0 ? void 0 : _a.extend;
                    if (Array.isArray(extend)) {
                        extend.push(newEntry);
                        return extend;
                    }
                    else {
                        return __spreadArrays((extend ? [extend] : []), [
                            newEntry
                        ]);
                    }
                })() });
        };
        for (var _i = 0, options_2 = options; _i < options_2.length; _i++) {
            var size = options_2[_i];
            _loop_2(size);
        }
        return sizes;
    };
    /**
     * Creates a sizing definition for the specified `size`.
     * @param size The current size name written in camel case.
     * @param Size The current size name written in pascal case.
     * @param sizeProp The prop name of the current `size`.
     * @returns A `JssStyle` represents the sizing definition for the current `size`.
     */
    StylesBuilder.prototype.sizeOf = function (size, Size, sizeProp) { return {}; };
    /**
     * Creates a gradient definition for if the gradient feature is enabled.
     * @returns A `JssStyle` represents the gradient definition.
     */
    StylesBuilder.prototype.gradient = function () { return {}; };
    /**
     * Creates an outlined definition for if the outlined feature is enabled.
     * @returns A `JssStyle` represents the outlined definition.
     */
    StylesBuilder.prototype.outlined = function () { return {}; };
    /**
     * Watches & applies any theme related classes.
     * @returns A `JssStyle` represents the implementation of the themes.
     */
    StylesBuilder.prototype.watchThemes = function () {
        return {
            extend: [
                this.themes(),
                this.sizes(),
                { '&.gradient': this.gradient() },
                { '&.outlined': this.outlined() },
            ]
        };
    };
    // states:
    /**
     * Creates functional prop definitions in which the values *depends on* another *scoped css props* and/or *global css props* using *fallback* strategy.
     * @returns A `JssStyle` represents the functional prop definitions.
     */
    StylesBuilder.prototype.fnProps = function () { return {}; };
    /**
     * Creates conditional color definitions for every *specific* condition (state).
     * @returns A `JssStyle` represents the conditional color definitions for every *specific* condition (state).
     */
    StylesBuilder.prototype.themesIf = function () { return {}; };
    /**
     * Creates css rule definitions for every *specific* state by overriding some *scoped css props* and applied some `themesIf`.
     * @param inherit `true` to inherit states from parent element -or- `false` to create independent states.
     * @returns A `JssStyle` represents the css rule definitions for every *specific* state.
     */
    StylesBuilder.prototype.states = function (inherit) {
        if (inherit === void 0) { inherit = false; }
        return {};
    };
    /**
     * Watches & applies any state related classes.
     * @param inherit `true` to inherit states from parent element -or- `false` to create independent states.
     * @returns A `JssStyle` represents the implementation of the states.
     */
    StylesBuilder.prototype.watchStates = function (inherit) {
        if (inherit === void 0) { inherit = false; }
        return {
            extend: [
                this.iif(!inherit, this.themesIf() // conditional themes
                ),
                this.fnProps(),
                this.states(inherit),
            ]
        };
    };
    // styles:
    /**
     * Creates a basic style of a component *without* any themes nor states applied.
     * @returns A `JssStyle` represents a basic style definition.
     */
    StylesBuilder.prototype.basicStyle = function () { return {}; };
    /**
     * Creates one/more composite styles, with the themes & states applied.
     * @returns A `Styles` represents the composite style definitions.
     */
    StylesBuilder.prototype.styles = function () {
        return {
            main: {
                extend: [
                    this.basicStyle(),
                    // themes:
                    this.watchThemes(),
                    // states:
                    this.watchStates(),
                ]
            }
        };
    };
    /**
     * Returns a jss stylesheet for styling dom.
     * @returns A jss stylesheet instance.
     */
    StylesBuilder.prototype.useStyles = function () {
        var _this = this;
        // hack: wrap with function twice and then unwrap twice:
        // so we can use *react hook* here:
        return (function () {
            return function () {
                var _a;
                var jssContext = react_1.useContext(react_jss_1.JssContext);
                if (!_this._useStyleCache) {
                    // console.log('creating style...');
                    var jss = (_a = jssContext.jss) !== null && _a !== void 0 ? _a : react_jss_1.jss;
                    jss.use(jss_plugin_normalize_shorthands_1["default"]());
                    _this._useStyleCache = react_jss_1.createUseStyles(_this.styles());
                }
                // else {
                //     console.log('use cached style');
                // }
                return _this._useStyleCache();
            };
        })()(); // unwrap-1 & unwrap-2
    };
    // utilities:
    /**
     * Escapes some sets of character in svg data, so it will be valid to be written in css.
     * @param svgData The raw svg data to be escaped.
     * @returns An escaped svg data.
     */
    StylesBuilder.prototype.escapeSvg = function (svgData) {
        var escapedChars = {
            '<': '%3c',
            '>': '%3e',
            '#': '%23',
            '(': '%28',
            ')': '%29'
        };
        var svgDataCopy = Array.from(svgData);
        for (var index in svgDataCopy) {
            var char = svgDataCopy[index];
            if (char in escapedChars)
                svgDataCopy[index] = escapedChars[char];
        }
        return svgDataCopy.join('');
    };
    /**
     * Creates a single layer solid background based on specified `color`.
     * @param color The color of the solid background to create.
     * @returns An object represents a solid background in css.
     */
    StylesBuilder.prototype.solidBackg = function (color, clip) {
        if (clip === void 0) { clip = 'border-box'; }
        return [["linear-gradient(" + color + "," + color + ")", clip]];
    };
    return StylesBuilder;
}());
exports.StylesBuilder = StylesBuilder;
var ElementStylesBuilder = /** @class */ (function (_super) {
    __extends(ElementStylesBuilder, _super);
    function ElementStylesBuilder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //#region scoped css props
        //#region foreground
        /**
         * themed foreground color.
         */
        _this._foregTh = 'foregTh';
        /**
         * conditional foreground color.
         */
        _this._foregIfIf = 'foregIfIf';
        /**
         * conditional unthemed foreground color.
         */
        _this._foregIf = 'foregIf';
        /**
         * functional foreground color.
         */
        _this._foregFn = 'foregFn';
        //#endregion foreground
        //#region background
        /**
         * none background.
         */
        _this._backgNone = 'backgNone';
        /**
         * themed background.
         */
        _this._backgTh = 'backgTh';
        /**
         * conditional background.
         */
        _this._backgIfIf = 'backgIfIf';
        /**
         * conditional unthemed background.
         */
        _this._backgIf = 'backgIf';
        /**
         * functional backgrounds.
         */
        _this._backgFn = 'backgFn';
        /**
         * layered backgrounds.
         */
        _this._backgLy = 'backgLy';
        /**
         * toggles background gradient.
         */
        _this._backgGradTg = 'backgGradTg';
        //#endregion background
        //#region border
        /**
         * themed border color.
         */
        _this._borderTh = 'borderTh';
        /**
         * conditional border color.
         */
        _this._borderIfIf = 'borderIfIf';
        /**
         * conditional unthemed border color.
         */
        _this._borderIf = 'borderIf';
        /**
         * functional border color.
         */
        _this._borderFn = 'borderFn';
        //#endregion border
        //#region foreground - outlined
        /**
         * themed foreground color - at outlined state.
         */
        _this._foregOutlinedTh = 'foregOutlinedTh';
        /**
         * conditional foreground color - at outlined state.
         */
        _this._foregOutlinedIfIf = 'foregOutlinedIfIf';
        /**
         * conditional unthemed foreground color - at outlined state.
         */
        _this._foregOutlinedIf = 'foregOutlinedIf';
        /**
         * functional foreground color - at outlined state.
         */
        _this._foregOutlinedFn = 'foregOutlinedFn';
        /**
         * toggles *on* foreground color - at outlined state.
         */
        _this._foregOutlinedTg = 'foregOutlinedTg';
        //#endregion foreground - outlined
        //#region background - outlined
        /**
         * functional backgrounds - at outlined state.
         */
        _this._backgOutlinedFn = 'backgOutlinedFn';
        /**
         * toggles *on* backgrounds - at outlined state.
         */
        _this._backgOutlinedTg = 'backgOutlinedTg';
        //#endregion background - outlined
        /**
         * functional animations.
         */
        _this._animFn = 'animFn';
        return _this;
    }
    //#endregion scoped css props
    //#region mixins
    ElementStylesBuilder.prototype.applyStateNoAnimStartup = function () {
        return {
            animationDuration: [['0ms'], '!important']
        };
    };
    //#endregion mixins
    // themes:
    ElementStylesBuilder.prototype.themeOf = function (theme, Theme, themeProp, themeColor) {
        var _a;
        return _a = {},
            // customize the *themed* props:
            _a[this.decl(this._foregTh)] = colors_1["default"][theme + "Text"],
            _a[this.decl(this._backgTh)] = this.solidBackg(themeColor),
            _a[this.decl(this._borderTh)] = colors_1["default"][theme + "Cont"],
            _a[this.decl(this._foregOutlinedTh)] = themeColor,
            _a;
    };
    ElementStylesBuilder.prototype.sizeOf = function (size, Size, sizeProp) {
        var _a;
        return _a = {},
            // overwrite the global props with the *prop{Size}*:
            _a[exports.cssDecls.fontSize] = exports.cssProps["fontSize" + Size],
            _a[exports.cssDecls.paddingInline] = exports.cssProps["paddingInline" + Size],
            _a[exports.cssDecls.paddingBlock] = exports.cssProps["paddingBlock" + Size],
            _a[exports.cssDecls.borderRadius] = exports.cssProps["borderRadius" + Size],
            _a;
    };
    ElementStylesBuilder.prototype.gradient = function () {
        var _a;
        return _a = {},
            // *toggle on* the background gradient prop:
            _a[this.decl(this._backgGradTg)] = exports.cssProps.backgGrad,
            _a;
    };
    ElementStylesBuilder.prototype.outlined = function () {
        var _a;
        return _a = {},
            // *toggle on* the outlined props:
            _a[this.decl(this._foregOutlinedTg)] = this.ref(this._foregOutlinedFn),
            _a[this.decl(this._backgOutlinedTg)] = this.ref(this._backgOutlinedFn),
            _a;
    };
    // states:
    ElementStylesBuilder.prototype.fnProps = function () {
        var _a;
        return _a = {},
            // define a *foreground* color func:
            _a[this.decl(this._foregFn)] = this.ref(this._foregOutlinedTg, // toggle outlined
            this._foregIfIf, // first  priority
            this._foregTh, // second priority
            this._foregIf),
            // define a *backgrounds* layers:
            _a[this.decl(this._backgLy)] = [
                // top layer:
                this.ref(this._backgGradTg, this._backgNone),
                // middle layer:
                this.ref(this._backgIfIf, // first  priority
                this._backgTh, // second priority
                this._backgIf),
                // bottom layer:
                exports.cssProps.backg,
            ],
            // define a *backgrounds* func:
            _a[this.decl(this._backgFn)] = this.ref(this._backgOutlinedTg, // toggle outlined
            this._backgLy),
            // define a *border* color func:
            _a[this.decl(this._borderFn)] = this.ref(this._foregOutlinedTg, // toggle outlined
            this._borderIfIf, // first  priority
            this._borderTh, // second priority
            this._borderIf),
            // define a *foreground* color func - at *outlined* state:
            _a[this.decl(this._foregOutlinedFn)] = this.ref(this._foregOutlinedIfIf, // first  priority
            this._foregOutlinedTh, // second priority
            this._foregOutlinedIf),
            // define a *backgrounds* func - at *outlined* state:
            _a[this.decl(this._backgOutlinedFn)] = this.ref(this._backgGradTg, this._backgNone),
            // define an *animations* func:
            _a[this.decl(this._animFn)] = [
                exports.cssProps.anim,
            ],
            _a;
    };
    ElementStylesBuilder.prototype.themesIf = function () {
        var _a;
        return _a = {},
            // define a *default* color theme:
            _a[this.decl(this._foregIf)] = exports.cssProps.foreg,
            _a[this.decl(this._backgIf)] = this.ref(this._backgNone),
            _a[this.decl(this._borderIf)] = exports.cssProps.borderColor,
            _a[this.decl(this._foregOutlinedIf)] = exports.cssProps.foreg,
            _a;
    };
    ElementStylesBuilder.prototype.states = function (inherit) {
        var _a;
        if (inherit === void 0) { inherit = false; }
        return {
            extend: [
                this.iif(!inherit, (_a = {},
                    //#region all initial states are none
                    // define a *none* background:
                    _a[this.decl(this._backgNone)] = this.solidBackg('transparent'),
                    // *toggle off* the background gradient prop:
                    _a[this.decl(this._backgGradTg)] = 'initial',
                    // *toggle off* the outlined props:
                    _a[this.decl(this._foregOutlinedTg)] = 'initial',
                    _a[this.decl(this._backgOutlinedTg)] = 'initial',
                    _a)),
            ]
        };
    };
    // styles:
    ElementStylesBuilder.prototype.basicStyle = function () {
        return {
            extend: [
                this.filterGeneralProps(exports.cssProps),
            ],
            // apply *non conditional* fn props:
            foreg: this.ref(this._foregFn),
            backg: this.ref(this._backgFn),
            borderColor: this.ref(this._borderFn),
            anim: this.ref(this._animFn)
        };
    };
    return ElementStylesBuilder;
}(StylesBuilder));
exports.ElementStylesBuilder = ElementStylesBuilder;
exports.styles = new ElementStylesBuilder();
function useVariantTheme(props, themeDefault) {
    var _a;
    var theme = (_a = props.theme) !== null && _a !== void 0 ? _a : themeDefault === null || themeDefault === void 0 ? void 0 : themeDefault();
    return {
        "class": theme ? "th" + pascal_case_1.pascalCase(theme) : null
    };
}
exports.useVariantTheme = useVariantTheme;
function useVariantSize(props) {
    return {
        "class": props.size ? "sz" + pascal_case_1.pascalCase(props.size) : null
    };
}
exports.useVariantSize = useVariantSize;
function useVariantGradient(props) {
    return {
        "class": props.enableGradient ? 'gradient' : null
    };
}
exports.useVariantGradient = useVariantGradient;
function useVariantOutlined(props) {
    return {
        "class": props.outlined ? 'outlined' : null
    };
}
exports.useVariantOutlined = useVariantOutlined;
// react components:
var htmlPropList = [
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
var isHtmlProp = function (propName) { return propName.startsWith('on') || propName.startsWith('aria-') || htmlPropList.includes(propName); };
function GenericElement(props) {
    var _a, _b;
    var htmlProps = react_1.useMemo(function () {
        var htmlProps = {
            ref: props.elmRef
        };
        for (var name in props) {
            if (isHtmlProp(name)) {
                htmlProps[name] = props[name];
            } // if
        } // for
        return htmlProps;
    }, [props]);
    var Tag = ((_a = props.tag) !== null && _a !== void 0 ? _a : 'div');
    return (react_1["default"].createElement(Tag
    // other props:
    , __assign({}, htmlProps, { 
        // classes:
        className: ((_b = props.classes) !== null && _b !== void 0 ? _b : []).filter(function (c) { return !!c; }).join(' ') || undefined }), props.children));
}
exports.GenericElement = GenericElement;
;
function Element(props) {
    var _a;
    var elmStyles = exports.styles.useStyles();
    // themes:
    var variTheme = useVariantTheme(props);
    var variSize = useVariantSize(props);
    var variGradient = useVariantGradient(props);
    var variOutlined = useVariantOutlined(props);
    return (react_1["default"].createElement(GenericElement
    // other props:
    , __assign({}, props, { 
        // classes:
        classes: __spreadArrays([
            // main:
            (props.classes ? null : elmStyles.main)
        ], ((_a = props.classes) !== null && _a !== void 0 ? _a : []), [
            // themes:
            variTheme["class"],
            variSize["class"],
            variGradient["class"],
            variOutlined["class"],
        ]) })));
}
exports["default"] = Element;
;
