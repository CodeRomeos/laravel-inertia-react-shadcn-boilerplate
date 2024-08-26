import { DropZone } from "@measured/puck";

export default function Columns() {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <DropZone zone="left-column" />
            <DropZone zone="right-column" />
        </div>
    );
}
