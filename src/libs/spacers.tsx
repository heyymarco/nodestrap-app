// jss   (builds css  using javascript):
import { PropEx, Cust, }   from './Css'        // ts defs support for jss
import CssConfig           from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.



// jss:

type Length = PropEx.Length | Cust.Expr

/**
 * A *css custom property* manager that manages & updates the *css props* stored at specified `rule`.
 */
const cssConfig = new CssConfig(() => {
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
        
        xxs     : [['calc(', basics.md, '/', 8  , ')']] as Length,
        xs      : [['calc(', basics.md, '/', 4  , ')']] as Length,
        sm      : [['calc(', basics.md, '/', 2  , ')']] as Length,

        lg      : [['calc(', basics.md, '*', 1.5, ')']] as Length,
        xl      : [['calc(', basics.md, '*', 3  , ')']] as Length,
    };
}, /*prefix: */'spc');
export const spacers = cssConfig.refs;
export default spacers;
