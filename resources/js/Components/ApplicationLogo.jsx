import { usePage } from "@inertiajs/react";

export default function ApplicationLogo(props) {
    const { appName } = usePage().props;
    return (
        <img
            src="/images/lis-white.png"
            alt={appName}
            {...props}
        />
    );
}
