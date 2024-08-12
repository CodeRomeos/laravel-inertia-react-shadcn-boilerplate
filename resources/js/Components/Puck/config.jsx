import { ButtonGroup } from "./Blocks/ButtonGroup";
import { Card } from "./Blocks/Card";
import { Columns } from "./Blocks/Columns";
import { Flex } from "./Blocks/Flex";


// Create Puck component config
export const config = {
    categories: {
        typography: {
            components: ["HeadingBlock", "ParagraphBlock"],
        },
    },
    components: {
        Flex,
       Columns,
       ButtonGroup,
       Card,
        HeadingBlock: {
            fields: {
                children: {
                    type: "text",
                },
            },
            render: ({ children }) => {
                return <h1 className="text-3xl font-bold my-3">{children}</h1>;
            },
        },
        ParagraphBlock: {
            fields: {
                children: {
                    type: "textarea",
                },
            },
            render: ({ children }) => {
                return <p >{children}</p>;
            },
        },
    },
};
