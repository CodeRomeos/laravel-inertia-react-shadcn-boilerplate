import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/shadcn/ui/alert-dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/shadcn/ui/tooltip";
import { useForm } from "@inertiajs/react";
import Can from "../Can";
import { Button } from "@/shadcn/ui/button";
import { Loader2Icon, RotateCcwIcon } from "lucide-react";

const RestorePostDialog = ({ post }) => {
    const [open, setOpen] = React.useState(false);
    const { post: restore, processing } = useForm();

    const restorePost = (e) => {
        e.preventDefault();

        restore(
            route("admin.posts.restore", post.id),
            {
                preserveScroll: true,
            },
            {
                onSuccess: () => setOpen(false),
            }
        );
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <Can permit="edit posts">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <AlertDialogTrigger asChild>
                                <Button size="icon">
                                    <RotateCcwIcon size="16" />
                                </Button>
                            </AlertDialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Restore</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </Can>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action will restore the post from trashed.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={restorePost}
                        disabled={processing}
                    >
                        {processing ? (
                            <>
                                <Loader2Icon
                                    className="animate-spin mr-2"
                                    size="16"
                                />{" "}
                                Restoring...
                            </>
                        ) : (
                            "Restore"
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
export default RestorePostDialog;
