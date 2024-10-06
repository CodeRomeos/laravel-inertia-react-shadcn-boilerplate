import PageLayout from "@/Layouts/PageLayout";

const Post = ({ post }) => {
    return (
        <>
            <h2 className="text-3xl font-bold">{post.data?.title}</h2>
            <div
                dangerouslySetInnerHTML={{ __html: post.data?.body }}
            ></div>
        </>
    );
}

Post.layout = (page) => (
    <PageLayout
        children={page}
        title={
            page.props.post.data.meta_title
                ? page.props.post.data.meta_title
                : page.props.post.data.title
        }
        metaDescription={page.props.post.data.meta_description}
    />
);

export default Post;