import AttachmentThumbnail from "./AttachmentThumbnail";

export default function AttachmentGrid({attachments}) {
    return (
        <div className="max-h-96 overflow-y-auto">
            {attachments.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    {attachments.map((attachment, index) => (
                        <AttachmentThumbnail
                            attachment={attachment}
                            key={attachment.id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}