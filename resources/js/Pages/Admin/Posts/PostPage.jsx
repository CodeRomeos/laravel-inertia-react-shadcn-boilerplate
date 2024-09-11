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
    Eye,
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

import Screenshot from "@/Components/Screenshot";
import Can from "@/Components/Can";
import PostForm from "@/Components/Posts/PostForm";

export default function PostPage({ post }) {
    
    return (
        <TwoColumnLayout>
            <Head>
                <title>{`${
                    post ? "Edit Post - " + post?.full_name : "Create"
                } Post`}</title>
            </Head>
            <TwoColumnLayout.Heading>
                <PageHeading>
                    <PageHeading.Title>
                        {/* post - {post ? "Edit " + post?.full_name : "Create"} */}
                        {post ? (
                            <div className="flex gap-x-3 items-center">
                                <PencilLine />
                                Post - {post?.title}
                            </div>
                        ) : (
                            <div className="flex gap-x-3 items-center">
                                <PlusCircle />
                                Add Post
                            </div>
                        )}
                    </PageHeading.Title>
                    <PageHeading.Actions>
                        {(post && post.status) && <Button asChild size="icon" variant="link">
                            <Link href={route("blog.post", post.slug)} target="_blank"><Eye className="h-4 w-4" /></Link>
                        </Button>}
                        <Button asChild variant="outline">
                            <Link href={route("admin.posts.index")}>Cancel</Link>
                        </Button>
                        <Can permit="create posts">
                            <Button asChild>
                                <Link href={route("admin.posts.create")}>
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
                                <DropdownMenuItem>View post</DropdownMenuItem>
                                <DropdownMenuItem>
                                    View payment details
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </PageHeading.Actions>
                </PageHeading>
                <div className="flex justify-between">
                    <div>
                        {post ? (
                            <Link className="text-blue-600 italic text-sm">
                                {route("admin.posts.edit", post.id)}
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
                            <PostForm post={post}/>
                        </ShadcnCard>
                        <TwoColumnLayout.Actions>
                        </TwoColumnLayout.Actions>
                </TwoColumnLayout.Main>
                <TwoColumnLayout.Aside>
                    <Screenshot
                        screenshotName={`post_${post?.title}`}
                        moduleName="posts"
                    >
                        {post && (
                            <ShadcnCard title={post?.full_name}>
                                <TextMuted className="inline-block">
                                    Created at
                                </TextMuted>
                                <TextLarge className={`leading-[0]`}>
                                    {post.created_at_string}
                                </TextLarge>
                                <TextMuted className="inline-block pt-2">
                                    Last Updated
                                </TextMuted>
                                <TextLarge className={`leading-[0]`}>
                                    {post.updated_at_string}
                                </TextLarge>
                            </ShadcnCard>
                        )}
                    </Screenshot>
                </TwoColumnLayout.Aside>
            </TwoColumnLayout.Content>
        </TwoColumnLayout>
    );
}
