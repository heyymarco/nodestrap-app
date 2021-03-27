import type { Plugin, Rule, JssStyle, JssValue, StyleSheet } from 'jss';



const shorthands: { [key: string]: string } = {
    backg        : 'background',
    'backg-clip' : 'background-clip',
    anim         : 'animation',
    'gap-x'      : 'column-gap',
    'gap-y'      : 'row-gap',
};

const plugin : Plugin = {
    onProcessStyle: (style: JssStyle & {[key: string]: JssStyle[keyof JssStyle]}, rule: Rule, sheet?: StyleSheet): JssStyle => {
        for (const name in style) {
            if (name in shorthands) {
                // set the expanded name:
                style[shorthands[name]] = style[name];

                // delete the original name:
                style[name] = null;
            }
        } // for



        {
            // get the original values:
            const paddingX = style['padding-x'];
            const paddingY = style['padding-y'];



            // set the expanded names:
            if (paddingX && paddingY) {
                style.padding = [[paddingY, paddingX]] as JssValue;
            }
            else if (paddingX) {
                style['padding-left']   = paddingX;
                style['padding-right']  = paddingX;
            }
            else if (paddingY) {
                style['padding-top']    = paddingY;
                style['padding-bottom'] = paddingY;
            } // if



            // delete the original names:
            if (paddingX) style['padding-x'] = null;
            if (paddingY) style['padding-y'] = null;
        }



        {
            // get the original values:
            const marginX = style['margin-x'];
            const marginY = style['margin-y'];



            // set the expanded names:
            if (marginX && marginY) {
                style.margin = [[marginY, marginX]] as JssValue;
            }
            else if (marginX) {
                style['margin-left']   = marginX;
                style['margin-right']  = marginX;
            }
            else if (marginY) {
                style['margin-top']    = marginY;
                style['margin-bottom'] = marginY;
            } // if



            // delete the original names:
            if (marginX) style['margin-x'] = null;
            if (marginY) style['margin-y'] = null;
        }



        return style;
    },
};

export default function normalizeShorthands(): Plugin {
    return plugin;
}