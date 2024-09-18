import PageLayout from "@/Layouts/PageLayout";
import { Head } from "@inertiajs/react";

export default function Post({ post }) {
    return (
        <PageLayout>
            <Head
                title={
                    post.data.meta_title
                        ? post.data.meta_title
                        : post.data.title
                }
            >
                <meta name="description" content={post.data.meta_description} />
            </Head>
            <h2 className="text-3xl font-bold">{post.data?.title}</h2>
            <div
                dangerouslySetInnerHTML={{ __html: post.data?.body }}
            ></div>
        </PageLayout>
    );
}