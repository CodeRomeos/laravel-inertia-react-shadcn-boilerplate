import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";
import { Label } from "@/shadcn/ui/label";
import { Input } from "@/shadcn/ui/input";
import InputError from "../InputError";
import { Button } from "@/shadcn/ui/button";
import { useForm, usePage } from "@inertiajs/react";
import { Combobox } from "@/shadcn/ui/combobox";

export default function ClientForm({client, personTitles}) {
    const {phoneCodes} = usePage().props
    const { data, setData, post, processing, errors, reset } = useForm({
        title: client ? client?.title : personTitles[0],
        first_name: client ? client?.first_name : "",
        last_name: client ? client?.last_name : "",
        company_name: client ? client?.company_name : "",

        email: client ? client?.email : "",
        phone_code: client ? client?.phone_code : "91",
        phone: client ? client?.phone : "",

        email2: client ? client?.email2 : "",
        phone_code2: client ? client?.phone_code2 : "91",
        phone2: client ? client?.phone2 : "",

        address: client ? client?.address : "",
        dob: client ? client?.dob : "",
        marriage_anniversary: client ? client?.marriage_anniversary : "",
    });

    const submit = (e) => {
        e.preventDefault();

        if (client) {
            post(route("clients.update", { id: client.id }));
        } else {
            post(route("clients.store"));
        }
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            {/* First name & last name */}
            <div className="grid grid-cols-5 gap-4">
                {/* Title */}
                <div>
                    <Label htmlFor="title">Title</Label>
                    <Select
                        id="title"
                        name="title"
                        value={`${data.title}`}
                        className="mt-1 block w-full"
                        onValueChange={(e) => {
                            setData("title", e);
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Title" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {personTitles.map((t) => (
                                    <SelectItem key={t} value={`${t}`}>
                                        {t}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <InputError message={errors.title} className="mt-2" />
                </div>
                {/* First name */}
                <div className="col-span-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                        id="first_name"
                        type="text"
                        name="first_name"
                        value={data.first_name}
                        className="mt-1 block w-full"
                        placeholder="First name"
                        onChange={(e) => {
                            setData("first_name", e.target.value);
                        }}
                    />

                    <InputError message={errors.first_name} className="mt-2" />
                </div>
                {/* Last name */}
                <div className="col-span-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                        id="last_name"
                        type="text"
                        name="last_name"
                        value={data.last_name}
                        className="mt-1 block w-full"
                        placeholder="Last name"
                        onChange={(e) => {
                            setData("last_name", e.target.value);
                        }}
                    />

                    <InputError message={errors.last_name} className="mt-2" />
                </div>
            </div>
            {/* Company name */}
            <div>
                <Label htmlFor="company_name">Company Name</Label>
                <Input
                    id="company_name"
                    type="text"
                    name="company_name"
                    value={data.company_name}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("company_name", e.target.value)}
                />

                <InputError message={errors.company_name} className="mt-2" />
            </div>
            {/* Email & phone */}
            <div className="grid grid-cols-2 gap-4">
                {/* Email */}
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>
                {/* Phone */}
                <div className="flex gap-1">
                    <div className="self-end">
                        <div className="mt-1">
                            <Combobox
                                options={phoneCodes}
                                onChange={(e) => setData("phone_code", e.value)}
                                selected={
                                    phoneCodes.find((p) => p.value == "91")
                                        ?.value
                                }
                            />
                        </div>
                    </div>
                    <div className="flex-grow">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            type="text"
                            name="phone"
                            value={data.phone}
                            className="mt-1 block w-full"
                            onChange={(e) => setData("phone", e.target.value)}
                        />

                        <InputError message={errors.phone} className="mt-2" />
                    </div>
                </div>
            </div>
            {/* Email 2 & phone 2 */}
            <div className="grid grid-cols-2 gap-4">
                {/* Email 2 */}
                <div>
                    <Label htmlFor="email2">Email 2</Label>
                    <Input
                        id="email2"
                        type="email"
                        name="email2"
                        value={data.email2}
                        className="mt-1 block w-full"
                        onChange={(e) => setData("email2", e.target.value)}
                    />

                    <InputError message={errors.email2} className="mt-2" />
                </div>
                {/* Phone 2 */}
                <div className="flex gap-1">
                    <div className="self-end">
                        <div>
                            <Combobox
                                options={phoneCodes}
                                onChange={(e) =>
                                    setData("phone_code2", e.value)
                                }
                                selected={
                                    phoneCodes.find((p) => p.value == "91")
                                        ?.value
                                }
                            />
                        </div>
                    </div>
                    {/* Phone 2 */}
                    <div className="flex-grow">
                        <Label htmlFor="phone2">Phone 2</Label>
                        <Input
                            id="phone2"
                            type="text"
                            name="phone2"
                            value={data.phone2}
                            className="mt-1 block w-full"
                            onChange={(e) => setData("phone2", e.target.value)}
                        />

                        <InputError message={errors.phone2} className="mt-2" />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="dob">DOB</Label>
                    <Input
                        type="date"
                        name="dob"
                        className="mt-1 block w-full"
                        value={data.dob}
                        onChange={(e) => setData("dob", e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="marriage_anniversary">
                        Marriage Anniversary
                    </Label>
                    <Input
                        type="date"
                        name="marriage_anniversary"
                        className="mt-1 block w-full"
                        value={data.marriage_anniversary}
                        onChange={(e) =>
                            setData("marriage_anniversary", e.target.value)
                        }
                    />
                </div>
            </div>
            {/* Address */}
            <div>
                <Label htmlFor="address">Address</Label>
                <Input
                    id="address"
                    type="text"
                    name="address"
                    value={data.address}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("address", e.target.value)}
                />

                <InputError message={errors.address} className="mt-2" />
            </div>
            <Button className="w-[260px]">Save Client</Button>
        </form>
    );
}
