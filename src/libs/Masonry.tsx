// react (builds html using javascript):
import
    React, {
    useRef,
    useEffect,
}                          from 'react'        // base technology of our nodestrap components

// jss   (builds css  using javascript):
import type {
    JssStyle,
}                          from 'jss'          // ts defs support for jss
import {
    Cust,
}                          from './Css'        // ts defs support for jss
import CssConfig           from './CssConfig'  // Stores & retrieves configuration using *css custom properties* (css variables) stored at HTML `:root` level (default) or at specified `rule`.

// nodestrap (modular web components):
import spacers             from './spacers'     // configurable spaces defs
import {
    default  as Element,
    GenericElement,
    ElementStylesBuilder,
}                          from './Element'
import type * as Elements  from './Element'
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



        // layout:
        display             : 'grid',
        gridAutoFlow        : 'row',
        gridTemplateColumns : `repeat(auto-fill, minmax(${cssProps.itemsMinInlineSize}, 1fr))`,
        gridAutoRows        : cssProps.itemsMulBlockSize,
        alignItems          : 'stretch', // distorting the item's height a bit for consistent multiplies of `itemsMulBlockSize`



        // children:
        '&>*': {
            marginBlockEnd : cssProps.rowGap,
        },



        // customize:
        ...this.filterGeneralProps(cssProps), // apply *general* cssProps


        
        // cannot be customized:
        rowGap: 0,
    }}
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
        columnGap          : spacers.default,
        rowGap             : spacers.default,

        itemsMinInlineSize : '200px',
        itemsMulBlockSize  : '0.5em',
    };
}, /*prefix: */'msry');
export const cssProps = cssConfig.refs;
export const cssDecls = cssConfig.decls;



// react components:

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        Elements.Props<TElement>
{
    // children:
    children? : React.ReactNode
}
export default function Masonry<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    const masonryStyles = styles.useStyles();

    // layouts:
    const masonryRef    = useRef<TElement>(null);



    useEffect(() => {
        const masonry = masonryRef.current;
        if (!masonry) return;

        
        
        const refreshItemSize = async (item: HTMLElement, itemsMulBlockSize: number) => {
            item.style.alignSelf = 'start';
            {
                const height = item.offsetHeight;
                const [marginBlockStart, marginBlockEnd] = (() => {
                    const style = getComputedStyle(item);

                    return [
                        Number.parseInt(style.marginBlockStart),
                        Number.parseInt(style.marginBlockEnd),
                    ];
                })();
                const totalHeight = height + marginBlockStart + marginBlockEnd;



                const spansNeeded = Math.round(totalHeight / itemsMulBlockSize);
                item.style.gridRowEnd = `span ${spansNeeded}`;
            }
            item.style.alignSelf = '';
        };
        
        const refreshItemsSize = async () => {
            const itemsMulBlockSize = Math.max(1, Number.parseInt(getComputedStyle(masonry).gridAutoRows) || 1);


            
            for (const item of (Array.from(masonry.children) as HTMLElement[])) {
                await refreshItemSize(item, itemsMulBlockSize);
            } // for
        }



        // update now:
        refreshItemsSize();

        // update at the future:
        window.addEventListener('resize', refreshItemsSize);
        return () => {
            window.removeEventListener('resize', refreshItemsSize);
        };
    }, []);



    return (
        <Element<TElement>
            // other props:
            {...props}


            // classes:
            mainClass={props.mainClass ?? masonryStyles.main}


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