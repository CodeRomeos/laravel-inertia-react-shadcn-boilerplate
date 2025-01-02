import { Link, usePage } from "@inertiajs/react";

export default function ApplicationLogo({ imgClass = "", textClass = "" }) {
    const { appName, globalSettings } = usePage().props;
    return (
		<Link
		href="/"
		className="flex items-center gap-2 text-lg font-semibold md:text-base"
	>
		{globalSettings.general.app_logo
			? <img
				loading="lazy"
				decoding="async"
				src={globalSettings.general.app_logo}
				alt={globalSettings.general.app_logo || appName}
				className={["h-12", imgClass]}
			/>
			: <h1 className={textClass}>{globalSettings.general.app_name || appName}</h1>
		}
	</Link>
    );
}
