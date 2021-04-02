// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
}                           from 'jss'          // ts defs support for jss
import {
    Prop,
    PropEx,
    Cust,
}                           from './Css'        // ts defs support for jss
import CssConfig            from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import * as stripOuts       from './strip-outs'
import colors               from './colors'     // configurable colors & theming defs
import {
    cssProps as ecssProps,
    cssDecls as ecssDecls,
}                           from './Element'
import {
    default  as EditableTextControl,
    EditableTextControlStylesBuilder,
}                           from './EditableTextControl'
import type * as EditableTextControls   from './EditableTextControl'
import {
    styles as contentStyles,
}                           from './Content'
import {
    styles as iconStyles,
}                           from './Icon'



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
        display       : 'flex',
        alignItems    : 'center',
    

        // typos:
        verticalAlign : 'baseline',



        // children:
        [inpElm]: {
            extend: [
                stripOuts.textbox, // clear browser's default styles
            ] as JssStyle,
    


            // layout:
            display  : 'inherit',
            marginX  : [['calc(0px -', ecssProps.paddingX, ')']],
            marginY  : [['calc(0px -', ecssProps.paddingY, ')']],
            paddingX : ecssProps.paddingX,
            paddingY : ecssProps.paddingY,
    
    
            // strip out prop [size]:
            width     : 'fill-available',
            fallbacks : {
                width : '100%',
            },
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
        EditableTextControls.Props
{
    // validations:
    min? : string | number
    max? : string | number


    // formats:
    type?         : InputType
    placeholder?  : string
}
export default function Input(props: Props) {
    const inpStyles       = styles.useStyles();

    

    return (
        <EditableTextControl
            // default props:
            {...{
                tag : 'input', // default [tag]=input
            }}


            // other props:
            {...props}


            // classes:
            classes={[
                // main:
                (props.classes ? null : inpStyles.main),


                // additionals:
                ...(props.classes ?? []),
            ]}
        />
    );

    /*
    <input
        // accessibility:
        disabled={props.enabled===false}
        tabIndex={props.tabIndex}
        readOnly={props.readOnly}


        // values:
        defaultValue={props.defaultValue}
        value={props.value}
        // onChange={props.onChange}
        

        // validations:
        required={props.required}
        minLength={props.minLength}
        maxLength={props.maxLength}
        pattern={props.pattern}
        min={props.min}
        max={props.max}
        // ref={nativeValidator.handleInit}


        // formats:
        type={props.type ?? 'text'}
        placeholder={props.placeholder}


        // events:
        onFocus={stateFocusBlur.handleFocus}
        onBlur={stateFocusBlur.handleBlur}
    />
    */
}