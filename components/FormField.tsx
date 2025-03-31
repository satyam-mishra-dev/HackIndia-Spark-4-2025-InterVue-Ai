import React, { FC } from "react";
import { Controller, Control, Path } from "react-hook-form";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues } from "react-hook-form";
interface FormFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: 'text' | 'email' | 'password' | 'file';
    description?: string;
}

const FormField: FC<FormFieldProps<T>> = ({ control, name, label, placeholder, description, type = "text" }) => {
    return (
        <Controller name={name} control={control} render={({ field }) => (
            <FormItem>
                <FormLabel className="label">{label}</FormLabel>
                <FormControl>
                    <Input className="input text-slate-400" placeholder={placeholder} {...field} />
                </FormControl>
                <FormDescription>
                    {description}
                </FormDescription>
                <FormMessage />
            </FormItem>
        )}
        />
    );
}

export default FormField;