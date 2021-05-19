// react (builds html using javascript):
import
    React, {
    useState,
    useEffect,
}                           from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    default  as ListGroup,
    ListGroupItem,
}                           from './ListGroup'
import type * as ListGroups from './ListGroup'



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
    const [activeIndex, setActiveIndex] = useState(-1);
    const [activeIndices, setActiveIndices] = useState<number[]>([]);



    useEffect(() => {
        const target = props.targetRef?.current;
        const handleScroll = () => {
            const parent = target;
            if (!parent) return;



            const [parentOffsetLeft, parentOffsetTop] = (() => {
                const parentStyle = getComputedStyle(parent);
                if (['relative', 'absolute'].includes(parentStyle.position)) return [0, 0];

                return [
                    parent.offsetLeft + Number.parseInt(parentStyle.borderInlineStartWidth),
                    parent.offsetTop  + Number.parseInt(parentStyle.borderBlockStartWidth),
                ];
            })();



            const visibleChildIndex = ((): number|null => {
                type ElementRect = {
                    readonly left   : number
                    readonly top    : number
                    readonly right  : number
                    readonly bottom : number
                };
                const getChildRect = (child: HTMLElement): ElementRect => {
                    const left   = child.offsetLeft - parentOffsetLeft; // the distance between parent's inner border & child's outher border at [scrollLeft=0]
                    const top    = child.offsetTop - parentOffsetTop;   // the distance between parent's inner border & child's outher border at [scrollTop=0]
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
                const viewportRect = {
                    left   : parent.scrollLeft,
                    top    : parent.scrollTop,
                    right  : parent.scrollLeft + parent.clientWidth,  // the inner width,  includes [paddings], excludes [margins, borders, scrollbars]
                    bottom : parent.scrollTop  + parent.clientHeight, // the inner height, includes [paddings], excludes [margins, borders, scrollbars]
                };
                const getVisibleChildRect = (childRect: ElementRect) => ({
                    left   : Math.max(childRect.left,   viewportRect.left),
                    right  : Math.min(childRect.right,  viewportRect.right),
                    top    : Math.max(childRect.top,    viewportRect.top),
                    bottom : Math.min(childRect.bottom, viewportRect.bottom),
                });



                const isPartiallyVisible = (child: HTMLElement): boolean => {
                    // child rect:
                    const childRect        = getChildRect(child);
    
                    // visible child rect within the viewport:
                    const visibleChildRect = getVisibleChildRect(childRect);
    
    
                    
                    return (
                        ((visibleChildRect.left < visibleChildRect.right) && (visibleChildRect.top < visibleChildRect.bottom)) // cropped child is still considered visible if has positive width && positive height
                        ||
                        (
                            // rare case:
                            // consider zero width/height as visible if within the viewport:

                            ((childRect.left >= viewportRect.left) && (childRect.right  <= viewportRect.right ))
                            &&
                            ((childRect.top  >= viewportRect.top ) && (childRect.bottom <= viewportRect.bottom))
                        )
                    );
                };
                const isFullyVisible = (child: HTMLElement): boolean => {
                    // child rect:
                    const childRect        = getChildRect(child);
    
                    // visible child rect within the viewport:
                    const visibleChildRect = getVisibleChildRect(childRect);



                    // true if not cropped (the size is still the same as original)
                    return (
                        (childRect.left   === visibleChildRect.left)
                        &&
                        (childRect.right  === visibleChildRect.right)
                        &&
                        (childRect.top    === visibleChildRect.top)
                        &&
                        (childRect.bottom === visibleChildRect.bottom)
                    );
                };
                const findFirstIndex = <T,>(array: T[], predicate: (value: T) => boolean): number|null => {
                    const result = array.findIndex(predicate);
                    if (result >= 0) return result;

                    return null; // not found
                }; 
                const findLastIndex = <T,>(array: T[], predicate: (value: T) => boolean): number|null => {
                    let index = array.length;
                    while ((index--) > 0) {
                        if (predicate(array[index])) return index; // found
                    } // while

                    return null; // not found
                };
                
    
    
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
                        (isFirstScroll ? findFirstIndex(children, isPartiallyVisible) : null) // the first always win
                        ??
                        (isLastScroll  ? findLastIndex(children, isPartiallyVisible)  : null) // the last always win

                        ??

                        findFirstIndex(children, isFullyVisible) // the (first) fully visible always win

                        ??

                        children
                        .map((child, index) => ({ index: index, child: child })) // add index, so we can track the original index after being mutated
                        .filter((item) => isPartiallyVisible(item.child)) // only visible children
                        .map((item) => {
                            // visible child rect within the viewport:
                            const visibleChildRect = getVisibleChildRect(getChildRect(item.child));

                            return {
                                index       : item.index,
                                visibleArea : (visibleChildRect.right - visibleChildRect.left) * (visibleChildRect.bottom - visibleChildRect.top), // calculates the visible area
                            };
                        })
                        .sort((a, b) => b.visibleArea - a.visibleArea) // sort from largest to narrowest
                        [0]?.index // find the index of the largest one

                        ??

                        null // not found
                    );
                }
                else {
                    return (
                        !isLastScroll
                        ?
                        findFirstIndex(children, isPartiallyVisible) // for the first scroll and middle scroll
                        :
                        findLastIndex(children, isPartiallyVisible)  // for the last scroll
                    );
                } // if
            })();



            setActiveIndex(visibleChildIndex ?? -1);
        };
        target?.addEventListener('scroll', handleScroll);
        if (target) handleScroll(); // trigger for the first time


        
        // cleanups:
        return () => {
            target?.removeEventListener('scroll', handleScroll);
        };
    }, [props.targetRef, props.interpolation]);



    const itemHandleClick: React.MouseEventHandler<HTMLElement> = (e) => {
        console.log('test');
    }



    const {
        // accessibility:
        readOnly,


        // children:
        children,
        ...otherProps } = props;
    
    return (
        <ListGroup
            // other props:
            {...otherProps}
        >
            {children && (Array.isArray(children) ? children : [children]).map((child, index) => (
                (React.isValidElement<ListGroups.Items.Props>(child) && (child.type === ListGroupItem))
                ?
                <ListGroupItem
                    // essentials:
                    key={index}


                    // accessibility:
                    active={index === activeIndex}


                    // events:
                    onClick={(child.props.actionCtrl ?? false) ? itemHandleClick : undefined}


                    // other props:
                    {...child.props}
                />
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