/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Autofield } from "@measured/puck";
import { bgColorField, borderField, borderRadiusField, marginFields, paddingFields, textColorField } from "./CommonBlockProps";

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

        margin: marginFields.fields,
        padding: paddingFields.fields,
        textColor: textColorField.fields,
        bgColor: bgColorField.fields,
        border: borderField.fields,
        borderRadius: borderRadiusField.fields,
    },
    defaultProps: {
        title: "Heading 1",
        type: "h1",
        align: "left",

        margin: marginFields.defaultProps,
        padding: paddingFields.defaultProps,
        textColor: textColorField.defaultProps,
        bgColor: bgColorField.defaultProps,
        border: borderField.defaultProps,
        borderRadius: borderRadiusField.defaultProps,
    },
    render: ({
        title,
        type,
        padding,
        margin,
        bgColor,
        border,
        borderRadius,
        textColor,
        align,
        puck,
    }) => {
        switch (type) {
            case "h1":
                return (
                    <h1
                        className={`block scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${
                            align ? "text-" + align : ""
                        } `}
                        style={{
                            ...marginFields.style(margin),
                            ...paddingFields.style(padding),
                            ...textColorField.style(textColor),
                            ...bgColorField.style(bgColor),
                            ...borderField.style(border),
                            ...borderRadiusField.style(borderRadius),
                        }}
                    >
                        {title}
                    </h1>
                );
            case "h2":
                return (
                    <h2
                        className={`block scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${
                            align ? "text-" + align : ""
                        } `}
                        style={{
                            ...marginFields.style(margin),
                            ...paddingFields.style(padding),
                            ...textColorField.style(textColor),
                            ...bgColorField.style(bgColor),
                            ...borderField.style(border),
                            ...borderRadiusField.style(borderRadius),
                        }}
                    >
                        {title}
                    </h2>
                );
            case "h3":
                return (
                    <h3
                        className={`block scroll-m-20 text-2xl font-semibold tracking-tight ${
                            align ? "text-" + align : ""
                        } `}
                        style={{
                            ...marginFields.style(margin),
                            ...paddingFields.style(padding),
                            ...textColorField.style(textColor),
                            ...bgColorField.style(bgColor),
                            ...borderField.style(border),
                            ...borderRadiusField.style(borderRadius),
                        }}
                    >
                        {title}
                    </h3>
                );
            case "h4":
                return (
                    <h4
                        className={`block scroll-m-20 text-xl font-semibold tracking-tight ${
                            align ? "text-" + align : ""
                        } `}
                        style={{
                            ...marginFields.style(margin),
                            ...paddingFields.style(padding),
                            ...textColorField.style(textColor),
                            ...bgColorField.style(bgColor),
                            ...borderField.style(border),
                            ...borderRadiusField.style(borderRadius),
                        }}
                    >
                        {title}
                    </h4>
                );
            default:
                return <div>{title}</div>;
        }
    },
};
