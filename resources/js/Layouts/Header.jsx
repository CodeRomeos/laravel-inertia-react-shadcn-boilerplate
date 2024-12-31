import React from "react";
import Navbar from "./Navbar";
import { Link, usePage } from "@inertiajs/react";
import { Package2 } from "lucide-react";
import MobileNavbar from "./MobileNavbar";

export default function Header() {
    const { appName, globalSettings } = usePage().props;
    return (
        <header className="sticky top-0 bg-white shadow-md z-50">
            <div className="container flex items-center gap-4 h-16">
                <MobileNavbar />
                <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    {globalSettings.general.app_logo && (
                        <img
                            src={globalSettings.general.app_logo}
                            alt={globalSettings.general.app_logo || appName}
                            className="h-12"
                        />
                    )}
                    <span>
                        {globalSettings.general.app_name || appName}
                    </span>
                </Link>
                <Navbar />
            </div>
        </header>
    );
}
