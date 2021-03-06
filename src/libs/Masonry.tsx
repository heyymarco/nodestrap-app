// react (builds html using javascript):
import {
    default as React,
    useRef,
    useEffect,
}                           from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import {
    // general types:
    JssStyle,
    RuleList,

    
    // components:
    CssConfig,
}                           from './nodestrap'   // nodestrap's core
import spacers              from './spacers'     // configurable spaces defs
import {
    OrientationStyle,
    VariantOrientation,
    useVariantOrientation,

    BasicComponentStyles,
    BasicComponentProps,
    BasicComponent,
}                           from './BasicComponent'
import {
    IContentStyles,
    contentStyles,
}                           from './Content'



// styles:

export class MasonryStyles extends BasicComponentStyles implements IContentStyles {
    // layouts:
    public /*override*/ layout(): JssStyle { return {
        extend: [
            super.layout(), // copy layout from base

            this.contentLayout(),
        ] as JssStyle,
    }}
    public /*implement*/ contentLayout(): JssStyle {
        return contentStyles.contentLayout(); // copy layout from Content
    }
    
    
    
    // variants:
    public /*override*/ variants(): RuleList { return [
        ...super.variants(), // copy variants from base


        
        [ ':not(.inline)', this.block()  ], // block  style as default
        [      '.inline' , this.inline() ], // inline style as optional
    ]}
    
    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base

            this.contentSize(size),
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}
    public /*implement*/ contentSize(size: string): JssStyle {
        return contentStyles.contentSize(size); // copy sizes from Content
    }

    public /*virtual*/ block(): JssStyle { return {
        // layouts:
        display             : 'grid', // use css grid for layouting, the core of our Masonry layout
        gridAutoFlow        : 'row', // masonry's direction is to row
        gridAutoRows        : cssProps.itemsRaiseSize,
        gridTemplateColumns : `repeat(auto-fill, minmax(${cssProps.itemsMinColumnSize}, 1fr))`,
     // alignItems          : 'stretch', // distorting the item's height a bit for consistent multiplies of `itemsRaiseSize` // causing the ResizeObserver doesn't work
        alignItems          : 'start',   // let's the item to resize so the esizeObserver will work



        // children:
        '&>*': {
            '&:not(.firstRow)': {
                /*
                * we use `marginBlockStart` as the replacement of the stripped out `rowGap`
                * we use `marginBlockStart` instead of `marginBlockEnd`
                * because finding grid's items at the first row is much easier than at the last row
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
    public /*virtual*/ inline(): JssStyle { return {
        // layouts:
        display             : 'inline-grid',
        gridAutoFlow        : 'column', // masonry's direction is to column
        gridAutoColumns     : cssProps.itemsRaiseSize,
        gridTemplateRows    : `repeat(auto-fill, minmax(${cssProps.itemsMinColumnSize}, 1fr))`,
     // justifyItems        : 'stretch', // distorting the item's width a bit for consistent multiplies of `itemsRaiseSize` // causing the ResizeObserver doesn't work
        justifyItems        : 'start',   // let's the item to resize so the esizeObserver will work



        // children:
        '&>*': {
            '&:not(.firstRow)': {
                /*
                * we use `marginInlineStart` as the replacement of the stripped out `columnGap`
                * we use `marginInlineStart` instead of `marginInlineEnd`
                * because finding grid's items at the first row is much easier than at the last row
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
}
export const masonryStyles = new MasonryStyles();



// configs:

const cssConfig = new CssConfig(() => {
    return {
        //#region spacings
        columnGap       : spacers.sm,
        columnGapSm     : spacers.xs,
        columnGapLg     : spacers.md,
        rowGap          : spacers.sm,
        rowGapSm        : spacers.xs,
        rowGapLg        : spacers.md,
        //#endregion spacings


        
        //#region sizes
        itemsRaiseSize       : '3px',
        itemsRaiseSizeSm     : '2px',
        itemsRaiseSizeLg     : '4px',

        itemsMinColumnSize   : '200px', // 5 * 40
        itemsMinColumnSizeSm : '120px', // 3 * 40
        itemsMinColumnSizeLg : '320px', // 8 * 40
        //#endregion sizes
    };
}, /*prefix: */'msry');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// react components:

export interface MasonryProps<TElement extends HTMLElement = HTMLElement>
    extends
        BasicComponentProps<TElement>,

        VariantOrientation
{
    // children:
    children? : React.ReactNode
}
export default function Masonry<TElement extends HTMLElement = HTMLElement>(props: MasonryProps<TElement>) {
    // styles:
    const styles          = masonryStyles.useStyles();

    
    
    // variants:
    const variOrientation = useVariantOrientation(props);

    
    
    // dom effects:
    const masonryRef      = useRef<TElement|null>(null);
    useEffect(() => {
        const masonry = masonryRef.current;
        if (!masonry) return; // masonry was unloaded => nothing to do



        // fn props:
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

        
        
        // functions:

        const delay = (interval: number = 1) => new Promise<void>((resolve) => setTimeout(() => resolve(), interval));
        
        const handleUpdate = async (item: HTMLElement) => { // keeps the UI responsive (not blocking) while handling the event
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



        // update for the first time:
        (async () => {
            await updateFirstRowItems(); // needs to be called first before handleUpdate, because the item's margin affected the resizing calculation
            for (const item of (Array.from(masonry.children) as HTMLElement[])) await handleUpdate(item);
        })();



        //#region update in the future
        //#region when items resized
        let initialResizeEvent : boolean|null = null;
        const resizeObserver = ResizeObserver ? new ResizeObserver(async (entries) => {
            // ignores the insertion dom event:
            if (initialResizeEvent) {
                initialResizeEvent = false;
                return;
            } // if


            
            // ignores the removal dom event:
            const items = entries.map((e) => e.target as HTMLElement).filter((item) => {
                if (masonry.parentElement) { // masonry is still exist on the document
                    // check if the item is the child of masonry
                    if (item.parentElement === masonry) return true; // confirmed
                } // if

                
                
                resizeObserver?.unobserve(item); // no longer exist => remove from observer
                return false; // not the child of masonry
            });
            if (!items.length) return; // no existing items => nothing to do



            // update after being resized:
            await updateFirstRowItems(); // needs to be called first before handleUpdate, because the item's margin affected the resizing calculation
            for (const item of items) await handleUpdate(item);
        }) : null;
        if (resizeObserver) {
            (Array.from(masonry.children) as HTMLElement[]).forEach((item) => {
                // update in the future:
                initialResizeEvent = true; // prevent the insertion dom event
                resizeObserver.observe(item, { box: 'border-box' });
            });
        } // if
        //#endregion when items resized

        
        
        //#region when items added/removed
        const mutationObserver = MutationObserver ? new MutationObserver(async (entries) => {
            // update after being added/removed:
            // any adding/removing of items causing the first_row_items need to be recalculated:
            await updateFirstRowItems(); // needs to be called first before handleUpdate, because the item's margin affected the resizing calculation


            
            for (const entry of entries) {
                // added items:
                for (const item of (Array.from(entry.addedNodes) as HTMLElement[])) {
                    // update after being added/removed:
                    await handleUpdate(item);

                    // update in the future:
                    initialResizeEvent = true; // prevent the insertion dom event
                    resizeObserver?.observe(item, { box: 'border-box' });
                } // for

                
                
                // removed items:
                if (resizeObserver) {
                    (Array.from(entry.removedNodes) as HTMLElement[]).forEach((item) => {
                        // stop updating in the future:
                        resizeObserver.unobserve(item);
                    });
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
            resizeObserver?.disconnect();
            mutationObserver?.disconnect();
            firstRowItems.forEach((firstRowItem) => firstRowItem.classList.remove('firstRow'));
        };
    }, [props.orientation, props.size]);



    // jsx:
    return (
        <BasicComponent<TElement>
            // other props:
            {...props}


            // essentials:
            elmRef={(elm) => {
                masonryRef.current = elm;


                // forwards:
                const elmRef = props.elmRef;
                if (elmRef) {
                    if (typeof(elmRef) === 'function') {
                        elmRef(elm);
                    }
                    else {
                        (elmRef as React.MutableRefObject<TElement|null>).current = elm;
                    } // if
                } // if
            }}


            // variants:
            mild={props.mild ?? true}


            // classes:
            mainClass={props.mainClass ?? styles.main}
            variantClasses={[...(props.variantClasses ?? []),
                variOrientation.class,
            ]}
        >
            { props.children }
        </BasicComponent>
    );
}
export { Masonry }

export type { OrientationStyle, VariantOrientation }