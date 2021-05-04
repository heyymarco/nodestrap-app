// jss   (builds css  using javascript):
import type {
    JssStyle,
}                           from 'jss'               // ts defs support for jss



const unset = 'unset';
const none  = 'none';



/**
 * removes browser's default styling on hyperlink.
 */
export const link : JssStyle = {
    color             : unset, // reset blue color
    textDecoration    : unset, // reset underline
    cursor            : unset, // reset hand pointer

    '&:active': {
        color         : unset, // reset blue color
    },

    '&:focus': {
        outline       : unset, // reset focus outline
        outlineOffset : unset, // reset focus outline
    },
};


/**
 * removes browser's default styling on control (input, textarea, button, etc).
 */
export const control : JssStyle = {
    appearance        : none,

    textRendering     : unset,
    color             : unset,
    letterSpacing     : unset,
    wordSpacing       : unset,
    textTransform     : unset,
    textIndent        : unset,
    textShadow        : unset,
    textAlign         : unset,
    backgroundColor   : unset,
    cursor            : unset,
    margin            : unset,
    font              : unset,
    padding           : unset,
    border            : unset,
    boxSizing         : unset,

    '&:focus': {
        outline       : unset, // reset focus outline
        outlineOffset : unset, // reset focus outline
    },
};

/**
 * removes browser's default styling on input[type=**text**].
 * **text** = text|number|email|tel|password|search|url|date|time|datetime-local|week|month
 */
 export const textbox : JssStyle = {
     extend: [
        control,
     ] as JssStyle,


    '&::-webkit-calendar-picker-indicator, &::-webkit-inner-spin-button, &::-webkit-search-cancel-button': {
        appearance : none,
        display    : none,
    },
    
    '-moz-appearance': 'textfield',
    '&:valid, &:invalid': {
        boxShadow  : unset,
    },
 };


/**
 * removes browser's default styling on list (ul>li) & (ol>li).
 */
export const list : JssStyle = {
    listStyleType      : none,
    marginBlockStart   : unset,
    marginBlockEnd     : unset,
    marginInlineStart  : unset,
    marginInlineEnd    : unset,
    paddingInlineStart : unset,

    '&>li': {
        display        : unset,
        textAlign      : unset,
    }
};

/**
 * removes browser's default styling on figure.
 */
export const figure : JssStyle = {
    display           : unset,
    marginBlockStart  : unset,
    marginBlockEnd    : unset,
    marginInlineStart : unset,
    marginInlineEnd   : unset,
};

/**
 * removes browser's default styling on focusable element.
 */
export const focusableElement : JssStyle = {
    '&:focus': {
        outline: unset,
    }
};

/**
 * hides browser's default scrollbar.
 */
 export const scrollbar : JssStyle = {
     '&::-webkit-scrollbar': {
         display         : none,
     },
     scrollbarWidth      : none,
    '-ms-overflow-style' : none,
};

/**
 * removes browser's default styling on image.
 */
export const image : JssStyle = {
    // layout:
    display: 'block', // fill the entire parent's width



    // sizes:
    // fix the image's abnormal *display=block* sizing:
    // span to maximum width:
    boxSizing      : 'border-box', // the final size is including borders & paddings
    inlineSize     : 'fill-available',
    fallbacks      : {
        inlineSize : '100%',
    },
};
