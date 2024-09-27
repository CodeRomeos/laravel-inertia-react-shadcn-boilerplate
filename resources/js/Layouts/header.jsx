import React from "react";
import Navbar from "./Navbar";
import { Link } from "@inertiajs/react";
import { Package2 } from "lucide-react";
import MobileNavbar from "./MobileNavbar";

export default function Header() {
    return (
        <header className="sticky top-0 bg-white">
            <div className="container flex items-center gap-4 h-16">
                <MobileNavbar />
                <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <Package2 className="h-6 w-6" />
                    <span className="sr-only">Acme Inc</span>
                </Link>
                <Navbar />
            </div>
        </header>
    );
}
