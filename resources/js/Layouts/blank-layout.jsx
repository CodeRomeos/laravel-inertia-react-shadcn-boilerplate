import ShadcnProvider from "./shadcn-provider";

export default function BlankLayout({ children }) {
    return (
        <ShadcnProvider>
            <div className="flex h-screen overflow-hidden">
                <main className="w-full tracking-tight bg-background">
                    {children}
                </main>
            </div>
        </ShadcnProvider>
    );
}
