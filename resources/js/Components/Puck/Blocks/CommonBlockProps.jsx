import { Input } from "@/shadcn/ui/input";
import { FieldLabel } from "@measured/puck";

export const spacingOptions = [
    { label: "8px", value: "8px" },
    { label: "16px", value: "16px" },
    { label: "24px", value: "24px" },
    { label: "32px", value: "32px" },
    { label: "40px", value: "40px" },
    { label: "48px", value: "48px" },
    { label: "56px", value: "56px" },
    { label: "64px", value: "64px" },
    { label: "72px", value: "72px" },
    { label: "80px", value: "80px" },
    { label: "88px", value: "88px" },
    { label: "96px", value: "96px" },
    { label: "104px", value: "104px" },
    { label: "112px", value: "112px" },
    { label: "120px", value: "120px" },
    { label: "128px", value: "128px" },
    { label: "136px", value: "136px" },
    { label: "144px", value: "144px" },
    { label: "152px", value: "152px" },
    { label: "160px", value: "160px" },
];

// Tailwind margin/paddings values
export const marginPaddingValues = [
    0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96
]

export const marginPaddingSelectOptions = marginPaddingValues.map((value) => ({
    label: value,
    value,
}));


export const marginFields = {
    fields: {
        getItemSummary: (item) => item.label || "Set Margin",
        type: "object",
        objectFields: {
            top: { type: "number" },
            bottom: { type: "number" },
            left: { type: "number" },
            right: { type: "number" },
        },
    },
    defaultProps: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    classNames: (v) => {
        v = v ? v : { top: 0, bottom: 0, left: 0, right: 0 };
        return `mt-[${v.top}px] mb-[${v.bottom}px] ml-[${v.left}px] mr-[${v.right}px]`;
    },
    style: (v) => {
        v = v ? v : { top: 0, bottom: 0, left: 0, right: 0 };
        return {
            marginTop: `${v.top}px`,
            marginBottom: `${v.bottom}px`,
            marginLeft: `${v.left}px`,
            marginRight: `${v.right}px`,
        };
    },
};

export const paddingFields = {
    fields: {
        getItemSummary: (item) => item.label || "Set Padding",
        type: "object",
        objectFields: {
            top: { type: "number" },
            bottom: { type: "number" },
            left: { type: "number" },
            right: { type: "number" },
        },
    },
    defaultProps: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    classNames: (v) => {
        v = v ? v : { top: 0, bottom: 0, left: 0, right: 0 };
        return `pt-[${v.top}px] pb-[${v.bottom}px] pl-[${v.left}px] pr-[${v.right}px]`;
    },
    style: (v) => {
        v = v ? v : { top: 0, bottom: 0, left: 0, right: 0 };
        return {
            paddingTop: `${v.top}px`,
            paddingBottom: `${v.bottom}px`,
            paddingLeft: `${v.left}px`,
            paddingRight: `${v.right}px`,
        };
    },
};

export const textColorField = {
    fields: {
        type: "custom",
        render: ({ name, onChange, value }) => (
            <FieldLabel label="Color">
                <Input
                    type="color"
                    defaultValue={value}
                    name={name}
                    onChange={(e) => onChange(e.currentTarget.value)}
                />
            </FieldLabel>
        ),
    },
    defaultProps: "#000000",

    style: (c) => {
        return {
            color: c,
        };
    },
};