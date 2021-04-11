// react (builds html using javascript):
import
    React, {
    useState,
}                          from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
}                          from 'jss'          // ts defs support for jss
import {
    PropEx,
    Cust,
}                          from './Css'        // ts defs support for jss
import CssConfig           from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import colors              from './colors'     // configurable colors & theming defs
import {
    default  as Element,
    cssProps as ecssProps,
    ElementStylesBuilder,
}                          from './Element'
import type * as Elements  from './Element'
import {
    styles as contentStyles,
}                          from './Content'



// styles:

export class FormStylesBuilder extends ElementStylesBuilder {
    // themes:
    public themeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle { return {
        extend: [
            super.themeOf(theme, Theme, themeProp, themeColor), // copy themes from base

            contentStyles.contentThemeOf(theme, Theme, themeProp, themeColor),
            {
                [contentStyles.decl(contentStyles._foregActiveTh)] : undefined as unknown as null, // delete
                [contentStyles.decl(contentStyles._backgActiveTh)] : undefined as unknown as null, // delete
            },
        ] as JssStyle,
    }}
    public sizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {
        extend: [
            super.sizeOf(size, Size, sizeProp), // copy sizes from base

            contentStyles.contentSizeOf(size, Size, sizeProp),
        ] as JssStyle,
    }}




}
export const styles = new FormStylesBuilder();



// configs:

const cssConfig = new CssConfig(() => {
    // common css values:
    // const initial = 'initial';
    // const unset   = 'unset';
    // const none    = 'none';
    // const inherit = 'inherit';
    // const center  = 'center';
    // const middle  = 'middle';


    return {
    };
}, /*prefix: */'frm');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// react components: