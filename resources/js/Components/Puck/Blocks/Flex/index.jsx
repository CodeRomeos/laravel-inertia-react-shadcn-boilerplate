import React from "react";
import "./Flex.css";
import { DropZone } from "@measured/puck";
import { Section } from "../../Components/Section";
import { AlignCenterHorizontal, AlignCenterVertical, AlignEndHorizontal, AlignEndVertical, AlignStartHorizontal, AlignStartVertical } from "lucide-react";


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
        verticalAlign: {
            label: "Vertical Align",
            type: "radio",
            options: [
                { label: <AlignStartHorizontal className="mx-auto" size={18} />, value: "start" },
                { label: <AlignCenterHorizontal className="mx-auto" size={18} />, value: "center" },
                { label: <AlignEndHorizontal className="mx-auto" size={18} />, value: "end" },  
            ],
        },
        justify: {
            label: "Justify Content",
            type: "radio",
            options: [
                { label: <AlignStartVertical className="mx-auto" size={18} />, value: "start" },
                { label: <AlignCenterVertical className="mx-auto" size={18} />, value: "center" },
                { label: <AlignEndVertical className="mx-auto" size={18} />, value: "end" },
                
            ],
        },
    },
    defaultProps: {
        items: [{}, {}],
        minItemWidth: 356,
        verticalAlign: "center",
        justify: "center",
    },
    render: ({ items, verticalAlign, justify, minItemWidth }) => {
        return (
            <Section>
                <div className={`flexblock justify-${justify} items-${verticalAlign}`}>
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="flexblock-item"
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
