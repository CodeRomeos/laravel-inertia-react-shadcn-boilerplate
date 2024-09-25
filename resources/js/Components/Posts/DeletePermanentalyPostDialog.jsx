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

const DeletePermanentalyPostDialog = ({ post }) => {
    const [open, setOpen] = React.useState(false);
    const { delete: destroy, processing } = useForm();

    const deletePost = (e) => {
        e.preventDefault();

        destroy(
            route("admin.posts.deletePermanently", post.id),
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
                                <Button variant="destructive" size="icon">
                                    <Trash2Icon size="16" />
                                </Button>
                            </AlertDialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Delete Permanentaly</p>
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
                        This action cannot be undone. This will permanently
                        delete the post.
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
                            "Delete Permanently"
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
export default DeletePermanentalyPostDialog;
