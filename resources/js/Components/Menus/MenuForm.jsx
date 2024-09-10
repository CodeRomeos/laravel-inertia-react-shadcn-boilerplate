import React, { useState } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    MeasuringStrategy,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";


const measuring = {
    droppable: {
        strategy: MeasuringStrategy.Always,
    },
};

export default function MenuForm() {
    const [activeId, setActiveId] = useState(null);
    const [items, setItems] = useState([
        {
            id: "Home",
            label: "Home",
            children: [],
        },
        {
            id: "Collections",
            label: "Collections",
            children: [
                { id: "Spring", children: [] },
                { id: "Summer", children: [] },
                { id: "Fall", children: [] },
                { id: "Winter", children: [] },
            ],
        },
        {
            id: "About Us",
            label: "About Us",
            children: [],
        },
        {
            id: "My Account",
            label: "My Account",
            children: [
                { id: "Addresses", children: [] },
                { id: "Order History", children: [] },
            ],
        },
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
            measuring={measuring}
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
