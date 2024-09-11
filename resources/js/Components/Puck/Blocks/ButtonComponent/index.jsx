/* eslint-disable @next/next/no-img-element */
import React from "react";
import "./Button.css";
import { Button } from "@/shadcn/ui/button";
import { Section } from "../../Components/Section";
import { Link } from "@inertiajs/react";

export const ButtonComponent = {
    label: "Button",
    fields: {
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
        align: {
            type: "radio",
            options: [
                { label: "left", value: "left" },
                { label: "center", value: "center" },
                { label: "right", value: "right" },
            ],
        },
    },
    defaultProps: {
        label: "Button",
        href: "#",
        variant: "default",
        size: "default",
        align: "left",
    },
    render: ({ align, size, href, label, variant, puck }) => {
        return (
            <div
                className={`text-${align}`}
            >
                <Button
                    asChild
                    variant={variant}
                    size={size}
                    tabIndex={puck.isEditing ? -1 : undefined}
                >
                    <Link href={href}>{label}</Link>
                </Button>
            </div>
        );
    },
};
