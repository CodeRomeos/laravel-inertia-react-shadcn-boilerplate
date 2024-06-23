import { ScrollArea } from "@/shadcn/ui/scroll-area";
import AuthenticatedLayout from "./AuthenticatedLayout";

export default function TwoColumnLayout({ children, className = "" }) {
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{children}</div>
    );
};

const Main = ({ children, className = "" }) => {
    return (
        <main
            className={`col-span-1 sm:col-span-2 w-full space-y-4 ${className}`}
        >
            {children}
        </main>
    );
};

const Aside = ({children}) => {
    return (
        <aside className="w-full h-full space-y-4">
            {children}
        </aside>
    );
}

const Actions = ({ children, isSticky = false }) => {
    return (
        <div
            className={`${
                isSticky
                    ? " my-4 p-4 sticky bottom-0 bg-white dark:bg-black/60 bg-opacity-55 backdrop-blur-sm rounded-md w-full h-full border"
                    : ""
            }`}
        >
            {children}
        </div>
    );
};

TwoColumnLayout.Heading = Heading;
TwoColumnLayout.Aside = Aside;
TwoColumnLayout.Content = Content;
TwoColumnLayout.Main = Main;
TwoColumnLayout.Actions = Actions;
