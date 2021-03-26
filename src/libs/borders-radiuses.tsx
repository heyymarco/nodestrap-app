// jss   (builds css  using javascript):
import { Prop, Cust, }     from './Css'             // ts defs support for jss
import type { JssStyle }   from 'jss'               // ts defs support for jss
import CssPropsManager     from './CssPropsManager' // A *css custom property* manager that manages & updates the *css props* stored at specified `rule`.



// jss:

type BorderRadius = Prop.BorderRadius | Cust.Expr

/**
 * A *css custom property* manager that manages & updates the *css props* stored at specified `rule`.
 */
const cssPropsManager = new CssPropsManager(() => {
    const basics = {
        none    : '0px'     as BorderRadius,
        sm      : '0.2rem'  as BorderRadius,
        md      : '0.25rem' as BorderRadius,
        lg      : '0.3rem'  as BorderRadius,
        pill    : '50rem'   as BorderRadius,
        circle  : '50%'     as BorderRadius,
    };
    
    const defaults = {
        default : basics.md as BorderRadius,
    };
    
    return {
        ...basics,
        ...defaults,
    };
}, /*prefix: */'bd-rd');
export const radiuses = cssPropsManager.refs;
export default radiuses;



// export our mixins:
const defaultRadius      : BorderRadius = radiuses?.default ?? radiuses?.md ?? '0.25rem';
export const all         = (radius: BorderRadius = defaultRadius): JssStyle => {
    return {
        borderRadius     : (((radius === defaultRadius) ? radiuses?.default : undefined) ?? radius) as BorderRadius,
    };
};
export const topStart    = (radius: BorderRadius = defaultRadius): JssStyle => ({ borderTopLeftRadius     : all(radius).borderRadius as Prop.BorderTopLeftRadius,     })
export const topEnd      = (radius: BorderRadius = defaultRadius): JssStyle => ({ borderTopRightRadius    : all(radius).borderRadius as Prop.BorderTopRightRadius,    })
export const bottomStart = (radius: BorderRadius = defaultRadius): JssStyle => ({ borderBottomLeftRadius  : all(radius).borderRadius as Prop.BorderBottomLeftRadius,  })
export const bottomEnd   = (radius: BorderRadius = defaultRadius): JssStyle => ({ borderBottomRightRadius : all(radius).borderRadius as Prop.BorderBottomRightRadius, })

export const top         = (radius: BorderRadius = defaultRadius): JssStyle => ((radius: BorderRadius) => ({ borderTopLeftRadius: radius as Prop.BorderTopLeftRadius, borderTopRightRadius: radius as Prop.BorderTopRightRadius,                                                                                                                                 }))(all(radius).borderRadius as BorderRadius)
export const bottom      = (radius: BorderRadius = defaultRadius): JssStyle => ((radius: BorderRadius) => ({                                                                                                                     borderBottomLeftRadius: radius as Prop.BorderBottomLeftRadius, borderBottomRightRadius: radius as Prop.BorderBottomRightRadius, }))(all(radius).borderRadius as BorderRadius)
export const start       = (radius: BorderRadius = defaultRadius): JssStyle => ((radius: BorderRadius) => ({ borderTopLeftRadius: radius as Prop.BorderTopLeftRadius,                                                            borderBottomLeftRadius: radius as Prop.BorderBottomLeftRadius,                                                                  }))(all(radius).borderRadius as BorderRadius)
export const end         = (radius: BorderRadius = defaultRadius): JssStyle => ((radius: BorderRadius) => ({                                                          borderTopRightRadius: radius as Prop.BorderTopRightRadius,                                                                borderBottomRightRadius: radius as Prop.BorderBottomRightRadius, }))(all(radius).borderRadius as BorderRadius)
