import { cn } from "@/shadcn";
import { navItems } from "@/data/nav-data";
import { DashboardNav } from "@/Components/Admin/dashboard-nav";

export default function Sidebar() {
    return (
        <nav
            className={cn(
                `relative hidden h-screen border-r lg:block w-72`
            )}
        >
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="space-y-1">
                        {/* <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
                            Overview
                        </h2> */}
                        <DashboardNav items={navItems} />
                    </div>
                </div>
            </div>
        </nav>
    );
}
