/* eslint-disable @next/next/no-img-element */
import React from "react";
import "./ButtonGroup.css";
import { Button } from "@/shadcn/ui/button";
import { Section } from "../../Components/Section";

export const ButtonGroup = {
    label: "Button Group",
    fields: {
        buttons: {
            type: "array",
            getItemSummary: (item) => item.label || "Button",
            arrayFields: {
                label: { type: "text" },
                href: { type: "text" },
                variant: {
                    type: "radio",
                    options: [
                        { label: "primary", value: "primary" },
                        { label: "secondary", value: "secondary" },
                    ],
                },
            },
            defaultItemProps: {
                label: "Button",
                href: "#",
                variant: "primary",
            },
        },
        align: {
            type: "radio",
            options: [
                { label: "left", value: "left" },
                { label: "center", value: "center" },
            ],
        },
    },
    defaultProps: {
        buttons: [{ label: "Learn more", href: "#", variant: "default" }],
    },
    render: ({ align, buttons, puck }) => {
        return (
            <Section
                className={`${
                    align === "center" ? "ButtonGroup-center" : "ButtonGroup"
                } p-3`}
            >
                <div className="ButtonGroup-actions">
                    {buttons.map((button, i) => (
                        <Button
                            key={i}
                            href={button.href}
                            variant={button.variant}
                            size="large"
                            tabIndex={puck.isEditing ? -1 : undefined}
                        >
                            {button.label}
                        </Button>
                    ))}
                </div>
            </Section>
        );
    },
};
