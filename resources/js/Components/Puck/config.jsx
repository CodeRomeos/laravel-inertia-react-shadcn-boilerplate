import Header from "@/Layouts/header";
import { ButtonGroup } from "./Blocks/ButtonGroup";
import { Card } from "./Blocks/Card";
import { Columns } from "./Blocks/Columns";
import { Flex } from "./Blocks/Flex";
import SiteFooter from "@/Layouts/SiteFooter";


// Create Puck component config
export const config = {
    root: {
        // fields: {
        //     title: {type: "text"},
        //     description: {type: "textarea"},
        //     meta_title: {type: "text"},
        //     meta_description: {type: "textarea"},
        // },
        render: ({ children }) => {
            return <div className="">
                {/* <Header /> */}
                {children}
                {/* <SiteFooter /> */}
            </div>;
        },
    },
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
                return <p>{children}</p>;
            },
        },
    },
};
