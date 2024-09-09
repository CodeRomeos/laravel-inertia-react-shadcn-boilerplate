/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcn/ui/dialog";
import { Button } from "@/shadcn/ui/button";
import HTMLCodeEditorInput from "@/Components/HTMLCodeEditorInput";

export const HTMLCodeEditor = {
    label: "HTML",
    fields: {
        htmlContent: {
            type: "custom",
            render: ({ name, onChange, value }) => (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="w-full" type="button">
                            Open HTML Editor
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[900px]">
                        <DialogHeader>
                            <DialogTitle>HTML Editor</DialogTitle>
                        </DialogHeader>
                        <div className="html-editor-input bg-white w-full">
                            <HTMLCodeEditorInput
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
        htmlContent:
`<div>
    <em>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</em>
</div>`,
    },
    render: ({ htmlContent, puck }) => {
        return (
            <div
                className="code-editor-content"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
        );
    },
};
