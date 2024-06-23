import { Avatar, AvatarFallback } from "@/shadcn/ui/avatar";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";

export default function CommentList({comments}) {
    return (
        <div className="comments space-y-4">
            <h2>{comments.length > 0 ? "Comments" : ""}</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
                {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <div className="flex gap-4 items-center">
                            <Avatar>
                                <AvatarFallback>
                                    {comment.user.full_name[0]}
                                </AvatarFallback>
                            </Avatar>
                            <h4 className="text-sm font-semibold">
                                {comment.user.full_name}
                            </h4>
                            <span className="text-muted-foreground text-xs">
                                {format(comment.created_at, "PPpp")}
                            </span>
                        </div>
                        <p className="pl-14 text-sm">{comment.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}