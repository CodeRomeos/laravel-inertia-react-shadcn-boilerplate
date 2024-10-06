import { Link, usePage } from "@inertiajs/react";
import { PencilIcon } from "lucide-react";
import React from "react";

export default function AdminGlobalHeader() {
    const { url, component } = usePage();
    const { page } = usePage().props;
    return (
        <div className="bg-slate-800 text-primary-foreground p-2 text-sm">
            <div className="container flex justify-between">
                <div>
                    {(component === 'Page' || component === 'Homepage') && <Link 
                        href={route("admin.pages.edit", { id: page.id })} 
                        className="flex items-center">
                            <PencilIcon size={14} className="mr-2" /> Edit Page
                    </Link>}
                </div>
                <div>
                    <Link href={route("admin.dashboard")}>Dashboard</Link>
                </div>
            </div>
        </div>
    );
}
