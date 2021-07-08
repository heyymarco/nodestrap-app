// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
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
    iconStyles,
}                           from './Icon'



// styles:

const iconElm = '&::after';

export class EditableTextControlStyles extends EditableControlStyles {
    //#region props
    //#region mild - icon
    /**
     * toggles *on* icon color - at mild variant.
     */
    public    readonly _mildIconTg = 'mildIconTg'
    //#endregion mild - icon



    //#region finals
    /**
     * final icon color.
     */
    public    readonly _iconCol    = 'iconCol'
    //#endregion finals



    //#region animations
    /**
     * an icon url for indicating valid/invalid state.
     */
    protected readonly _iconValInv = 'iconValInv'
    //#endregion animations
    //#endregion props



    // variants:
    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}

    public /*override*/ noMild(inherit = false): JssStyle { return {
        extend: [
            super.noMild(inherit), // copy noMild from base
        ] as JssStyle,



        // *toggle off* the mild props:
        [this.decl(this._mildIconTg)] : inherit ? 'unset' : 'initial',
    }}
    public /*override*/ mild(): JssStyle { return {
        extend: [
            super.mild(), // copy mild from base
        ] as JssStyle,



        // *toggle on* the mild props:
        [this.decl(this._mildIconTg)] : this.ref(this._outlinedForegFn),
    }}



    // states:
    public /*override*/ markActive()   : JssStyle { return {
        ...this.noOutlined(),

        ...this.themeActive(),
    }}

    public /*override*/ resetValidUnvalid(inherit: boolean) : PropList { return {
        ...super.resetValidUnvalid(inherit), // copy resetValidUnvalid from base



        [this.decl(this._iconValInv)] : inherit ? 'unset' : 'initial',
    }}
    public /*override*/ valid()        : JssStyle { return {
        extend: [
            super.valid(), // copy valid from base
        ] as JssStyle,



        // apply a *valid* icon indicator:
        [this.decl(this._iconValInv)] : cssProps.iconValid,
    }}
    public /*override*/ invalid()      : JssStyle { return {
        extend: [
            super.invalid(), // copy invalid from base
        ] as JssStyle,



        // apply an *invalid* icon indicator:
        [this.decl(this._iconValInv)] : cssProps.iconInvalid,
    }}
    public /*override*/ noValidation() : JssStyle { return {
        extend: [
            super.noValidation(), // copy noValidation from base
        ] as JssStyle,



        // children:
        [iconElm]: {
            display: 'none',
        } as JssStyle,
    }}



    // functions:
    public /*override*/ propsFn(): PropList { return {
        ...super.propsFn(), // copy functional props from base



        //#region finals
        // define a final *icon* color func:
        [this.decl(this._iconCol)] : this.ref(
            this._outlinedForegTg, // toggle outlined
            this._mildIconTg,      // toggle mild
            this._foregFn,
        ),
        //#endregion finals
    }}



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base
        ] as JssStyle,



        // children:
        [iconElm]: this.iconBasicStyle(),



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
    protected /*virtual*/ iconBasicStyle(): JssStyle { return {
        extend: [
            iconStyles.useIcon( // apply icon
                /*img   :*/ this.ref(this._iconValInv),
                /*foreg :*/ this.ref(this._iconCol)
            ),
        ] as JssStyle,



        // layout:
        content : '""',
        display : 'inline-block', // use inline-block, so it takes the width & height as we set

        
        
        // sizes:
        boxSizing         : 'border-box', // the final size is including borders & paddings
        blockSize         :            cssProps.iconSize,
        inlineSize        : [['calc(', cssProps.iconSize,  '* 1.25)']], // make sure the icon's image ratio is 1.25 or less
        marginInlineStart : [['calc(', cssProps.iconSize, '* -1.25)']], // sizeless (ghost): cancel-out icon's width with negative margin, so it doen't take up space
        maskPosition      : 'right', // align icon to the right

        
        
        // accessibility:
        pointerEvents     : 'none', // just an overlayed element, no mouse interaction



        // customize:
        ...this.filterGeneralProps(this.filterPrefixProps(cssProps, 'icon')), // apply *general* cssProps starting with icon***
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