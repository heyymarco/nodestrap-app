// react (builds html using javascript):
import
    React, {
    useState,
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



// react components:

// Navscroll is just a ListGroup with dynamic :active on its children

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        ListGroups.Props<TElement>
{
    // scrolls:
    targetRef?       : React.MutableRefObject<HTMLElement|null>
    interpolation?   : boolean


    // accessibility:
    readOnly?        : boolean
}
export default function Navscroll<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    const [activeIndex, setActiveIndex]     = useState(-1);
    const [activeIndices, setActiveIndices] = useReducer((indices: number[], newIndices: number[]): number[] => {
        if (deepEqual(newIndices, indices)) return indices; // already the same, use the old as by-reference
        return newIndices; // update with the new one
    }, []);



    useEffect(() => {
        const target = props.targetRef?.current;
        const handleScroll = () => {
            const parent = target;
            if (!parent) return;



            type ElementRect = {
                readonly left   : number
                readonly top    : number
                readonly right  : number
                readonly bottom : number
            };
            const getVisibleChildIndices = (parent: HTMLElement, parentViewportRect?: ElementRect, prevResults: number[] = []): number[] => {
                const [parentOffsetLeft, parentOffsetTop] = (() => {
                    const parentStyle = getComputedStyle(parent);
                    if (['relative', 'absolute'].includes(parentStyle.position)) return [0, 0];
    
                    return [
                        parent.offsetLeft + Number.parseInt(parentStyle.borderInlineStartWidth),
                        parent.offsetTop  + Number.parseInt(parentStyle.borderBlockStartWidth),
                    ];
                })();
                const getChildRect = (child: HTMLElement): ElementRect => {
                    const left   = child.offsetLeft - parentOffsetLeft; // the distance between parent's inner border & child's outher border at [scrollLeft=0]
                    const top    = child.offsetTop  - parentOffsetTop;  // the distance between parent's inner border & child's outher border at [scrollTop=0]
                    const right  = left + child.offsetWidth;
                    const bottom = top  + child.offsetHeight;
    
                    return {
                        left   : left,
                        top    : top,
                        right  : right,
                        bottom : bottom,
                    };
                };
                
                
                
                // viewport rect:
                const intersectRect = (rectA: ElementRect, rectB: ElementRect) => ({
                    left   : Math.max(rectA.left,   rectB.left),
                    right  : Math.min(rectA.right,  rectB.right),
                    top    : Math.max(rectA.top,    rectB.top),
                    bottom : Math.min(rectA.bottom, rectB.bottom),
                });
                const viewportRect = (() => {
                    const rect = {
                        left   : parent.scrollLeft,
                        top    : parent.scrollTop,
                        right  : parent.scrollLeft + parent.clientWidth,  // the inner width,  includes [paddings], excludes [margins, borders, scrollbars]
                        bottom : parent.scrollTop  + parent.clientHeight, // the inner height, includes [paddings], excludes [margins, borders, scrollbars]
                    };

                    if (parentViewportRect) return intersectRect(rect, parentViewportRect);
                    return rect;
                })();
                const getVisibleChildRect = (childRect: ElementRect) => intersectRect(childRect, viewportRect);
                
                
                
                const isPartiallyVisible = (child: HTMLElement): ElementRect|null => {
                    // child rect:
                    const childRect        = getChildRect(child);
    
                    // visible child rect within the viewport:
                    const visibleChildRect = getVisibleChildRect(childRect);
    
    
                    
                    if (
                        (
                            // cropped child is still considered visible if has positive width && positive height

                            (visibleChildRect.left < visibleChildRect.right) // width
                            &&
                            (visibleChildRect.top < visibleChildRect.bottom) // height
                        )
                        ||
                        (
                            // rare case:
                            // consider zero width/height as visible if within the viewport:

                            ((childRect.left >= viewportRect.left) && (childRect.right  <= viewportRect.right ))
                            &&
                            ((childRect.top  >= viewportRect.top ) && (childRect.bottom <= viewportRect.bottom))
                        )
                    ) return visibleChildRect;

                    return null;
                };
                const isFullyVisible = (child: HTMLElement): ElementRect|null => {
                    // child rect:
                    const childRect        = getChildRect(child);
    
                    // visible child rect within the viewport:
                    const visibleChildRect = getVisibleChildRect(childRect);



                    // true if not cropped (the size is still the same as original)
                    if (
                        (childRect.left   === visibleChildRect.left)
                        &&
                        (childRect.right  === visibleChildRect.right)
                        &&
                        (childRect.top    === visibleChildRect.top)
                        &&
                        (childRect.bottom === visibleChildRect.bottom)
                    ) return visibleChildRect;

                    return null;
                };
                const findFirst = <T,R>(array: T[], predicate: (value: T) => R|null): [T, number, R]|null => {
                    for (let index = 0; index < array.length; index++) {
                        const result = predicate(array[index]);
                        if (result) return [array[index], index, result]; // found
                    } // for

                    return null; // not found
                }; 
                const findLast = <T,R>(array: T[], predicate: (value: T) => R|null): [T, number, R]|null => {
                    for (let index = array.length - 1; index >= 0; index--) {
                        const result = predicate(array[index]);
                        if (result) return [array[index], index, result]; // found
                    } // for

                    return null; // not found
                };
                
                
                
                const visibleChild = ((): [HTMLElement, number, ElementRect]|null => {
                    const isFirstScroll =
                        (viewportRect.left === 0)
                        &&
                        (viewportRect.top  === 0)
                        ;
                    const isLastScroll =
                        (((parent.scrollWidth  - parent.clientWidth ) - viewportRect.left) <= 0.5)
                        &&
                        (((parent.scrollHeight - parent.clientHeight) - viewportRect.top) <= 0.5)
                        ;
                    const children = Array.from(parent.children) as HTMLElement[];
                    
                    if (props.interpolation ?? true) {
                        return (
                            (isFirstScroll ? findFirst(children, isPartiallyVisible) : null) // the first always win
                            ??
                            (isLastScroll  ? findLast(children, isPartiallyVisible)  : null) // the last always win
    
                            ??
    
                            findFirst(children, isFullyVisible) // the (first) fully visible always win
    
                            ??
    
                            children
                            .map((child, index) => ({
                                child : child,
                                index : index, // add index, so we can track the original index after sorted
                                rect  : isPartiallyVisible(child),
                            }))
                            .filter((item) => (item.rect !== null)) // only visible children
                            .map((item) => ({...item,
                                area  : (item.rect!.right - item.rect!.left) * (item.rect!.bottom - item.rect!.top), // calculates the visible area,
                            }))
                            .sort((a, b) => b.area - a.area) // sort from largest to narrowest
                            .map((item): [HTMLElement, number, ElementRect] => [item.child, item.index, item.rect!])
                            [0] // find the largest one
    
                            ??
    
                            null // not found
                        );
                    }
                    else {
                        return (
                            !isLastScroll
                            ?
                            findFirst(children, isPartiallyVisible) // for the first scroll and middle scroll
                            :
                            findLast(children, isPartiallyVisible)  // for the last scroll
                        );
                    } // if
                })();



                return visibleChild ? getVisibleChildIndices(visibleChild[0], visibleChild[2], [...prevResults, visibleChild[1]]) : prevResults;
            }
            const visibleChildIndices = getVisibleChildIndices(parent);



            setActiveIndices(visibleChildIndices);
            setActiveIndex(visibleChildIndices[0] ?? -1);
        };
        target?.addEventListener('scroll', handleScroll);
        if (target) handleScroll(); // trigger for the first time


        
        // cleanups:
        return () => {
            target?.removeEventListener('scroll', handleScroll);
        };
    }, [props.targetRef, props.interpolation]);



    const itemHandleClick: React.MouseEventHandler<HTMLElement> = (e) => {
        e.preventDefault();
        console.log(e.target);
    }



    const {
        // accessibility:
        readOnly,


        // children:
        children,
        ...otherProps } = props;
    
    console.log(activeIndices);
    function mutateListGroupItem(props: ListGroups.Items.Props, index: number) { return (
        <ListGroupItem
            // essentials:
            key={index}


            // accessibility:
            active={index === activeIndex}


            // events:
            onClick={(props.actionCtrl ?? false) ? itemHandleClick : undefined}


            // other props:
            {...props}
        >
            { props.children }
        </ListGroupItem>
    )}

    return (
        <ListGroup
            // other props:
            {...otherProps}
        >
            {children && (Array.isArray(children) ? children : [children]).map((child, index) => (
                (React.isValidElement<ListGroups.Items.Props>(child) && (child.type === ListGroupItem))
                ?
                mutateListGroupItem(child.props, index)
                :
                <ListGroupItem
                    // essentials:
                    key={index}


                    // behaviors:
                    actionCtrl={true}

                    
                    // accessibility:
                    active={index === activeIndex}


                    // events:
                    onClick={itemHandleClick}
                >
                    { child }
                </ListGroupItem>
            ))}
        </ListGroup>
    );
}

export { ListGroupItem as NavscrollItem, ListGroupItem as Item }