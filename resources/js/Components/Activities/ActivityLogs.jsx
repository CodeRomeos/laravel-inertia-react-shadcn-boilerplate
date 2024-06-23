import { Avatar, AvatarFallback } from "@/shadcn/ui/avatar";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";

export default function ActivityList({ activities }) {
    return (
        <div className="activities space-y-4">
            <div className="space-y-4 max-h-96 overflow-y-auto">
                {activities.map((activity) => (
                    <div key={activity.id} className="activity">
                        <div className="flex gap-4 items-center">
                            <Avatar>
                                <AvatarFallback>
                                    {activity.causer.full_name[0]}
                                </AvatarFallback>
                            </Avatar>
                            <h4 className="text-sm font-semibold">
                                {activity.causer.full_name}
                            </h4>
                            <span className="text-muted-foreground text-xs">
                                {format(activity.created_at, "PPpp")}
                            </span>
                        </div>
                        <p className="pl-14 text-sm">{activity.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
