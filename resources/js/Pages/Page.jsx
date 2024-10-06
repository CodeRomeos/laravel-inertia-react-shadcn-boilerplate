import { config } from "@/Components/Puck/config";
import PageLayout from "@/Layouts/PageLayout";
import { Render } from "@measured/puck";

const Page = ({ page }) => (
    <Render
        config={config}
        data={page.puck_body || { content: [], root: {} }}
    />
);

Page.layout = page => <PageLayout
        children={page}
        title={page.props.page.meta_title ? page.props.page.meta_title : page.props.page.title}
        metaDescription={page.props.page.meta_description}
    />

export default Page;
