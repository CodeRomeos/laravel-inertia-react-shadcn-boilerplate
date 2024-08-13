import Header from "@/Layouts/header";
import { ButtonGroup } from "./Blocks/ButtonGroup";
import { Card } from "./Blocks/Card";
import { Columns } from "./Blocks/Columns";
import { Flex } from "./Blocks/Flex";
import SiteFooter from "@/Layouts/SiteFooter";
import { Heading } from "./Blocks/Heading";
import { Paragraph } from "./Blocks/Paragraph";
import { WYSIWYG } from "./Blocks/WYSIWYG";


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
            components: ["Heading", "Paragraph"],
        },
    },
    components: {
        Flex,
        Columns,
        ButtonGroup,
        Card,
        Heading,
        Paragraph,
        WYSIWYG
    },
};
