// jss   (builds css  using javascript):
import { Prop }            from './Css'        // ts defs support for jss
import CssConfig           from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.
import type {
    Dictionary,
    ValueOf,
    DictionaryOf,
}                          from './CssConfig'  // ts defs support for jss

// other libs:
import Color               from 'color'        // color utilities



// color fn:

// might be removed if *css 4* color() -or- color-mod() was released

const thinLevel = 0.5
const thinColor = (color: Color) => color.alpha(thinLevel)
const textColor = (color: Color) => (color.isLight() ? themes.dark : themes.light)
const mildLevel = 0.8
const mildColor = (color: Color) => color.mix(page1.backg as Color, mildLevel)
const boldLevel = 0.8
const boldColor = (color: Color) => color.mix(page2.foreg as Color, boldLevel)



//#region define colors by group
const basics = {
    blue     : Color('#0d6efd'),
    indigo   : Color('#6610f2'),
    purple   : Color('#6f42c1'),
    pink     : Color('#d63384'),
    red      : Color('#dc3545'),
    orange   : Color('#fd7e14'),
    yellow   : Color('#ffc107'),
    green    : Color('#198754'),
    teal     : Color('#20c997'),
    cyan     : Color('#0dcaf0'),

    black    : Color('#000000'),
    white    : Color('#ffffff'),
    gray     : Color('#6c757d'),
    grayDark : Color('#343a40'),
};

const themes = {
    primary   : basics.blue,
    secondary : basics.gray,
    success   : basics.green,
    info      : basics.cyan,
    warning   : basics.yellow,
    danger    : basics.red,
    light     : Color('#f8f9fa'),
    dark      : Color('#212529'),
};

const page1 = {
    backg : basics.white,
};

const page2 = {
    foreg : textColor(page1.backg),
};
const page3 = {
    backgThin : thinColor(page1.backg),
    backgMild : mildColor(page1.backg),
    backgBold : boldColor(page1.backg),

    foregThin : thinColor(page2.foreg),
    foregMild : mildColor(page2.foreg),
    foregBold : boldColor(page2.foreg),
};

const themesThin = {
    primaryThin   : thinColor(themes.primary),
    secondaryThin : thinColor(themes.secondary),
    successThin   : thinColor(themes.success),
    infoThin      : thinColor(themes.info),
    warningThin   : thinColor(themes.warning),
    dangerThin    : thinColor(themes.danger),
    lightThin     : thinColor(themes.light),
    darkThin      : thinColor(themes.dark),
};

const themesText = {
    primaryText   : textColor(themes.primary),
    secondaryText : textColor(themes.secondary),
    successText   : textColor(themes.success),
    infoText      : textColor(themes.info),
    warningText   : textColor(themes.warning),
    dangerText    : textColor(themes.danger),
    lightText     : textColor(themes.light),
    darkText      : textColor(themes.dark),
};

const themesMild = {
    primaryMild   : mildColor(themes.primary),
    secondaryMild : mildColor(themes.secondary),
    successMild   : mildColor(themes.success),
    infoMild      : mildColor(themes.info),
    warningMild   : mildColor(themes.warning),
    dangerMild    : mildColor(themes.danger),
    lightMild     : mildColor(themes.light),
    darkMild      : mildColor(themes.dark),
};

const themesBold = {
    primaryBold   : boldColor(themes.primary),
    secondaryBold : boldColor(themes.secondary),
    successBold   : boldColor(themes.success),
    infoBold      : boldColor(themes.info),
    warningBold   : boldColor(themes.warning),
    dangerBold    : boldColor(themes.danger),
    lightBold     : boldColor(themes.light),
    darkBold      : boldColor(themes.dark),
};

const allColors = {
    ...basics,
    ...themes,
    ...page1,
    ...page2,
    ...page3,
    ...themesThin,
    ...themesText,
    ...themesMild,
    ...themesBold,
};
//#endregion define colors by group



/**
 * A *css custom property* manager that manages & updates the *css props* stored at specified `rule`.
 */
const cssConfig = new CssConfig(() => {
    type ColorList  = typeof allColors;
    type ColorProxy = { [key in keyof ColorList]: Prop.Color };
    return new Proxy(allColors as unknown as ColorProxy, {
        get: (t, prop: string) => {
            const color = (allColors as Dictionary<Color>)[prop];
            return (color.alpha() === 1) ? color.hex() : color.toString();
        },
    });
}, /*prefix: */'col');
export const colors = cssConfig.refs;
export default colors;



const createProxy = <TColorGroup extends { [key in keyof TColorGroup]: Color },>(colorGroup: TColorGroup) => new Proxy(colorGroup as unknown as { [key in keyof TColorGroup]: ValueOf<typeof colors> }, {
    get: (t, prop: string): (ValueOf<typeof colors>|undefined) => {
        if (!(prop in colorGroup)) return undefined; // not found

        return (colors as DictionaryOf<typeof colors>)[prop];
    },
    set: (t, prop: string, newValue: ValueOf<typeof colors>) => {
        if (prop in colorGroup) { // already exists => update
            (colors as DictionaryOf<typeof colors>)[prop] = newValue;
        }
        else { // create a new one and stored both to colorGroup & colors
            const colorValue = Color(newValue);

            (colorGroup as Dictionary<Color>)[prop]   = colorValue;

            const vals = cssConfig.vals;
            (vals as DictionaryOf<typeof vals>)[prop] = (colorValue.alpha() === 1) ? colorValue.hex() : colorValue.toString();
        } // if
        

        return true;
    },
});

const themesProxy     = createProxy(themes);
const themesTextProxy = createProxy(themesText);

export {
    themesProxy     as themes,
    themesTextProxy as themesText,
}
