import { config } from "@/Components/Puck/config";
import BlankLayout from "@/Layouts/blank-layout";
import { Head } from "@inertiajs/react";
import { Render } from "@measured/puck";


export default function Page({ page }) {
    return (
        <BlankLayout>
            <Head title={page.meta_title ? page.meta_title : page.title}>
                <meta name="description" content={page.meta_description} />
            </Head>
            <h2 className="text-3xl font-bold">{page?.title}</h2>
            {/* <div dangerouslySetInnerHTML={{ __html: page?.body }}></div> */}
            <div className="content">
                <Render config={config} data={page.puck_body} />
            </div>
        </BlankLayout>
    );
}