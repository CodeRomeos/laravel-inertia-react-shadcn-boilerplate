import { React } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";
import UserInfoCard from "../UserInfoCard";
import { Textarea } from "@/shadcn/ui/textarea";
import { Button } from "@/shadcn/ui/button";
import { useForm, usePage } from "@inertiajs/react";
import { Loader, Loader2 } from "lucide-react";

export default function StatusUpdateForm({model, modelType, modelId}) {
    const { allStatuses } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        status: model.latest_status ? model.latest_status.status : "",
        body: "",
        model_id: modelId,
        model_type: modelType
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("statuses.store"));
        setData("body", "");
    };

    return (
        <form className="space-y-4" onSubmit={submit}>
            <Select
                className="w-full block"
                value={data.status}
                onValueChange={(value) => setData("status", value)}
            >
                <SelectTrigger className="w-full h-8">
                    <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {allStatuses.map((status) => (
                            <SelectItem value={status}>{status}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Textarea
                id="message"
                placeholder="Message (if any)"
                value={data.body}
                onChange={(e) => setData("body", e.target.value)}
            />
            <div className="text-right">
                <Button size="sm" className="h-8" disabled={processing}>
                    {processing && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {processing ? "Saving" : "Save"}
                </Button>
            </div>
        </form>
    );
}
