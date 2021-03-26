// jss   (builds css  using javascript):
import { PropEx, Cust, }     from './Css'           // ts defs support for jss
import CssPropsManager     from './CssPropsManager' // A *css custom property* manager that manages & updates the *css props* stored at specified `rule`.



// jss:

type Length = PropEx.Length | Cust.Expr

/**
 * A *css custom property* manager that manages & updates the *css props* stored at specified `rule`.
 */
const cssPropsManager = new CssPropsManager(() => {
    const basics = {
        none    : '0px'  as Length,
        md      : '1rem' as Length,
    };
    
    const defaults = {
        default : basics.md as Length,
    };
    
    return {
        ...basics,
        ...defaults,
        
        xs      : [['calc(', basics.md, '/', 4  , ')']] as Length,
        sm      : [['calc(', basics.md, '/', 2  , ')']] as Length,
        lg      : [['calc(', basics.md, '*', 1.5, ')']] as Length,
        xl      : [['calc(', basics.md, '*', 3  , ')']] as Length,
    };
}, /*prefix: */'spc');
export const spacers = cssPropsManager.refs;
export default spacers;
