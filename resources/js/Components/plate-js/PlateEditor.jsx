"use client";

import React, { useRef } from "react";
import { cn } from "@udecode/cn";
import { CommentsProvider } from "@udecode/plate-comments";
import { Plate } from "@udecode/plate-common";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { CommentsPopover } from "@/shadcn/plate-ui/comments-popover";
import { Editor } from "@/shadcn/plate-ui/editor";
import { FixedToolbar } from "@/shadcn/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/shadcn/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/shadcn/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/shadcn/plate-ui/floating-toolbar-buttons";
// import { MentionCombobox } from "@/shadcn/plate-ui/mention-combobox";
import { plugins } from "./plugins";
import { TooltipProvider } from "@/shadcn/plate-ui/tooltip";

export default function PlateEditor() {
    const containerRef = useRef(null);

    const initialValue = [
        {
            id: "1",
            type: ELEMENT_PARAGRAPH,
            children: [{ text: "Hello, World!" }],
        },
    ];

    return (
        <TooltipProvider>
            <DndProvider backend={HTML5Backend}>
                <CommentsProvider users={[]} myUserId={1}>
                    <Plate plugins={plugins} initialValue={initialValue}>
                        <div
                            ref={containerRef}
                            className={cn(
                                "relative",
                                // Block selection
                                "[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4"
                            )}
                        >
                            <FixedToolbar>
                                <FixedToolbarButtons />
                            </FixedToolbar>

                            <Editor
                                className="px-[96px] py-16"
                                autoFocus
                                focusRing={false}
                                variant="ghost"
                                size="md"
                            />

                            <FloatingToolbar>
                                <FloatingToolbarButtons />
                            </FloatingToolbar>

                            <CommentsPopover />
                        </div>
                    </Plate>
                </CommentsProvider>
            </DndProvider>
        </TooltipProvider>
    );
}
