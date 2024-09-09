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
import TwoColumnLayout from "@/Layouts/admin/TwoColumnLayout";
import { TextLarge, TextMuted } from "@/shadcn/ui/text-muted";
import {
    MoreHorizontal,
    PencilLine,
    PlusCircle,
    Share2Icon,
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
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";
import Can from "@/Components/Can";

export default function User({ user, roles }) {
    const [name, nameSet] = React.useState(user ? user.name : "");
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: user ? user?.first_name : "",
        last_name: user ? user?.last_name : "",
        email: user ? user?.email : "",
        role_ids: user ? user.roles.map(r => r.id) : [],
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();

        if (user) {
            post(route("admin.users.update", { id: user.id }));
        } else {
            post(route("admin.users.store"));
        }
    };

    return (
        <TwoColumnLayout>
            <Head>
                <title>{`${
                    user ? "Edit User - " + user.name : "Create"
                } User`}</title>
            </Head>
            <TwoColumnLayout.Heading>
                <PageHeading>
                    <PageHeading.Title>
                        {user ? (
                            <div className="flex gap-x-3 items-center">
                                <PencilLine />
                                {user.full_name}
                            </div>
                        ) : (
                            <div className="flex gap-x-3 items-center">
                                <PlusCircle />
                                Add User
                            </div>
                        )}
                    </PageHeading.Title>
                    <PageHeading.Actions>
                        <Button asChild variant="outline">
                            <Link href={route("admin.users.index")}>Cancel</Link>
                        </Button>
                        <Can permit="create users">
                            <Button asChild>
                                <Link href={route("admin.users.create")}>
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
                        {user ? (
                            <Link className="text-blue-600 italic text-sm">
                                {route("admin.users.edit", user.id)}
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
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <Label htmlFor="first_name">
                                        First Name
                                    </Label>
                                    <Input
                                        id="first_name"
                                        type="text"
                                        name="first_name"
                                        value={data.first_name}
                                        className="mt-1 block w-full text-xl h-18"
                                        placeholder="Enter first name..."
                                        onChange={(e) => {
                                            setData(
                                                "first_name",
                                                e.target.value
                                            );
                                        }}
                                    />

                                    <InputError
                                        message={errors.first_name}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="last_name">Last Name</Label>
                                    <Input
                                        id="last_name"
                                        type="text"
                                        name="last_name"
                                        value={data.last_name}
                                        className="mt-1 block w-full text-xl h-18"
                                        placeholder="Last name"
                                        onChange={(e) => {
                                            setData(
                                                "last_name",
                                                e.target.value
                                            );
                                        }}
                                    />

                                    <InputError
                                        message={errors.last_name}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    placeholder="Email"
                                    onChange={(e) => {
                                        setData("email", e.target.value);
                                    }}
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label htmlFor="role">Role</Label>
                                <Select
                                    id="role"
                                    name="role_ids"
                                    value={`${
                                        data.role_ids &&
                                        data.role_ids.length > 0
                                            ? data.role_ids[0]
                                            : ""
                                    }`}
                                    className="mt-1 block w-full"
                                    onValueChange={(e) => {
                                        setData("role_ids", [e]);
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {roles.map((role) => (
                                                <SelectItem
                                                    key={role.id}
                                                    value={`${role.id}`}
                                                >
                                                    {role.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                <InputError
                                    message={errors.role_id}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    placeholder="Password"
                                    onChange={(e) => {
                                        setData("password", e.target.value);
                                    }}
                                />

                                <InputError
                                    message={errors.password}
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
                    {user && (
                        <ShadcnCard
                            title={`${user.first_name} ${user.last_name}`}
                        >
                            <TextMuted className="inline-block pt-0">
                                Email
                            </TextMuted>
                            <TextLarge className={`leading-[0]`}>
                                {user.email}
                            </TextLarge>
                            <TextMuted className="inline-block pt-2">
                                Role
                            </TextMuted>
                            <TextLarge className={`leading-[0] capitalize`}>
                                {user.roles.map((r) => r.name).join(", ")}
                            </TextLarge>
                        </ShadcnCard>
                    )}
                </TwoColumnLayout.Aside>
            </TwoColumnLayout.Content>
        </TwoColumnLayout>
    );
}
