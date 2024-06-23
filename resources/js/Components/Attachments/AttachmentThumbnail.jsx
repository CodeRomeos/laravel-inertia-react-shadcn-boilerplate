import { Download, File } from 'lucide-react';
import React from 'react'

export default function AttachmentThumbnail({ attachment }) {
    return (
        <a
            href={`/storage/${attachment.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border rounded-sm"
        >
            {/* <Download className="absolute z-10 right-0 top-3.5 h-4 w-4" /> */}

            <div className="space-y-3 w-full">
                <div className="overflow-hidden rounded-md bg-slate-100 text-center items-center flex h-32 relative">
                    {["jpg", "jpeg", "png", "webp", "gif", "tiff"].includes(
                        attachment.extension
                    ) ? (
                        <img
                            alt={attachment.name}
                            title={attachment.name}
                            loading="lazy"
                            decoding="async"
                            className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-[3/4]"
                            src={`/storage/${attachment.url}`}
                        />
                    ) : (
                        <File className="mx-auto" />
                    )}
                    <p className="text-xs text-white truncate p-2 !m-0 absolute bottom-0 left-0 w-full text-center bg-black/50">
                        {attachment.name}
                    </p>
                </div>
            </div>
        </a>
    );
}