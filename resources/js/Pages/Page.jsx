import BlankLayout from "@/Layouts/blank-layout";
import { Head } from "@inertiajs/react";

export default function Page({ page }) {
    return (
        <BlankLayout>
            <Head title={page.meta_title ? page.meta_title : page.title}>
                <meta name="description" content={page.meta_description} />
            </Head>
            <h2 className="text-3xl font-bold">{page?.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: page?.body }}></div>
        </BlankLayout>
    );
}