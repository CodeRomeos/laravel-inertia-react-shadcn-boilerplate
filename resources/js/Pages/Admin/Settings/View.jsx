import React from "react";
import { Button } from "@/shadcn/ui/button";
import { Head, Link } from "@inertiajs/react";
import PageHeading from "@/Components/PageHeading";
import { useForm } from "@inertiajs/react";
import TwoColumnLayout from "@/Layouts/admin/TwoColumnLayout";
import SettingField from "@/Components/Settings/SettingField";
import LoadingButton from "@/Components/LoadingButton";

export default function View({
    settings,
    settingGroup,
    fieldTypes,
    settingGroups,
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        ...settings.reduce((acc, setting) => {
            acc[setting.key] = setting.value;
            return acc;
        }, {}),
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("admin.settings.update", settingGroup.key), {});
    };

    return (
        <TwoColumnLayout>
            <Head>
                <title>{`${settingGroup.name} | Settings`}</title>
            </Head>
            <TwoColumnLayout.Heading>
                <div className="flex mb-4 p-2 bg-gray-100 rounded-sm">
                    {settingGroups.map((g) => (
                        <Button
                            asChild
                            key={g}
                            variant={
                                settingGroup.key === g.key ? "outline" : "ghost"
                            }
                        >
                            <Link
                                key={g}
                                href={route("admin.settings.view", g.key)}
                                className={`${
                                    settingGroup.key === g.key
                                        ? "cursor-not-allowed"
                                        : ""
                                }`}
                            >
                                {g.name}
                            </Link>
                        </Button>
                    ))}
                </div>
                <PageHeading>
                    <PageHeading.Title>
                        {settingGroup.name} Settings
                    </PageHeading.Title>
                    <PageHeading.Actions></PageHeading.Actions>
                </PageHeading>
            </TwoColumnLayout.Heading>
            <br />
            <div className="">
                <form onSubmit={submit}>
                    <div className="space-y-4">
                        {settingGroup.children.map((subgroup) => (
                            <div
                                key={subgroup.id}
                                className="md:grid md:grid-cols-3 mb-8"
                            >
                                <div>
                                    <h3 className="text-xl font-medium leading-6 text-primary mb-4 sm:mb-0">
                                        {subgroup.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground my-2">
                                        {subgroup.description}
                                    </p>
                                </div>
                                <div className="md:col-span-2">
                                    <div
                                        className="border rounded-md p-6 py-8"
                                    >
                                        <div className="space-y-6">
                                            {subgroup.settings.map(
                                                (setting) => (
                                                    <SettingField
                                                        key={setting.id}
                                                        setting={setting}
                                                        value={
                                                            data[setting.key]
                                                        }
                                                        options={fieldTypes}
                                                        onChange={(value) =>
                                                            setData(
                                                                setting.key,
                                                                value
                                                            )
                                                        }
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end mt-4 sticky bottom-2">
                        <LoadingButton loading={processing} className="w-[260px]">
                            Submit
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </TwoColumnLayout>
    );
}
