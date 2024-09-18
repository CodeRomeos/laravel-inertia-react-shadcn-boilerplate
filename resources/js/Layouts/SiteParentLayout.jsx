import ShadcnProvider from "./shadcn-provider";

export default function SiteParentLayout({ children }) {
    return (
        <ShadcnProvider>
            {children}
        </ShadcnProvider>
    );
}
