import BlankLayout from "@/Layouts/blank-layout";
import { Head, Link } from "@inertiajs/react";

export default function Blog({ posts }) {
    return (
        <BlankLayout>
            <Head title="Blog" />
            <h2 className="text-3xl font-bold">Blog</h2>
            <ul>
                {posts.data.map((post) => (
                    <li key={post.id}>
                        <Link
                            href={route("blog.post", post.slug)}
                            className="hover:underline"
                        >
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </BlankLayout>
    );
}