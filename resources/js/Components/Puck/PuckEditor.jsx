import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";
import { config } from './config';
import { Button } from "@/shadcn/ui/button";


const overrides = {
    headerActions: ({ children }) => (
        <>
            {children}
            <Button variant="default" size="sm" onClick={() => window.location.reload()}>Close</Button>
        </>
    ),
};

export function PuckEditor({ onPublish, value = {}, ...any }) {
    return (
        <Puck
            config={config}
            overrides={overrides}
            data={value || {}}
            {...any}
        />
    );
}
