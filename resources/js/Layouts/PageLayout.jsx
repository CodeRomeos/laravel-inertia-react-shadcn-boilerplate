import React from "react";
import BlankLayout from "@/Layouts/blank-layout";
import Header from "@/Layouts/Header";
import Footer from "./Footer";
import { Head, usePage } from "@inertiajs/react";
const AdminGlobalHeader = React.lazy(() => import("@/Components/Admin/AdminGlobalHeader"));

export default function PageLayout({ children, title, metaDescription }) {
    const { auth } = usePage().props;
    return (
        <BlankLayout>
            <Head title={title}>
                <meta name="description" content={metaDescription} />
            </Head>
            {auth && auth.user && auth.userRoles && auth.userRoles.includes('admin') && <AdminGlobalHeader />}
            <Header />
            <div className="content">{children}</div>
            <Footer />
        </BlankLayout>
    );
}
