import BlankLayout from "@/Layouts/blank-layout";
import Header from "@/Layouts/Header";
import Footer from "./Footer";

export default function PageLayout({ children }) {
    return (
        <BlankLayout>
            <Header />
            <div className="content">
                {children}
            </div>
            <Footer />
        </BlankLayout>
    );
}
