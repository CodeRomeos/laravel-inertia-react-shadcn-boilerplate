import React from "react";
import ShadcnProvider from "./shadcn-provider";
import { Toaster } from "@/shadcn/ui/sonner";
import Header from "./header";
import Sidebar from "./sidebar";
import { usePage } from "@inertiajs/react";
import { toast } from "sonner";

export default function AuthenticatedLayout({ children }) {
    const { flash } = usePage().props;

    React.useEffect(() => {
        if (flash.message) {
            const options = {
                description: flash.description,
                position: "top-right",
            };
            if (flash.type === "success") {
                toast.success(flash.message, options);
            } else {
                toast.error(flash.message, options);
            }
        }
    }, [flash]);

    return (
        <ShadcnProvider>
            <Header />
            <div className="flex h-screen overflow-hidden">
                <Sidebar />
                <div className="w-full pt-12 tracking-tight bg-background">
                    {/* <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                      {flash.message && (
                          <Alert>
                              <AlertCircle className="h-4 w-4" />
                              <AlertTitle>Error</AlertTitle>
                              <AlertDescription>
                                  Your session has expired. Please log in again.
                              </AlertDescription>
                          </Alert>
                      )}
                  </div> */}
                    {children}
                </div>
            </div>
            <Toaster />
        </ShadcnProvider>
    );
}
