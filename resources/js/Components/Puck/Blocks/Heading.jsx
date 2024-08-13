/* eslint-disable @next/next/no-img-element */
import React from "react";

export const Heading = {
    label: "Heading",
    fields: {
        title: { type: "text" },
        type: {
            type: "radio",
            options: [
                { label: "h1", value: "h1" },
                { label: "h2", value: "h2" },
                { label: "h3", value: "h3" },
                { label: "h4", value: "h4" },
            ],
        },
        align: {
            type: "radio",
            options: [
                { label: "left", value: "left" },
                { label: "center", value: "center" },
                { label: "right", value: "right" },
            ],
        },
        // paddingTop: { type: "number", min: 0, max: 100 },
        // paddingBottom: { type: "number", min: 0, max: 100 },
        // paddingLeft: { type: "number", min: 0, max: 100 },
        // paddingRight: { type: "number", min: 0, max: 100 },

        margins: {
            type: "array",
            getItemSummary: (item) => item.label || "Margin",
            arrayFields: {
                top: { label: "Top", type: "number", min: 0, max: 100 },
                bottom: {
                    label: "Bottom",
                    type: "number",
                    min: 0,
                    max: 100,
                },
                left: { label: "Left", type: "number", min: 0, max: 100 },
                right: {
                    label: "Right",
                    type: "number",
                    min: 0,
                    max: 100,
                },
            },
            max: 1,
        },
        paddings: {
            type: "array",
            getItemSummary: (item) => item.label || "Padding",
            arrayFields: {
                top: { label: "Top", type: "number", min: 0, max: 100 },
                bottom: {
                    label: "Bottom",
                    type: "number",
                    min: 0,
                    max: 100,
                },
                left: { label: "Left", type: "number", min: 0, max: 100 },
                right: {
                    label: "Right",
                    type: "number",
                    min: 0,
                    max: 100,
                },
            },
            max: 1,
        },
    },
    defaultProps: {
        title: "Heading 1",
        type: "h1",
        align: "left",

        margins: [{
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        }],
        paddings: [{
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        }],
    },
    render: ({
        title,
        type,
        paddings,
        margins,
        align,
        puck,
    }) => {
        const margin = margins[0];
        const padding = paddings[0];
        switch (type) {
            case "h1":
                return (
                    <h1
                        className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-${align} pt-[${padding.top}px] pb-[${padding.bottom}px] pl-[${padding.left}px] pr-[${padding.right}px] mt-[${margin.top}px] mb-[${margin.bottom}px] ml-[${margin.left}px] mr-[${margin.right}px] 
                    `}
                    >
                        {title}
                    </h1>
                );
            case "h2":
                return (
                    <h2
                        className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-${align} pt-[${padding.top}px] pb-[${padding.bottom}px] pl-[${padding.left}px] pr-[${padding.right}px] mt-[${margin.top}px] mb-[${margin.bottom}px] ml-[${margin.left}px] mr-[${margin.right}px]
                        `}
                    >
                        {title}
                    </h2>
                );
            case "h3":
                return (
                    <h3
                        className={`scroll-m-20 text-2xl font-semibold tracking-tight text-${align} pt-[${padding.top}px] pb-[${padding.bottom}px] pl-[${padding.left}px] pr-[${padding.right}px] mt-[${margin.top}px] mb-[${margin.bottom}px] ml-[${margin.left}px] mr-[${margin.right}px]
                        `}
                    >
                        {title}
                    </h3>
                );
            case "h4":
                return (
                    <h4
                        className={`scroll-m-20 text-xl font-semibold tracking-tight text-${align} pt-[${padding.top}px] pb-[${padding.bottom}px] pl-[${padding.left}px] pr-[${padding.right}px] mt-[${margin.top}px] mb-[${margin.bottom}px] ml-[${margin.left}px] mr-[${margin.right}px]
                        `}
                    >
                        {title}
                    </h4>
                );
            default:
                return <div>{title}</div>;
        }
    },
};
