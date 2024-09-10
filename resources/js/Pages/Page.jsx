import { config } from "@/Components/Puck/config";
import BlankLayout from "@/Layouts/blank-layout";
import Header from "@/Layouts/Header";
import { Head } from "@inertiajs/react";
import { Render } from "@measured/puck";


export default function Page({ page }) {
    return (
        <div>
            <Head title={page.meta_title ? page.meta_title : page.title}>
                <meta name="description" content={page.meta_description} />
            </Head>
            <Header />
            {/* <div dangerouslySetInnerHTML={{ __html: page?.body }}></div> */}
            <div className="content overflow-y-visible h-auto">
                <Render config={config} data={page.puck_body} />
            </div>
        </div>
    );
}