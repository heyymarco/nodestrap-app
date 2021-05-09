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



    useEffect(() => {
        const target = props.targetRef?.current;
        const handleScroll = () => {
            const target2 = target;
            if (!target2) return;



            const visibleChildIndex = ((): number|null => {
                type ElementArea = {
                    readonly left   : number
                    readonly top    : number
                    readonly right  : number
                    readonly bottom : number
                };
                const getElementArea = (element: HTMLElement): ElementArea => {
                    const left   = element.offsetLeft;
                    const top    = element.offsetTop;
                    const right  = left + element.offsetWidth;
                    const bottom = top  + element.offsetHeight;
    
                    return {
                        left   : left,
                        top    : top,
                        right  : right,
                        bottom : bottom,
                    };
                };

                // viewport area:
                const viewArea = {
                    left   : target2.scrollLeft,
                    top    : target2.scrollTop,
                    right  : target2.scrollLeft + target2.clientWidth,
                    bottom : target2.scrollTop  + target2.clientHeight,
                };
                const getCroppedArea = (elementArea: ElementArea) => ({
                    left   : Math.max(elementArea.left,   viewArea.left),
                    right  : Math.min(elementArea.right,  viewArea.right),
                    top    : Math.max(elementArea.top,    viewArea.top),
                    bottom : Math.min(elementArea.bottom, viewArea.bottom),
                });



                const isPartiallyVisible = (child: HTMLElement): boolean => {
                    // child area:
                    const childArea     = getElementArea(child);
    
                    // cropped child area:
                    const cropChildArea = getCroppedArea(childArea);
    
    
                    
                    return (
                        ((cropChildArea.left < cropChildArea.right) && (cropChildArea.top < cropChildArea.bottom)) // cropped child is still considered visible if has positive width && positive height
                        ||
                        (
                            // rare case:
                            // consider zero width/height as visible if inside the viewport area:

                            ((childArea.left >= viewArea.left) && (childArea.right  <= viewArea.right ))
                            &&
                            ((childArea.top  >= viewArea.top ) && (childArea.bottom <= viewArea.bottom))
                        )
                    );
                };
                const isFullyVisible = (child: HTMLElement): boolean => {
                    // child area:
                    const childArea     = getElementArea(child);
    
                    // cropped child area:
                    const cropChildArea = getCroppedArea(childArea);



                    // true if not cropped (the size is still the same as original)
                    return (
                        (childArea.left   === cropChildArea.left)
                        &&
                        (childArea.right  === cropChildArea.right)
                        &&
                        (childArea.top    === cropChildArea.top)
                        &&
                        (childArea.bottom === cropChildArea.bottom)
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
                
    
    
                const children = Array.from(target2.children) as HTMLElement[];
                const isFirstScroll =
                    (viewArea.left === 0)
                    &&
                    (viewArea.top  === 0)
                    ;
                const isLastScroll =
                    (viewArea.left === (target2.scrollWidth  - target2.clientWidth ))
                    &&
                    (viewArea.top  === (target2.scrollHeight - target2.clientHeight))
                    ;
                
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
                            const area = getCroppedArea(getElementArea(item.child)); // get the visible area

                            return {
                                index : item.index,
                                area  : (area.right - area.left) * (area.bottom - area.top), // calculates the area
                            };
                        })
                        .sort((a, b) => b.area - a.area) // sort from largest to narrowest
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
                (React.isValidElement(child) && (child.type === ListGroupItem))
                ?
                <ListGroupItem
                    // essentials:
                    key={index}


                    // accessibility:
                    active={index === activeIndex}


                    // other props:
                    {...child.props}
                />
                :
                <ListGroupItem
                    // essentials:
                    key={index}

                    
                    // accessibility:
                    active={index === activeIndex}
                >
                    { child }
                </ListGroupItem>
            ))}
        </ListGroup>
    );
}

export { ListGroupItem as NavscrollItem, ListGroupItem as Item }