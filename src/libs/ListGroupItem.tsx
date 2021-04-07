// react (builds html using javascript):
import React                from 'react'        // base technology of our nodestrap components

// nodestrap (modular web components):
import Content              from './Content'
import type * as Contents   from './Content'



// react components:

export interface Props
    extends
        Contents.Props
{
}
export default function ListGroupItem(props: Props) {
    return (
        <Content
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