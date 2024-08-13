import React, { useRef } from "react";
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
import { config } from "../Puck/config";
import { overrides } from "../Puck/PuckEditor";
import { Puck } from "@measured/puck";
import { LaptopIcon, SmartphoneIcon, TabletIcon } from "lucide-react";

export default function PageForm({page, personTitles}) {
    const formEl = useRef(null);
    const [showVisualEditor, showVisualEditorSet] = React.useState(false);
    const [scale, scaleSet] = React.useState(0.8);
    const [previewWidth, previewWidthSet] = React.useState(800);
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
        <div className="">
            <div>
                {/* First name & last name */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-4">
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

                            <InputError
                                message={errors.title}
                                className="mt-2"
                            />
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
                            <InputError
                                message={errors.slug}
                                className="mt-2"
                            />
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

                            <InputError
                                message={errors.meta_title}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <Label htmlFor="meta_description">
                                Meta description
                            </Label>
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
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="status">Status</Label>
                            <Select
                                defaultValue={`${data.status}`}
                                onValueChange={(value) =>
                                    setData("status", value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="0">Draft</SelectItem>
                                        <SelectItem value="1">
                                            Publish
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <InputError
                                message={errors.status}
                                className="mt-2"
                            />
                        </div>

                        <LoadingButton
                            loading={processing}
                            className="w-[260px]"
                            onClick={submit}
                        >
                            Save
                        </LoadingButton>
                    </div>
                </div>
            </div>
            <Puck
                config={config}
                overrides={overrides}
                data={data.puck_body || {}}
                headerTitle={data.title ?? "Page Builder"}
                onChange={(d) => {
                    setData("puck_body", d);
                }}
                iframe={{
                    enabled: true,
                }}
                // onPublish={(d) => {
                //     // submit form
                //     formEl?.current.dispatchEvent(
                //         new Event("submit", {
                //             cancelable: true,
                //             bubbles: true,
                //         })
                //     );
                // }}
            >
                <div className="grid grid-cols-6 gap-2 mt-10">
                    <div>
                        {/* Render the component list */}
                        <Puck.Components />
                        <Puck.Outline />
                    </div>
                    <div className="col-span-4 border border-red-500 grid grid-cols-1">
                        {/* Responsive buttons */}
                        <div className="h-10">
                            <div className="flex items-center justify-center gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => {
                                        previewWidthSet(400);
                                    }}
                                >
                                    <SmartphoneIcon />
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => {
                                        previewWidthSet(800);
                                    }}
                                >
                                    <TabletIcon />
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => {
                                        previewWidthSet(1200);
                                    }}
                                >
                                    <LaptopIcon />
                                </Button>
                            </div>
                        </div>
                        <div className="m-0 flex items-center justify-center">
                            <div
                                className="h-full border border-red-600"
                                style={{
                                    transform: `scale(${scale})`,
                                    width: previewWidth,
                                }}
                            >
                                <Puck.Preview />
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* Render the component list */}
                        <Puck.Fields />
                    </div>
                </div>
            </Puck>
        </div>
    );
}
