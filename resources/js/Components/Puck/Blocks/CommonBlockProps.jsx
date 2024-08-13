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
        type: "array",
        label: "Margins",
        max: 1,
        min: 1,
        getItemSummary: (item) => item.label || "Set Margins",
        arrayFields: {
            top: {
                label: "Top",
                min: 0,
                max: 100,
                type: "select",
                options: marginPaddingSelectOptions,
            },
            bottom: {
                label: "Bottom",
                min: 0,
                max: 100,
                type: "select",
                options: marginPaddingSelectOptions,
            },
            left: {
                label: "Left",
                min: 0,
                max: 100,
                type: "select",
                options: marginPaddingSelectOptions,
            },
            right: {
                label: "Right",
                min: 0,
                max: 100,
                type: "select",
                options: marginPaddingSelectOptions,
            },
        },
    },
    defaultProps: [
        {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        },
    ],
    classNames: (ms) => {
        const v = ms[0] ? ms[0] : { top: 0, bottom: 0, left: 0, right: 0 };
        return `mt-${v.top} mb-${v.bottom} ml-${v.left} mr-${v.right}`;
    },
};

export const paddingFields = {
    fields: {
        type: "array",
        label: "Paddings",
        max: 1,
        min: 1,
        getItemSummary: (item) => item.label || "Set Paddings",
        arrayFields: {
            top: {
                label: "Top",
                min: 0,
                max: 100,
                type: "select",
                options: marginPaddingSelectOptions,
            },
            bottom: {
                label: "Bottom",
                min: 0,
                max: 100,
                type: "select",
                options: marginPaddingSelectOptions,
            },
            left: {
                label: "Left",
                min: 0,
                max: 100,
                type: "select",
                options: marginPaddingSelectOptions,
            },
            right: {
                label: "Right",
                min: 0,
                max: 100,
                type: "select",
                options: marginPaddingSelectOptions,
            },
        },
    },
    defaultProps: [
        {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        },
    ],
    classNames: (ps) => {
        const v = ps[0] ? ps[0] : { top: 0, bottom: 0, left: 0, right: 0 };
        return `pt-${v.top} pb-${v.bottom} pl-${v.left} pr-${v.right}`;
    },
};