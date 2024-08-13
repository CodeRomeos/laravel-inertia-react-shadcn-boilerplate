import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";
import { config } from './config';
import { Button } from "@/shadcn/ui/button";
import { MonitorIcon, SmartphoneIcon, TabletSmartphone } from "lucide-react";


export const overrides = {
    headerActions: ({ children }) => (
        <>
            {children}
            <Button variant="default" size="sm" onClick={() => window.location.reload()}>Close</Button>
        </>
    ),
};

export const viewports = [
    {
        width: 360,
        height: 400,
        icon: <SmartphoneIcon />,
        label: "Small",
    },
    {
        width: 768,
        height: "600",
        icon: <TabletSmartphone />,
        label: "Medium",
    },
    {
        width: 1280,
        height: "800",
        icon: <MonitorIcon />,
        label: "Large",
    },
];

export function PuckEditor({ value = {}, ...any }) {
    return (
        <Puck config={config} overrides={overrides} data={value || {}} {...any}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                    gridGap: 16,
                }}
            >

                <div>
                    {/* Render the drag-and-drop preview */}
                    <Puck.Preview />
                </div>
                <div>
                    {/* Render the component list */}
                    <Puck.Components />
                </div>
            </div>
        </Puck>
        // <Puck config={config} overrides={overrides} data={value || {}} {...any}/>
    );
}
