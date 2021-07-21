// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    Cust,
    RuleList,
    PropList,
}                           from './nodestrap'  // nodestrap's core
import {
    EditableControlElement,

    EditableControlStyles,
    EditableControlProps,
    EditableControl,
}                           from './EditableControl'
import {
    useStatePressRelease,

    IActionControlStyles,
    actionControlStyles,

    ActionControlProps,
}                           from './ActionControl'



// styles:

export class EditableActionControlStyles extends EditableControlStyles implements IActionControlStyles {
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
    public /*override*/ states(inherit: boolean): RuleList { return [
        ...super.states(inherit), // copy states from base

        ...this.actionControlStates(inherit),
    ]}
    public /*implement*/ actionControlStates(inherit: boolean, actionControl: IActionControlStyles = this): RuleList {
        return actionControlStyles.actionControlStates(inherit, actionControl); // copy states from actionControl
    }

    public /*implement*/ resetPressRelease(inherit: boolean) : PropList {
        return actionControlStyles.resetPressRelease(inherit); // copy resetPressRelease from actionControl
    }
    public /*implement*/ pressed()                                         : JssStyle {
        return actionControlStyles.pressed();   // copy pressed   from actionControl
    }
    public /*implement*/ pressing()                                        : JssStyle {
        return actionControlStyles.pressing();  // copy pressing  from actionControl
    }
    public /*implement*/ releasing()                                       : JssStyle {
        return actionControlStyles.releasing(); // copy releasing from actionControl
    }
    public /*implement*/ released()                                        : JssStyle {
        return actionControlStyles.released();  // copy released  from actionControl
    }
    public /*implement*/ press(actionControl: IActionControlStyles = this) : JssStyle {
        return actionControlStyles.press(actionControl);     // copy press     from actionControl
    }
    public /*implement*/ release()                                         : JssStyle {
        return actionControlStyles.release();   // copy release   from actionControl
    }



    // functions:
    public /*override*/ animFn(): Cust.Ref[] { return [
        ...super.animFn(), // copy functional animations from base

        ...this.actionControlAnimFn(),
    ]}
    public /*implement*/ actionControlAnimFn(): Cust.Ref[] {
        return actionControlStyles.actionControlAnimFn(); // copy functional animations from actionControl
    }



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base

            this.actionControlBasicStyle(),
        ] as JssStyle,
    }}
    public /*implement*/ actionControlBasicStyle(): JssStyle {
        return actionControlStyles.actionControlBasicStyle(); // copy basicStyle from actionControl
    }
}
export const editableActionControlStyles = new EditableActionControlStyles();



// react components:

export type { EditableControlElement }

export interface EditableActionControlProps<TElement extends EditableControlElement = EditableControlElement>
    extends
        EditableControlProps<TElement>,
        ActionControlProps<TElement>
{
}
export default function EditableActionControl<TElement extends EditableControlElement = EditableControlElement>(props: EditableActionControlProps<TElement>) {
    // styles:
    const styles       = editableActionControlStyles.useStyles();



    // states:
    const statePrssRls = useStatePressRelease(props);

    

    // jsx:
    return (
        <EditableControl<TElement>
            // other props:
            {...props}


            // classes:
            mainClass={props.mainClass ?? styles.main}
            stateClasses={[...(props.stateClasses ?? []),
                statePrssRls.class,
            ]}


            // events:
            onMouseDown={(e) => { statePrssRls.handleMouseDown(e); props.onMouseDown?.(e); }}
            onKeyDown=  {(e) => { statePrssRls.handleKeyDown(e);   props.onKeyDown?.(e);   }}
            onAnimationEnd={(e) => {
                // states:
                statePrssRls.handleAnimationEnd(e);


                // forwards:
                props.onAnimationEnd?.(e);
            }}
        />
    );
}
export { EditableActionControl }