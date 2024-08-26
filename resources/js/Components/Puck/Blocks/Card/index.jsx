/* eslint-disable @next/next/no-img-element */
import React from "react";
import "./Card.css";
import dynamicIconImports from "lucide-react/dynamicIconImports";


const icons = Object.keys(dynamicIconImports).reduce(async (acc, iconName) => {
    const El = await React.lazy(dynamicIconImports[iconName]);

    return {
        ...acc,
        [iconName]: <El />,
    };
}, {});

const iconOptions = Object.keys(dynamicIconImports).map((iconName) => ({
    label: iconName,
    value: iconName,
}));

export const Card = {
    fields: {
        title: { type: "text" },
        description: { type: "textarea" },
        icon: {
            type: "select",
            options: iconOptions,
        },
        mode: {
            type: "radio",
            options: [
                { label: "card", value: "card" },
                { label: "flat", value: "flat" },
            ],
        },
    },
    defaultProps: {
        title: "Title",
        description: "Description",
        icon: "Feather",
        mode: "flat",
    },
    render: ({ title, icon, description, mode }) => {
        return (
            <div className={`${mode === "flat" ? "Card" : "Card-card"}`}>
                {/* <div className="Card-icon">{icons[icon]}</div> */}
                <div className="Card-title">{title}</div>
                <div className="Card-description">{description}</div>
            </div>
        );
    },
};
