import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/shadcn/ui/hover-card";
import { InfoIcon, User } from "lucide-react";
import UserInfoCard from "./UserInfoCard";

export default function UserHoverCard({user}) {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <span className="underline whitespace-pre inline-block cursor-pointer">{user.full_name}</span>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <UserInfoCard user={user} />
            </HoverCardContent>
        </HoverCard>
    );
}