import { ButtonHTMLAttributes, FC } from "react";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: "primary" | "secondary" | "danger";
}

const Button: FC<CustomButtonProps> = ({ variant, className = "", disabled, children, ...props }) => {
    const baseClasses = "inline-flex items-center rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-widest transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-25 ";

    const variantClasses = {
        primary:
            "border border-transparent bg-gray-800 text-white hover:bg-gray-700 focus:bg-gray-700 focus:ring-indigo-500 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300",
        secondary: "border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-indigo-500 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800",
        danger: "border border-transparent bg-red-600 text-white hover:bg-red-500 focus:ring-red-500 active:bg-red-700 dark:focus:ring-offset-gray-800",
    };

    return (
        <button {...props} className={`${baseClasses} ${variantClasses[variant]} ${disabled && "opacity-25"} ${className}`} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;
