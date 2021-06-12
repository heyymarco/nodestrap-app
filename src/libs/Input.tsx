// react (builds html using javascript):
import {
    default as React,
}                           from 'react'        // base technology of our nodestrap components

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
import {
    usePropEnabled,
}                           from './accessibilities'



// styles:

const inpElm  = '&>:first-child';

export class InputStylesBuilder extends EditableTextControlStylesBuilder {
    // variants:
    public /*override*/ sizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {
        extend: [
            super.sizeOf(size, Size, sizeProp), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, Size)),
    }}



    // states:
    /* -- same as parent -- */



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base
        ] as JssStyle,
        


        // layout:
        display        : 'flex',   // use flexbox as the layout
        flexDirection  : 'row',    // items are stacked horizontally
        justifyContent : 'center', // center items horizontally
        alignItems     : 'center', // center items vertically
    


        // positions:
        verticalAlign  : 'baseline', // input's text should be aligned with sibling text, so the input behave like <span> wrapper
    


        // backgrounds:
        [ecssDecls.backgGrad]: cssProps.backgGrad, // overwrite base's backGrad



        // children:
        [inpElm]: {
            extend: [
                stripOuts.textbox, // clear browser's default styles
            ] as JssStyle,
    


            // layout:
            display        : 'block', // fill the entire parent's width
    
    

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



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
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
    // styles:
    const inpStyles   = styles.useStyles();

    

    // rest props:
    const {
        // essentials:
        elmRef,


        // accessibility:
        tabIndex,
        readOnly,


        // values:
        defaultValue,
        value,
        // onChange, // let's bubbling to parent handle onChange


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
    ...restProps}  = props;



    // fn props:
    const propEnabled = usePropEnabled(props);

    
    
    // jsx:
    return (
        <EditableTextControl<HTMLInputElement>
            // other props:
            {...restProps}


            // essentials:
            tag={props.tag ?? 'span'}


            // accessibility:
            tabIndex={-1} // [tabIndex] is negative => act as *wrapper* element, if input is :focus (pseudo) => the wrapper is also .focus (synthetic)


            // classes:
            mainClass={props.mainClass ?? inpStyles.main}
        >
            <input
                // essentials:
                ref={elmRef}


                // accessibility:
                disabled={!propEnabled}
                tabIndex={tabIndex}
                readOnly={readOnly}


                // values:
                defaultValue={defaultValue}
                value={value}
             // onChange={onChange} // let's bubbling to parent handle onChange


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
            />
        </EditableTextControl>
    );
}