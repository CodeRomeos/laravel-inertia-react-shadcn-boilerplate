import React from "react";
import PageHeading from "@/Components/PageHeading";
import { Button } from "@/shadcn/ui/button";
import { Link } from "@inertiajs/react";
import { ChevronLeft, PencilLine, PlusCircle } from "lucide-react";

export default function PageHeader({
    data,
    label,
    id,
    btnLabel = "Create New",
}) {
    return (
        <PageHeading>
            <PageHeading.Title>
                {data ? (
                    <div className="flex gap-x-3 items-center">
                        <PencilLine />
                        {label} - {id}
                    </div>
                ) : (
                    <div className="flex gap-x-3 items-center">
                        <PlusCircle />
                        Add {label}
                    </div>
                )}
            </PageHeading.Title>
            <PageHeading.Actions>
                <Button asChild variant="outline">
                    {/* <Link href={history.back()}>
                        <ChevronLeft />
                        <span className="hidden sm:block"> Back</span>
                    </Link> */}
                </Button>
                {/* <Button asChild className="sm:inherit">
                    <Link href={}>
                        <PlusCircle className="sm:h-4 sm:w-4 sm:mr-1" />
                        <span className="hidden sm:block">{btnLabel}</span>
                    </Link>
                </Button> */}
            </PageHeading.Actions>
        </PageHeading>
    );
}
