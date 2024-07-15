import BlankLayout from "@/Layouts/blank-layout";

export default function Page({ page }) {
    return (
        <BlankLayout>
            <p>{page?.title}</p>
        </BlankLayout>
    );
}