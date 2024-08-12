import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";
import { config } from './config';

export function PuckEditor({ onPublish, value = {} }) {
    return <Puck config={config} data={value || {}} onPublish={onPublish} />;
}
