import React from "react";
import { Controller, FieldValues, useForm,Control,Path } from "react-hook-form";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
interface FormFieldProps<T extends FieldValues> {
    control: Control<T>;
    name:Path<T>;
    label :string;
    placeholder?:string;
    type?:'text'|'email'|'password'|'file';
    description?:string;
}
const FormField = ({control,name,label,placeholder,description,type="text"}:FormFieldProps<T>) => {
    return (
        <Controller name={name} control ={control} render={({ field }) => (
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