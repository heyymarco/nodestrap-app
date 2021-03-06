// react (builds html using javascript):
import {
    default as React,
    useReducer,
    useEffect,
}                           from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // utils:
    isTypeOf,
}                           from './nodestrap'  // nodestrap's core
import {
    OrientationStyle,
    VariantOrientation,

    ListStyle,
    VariantList,

    ListgroupProps,
    Listgroup,

    ListgroupItemProps,
    ListgroupItem,
}                           from './Listgroup'



// utils:

export class Viewport {
    /**
     * Reference of the related `HTMLElement`.
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
    public static from(element: HTMLElement, viewport: Viewport|null = null): Viewport {
        const offsetLeft = (viewport?.offsetLeft ?? 0);
        const offsetTop  = (viewport?.offsetTop  ?? 0);

        const viewLeft   = offsetLeft; // the viewLeft is initially the same as offsetLeft, and might shrinking over time every intersect
        const viewTop    = offsetTop;  // the viewTop  is initially the same as offsetTop,  and might shrinking over time every intersect
        const viewRight  = viewLeft + element.clientWidth;
        const viewBottom = viewTop  + element.clientHeight;
        
        
        
        const viewport2 = new Viewport(
            element,

            offsetLeft,
            offsetTop,

            viewLeft,
            viewTop,
            viewRight,
            viewBottom,
        );
        if (viewport) return viewport2.intersect(viewport);
        return viewport2;
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
            .map((child) => Dimension.from(/*element: */child, /*viewport: */this))
        );
    }
}

export class Dimension {
    /**
     * Reference of the related `Viewport`.
     */
    public readonly viewport     : Viewport|null
    /**
     * Reference of the related `HTMLElement`.
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
    protected constructor(viewport: Viewport|null, element: HTMLElement, offsetLeft: number, offsetTop: number, offsetRight: number, offsetBottom: number) {
        this.viewport     = viewport;
        this.element      = element;

        this.offsetLeft   = offsetLeft;
        this.offsetTop    = offsetTop;
        this.offsetRight  = offsetRight;
        this.offsetBottom = offsetBottom;
    }
    public static from(element: HTMLElement, viewport: Viewport|null = null): Dimension {
        const [parentOffsetLeft, parentOffsetTop] = (() => { // compensation for non positioned parent element
            const parent = element.parentElement;
            if (!parent || (parent === element.offsetParent)) return [0, 0];

            return [
                parent.offsetLeft + parent.clientLeft,
                parent.offsetTop  + parent.clientTop,
            ];
        })();
        const offsetLeft   = (viewport?.offsetLeft ?? 0) + (element.offsetLeft - parentOffsetLeft) - (element.parentElement?.scrollLeft ?? 0);
        const offsetTop    = (viewport?.offsetTop  ?? 0) + (element.offsetTop  - parentOffsetTop ) - (element.parentElement?.scrollTop  ?? 0);
        const offsetRight  = offsetLeft + element.offsetWidth;
        const offsetBottom = offsetTop  + element.offsetHeight;


        
        return new Dimension(
            viewport,
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
                     this.viewport,
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

    public toViewport(): Viewport {
        const element    = this.element;

        const [parentOffsetLeft, parentOffsetTop] = (() => { // compensation for non positioned parent element
            const parent = element.parentElement;
            if (!parent || (parent === element.offsetParent)) return [0, 0];

            return [
                parent.offsetLeft + parent.clientLeft,
                parent.offsetTop  + parent.clientTop,
            ];
        })();
        const offsetLeft = (this.viewport?.offsetLeft ?? 0) + (element.offsetLeft - parentOffsetLeft) - (element.parentElement?.scrollLeft ?? 0) + element.clientLeft;
        const offsetTop  = (this.viewport?.offsetTop  ?? 0) + (element.offsetTop  - parentOffsetTop ) - (element.parentElement?.scrollTop  ?? 0) + element.clientTop;

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

/*
    Navscroll is just a Listgroup with *manipulated active* on its items
*/

// ListgroupItem => NavscrollItem
export type { ListgroupItemProps, ListgroupItemProps as NavscrollItemProps, ListgroupItemProps as ItemProps }
export { ListgroupItem, ListgroupItem as NavscrollItem, ListgroupItem as Item }



export interface NavscrollProps<TElement extends HTMLElement = HTMLElement>
    extends
        ListgroupProps<TElement>
{
    // scrolls:
    targetRef?       : React.RefObject<HTMLElement> // getter ref
    targetFilter?    : (e: HTMLElement) => boolean
    interpolation?   : boolean
}
export default function Navscroll<TElement extends HTMLElement = HTMLElement>(props: NavscrollProps<TElement>) {
    // states:
    const [activeIndices, setActiveIndices] = useReducer((indices: number[], newIndices: number[]): number[] => {
        if (((): boolean => {
            if (newIndices.length !== indices.length) return false; // difference detected

            for (let i = 0; i < newIndices.length; i++) {
                if (newIndices[i] !== indices[i]) return false; // difference detected
            } // for

            return true; // no differences detected
        })()) return indices; // already the same, use the old as by-reference

        return newIndices; // update with the new one
    }, []);



    // dom effects:
    useEffect(() => {
        const target = props.targetRef?.current;
        if (!target) return; // target was not set => nothing to do



        // functions:
        const handleUpdate = async () => { // keeps the UI responsive (not blocking) while handling the event
            const getVisibleChildIndices = (viewport: Viewport, accumResults: number[] = []): number[] => {
                const children = viewport.children(props.targetFilter);
                const visibleChild = ((): [Dimension, number]|null => {
                    if (props.interpolation ?? true) {
                        return (
                            // at the end of scroll, the last section always win:
                            (viewport.isLastScroll ? findLast(children, (child) => child.isPartiallyVisible(viewport)) : null)
    
                            ??
    
                            // the first uncropped section always win:
                            findFirst(children, (child) => child.isFullyVisible(viewport))
    
                            ??
    
                            // the biggest cropped section always win:
                            children
                            .map((child, index) => {
                                const partialVisible = child.isPartiallyVisible(viewport);

                                return {
                                    partialVisible : partialVisible,

                                    visibleArea    : partialVisible
                                                     ?
                                                     (partialVisible.offsetWidth * partialVisible.offsetHeight) // calculates the visible area
                                                     :
                                                     0
                                                     ,

                                    index          : index, // add index, so we can track the original index after sorted
                                };
                            })
                            .filter((item) => item.partialVisible) // only visible children
                            .sort((a, b) => b.visibleArea - a.visibleArea) // sort from biggest to smallest
                            .map((item): [Dimension, number] => [item.partialVisible!, item.index])
                            [0] // find the biggest one
    
                            ??
    
                            // no winner:
                            null
                        );
                    }
                    else {
                        return (
                            // at the end of scroll, the last section always win:
                            (viewport.isLastScroll ? findLast(children, (child) => child.isPartiallyVisible(viewport)) : null)

                            ??

                            // the first visible (cropped/uncropped) section always win:
                            findFirst(children, (child) => child.isPartiallyVisible(viewport))
                        );
                    } // if
                })();


                return visibleChild ? getVisibleChildIndices(visibleChild[0].toViewport(), [...accumResults, visibleChild[1]]) : accumResults;
            }
            const visibleChildIndices = getVisibleChildIndices(Viewport.from(/*element: */target));



            setActiveIndices(visibleChildIndices);
        };



        // update for the first time:
        (async () => {
            await handleUpdate();
        })();



        //#region update in the future
        //#region when descendants resized
        let initialResizeEvent : boolean|null = null;
        const resizeObserver = ResizeObserver ? new ResizeObserver(async (entries) => {
            // ignores the insertion dom event:
            if (initialResizeEvent) {
                initialResizeEvent = false;
                return;
            } // if



            // ignores the removal dom event:
            const descendants = entries.map((e) => e.target as HTMLElement).filter((descendant) => {
                if (target.parentElement) { // target is still exist on the document
                    // check if the descendant is target itself or the descendant of target
                    let parent: HTMLElement|null = descendant;
                    do {
                        if (parent === target) return true; // confirmed

                        // let's try again:
                        parent = parent.parentElement;
                    } while (parent)
                } // if

                
                
                resizeObserver?.unobserve(descendant); // no longer exist => remove from observer
                return false; // not the descendant of target
            });
            if (!descendants.length) return; // no existing descendants => nothing to do



            // update after being resized:
            await handleUpdate();
        }) : null;
        //#endregion when descendants resized

        
        
        //#region when descendants added/removed
        const attachDescendants = (): (() => void) => {
            const descendants = ((): HTMLElement[] => {
                const descendants = Array.from(target.querySelectorAll('*')) as HTMLElement[];
                if (props.targetFilter) return [target, ...descendants.filter(props.targetFilter)];
                return [target, ...descendants];
            })();
            descendants.forEach((descendant) => {
                // update in the future:
                descendant.addEventListener('scroll', handleUpdate);
                initialResizeEvent = true; // prevent the insertion dom event
                resizeObserver?.observe(descendant, { box: 'border-box' });
            });



            // cleanups:
            return () => {
                descendants.forEach((descendant) => {
                    // stop updating in the future:
                    descendant.removeEventListener('scroll', handleUpdate);
                    resizeObserver?.unobserve(descendant);
                });
            }
        }
        let detachDescendants: (() => void)|null = null;
        const reAttachDescendants = (): void => {
            detachDescendants?.(); // detach
            detachDescendants = attachDescendants(); // (re)attach
        }
        reAttachDescendants();
        const mutationObserver = MutationObserver ? new MutationObserver(async () => {
            // update after being added/removed:
            await handleUpdate();

            // update in the future:
            reAttachDescendants();
        }) : null;
        if (mutationObserver) {
            mutationObserver.observe(target, { // watch for DOM structure changes
                childList  : true,  // watch for child's DOM structure changes
                subtree    : true,  // watch for grandchild's DOM structure changes

                attributes : false, // don't care for any attribute changes
            });
        } // if
        //#endregion when descendants added/removed
        //#endregion update in the future
        
        
                
        // cleanups:
        return () => {
            resizeObserver?.disconnect();
            mutationObserver?.disconnect();
            detachDescendants?.(); // detach
        };
    }, [props.targetRef, props.targetFilter, props.interpolation]);



    // handlers:
    const itemHandleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, deepLevelsCurrent: number[]) => {
        e.stopPropagation(); // do not bubbling click event to Navscroll's parent



        const target = props.targetRef?.current;
        if (!target) return;
        
        
        
        const targetChildrenReverse = (() => {
            const targetChildren: Dimension[] = [];

            
            
            let viewport = Viewport.from(target);
            for (const targetChildIndex of deepLevelsCurrent) {
                // inspects:
                const children    = viewport.children(props.targetFilter);
                const targetChild = children[targetChildIndex] as (Dimension|undefined);
                if (!targetChild) break;

                
                
                // updates:
                targetChildren.push(targetChild);
                viewport = targetChild.toViewport();
            } // for

            
            
            return targetChildren;
        })()
        .reverse()
        ;
        if (targetChildrenReverse.length === 0) return;



        let [remainingScrollLeft, remainingScrollTop] = [
            targetChildrenReverse[0].offsetLeft,
            targetChildrenReverse[0].offsetTop
        ];



        for (const targetChild of targetChildrenReverse) {
            if (!remainingScrollLeft && !remainingScrollTop) break;

            
            
            const viewport = targetChild.viewport;
            if (!viewport) break;

            
            
            const [maxDeltaScrollLeft, maxDeltaScrollTop] = (() => {
                const parent = viewport.element;
                if (!parent) return [0, 0];

                return [
                    (parent.scrollWidth  - parent.clientWidth ) - parent.scrollLeft,
                    (parent.scrollHeight - parent.clientHeight) - parent.scrollTop,
                ];
            })();

            const [deltaScrollLeft, deltaScrollTop] = [
                Math.min(remainingScrollLeft - (viewport.offsetLeft ?? 0), maxDeltaScrollLeft),
                Math.min(remainingScrollTop  - (viewport.offsetTop  ?? 0), maxDeltaScrollTop ),
            ];

            
            
            // viewport.element.scrollLeft += deltaScrollLeft;
            // viewport.element.scrollTop  += deltaScrollTop;
            viewport.element.scrollBy({
                left     : deltaScrollLeft,
                top      : deltaScrollTop,
                behavior : 'smooth',
            });

            
            
            remainingScrollLeft         -= deltaScrollLeft;
            remainingScrollTop          -= deltaScrollTop;
        } // for
    }



    // jsx functions:
    function mutateNestedNavscroll(nestNavProps: NavscrollProps, key: React.Key|null, deepLevelsParent: number[]) { return (
        <Listgroup
            // other props:
            {...((): {} => {
                const combinedProps: { [name: string]: any } = { ...props };

                for (const [name, value] of Object.entries(nestNavProps)) {
                    if (value === undefined) continue;

                    combinedProps[name] = value;
                } // for

                return combinedProps;
            })()}


            // essentials:
            key={key}
        >
            { mutateListgroupItems(nestNavProps.children, /*deepLevelsParent: */deepLevelsParent) }
        </Listgroup>
    )}
    function mutateListgroupItems(children: React.ReactNode, deepLevelsParent: number[]) { return (
        children && (Array.isArray(children) ? children : [children]).map((child, index) => {
            const deepLevelsCurrent = [...deepLevelsParent, index];

            return (
                isTypeOf(child, ListgroupItem)
                ?
                <child.type
                    // other props:
                    {...child.props}


                    // essentials:
                    key={child.key ?? index}


                    // accessibility:
                    active={child.props.active ?? (index === activeIndices[deepLevelsCurrent.length - 1])}


                    // events:
                    onClick={(e) => {
                        // backwards:
                        child.props.onClick?.(e);
                        
                        
                        
                        if (!e.defaultPrevented) {
                            if (child.props.actionCtrl ?? props.actionCtrl ?? false) {
                                itemHandleClick(e, deepLevelsCurrent);
                                e.preventDefault();
                            } // if
                        } // if
                    }}
                >
                    {child.props.children && (Array.isArray(child.props.children) ? child.props.children : [child.props.children]).map((child, index) => (
                        (isTypeOf(child, Navscroll) && (child.props.targetRef === undefined))
                        ?
                        mutateNestedNavscroll(child.props, child.key ?? index, /*deepLevelsParent: */deepLevelsCurrent)
                        :
                        child
                    ))}
                </child.type>
                :
                <ListgroupItem
                    // essentials:
                    key={index}

                    
                    // accessibility:
                    active={(index === activeIndices[deepLevelsCurrent.length - 1])}


                    // events:
                    onClick={(e) => {
                        if (props.actionCtrl ?? false) {
                            itemHandleClick(e, deepLevelsCurrent);
                        } // if
                    }}
                >
                    { child }
                </ListgroupItem>
            );
        })
    )}



    // jsx:
    return (
        <Listgroup
            // other props:
            {...props}
        >
            { mutateListgroupItems(props.children, /*deepLevelsParent: */[]) }
        </Listgroup>
    );
}
Navscroll.prototype = Listgroup.prototype; // mark as Listgroup compatible
export { Navscroll }

export type { OrientationStyle, VariantOrientation }
export type { ListStyle, VariantList }