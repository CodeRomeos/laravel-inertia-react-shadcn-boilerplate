/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Autofield, FieldLabel } from "@measured/puck";
import { marginFields, paddingFields, textColorField } from "./CommonBlockProps";
import { Input } from "@/shadcn/ui/input";
import { ImageIcon } from "lucide-react";

export const Image = {
    label: "Image",
    fields: {
        src: {
            label: "Select Image",
            type: "custom",
            name: "src",
            render: ({ name, label, onChange, value }) => (
                <FieldLabel label={label} className="">
                    <Input
                        type="file"
                        name={name}
                        onChange={(e) => {
                            if (
                                !e.currentTarget.files ||
                                e.currentTarget.files.length === 0
                            ) {
                                onChange(undefined);
                            }

                            const reader = new FileReader();
                            const file = e.currentTarget.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    onChange(btoa(e.target.result))
                                }
                                    
                                reader.readAsBinaryString(file);
                            }

                            // onChange(
                            //     URL.createObjectURL(e.currentTarget.files[0])
                            // );
                        }}
                    />
                </FieldLabel>
            ),
        },
        alt: { type: "text", name: "alt" },
        title: { type: "text", name: "title" },
        width: { type: "text", name: "width" },
        height: { type: "text", name: "height" },
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
    },
    defaultProps: {
        align: "left",
        margin: marginFields.defaultProps,
        padding: paddingFields.defaultProps,
        height: "auto",
        width: "auto",
    },
    render: ({ src, padding, margin, align, alt, title, height, width, puck }) => {
        if(!src) return <div className="w-full bg-slate-100 h-48 flex items-center justify-center">
            <ImageIcon className="w-8 h-8" />
        </div>
        return (
            <img
                src={`data:image;base64,${src}`}
                className={`inline-block ${align ? "text-" + align : ""} `}
                style={{
                    ...marginFields.style(margin),
                    ...paddingFields.style(padding),
                    ...{
                        width,
                        height
                    }
                }}
                alt={alt}
                title={title}
            />
        );
    },
};
