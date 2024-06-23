import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shadcn/ui/card";

export default function ShadcnCard({
    title,
    description,
    footer,
    children,
    ...rest
}) {
    return (
        <Card {...rest}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">{children}</CardContent>
            <CardFooter>{footer}</CardFooter>
        </Card>
    );
}