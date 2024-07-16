import { Input } from "@/shadcn/ui/input";

export default function SlugInput({baseUrl, className = "", ...props}) {
    return <div className="flex items-center">
        <span className="text-sm text-blue-600">
            {baseUrl}/
        </span>
        <Input
            className={`block w-full text-blue-600 border-none p-0 text-sm h-6 outline-none ${className}`}
            {...props}
        />
    </div>;
}