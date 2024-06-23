import { format } from "date-fns";
import { CalendarDays, Mail, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";
import { Button } from "@/shadcn/ui/button";

export default function UserInfoCard({user}) {
    return (
        <div className="grid grid-cols-7 justify-between space-x-4">
            <Avatar>
                <AvatarFallback>{user.full_name[0]}</AvatarFallback>
            </Avatar>

            <div className="space-y-1 col-span-6">
                <h4 className="text-sm font-semibold">{user.full_name}</h4>
                {user.roles && <small className="mt-2">{user.roles[0].name}</small>}
                <p className="text-xs text-muted-foreground">
                    <div className="flex gap-2 items-center">
                        <span className="text-xs items-start flex gap-x-2">
                            <span className="mt-0.5">
                                <Mail className="h-4 w-4" />
                            </span>
                            {user?.email !== "" ? user?.email : "NA"}
                        </span>
                        <span className="text-xs items-start flex gap-x-2">
                            <span className="mt-0.5">
                                <Phone className="h-4 w-4" />
                            </span>
                            {user?.phone ?? "NA"}
                        </span>
                    </div>
                </p>
                <div className="flex items-center pt-2">
                    <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                    <span className="text-xs text-muted-foreground">
                        Joined {format(user.created_at, "PPP")}
                    </span>
                </div>
            </div>
        </div>
    );
}