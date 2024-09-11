import { Head } from "@inertiajs/react";
import React from "react";
import TwoColumnLayout from "@/Layouts/admin/TwoColumnLayout";
import PuckPageForm from "@/Components/Pages/PuckPageForm";

export default function PuckPage({ page, personTitles }) {
    return (
        <TwoColumnLayout>
            <Head>
                <title>{`${
                    page ? "Edit Page - " + page?.full_name : "Create"
                } Page`}</title>
            </Head>

            <PuckPageForm page={page} />
        </TwoColumnLayout>
    );
}
