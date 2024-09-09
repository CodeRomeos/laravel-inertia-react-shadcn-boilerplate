import React from "react";
import Nav from "./Nav";
import { Link } from "@inertiajs/react";
import { Package2 } from "lucide-react";

export default function Header() {
    return (
        <header className="sticky top-0 bg-white flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
            </Link>
            <Nav />
        </header>
    );
}
