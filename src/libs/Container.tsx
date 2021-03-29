// jss   (builds css  using javascript):
import { 
    create as createJss,
}                          from 'jss'               // base technology of our nodestrap components
import type { JssStyle }   from 'jss'               // ts defs support for jss
import { createUseStyles } from 'react-jss'         // base technology of our nodestrap components

import jssPluginGlobal     from 'jss-plugin-global'

import { PropEx }          from './Css'             // ts defs support for jss
import CssPropsManager     from './CssPropsManager' // A *css custom property* manager that manages & updates the *css props* stored at specified `rule`.
import type {
    Dictionary,
    ValueOf,
}                          from './CssPropsManager' // ts defs support for jss

// nodestrap (modular web components):
import
    breakpoints,
    * as breakpoint        from './breakpoints'

// other supports:
import { pascalCase }      from 'pascal-case'



// jss:

/**
 * A *css custom property* manager that manages & updates the *css props* stored at specified `rule`.
 */
const cssPropsManager = new CssPropsManager(() => {
    return {
        x    : '12px' as PropEx.Length,
        y    :  '9px' as PropEx.Length,
    
        xSm  : '24px' as PropEx.Length,
        ySm  : '18px' as PropEx.Length,
    
        xMd  : '36px' as PropEx.Length,
        yMd  : '27px' as PropEx.Length,
    
        xLg  : '48px' as PropEx.Length,
        yLg  : '36px' as PropEx.Length,
    
        xXl  : '60px' as PropEx.Length,
        yXl  : '45px' as PropEx.Length,
    
        xXxl : '72px' as PropEx.Length,
        yXxl : '54px' as PropEx.Length,
    };
}, /*prefix: */'con');
export const containers = cssPropsManager.refs;
// export default containers;



const styleBreakpoints : JssStyle = {};
for (const bpName in breakpoints) {
    const BpName = pascalCase(bpName);

    const x = (containers as Dictionary<ValueOf<typeof containers>|undefined>)[`x${BpName}`];
    const y = (containers as Dictionary<ValueOf<typeof containers>|undefined>)[`y${BpName}`];
    if (x || y) {
        Object.assign(styleBreakpoints, breakpoint.mediaUp(bpName, {
            ':root': {
                '--con-x': x || null,
                '--con-y': y || null,
            },
        }));
    } // if
} // for

createJss().setup({plugins:[
    jssPluginGlobal(),
]})
.createStyleSheet({
    '@global': {
        ...styleBreakpoints,
    },
})
.attach();



export const useStyles = createUseStyles({
    main: {
        padding : [[
            containers.y,
            containers.x
        ]],

        display  : 'block',
    },
});



export interface Props
    extends
        React.HTMLAttributes<HTMLOrSVGElement>
{
    tag?       : keyof JSX.IntrinsicElements
    classes?   : string[]

    children?  : React.ReactNode
}
export default function Container(props: Props) {
    const styles = useStyles();



    const Tag       = props.tag ?? 'div';
    const htmlProps = props as React.HTMLAttributes<HTMLOrSVGElement>;
    return (
        <Tag {...htmlProps}
            className={[
                styles.main,

                ...(props.classes ?? []),
                props.className,
            ].join(' ')}
        >
            {props.children}
        </Tag>
    );
}