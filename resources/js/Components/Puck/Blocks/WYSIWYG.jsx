/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Autofield } from "@measured/puck";
import { marginFields, paddingFields } from "./CommonBlockProps";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcn/ui/dialog";
import SmallEditorInput from "@/Components/SmallEditorInput";
import { Button } from "@/shadcn/ui/button";

export const WYSIWYG = {
    label: "WYSIWYG",
    fields: {
        wysiwygContent: {
            type: "custom",
            render: ({ name, onChange, value }) => (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="w-full" type="button">Open Editor</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[900px]">
                        <DialogHeader>
                            <DialogTitle>WYSIWYG Editor</DialogTitle>
                        </DialogHeader>
                        <div className="wysiwyg-input bg-white w-full">
                            <SmallEditorInput
                                key={name}
                                name={name}
                                id={name}
                                value={value}
                                className="mt-1 block w-full text-xl h-16"
                                onChange={onChange}
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            ),
        },
    },
    defaultProps: {
        wysiwygContent:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto maiores excepturi delectus nam pariatur commodi libero, non impedit! Et labore ducimus perferendis placeat deserunt impedit fugiat. Reiciendis autem accusamus quam.",
    },
    render: ({ wysiwygContent, puck }) => {
        return (
            <div
                className="wysiwyg-content"
                dangerouslySetInnerHTML={{ __html: wysiwygContent }}
            />
        );
    },
};
