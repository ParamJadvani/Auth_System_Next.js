"use client"
import { FormControl } from '@/components/ui/form';
import { IconInput } from '@/components/ui/icon-Input';
import { LucideIcon } from 'lucide-react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';


interface FieldConfig<T> {
    id: Path<T>;
    label: string;
    icon: LucideIcon;
    type: string;
    placeholder: string;
    required?: boolean;
}

export function InputGroup<T extends FieldValues>({ fields, register, classname = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" }: { fields: FieldConfig<T>[]; register: UseFormRegister<T>; classname?: string }) {
    return <div className={classname}>
        {fields.map((field) => (
            <FormControl key={field.id}>
                <IconInput
                    label={field.label}
                    id={field.id}
                    type={field.type}
                    icon={field.icon}
                    placeholder={field.placeholder}
                    {...register(field.id)}
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    aria-required={field.required ?? false}
                />
            </FormControl>
        ))}
    </div>
}

export default InputGroup;

/*
1). Type 'T' does not satisfy the constraint 'FieldValues'.ts(2344)
 input-grpup.tsx(17, 21): This type parameter might need an `extends FieldValues` constraint.
 (type parameter) T in <T>({ fields, register, classname }: {
     fields: FieldConfig<T>[];
     register: UseFormRegister<T>;
     classname: string;
 }): JSX.Element

2). input-grpup.tsx(7, 24):
 'T' is declared but its value is never read.ts(6133)
 'T' is defined but never used.eslint@typescript-eslint/no-unused-vars
 interface FieldConfig<T>

3). input-grpup.tsx(27, 34):
 Argument of type 'string' is not assignable to parameter of type 'Path<T>'.ts(2345)
 (parameter) field: FieldConfig<T>
*/