/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Autofield } from "@measured/puck";
import { marginFields, paddingFields } from "./CommonBlockProps";
import EditorInput from "@/Components/EditorInput";

export const WYSIWYG = {
    label: "WYSIWYG",
    fields: {
        content: {
            type: "custom",
            render: ({ name, onChange, value }) => (
                <div className="wysiwyg-input bg-white">
                    <EditorInput
                        name={name}
                        value={value}
                        className="mt-1 block w-full text-xl h-16"
                        onChange={onChange}
                    />
                </div>
            ),
        },
    },
    defaultProps: {
        content:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto maiores excepturi delectus nam pariatur commodi libero, non impedit! Et labore ducimus perferendis placeat deserunt impedit fugiat. Reiciendis autem accusamus quam.",
    },
    render: ({ content, puck }) => {
        return (
            <div
                className="wysiwyg-content"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        );
    },
};
