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
import { Checkbox } from "@/shadcn/ui/checkbox";
import { ScrollArea } from "@/shadcn/ui/scroll-area";

const genLinkObject = ({url, label, target, route_name = false, route_params = {}, link_type = "custom_link", slug = false}) => {
    return {
        id: uuidv4(),
        url: url,
        label: label,
        target: target,
        children: [],
        route_name: route_name,
        route_params: route_params,
        link_type: link_type,
        slug: slug,
    };
};

const genCustomLinkObject = (props) => genLinkObject({...props, link_type: "custom_link", route_name: false});

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

const PagesList = ({pages, onAdd = () => {}}) => {
    const [search, searchSet] = React.useState("");
    const [pageList, pageListSet] = React.useState(pages);
    const [selected, selectedSet] = React.useState([]);

    const addToMenu = () => {
        onAdd(selected.map((id) => {
            const page = pages.find((page) => page.id === id);
            return genLinkObject({url: page.url, label: page.title, link_type: "page", route_name: `pages.show`, route_params: {slug: page.slug}});
        }));

        selectedSet([]);
    }

    return (
        <div>
            <Input
                type="search"
                placeholder="Search..."
                value={search}
                className="w-full mb-4"
                onChange={(e) => {
                    searchSet(e.target.value);
                    pageListSet(
                        pages.filter((page) =>
                            page.title
                                .toLowerCase()
                                .includes(e.target.value.toLowerCase())
                        )
                    );
                }}
            />
            <ScrollArea className="h-52">
                <div className="space-y-3">
                    {pageList.map((page) => (
                        <Label
                            key={page.id}
                            className="flex gap-4 items-center font-normal"
                        >
                            <Checkbox
                                checked={selected.includes(page.id)}
                                onCheckedChange={(checked) => {
                                    return checked
                                        ? selectedSet([...selected, page.id])
                                        : selectedSet(
                                              selected.filter(
                                                  (id) => id !== page.id
                                              )
                                          );
                                }}
                            />{" "}
                            {page.title}
                            <span className="text-xs text-muted-foreground text-right">
                                /{page.slug}
                            </span>
                        </Label>
                    ))}
                </div>
            </ScrollArea>
            <div className="text-right">
                <Button
                    size="sm"
                    type="button"
                    variant="outline"
                    onClick={() => addToMenu()}
                >
                    Add to Menu
                </Button>
            </div>
        </div>
    );
}
                    


export default function Menu({ menu, pages }) {
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
                    <div className="space-y-2">
                        <Accordion
                            className="border border-b-none"
                            type="single"
                            collapsible
                        >
                            <AccordionItem value="pages">
                                <AccordionTrigger className="p-4">
                                    Pages
                                </AccordionTrigger>
                                <AccordionContent className="p-4">
                                    <PagesList pages={pages} onAdd={(v) => setData("items", [...data.items, ...v])} />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <Accordion
                            className="border border-b-none"
                            type="single"
                            collapsible
                        >
                            <AccordionItem value="custom-link">
                                <AccordionTrigger className="p-4">
                                    Custom Link
                                </AccordionTrigger>
                                <AccordionContent className="p-4">
                                    <CustomLinkForm
                                        value={data.items}
                                        onSubmit={(v) =>
                                            setData("items", [...data.items, v])
                                        }
                                    />
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
