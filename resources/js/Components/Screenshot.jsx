import React from "react";
import html2canvas from "html2canvas";
import { Button } from "@/shadcn/ui/button";
import { formatDate } from "date-fns";
import { Camera, CheckCircle, Copy } from "lucide-react";
import Can from "./Can";

function ScreenshotComponent({
    children,
    data,
    screenshotName = "_screenshot",
}) {
    const ToCaptureRef = React.useRef();
    const [copiedSuccess, copiedSuccessSet] = React.useState(false);
    const [toastMsg, setToastMsg] = React.useState("");

    const captureScreenshot = (e) => {
        e.preventDefault();
        html2canvas(ToCaptureRef.current, { useCORS: true }).then((canvas) => {
            var dataURL = canvas.toDataURL("image/png");
            var a = document.createElement("a");
            a.href = dataURL;
            a.download =
                formatDate(new Date(), "yyyyMMdd") + "_" + screenshotName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    };

    const copyText = (e) => {
        e.preventDefault();
        const textToCopy = ToCaptureRef.current.innerText;
        navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
                copiedSuccessSet(true);
                setToastMsg("Text copied to clipboard");
            })
            .catch((err) => {
                copiedSuccessSet(false);
                setToastMsg("Error copying text: ", err);
            });
    };

    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            copiedSuccessSet(false);
        }, 1500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [copiedSuccess]);

    return (
        <>
            <div ref={ToCaptureRef}>
                {children}
                <small className="hidden">
                    Captured at: {formatDate(new Date(), "yyyyMMdd  HH:mm:ss")}
                </small>
            </div>
            {children !== undefined && (
                <div className="flex gap-x-4 justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={captureScreenshot}
                    >
                        <Camera size={16} className="mr-2 h-4 w-4" /> Capture
                        Screenshot
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        className={`${
                            copiedSuccess ? "bg-green-500 text-white" : ""
                        } `}
                        // onClick={() => navigator.clipboard.writeText(data)}
                        onClick={copyText}
                    >
                        {copiedSuccess ? (
                            <>
                                <CheckCircle
                                    size={16}
                                    className="mr-2 h-4 w-4"
                                />
                                Done
                            </>
                        ) : (
                            <>
                                <Copy size={16} className="mr-2 h-4 w-4" />
                                Copy
                            </>
                        )}
                    </Button>
                </div>
            )}
        </>
    );
}

export default function Screenshot({
    children,
    data,
    screenshotName = "_screenshot",
    moduleName,
}) {
    if(!moduleName)
        return <div className="text-red-500">Module name not specified</div>;

    return <Can permit={`screenshot & copy ${moduleName}`} fallback={children}>
        <ScreenshotComponent data={data} screenshotName={screenshotName}>
            {children}
        </ScreenshotComponent>
    </Can>
}
