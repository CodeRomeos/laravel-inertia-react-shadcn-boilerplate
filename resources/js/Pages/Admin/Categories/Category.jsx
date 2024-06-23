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
    MoreHorizontal,
    PencilLine,
    PlusCircle,
    Share2Icon,
    User,
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

export default function Category({ category }) {
    const [name, nameSet] = React.useState(category ? category.name : "");
    const { data, setData, post, processing, errors, reset } = useForm({
        name: category ? category?.name : "",
        slug: category ? category?.slug : "",
        description: category ? category?.description : "",
    });

    const submit = (e) => {
        e.preventDefault();

        if (category) {
            post(route("admin.categories.update", { id: category.id }));
        } else {
            post(route("admin.categories.store"));
        }
    };

    React.useEffect(() => {
        setData("name", name);
        if (!category) setData("slug", textToSlug(name));
    }, [name]);

    return (
        <TwoColumnLayout>
            <Head>
                <title>{`${
                    category ? "Edit Category - " + category.name : "Create"
                } Category`}</title>
            </Head>
            <TwoColumnLayout.Heading>
                <PageHeading>
                    <PageHeading.Title>
                        {/* category - {category ? "Edit " + category.name : "Create"} */}
                        {category ? (
                            <div className="flex gap-x-3 items-center">
                                <PencilLine />
                                Category - {category.name}
                            </div>
                        ) : (
                            <div className="flex gap-x-3 items-center">
                                <PlusCircle />
                                Add Category
                            </div>
                        )}
                    </PageHeading.Title>
                    <PageHeading.Actions>
                        <Button asChild variant="outline">
                            <Link href={route("admin.categories.index")}>Cancel</Link>
                        </Button>
                        <Can permit="create categories">
                            <Button asChild>
                                <Link href={route("admin.categories.create")}>
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
                        {category ? (
                            <Link className="text-blue-600 italic text-sm">
                                {route("admin.categories.edit", category.id)}
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
                                <Label htmlFor="name">Category Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={name}
                                    autoFocus
                                    className="mt-1 block w-full text-xl h-18"
                                    placeholder="Category name..."
                                    onChange={(e) => {
                                        nameSet(e.target.value);
                                        setData("name", e.target.value);
                                    }}
                                />

                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="slug"
                                    // className={`${errors.slug ? "text-red-500" : ""}`}
                                >
                                    Slug
                                </Label>
                                <Input
                                    id="slug"
                                    type="text"
                                    name="slug"
                                    value={data.slug}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData(
                                            "slug",
                                            textToSlug(e.target.value)
                                        )
                                    }
                                />

                                <InputError
                                    message={errors.slug}
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
                <TwoColumnLayout.Aside>
                    {category && (
                        <ShadcnCard title={category.name}>
                            <TextMuted className="inline-block pt-2">
                                Created at
                            </TextMuted>
                            <TextLarge className={`leading-[0]`}>
                                {category.created_at_string}
                            </TextLarge>
                            <TextMuted className="inline-block pt-2">
                                Last Updated
                            </TextMuted>
                            <TextLarge className={`leading-[0]`}>
                                {category.updated_at_string}
                            </TextLarge>
                        </ShadcnCard>
                    )}
                </TwoColumnLayout.Aside>
            </TwoColumnLayout.Content>
        </TwoColumnLayout>
    );
}
