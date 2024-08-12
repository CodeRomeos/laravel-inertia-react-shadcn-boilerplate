import React from "react";
import "./Columns.css";
import { DropZone } from "@measured/puck";
import { Section } from "../../components/Section";


export const Columns = {
    fields: {
        distribution: {
            type: "radio",
            options: [
                {
                    value: "auto",
                    label: "Auto",
                },
                {
                    value: "manual",
                    label: "Manual",
                },
            ],
        },
        columns: {
            type: "array",
            getItemSummary: (col, id) =>
                `Column ${id + 1}, span ${
                    col.span ? Math.max(Math.min(col.span, 12), 1) : "auto"
                }`,
            arrayFields: {
                span: {
                    label: "Span (1-12)",
                    type: "number",
                    min: 0,
                    max: 12,
                },
            },
        },
    },
    defaultProps: {
        distribution: "auto",
        columns: [{}, {}],
    },
    render: ({ columns, distribution }) => {
        console.log({columns})
        return (
            <Section>
                <div
                    className="Columns"
                    style={{
                        gridTemplateColumns:
                            distribution === "manual"
                                ? "repeat(12, 1fr)"
                                : `repeat(${columns?.length}, 1fr)`,
                    }}
                >
                    {columns && columns.map(({ span }, idx) => (
                        <div
                            key={idx}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gridColumn:
                                    span && distribution === "manual"
                                        ? `span ${Math.max(
                                              Math.min(span, 12),
                                              1
                                          )}`
                                        : "",
                            }}
                        >
                            <DropZone
                                zone={`column-${idx}`}
                                disallow={["Hero", "Logos", "Stats"]}
                            />
                        </div>
                    ))}
                </div>
            </Section>
        );
    },
};
