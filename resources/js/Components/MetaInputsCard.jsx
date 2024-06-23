import { Label } from "@/shadcn/ui/label";
import ShadcnCard from "./ShadcnCard";
import { Input } from "@/shadcn/ui/input";
import InputError from "@/Components/InputError";
import { Textarea } from "@/shadcn/ui/textarea";

export default function MetaInputsCard({data, setData, errors}) {
    return (
        (data && <ShadcnCard className="space-y-4" title="Meta Description">
            <div>
                <Label htmlFor="meta_title">Meta Title</Label>
                <Input
                    id="meta_title"
                    type="text"
                    name="meta_title"
                    value={data.meta_title}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("meta_title", e.target.value)}
                />

                <InputError message={errors.meta_title} className="mt-2" />
            </div>
            <div>
                <Label htmlFor="meta_description">Meta Description</Label>
                <Textarea
                    id="meta_description"
                    type="text"
                    name="meta_description"
                    value={data.meta_description}
                    className="mt-1 block w-full"
                    onChange={(e) =>
                        setData("meta_description", e.target.value)
                    }
                />

                <InputError
                    message={errors.meta_description}
                    className="mt-2"
                />
            </div>
            <div>
                <Label htmlFor="meta_keyword">Meta Keyword</Label>
                <Input
                    id="meta_keyword"
                    type="text"
                    name="meta_keyword"
                    value={data.meta_keyword}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("meta_keyword", e.target.value)}
                />

                <InputError message={errors.meta_keyword} className="mt-2" />
            </div>
        </ShadcnCard>)
    );
}