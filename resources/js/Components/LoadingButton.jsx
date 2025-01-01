import { Button } from "@/shadcn/ui/button";
import { Loader2Icon } from "lucide-react";

export default function LoadingButton({ loading, loadingText="", children, ...props }) {
    return (
        <Button disabled={loading} {...props}>{loading ? <Loader2Icon className="w-4 h-4 mr-2 animate-spin" /> : ''}{children}</Button>
    );
}