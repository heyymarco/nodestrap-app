// react (builds html using javascript):
import {
    default as React,
    useEffect,
    useState,
}                           from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    PropEx,
    Cust,
    StateList,
    PropList,


    // components:
    CssConfig,
}                           from './nodestrap'  // nodestrap's core
import {
    usePropEnabled,
    usePropReadOnly,
}                           from './accessibilities'
import {
    ControlStyles,
    ControlProps,
    Control,
}                           from './Control'



// styles:

export interface IActionControlStyles {
    // variants:
    actionControlSize(size: string): JssStyle



    // states:
    actionControlStates(inherit: boolean, actionControl: IActionControlStyles): StateList
    
    resetPressRelease(inherit: boolean): PropList
    pressed()   : JssStyle
    pressing()  : JssStyle
    releasing() : JssStyle
    released()  : JssStyle
    press()     : JssStyle
    release()   : JssStyle



    // functions:
    actionControlAnimFn(): Cust.Ref[]



    // styles:
    actionControlBasicStyle(): JssStyle
}

export class ActionControlStyles extends ControlStyles implements IActionControlStyles {
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
    public /*virtual*/ actionControlSize(size: string): JssStyle { return {
        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}



    // states:
    public /*override*/ states(inherit: boolean): StateList { return [
        ...super.states(inherit), // copy states from base

        ...this.actionControlStates(inherit),
    ]}
    public /*virtual*/ actionControlStates(inherit: boolean, actionControl: IActionControlStyles = this): StateList { return [
        [ null, {
            // reset filters/anims/toggles to initial/inherit state:
            ...actionControl.resetPressRelease(inherit),
        }],



        // .pressed will be added after pressing-animation done
        [  '.pressed'                                                                                        , [actionControl.press()   , actionControl.pressed()  ] ],

        // .press = programatically press, :active = user press
        [ ['.press' ,
           ':active:not(.disabled):not(.disable):not(:disabled):not(.pressed):not(.release):not(.released)'] , [actionControl.press()   , actionControl.pressing() ] ],

        // .release will be added after loosing press and will be removed after releasing-animation done
        [  '.release'                                                                                        , [actionControl.release() , actionControl.releasing()] ],

        // if all above are not set => released
        // optionally use .released to kill pseudo :active
        [ [':not(.pressed):not(.press):not(:active):not(.release)' ,
           ':not(.pressed):not(.press).disabled:not(.release)'     ,
           ':not(.pressed):not(.press).disable:not(.release)'      ,
           ':not(.pressed):not(.press):disabled:not(.release)'     ,
           '.released']                                                                                      , [actionControl.release() , actionControl.released() ] ],
    ]}

    public /*virtual*/ resetPressRelease(inherit: boolean) : PropList { return {
        [this.decl(this._filterPressRelease)] : inherit ? 'unset' : 'initial',
        [this.decl(this._animPressRelease)]   : inherit ? 'unset' : 'initial',
    }}
    public /*virtual*/ pressed()   : JssStyle { return {
        [this.decl(this._filterPressRelease)] : cssProps.filterPress,
    }}
    public /*virtual*/ pressing()  : JssStyle { return {
        [this.decl(this._filterPressRelease)] : cssProps.filterPress,
        [this.decl(this._animPressRelease)]   : cssProps.animPress,
    }}
    public /*virtual*/ releasing() : JssStyle { return {
        [this.decl(this._filterPressRelease)] : cssProps.filterPress,
        [this.decl(this._animPressRelease)]   : cssProps.animRelease,
    }}
    public /*virtual*/ released()  : JssStyle { return {
        /* --nothing-- */
    }}
    public /*virtual*/ press()     : JssStyle { return {
        extend: [
            this.markActive(),
        ] as JssStyle,
    }}
    public /*virtual*/ release()   : JssStyle { return {
    }}



    // functions:
    public /*override*/ animFn(): Cust.Ref[] { return [
        ...super.animFn(), // copy functional animations from base

        ...this.actionControlAnimFn(),
    ]}
    public /*virtual*/ actionControlAnimFn(): Cust.Ref[] { return [
        this.ref(this._animPressRelease, this._animNone),
    ]}



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base

            this.actionControlBasicStyle(),
        ] as JssStyle,
    }}
    public /*virtual*/ actionControlBasicStyle(): JssStyle { return {
        // accessibility:
        userSelect : 'none', // disable selecting text (double clicking not causing selecting text)



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps
    }}
}
export const actionControlStyles = new ActionControlStyles();



// configs:

const cssConfig = new CssConfig(() => {
    const keyframesPress  : PropEx.Keyframes = {
        from: {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...actionControlStyles.filterFn().filter((f) => f !== actionControlStyles.ref(actionControlStyles._filterPressRelease, actionControlStyles._filterNone)),

             // actionControlStyles.ref(actionControlStyles._filterPressRelease, actionControlStyles._filterNone), // missing the last => let's the browser interpolated it
            ]],
        },
        to: {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...actionControlStyles.filterFn().filter((f) => f !== actionControlStyles.ref(actionControlStyles._filterPressRelease, actionControlStyles._filterNone)),

                actionControlStyles.ref(actionControlStyles._filterPressRelease, actionControlStyles._filterNone), // existing the last => let's the browser interpolated it
            ]],
        },
    };
    const keyframesRelease : PropEx.Keyframes = {
        from : keyframesPress.to,
        to   : keyframesPress.from,
    };



    return {
        //#region animations
        filterPress          : [['brightness(65%)', 'contrast(150%)']],

        '@keyframes press'   : keyframesPress,
        '@keyframes release' : keyframesRelease,
        animPress            : [['150ms', 'ease-out', 'both', keyframesPress  ]],
        animRelease          : [['300ms', 'ease-out', 'both', keyframesRelease]],
        //#endregion animations
    };
}, /*prefix: */'act');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// hooks:

export function useStatePressRelease(props: ActionControlProps, mouses: number[]|null = [0], keys: string[]|null = ['space']) {
    // fn props:
    const propEnabled  = usePropEnabled(props);
    const propReadOnly = usePropReadOnly(props);



    // states:
    const [pressed,   setPressed  ] = useState<boolean>(props.press ?? false); // true => press, false => release
    const [animating, setAnimating] = useState<boolean|null>(null); // null => no-animation, true => pressing-animation, false => releasing-animation

    const [pressDn,   setPressDn  ] = useState<boolean>(false);     // uncontrollable (dynamic) state: true => user press, false => user release



    /*
     * state is always released if (disabled || readOnly)
     * state is press/release based on [controllable press] (if set) and fallback to [uncontrollable press]
     */
    const pressFn: boolean = (propEnabled && !propReadOnly) && (props.press /*controllable*/ ?? pressDn /*uncontrollable*/);

    if (pressed !== pressFn) { // change detected => apply the change & start animating
        setPressed(pressFn);   // remember the last change
        setAnimating(pressFn); // start pressing-animation/releasing-animation
    }


    
    useEffect(() => {
        if (!propEnabled)              return; // control is disabled => no response required
        if (propReadOnly)              return; // control is readOnly => no response required
        if (props.press !== undefined) return; // controllable [press] is set => no uncontrollable required



        const handleRelease = () => {
            setPressDn(false);
        }
        window.addEventListener('mouseup', handleRelease);
        window.addEventListener('keyup',   handleRelease);
        return () => {
            window.removeEventListener('mouseup', handleRelease);
            window.removeEventListener('keyup',   handleRelease);
        }
    }, [propEnabled, propReadOnly, props.press]);



    const handlePress = () => {
        if (!propEnabled)              return; // control is disabled => no response required
        if (propReadOnly)              return; // control is readOnly => no response required
        if (props.press !== undefined) return; // controllable [press] is set => no uncontrollable required



        setPressDn(true);
    }
    const handleIdle = () => {
        // clean up finished animation

        setAnimating(null); // stop pressing-animation/releasing-animation
    }
    return {
        /**
         * partially/fully press
        */
        press : pressed,

        class : ((): string|null => {
            // pressing:
            if (animating === true) {
                // pressing by controllable prop => use class .press
                if (props.press !== undefined) return 'press';

                // otherwise use pseudo :active
                return null;
            } // if

            // releasing:
            if (animating === false) return 'release';

            // fully pressed:
            if (pressed) return 'pressed';

            // fully released:
            if ((props.press !== undefined) || propReadOnly) {
                return 'released'; // releasing by controllable prop => use class .released to kill pseudo :active
            }
            else {
                return null; // discard all classes above
            } // if
        })(),
        
        handleMouseDown    : ((e) => {
            if (!mouses || mouses.includes(e.button)) handlePress();
        }) as React.MouseEventHandler<HTMLElement>,
        handleKeyDown      : ((e) => {
            if (!keys || keys.includes(e.code.toLowerCase()) || keys.includes(e.key.toLowerCase())) handlePress();
        }) as React.KeyboardEventHandler<HTMLElement>,
        handleAnimationEnd : (e: React.AnimationEvent<HTMLElement>) => {
            if (e.target !== e.currentTarget) return; // no bubbling
            if (/((?<![a-z])(press|release)|(?<=[a-z])(Press|Release))(?![a-z])/.test(e.animationName)) {
                handleIdle();
            }
        },
    };
}



// react components:

export interface ActionControlProps<TElement extends HTMLElement = HTMLElement>
    extends
        ControlProps<TElement>
{
    // accessibility:
    press?   : boolean
}
export default function ActionControl<TElement extends HTMLElement = HTMLElement>(props: ActionControlProps<TElement>) {
    // styles:
    const styles       = actionControlStyles.useStyles();

    
    
    // states:
    const statePrssRls = useStatePressRelease(props);



    // jsx:
    return (
        <Control<TElement>
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
export { ActionControl }