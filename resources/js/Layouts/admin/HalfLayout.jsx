import { ScrollArea } from "@/shadcn/ui/scroll-area";
import AuthenticatedLayout from "./AuthenticatedLayout";

export default function HalfLayout({ children, className = "" }) {
    return (
        <AuthenticatedLayout>
            <ScrollArea className="h-full">
                <div
                    className={`flex-1 space-y-4 p-4 md:p-8 pt-6 ${className}`}
                >
                    {children}
                </div>
            </ScrollArea>
        </AuthenticatedLayout>
    );
}

const Heading = ({ children }) => {
    return <div className="w-full">{children}</div>;
};

const Content = ({ children }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">{children}</div>
    );
};

const Main = ({ children, className = "" }) => {
    return <main className={`w-full space-y-4 sm:col-span-2 lg:col-span-2 ${className}`}>{children}</main>;
};

const Aside = ({ children }) => {
    return (
        <aside className="w-full h-full space-y-4 lg:col-span-2">
            {children}
        </aside>
    );
};

const Actions = ({ children }) => {
    return <div className="w-full h-full my-4">{children}</div>;
};

HalfLayout.Heading = Heading;
HalfLayout.Aside = Aside;
HalfLayout.Content = Content;
HalfLayout.Main = Main;
HalfLayout.Actions = Actions;
