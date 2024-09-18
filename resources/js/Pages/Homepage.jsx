import { config } from "@/Components/Puck/config";
import { Head } from "@inertiajs/react";
import { Render } from "@measured/puck";
import PageLayout from "@/Layouts/PageLayout";

export default function Homepage({ page }) {
    return (
        <PageLayout>
            <Head title={page.meta_title ? page.meta_title : page.title}>
                <meta name="description" content={page.meta_description} />
            </Head>
            {/* <div dangerouslySetInnerHTML={{ __html: page?.body }}></div> */}
            <Render config={config} data={page.puck_body} />
        </PageLayout>
    );
}
