import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { ChevronDownIcon, ChevronRightIcon, MoveRight } from "lucide-react";

const MenuLink = ({item, ...props}) => {
    if(item.route_name) {
        return <Link href={route(item.route_name, item.route_params)} {...props} />
    }

    return <a href={item.url} {...props} />;
}

const ParentItem = ({item}) => {
    return (
        <li className="group/dropdown relative inline-flex items-center transition duration-150 ease-in-out focus:outline-none cursor-pointer hover:bg-slate-100">
            <MenuLink className="p-3.5 py-2 flex justify-between items-center" item={item}>
                {item.label}{" "}
                {item.children && item.children.length > 0 && (
                    <ChevronDownIcon size="14" className="ml-2" />
                )}
            </MenuLink>

            {item.children && item.children.length > 0 && (
                <ul className="absolute opacity-0 group-hover/dropdown:opacity-100 h-0 invisible group-hover/dropdown:h-auto group-hover/dropdown:visible transition-all duration-500 animate-fadeInDown z-10 lg:absolute top-full left-0 right-0 m-auto bg-white min-w-[240px] shadow-lg">
                    {item.children.map((child) => (
                        <li
                            key={child.id}
                            className="group/submenu relative hover:bg-slate-100"
                        >
                            <MenuLink
                                item={child}
                                className="p-3.5 hover:bg-slate-100 w-full flex items-center justify-between"
                            >
                                {child.label}
                                {child.children &&
                                    child.children.length > 0 && (
                                        <ChevronRightIcon size="14" />
                                    )}
                            </MenuLink>

                            {child.children && child.children.length > 0 && (
                                <ul className="absolute opacity-0 group-hover/submenu:opacity-100 w-0 invisible group-hover/submenu:w-auto group-hover/submenu:visible transition-all duration-500 animate-fadeInDown z-10 lg:absolute top-0 left-full m-auto bg-white min-w-[240px] shadow-lg">
                                    {child.children.map((grandchild) => (
                                        <li key={grandchild.id} className="">
                                            <MenuLink
                                                item={grandchild}
                                                className="p-3.5 hover:bg-slate-100 w-full block"
                                            >
                                                {grandchild.label}
                                            </MenuLink>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
}

export default function Nav() {
    const {primaryMenu} = usePage().props;
    return (
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <ul className="flex">
                {primaryMenu.items.map((item) => <ParentItem key={item.id} item={item} />)}
            </ul>
        </nav>
    );
}
