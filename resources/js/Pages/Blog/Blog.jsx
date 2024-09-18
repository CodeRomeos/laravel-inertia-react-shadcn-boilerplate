import PageLayout from "@/Layouts/PageLayout";
import { Link } from "@inertiajs/react";

const Blog = ({ posts }) => {
    return (
        <>
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
        </>
    );
}

Blog.layout = (page) => (
    <PageLayout
        children={page}
        title="Blog"
        metaDescription="Blog"
    />
);

export default Blog