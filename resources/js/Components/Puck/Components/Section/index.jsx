import './Section.css';
export const Section = ({
    children,
    className,
    padding = "0px",
    maxWidth = "1280px",
    style = {},
}) => {
    return (
        <div
            className={`Section first-line:${className ? ` ${className}` : ""}`}
            style={{
                ...style,
                paddingTop: padding,
                paddingBottom: padding,
            }}
        >
            <div className="Section-inner" style={{ maxWidth }}>
                {children}
            </div>
        </div>
    );
};
