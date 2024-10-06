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
import { Textarea } from "@/shadcn/ui/textarea";
import { Checkbox } from "@/shadcn/ui/checkbox";
import { ScrollArea } from "@/shadcn/ui/scroll-area";

export default function PostForm({ post, postCategories, copyPost }) {
    const blogBaseUrl = usePage().props.blogBaseUrl;
    const {
        data,
        setData,
        post: postAction,
        processing,
        errors,
        reset,
    } = useForm({
        title: copyPost ? copyPost?.title : post ? post?.title : "",
        category_ids: post ? post?.categories.map((c) => c.id) : [],
        slug: copyPost ? copyPost?.slug : post ? post?.slug : "",
        body: copyPost ? copyPost?.body : post ? post?.body : "",
        short_description: copyPost
            ? copyPost?.short_description
            : post
            ? post?.short_description
            : "",
        status: post ? post?.status : 0,
        meta_title: copyPost
            ? copyPost?.meta_title
            : post
            ? post?.meta_title
            : "",
        meta_description: copyPost
            ? copyPost?.meta_description
            : post
            ? post?.meta_description
            : "",
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();

        if (post) {
            postAction(route("admin.posts.update", { id: post.id }));
        } else {
            postAction(route("admin.posts.store"));
        }
    };

    React.useEffect(() => {
        if (!post) {
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
                <div>
                    <Label htmlFor="status">Status</Label>
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
                    <div>
                        <Label className="">Categories</Label>
                        <ScrollArea className="h-40 border p-4">
                            <ul className="space-y-2">
                                {postCategories.map((category) => (
                                    <li key={category.id}>
                                        <Label className="flex items-center gap-2">
                                            <Checkbox
                                                checked={data.category_ids.includes(
                                                    category.id
                                                )}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setData(
                                                            "category_ids",
                                                            [
                                                                ...data.category_ids,
                                                                category.id,
                                                            ]
                                                        );
                                                    } else {
                                                        setData(
                                                            "category_ids",
                                                            data.category_ids.filter(
                                                                (id) =>
                                                                    id !==
                                                                    category.id
                                                            )
                                                        );
                                                    }
                                                }}
                                            />
                                            <span>{category.name}</span>
                                        </Label>
                                    </li>
                                ))}
                            </ul>
                        </ScrollArea>
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
                        {post && post.image && (
                            <div className="border p-1 rounded-md">
                                <img
                                    src={`/storage/${post.image.url}`}
                                    className="w-full h-36 object-cover rounded-md"
                                    alt={post.title}
                                    title={post.title}
                                    loading="lazy"
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="">
                    {/* Description */}
                    <div>
                        <Label htmlFor="short_description">
                            Short Description
                        </Label>
                        <Textarea
                            id="short_description"
                            type="text"
                            name="short_description"
                            value={data.short_description}
                            className="mt-1 block w-full"
                            placeholder="Short Description"
                            onChange={(e) => {
                                setData("short_description", e.target.value);
                            }}
                        />

                        <InputError
                            message={errors.short_description}
                            className="mt-2"
                        />
                    </div>
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
