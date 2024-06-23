import { Button } from "@/shadcn/ui/button";
import { Textarea } from "@/shadcn/ui/textarea";
import { useForm } from "@inertiajs/react";

export default function CommentForm({ modelType, modelId }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        body: "",
        model_type: modelType,
        model_id: modelId,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("comments.store"));
        reset();
    };

    return (
        <div className="" id="comments">
            <form onSubmit={submit} className="space-y-2">
                <Textarea
                    id="comment"
                    placeholder="Add a comment..."
                    value={data.body}
                    rows="2"
                    onChange={(e) => setData("body", e.target.value)}
                />
                <div className="text-right">

                    <Button type="submit" disabled={processing}>
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}
