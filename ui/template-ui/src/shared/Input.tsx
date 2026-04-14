import React, {InputHTMLAttributes} from "react";
import Label from "@/components/Label";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    sizeClass?: string;
    fontClass?: string;
    rounded?: string;
    label?: string;
    labelClass?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className = "",
            sizeClass = "h-11 px-4 py-3",
            fontClass = "text-sm font-normal",
            rounded = "rounded-2xl",
            label,
            labelClass = "",
            ...props
        },
        ref
    ) => {
        return (
            <div className="space-y-2">
                {label && (
                    <Label className={labelClass}>
                        {label}
                    </Label>
                )}
                <input
                    ref={ref}
                    className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 ${rounded} ${fontClass} ${sizeClass} ${className}`}
                    {...props}
                />
            </div>
        );
    }
);

export default Input;
