// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    PropEx,
    Cust,
    ClassList,
    PropList,

    
    // components:
    CssConfig,
}                           from './nodestrap'  // nodestrap's core
import {
    EditableControlStyles,
    EditableControlProps,
    EditableControl,
}                           from './EditableControl'
import {
    IActionControlStyles,
    actionControlStyles,

    ActionControlStyles,
    ActionControlProps,
    ActionControl,
}                           from './ActionControl'
import {
    iconStyles,
}                           from './Icon'



// styles:

const iconElm = '&::after';

export class EditableTextControlStyles extends EditableControlStyles implements IActionControlStyles {
    //#region props
    //#region animations
 // public    readonly _filterPressRelease  = 'filterPressRelease' // already defined in Indicator
    protected readonly _animPressRelease    = 'animPressRelease'
    //#endregion animations
    //#endregion props



    // variants:
    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base

            this.actionControlSize(size),
        ] as JssStyle,
    }}
    public /*implement*/ actionControlSize(size: string): JssStyle {
        return actionControlStyles.actionControlSize(size); // copy sizes from actionControl
    }



    // states:
    public /*override*/ states(inherit: boolean): ClassList { return [
        ...super.states(inherit), // copy states from base

        ...this.actionControlStates(inherit),
    ]}
    public /*implement*/ actionControlStates(inherit: boolean, actionControl: IActionControlStyles = this): ClassList {
        return actionControlStyles.actionControlStates(inherit, actionControl); // copy states from actionControl
    }

    public /*implement*/ resetPressRelease(inherit: boolean) : PropList {
        return actionControlStyles.resetPressRelease(inherit); // copy resetPressRelease from actionControl
    }
    public /*implement*/ pressed()   : JssStyle {
        return actionControlStyles.pressed(); // copy pressed from actionControl
    }
    public /*implement*/ pressing()  : JssStyle { return {
    }}
    public /*implement*/ releasing() : JssStyle { return {
    }}
    public /*implement*/ released()  : JssStyle { return {
    }}
    public /*implement*/ press()     : JssStyle { return {
    }}
    public /*implement*/ release()   : JssStyle { return {
    }}
}
export const editableTextControlStyles = new EditableTextControlStyles();



// configs:

const cssConfig = new CssConfig(() => {
    return {
        // accessibility:
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