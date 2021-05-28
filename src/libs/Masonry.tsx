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
            /*
            * use `marginBlockStart` as the replacement of the stripped out `rowGap`
            * we use `marginBlockStart` instead of `marginBlockEnd`
            * because finding grid's items at the begining is much easier than at the end
            * (we don't need to count the number of grid's item)
            */
            marginBlockStart : cssProps.rowGap,



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
            /*
            * use `marginInlineStart` as the replacement of the stripped out `rowGap`
            * we use `marginInlineStart` instead of `marginInlineEnd`
            * because finding grid's items at the begining is much easier than at the end
            * (we don't need to count the number of grid's item)
            */
            marginInlineStart : cssProps.rowGap,



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



        const blockStyle     = props.orientation !== 'inline';
        const itemsRaiseSize = Math.max(1, // limits precision to 1px
            (
                blockStyle
                ?
                Number.parseInt(getComputedStyle(masonry).gridAutoRows)
                :
                Number.parseInt(getComputedStyle(masonry).gridAutoColumns)
            )
            ||
            1 // if parsing error => default is 1px
        );

        
        
        const delay = async (interval: number = 40) => new Promise<void>((resolve) => setTimeout(() => resolve(), interval));
        
        type UpdateItemTask = { item: HTMLElement, abort: boolean };
        const updateItemSizeTasks: UpdateItemTask[] = [];
        const updateItemSize = (item: HTMLElement) => {
            updateItemSizeTasks.forEach((task) => {
                if (task.item === item) {
                    task.abort = true;
                } // if
            });
            
            
            
            const newTask: UpdateItemTask = { item: item, abort: false };
            updateItemSizeTasks.push(newTask);

            
            
            updateItemSizeTask(newTask); // fire & forget the Promise
        };
        const updateItemSizeTask = async (task: UpdateItemTask) => {
            await delay(); // low priority task => limits dominating cpu usage



            if (task.abort) { // newer call updateItemSizeTask() with the same task was performed => abort current execution
                // mark current task as done => remove it from updateItemSizeTasks:
                const index = updateItemSizeTasks.indexOf(task);
                if (index >= 0) updateItemSizeTasks.splice(index, 1);

                
                
                return;
            }
            const item = task.item;

            
            
            // let's the item resize to its original size
            if (blockStyle) {
                item.style.alignSelf   = 'start'; // temporary overwrite grid's default alignItems   => let's the item apply its original size
            }
            else {
                item.style.justifySelf = 'start'; // temporary overwrite grid's default justifyItems => let's the item apply its original size
            } // if

            {
                const size = blockStyle ? item.offsetHeight : item.offsetWidth;
                const [marginSizeStart, marginSizeEnd] = (() => {
                    const style = getComputedStyle(item);

                    if (blockStyle) {
                        return [
                            Number.parseInt(style.marginBlockStart),
                            Number.parseInt(style.marginBlockEnd),
                        ];
                    }
                    else {
                        return [
                            Number.parseInt(style.marginInlineStart),
                            Number.parseInt(style.marginInlineEnd),
                        ];
                    }
                })();
                const totalSize = size + marginSizeStart + marginSizeEnd;



                const spansNeeded = Math.round(totalSize / itemsRaiseSize);
                if (blockStyle) {
                    item.style.gridRowEnd    = `span ${spansNeeded}`;
                    item.style.gridColumnEnd = ''; // clear from residual effect from inlineStyle (if was)
                }
                else {
                    item.style.gridRowEnd    = ''; // clear from residual effect from blockStyle (if was)
                    item.style.gridColumnEnd = `span ${spansNeeded}`;
                }
            }
            item.style.alignSelf   = ''; // switch back to grid's default alignItems   -or- clear from residual effect from blockStyle (if was)
            item.style.justifySelf = ''; // switch back to grid's default justifyItems -or- clear from residual effect from inlineStyle (if was)



            // mark current task as done => remove it from updateItemSizeTasks:
            const index = updateItemSizeTasks.indexOf(task);
            if (index >= 0) updateItemSizeTasks.splice(index, 1);
        };
        
        let updateItemSizesVersion = 0;
        const updateItemsSize = () => {
            updateItemSizesVersion++;
            updateItemsSizeTask(updateItemSizesVersion); // fire & forget the Promise
        };
        const updateItemsSizeTask = async (oldVersion: number) => {
            await delay(); // low priority task => limits dominating cpu usage



            if (oldVersion < updateItemSizesVersion) {
                return; // newer call updateItemsSizeAsync() was performed => abort current execution
            }



            // abort all updateItemSizeTasks
            // because we'll update all items
            updateItemSizeTasks.forEach((task) => {
                task.abort = true;
            });


            
            for (const item of (Array.from(masonry.children) as HTMLElement[])) {
                updateItemSize(item);
            } // for
        }



        // update now:
        updateItemsSize();



        //#region update at the future
        //#region when masonry's children resized
        const childrenResizeObserver = ResizeObserver ? new ResizeObserver(async (entries) => {
            for (const entry of entries) {
                const item = entry.target as HTMLElement;

                if (
                    (item.parentElement !== masonry) // item removed from masonry
                    ||
                    (masonry.parentElement === null) // masonry removed from document
                ) {
                    childrenResizeObserver?.unobserve(item);
                }
                else {
                    updateItemSize(item);
                } // if
            } // for
        }) : null;
        if (childrenResizeObserver) {
            for (const item of (Array.from(masonry.children) as HTMLElement[])) {
                childrenResizeObserver.observe(item);
            } // for
        } // if
        //#endregion when masonry's children resized

        
        
        // *** if masonry resized => implicitly the masonry's items are resized too ***
        // *** so watching for masonry's resizing is not required ***
        // //#region when masonry resized
        // const resizeObserver = ResizeObserver ? new ResizeObserver(async (entries) => {
        //     for (const entry of entries) {
        //         if (entry.target === masonry) {
        //             if (masonry.parentElement === null) {
        //                 resizeObserver?.unobserve(masonry);
        //             }
        //             else {
        //                 updateItemsSize();
        //             } // if
        //         } // if
        //     } // for
        // }) : null;
        // if (resizeObserver) {
        //     resizeObserver.observe(masonry);
        // }
        // else {
        //     window.addEventListener('resize', updateItemsSize);
        // } // if
        // //#endregion when masonry resized

        
        
        //#region when masonry's children added/removed
        const mutationObserver = new MutationObserver((entries) => {
            for (const entry of entries) {
                // added children:
                for (const item of (Array.from(entry.addedNodes) as HTMLElement[])) {
                    // update now:
                    updateItemSize(item);

                    // update at the future:
                    childrenResizeObserver?.observe(item);
                } // for

                
                
                // removed children:
                if (childrenResizeObserver) {
                    for (const item of (Array.from(entry.removedNodes) as HTMLElement[])) {
                        // stop update at the future:
                        childrenResizeObserver.unobserve(item);
                    } // for
                } // if
            } // for
        });
        mutationObserver.observe(masonry, { // watch for DOM structure changes
            childList  : true,  // watch for child's DOM structure changes
            subtree    : false, // don't care for grandchild's DOM structure changes

            attributes : false, // don't care for any attribute changes
        });
        //#endregion when masonry's children added/removed
        //#endregion update at the future

        
        
        // cleanups:
        return () => {
            //#region remove observer: masonry's children resized
            if (childrenResizeObserver) childrenResizeObserver.disconnect();
            //#endregion remove observer: masonry's children resized
            
            
            
            // *** if masonry resized => implicitly the masonry's items are resized too ***
            // *** so watching for masonry's resizing is not required ***
            // //#region remove observer: masonry resized
            // if (resizeObserver) {
            //     resizeObserver.disconnect();
            // }
            // else {
            //     window.removeEventListener('resize', updateItemsSize);
            // } // if
            // //#endregion remove observer: masonry resized



            //#region remove observer: masonry's children added/removed
            mutationObserver.disconnect();
            //#endregion remove observer: masonry's children added/removed
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