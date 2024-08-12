import React from "react";
import "./Flex.css";
import { DropZone } from "@measured/puck";
import { Section } from "../../Components/Section";


export const Flex = {
    fields: {
        items: {
            type: "array",
            arrayFields: {
                minItemWidth: {
                    label: "Minimum Item Width",
                    type: "number",
                    min: 0,
                },
            },
            getItemSummary: (_, id) => `Item ${id + 1}`,
        },
        minItemWidth: {
            label: "Minimum Item Width",
            type: "number",
            min: 0,
        },
    },
    defaultProps: {
        items: [{}, {}],
        minItemWidth: 356,
    },
    render: ({ items, minItemWidth }) => {
        return (
            <Section>
                <div className="Flex">
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="Flex-item"
                            style={{
                                minWidth: item.minItemWidth || minItemWidth,
                            }}
                        >
                            <DropZone zone={`item-${idx}`} />
                        </div>
                    ))}
                </div>
            </Section>
        );
    },
};
