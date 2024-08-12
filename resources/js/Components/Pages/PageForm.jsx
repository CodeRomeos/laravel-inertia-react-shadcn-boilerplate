import React from "react";
import { Label } from "@/shadcn/ui/label";
import { Input } from "@/shadcn/ui/input";
import InputError from "../InputError";
import { Button } from "@/shadcn/ui/button";
import { useForm, usePage } from "@inertiajs/react";
import { textToSlug } from "@/Helpers/GlobalFunctions";
import LoadingButton from "../LoadingButton";
import EditorInput from "../EditorInput";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";
import SlugInput from "../SlugInput";
import { PuckEditor } from "../Puck/PuckEditor";

export default function PageForm({page, personTitles}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: page ? page?.title : '',
        slug: page ? page?.slug : '',
        body: page ? page?.body : '',
        puck_body: page ? page?.puck_body : '',
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
                        placeholder="Title"
                        onChange={(e) => {
                            setData("title", e.target.value);
                        }}
                    />

                    <InputError message={errors.title} className="mt-2" />
                </div>
                {/* Slug */}
                <div>
                    <SlugInput
                        id="slug"
                        type="text"
                        name="slug"
                        value={data.slug}
                        placeholder="slug"
                        onChange={(e) => {
                            setData("slug", e.target.value);
                        }}
                        baseUrl={route("homepage")}
                    />
                    <InputError message={errors.slug} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="body">Body</Label>
                    <PuckEditor value={data.puck_body} onPublish={(d) => {
                        setData("puck_body", d);
                        post(route("admin.pages.update", { id: page.id }));
                        // submit();
                    }} />
                    {/* <EditorInput
                        id="body"
                        name="body"
                        value={data.body}
                        className="mt-1 block w-full text-xl h-16"
                        onChange={(d) => {
                            setData("body", d);
                        }}
                    /> */}

                    <InputError message={errors.body} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                        defaultValue={`${data.status}`}
                        onValueChange={(value) => setData("status", value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="0">Draft</SelectItem>
                                <SelectItem value="1">Publish</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <InputError message={errors.status} className="mt-2" />
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

                    <InputError
                        message={errors.meta_description}
                        className="mt-2"
                    />
                </div>
            </div>
            <LoadingButton loading={processing} className="w-[260px]">
                Save
            </LoadingButton>
        </form>
    );
}
