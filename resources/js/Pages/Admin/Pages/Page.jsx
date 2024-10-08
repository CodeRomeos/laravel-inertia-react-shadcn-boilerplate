import React from "react";
import { Button } from "@/shadcn/ui/button";
import { Head, Link } from "@inertiajs/react";
import PageHeading from "@/Components/PageHeading";
import TwoColumnLayout from "@/Layouts/admin/TwoColumnLayout";
import { TextLarge, TextMuted } from "@/shadcn/ui/text-muted";
import {
    MoreHorizontal,
    PencilLine,
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

import Screenshot from "@/Components/Screenshot";
import Can from "@/Components/Can";
import PageForm from "@/Components/Pages/PageForm";

export default function Page({ page, personTitles }) {
    
    return (
        <TwoColumnLayout>
            <Head>
                <title>{`${
                    page ? "Edit Page - " + page?.full_name : "Create"
                } Page`}</title>
            </Head>
            <TwoColumnLayout.Heading>
                <PageHeading>
                    <PageHeading.Title>
                        {/* page - {page ? "Edit " + page?.full_name : "Create"} */}
                        {page ? (
                            <div className="flex gap-x-3 items-center">
                                <PencilLine />
                                Page - {page?.title}
                            </div>
                        ) : (
                            <div className="flex gap-x-3 items-center">
                                <PlusCircle />
                                Add Page
                            </div>
                        )}
                    </PageHeading.Title>
                    <PageHeading.Actions>
                        <Button asChild variant="outline">
                            <Link href={route("admin.pages.index")}>Cancel</Link>
                        </Button>
                        <Can permit="create pages">
                            <Button asChild>
                                <Link href={route("admin.pages.create")}>
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
                                <DropdownMenuItem>View page</DropdownMenuItem>
                                <DropdownMenuItem>
                                    View payment details
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </PageHeading.Actions>
                </PageHeading>
                <div className="flex justify-between">
                    <div>
                        {page ? (
                            <Link className="text-blue-600 italic text-sm">
                                {route("admin.pages.edit", page.id)}
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
                        <ShadcnCard
                            className=""
                            title="General"
                            description={<></>}
                        >
                            <PageForm page={page}/>
                        </ShadcnCard>
                        <TwoColumnLayout.Actions>
                        </TwoColumnLayout.Actions>
                </TwoColumnLayout.Main>
                <TwoColumnLayout.Aside>
                    <Screenshot
                        screenshotName={`page_${page?.title}`}
                        moduleName="pages"
                    >
                        {page && (
                            <ShadcnCard title={page?.full_name}>
                                <TextMuted className="inline-block">
                                    Created at
                                </TextMuted>
                                <TextLarge className={`leading-[0]`}>
                                    {page.created_at_string}
                                </TextLarge>
                                <TextMuted className="inline-block pt-2">
                                    Last Updated
                                </TextMuted>
                                <TextLarge className={`leading-[0]`}>
                                    {page.updated_at_string}
                                </TextLarge>
                            </ShadcnCard>
                        )}
                    </Screenshot>
                </TwoColumnLayout.Aside>
            </TwoColumnLayout.Content>
        </TwoColumnLayout>
    );
}
