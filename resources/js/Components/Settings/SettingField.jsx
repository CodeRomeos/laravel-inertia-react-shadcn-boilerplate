import { Input } from "@/shadcn/ui/input";
import { Textarea } from "@/shadcn/ui/textarea";
import React from "react";

const ImageThumbnail = ({ src }) => {
    return (
        <div className="w-32 h-32 rounded-lg overflow-hidden">
            <img
                className="w-full h-full object-cover"
                src={src}
                alt="Thumbnail"
            />
        </div>
    );
};

const SettingFieldType = ({ type, onChange, ...props }) => {
    const [imgSrc, imgSrcSet] = React.useState(null);
    const value = props.value;

    if (!type) return null;
    switch (type) {
        case "text":
            return (
                <Input
                    type="text"
                    onChange={(e) => onChange(e.target.value)}
                    {...props}
                />
            );
        case "email":
            return (
                <Input
                    type="email"
                    onChange={(e) => onChange(e.target.value)}
                    {...props}
                />
            );
        case "textarea":
            return (
                <Textarea
                    onChange={(e) => onChange(e.target.value)}
                    {...props}
                />
            );
        case "file":
            delete props.value;
            return (
                <div className="space-y-2">
                    <Input
                        type="file"
                        onChange={(e) => onChange(e.target.files[0])}
                        {...props}
                    />
                </div>
            );
        case "image":
            delete props.value;
            return (
                <div className="space-y-2">
                    <Input
                        type="file"
                        onChange={(e) => {
                            onChange(e.target.files[0]);
                            imgSrcSet(URL.createObjectURL(e.target.files[0]));
                        }}
                        {...props}
                    />
                    {value && !imgSrc && (
                        <ImageThumbnail src={`${value}`} />
                    )}
                    {imgSrc && <ImageThumbnail src={imgSrc} />}
                </div>
            );
        default:
            return null;
    }
};

export default function SettingField({ setting, value, options, onChange }) {
    const { type } = setting;

    return (
        <div>
            <div className="flex gap-2 items-center justify-between mb-2">
                <label
                    className="block font-medium leading-6"
                    htmlFor={setting.key}
                >
                    {setting.name}
                </label>
                {setting.description && (
                    <p className="text-xs text-muted-foreground">
                        {setting.description}
                    </p>
                )}
            </div>
            <SettingFieldType
                type={type}
                name={setting.name}
                id={setting.key}
                value={value}
                onChange={onChange}
                options={options}
            />
        </div>
    );
}
