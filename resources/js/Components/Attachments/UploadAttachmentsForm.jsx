import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { useForm } from "@inertiajs/react";
import InputError from "../InputError";
import { Loader2 } from "lucide-react";

export default function UploadAttachmentsForm({ action }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        attachments: "",
    });

    const uploadAttachment = (e) => {
        e.preventDefault();
        post(action);
        reset();
    };

    return (
        <form onSubmit={uploadAttachment}>
            <div className="flex gap-2 items-center">
                <Input
                    id="attachments"
                    type="file"
                    name="attachments"
                    // value={data.attachments}
                    multiple
                    className="mt-1 block w-full"
                    onChange={(e) => {
                        setData("attachments", e.target.files);
                    }}
                />
                <Button variant='outline' type="submit" className="mt-2" disabled={processing}>
                    {processing && (
                        <Loader2 className="animate-spin mr-3" size={18} />
                    )}{" "}
                    {processing ? "Uploading..." : "Upload"}
                </Button>
            </div>
            <InputError message={errors.attachments} className="mt-2" />
        </form>
    );
}
