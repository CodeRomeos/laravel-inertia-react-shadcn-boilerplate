import { ButtonGroup } from "./Blocks/ButtonGroup";
import { Card } from "./Blocks/Card";
import { Columns } from "./Blocks/Columns";
import { Flex } from "./Blocks/Flex";
import { Heading } from "./Blocks/Heading";
import { Paragraph } from "./Blocks/Paragraph";
import { WYSIWYG } from "./Blocks/WYSIWYG";
import { HTMLCodeEditor } from "./Blocks/HTMLCodeEditor";
import { WYSIWYG2 } from "./Blocks/WYSIWYG2";
import { Image } from "./Blocks/Image";
import { VerticalSpace } from "./Blocks/VerticalSpace";
import { ButtonComponent } from "./Blocks/ButtonComponent";



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
            return (
                <div className="">
                    {children}
                </div>
            );
        },
    },
    categories: {
        typography: {
            components: ["Heading", "Paragraph"],
        },
        editors: {
            components: ["WYSIWYG", "HTMLCodeEditor", "WYSIWYG2"],
        },
        layouts: {
            components: ["Flex", "Columns"],
        },
        blocks: {
            components: ["ButtonComponent", "Card", "ButtonGroup", "Image", "VerticalSpace"],
        },
    },
    components: {
        Flex,
        Columns,
        ButtonComponent,
        ButtonGroup,
        Card,
        Heading,
        Paragraph,
        WYSIWYG,
        WYSIWYG2,
        HTMLCodeEditor,
        Image,
        VerticalSpace
    },
};
