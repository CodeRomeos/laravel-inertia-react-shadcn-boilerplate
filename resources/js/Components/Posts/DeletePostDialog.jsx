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
import { Loader2Icon, Trash2Icon } from "lucide-react";

const DeletePostDialog = ({ post }) => {
    const [open, setOpen] = React.useState(false);
    const { delete: destroy, processing } = useForm();

    const deletePost = (e) => {
        e.preventDefault();

        destroy(
            route("admin.posts.delete", post.id),
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
            <Can permit="delete posts">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-red-500 "
                                >
                                    <Trash2Icon size="16" />
                                </Button>
                            </AlertDialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Move to Trash</p>
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
                        This action will move the post to the trash.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={deletePost}
                        disabled={processing}
                    >
                        {processing ? (
                            <>
                                <Loader2Icon
                                    className="animate-spin mr-2"
                                    size="16"
                                />{" "}
                                Deleting...
                            </>
                        ) : (
                            "Delete"
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
export default DeletePostDialog;
