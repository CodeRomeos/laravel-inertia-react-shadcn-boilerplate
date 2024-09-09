import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/admin/AuthenticatedLayout";
import { Button } from "@/shadcn/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shadcn/ui/card";
import { router } from "@inertiajs/react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";
import PageHeading from "@/Components/PageHeading";
import {
    BarChartGraph,
    CustomPieChart,
    LineGraph,
} from "@/Components/Charts/Index";
import { Head } from "@inertiajs/react";
import React from "react";
import {
    ArrowDown,
    ArrowLeftRight,
    ArrowUp,
    Check,
    ContactIcon,
    IndianRupeeIcon,
    MinusCircle,
    PlusCircle,
} from "lucide-react";
import Screenshot from "@/Components/Screenshot";
import Can from "@/Components/Can";
import { format } from "date-fns";
import MultipleSelector from "@/shadcn/ui/MultiSelector";
import { Badge } from "@/shadcn/ui/badge";

export default function Dashboard({
    auth,
    stats,
    groupedData,
    charts
}) {
    const [dashboardData, dashboardDataSet] = React.useState({
        
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head>
                <title>Dashboard</title>
            </Head>
            <ScrollArea className="h-full">
                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <PageHeading>
                        <PageHeading.Title>
                            Hi {auth.user.full_name}, Welcome back 👋
                        </PageHeading.Title>
                        <PageHeading.Actions></PageHeading.Actions>
                    </PageHeading>
                    <Tabs defaultValue="overview" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="analytics">
                                Analytics
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="space-y-4">
                            <Can permit="dashboard overview stats">
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Total Posts
                                            </CardTitle>
                                            <ContactIcon
                                                size={14}
                                                color="#777"
                                            />
                                        </CardHeader>
                                        <CardContent>
                                            <div
                                                className={`text-2xl font-bold `}
                                            >
                                                {stats.totalPostsCount ?? 0}
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                {/* +20.1% from last month */}
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Published Posts
                                            </CardTitle>
                                            <Check size={14} color="#777" />
                                        </CardHeader>
                                        <CardContent>
                                            <div
                                                className={`text-2xl font-bold text-green-500`}
                                            >
                                                {stats.publishedPostCount ?? 0}
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                {/* ss */}
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Total Pages
                                            </CardTitle>
                                            <MinusCircle
                                                color="red"
                                                size={14}
                                            />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                {stats.totalPagesCount}
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                {/* +19% from last month */}
                                            </p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Published Pages
                                            </CardTitle>
                                            <PlusCircle
                                                color="green"
                                                size={14}
                                            />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold text-green-500">
                                                {stats.publishedPageCount}
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                {/* +201 since last hour */}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </Can>

                            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7"></div>
                        </TabsContent>

                        {/* Charts */}
                        <TabsContent value="analytics" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                                <Card className="border rounded-md">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Monthly Total
                                        </CardTitle>
                                    </CardHeader>
                                    <div className="h-32"></div>
                                </Card>

                                <Card className="border rounded-md">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Sales
                                        </CardTitle>
                                    </CardHeader>
                                    <div className="h-44">
                                        <CustomPieChart />
                                    </div>
                                </Card>
                            </div>
                            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7"></div>
                        </TabsContent>
                    </Tabs>
                </div>
            </ScrollArea>
        </AuthenticatedLayout>
    );
}
