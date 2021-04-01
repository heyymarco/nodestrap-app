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
    cssProps as ecssProps,
}                           from './Element'
import {
    default  as EditableControl,
    EditableControlStylesBuilder,
}                           from './EditableControl'
import type * as EditableControls   from './EditableControl'
import {
    styles as contentStyles,
}                           from './Content'
import {
    styles as iconStyles,
}                           from './Icon'



// styles:

const iconElm = '&::after';

export class EditableTextControlStylesBuilder extends EditableControlStylesBuilder {
    //#region scoped css props
    /**
     * Icon for indicating valid/invalid state.
     */
    protected readonly _iconValInv = 'iconValInv'
    //#endregion scoped css props



    // themes:
    public themeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle { return {
        extend: [
                    super.themeOf(theme, Theme, themeProp, themeColor), // copy themes from base
            contentStyles.themeOf(theme, Theme, themeProp, themeColor), // copy themes from Content
        ] as JssStyle,
    }}



    // states:
    protected themesIf(): JssStyle { return {
        extend: [
            super.themesIf(), // copy themes from base
        ] as JssStyle,



        //#region overwrite base's themes with *softer* colors
        // define a *default* color theme:
        [this.decl(this._colorIf)]    : colors.secondaryCont,
        [this.decl(this._backgIf)]    : this.solidBackg(colors.secondaryThin),

        // define an *active* color theme:
        [this.decl(this._colorIfAct)] : colors.primaryCont,
        [this.decl(this._backgIfAct)] : this.solidBackg(colors.primaryThin),



        // define a *valid* color theme:
        [this.decl(this._colorIfVal)] : colors.successCont,
        [this.decl(this._backgIfVal)] : this.solidBackg(colors.successThin),

        // define an *invalid* color theme:
        [this.decl(this._colorIfInv)] : colors.dangerCont,
        [this.decl(this._backgIfInv)] : this.solidBackg(colors.dangerThin),
        //#endregion overwrite base's themes with *softer* colors
    }}
    protected states(): JssStyle { return {
        //#region all initial states are none
        [this.decl(this._iconValInv)]     : this.ref(this._backgNone),
        //#endregion all initial states are none



        //#region specific states
        extend: [
            super.states(), // copy states from base
    
    
    
            this.stateValid({
                [this.decl(this._iconValInv)] : cssProps.iconValid,   // apply a *valid* icon indicator
            }),
            this.stateInvalid({
                [this.decl(this._iconValInv)] : cssProps.iconInvalid, // apply an *invalid* icon indicator
            }),


            
            //#region supress activating by mouse/keyboard
            // supress activating by mouse/keyboard (:active)
            // but still responsive activating programatically (.active & .actived)
            this.stateActive({ // [activating, actived]
                '&:active:not(.active):not(.actived)': {
                    [this.decl(this._filterActivePassive)] : ecssProps.filterNone,
                    [this.decl(this._animActivePassive)]   : ecssProps.animNone,
                },
            }),
            //#endregion supress activating by mouse/keyboard
        ] as JssStyle,
        //#endregion specific states
    }}



    // styles:
    public basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(),                // copy basicStyle from base
            this.filterGeneralProps(cssProps), // apply *general* cssProps
        ] as JssStyle,



        [iconElm]: {
            //#region apply img-icon
            extend: [
                iconStyles.basicStyle(),
                iconStyles.imgStyle(),
            ] as JssStyle,


            // setup icon's image:
            [iconStyles.decl(iconStyles._img)]     : this.ref(this._iconValInv),

            // setup icon's color:
            [iconStyles.decl(iconStyles._colorFn)] : this.ref(this._colorOutlinedFn),
            //#endregion apply img-icon
    


            // layout:
            content : '""',
            display : 'inline-block',
    
            // sizes:
            height                 : cssProps.iconSize,
            width                  : [['calc(', cssProps.iconSize, '* 1.25)']],  // make sure the icon's image ratio is 1.25 or less
            marginInlineStart      : [['calc(', cssProps.iconSize, '* -1.25)']], // sizeless (ghost): cancel-out icon's width with negative margin, so it doen't take up space

            // accessibility:
            pointerEvents          : 'none', // just an overlayed element, no mouse interaction
        },
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

export interface Props
    extends
        EditableControls.Props
{
    // validations:
    minLength? : number
    maxLength? : number
    pattern?   : string
}
export default function EditableTextControl(props: Props) {
    const etctrlStyles       = styles.useStyles();



    const htmlEditTextCtrls  = [
        'input',
        'textarea',
    ];
    const isHtmlEditTextCtrl = props.tag && htmlEditTextCtrls.includes(props.tag);

    

    return (
        <EditableControl
            // default props:
            {...{
                isActionCtrl : false, // default [isActionCtrl]=false
            }}


            // other props:
            {...props}                // [isActionCtrl] might be overriden here


            // classes:
            classes={[
                // main:
                (props.classes ? null : etctrlStyles.main),


                // additionals:
                ...(props.classes ?? []),
            ]}


            // EditableTextControl props:
            {...(isHtmlEditTextCtrl ? {
                // validations:
                minLength : props.minLength,
                maxLength : props.maxLength,
                pattern   : props.pattern,
            } : {})}
        />
    );
}