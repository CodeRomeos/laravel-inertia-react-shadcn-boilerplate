"use client";
import { DashboardNav } from "@/Components/Admin/dashboard-nav";
import { navItems } from "@/data/admin/nav-data";
import { Sheet, SheetContent, SheetTrigger } from "@/shadcn/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useState } from "react";

export function MobileSidebar({ className }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <MenuIcon />
                </SheetTrigger>
                <SheetContent side="left" className="!px-0">
                    <div className="space-y-4 py-4">
                        <div className="px-3 py-2">
                            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                                Overview
                            </h2>
                            <div className="space-y-1">
                                <DashboardNav
                                    items={navItems}
                                    setOpen={setOpen}
                                />
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
