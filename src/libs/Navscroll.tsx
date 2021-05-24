// react (builds html using javascript):
import
    React, {
    useEffect,
    useReducer,
}                           from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    default  as Listgroup,
    ListgroupItem,
}                           from './Listgroup'
import type * as Listgroups from './Listgroup'

// other supports:
import deepEqual            from 'deep-equal'



// element utils:

class Viewport {
    /**
     * Reference of the related element.
     */
    public readonly element    : HTMLElement

    /**
     * Left-position relative to the Navscroll's client rect.
     */
    public readonly offsetLeft : number
    /**
     * Top-position relative to the Navscroll's client rect.
     */
    public readonly offsetTop  : number

    /**
     * Left-position of the virtual viewport relative to the Navscroll's client rect.
     */
    public readonly viewLeft   : number
    /**
     * Top-position of the virtual viewport relative to the Navscroll's client rect.
     */
    public readonly viewTop    : number
    /**
     * Right-position of the virtual viewport relative to the Navscroll's client rect.
     */
    public readonly viewRight  : number
    /**
     * Bottom-position of the virtual viewport relative to the Navscroll's client rect.
     */
    public readonly viewBottom : number



    // constructors:
    public constructor(element: HTMLElement, offsetLeft: number, offsetTop: number, viewLeft: number, viewTop: number, viewRight: number, viewBottom: number) {
        this.element     = element;

        this.offsetLeft  = offsetLeft;
        this.offsetTop   = offsetTop;

        this.viewLeft    = viewLeft;
        this.viewTop     = viewTop;
        this.viewRight   = viewRight;
        this.viewBottom  = viewBottom;
    }
    public static from(element: HTMLElement, accumViewport: Viewport|null = null): Viewport {
        const offsetLeft = accumViewport?.offsetLeft ?? 0;
        const offsetTop  = accumViewport?.offsetTop  ?? 0;

        const viewLeft   = offsetLeft; // the viewLeft is initially the same as offsetLeft, and might shrinking over time every intersect
        const viewTop    = offsetTop;  // the viewTop  is initially the same as offsetTop,  and might shrinking over time every intersect
        const viewRight  = viewLeft + element.clientWidth;
        const viewBottom = viewTop  + element.clientHeight;
        
        
        
        const viewport = new Viewport(
            element,

            offsetLeft,
            offsetTop,

            viewLeft,
            viewTop,
            viewRight,
            viewBottom,
        );
        if (accumViewport) return viewport.intersect(accumViewport);
        return viewport;
    }



    // dimensions:
    public intersect(viewport: Viewport): Viewport {
        return new Viewport(
                     this.element,

                     this.offsetLeft,
                     this.offsetTop,

            Math.max(this.viewLeft,   viewport.viewLeft),
            Math.max(this.viewTop,    viewport.viewTop),
            Math.min(this.viewRight,  viewport.viewRight),
            Math.min(this.viewBottom, viewport.viewBottom),
        );
    }



    // scrolls:
    public get isFirstScroll(): boolean {
        const element = this.element;

        return (
            (element.scrollLeft <= 0.5)
                &&
            (element.scrollTop  <= 0.5)
        );
    }
    public get isLastScroll(): boolean {
        const element = this.element;

        return (
            !this.isFirstScroll // if scrollPos satisfied the first & the last => the first win
            &&
            (((element.scrollWidth  - element.clientWidth ) - element.scrollLeft) <= 0.5)
            &&
            (((element.scrollHeight - element.clientHeight) - element.scrollTop ) <= 0.5)
        );
    }



    // children:
    public children(targetFilter?: (e: HTMLElement) => boolean): Dimension[] {
        return (
            (() => {
                const children = Array.from(this.element.children) as HTMLElement[];
                if (targetFilter) return children.filter(targetFilter);
                return children;
            })()
            .map((child) => Dimension.from(/*element: */child, /*accumViewport: */this))
        );
    }
}

class Dimension {
    /**
     * Reference of the related element.
     */
    public readonly element      : HTMLElement

    /**
     * Left-position of the outer element relative to the Navscroll's client rect.
     */
    public readonly offsetLeft   : number
    /**
     * Top-position of the outer element relative to the Navscroll's client rect.
     */
    public readonly offsetTop    : number
    /**
     * Right-position of the outer element relative to the Navscroll's client rect.
     */
    public readonly offsetRight  : number
    /**
     * Bottom-position of the outer element relative to the Navscroll's client rect.
     */
    public readonly offsetBottom : number



    // constructors:
    protected constructor(element: HTMLElement, offsetLeft: number, offsetTop: number, offsetRight: number, offsetBottom: number) {
        this.element       = element;

        this.offsetLeft    = offsetLeft;
        this.offsetTop     = offsetTop;
        this.offsetRight   = offsetRight;
        this.offsetBottom  = offsetBottom;
    }
    public static from(element: HTMLElement, accumViewport: Viewport): Dimension {
        const [parentOffsetLeft, parentOffsetTop] = (() => { // compensation for non positioned parent element
            const parent = element.parentElement;
            if (!parent || ['relative', 'absolute'].includes(getComputedStyle(parent).position)) return [0, 0];

            return [
                parent.offsetLeft + parent.clientLeft,
                parent.offsetTop  + parent.clientTop,
            ];
        })();
        const offsetLeft   = accumViewport.offsetLeft + (element.offsetLeft - parentOffsetLeft) - (element.parentElement?.scrollLeft ?? 0);
        const offsetTop    = accumViewport.offsetTop  + (element.offsetTop  - parentOffsetTop ) - (element.parentElement?.scrollTop  ?? 0);
        const offsetRight  = offsetLeft + element.offsetWidth;
        const offsetBottom = offsetTop  + element.offsetHeight;


        
        return new Dimension(
            element,

            offsetLeft,
            offsetTop,
            offsetRight,
            offsetBottom,
        );
    }



    // dimensions:
    public intersect(viewport: Viewport): Dimension {
        return new Dimension(
                     this.element,

            Math.max(this.offsetLeft,   viewport.viewLeft),
            Math.max(this.offsetTop,    viewport.viewTop),
            Math.min(this.offsetRight,  viewport.viewRight),
            Math.min(this.offsetBottom, viewport.viewBottom),
        );
    }



    public get offsetWidth() {
        return this.offsetRight - this.offsetLeft;
    }
    public get offsetHeight() {
        return this.offsetBottom - this.offsetTop;
    }

    public within(viewport: Viewport): boolean {
        return (
            ((this.offsetLeft >= viewport.viewLeft) && (this.offsetRight  <= viewport.viewRight ))
            &&
            ((this.offsetTop  >= viewport.viewTop ) && (this.offsetBottom <= viewport.viewBottom))
        );
    }
    public isPartiallyVisible(viewport: Viewport): Dimension|null {
        const intersected = this.intersect(viewport);

        if (
            (
                // intersected child is still considered visible if has positive width && positive height

                (intersected.offsetWidth > 0) // width
                &&
                (intersected.offsetHeight > 0) // height
            )
            ||
            // rare case:
            // consider zero width/height as visible if within the viewport:
            this.within(viewport)
        ) return intersected;

        return null;
    }
    public isFullyVisible(viewport: Viewport): Dimension|null {
        const intersected = this.intersect(viewport);

        // true if the rect is still the same as original
        if (
            (this.offsetLeft   === intersected.offsetLeft)
            &&
            (this.offsetTop    === intersected.offsetTop)
            &&
            (this.offsetRight  === intersected.offsetRight)
            &&
            (this.offsetBottom === intersected.offsetBottom)
        ) return this;

        return null;
    }

    public toViewport(accumViewport: Viewport): Viewport {
        const element = this.element;

        const [parentOffsetLeft, parentOffsetTop] = (() => { // compensation for non positioned parent element
            const parent = element.parentElement;
            if (!parent || ['relative', 'absolute'].includes(getComputedStyle(parent).position)) return [0, 0];

            return [
                parent.offsetLeft + parent.clientLeft,
                parent.offsetTop  + parent.clientTop,
            ];
        })();
        const offsetLeft = accumViewport?.offsetLeft + (element.offsetLeft - parentOffsetLeft) + element.clientLeft - (element.parentElement?.scrollLeft ?? 0);
        const offsetTop  = accumViewport?.offsetTop  + (element.offsetTop  - parentOffsetTop ) + element.clientTop  - (element.parentElement?.scrollTop  ?? 0);

        const viewLeft   = offsetLeft; // the viewLeft is initially the same as offsetLeft, and might shrinking over time every intersect
        const viewTop    = offsetTop;  // the viewTop  is initially the same as offsetTop,  and might shrinking over time every intersect
        const viewRight  = viewLeft + element.clientWidth;
        const viewBottom = viewTop  + element.clientHeight;
        
        
        
        return (
            new Viewport( // maximum of borderless full view
                element,

                offsetLeft,
                offsetTop,

                viewLeft,
                viewTop,
                viewRight,
                viewBottom,
            )
            .intersect( // intersect with (remaining) shrinking current view
                new Viewport(
                    element,

                    0,
                    0,
    
                    this.offsetLeft,
                    this.offsetTop,
                    this.offsetRight,
                    this.offsetBottom,
                )
            )
        );
    }
}

const findFirst = <T,R>(array: T[], predicate: (value: T) => R|null): [R, number]|null => {
    for (let index = 0; index < array.length; index++) {
        const result = predicate(array[index]);
        if (result) return [result, index]; // found
    } // for

    return null; // not found
}; 
const findLast  = <T,R>(array: T[], predicate: (value: T) => R|null): [R, number]|null => {
    for (let index = array.length - 1; index >= 0; index--) {
        const result = predicate(array[index]);
        if (result) return [result, index]; // found
    } // for

    return null; // not found
};



// react components:

// Navscroll is just a Listgroup with dynamic :active on its children

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        Listgroups.Props<TElement>
{
    // scrolls:
    targetRef?       : React.MutableRefObject<HTMLElement|null>
    targetFilter?    : (e: HTMLElement) => boolean
    interpolation?   : boolean


    // accessibility:
    readOnly?        : boolean
}
export default function Navscroll<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    const [activeIndices, setActiveIndices] = useReducer((indices: number[], newIndices: number[]): number[] => {
        if (deepEqual(newIndices, indices)) return indices; // already the same, use the old as by-reference
        return newIndices; // update with the new one
    }, []);



    useEffect(() => {
        const target = props.targetRef?.current;
        const handleScroll = () => {
            const parent = target;
            if (!parent) return;



            const getVisibleChildIndices = (viewport: Viewport, accumResults: number[] = []): number[] => {
                const children = viewport.children(props.targetFilter);
                const visibleChild = ((): [Dimension, number]|null => {
                    if (props.interpolation ?? true) {
                        return (
                            // at the end of scroll, the last section always win:
                            (viewport.isLastScroll ? findLast( children, (child) => child.isPartiallyVisible(viewport)) : null)
    
                            ??
    
                            // the first uncropped section always win:
                            findFirst(children, (child) => child.isFullyVisible(viewport))
    
                            ??
    
                            // the biggest cropped section always win:
                            children
                            .map((child, index) => ({
                                child : child,
                                index : index, // add index, so we can track the original index after sorted
                            }))
                            .filter((item) => item.child.isPartiallyVisible(viewport)) // only visible children
                            .map((item) => ({...item,
                                area  : item.child.offsetWidth * item.child.offsetHeight, // calculates the visible area,
                            }))
                            .sort((a, b) => b.area - a.area) // sort from biggest to smallest
                            .map((item): [Dimension, number] => [item.child, item.index])
                            [0] // find the biggest one
    
                            ??
    
                            // no winner:
                            null
                        );
                    }
                    else {
                        return (
                            // at the end of scroll, the last section always win:
                            (viewport.isLastScroll ? findLast( children, (child) => child.isPartiallyVisible(viewport)) : null)

                            ??

                            // the first visible (cropped/uncropped) section always win:
                            findFirst(children, (child) => child.isPartiallyVisible(viewport))
                        );
                    } // if
                })();


                return visibleChild ? getVisibleChildIndices(visibleChild[0].toViewport(viewport), [...accumResults, visibleChild[1]]) : accumResults;
            }
            const visibleChildIndices = getVisibleChildIndices(Viewport.from(/*element: */parent));



            setActiveIndices(visibleChildIndices);
        };
        if (target) {
            handleScroll(); // trigger for the first time
            target.addEventListener('scroll', handleScroll);
            window.addEventListener('resize', handleScroll);

            
            
            const attachDescendants = (): (() => void) => {
                const descendants = ((): HTMLElement[] => {
                    const descendants = Array.from(target.querySelectorAll('*')) as HTMLElement[];
                    if (props.targetFilter) return descendants.filter(props.targetFilter);
                    return descendants;
                })();
                descendants.forEach((d) => d.addEventListener('scroll', handleScroll));



                // cleanups:
                return () => {
                    descendants.forEach((d) => d.removeEventListener('scroll', handleScroll));
                }
            }
            let detachDescendants: (() => void)|null = null;
            const reAttachDescendants = (): void => {
                detachDescendants?.(); // detach
                detachDescendants = attachDescendants(); // (re)attach
            }
            reAttachDescendants();
            const observer = new MutationObserver(reAttachDescendants);
            observer.observe(target, {
                childList  : true,
                subtree    : true,

                attributes : true,
            });
            
            
                    
            // cleanups:
            return () => {
                target.removeEventListener('scroll', handleScroll);
                window.removeEventListener('resize', handleScroll);

                
                
                observer.disconnect();
                detachDescendants?.(); // detach
            };
        } // if
    }, [props.targetRef, props.targetFilter, props.interpolation]);



    const itemHandleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, deepLevelsCurrent: number[]) => {
        e.preventDefault();



        const target = props.targetRef?.current;
        if (!target) return;
        let viewport = Viewport.from(target);
        const max = deepLevelsCurrent.length - 1;
        for (let i = 0; i <= max; i++) {
            const desiredIndex = deepLevelsCurrent[i];

            const children     = viewport.children(props.targetFilter);
            const desiredChild = children[desiredIndex] as (Dimension|undefined);
            if (!desiredChild) break;

            if (i < max) {
                let viewportNew    = desiredChild.toViewport(viewport);

                const parent       = viewportNew.element.parentElement!;
                parent.scrollLeft += viewportNew.offsetLeft;
                parent.scrollTop  += viewportNew.offsetTop;

                viewportNew        = desiredChild.toViewport(viewport);

                viewport = viewportNew;

                continue;
            }
            else {
                const parent       = desiredChild.element.parentElement!;
                const __prevScroll = parent.scrollTop;
                parent.scrollLeft += desiredChild.offsetLeft;
                parent.scrollTop  += desiredChild.offsetTop;
                const __currScroll = parent.scrollTop;
                console.log(`scrolled: ${__currScroll - __prevScroll}, unscrolled: ${desiredChild.offsetTop - (__currScroll - __prevScroll)}`);

                break;
            } // if
        } // for
    }



    function mutateNestedNavscroll(nestNavProps: Props, index: number, deepLevelsParent: number[]) { return (
        <Listgroup
            // essentials:
            key={index}


            // inherits:
            {...props}


            // other props:
            {...nestNavProps}
        >
            { mutateListgroupItems(nestNavProps.children, /*deepLevelsParent: */deepLevelsParent) }
        </Listgroup>
    )}
    function mutateListgroupItems(children: React.ReactNode, deepLevelsParent: number[]) { return (
        children && (Array.isArray(children) ? children : [children]).map((child, index) => {
            const deepLevelsCurrent = [...deepLevelsParent, index];

            return (
                (React.isValidElement<Listgroups.Items.Props>(child) && (child.type === ListgroupItem))
                ?
                <ListgroupItem
                    // essentials:
                    key={index}


                    // accessibility:
                    active={index === activeIndices[deepLevelsCurrent.length - 1]}


                    // events:
                    onClick={(child.props.actionCtrl ?? false) ? (child.props.onClick ?? ((e) => {
                        itemHandleClick(e, deepLevelsCurrent);
                    })) : undefined}


                    // other props:
                    {...child.props}
                >
                    {child.props.children && (Array.isArray(child.props.children) ? child.props.children : [child.props.children]).map((child, index) => (
                        (React.isValidElement<Props>(child) && (child.type === Navscroll) && (child.props.targetRef === undefined))
                        ?
                        mutateNestedNavscroll(child.props, index, /*deepLevelsParent: */deepLevelsCurrent)
                        :
                        child
                    ))}
                </ListgroupItem>
                :
                <ListgroupItem
                    // essentials:
                    key={index}


                    // behaviors:
                    actionCtrl={true}

                    
                    // accessibility:
                    active={index === activeIndices[deepLevelsCurrent.length - 1]}


                    // events:
                    onClick={(e) => {
                        itemHandleClick(e, deepLevelsCurrent);
                    }}
                >
                    { child }
                </ListgroupItem>
            );
        })
    )}

    return (
        <Listgroup
            // other props:
            {...props}
        >
            { mutateListgroupItems(props.children, /*deepLevelsParent: */[]) }
        </Listgroup>
    );
}

export { ListgroupItem as NavscrollItem, ListgroupItem as Item }

type OrientationStyle = Listgroups.OrientationStyle
type ListStyle        = Listgroups.ListStyle
export type { OrientationStyle, ListStyle }