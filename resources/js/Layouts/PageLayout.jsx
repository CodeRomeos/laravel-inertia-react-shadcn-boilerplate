import BlankLayout from "@/Layouts/blank-layout";
import Header from "@/Layouts/Header";
import Footer from "./Footer";
import { Head } from "@inertiajs/react";

export default function PageLayout({ children, title, metaDescription }) {
    return (
        <BlankLayout>
            <Head title={title}>
                <meta
                    name="description"
                    content={metaDescription}
                />
            </Head>
            <Header />
            <div className="content">{children}</div>
            <Footer />
        </BlankLayout>
    );
}
