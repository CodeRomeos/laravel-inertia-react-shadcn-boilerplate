import { Badge } from "@/shadcn/ui/badge";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shadcn/ui/popover";
import { ArrowDown, ChevronDown } from "lucide-react";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/shadcn/ui/hover-card";
import StatusUpdateForm from "./StatusUpdateForm";
import UserInfoCard from "../UserInfoCard";
import { format } from "date-fns";
import UserHoverCard from "../UserHoverCard";
import Can from "../Can";

const StatusBadge = ({ model }) => (
    <Badge
        variant="outlined"
        className={`${
            model.latest_status && model.latest_status.status == "Approved"
                ? "bg-green-500 text-white"
                : ""
        } ${
            model.latest_status && model.latest_status.status == "Rejected"
                ? "bg-red-500 text-white"
                : ""
        } ${
            model.latest_status && model.latest_status.status == "RequestChanges"
                ? "bg-yellow-500 text-black"
                : ""
        }`}
    >
        {model.latest_status ? model.latest_status.status : "NoStatus"}
    </Badge>
);

export function StatusDetailsPopover({model, modelType, modelId}) {
    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <StatusBadge model={model} />
                </PopoverTrigger>
                <PopoverContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between gap-2">
                                <h4 className="font-medium inline-block">
                                    Status
                                </h4>
                                {model.latest_status && (
                                    <StatusBadge model={model} />
                                )}
                            </div>
                            {model.latest_status && (
                                <>
                                    <div className="text-muted-foreground text-xs">
                                        {
                                            model.latest_status.user && model
                                                .latest_status.user.full_name + ", "
                                        }
                                        {format(
                                            model.latest_status.created_at,
                                            "PPp"
                                        )}
                                        {/* <Badge variant="secondary">
                                            Status at -{" "}
                                            {format(
                                                model.latest_status.created_at,
                                                "PPp"
                                            )}
                                        </Badge> */}
                                    </div>
                                    {model.latest_status.body && (
                                        <p className="mt-6 text-sm">
                                            Message -{" "}
                                            <span className="text-xs">
                                                {model.latest_status.body}
                                            </span>
                                        </p>
                                    )}
                                </>
                            )}
                        </div>
                        {/* {model.latest_status && model.latest_status.user && (
                            <div className="border rounded-md p-1">
                                <h4 className="font-medium text-center bg-slate-100 text-xs text-black">
                                    Status Updated By - {model.latest_status.user.full_name}
                                    <UserHoverCard user={model.latest_status.user} />
                                </h4>
                                <UserInfoCard user={model.latest_status.user} />
                            </div>
                        )} */}
                    </div>
                </PopoverContent>
            </Popover>
        </>
    );
}
