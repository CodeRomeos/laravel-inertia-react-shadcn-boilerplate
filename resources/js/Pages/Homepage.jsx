import { config } from "@/Components/Puck/config";
import { Render } from "@measured/puck";
import PageLayout from "@/Layouts/PageLayout";

const Homepage = ({ page }) => <Render config={config} data={page.puck_body} />

Homepage.layout = page => <PageLayout
        children={page}
        title={page.props.page.meta_title ? page.props.page.meta_title : page.props.page.title}
        metaDescription={page.props.page.meta_description}
    />

export default Homepage;