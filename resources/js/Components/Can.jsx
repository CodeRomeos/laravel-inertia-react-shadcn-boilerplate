import { usePage } from "@inertiajs/react";

export const hasPermisions = (auth, permit) => {
    return auth.user.is_super_admin ||
        // auth.userPermissions.includes(permit) ||
        permit.split("|").filter(function (n) {
            return auth.userPermissions.indexOf(n) !== -1;
        }).length > 0
    ;
}

export default function Can({permit, children, fallback = null}) {
    const {auth} = usePage().props;

    if (hasPermisions(auth, permit)) {
        return children;
    }

    return fallback;
}