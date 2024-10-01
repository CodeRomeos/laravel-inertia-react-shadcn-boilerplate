"use client";

import React from "react";
import { usePage } from "@inertiajs/react";
import { Icons } from "@/Components/icons";
import { cn } from "@/shadcn";
import { Link } from "@inertiajs/react";
import { ArrowRight, ChevronDown, ChevronRight } from "lucide-react";
import { hasPermisions } from "@/Components/Can";

const ListItem = ({ item, active }) => {
    const { auth } = usePage().props;
    const path = "/";
    const Icon = Icons[item.icon || "arrowRight"];
    // const current = route().current();
    const [isActive, isActiveSet] = React.useState(active);

    React.useEffect(() => {
        isActiveSet(active);
    }, [active]);

    // React.useEffect(() => {
    //     if (item.href === route().current()) {
    //         isActiveSet(true);
    //     }
    //     else if (item.href === route(route().current(), route().params)) {
    //         isActiveSet(true);
    //     }
    //     else if (
    //         route(route().current(), route().params).substring(
    //             0,
    //             item.href.length
    //         ) == item.href
    //     ) {
    //         isActiveSet(true);
    //     }
    //     // isActiveSet(
    //     //      ||
    //     //         route(route().current(), route().params).substring(
    //     //             0,
    //     //             item.href.length
    //     //         ) == item.href
    //     // );
    // }, []);

    if (item.permit && !hasPermisions(auth, item.permit)) {
        return null;
    }

    return (
        <li>
            <Link
                href={item.href}
                className={cn(
                    isActive ? "text-primary" : "text-secondary-foreground"
                )}
            >
                <span
                    className={cn(
                        "group flex items-center px-3 py-2 text-sm font-medium transition-all hover:bg-primary/70 hover:text-white",
                        path === item.href ? "bg-accent" : "transparent",
                        item.disabled && "cursor-not-allowed opacity-80"
                    )}
                >
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                </span>
            </Link>
        </li>
    );
};
const SubMenu = ({ items }) => {
    const [activeIndex, activeIndexSet] = React.useState(null);

    React.useEffect(() => {
        if (items && items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (item.href === route(route().current(), route().params)) {
                    activeIndexSet(i);
                    break;
                }
                // else if(item.href === route(route().current())) {
                //     activeIndexSet(i);
                //     break;
                // }
                else if (
                    route(route().current(), route().params).substring(
                        0,
                        item.href.length
                    ) == item.href
                ) {
                    activeIndexSet(i);
                    break;
                }
            }
        }
    }, []);

    if (
        !items ||
        !Array.isArray(items) ||
        (Array.isArray(items) && items.length === 0)
    )
        return null;
    return (
        <ul className={cn("bg-secondary dark:bg-muted-foreground rounded-b")}>
            {items.map((item, i) => (
                <ListItem
                    active={activeIndex === i}
                    key={`submenu-${i}`}
                    item={item}
                />
            ))}
        </ul>
    );
};

const ParentContainer = ({ item, children, ...any }) => {
    let Component = Link;
    if (item.items && item.items.length > 0) {
        Component = () => <div {...any}>{children}</div>;
    }

    return <Component {...any}>{children}</Component>;
};

const NavItem = ({ item }) => {
    const { url, component } = usePage();
    const { auth } = usePage().props;
    const [open, openSet] = React.useState(false);
    const path = "/";
    const Icon = Icons[item.icon || "arrowRight"];

    React.useEffect(() => {
        openSet(
            route(route().current(), route().params).includes(item.href) ||
                item.items?.some((item) =>
                    route(route().current(), route().params).includes(item.href)
                )
        );
    }, [url]);

    if (item.permit && !hasPermisions(auth, item.permit)) {
        return null;
    }

    return (
        <div
            className={cn(
                `${
                    open
                        ? "bg-primary text-primary-foreground "
                        : ""
                } rounded`
            )}
        >
            <ParentContainer
                className={"cursor-pointer"}
                item={item}
                href={item.disabled ? "#" : item.href}
                onClick={() => {
                    openSet(!open);
                }}
            >
                <div
                    className={cn(
                        "group flex items-center px-3 py-2 text-sm font-medium justify-between",
                        path === item.href ? "bg-accent" : "transparent",
                        item.disabled && "cursor-not-allowed opacity-80"
                    )}
                >
                    <div className="flex">
                        <Icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                    </div>
                    {item.items && item.items.length > 0 && (
                        <span className="text-xs">
                            {!open && <ChevronRight size={14} />}
                            {open && <ChevronDown size={14} />}
                        </span>
                    )}
                </div>
            </ParentContainer>
            {open && <SubMenu items={item.items} />}
        </div>
    );
};

export function DashboardNav({ items, setOpen }) {
    if (!items?.length) {
        return null;
    }

    return (
        <>
            <nav className="grid items-start gap-2">
                {items.map((item, index) => (
                    <NavItem item={item} key={index} />
                ))}
            </nav>
        </>
    );
}
