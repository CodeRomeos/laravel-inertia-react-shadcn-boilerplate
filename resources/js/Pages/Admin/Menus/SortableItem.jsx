import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { Button } from "@/shadcn/ui/button";

export default function SortableItem(props) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: props.id });

    const style = {
        display: 'flex',
        alignItems: 'center',
        padding: "0.5rem",
        transform: CSS.Transform.toString(transform),
        transition,
        border: "1px solid gray",
    };

    return (
        <div style={style}>
            <Button variant="ghost" size="icon" ref={setNodeRef} {...attributes} {...listeners}>
                <GripVertical className="h-4 w-4" />
            </Button>
            <div>
                {props.children}
            </div>
        </div>
    );
}
