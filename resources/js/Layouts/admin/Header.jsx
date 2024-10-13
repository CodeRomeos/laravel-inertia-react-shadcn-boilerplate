import ThemeToggle from "../../Components/ThemeToggle/theme-toggle";
import { cn } from "@/shadcn";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";
import { BellRing } from "lucide-react";
import { usePage } from "@inertiajs/react";
import MainSiteIconLink from "@/Components/Admin/MainSiteIconLink";

export default function Header() {
    const { appName, globalSettings } = usePage().props;
    return (
        <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
            <nav className="h-14 flex items-center justify-between px-4">
                <div className="hidden lg:block">
                    <a
                        href="/admin/dashboard"
                        className="flex gap-x-2 items-center"
                    >
                        {globalSettings.general.app_logo && (
                            <img
                                src={globalSettings.general.app_logo}
                                alt={globalSettings.general.app_logo || appName}
                                className="h-12"
                            />
                        )}
                        <p className="text-md font-semibold dark:text-white">
                            {globalSettings.general.app_name || appName}
                        </p>
                    </a>
                </div>
                <div className={cn("block lg:!hidden")}>
                    <MobileSidebar />
                </div>

                <div className="flex items-center gap-2">
                    <MainSiteIconLink />
                    <ThemeToggle />
                    <UserNav />
                </div>
            </nav>
        </div>
    );
}
