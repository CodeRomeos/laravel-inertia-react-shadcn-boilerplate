import React, { useState } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";

export default function MenuForm() {
    const [activeId, setActiveId] = useState(null);
    const [items, setItems] = useState([
       { id: 1, label: "Item 1", value: "item-1" },
       { id: 2, label: "Item 2", value: "item-2" },
       { id: 3, label: "Item 3", value: "item-3" },
       { id: 4, label: "Item 4", value: "item-4" },
       { id: 5, label: "Item 5", value: "item-5" },
    ]);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    
    React.useEffect(() => {
        console.log(items);
    }, [items]);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            nDragStart={handleDragStart}
        >
            <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
            >
                {items.map((item) => (
                    <SortableItem key={item.id} id={item.id}>
                        {item.label}
                    </SortableItem>
                ))}
            </SortableContext>
        </DndContext>
    );

    function handleDragStart(event) {
        setActiveId(event.active.id);
    }

    function handleDragEnd(event) {
        const { active, over } = event;
        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex(item => item.id == active.id);
                const newIndex = items.findIndex(item => item.id == over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
        setActiveId(null);
    }
}
