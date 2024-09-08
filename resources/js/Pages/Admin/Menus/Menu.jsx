import { Button } from "@/shadcn/ui/button";
import { Head, Link } from "@inertiajs/react";
import PageHeading from "@/Components/PageHeading";
import { useForm } from "@inertiajs/react";
import { Label } from "@/shadcn/ui/label";
import { Input } from "@/shadcn/ui/input";
import InputError from "@/Components/InputError";
import React from "react";
import EditorInput from "@/Components/EditorInput";
import { textToSlug } from "@/Helpers/GlobalFunctions";
import TwoColumnLayout from "@/Layouts/TwoColumnLayout";
import { v4 as uuidv4 } from "uuid";
import {
    Info,
    Mail,
    MapPin,
    MoreHorizontal,
    PencilLine,
    Phone,
    PlusCircle,
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/shadcn/ui/accordion";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";
import Can from "@/Components/Can";
import { SortableTree } from "./Tree/SortableTree";

const genCustomLinkObject = ({url, label, target}) => {
    return {
        id: uuidv4(),
        url: url,
        label: label,
        target: target,
        children: [],
        routName: false,
        type: "custom_link",
    };
};

const CustomLinkForm = ({onSubmit = () => {}}) => {
    const [url, urlSet] = React.useState("");
    const [label, labelSet] = React.useState("");
    const [target, targetSet] = React.useState("");
    const submit = (e) => {
        e.preventDefault();
        onSubmit(genCustomLinkObject({
            url: url,
            label: label,
            target: target,
        }));
    }
    return (
        <form className="grid grid-cols-3 gap-2 items-center" onSubmit={submit}>
            <Label htmlFor="url">URL</Label>
            <div className="col-span-2">
                <Input
                    id="url"
                    type="text"
                    name="url"
                    value={url}
                    onChange={(e) => urlSet(e.target.value)}
                />
            </div>
            <Label htmlFor="label">Label</Label>
            <div className="col-span-2">
                <Input
                    id="label"
                    type="text"
                    name="label"
                    value={label}
                    onChange={(e) => labelSet(e.target.value)}
                />
            </div>
            <Label htmlFor="target">Target</Label>
            <div className="col-span-2">
                <Select value={target} onValueChange={targetSet}>
                    <SelectTrigger className="">
                        <SelectValue placeholder="Default" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="_self">Default</SelectItem>
                        <SelectItem value="_blank">New Tab</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="col-span-3 text-right">
                <Button type="submit" variant="outline">
                    Add to Menu
                </Button>
            </div>
        </form>
    );
}


export default function Menu({ menu }) {
    const { data, setData, errors, put, reset } = useForm({
        name: menu ? menu.name : "",
        items: menu ? menu.items : []
    })
    return (
        <TwoColumnLayout>
            <Head>
                <title>{`${
                    menu ? "Edit Menu - " + menu?.name : "Create"
                } Menu`}</title>
            </Head>
            <TwoColumnLayout.Heading>
                <PageHeading>
                    <PageHeading.Title>
                        {menu ? (
                            <div className="flex gap-x-3 items-center">
                                <PencilLine />
                                Menu - {menu?.name}
                            </div>
                        ) : (
                            <div className="flex gap-x-3 items-center">
                                <PlusCircle />
                                Create Menu
                            </div>
                        )}
                    </PageHeading.Title>
                    <PageHeading.Actions>
                        <Button asChild variant="outline">
                            <Link href={route("admin.menus.index")}>
                                Cancel
                            </Link>
                        </Button>
                        <Can permit="create menu">
                            <Button asChild>
                                <Link href={route("admin.menus.create")}>
                                    <PlusCircle className="h-4 w-4 mr-2" />{" "}
                                    Create New
                                </Link>
                            </Button>
                        </Can>
                    </PageHeading.Actions>
                </PageHeading>
                <div className="flex justify-between">
                    <div>
                        {menu ? (
                            <Link className="text-blue-600 italic text-sm">
                                {route("admin.menus.edit", menu.id)}
                            </Link>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="flex gap-4"></div>
                </div>
            </TwoColumnLayout.Heading>
            <TwoColumnLayout.Content>
                <TwoColumnLayout.Aside>
                    <div className="">
                        <Accordion className="border border-b-none" type="single" collapsible>
                            <AccordionItem value="custom-link">
                                <AccordionTrigger className="p-4">Custom Link</AccordionTrigger>
                                <AccordionContent className="p-4">
                                    <CustomLinkForm value={data.items} onSubmit={(v) => setData("items", [...data.items, v])} />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </TwoColumnLayout.Aside>
                <TwoColumnLayout.Main>
                    <div>
                        <SortableTree
                            value={data.items}
                            onChange={(v) => setData("items", v)}
                            collapsible
                            indicator
                            removable
                        />
                    </div>
                </TwoColumnLayout.Main>
            </TwoColumnLayout.Content>
        </TwoColumnLayout>
    );
}
