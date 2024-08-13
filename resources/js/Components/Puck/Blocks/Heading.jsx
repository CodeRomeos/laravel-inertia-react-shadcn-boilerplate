/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Autofield } from "@measured/puck";
import { marginFields, paddingFields } from "./CommonBlockProps";

export const Heading = {
    label: "Heading",
    fields: {
        title: { type: "text" },
        type: {
            label: "Type",
            type: "select",
            options: [
                { label: "Heading 1", value: "h1" },
                { label: "Heading 2", value: "h2" },
                { label: "Heading 3", value: "h3" },
                { label: "Heading 4", value: "h4" },
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

        margins: marginFields.fields,
        paddings: paddingFields.fields,
    },
    defaultProps: {
        title: "Heading 1",
        type: "h1",
        align: "left",

        margins: marginFields.defaultProps,
        paddings: paddingFields.defaultProps,
    },
    render: ({ title, type, paddings, margins, align, puck }) => {
        switch (type) {
            case "h1":
                return (
                    <h1
                        className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-${align} ${paddingFields.classNames(paddings )} ${marginFields.classNames(margins)} `}
                    >
                        {title}
                    </h1>
                );
            case "h2":
                return (
                    <h2
                        className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-${align} ${paddingFields.classNames(paddings)} ${marginFields.classNames(margins)} `}
                    >
                        {title}
                    </h2>
                );
            case "h3":
                return (
                    <h3
                        className={`scroll-m-20 text-2xl font-semibold tracking-tight text-${align} ${paddingFields.classNames(paddings)} ${marginFields.classNames(margins)}`}
                    >
                        {title}
                    </h3>
                );
            case "h4":
                return (
                    <h4
                        className={`scroll-m-20 text-xl font-semibold tracking-tight text-${align} ${paddingFields.classNames(paddings)} ${marginFields.classNames(margins)}`}
                    >
                        {title}
                    </h4>
                );
            default:
                return <div>{title}</div>;
        }
    },
};
