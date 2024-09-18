import ShadcnProvider from "./shadcn-provider";

export default function BlankLayout({ children }) {
    return (
        <ShadcnProvider>
            <main className="w-full tracking-tight bg-background">
                {children}
            </main>
        </ShadcnProvider>
    );
}
