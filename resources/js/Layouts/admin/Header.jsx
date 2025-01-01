import ThemeToggle from "../../Components/ThemeToggle/theme-toggle";
import { cn } from "@/shadcn";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";
import { BellRing } from "lucide-react";
import { usePage } from "@inertiajs/react";
import MainSiteIconLink from "@/Components/Admin/MainSiteIconLink";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Header() {
    return (
        <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
            <nav className="h-14 flex items-center justify-between px-4">
                <div className="hidden lg:block">
                    <ApplicationLogo />
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
