// react (builds html using javascript):
import
    React, {
    useState,
    useEffect,
}                           from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
    Styles,
}                           from 'jss'          // ts defs support for jss
import {
    PropEx,
}                           from './Css'        // ts defs support for jss
import CssConfig            from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import {
    default  as ListGroup,
    cssProps as lcssProps,
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
                
    
    
                return (Array.from(target2.children) as HTMLElement[]).findIndex((child): boolean => {
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
    
    
    
                    // cropped child is still visible if rLeft not exceeds rRight && rTop not exceeds rBottom
                    // zero pixel is considered as visible
                    return (rLeft <= rRight) && (rTop <= rBottom);
                });
            })();



            setActiveIndex(firstVisibleChildIndex);
            // (Array.from(navList.children) as HTMLElement[])
            // .map((child) => child.firstElementChild! as HTMLElement)
            // .forEach((item, index) => {
            //     if (index === firstVisibleChildIndex) {
            //         if (!item.classList.contains('active') && !item.classList.contains('actived')) {
            //             item.classList.add('active');
            //         } // if not active
            //     }
            //     else {
            //         if (item.classList.contains('active') || item.classList.contains('actived')) {
            //             item.classList.remove('active', 'actived');
            //         } // if active
            //     } // if
            // });
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
        ...otherProps } = props;
    
    return (
        <ListGroup
            // other props:
            {...otherProps}
        >
            
        </ListGroup>
    );
}

export { ListGroupItem as NavscrollItem, ListGroupItem as Item }