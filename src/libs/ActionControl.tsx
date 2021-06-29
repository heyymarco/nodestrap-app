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
    ClassList,
    PropList,


    // components:
    CssConfig,
}                           from './nodestrap'  // nodestrap's core
import {
    usePropEnabled,
}                           from './accessibilities'
import {
    useStateActivePassive,
}                           from './Indicator'
import {
    ControlStyles,
    ControlProps,
    Control,
}                           from './Control'



// styles:

export class ActionControlStyles extends ControlStyles {
    //#region props
    //#region animations
 // public    readonly _filterPressRelease  = 'filterPressRelease' // already defined in Indicator
    protected readonly _animPressRelease    = 'animPressRelease'
    //#endregion animations
    //#endregion props



    //#region mixins
    // turn off default actionCtrl behavior, use a new actionCtrl implementation
    protected /*override*/ actionCtrl() { return false; }



    protected statePressing(content: JssStyle): JssStyle { return {
        '&.press,&:active:not(.disable):not(.disabled):not(:disabled)': content,
    }}
    protected statePress(content: JssStyle): JssStyle { return {
        '&.press,&.pressed,&:active:not(.disable):not(.disabled):not(:disabled)': content,
    }}
    protected stateNotPress(content: JssStyle): JssStyle { return {
        '&:not(.press):not(.pressed):not(:active), &:not(.press):not(.pressed).disable, &:not(.press):not(.pressed).disabled, &:not(.press):not(.pressed):disabled': content,
    }}
    protected stateNotPressed(content: JssStyle): JssStyle { return {
        // not fully pressed
        '&:not(.pressed)': content,
    }}
    protected stateReleasing(content: JssStyle): JssStyle { return {
        '&.release': content,
    }}
    protected stateNotReleasing(content: JssStyle): JssStyle { return {
        '&:not(.release)': content,
    }}
    protected statePressReleasing(content: JssStyle): JssStyle { return {
        '&.press,&.pressed,&:active:not(.disable):not(.disabled):not(:disabled),&.release': content,
    }}
    protected stateNotPressReleasing(content: JssStyle): JssStyle { return {
        '&:not(.press):not(.pressed):not(:active):not(.release), &:not(.press):not(.pressed).disable:not(.release), &:not(.press):not(.pressed).disabled:not(.release), &:not(.press):not(.pressed):disabled:not(.release)': content,
    }}
    protected stateNotPressingReleasing(content: JssStyle): JssStyle { return {
        '&:not(.press):not(:active):not(.release), &:not(.press).disable:not(.release), &:not(.press).disabled:not(.release), &:not(.press):disabled:not(.release)': content,
    }}



    protected /*override*/ applyStateNoAnimStartupOld(): JssStyle {
        return this.stateNotPressingReleasing(
            super.applyStateNoAnimStartupOld(),
        );
    }
    //#endregion mixins



    // variants:
    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}



    // states:
    public /*override*/ states(inherit: boolean): ClassList { return [
        ...super.states(inherit), // copy states from base



        [ null, {
            // reset filters/anims/toggles to initial/inherit state:
            ...this.resetPressRelease(inherit),
        }],



        // .pressed will be added after pressing-animation done
        [ '&.pressed'                                                                                      , this.pressed()   ],

        // .press = programatically press, :active = user press
        [ '&.press,' +
          '&:active:not(.disabled):not(.disable):not(:disabled):not(.pressed):not(.release):not(.released)', this.pressing()  ],

        // .release will be added after loosing press and will be removed after releasing-animation done
        [ '&.release'                                                                                      , this.releasing() ],

        // if all above are not set => released
        // optionally use .released to kill pseudo :active
        [ '&:not(.pressed):not(.press):not(:active):not(.release),' +
          '&:not(.pressed):not(.press).disabled:not(.release),'     +
          '&:not(.pressed):not(.press).disable:not(.release),'      +
          '&:not(.pressed):not(.press):disabled:not(.release),'     +
          '&.released'                                                                                     , this.released()  ],
    ]}

    public /*override*/ resetPressRelease(inherit: boolean) : PropList { return {
        [this.decl(this._filterPressRelease)] : inherit ? 'unset' : 'initial',
        [this.decl(this._animPressRelease)]   : inherit ? 'unset' : 'initial',
    }}
    public /*virtual*/ pressed()   : JssStyle { return {
        [this.decl(this._filterPressRelease)] : cssProps.filterPress,



        extend: [
            this.press(),
        ] as JssStyle,
    }}
    public /*virtual*/ pressing()  : JssStyle { return {
        [this.decl(this._filterPressRelease)] : cssProps.filterPress,
        [this.decl(this._animPressRelease)]   : cssProps.animPress,



        extend: [
            this.press(),
        ] as JssStyle,
    }}
    public /*virtual*/ releasing() : JssStyle { return {
        [this.decl(this._filterPressRelease)] : cssProps.filterPress,
        [this.decl(this._animPressRelease)]   : cssProps.animRelease,



        extend: [
            this.release(),
        ] as JssStyle,
    }}
    public /*virtual*/ released()  : JssStyle { return {
        /* --nothing-- */



        extend: [
            this.release(),
        ] as JssStyle,
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
        ...super.animFn(),



        this.ref(this._animPressRelease, this._animNone), // 1st : ctrl got pressed
    ]}



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base
        ] as JssStyle,



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

export function useStatePressRelease(props: ActionControlProps, classes = { active: 'press' as (string|null), actived: 'pressed' as (string|null), passive: 'release' as (string|null) }, mouses: number[]|null = [0], keys: string[]|null = ['space']) {
    // fn props:
    const propEnabled = usePropEnabled(props);



    // states:
    const [activeDn, setActiveDn] = useState<boolean>(false); // uncontrollable (dynamic) state: true => user press, false => user release

    const stateActPass = useStateActivePassive({
        // other props:
        ...props,


        // accessibility:
        active        : props.press, // controllable active => controllable press
        inheritActive : false,       // do not `.press`/`.release` when parent [active]


        // behaviors:
        actionCtrl    : true,        // always use actionCtrl implementation
    }, activeDn, classes);


    
    useEffect(() => {
        if (!propEnabled) return;    // control is disabled => no response required



        const handleReleasing = () => {
            setActiveDn(false);
        }
        window.addEventListener('mouseup', handleReleasing);
        window.addEventListener('keyup',   handleReleasing);
        return () => {
            window.removeEventListener('mouseup', handleReleasing);
            window.removeEventListener('keyup',   handleReleasing);
        }
    }, [propEnabled]);



    const handlePressing = () => {
        if (!propEnabled) return; // control is disabled => no response required



        setActiveDn(true);
    }
    return {
        ...stateActPass,

        
        handleMouseDown : ((e) => { // for ActionControl
            if (!mouses || mouses.includes(e.button)) handlePressing();
        }) as React.MouseEventHandler<HTMLElement>,
        handleKeyDown   : ((e) => { // for ActionControl
            if (!keys || keys.includes(e.code.toLowerCase()) || keys.includes(e.key.toLowerCase())) handlePressing();
        }) as React.KeyboardEventHandler<HTMLElement>,

        handleAnimationEnd : (e: React.AnimationEvent<HTMLElement>) => {
            if (e.target !== e.currentTarget) return; // no bubbling
            if (/((?<![a-z])(press|release)|(?<=[a-z])(Press|Release))(?![a-z])/.test(e.animationName)) {
                stateActPass.handleIdle();
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


            // behaviors:
            actionCtrl={false} // turn off default actionCtrl behavior, use a new actionCtrl implementation


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