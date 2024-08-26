/* eslint-disable @next/next/no-img-element */
import React from "react";
import "./ButtonGroup.css";
import { Button } from "@/shadcn/ui/button";
import { Section } from "../../Components/Section";
import { Link } from "@inertiajs/react";

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
                        { label: "Default", value: "default" },
                        { label: "Outline", value: "outline" },
                        { label: "Secondary", value: "secondary" },
                        { label: "Danger", value: "destructive" },
                        { label: "Ghost", value: "ghost" },
                        { label: "Link", value: "link" },
                    ],
                },
                size: {
                    type: "radio",
                    options: [
                        { label: "Small", value: "sm" },
                        { label: "Default", value: "default" },
                        { label: "Large", value: "lg" },
                    ],
                },
            },
            defaultItemProps: {
                label: "Button",
                href: "#",
                variant: "default",
                size: "default",
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
        buttons: [
            {
                label: "Learn more",
                href: "#",
                variant: "default",
                size: "default",
            },
        ],
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
                            asChild
                            variant={button.variant}
                            size={button.size}
                            tabIndex={puck.isEditing ? -1 : undefined}
                        >
                            <Link href={button.href}>{button.label}</Link>
                        </Button>
                    ))}
                </div>
            </Section>
        );
    },
};
