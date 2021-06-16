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
    ClassList,
    PropList,

    
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

export class MasonryStylesBuilder extends BasicComponentStyles implements IContentStyles {
    // variants:
    public /*override*/ variants(): ClassList { return [
        ...super.variants(), // copy variants from base


        
        [ '&:not(.inline)', this.block()  ], // block  style as default
        [ '&.inline'      , this.inline() ], // inline style as optional
    ]}
    public /*override*/ theme(theme: string): JssStyle { return {
        extend: [
            super.theme(theme), // copy themes from base
            
            this.contentTheme(theme),
        ] as JssStyle,
    }}
    public /*override*/ size(size: string): JssStyle { return {
        extend: [
            super.size(size), // copy sizes from base

            this.contentSize(size),
        ] as JssStyle,



        // overwrites propName = propName{Size}:
        ...this.overwriteProps(cssDecls, this.filterSuffixProps(cssProps, size)),
    }}

    public /*implement*/ contentTheme(theme: string): JssStyle {
        return contentStyles.contentTheme(theme); // copy themes from Content
    }
    public /*implement*/ contentSize(size: string): JssStyle {
        return contentStyles.contentSize(size); // copy sizes from Content
    }

    public /*virtual*/ block(): JssStyle { return {
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
    public /*virtual*/ inline(): JssStyle { return {
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



    // states:
    public /*override*/ states()      : ClassList { return [
        ...super.states(), // copy states from base



        ...this.contentStates(),
    ]}
    public /*override*/ actived()     : JssStyle {
        return this.contentActived();
    }
    public /*override*/ activating()  : JssStyle {
        return this.contentActivating();
    }
    public /*override*/ passivating() : JssStyle {
        return this.contentPassivating();
    }
    public /*override*/ passived()    : JssStyle {
        return this.contentPassived();
    }

    public /*implement*/ contentStates()      : ClassList {
        return contentStyles.contentStates();
    }
    public /*implement*/ contentActived()     : JssStyle {
        return contentStyles.contentActived();
    }
    public /*implement*/ contentActivating()  : JssStyle {
        return contentStyles.contentActivating();
    }
    public /*implement*/ contentPassivating() : JssStyle {
        return contentStyles.contentPassivating();
    }
    public /*implement*/ contentPassived()    : JssStyle {
        return contentStyles.contentPassived();
    }



    // functions:
    public /*override*/ propsFn(): PropList { return {
        ...super.propsFn(), // copy functional props from base
        
        ...this.contentPropsFn(),
    }}
    public /*implement*/ contentPropsFn(): PropList {
        return contentStyles.contentPropsFn(); // copy functional props from Content
    }



    // styles:
    public /*override*/ basicStyle(): JssStyle { return {
        extend: [
            super.basicStyle(), // copy basicStyle from base

            this.contentBasicStyle(),
        ] as JssStyle,
    }}
    public /*implement*/ contentBasicStyle(): JssStyle {
        return contentStyles.contentBasicStyle(); // copy basicStyle from Content
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
        BasicComponentProps<TElement>,
        VariantOrientation
{
    // children:
    children? : React.ReactNode
}
export default function Masonry<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    // styles:
    const masonryStyles   = styles.useStyles();

    
    
    // variants:
    const variOrientation = useVariantOrientation(props);

    
    
    // dom effects:
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



    // jsx:
    return (
        <BasicComponent<TElement>
            // other props:
            {...props}


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


            // classes:
            mainClass={props.mainClass ?? masonryStyles.main}
            variantClasses={[...(props.variantClasses ?? []),
                variOrientation.class,
            ]}
        >
            { props.children }
        </BasicComponent>
    );
}

export type { OrientationStyle, VariantOrientation }