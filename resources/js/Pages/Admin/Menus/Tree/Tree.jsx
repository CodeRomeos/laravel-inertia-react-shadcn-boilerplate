import React from "react";

import { SortableTree } from "./SortableTree";

export default {
    title: "Examples/Tree/Sortable",
};

const Wrapper = ({ children }) => (
    <div
        style={{
            maxWidth: 600,
            padding: 10,
            margin: "0 auto",
            marginTop: "10%",
        }}
    >
        {children}
    </div>
);

export const AllFeatures = () => (
    <Wrapper>
        <SortableTree collapsible indicator removable />
    </Wrapper>
);

