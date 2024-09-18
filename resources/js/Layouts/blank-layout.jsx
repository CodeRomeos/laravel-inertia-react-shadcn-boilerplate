import SiteParentLayout from "./SiteParentLayout";

export default function BlankLayout({ children }) {
    return (
        <SiteParentLayout>
            <main className="w-full tracking-tight bg-background">
                {children}
            </main>
        </SiteParentLayout>
    );
}
