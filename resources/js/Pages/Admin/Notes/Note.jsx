import { Button } from "@/shadcn/ui/button";
import { Head, Link } from "@inertiajs/react";
import PageHeading from "@/Components/PageHeading";
import { useForm } from "@inertiajs/react";
import { Label } from "@/shadcn/ui/label";
import { Input } from "@/shadcn/ui/input";
import InputError from "@/Components/InputError";
import React from "react";
import TwoColumnLayout from "@/Layouts/TwoColumnLayout";
// import { TextLarge, TextMuted } from "@/shadcn/ui/text-muted";
import {
    MoreHorizontal,
    PencilLine,
    PlusCircle,
    // User,
} from "lucide-react";
import ShadcnCard from "@/Components/ShadcnCard";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";
import { Textarea } from "@/shadcn/ui/textarea";
import Can from "@/Components/Can";

export default function Note({ note }) {
    // const [title, titleSet] = React.useState(note ? note.title : "");
    const { data, setData, post, processing, errors, reset } = useForm({
        title: note ? note?.title : "",
        content: note ? note?.content : "",
    });

    const submit = (e) => {
        e.preventDefault();
        if (note) {
            post(route("admin.notes.update", { id: note.id }));
        } else {
            post(route("admin.notes.store"));
        }
    };

    return (
        <TwoColumnLayout>
            <Head>
                <title>{`${
                    note ? "Edit Note - " + note.title : "Create"
                } Note`}</title>
            </Head>
            <TwoColumnLayout.Heading>
                <PageHeading>
                    <PageHeading.Title>
                        {note ? (
                            <div className="flex gap-x-3 items-center">
                                <PencilLine />
                                {note.title}
                            </div>
                        ) : (
                            <div className="flex gap-x-3 items-center">
                                <PlusCircle />
                                Add Note
                            </div>
                        )}
                    </PageHeading.Title>
                    <PageHeading.Actions>
                        <Button asChild variant="outline">
                            <Link href={route("admin.notes.index")}>Cancel</Link>
                        </Button>
                        <Can permit="create notes">
                            <Button asChild>
                                <Link href={route("admin.notes.create")}>
                                    <PlusCircle className="h-4 w-4 mr-2" />{" "}
                                    Create New
                                </Link>
                            </Button>
                        </Can>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            payment.id
                                        )
                                    }
                                >
                                    Copy payment ID
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    View client
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    View payment details
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </PageHeading.Actions>
                </PageHeading>
                <div className="flex justify-between">
                    <div>
                        {note ? (
                            <Link className="text-blue-600 italic text-sm">
                                {route("admin.notes.edit", note.id)}
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
                    <form onSubmit={submit}>
                        <ShadcnCard
                            className="space-y-4"
                            title="General"
                            description={<></>}
                        >
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={data.title}
                                    autoFocus
                                    className="mt-1 block w-full text-xl h-18"
                                    placeholder="Title..."
                                    onChange={(e) => {
                                        setData("title", e.target.value);
                                    }}
                                />

                                <InputError
                                    message={errors.title}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <Label htmlFor="content">Description</Label>
                                <Textarea
                                    id="content"
                                    name="content"
                                    value={data.content}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("content", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.content}
                                    className="mt-2"
                                />
                            </div>
                        </ShadcnCard>

                        <TwoColumnLayout.Actions>
                            <div className="flex justify-end mt-4">
                                <Button className="w-[260px]">Submit</Button>
                            </div>
                        </TwoColumnLayout.Actions>
                    </form>
                </TwoColumnLayout.Main>
                <TwoColumnLayout.Aside>{/* --  */}</TwoColumnLayout.Aside>
            </TwoColumnLayout.Content>
        </TwoColumnLayout>
    );
}
