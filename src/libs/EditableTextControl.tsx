// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    DictionaryOf,
    ClassList,
    PropList,

    
    // components:
    CssConfig,
}                           from './nodestrap'  // nodestrap's core
import colors               from './colors'     // configurable colors & theming defs
import {
    EditableControlStylesBuilder as EditableControlStyles,
    Props   as EditableControlProps,
    default as EditableControl,
}                           from './EditableControl'
import {
    IContentStyles,
    contentStyles,
}                           from './Content'
import {
    styles as iconStyles,
}                           from './Icon'



// styles:

const iconElm = '&::after';

export class EditableTextControlStylesBuilder extends EditableControlStyles implements IContentStyles {
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
    public /*override*/ theme(theme: string): JssStyle { return {
        extend: [
            super.theme(theme), // copy themes from base
            
            this.contentTheme(theme),
        ] as JssStyle,
    }}
    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base

            this.contentSize(size),
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}

    public /*implement*/ contentTheme(theme: string): JssStyle {
        return contentStyles.contentTheme(theme); // copy themes from Content
    }
    public /*implement*/ contentSize(size: string): JssStyle {
        const contentSize = contentStyles.contentSize(size); // copy sizes from Content
        delete contentSize.paddingInline;
        delete contentSize.paddingBlock;

        return contentSize;
    }



    // states:
    public /*override*/ states(inherit: boolean): ClassList { return [
        ...super.states(inherit), // copy states from base

        ...this.contentStates(inherit),
    ]}
    public /*implement*/ contentStates(inherit: boolean): ClassList {
        return contentStyles.contentStates(inherit); // copy states from Content
    }
    
    public /*override*/ themeDefault(theme: string|null = 'secondary'): JssStyle { return {
        extend: [
            super.themeDefault(theme), // copy default theme from base
        ] as JssStyle,



        // overwrite some default's theme color with *softer* colors:
        [this.decl(this._foregIf)] : (colors as DictionaryOf<typeof colors>)[`${theme}Cont`],
        [this.decl(this._backgIf)] : this.solidBackg((colors as DictionaryOf<typeof colors>)[`${theme}Thin`]),
    }}
    public /*override*/ themeActive(theme = 'primary'): JssStyle { return {
        extend: [
            super.themeActive(theme), // copy active theme from base
        ] as JssStyle,



        // overwrite some active's theme color with *softer* colors:
        [this.decl(this._foregIf)] : (colors as DictionaryOf<typeof colors>)[`${theme}Cont`],
        [this.decl(this._backgIf)] : this.solidBackg((colors as DictionaryOf<typeof colors>)[`${theme}Thin`]),
    }}

    public /*override*/ validationThemesIf(): JssStyle { return {
        extend: [
            super.validationThemesIf(), // copy validationThemesIf from base
        ] as JssStyle,



        // overwrite some valid's theme color with *softer* colors:
        // define a *valid* color theme:
        [this.decl(this._foregIfVal)] : colors.successCont,
        [this.decl(this._backgIfVal)] : this.solidBackg(colors.successThin),

        // overwrite some invalid's theme color with *softer* colors:
        [this.decl(this._foregIfInv)] : colors.dangerCont,
        [this.decl(this._backgIfInv)] : this.solidBackg(colors.dangerThin),
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



    // functions:
    public /*override*/ propsFn(): PropList { return {
        ...super.propsFn(), // copy functional props from base
        
        ...this.contentPropsFn(),
    }}
    public /*implement*/ contentPropsFn(): PropList {
        return contentStyles.contentPropsFn(); // copy functional props from Content
    }



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base

            this.contentBasicStyle(),
        ] as JssStyle,



        //#region children
        [iconElm]: {
            extend: [
                iconStyles.useIcon( // apply icon
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
    public /*implement*/ contentBasicStyle(): JssStyle {
        const contentBasicStyle = contentStyles.contentBasicStyle(); // copy basicStyle from Content
        delete contentBasicStyle.paddingInline;
        delete contentBasicStyle.paddingBlock;

        return contentBasicStyle;
    }
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
        EditableControlProps<TElement>
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