// jss   (builds css  using javascript):
import type { JssStyle }   from 'jss'          // ts defs support for jss
import { Prop, Cust, }     from './Css'        // ts defs support for jss
import CssConfig           from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import * as radius         from './borders-radiuses'
import colors              from './colors'     // configurable colors & theming defs



const radiuses = radius.radiuses;
export { radiuses, radius };



// jss:

type BorderWidth = Prop.BorderWidth | Cust.Expr
type BorderColor = Prop.BorderColor | Cust.Expr
type BorderStyle = Prop.BorderStyle | Cust.Expr
type Border      = Prop.Border      | Cust.Expr

/**
 * A *css custom property* manager that manages & updates the *css props* stored at specified `rule`.
 */
const cssConfig = new CssConfig(() => {
    const widths = {
        none  : '0px' as BorderWidth,
        hair  : '1px' as BorderWidth,
        thin  : '2px' as BorderWidth,
        bold  : '4px' as BorderWidth,
    };
    
    const styles = {
        color : colors.darkTransp ?? 'currentColor' as BorderColor,
        style : 'solid'                             as BorderStyle,
    };
    
    const defaults = {
        defaultWidth : widths.hair                                 as BorderWidth,
        default      : [[styles.style, widths.hair, styles.color]] as Border,
    };
    
    return {
        ...widths,
        ...styles,
        ...defaults,
    };
}, /*prefix: */'bd');
export const borders = cssConfig.refs;
export default borders;



// export our mixins:
const vals = cssConfig.vals;
// property of .default, .style, .defaultWidth, & .color "might" has deleted by user => use nullish op for safety => .?
const defaultStyle     : BorderStyle = (vals?.default as [[BorderStyle, BorderWidth, BorderColor]])?.[0]?.[0] ?? borders?.style        ?? 'solid'
const defaultWidth     : BorderWidth = (vals?.default as [[BorderStyle, BorderWidth, BorderColor]])?.[0]?.[1] ?? borders?.defaultWidth ?? borders?.hair ?? '1px'
const defaultColor     : BorderColor = (vals?.default as [[BorderStyle, BorderWidth, BorderColor]])?.[0]?.[2] ?? borders?.color        ?? 'currentcolor'
export const all       = (width: BorderWidth = defaultWidth): JssStyle => {
    return {
        border         : (((width === defaultWidth) ? borders?.default : undefined) ?? [[defaultStyle, width, defaultColor]]) as Border,
    };
};
export const top       = (width: BorderWidth = defaultWidth): JssStyle => ({ borderTop    : all(width).border as Prop.BorderTop,    })
export const bottom    = (width: BorderWidth = defaultWidth): JssStyle => ({ borderBottom : all(width).border as Prop.BorderBottom, })
export const left      = (width: BorderWidth = defaultWidth): JssStyle => ({ borderLeft   : all(width).border as Prop.BorderLeft,   })
export const right     = (width: BorderWidth = defaultWidth): JssStyle => ({ borderRight  : all(width).border as Prop.BorderRight,  })

export const notTop    = (width: BorderWidth = defaultWidth): JssStyle => ((border: Border) => ({                                      borderBottom: border as Prop.BorderBottom, borderLeft: border as Prop.BorderLeft, borderRight: border as Prop.BorderRight, }))(all(width).border as Border)
export const notBottom = (width: BorderWidth = defaultWidth): JssStyle => ((border: Border) => ({ borderTop: border as Prop.BorderTop,                                            borderLeft: border as Prop.BorderLeft, borderRight: border as Prop.BorderRight, }))(all(width).border as Border)
export const notLeft   = (width: BorderWidth = defaultWidth): JssStyle => ((border: Border) => ({ borderTop: border as Prop.BorderTop, borderBottom: border as Prop.BorderBottom,                                        borderRight: border as Prop.BorderRight, }))(all(width).border as Border)
export const notRight  = (width: BorderWidth = defaultWidth): JssStyle => ((border: Border) => ({ borderTop: border as Prop.BorderTop, borderBottom: border as Prop.BorderBottom, borderLeft: border as Prop.BorderLeft,                                          }))(all(width).border as Border)
