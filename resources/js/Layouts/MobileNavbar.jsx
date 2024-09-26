import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { ChevronDownIcon, ChevronRightIcon, MenuIcon, MoveRight } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/shadcn/ui/sheet";
import { Button } from "@/shadcn/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/shadcn/ui/accordion";


const MenuLink = ({item, ...props}) => {
    if(item.route_name) {
        return <Link href={route(item.route_name, item.route_params)} {...props} />
    }

    return <a href={item.url} {...props} />;
}

const ParentItem = ({item}) => {
    return (
        <li className="">
            {item.children && item.children.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value={item.id} className="border-none">
                        <AccordionTrigger className="no-underline">
                            {item.label}
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul>
                                {item.children.map((child) => (
                                    <li key={child.id} className="">
                                        {child.children &&
                                        child.children.length > 0 ? (
                                            <Accordion
                                                type="single"
                                                collapsible
                                                className="w-full"
                                            >
                                                <AccordionItem
                                                    value={child.id}
                                                    className="border-none"
                                                >
                                                    <AccordionTrigger className="no-underline">
                                                        {child.label}
                                                    </AccordionTrigger>
                                                    <AccordionContent>
                                                        {child.children &&
                                                            child.children
                                                                .length > 0 && (
                                                                <ul className="">
                                                                    {child.children.map(
                                                                        (
                                                                            grandchild
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    grandchild.id
                                                                                }
                                                                                className=""
                                                                            >
                                                                                <MenuLink
                                                                                    item={
                                                                                        grandchild
                                                                                    }
                                                                                    className=""
                                                                                >
                                                                                    {
                                                                                        grandchild.label
                                                                                    }
                                                                                </MenuLink>
                                                                            </li>
                                                                        )
                                                                    )}
                                                                </ul>
                                                            )}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                        ) : (
                                            <MenuLink
                                                item={child}
                                                className="flex items-center py-2"
                                            >
                                                {child.label}
                                            </MenuLink>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            ) : (
                <MenuLink className="py-3 block" item={item}>
                    {item.label}
                </MenuLink>
            )}
            {/* <div className="p-3.5 py-2 flex justify-between items-center">
                <MenuLink className="" item={item}>
                    {item.label}{" "}
                </MenuLink>
                {item.children && item.children.length > 0 && (
                    <ChevronDownIcon size="14" className="ml-2" />
                )}
            </div>

            {item.children && item.children.length > 0 && (
                <ul className="opacity-0 group-hover/dropdown:opacity-100 h-0 invisible group-hover/dropdown:h-auto group-hover/dropdown:visible transition-all duration-500 animate-fadeInDown z-10 ml-4">
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
            )} */}
        </li>
    );
}

export default function MobileNavbar() {
    const { primaryMenu } = usePage().props;
    return (
        <nav className="md:hidden">
            <Sheet>
                <SheetTrigger>
                    <Button variant="ghost">
                        <MenuIcon size="20" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle>Logo</SheetTitle>
                    </SheetHeader>
                    <ul>
                        {primaryMenu &&
                            primaryMenu.items.map((item) => (
                                <ParentItem key={item.id} item={item} />
                            ))}
                    </ul>
                </SheetContent>
            </Sheet>
        </nav>
    );
}
