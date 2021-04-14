// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
}                           from 'jss'          // ts defs support for jss
import CssConfig            from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import * as stripOuts       from './strip-outs'
import {
    cssProps as ecssProps,
    cssDecls as ecssDecls,
}                           from './Element'
import {
    default  as EditableTextControl,
    EditableTextControlStylesBuilder,
}                           from './EditableTextControl'
import type * as EditableTextControls   from './EditableTextControl'



// styles:

const inpElm  = '& >:first-child';

export class InputStylesBuilder extends EditableTextControlStylesBuilder {
    // themes:
    /* -- same as parent -- */



    // states:
    /* -- same as parent -- */



    // styles:
    public basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(),                    // copy basicStyle from base
            this.filterGeneralProps(cssProps),     // apply *general* cssProps
        ] as JssStyle,
    
        [ecssDecls.backgGrad]: cssProps.backgGrad, // overwrite base's backGrad
        


        // layout:
        display        : 'flex',
        justifyContent : 'center', // center items horizontally
        alignItems     : 'center', // center items vertically
    

        // positions:
        verticalAlign : 'baseline', // input's text should be aligned with sibling text, so the input behave like <span> wrapper



        // children:
        [inpElm]: {
            extend: [
                stripOuts.textbox, // clear browser's default styles
            ] as JssStyle,
    


            // layout:
            display       : 'block', // fill the entire parent's width
    
    
            // sizes:
            // strip out input's prop [size]:
            // span to maximum width including parent's paddings:
            boxSizing      : 'border-box', // the final size is including borders & paddings
            inlineSize     : 'fill-available',
            fallbacks      : {
                inlineSize : [['calc(100% + (', ecssProps.paddingInline, ' * 2))']],
            },


            // spacings:
            // cancel-out parent's padding with negative margin:
            marginInline  : [['calc(0px -', ecssProps.paddingInline, ')']],
            marginBlock   : [['calc(0px -', ecssProps.paddingBlock,  ')']],

            // copy parent's paddings:
            paddingInline : ecssProps.paddingInline,
            paddingBlock  : ecssProps.paddingBlock,
        },
    }}
}
export const styles = new InputStylesBuilder();



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
        backgGrad : [['linear-gradient(180deg, rgba(0,0,0, 0.2), rgba(255,255,255, 0.2))', 'border-box']],
    };
}, /*prefix: */'inp');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// react components:

export type InputTextLike = 'text'|'number'|'email'|'tel'|'password'|'search'|'url'|'date'|'time'|'datetime-local'|'week'|'month'
export type InputType     = InputTextLike | 'color'|'file'|'range'

export interface Props
    extends
        EditableTextControls.Props<HTMLInputElement>
{
    // validations:
    min? : string | number
    max? : string | number


    // formats:
    type          : InputType
    placeholder?  : string
}
export default function Input(props: Props) {
    const inpStyles       = styles.useStyles();

    

    const {
        // essentials:
        elmRef,


        // accessibility:
        tabIndex,
        readOnly,


        // values:
        defaultValue,
        value,
        onChange,


        // validations:
        required,
        minLength,
        maxLength,
        pattern,
        min,
        max,


        // formats:
        type,
        placeholder,


    ...otherProps}  = props;

    return (
        <EditableTextControl<HTMLInputElement>
            // default props:
            tag='span'


            // other props:
            {...otherProps}


            // main:
            mainClass={props.mainClass ?? inpStyles.main}


            // unchanged props:
            tabIndex={-1}
        >
            <input
                // essentials:
                ref={elmRef}


                // accessibility:
                disabled={props.enabled === false}
                tabIndex={tabIndex}
                readOnly={readOnly}


                // values:
                defaultValue={defaultValue}
                value={value}
             // onChange={onChange} // bubble to parent, let's the parent handle the onChange


                // validations:
                required={required}
                minLength={minLength}
                maxLength={maxLength}
                pattern={pattern}
                min={min}
                max={max}


                // formats:
                type={type}
                placeholder={placeholder}


                // events:
                // onFocus, onBlur // bubble to parent (unlike on native DOM that doesn't bubble, on react *do* bubbling)
                // onAnimationEnd  // bubble to parent, let's the parent handle the onAnimationEnd
            />
        </EditableTextControl>
    );
}