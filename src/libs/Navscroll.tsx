// react (builds html using javascript):
import
    React, {
    useEffect,
    useReducer,
}                           from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    default  as ListGroup,
    ListGroupItem,
}                           from './ListGroup'
import type * as ListGroups from './ListGroup'

// other supports:
import deepEqual            from 'deep-equal'



// element utils:

class Viewport {
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
    public constructor(offsetLeft: number, offsetTop: number, viewLeft: number, viewTop: number, viewRight: number, viewBottom: number) {
        this.offsetLeft  = offsetLeft;
        this.offsetTop   = offsetTop;
        this.viewLeft    = viewLeft;
        this.viewTop     = viewTop;
        this.viewRight   = viewRight;
        this.viewBottom  = viewBottom;
    }
    public static create(accumViewport: Viewport|null, element: HTMLElement): Viewport {
        const offsetLeft = accumViewport?.offsetLeft ?? 0;
        const offsetTop  = accumViewport?.offsetTop  ?? 0;
        const viewLeft   = offsetLeft; // the viewLeft is initially the same as offsetLeft, and might shrinking over time every intersect
        const viewTop    = offsetTop;  // the viewTop  is initially the same as offsetTop,  and might shrinking over time every intersect
        const viewRight  = viewLeft   + element.clientWidth;
        const viewBottom = viewTop    + element.clientHeight;
        
        
        
        const viewport = new Viewport(
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



    // utils:
    public intersect(viewport: Viewport): Viewport {
        return new Viewport(
            this.offsetLeft,
            this.offsetTop,
            Math.max(this.viewLeft,   viewport.viewLeft),
            Math.max(this.viewTop,    viewport.viewTop),
            Math.min(this.viewRight,  viewport.viewRight),
            Math.min(this.viewBottom, viewport.viewBottom),
        );
    }
}

class Dimension {
    /**
     * Reference of the element.
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
    public static create(accumViewport: Viewport, element: HTMLElement): Dimension {
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



    // utils:
    public intersect(viewport: Viewport): Dimension {
        return new Dimension(
            this.element,

            Math.max(this.offsetLeft,   viewport.viewLeft),
            Math.max(this.offsetTop,    viewport.viewTop),
            Math.min(this.offsetRight,  viewport.viewRight),
            Math.min(this.offsetBottom, viewport.viewBottom),
        );
    }



    // dimensions:
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
            (
                // rare case:
                // consider zero width/height as visible if within the viewport:

                ((this.offsetLeft >= viewport.viewLeft) && (this.offsetRight  <= viewport.viewRight ))
                &&
                ((this.offsetTop  >= viewport.viewTop ) && (this.offsetBottom <= viewport.viewBottom))
            )
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

    public toViewport(accumViewport: Viewport|null): Viewport {
        const element = this.element;
        const [parentOffsetLeft, parentOffsetTop] = (() => { // compensation for non positioned parent element
            const parent = element.parentElement;
            if (!parent || ['relative', 'absolute'].includes(getComputedStyle(parent).position)) return [0, 0];

            return [
                parent.offsetLeft + parent.clientLeft,
                parent.offsetTop  + parent.clientTop,
            ];
        })();
        const offsetLeft = (accumViewport?.offsetLeft ?? 0) + (element.offsetLeft - parentOffsetLeft) + element.clientLeft - (element.parentElement?.scrollLeft ?? 0);
        const offsetTop  = (accumViewport?.offsetTop  ?? 0) + (element.offsetTop  - parentOffsetTop ) + element.clientTop  - (element.parentElement?.scrollTop  ?? 0);
        const viewLeft   = offsetLeft; // the viewLeft is initially the same as offsetLeft, and might shrinking over time every intersect
        const viewTop    = offsetTop;  // the viewTop  is initially the same as offsetTop,  and might shrinking over time every intersect
        const viewRight  = viewLeft   + element.clientWidth;
        const viewBottom = viewTop    + element.clientHeight;
        
        
        
        return (
            new Viewport(
                offsetLeft,
                offsetTop,
                viewLeft,
                viewTop,
                viewRight,
                viewBottom,
            )
            .intersect(
                new Viewport(
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

const findFirst = <T,R>(array: T[], predicate: (value: T) => R|null): [number, R]|null => {
    for (let index = 0; index < array.length; index++) {
        const result = predicate(array[index]);
        if (result) return [index, result]; // found
    } // for

    return null; // not found
}; 
const findLast = <T,R>(array: T[], predicate: (value: T) => R|null): [number, R]|null => {
    for (let index = array.length - 1; index >= 0; index--) {
        const result = predicate(array[index]);
        if (result) return [index, result]; // found
    } // for

    return null; // not found
};



// react components:

// Navscroll is just a ListGroup with dynamic :active on its children

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        ListGroups.Props<TElement>
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



            const getVisibleChildIndices = (parent: HTMLElement, accumViewport: Viewport|null = null, accumResults: number[] = []): number[] => {
                const viewport = Viewport.create(accumViewport, parent);
            
            
            
                const isFirstScroll =
                    (parent.scrollLeft <= 0.5)
                    &&
                    (parent.scrollTop  <= 0.5)
                    ;
                const isLastScroll =
                    !isFirstScroll
                    &&
                    (((parent.scrollWidth  - parent.clientWidth ) - parent.scrollLeft) <= 0.5)
                    &&
                    (((parent.scrollHeight - parent.clientHeight) - parent.scrollTop ) <= 0.5)
                    ;
                const children =
                    (() => {
                        const children = Array.from(parent.children) as HTMLElement[];
                        if (props.targetFilter) return children.filter(props.targetFilter);
                        return children;
                    })()
                    .map((child) => Dimension.create(/*parent: */viewport, /*element: */child))
                    ;
                const visibleChild = ((): [number, Dimension]|null => {
                    if (props.interpolation ?? true) {
                        return (
                            (isFirstScroll ? findFirst(children, (child) => child.isPartiallyVisible(viewport)) : null) // the first always win
                            ??
                            (isLastScroll  ? findLast(children, (child) => child.isPartiallyVisible(viewport))  : null) // the last always win
    
                            ??
    
                            findFirst(children, (child) => child.isFullyVisible(viewport)) // the (first) fully visible always win
    
                            ??
    
                            children
                            .map((child, index) => ({
                                child : child,
                                index : index, // add index, so we can track the original index after sorted
                            }))
                            .filter((item) => item.child.isPartiallyVisible(viewport)) // only visible children
                            .map((item) => ({...item,
                                area  : item.child.offsetWidth & item.child.offsetHeight, // calculates the visible area,
                            }))
                            .sort((a, b) => b.area - a.area) // sort from largest to narrowest
                            .map((item): [number, Dimension] => [item.index, item.child])
                            [0] // find the largest one
    
                            ??
    
                            null // not found
                        );
                    }
                    else {
                        return (
                            !isLastScroll
                            ?
                            findFirst(children, (child) => child.isPartiallyVisible(viewport)) // for the first scroll and middle scroll
                            :
                            findLast(children,  (child) => child.isPartiallyVisible(viewport)) // for the last scroll
                        );
                    } // if
                })();



                return visibleChild ? getVisibleChildIndices(visibleChild[1].element, visibleChild[1].toViewport(viewport), [...accumResults, visibleChild[0]]) : accumResults;
            }
            const visibleChildIndices = getVisibleChildIndices(parent);



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
                childList       : true,
                subtree         : true,

                attributes      : true,
                attributeFilter : ['style', 'class'],
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



    const itemHandleClick: React.MouseEventHandler<HTMLElement> = (e) => {
        e.preventDefault();
        console.log(e.target);
    }



    function mutateNestedNavscroll(props: Props, index: number, deepLevel: number) { return (
        <ListGroup
            // essentials:
            key={index}


            // other props:
            {...props}
        >
            { mutateListGroupItems(props.children, deepLevel) }
        </ListGroup>
    )}
    function mutateListGroupItem(props: ListGroups.Items.Props, index: number, deepLevel: number) { return (
        <ListGroupItem
            // essentials:
            key={index}


            // accessibility:
            active={index === activeIndices[deepLevel]}


            // events:
            onClick={(props.actionCtrl ?? false) ? itemHandleClick : undefined}


            // other props:
            {...props}
        >
            {props.children && (Array.isArray(props.children) ? props.children : [props.children]).map((child, index) => (
                (React.isValidElement<Props>(child) && (child.type === Navscroll) && (child.props.targetRef === undefined))
                ?
                mutateNestedNavscroll(child.props, index, deepLevel + 1)
                :
                child
            ))}
        </ListGroupItem>
    )}
    function mutateListGroupItems(children: React.ReactNode, deepLevel: number) { return (
        children && (Array.isArray(children) ? children : [children]).map((child, index) => (
            (React.isValidElement<ListGroups.Items.Props>(child) && (child.type === ListGroupItem))
            ?
            mutateListGroupItem(child.props, index, deepLevel)
            :
            <ListGroupItem
                // essentials:
                key={index}


                // behaviors:
                actionCtrl={true}

                
                // accessibility:
                active={index === activeIndices[deepLevel]}


                // events:
                onClick={itemHandleClick}
            >
                { child }
            </ListGroupItem>
        ))
    )}

    return (
        <ListGroup
            // other props:
            {...props}
        >
            { mutateListGroupItems(props.children, /*deepLevel: */0) }
        </ListGroup>
    );
}

export { ListGroupItem as NavscrollItem, ListGroupItem as Item }