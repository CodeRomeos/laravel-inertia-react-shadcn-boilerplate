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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import Screenshot from "@/Components/Screenshot";
import Can from "@/Components/Can";

export default function BankAccount({ bankAccount }) {
    const [name, nameSet] = React.useState(bankAccount ? bankAccount.name : "");
    const { data, setData, post, processing, errors, reset } = useForm({
        name: bankAccount ? bankAccount?.name : "",
        balance: bankAccount ? bankAccount?.balance : "",
        account_number: bankAccount ? bankAccount?.account_number : "",
        bank_name: bankAccount ? bankAccount?.bank_name : "",
        branch: bankAccount ? bankAccount?.branch : "",
        ifsc: bankAccount ? bankAccount?.ifsc : "",
        address: bankAccount ? bankAccount?.address : "",
    });

    const submit = (e) => {
        e.preventDefault();

        if (bankAccount) {
            post(route("admin.bankAccounts.update", { id: bankAccount.id }));
        } else {
            post(route("admin.bankAccounts.store"));
        }
    };

    React.useEffect(() => {
        setData("name", name);
        if (!bankAccount) setData("slug", textToSlug(name));
    }, [name]);

    return (
        <TwoColumnLayout>
            <Head>
                <title>{`${
                    bankAccount
                        ? "Edit Bank Account - " + bankAccount.name
                        : "Create"
                } Bank Account`}</title>
            </Head>
            <TwoColumnLayout.Heading>
                <PageHeading>
                    <PageHeading.Title>
                        {bankAccount ? (
                            <div className="flex gap-x-3 items-center">
                                <PencilLine />
                                Bank Account - {bankAccount.name}
                            </div>
                        ) : (
                            <div className="flex gap-x-3 items-center">
                                <PlusCircle />
                                Add Bank Account
                            </div>
                        )}
                    </PageHeading.Title>
                    <PageHeading.Actions>
                        <Button asChild variant="outline">
                            <Link href={route("admin.bankAccounts.index")}>
                                Cancel
                            </Link>
                        </Button>
                        <Can permit="create bank accounts">
                            <Button asChild>
                                <Link href={route("admin.bankAccounts.create")}>
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
                    <Can permit="edit bank accounts">
                        <div>
                            {bankAccount ? (
                                <Link className="text-blue-600 italic text-sm">
                                    {route("admin.bankAccounts.edit", bankAccount.id)}
                                </Link>
                            ) : (
                                ""
                            )}
                        </div>
                    </Can>
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
                                    <Label htmlFor="name">
                                        Bank Account Name
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={name}
                                        autoFocus
                                        className="mt-1 block w-full text-xl h-18"
                                        placeholder="Bank Account name..."
                                        onChange={(e) => {
                                            nameSet(e.target.value);
                                            setData("name", e.target.value);
                                        }}
                                    />

                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="balance">Balance</Label>
                                    <Input
                                        id="balance"
                                        type="text"
                                        name="balance"
                                        value={data.balance}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("balance", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.balance}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="account_number">
                                        Account Number
                                    </Label>
                                    <Input
                                        id="account_number"
                                        type="text"
                                        name="account_number"
                                        value={data.account_number}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "account_number",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        message={errors.account_number}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="bank_name">Bank Name</Label>
                                    <Input
                                        id="bank_name"
                                        type="text"
                                        name="bank_name"
                                        value={data.bank_name}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("bank_name", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.bank_name}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="branch">Branch</Label>
                                    <Input
                                        id="branch"
                                        type="text"
                                        name="branch"
                                        value={data.branch}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("branch", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.branch}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="ifsc">IFSC</Label>
                                    <Input
                                        id="ifsc"
                                        type="text"
                                        name="ifsc"
                                        value={data.ifsc}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("ifsc", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.ifsc}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        id="address"
                                        type="text"
                                        name="address"
                                        value={data.address}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.address}
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
                        screenshotName={`bank_details_${bankAccount?.name}`}
                        moduleName="bank accounts"
                    >
                        {bankAccount && (
                            <ShadcnCard title={bankAccount.name}>
                                <TextMuted className="inline-block mb-0">
                                    Bank Account Name
                                </TextMuted>
                                <p className="!mt-0">
                                    <span className="font-bold text-lg inline-block">
                                        {bankAccount.name}
                                    </span>
                                    <small className="text-xs items-start flex gap-x-2">
                                        <span className="mt-0.5">
                                            <Info size={14} />
                                        </span>
                                        Branch: {bankAccount?.branch}
                                        <br />
                                        IFSC: {bankAccount?.ifsc}
                                    </small>
                                </p>

                                <TextMuted className="inline-block mb-0">
                                    Account Number
                                </TextMuted>
                                <p className="!mt-0">
                                    <span className="font-bold text-lg inline-block">
                                        {bankAccount?.account_number}
                                    </span>
                                </p>

                                <TextMuted className="inline-block pt-1">
                                    Created at
                                </TextMuted>
                                <TextLarge className={`leading-[0]`}>
                                    {bankAccount.created_at_string}
                                </TextLarge>
                                <TextMuted className="inline-block pt-2">
                                    Last Updated
                                </TextMuted>
                                <TextLarge className={`leading-[0]`}>
                                    {bankAccount.updated_at_string}
                                </TextLarge>
                            </ShadcnCard>
                        )}
                    </Screenshot>
                </TwoColumnLayout.Aside>
            </TwoColumnLayout.Content>
        </TwoColumnLayout>
    );
}
