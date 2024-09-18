import { Button } from "@/shadcn/ui/button";
import { Head, Link } from "@inertiajs/react";
import PageHeading from "@/Components/PageHeading";
import React from "react";
import TwoColumnLayout from "@/Layouts/admin/TwoColumnLayout";
import { TextLarge, TextMuted } from "@/shadcn/ui/text-muted";
import {
    PencilLine,
    PlusCircle,
} from "lucide-react";
import ShadcnCard from "@/Components/ShadcnCard";

import Screenshot from "@/Components/Screenshot";
import Can from "@/Components/Can";
import PostCategoryForm from "@/Components/PostCategories/PostCategoryForm";

export default function PostCategory({ postCategory }) {
    return (
        <TwoColumnLayout>
            <Head>
                <title>{`${
                    postCategory ? "Edit - " + postCategory?.name : "Create"
                } Post Category`}</title>
            </Head>
            <TwoColumnLayout.Heading>
                <PageHeading>
                    <PageHeading.Title>
                        {postCategory ? (
                            <div className="flex gap-x-3 items-center">
                                <PencilLine />
                                Post Category - {postCategory?.name}
                            </div>
                        ) : (
                            <div className="flex gap-x-3 items-center">
                                <PlusCircle />
                                Add Post Category
                            </div>
                        )}
                    </PageHeading.Title>
                    <PageHeading.Actions>
                        <Button asChild variant="outline">
                            <Link href={route("admin.postCategories.index")}>
                                Cancel
                            </Link>
                        </Button>
                        <Can permit="create post categories">
                            <Button asChild>
                                <Link
                                    href={route("admin.postCategories.create")}
                                >
                                    <PlusCircle className="h-4 w-4 mr-2" />{" "}
                                    Create New
                                </Link>
                            </Button>
                        </Can>
                    </PageHeading.Actions>
                </PageHeading>
                <div className="flex justify-between">
                    <div>
                        {postCategory ? (
                            <Link className="text-blue-600 italic text-sm">
                                {route(
                                    "admin.postCategories.edit",
                                    postCategory.id
                                )}
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
                        <PostCategoryForm postCategory={postCategory} />
                    </ShadcnCard>
                    <TwoColumnLayout.Actions></TwoColumnLayout.Actions>
                </TwoColumnLayout.Main>
                <TwoColumnLayout.Aside>
                    <Screenshot
                        screenshotName={`post_category_${postCategory?.title}`}
                        moduleName="postCategories"
                    >
                        {postCategory && (
                            <ShadcnCard title={postCategory?.name}>
                                <TextMuted className="inline-block">
                                    Created at
                                </TextMuted>
                                <TextLarge>
                                    {postCategory.created_at_string}
                                </TextLarge>
                                <TextMuted className="inline-block pt-2">
                                    Last Updated
                                </TextMuted>
                                <TextLarge>
                                    {postCategory.updated_at_string}
                                </TextLarge>
                            </ShadcnCard>
                        )}
                    </Screenshot>
                </TwoColumnLayout.Aside>
            </TwoColumnLayout.Content>
        </TwoColumnLayout>
    );
}
