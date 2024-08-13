import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";
import { config } from './config';
import { Button } from "@/shadcn/ui/button";


export const overrides = {
    headerActions: ({ children }) => (
        <>
            {children}
            <Button variant="default" size="sm" onClick={() => window.location.reload()}>Close</Button>
        </>
    ),
};

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
