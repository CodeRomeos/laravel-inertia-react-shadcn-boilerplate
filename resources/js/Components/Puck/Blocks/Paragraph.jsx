/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Autofield } from "@measured/puck";
import { marginFields, paddingFields, textColorField } from "./CommonBlockProps";

export const Paragraph = {
    label: "Paragraph",
    fields: {
        body: { type: "textarea", autosize: true, name: "body", id: "body" },
        align: {
            type: "radio",
            options: [
                { label: "left", value: "left" },
                { label: "center", value: "center" },
                { label: "right", value: "right" },
            ],
        },

        margin: marginFields.fields,
        padding: paddingFields.fields,
        textColor: textColorField.fields
    },
    defaultProps: {
        body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto maiores excepturi delectus nam pariatur commodi libero, non impedit! Et labore ducimus perferendis placeat deserunt impedit fugiat. Reiciendis autem accusamus quam.",
        align: "left",
        margin: marginFields.defaultProps,
        padding: paddingFields.defaultProps,
        textColor: textColorField.defaultProps
    },
    render: ({ body, padding, margin, align, textColor, puck }) => {
        return (
            <p
                className={`${align ? "text-" + align : ""} `}
                style={{
                    ...marginFields.style(margin),
                    ...paddingFields.style(padding),
                    ...textColorField.style(textColor),
                }}
            >
                {body}
            </p>
        );
    },
};
