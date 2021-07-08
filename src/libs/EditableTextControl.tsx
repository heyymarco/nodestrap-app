// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    DictionaryOf,
    PropList,

    
    // components:
    CssConfig,
}                           from './nodestrap'  // nodestrap's core
import colors               from './colors'     // configurable colors & theming defs
import {
    EditableControlStyles as EditableControlStyles,
    EditableControlProps   as EditableControlProps,
    default as EditableControl,
}                           from './EditableControl'
import {
    iconStyles,
}                           from './Icon'



// styles:

const iconElm = '&::after';

export class EditableTextControlStyles extends EditableControlStyles {
    //#region scoped css props
    /**
     * Icon for indicating valid/invalid state.
     */
    protected readonly _iconValInv = 'iconValInv'
    //#endregion scoped css props



    // variants:
    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}



    // states:
    public /*override*/ markActive()  : JssStyle { return {
        ...this.noOutlined(),
        ...this.themeActive(),
    }}
    // public /*override*/ validationStates(inherit = false): JssStyle { return {
    //     extend: [
    //         super.validationStates(inherit), // copy validationStates from base



    //         this.iif(!inherit, {
    //             //#region all initial states are none
    //             [this.decl(this._iconValInv)] : this.ref(this._backgNone),
    //             //#endregion all initial states are none
    //         }),
            
            
            
    //         //#region specific states
    //         this.stateValid({
    //             [this.decl(this._iconValInv)] : cssProps.iconValid,   // apply a *valid* icon indicator
    //         }),
    //         this.stateInvalid({
    //             [this.decl(this._iconValInv)] : cssProps.iconInvalid, // apply an *invalid* icon indicator
    //         }),
    //         //#endregion specific states
    //     ] as JssStyle,
    // }}



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base
        ] as JssStyle,



        //#region children
        [iconElm]: {
            extend: [
                iconStyles.useIcon( // apply icon
                    /*img   :*/ this.ref(this._iconValInv),
                    /*foreg :*/ this.ref(this._foreg)
                ),
            ] as JssStyle,
    


            // layout:
            content : '""',
            display : 'inline-block',
    
            // sizes:
            boxSizing              : 'border-box', // the final size is including borders & paddings
            blockSize              :            cssProps.iconSize,
            inlineSize             : [['calc(', cssProps.iconSize, '* 1.25)']],  // make sure the icon's image ratio is 1.25 or less
            marginInlineStart      : [['calc(', cssProps.iconSize, '* -1.25)']], // sizeless (ghost): cancel-out icon's width with negative margin, so it doen't take up space

            // accessibility:
            pointerEvents          : 'none', // just an overlayed element, no mouse interaction



            // customize:
            ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'icon')), // apply *general* cssProps starting with icon***
        },
        //#endregion children



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
}
export const editableTextControlStyles = new EditableTextControlStyles();



// configs:

const cssConfig = new CssConfig(() => {
    return {
        cursor       : 'text',


        
        //#region animations
        iconSize     : '1em',
        iconValid    : `url("data:image/svg+xml,${editableTextControlStyles.escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'><path fill='#000' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/></svg>")}")`,
        iconInvalid  : `url("data:image/svg+xml,${editableTextControlStyles.escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'><path fill='#000' d='M7.3,6.31,5,4,7.28,1.71a.7.7,0,1,0-1-1L4,3,1.71.72a.7.7,0,1,0-1,1L3,4,.7,6.31a.7.7,0,0,0,1,1L4,5,6.31,7.3A.7.7,0,0,0,7.3,6.31Z'/></svg>")}")`,
        //#endregion animations
    };
}, /*prefix: */'etctrl');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// react components:

type EditableTextControlElement = HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement

export interface EditableTextControlProps<TElement extends EditableTextControlElement = EditableTextControlElement>
    extends
        EditableControlProps<TElement>
{
    // validations:
    minLength? : number
    maxLength? : number
    pattern?   : string
}
export default function EditableTextControl<TElement extends EditableTextControlElement = EditableTextControlElement>(props: EditableTextControlProps<TElement>) {
    // styles:
    const styles = editableTextControlStyles.useStyles();

    

    // jsx:
    return (
        <EditableControl<TElement>
            // other props:
            {...props}


            // essentials:
            tag={props.tag ?? 'input'}


            // variants:
            mild={props.mild ?? true}


            // classes:
            mainClass={props.mainClass ?? styles.main}
        />
    );
}
export { EditableTextControl }