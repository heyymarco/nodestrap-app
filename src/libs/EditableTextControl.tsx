// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
}                           from 'jss'          // ts defs support for jss
import {
    Cust,
}                           from './Css'        // ts defs support for jss
import CssConfig            from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import colors               from './colors'     // configurable colors & theming defs
import {
    default  as EditableControl,
    EditableControlStylesBuilder,
}                           from './EditableControl'
import type * as EditableControls   from './EditableControl'
import {
    styles as contentStyles,
}                           from './Content'
import type {
    IContentStylesBuilder,
}                           from './Content'
import {
    styles as iconStyles,
}                           from './Icon'



// styles:

const iconElm = '&::after';

export class EditableTextControlStylesBuilder extends EditableControlStylesBuilder implements IContentStylesBuilder {
    //#region scoped css props
    /**
     * Icon for indicating valid/invalid state.
     */
    protected readonly _iconValInv = 'iconValInv'
    //#endregion scoped css props



    //#region mixins
    protected /*override*/ actionCtrl() { return false; }
    //#endregion mixins



    // variants:
    public /*implement*/ contentThemeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle {
        return contentStyles.contentThemeOf(theme, Theme, themeProp, themeColor); // copy themes from Content
    }
    public /*implement*/ contentSize(size: string, Size: string): JssStyle {
        const contentSize = contentStyles.contentSize(size, Size); // copy sizes from Content
        delete contentSize.paddingInline;
        delete contentSize.paddingBlock;

        return contentSize;
    }

    public /*override*/ themeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle { return {
        extend: [
            super.themeOf(theme, Theme, themeProp, themeColor), // copy themes from base
            
            this.contentThemeOf(theme, Theme, themeProp, themeColor),
        ] as JssStyle,
    }}
    public /*override*/ size(size: string, Size: string): JssStyle { return {
        extend: [
            super.size(size, Size), // copy sizes from base

            this.contentSize(size, Size),
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, Size)),
    }}



    // states:
    public /*override*/ validationThemesIf(): JssStyle { return {
        extend: [
            super.validationThemesIf(), // copy validationThemesIf from base
        ] as JssStyle,



        //#region overwrite base's themes with *softer* colors
        // define a *valid* color theme:
        [this.decl(this._foregIfVal)] : colors.successCont,
        [this.decl(this._backgIfVal)] : this.solidBackg(colors.successThin),

        // define an *invalid* color theme:
        [this.decl(this._foregIfInv)] : colors.dangerCont,
        [this.decl(this._backgIfInv)] : this.solidBackg(colors.dangerThin),
        //#endregion overwrite base's themes with *softer* colors
    }}
    public /*override*/ validationStates(inherit = false): JssStyle { return {
        extend: [
            super.validationStates(inherit), // copy validationStates from base



            this.iif(!inherit, {
                //#region all initial states are none
                [this.decl(this._iconValInv)] : this.ref(this._backgNone),
                //#endregion all initial states are none
            }),
            
            
            
            //#region specific states
            this.stateValid({
                [this.decl(this._iconValInv)] : cssProps.iconValid,   // apply a *valid* icon indicator
            }),
            this.stateInvalid({
                [this.decl(this._iconValInv)] : cssProps.iconInvalid, // apply an *invalid* icon indicator
            }),
            //#endregion specific states
        ] as JssStyle,
    }}

    public /*implement*/ contentThemesIf(): JssStyle { return {
        extend: [
            contentStyles.contentThemesIf(), // copy themes from Content
        ] as JssStyle,



        //#region overwrite base's themes with *softer* colors
        // define a *default* color theme:
        [this.decl(this._foregIf)]    : colors.secondaryCont,
        [this.decl(this._backgIf)]    : this.solidBackg(colors.secondaryThin),

        // define an *active* color theme:
        [this.decl(this._foregIfAct)] : colors.primaryCont,
        [this.decl(this._backgIfAct)] : this.solidBackg(colors.primaryThin),
        //#endregion overwrite base's themes with *softer* colors
    }}
    public /*implement*/ contentStates(inherit = false): JssStyle {
        return contentStyles.contentStates(inherit); // copy states from Content
    }

    public /*override*/ themesIf(): JssStyle { return {
        extend: [
            super.themesIf(), // copy themes from base

            this.contentThemesIf(),
        ] as JssStyle,
    }}
    public /*override*/ states(inherit = false): JssStyle { return {
        extend: [
            super.states(inherit), // copy states from base

            this.contentStates(inherit),
        ] as JssStyle,
    }}



    // functions:
    public /*implement*/ contentPropsFn(): JssStyle {
        return contentStyles.contentPropsFn(); // copy functional props from Content
    }
    public /*override*/ propsFn(): JssStyle { return {
        extend: [
            super.propsFn(), // copy functional props from base

            this.contentPropsFn(),
        ] as JssStyle,
    }}



    // styles:
    public /*implement*/ contentBasicStyle(): JssStyle {
        const contentBasicStyle = contentStyles.contentBasicStyle(); // copy basicStyle from Content
        delete contentBasicStyle.paddingInline;
        delete contentBasicStyle.paddingBlock;

        return contentBasicStyle;
    }
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base

            this.contentBasicStyle(),
        ] as JssStyle,



        //#region children
        [iconElm]: {
            extend: [
                iconStyles.createStyle( // apply icon
                    /*img   :*/ this.ref(this._iconValInv),
                    /*foreg :*/ this.ref(this._outlinedForegFn)
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
export const styles = new EditableTextControlStylesBuilder();



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
        cursor       : 'text',


        // anim props:

        iconSize     : '1em',
        iconValid    : `url("data:image/svg+xml,${styles.escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'><path fill='#000' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/></svg>")}")`,
        iconInvalid  : `url("data:image/svg+xml,${styles.escapeSvg("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'><path fill='#000' d='M7.3,6.31,5,4,7.28,1.71a.7.7,0,1,0-1-1L4,3,1.71.72a.7.7,0,1,0-1,1L3,4,.7,6.31a.7.7,0,0,0,1,1L4,5,6.31,7.3A.7.7,0,0,0,7.3,6.31Z'/></svg>")}")`,
    };
}, /*prefix: */'etctrl');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// react components:

type EditableTextControlElement = HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement

export interface Props<TElement extends EditableTextControlElement = EditableTextControlElement>
    extends
        EditableControls.Props<TElement>
{
    // validations:
    minLength? : number
    maxLength? : number
    pattern?   : string
}
export default function EditableTextControl<TElement extends EditableTextControlElement = EditableTextControlElement>(props: Props<TElement>) {
    // styles:
    const etctrlStyles = styles.useStyles();

    

    // jsx:
    return (
        <EditableControl<TElement>
            // other props:
            {...props}


            // behaviors:
            actionCtrl={props.actionCtrl ?? false}


            // classes:
            mainClass={props.mainClass ?? etctrlStyles.main}
        />
    );
}