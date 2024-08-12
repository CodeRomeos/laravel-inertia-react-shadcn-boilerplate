import ThemeToggle from "../Components/ThemeToggle/theme-toggle";
import { cn } from "@/shadcn";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";
import { BellRing } from "lucide-react";
import { usePage } from "@inertiajs/react";

export default function Header() {
    const {appName} = usePage().props
    return (
        <div className="supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
            <nav className="h-14 flex items-center justify-between px-4">
                <div className="hidden lg:block">
                    <a href="/dashboard" className="flex gap-x-2 items-center">
                        <p className="text-2xl dark:text-white">{appName}</p>
                    </a>
                </div>
                <div className={cn("block lg:!hidden")}>
                    <MobileSidebar />
                </div>

                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <UserNav />
                </div>
            </nav>
        </div>
    );
}
