/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button } from "@/shadcn/ui/button";
import { Link } from "@inertiajs/react";
import { AlignCenterVertical, AlignEndVertical, AlignHorizontalSpaceAround, AlignHorizontalSpaceBetween, AlignStartVertical } from "lucide-react";

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
                { label: <AlignStartVertical className="mx-auto" size={18} />, value: "start" },
                { label: <AlignCenterVertical className="mx-auto" size={18} />, value: "center" },
                { label: <AlignEndVertical className="mx-auto" size={18} />, value: "end" },
            ],
        },
        justify: {
            label: "Justify Content",
            type: "radio",
            options: [
                { label: <AlignStartVertical className="mx-auto" size={18} />, value: "start" },
                { label: <AlignCenterVertical className="mx-auto" size={18} />, value: "center" },
                { label: <AlignEndVertical className="mx-auto" size={18} />, value: "end" },
                { label: <AlignHorizontalSpaceBetween className="mx-auto" size={18} />, value: "between" },
                { label: <AlignHorizontalSpaceAround className="mx-auto" size={18} />, value: "around" },
                
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
    render: ({ align, justify, buttons, puck }) => {
        return (
            <div className={`flex align-${align} justify-${justify}`}>
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
        );
    },
};
