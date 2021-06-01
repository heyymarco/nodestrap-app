// react (builds html using javascript):
import
    React, {
    useRef,
    useEffect,
}                          from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
    Styles,
}                          from 'jss'          // ts defs support for jss
import {
    Cust,
}                          from './Css'        // ts defs support for jss
import CssConfig           from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import spacers             from './spacers'     // configurable spaces defs
import {
    default  as Element,
    ElementStylesBuilder,
    useVariantOrientation,
}                          from './Element'
import type * as Elements  from './Element'
import type {
    OrientationStyle,
    VariantOrientation,
}                          from './Element'
import {
    styles as contentStyles,
}                          from './Content'
import type {
    IContentStylesBuilder,
}                          from './Content'



// styles:

export class MasonryStylesBuilder extends ElementStylesBuilder implements IContentStylesBuilder {
    // themes:
    public /*implement*/ contentThemeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle {
        return contentStyles.contentThemeOf(theme, Theme, themeProp, themeColor); // copy themes from Content
    }
    public /*implement*/ contentSizeOf(size: string, Size: string, sizeProp: string): JssStyle {
        return contentStyles.contentSizeOf(size, Size, sizeProp); // copy sizes from Content
    }

    public /*override*/ themeOf(theme: string, Theme: string, themeProp: string, themeColor: Cust.Ref): JssStyle { return {
        extend: [
            super.themeOf(theme, Theme, themeProp, themeColor), // copy themes from base
            
            this.contentThemeOf(theme, Theme, themeProp, themeColor),
        ] as JssStyle,
    }}
    public /*override*/ sizeOf(size: string, Size: string, sizeProp: string): JssStyle { return {
        extend: [
            super.sizeOf(size, Size, sizeProp), // copy sizes from base

            this.contentSizeOf(size, Size, sizeProp),
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, Size)),
    }}



    // states:
    public /*implement*/ contentThemesIf(): JssStyle {
        return contentStyles.contentThemesIf(); // copy themes from Content
    }
    public /*implement*/ contentStates(inherit = false): JssStyle {
        return contentStyles.contentStates(inherit); // copy states from Content
    }

    public /*override*/ themesIf(): JssStyle { return {
        extend: [
            super.themesIf(), // copy themes from base

            this.contentThemesIf(),
        ] as JssStyle,
    }}
    public /*override*/ states(inherit = false): JssStyle { return {
        extend: [
            super.states(inherit), // copy states from base

            this.contentStates(inherit),
        ] as JssStyle,
    }}



    // functions:
    public /*implement*/ contentPropsFn(): JssStyle {
        return contentStyles.contentPropsFn(); // copy functional props from Content
    }
    public /*override*/ propsFn(): JssStyle { return {
        extend: [
            super.propsFn(), // copy functional props from base

            this.contentPropsFn(),
        ] as JssStyle,
    }}



    // styles:
    public /*implement*/ contentBasicStyle(): JssStyle {
        return contentStyles.contentBasicStyle(); // copy basicStyle from Content
    }
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base

            this.contentBasicStyle(),
        ] as JssStyle,
    }}
    public /*virtual*/ blockStyle(): JssStyle { return {
        // layout:
        display             : 'grid',
        gridAutoFlow        : 'row', // masonry's direction is to row
        gridAutoRows        : cssProps.itemsRaiseSize,
        gridTemplateColumns : `repeat(auto-fill, minmax(${cssProps.itemsMinColumnSize}, 1fr))`,
        // alignItems          : 'stretch', // distorting the item's height a bit for consistent multiplies of `itemsRaiseSize`
        alignItems          : 'start', // let's the item to resize so we can reconstruct the masonry's layout



        // children:
        '&>*': {
            '&:not(.firstRow)': {
                /*
                * use `marginBlockStart` as the replacement of the stripped out `rowGap`
                * we use `marginBlockStart` instead of `marginBlockEnd`
                * because finding grid's items at the begining is much easier than at the end
                * (we don't need to count the number of grid's item)
                */
                marginBlockStart : cssProps.rowGap,
            },



            gridColumnEnd : [['unset'], '!important'], // clear from residual effect from inlineStyle (if was)
        },



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps

        rowGap    : [[0], '!important'], // strip out the `rowGap` because it will conflict with masonry's direction
    }}
    public /*virtual*/ inlineStyle(): JssStyle { return {
        // layout:
        display             : 'inline-grid',
        gridAutoFlow        : 'column', // masonry's direction is to column
        gridAutoColumns     : cssProps.itemsRaiseSize,
        gridTemplateRows    : `repeat(auto-fill, minmax(${cssProps.itemsMinColumnSize}, 1fr))`,
        // justifyItems        : 'stretch', // distorting the item's width a bit for consistent multiplies of `itemsRaiseSize`
        justifyItems        : 'start', // let's the item to resize so we can reconstruct the masonry's layout



        // children:
        '&>*': {
            '&:not(.firstRow)': {
                /*
                * use `marginInlineStart` as the replacement of the stripped out `rowGap`
                * we use `marginInlineStart` instead of `marginInlineEnd`
                * because finding grid's items at the begining is much easier than at the end
                * (we don't need to count the number of grid's item)
                */
                marginInlineStart : cssProps.rowGap,
            },



            gridRowEnd : [['unset'], '!important'], // clear from residual effect from blockStyle (if was)
        },



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps

        columnGap : [[0], '!important'], // strip out the `columnGap` because it will conflict with masonry's direction
    }}
    protected /*override*/ styles(): Styles<'main'> {
        const styles = super.styles();
        styles.main = {
            extend: [
                styles.main,
                {
                    '&:not(.inline)' : this.blockStyle(),  // block  style as default
                    '&.inline'       : this.inlineStyle(), // inline style as optional
                },
            ] as JssStyle,
        };



        return styles;
    }
}
export const styles = new MasonryStylesBuilder();



// configs:

const cssConfig = new CssConfig(() => {
    // common css values:
    // const initial = 'initial';
    // const unset   = 'unset';
    // const none    = 'none';
    // const inherit = 'inherit';
    // const center  = 'center';
    // const middle  = 'middle';


    return {
        columnGap            : spacers.sm,
        columnGapSm          : spacers.xs,
        columnGapLg          : spacers.md,
        rowGap               : spacers.sm,
        rowGapSm             : spacers.xs,
        rowGapLg             : spacers.md,

        itemsRaiseSize       : '3px',
        itemsRaiseSizeSm     : '2px',
        itemsRaiseSizeLg     : '4px',

        itemsMinColumnSize   : '200px', // 5 * 40
        itemsMinColumnSizeSm : '120px', // 3 * 40
        itemsMinColumnSizeLg : '320px', // 8 * 40
    };
}, /*prefix: */'msry');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// react components:

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        Elements.Props<TElement>,
        VariantOrientation
{
    // children:
    children? : React.ReactNode
}
export default function Masonry<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    const masonryStyles   = styles.useStyles();

    // themes:
    const variOrientation = useVariantOrientation(props);

    // layouts:
    const masonryRef      = useRef<TElement>(null);



    useEffect(() => {
        const masonry = masonryRef.current;
        if (!masonry) return;



        const isBlockStyle   = props.orientation !== 'inline'; // default is block if inline was not specified
        const itemsRaiseSize = Math.max(1, // limits the precision to 1px, any value less than 1px will be scaled up to 1px
            (
                isBlockStyle
                ?
                Number.parseInt(getComputedStyle(masonry).gridAutoRows)
                :
                Number.parseInt(getComputedStyle(masonry).gridAutoColumns)
            )
            ||
            1 // if parsing error (NaN) => falsy => default is 1px
        );

        
        
        const delay = (interval: number = 1) => new Promise<void>((resolve) => setTimeout(() => resolve(), interval));
        
        const handleResize = async (item: HTMLElement) => { // keeps the UI responsive (not blocking) while handling the event
            await delay(); // low priority task => limits dominating the cpu usage


            // we're working with [height on blockStyle] or [width on inlineStyle]
            const offsetSize = isBlockStyle ? item.offsetHeight : item.offsetWidth;
            // const offsetSize = isBlockStyle ? item.getBoundingClientRect().height : item.getBoundingClientRect().width; // use more precise measurement

            // calculate the related margins too:
            const marginSize = (() => {
                const style = getComputedStyle(item);

                if (isBlockStyle) {
                    return (
                        Number.parseInt(style.marginBlockStart)
                        +
                        Number.parseInt(style.marginBlockEnd)
                    );
                }
                else { // isInlineStyle
                    return (
                        Number.parseInt(style.marginInlineStart)
                        +
                        Number.parseInt(style.marginInlineEnd)
                    );
                } // if
            })();

            // calculate the total size including margins:
            const totalSize = offsetSize + marginSize;



            const spansNeeded = `span ${Math.round(totalSize / itemsRaiseSize)}`;
            if (isBlockStyle) {
                item.style.gridRowEnd    = spansNeeded;
                item.style.gridColumnEnd = ''; // clear from residual effect from inlineStyle (if was)
            }
            else { // isInlineStyle
                item.style.gridRowEnd    = ''; // clear from residual effect from blockStyle (if was)
                item.style.gridColumnEnd = spansNeeded;
            } // if
        }

        let firstRowItems: HTMLElement[] = [];
        const updateFirstRowItems = async () => {
            const newFirstRowItems = (() => {
                const items = (Array.from(masonry.children) as HTMLElement[]);
                let index = -1;
                let prevPos = -1;
                for (const item of items) {
                    /*
                        whatever the item's parent (Masonry) is positioned element ('relative' or 'absolute') or not is not problem
                        because we just watching the *shifting* of the offsetLeft/offsetTop
                        in order to detect the presence of a new row.
                    */
                    const currentPos = (isBlockStyle ? item.offsetLeft : item.offsetTop);
                    if (currentPos < prevPos) break;
    
                    prevPos = currentPos + (isBlockStyle ? item.offsetWidth : item.offsetHeight);
                    index++;
                } // for
                
                return items.slice(0, index + 1);
            })();



            const removedItems =    firstRowItems.filter((item) => !newFirstRowItems.includes(item)); // old_items are not exist   in new_items
            const addedItems   = newFirstRowItems.filter((item) =>    !firstRowItems.includes(item)); // new_items are not already in old_items



            removedItems.forEach((removedItem) => removedItem.classList.remove('firstRow'));
            addedItems.forEach((addedItem)     =>   addedItem.classList.add('firstRow'));



            firstRowItems = newFirstRowItems;
        }



        // update all items now:
        updateFirstRowItems(); // need to be called first before handleResize, because the item's margin affected the resizing calculation
        (Array.from(masonry.children) as HTMLElement[]).forEach((item) => handleResize(item));



        //#region update in the future
        //#region when items resized
        const itemsResizeObserver = ResizeObserver ? new ResizeObserver((entries) => {
            // filter only the existing entries
            entries = entries.filter((entry) => {
                const item = entry.target as HTMLElement;

                if (item.parentElement !== masonry) return false; // not exist => item was removed from the masonry
                if (masonry.parentElement === null) return false; // not exist => masonry was removed from the document
                return true; // exist
            });
            if (!entries.length) return;



            // any resizing of items causing the first_row_items need to be recalculated:
            updateFirstRowItems(); // need to be called first before handleResize, because the item's margin affected the resizing calculation
            
            
            
            for (const entry of entries) {
                // resizing detected => update:
                handleResize(entry.target as HTMLElement);
            } // for
        }) : null;
        if (itemsResizeObserver) {
            for (const item of (Array.from(masonry.children) as HTMLElement[])) {
                // update in the future:
                itemsResizeObserver.observe(item);
            } // for
        } // if
        //#endregion when items resized

        
        
        //#region when items added/removed
        const mutationObserver = MutationObserver ? new MutationObserver((entries) => {
            // any adding/removing of items causing the first_row_items need to be recalculated:
            updateFirstRowItems(); // need to be called first before handleResize, because the item's margin affected the resizing calculation


            
            for (const entry of entries) {
                // added items:
                for (const item of (Array.from(entry.addedNodes) as HTMLElement[])) {
                    // update now:
                    handleResize(item);

                    // update in the future:
                    itemsResizeObserver?.observe(item);
                } // for

                
                
                // removed items:
                if (itemsResizeObserver) {
                    for (const item of (Array.from(entry.removedNodes) as HTMLElement[])) {
                        // stop updating in the future:
                        itemsResizeObserver.unobserve(item);
                    } // for
                } // if
            } // for
        }) : null;
        if (mutationObserver) {
            mutationObserver.observe(masonry, { // watch for DOM structure changes
                childList  : true,  // watch for child's DOM structure changes
                subtree    : false, // don't care for grandchild's DOM structure changes
    
                attributes : false, // don't care for any attribute changes
            });
        } // if
        //#endregion when items added/removed
        //#endregion update in the future

        
        
        // cleanups:
        return () => {
            itemsResizeObserver?.disconnect();
            mutationObserver?.disconnect();
            firstRowItems.forEach((firstRowItem) => firstRowItem.classList.remove('firstRow'));
        };
    }, [props.orientation, props.size]);



    return (
        <Element<TElement>
            // other props:
            {...props}


            // classes:
            mainClass={props.mainClass ?? masonryStyles.main}
            themeClasses={[...(props.themeClasses ?? []),
                // themes:
                variOrientation.class,
            ]}


            // essentials:
            elmRef={(elm) => {
                // @ts-ignore
                masonryRef.current = elm;


                // forwards:
                const elmRef = props.elmRef;
                if (elmRef) {
                    if (typeof(elmRef) === 'function') {
                        elmRef(elm);
                    }
                    else {
                        // @ts-ignore
                        elmRef.current = elm;
                    } // if
                } // if
            }}
        >
            { props.children }
        </Element>
    );
}

export type { OrientationStyle, VariantOrientation }