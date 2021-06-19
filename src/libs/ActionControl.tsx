// react (builds html using javascript):
import {
    default as React,
    useEffect,
    useState,
}                           from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
}                           from 'jss'          // ts defs support for jss

// nodestrap (modular web components):
import {
    usePropAccessibility,
}                           from './accessibilities'
import {
    cssProps as ecssProps,
}                           from './BasicComponent'
import {
    cssProps as icssProps,
    IndicationProps,
    useStateActivePassive,
}                           from './Indicator'
import {
    default  as Control,
    ControlStyles,
}                           from './Control'
import type * as Controls   from './Control'



// styles:

export class ActionControlStylesBuilder extends ControlStyles {
    //#region scoped css props
    protected readonly _animPressRelease   = 'animPressRelease'
    //#endregion scoped css props



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



    // states:
    public /*override*/ controlStates(inherit = false): JssStyle { return {
        extend: [
            super.controlStates(inherit), // copy controlStates from base



            this.iif(!inherit, {
                //#region all initial states are none
                [this.decl(this._animPressRelease)]    : ecssProps.animNone,
                //#endregion all initial states are none
            }),



            //#region specific states
            //#region press, release
            this.statePressReleasing({ // [pressing, pressed, releasing]
                [this.decl(this._filterActivePassive)] : icssProps.filterActive,
            }),
            this.statePress({ // [pressing, pressed]
                [this.decl(this._animPressRelease)]    : icssProps.animActive,
            }),
            this.stateReleasing({ // [releasing]
                [this.decl(this._animPressRelease)]    : icssProps.animPassive,
            }),
            {
                // [pressed]
                '&.pressed': // if activated programmatically (not by user input), disable the animation
                    this.applyStateNoAnimStartupOld(),
            },
            //#endregion press, release
            //#endregion specific states
        ] as JssStyle,
    }}



    // functions:
    public /*override*/ controlAnimFn(): JssStyle { return {
        //#region re-arrange the animFn at different states
        '&.press,&.pressed': // if activated programmatically (not by user input)
            this.stateNotDisabled({ // if ctrl was not fully disabled
                // define an *animations* func:
                [this.decl(this._animFnOld)]: [
                    ecssProps.anim,
                    this.ref(this._animPressRelease),  // 5th : ctrl already pressed, move to the least priority
                    this.ref(this._animHoverLeave),    // 4th : cursor leaved   => low probability because holding press
                    this.ref(this._animFocusBlur),     // 3rd : ctrl lost focus => low probability because holding press
                    this.ref(this._animEnableDisable), // 2nd : ctrl enable/disable => rarely used => low probability
                    this.ref(this._animActivePassive), // 1st : ctrl got activated  => the most likely happened
                ],
            }),

        // define an *animations* func:
        [this.decl(this._animFnOld)]: [
            ecssProps.anim,
            this.ref(this._animEnableDisable), // 5th : ctrl must be enabled
            this.ref(this._animActivePassive), // 4th : rarely happened => low probability
            this.ref(this._animHoverLeave),    // 3rd : cursor hovered over ctrl
            this.ref(this._animFocusBlur),     // 2nd : ctrl got focused (can interrupt hover/leave)
            this.ref(this._animPressRelease),  // 1st : ctrl got pressed (can interrupt focus/blur)
        ],
        //#endregion re-arrange the animFn at different states
    }}
}
export const styles = new ActionControlStylesBuilder();



// hooks:

export function useStatePressRelease(props: IndicationProps, classes = { active: 'press' as (string|null), actived: 'pressed' as (string|null), passive: 'release' as (string|null) }, mouses: string[]|null = ['click'], keys: string[]|null = ['space']) {
    // fn props:
    const propAccess  = usePropAccessibility<boolean, null>(props, undefined, null);
    const propEnabled = propAccess.enabled;
    const propActive  = propAccess.active;



    // states:
    const [activeDn, setActiveDn] = useState<boolean>(false); // uncontrollable (dynamic) state: true => user press, false => user release

    const stateActPass = useStateActivePassive({
        // other props:
        ...props,


        // accessibility:
        active        : undefined, // do not `.press`/`.release` when [active] (no *controllable active*)
        inheritActive : false,     // do not `.press`/`.release` when parent [active]


        // behaviors:
        actionCtrl    : true,      // always use actionCtrl implementation
    }, activeDn, classes);



    
    useEffect(() => {
        if (!propEnabled)        return; // control is disabled => no response required
        if (propActive !== null) return; // controllable [active] is set => no uncontrollable required



        const handlePassivating = () => {
            setActiveDn(false);
        }
        window.addEventListener('mouseup', handlePassivating);
        window.addEventListener('keyup',   handlePassivating);
        return () => {
            window.removeEventListener('mouseup', handlePassivating);
            window.removeEventListener('keyup',   handlePassivating);
        }
    }, [propEnabled, propActive]);



    const handleActivating = () => {
        if (!propEnabled)        return; // control is disabled => no response required
        if (propActive !== null) return; // controllable [active] is set => no uncontrollable required



        setActiveDn(true);
    }
    return {
        ...stateActPass,

        
        handleMouseDown : ((e) => { // for ActionControl
            if (!mouses || mouses.includes(e.type.toLowerCase())) handleActivating();
        }) as React.MouseEventHandler<HTMLElement>,
        handleKeyDown   : ((e) => { // for ActionControl
            if (!keys || keys.includes(e.code.toLowerCase()) || keys.includes(e.key.toLowerCase())) handleActivating();
        }) as React.KeyboardEventHandler<HTMLElement>,
    };
}



// react components:

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        Controls.ControlProps<TElement>
{
}
export default function ActionControl<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    // styles:
    const actCtrlStyles = styles.useStyles();

    
    
    // states:
    const statePrssRls  = useStatePressRelease(props);



    // jsx:
    return (
        <Control<TElement>
            // other props:
            {...props}


            // behaviors:
            actionCtrl={false} // turn off default actionCtrl behavior, use a new actionCtrl implementation


            // classes:
            mainClass={props.mainClass ?? actCtrlStyles.main}
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