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
import { TextLarge, TextMuted } from "@/shadcn/ui/text-muted";
import {
    Info,
    Mail,
    MapPin,
    MoreHorizontal,
    PencilLine,
    Phone,
    PlusCircle,
} from "lucide-react";
import ShadcnCard from "@/Components/ShadcnCard";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import Can from "@/Components/Can";
import MenuForm from "./MenuForm";

export default function Menu({ menu }) {
    const { data, setData, errors, put, reset } = useForm({
        name: menu ? menu.name : "",
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
                <TwoColumnLayout.Main>
                    <MenuForm />
                </TwoColumnLayout.Main>
                <TwoColumnLayout.Aside></TwoColumnLayout.Aside>
            </TwoColumnLayout.Content>
        </TwoColumnLayout>
    );
}
