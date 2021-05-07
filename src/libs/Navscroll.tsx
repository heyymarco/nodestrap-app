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
    // spy:
    targetRef?       : React.MutableRefObject<HTMLElement|null>


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



            const firstVisibleChildIndex = ((): number => {
                // viewport area:
                const vLeft   = target2.scrollLeft;
                const vTop    = target2.scrollTop;
                const vRight  = vLeft + target2.clientWidth;
                const vBottom = vTop  + target2.clientHeight;



                const isInsideViewport = (child: HTMLElement): boolean => {
                    // child area:
                    const cLeft   = child.offsetLeft;
                    const cTop    = child.offsetTop;
                    const cRight  = cLeft + child.offsetWidth;
                    const cBottom = cTop  + child.offsetHeight;
    
    
    
                    // cropped child area:
                    const rLeft   = Math.max(vLeft,   cLeft);
                    const rRight  = Math.min(vRight,  cRight);
                    const rTop    = Math.max(vTop,    cTop);
                    const rBottom = Math.min(vBottom, cBottom);
    
    
    
                    
                    // zero pixel is considered as visible
                    return (
                        ((rLeft < rRight) && (rTop < rBottom)) // cropped child is still considered visible if has positive width && positive height
                        ||
                        (
                            // rare case:
                            // consider zero width/height as visible if inside the viewport area:

                            ((cLeft >= vLeft) && (cRight  <= vRight ))
                            &&
                            ((cTop  >= vTop ) && (cBottom <= vBottom))
                        )
                    );
                };
                
    
    
                const children = Array.from(target2.children) as HTMLElement[];
                const isLastScroll =
                    (vLeft === (target2.scrollWidth  - target2.clientWidth ))
                    &&
                    (vTop  === (target2.scrollHeight - target2.clientHeight))
                    ;
                return (
                    isLastScroll
                    ?
                    ((): number => {
                        let index = children.length;
                        while ((index--) > 0) {
                            if (isInsideViewport(children[index])) return index; // found
                        } // while

                        return -1; // not found
                    })()
                    :
                    children.findIndex(isInsideViewport)
                );
            })();



            setActiveIndex(firstVisibleChildIndex);
        };
        target?.addEventListener('scroll', handleScroll);
        if (target) handleScroll(); // trigger for the first time


        
        // cleanups:
        return () => {
            target?.removeEventListener('scroll', handleScroll);
        };
    }, [props.targetRef]);



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