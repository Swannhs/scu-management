import {Controller, useFormContext} from "react-hook-form";
import React, {InputHTMLAttributes} from "react";
import Label from "@/components/Label";

interface RHFTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string | any;
    sizeClass?: string;
    fontClass?: string;
    rounded?: string;
    label?: string;
    labelClass?: string;
}

export default function RHFTextField({
                                         name,
                                         className = "",
                                         sizeClass = "h-11 px-4 py-3",
                                         fontClass = "text-sm font-normal",
                                         rounded = "rounded-2xl",
                                         label,
                                         labelClass = "font-medium",
                                         ...other
                                     }: RHFTextFieldProps) {
    const {control} = useFormContext();
    return (
        <Controller
            control={control}
            name={name}
            render={({field}) => (
                <>
                    {label && (
                        <Label className={labelClass}>
                            {label}
                        </Label>
                    )}
                    <input
                        {...field}
                        className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 ${rounded} ${fontClass} ${sizeClass} ${className}`}
                        {...other}
                    />
                </>
            )}
        />
    );
}
