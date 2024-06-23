import { Button } from "@/shadcn/ui/button";
import { Head, Link } from "@inertiajs/react";
import PageHeading from "@/Components/PageHeading";
import { useForm } from "@inertiajs/react";
import { Label } from "@/shadcn/ui/label";
import { Input } from "@/shadcn/ui/input";
import InputError from "@/Components/InputError";
import React from "react";
import TwoColumnLayout from "@/Layouts/TwoColumnLayout";

import { MoreHorizontal, PencilLine, PlusCircle, User } from "lucide-react";
import ShadcnCard from "@/Components/ShadcnCard";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import { Switch } from "@/shadcn/ui/switch";
import Can from "@/Components/Can";
import UserHoverCard from "@/Components/UserHoverCard";

export default function Role({ role, groupedPermissions }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        permission_ids: role ? role?.permissions.map((p) => p.id) : [],
    });

    const submit = (e) => {
        e.preventDefault();

        if (role) {
            post(route("admin.roles.update", { id: role.id }));
        } else {
            post(route("admin.roles.store"));
        }
    };

    return (
        <TwoColumnLayout>
            <Head>
                <title>{`${
                    role ? "Edit Role - " + role.name : "Create"
                } Role`}</title>
            </Head>
            <TwoColumnLayout.Heading>
                <PageHeading>
                    <PageHeading.Title>
                        {role ? (
                            <div className="flex gap-x-3 items-center capitalize">
                                <PencilLine />
                                Role - {role.name}
                            </div>
                        ) : (
                            <div className="flex gap-x-3 items-center">
                                <PlusCircle />
                                Add Role
                            </div>
                        )}
                    </PageHeading.Title>
                    <PageHeading.Actions>
                        <Button asChild variant="outline">
                            <Link href={route("admin.roles.index")}>Cancel</Link>
                        </Button>
                        <Can permit="create roles">
                            <Button asChild>
                                <Link href={route("admin.roles.create")}>
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
                        {role ? (
                            <Link className="text-blue-600 italic text-sm">
                                {route("admin.roles.edit", role.id)}
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
                            title={role ? "Permissions" : "General"}
                            description={<></>}
                        >
                            {!role && (
                                <div>
                                    <Label htmlFor="name">Role Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        autoFocus
                                        className="mt-1 block w-full text-xl h-18"
                                        placeholder="Name"
                                        onChange={(e) => {
                                            setData("name", e.target.value);
                                        }}
                                    />

                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>
                            )}
                            <div>
                                {!role && <Label>Permissions</Label>}
                                {Object.entries(groupedPermissions).map(
                                    (group, index) => (
                                        <div className="mb-6" key={index}>
                                            <h4 className="scroll-m-20 text-lg font-semibold tracking-tight capitalize">
                                                {group[0]}
                                            </h4>
                                            <div className="mt-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                                {group[1].map((p) => (
                                                    <Label
                                                        key={p.id}
                                                        className={`flex items-center gap-2 capitalize bg-slate-100 dark:bg-zinc-700 py-2 px-2 rounded-sm border ${
                                                            data.permission_ids.includes(
                                                                p.id
                                                            )
                                                                ? "bg-green-100 dark:bg-slate-400 dark:text-black"
                                                                : ""
                                                        }`}
                                                    >
                                                        <Switch
                                                            checked={data.permission_ids.includes(
                                                                p.id
                                                            )}
                                                            onCheckedChange={(
                                                                checked
                                                            ) => {
                                                                checked
                                                                    ? setData(
                                                                          "permission_ids",
                                                                          [
                                                                              ...data.permission_ids,
                                                                              p.id,
                                                                          ]
                                                                      )
                                                                    : setData(
                                                                          "permission_ids",
                                                                          data.permission_ids.filter(
                                                                              (
                                                                                  value
                                                                              ) =>
                                                                                  value !==
                                                                                  p.id
                                                                          )
                                                                      );
                                                            }}
                                                        />
                                                        <span>{p.name}</span>
                                                    </Label>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </ShadcnCard>
                        <TwoColumnLayout.Actions isSticky>
                            <div className="flex justify-end">
                                <Button className="w-[260px]">Submit</Button>
                            </div>
                        </TwoColumnLayout.Actions>
                    </form>
                </TwoColumnLayout.Main>
                <TwoColumnLayout.Aside>
                    {role && (
                        <ShadcnCard
                            title={`Users having this role (${role.users.length})`}
                        >
                            {role && (
                                <ul>
                                    {role.users &&
                                        role.users.map((u) => (
                                            <li key={u.id}>
                                                <UserHoverCard user={u} />
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </ShadcnCard>
                    )}
                </TwoColumnLayout.Aside>
            </TwoColumnLayout.Content>
        </TwoColumnLayout>
    );
}