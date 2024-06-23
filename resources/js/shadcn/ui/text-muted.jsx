export function TextMuted({ children, className = "" }) {
    return (
        <span className={`text-sm text-muted-foreground ` + className}>
            {children}
        </span>
    );
}
export function TextLarge({ children, className = "" }) {
    return (
        <div className={`text-lg font-semibold ` + className}>{children}</div>
    );
}
