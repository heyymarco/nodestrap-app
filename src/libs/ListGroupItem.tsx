// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import Content              from './Content'
import type * as Contents   from './Content'



// react components:

export interface Props<TElement extends HTMLElement = HTMLElement>
    extends
        Contents.Props<TElement>
{
}
export default function ListGroupItem<TElement extends HTMLElement = HTMLElement>(props: Props<TElement>) {
    return (
        <Content<TElement>
            // other props:
            {...props}


            // classes:
            classes={[
                // additionals:
                ...(props.classes ?? []),
            ]}
        />
    );
}