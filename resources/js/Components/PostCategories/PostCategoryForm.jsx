import React from "react";
import { Label } from "@/shadcn/ui/label";
import { Input } from "@/shadcn/ui/input";
import InputError from "../InputError";
import { useForm, usePage } from "@inertiajs/react";
import { textToSlug } from "@/Helpers/GlobalFunctions";
import LoadingButton from "../LoadingButton";
import SlugInput from "../SlugInput";
import { Textarea } from "@/shadcn/ui/textarea";

export default function PostCategoryForm({ postCategory }) {
    const blogBaseUrl = usePage().props.blogBaseUrl;
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        name: postCategory ? postCategory?.name : "",
        slug: postCategory ? postCategory?.slug : "",
        body: postCategory ? postCategory?.body : "",
        description: postCategory
            ? postCategory?.description
            : "",
        status: postCategory ? postCategory?.status : 0,
        meta_title: postCategory
            ? postCategory?.meta_title
            : "",
        meta_description: postCategory
            ? postCategory?.meta_description
            : "",
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();

        if (postCategory) {
            post(route("admin.postCategories.update", { id: postCategory.id }));
        } else {
            post(route("admin.postCategories.store"));
        }
    };

    React.useEffect(() => {
        if (!postCategory) {
            setData("slug", textToSlug(data.name));
        } else {
            setData("name", data.name);
        }
    }, [data.name]);

    return (
        <form onSubmit={submit} className="space-y-4">
            {/* First name & last name */}
            <div className="space-y-4">
                {/* Title */}
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full text-xl h-16"
                        placeholder="Name"
                        onChange={(e) => {
                            setData("name", e.target.value);
                        }}
                    />

                    <InputError message={errors.name} className="mt-2" />
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
                        baseUrl={blogBaseUrl}
                    />

                    <InputError message={errors.slug} className="mt-2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {/* Description */}
                    <div>
                        <Label htmlFor="description">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            type="text"
                            name="description"
                            value={data.description}
                            className="mt-1 block w-full"
                            placeholder="Short Description"
                            onChange={(e) => {
                                setData("description", e.target.value);
                            }}
                        />

                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <Label htmlFor="image">Image</Label>
                        <Input
                            id="image"
                            type="file"
                            name="image"
                            onChange={(e) => {
                                setData("image", e.target.files[0]);
                            }}
                        />

                        <InputError message={errors.image} className="mt-2" />
                        {postCategory && postCategory.image && (
                            <div className="border p-1 rounded-md">
                                <img
                                    src={`/storage/${postCategory.image.url}`}
                                    className="w-full h-36 object-cover rounded-md"
                                    alt={postCategory.name}
                                    title={postCategory.name}
                                    loading="lazy"
                                />
                            </div>
                        )}
                    </div>
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
