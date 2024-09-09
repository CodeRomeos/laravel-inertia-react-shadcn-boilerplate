import { Button } from "@/shadcn/ui/button";
import { Head, Link } from "@inertiajs/react";
import PageHeading from "@/Components/PageHeading";
import { useForm } from "@inertiajs/react";
import { Label } from "@/shadcn/ui/label";
import { Input } from "@/shadcn/ui/input";
import InputError from "@/Components/InputError";
import React from "react";
import EditorInput from "@/Components/EditorInput";
import { textToSlug } from "@/Helpers/GlobalFunctions";
import TwoColumnLayout from "@/Layouts/admin/TwoColumnLayout";
import { TextLarge, TextMuted } from "@/shadcn/ui/text-muted";
import {
    Info,
    MoreHorizontal,
    PencilLine,
    PlusCircle,
    Share2Icon,
    User,
} from "lucide-react";
import ShadcnCard from "@/Components/ShadcnCard";
import { cn } from "@/shadcn";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";
import { Textarea } from "@/shadcn/ui/textarea";
import { Calendar } from "@/shadcn/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import Screenshot from "@/Components/Screenshot";
import Can from "@/Components/Can";

export default function Card({ card }) {
    const [name, nameSet] = React.useState(card ? card.name : "");
    const [expiryDate, expiryDateSet] = React.useState(
        card ? card.expiry_date : null
    );
    const { data, setData, post, processing, errors, reset } = useForm({
        name: card ? card?.name : "",
        last_four_digits: card ? card?.last_four_digits : "",
        issuer_name: card ? card?.issuer_name : "",
        description: card ? card?.description : "",
        debit_credit: card ? card?.debit_credit : "",
    });

    const submit = (e) => {
        e.preventDefault();

        if (card) {
            post(route("admin.cards.update", { id: card.id }));
        } else {
            post(route("admin.cards.store"));
        }
    };

    React.useEffect(() => {
        setData("name", name);
        if (!card) setData("slug", textToSlug(name));
    }, [name]);

    return (
        <TwoColumnLayout>
            <Head>
                <title>{`${
                    card ? "Edit Card - " + card.name : "Create"
                } Card`}</title>
            </Head>
            <TwoColumnLayout.Heading>
                <PageHeading>
                    <PageHeading.Title>
                        {card ? (
                            <div className="flex gap-x-3 items-center">
                                <PencilLine />
                                Card - {card.name}
                            </div>
                        ) : (
                            <div className="flex gap-x-3 items-center">
                                <PlusCircle />
                                Add Card
                            </div>
                        )}
                    </PageHeading.Title>
                    <PageHeading.Actions>
                        <Button asChild variant="outline">
                            <Link href={route("admin.cards.index")}>Cancel</Link>
                        </Button>
                        <Can permit="create cards">
                            <Button asChild>
                                <Link href={route("admin.cards.create")}>
                                    <PlusCircle className="h-4 w-4 mr-2" />{" "}
                                    Create New
                                </Link>
                            </Button>
                        </Can>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            payment.id
                                        )
                                    }
                                >
                                    Copy payment ID
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    View client
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    View payment details
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </PageHeading.Actions>
                </PageHeading>
                <div className="flex justify-between">
                    <div>
                        {card ? (
                            <Link className="text-blue-600 italic text-sm">
                                {route("admin.cards.edit", card.id)}
                            </Link>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="flex gap-4"></div>
                </div>
            </TwoColumnLayout.Heading>
            <TwoColumnLayout.Content>
                <TwoColumnLayout.Main>
                    <form onSubmit={submit}>
                        <ShadcnCard
                            className="space-y-4"
                            title="General"
                            description={<></>}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                                <div>
                                    <Label htmlFor="name">Card Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        autoFocus
                                        className="mt-1 block w-full text-xl h-18"
                                        placeholder="Card name..."
                                        onChange={(e) => {
                                            setData("name", e.target.value);
                                        }}
                                    />

                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="last_four_digits">
                                        Last four digits
                                    </Label>
                                    <Input
                                        id="last_four_digits"
                                        type="text"
                                        name="last_four_digits"
                                        value={data.last_four_digits}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "last_four_digits",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.last_four_digits}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="issuer_name">
                                        Issuer Name
                                    </Label>
                                    <Input
                                        id="issuer_name"
                                        type="text"
                                        name="issuer_name"
                                        value={data.issuer_name}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "issuer_name",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.issuer_name}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor="debit_credit"
                                        className="mb-1"
                                    >
                                        Debit/Credit
                                    </Label>
                                    <Select
                                        id="debit_credit"
                                        name="debit_credit"
                                        value={`${data.debit_credit}`}
                                        className="mt-1 block w-full"
                                        onValueChange={(e) => {
                                            setData("debit_credit", e);
                                        }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Debit/Credit" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value={`-1`}>
                                                    Debit
                                                </SelectItem>
                                                <SelectItem value={`1`}>
                                                    Credit
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                    <InputError
                                        message={errors.debit_credit}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <Label htmlFor="description">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.description}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </ShadcnCard>
                        <TwoColumnLayout.Actions>
                            <div className="flex justify-end mt-4">
                                <Button className="w-[260px]">Submit</Button>
                            </div>
                        </TwoColumnLayout.Actions>
                    </form>
                </TwoColumnLayout.Main>
                <TwoColumnLayout.Aside>
                    <Screenshot
                        screenshotName={`card_details_${card?.name}`}
                        moduleName="cards"
                    >
                        {card && (
                            <ShadcnCard title={card.name}>
                                <p className="!mt-0">
                                    <span className="font-bold text-lg inline-block">
                                        Details
                                    </span>
                                    <small className="text-xs items-start flex gap-x-2">
                                        <span className="mt-0.5">
                                            <Info size={14} />
                                        </span>
                                        Issuer Name: {card?.issuer_name}
                                        <br />
                                        Last 4 Digits: {card?.last_four_digits}
                                    </small>
                                </p>

                                <TextMuted className="inline-block pt-2">
                                    Created at
                                </TextMuted>
                                <TextLarge className={`leading-[0]`}>
                                    {card.created_at_string}
                                </TextLarge>
                                <TextMuted className="inline-block pt-2">
                                    Last Updated
                                </TextMuted>
                                <TextLarge className={`leading-[0]`}>
                                    {card.updated_at_string}
                                </TextLarge>
                            </ShadcnCard>
                        )}
                    </Screenshot>
                    {/* <MetaInputsCard data={data} setData={setData} errors={errors} /> */}
                </TwoColumnLayout.Aside>
            </TwoColumnLayout.Content>
        </TwoColumnLayout>
    );
}
