import React from "react";
import { Label } from "@/shadcn/ui/label";
import { Input } from "@/shadcn/ui/input";
import InputError from "../InputError";
import { Button } from "@/shadcn/ui/button";
import { useForm, usePage } from "@inertiajs/react";
import { textToSlug } from "@/Helpers/GlobalFunctions";
import LoadingButton from "../LoadingButton";
import EditorInput from "../EditorInput";

export default function FormForm({page, personTitles}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: page ? page?.title : '',
        slug: page ? page?.slug : '',
        body: page ? page?.body : '',
        status: page ? page?.status : 0,
        meta_title: page ? page?.meta_title : '',
        meta_description: page ? page?.meta_description : '',
    });

    const submit = (e) => {
        e.preventDefault();

        if (page) {
            post(route("admin.pages.update", { id: page.id }));
        } else {
            post(route("admin.pages.store"));
        }
    };

    React.useEffect(() => {
        if (!page) {
            setData("slug", textToSlug(data.title));
        } else {
            setData("title", data.title);
        }
    }, [data.title]);

    return (
        <form onSubmit={submit} className="space-y-4">
            {/* First name & last name */}
            <div className="space-y-4">
                {/* Title */}
                <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        type="text"
                        name="title"
                        value={data.title}
                        className="mt-1 block w-full text-xl h-16"
                        placeholder="First name"
                        onChange={(e) => {
                            setData("title", e.target.value);
                        }}
                    />

                    <InputError message={errors.title} className="mt-2" />
                </div>
                {/* Slug */}
                <div>
                    <Input
                        id="slug"
                        type="text"
                        name="slug"
                        value={data.slug}
                        className="mt-1 block w-full"
                        placeholder="slug"
                        onChange={(e) => {
                            setData("slug", e.target.value);
                        }}
                    />

                    <InputError message={errors.slug} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="body">Body</Label>
                    <EditorInput
                        id="body"
                        name="body"
                        value={data.body}
                        className="mt-1 block w-full text-xl h-16"
                        onChange={(d) => {
                            setData("body", d);
                        }}
                    />

                    <InputError message={errors.body} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="meta_title">Meta Title</Label>
                    <Input
                        id="meta_title"
                        type="text"
                        name="meta_title"
                        value={data.meta_title}
                        className="mt-1 block w-full"
                        placeholder="Meta title"
                        onChange={(e) => {
                            setData("meta_title", e.target.value);
                        }}
                    />

                    <InputError message={errors.meta_title} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="meta_description">Meta description</Label>
                    <Input
                        id="meta_description"
                        type="text"
                        name="meta_description"
                        value={data.meta_description}
                        className="mt-1 block w-full"
                        placeholder="Meta description"
                        onChange={(e) => {
                            setData("meta_description", e.target.value);
                        }}
                    />

                    <InputError message={errors.meta_description} className="mt-2" />
                </div>
            </div>
            <LoadingButton loading={processing} className="w-[260px]">
                Save
            </LoadingButton>
        </form>
    );
}
