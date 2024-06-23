import "../../css/shadcn.css";
import { ThemeProvider } from "../Components/ThemeToggle/theme-provider";

export default function ShadcnProvider({ children }) {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            {children}
        </ThemeProvider>
    );
}
