import * as base           from './base'
import gens                from './general'



// define the css:
base.declareCss({
    'del,s,ins,u,small,.small,strong,b,em,i': {
        // layout:
        display        : 'inline',
    },
    'del,s': {
        // typos:
        textDecoration : 'line-through',
    },
    'ins,u': {
        // typos:
        textDecoration : 'underline',
    },
    'small,.small': {
        // typos:
        fontSize       : gens.fontSizeSm,
    },
    'strong,b': {
        // typos:
        fontWeight     : gens.fontWeightBolder,
    },
    'em,i': {
        // typos:
        fontStyle      : 'italic',
    },
});