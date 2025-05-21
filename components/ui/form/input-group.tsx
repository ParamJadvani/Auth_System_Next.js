"use client"
import { FormControl } from '@/components/ui/form';
import { IconInput } from '@/components/ui/icon-Input';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';


interface FieldConfig<T> {
    id: Path<T>;
    label: string;
    type: string;
    placeholder: string;
    required?: boolean;
}

export function InputGroup<T extends FieldValues>({ fields, register }: { fields: FieldConfig<T>[]; register: UseFormRegister<T> }) {
    return fields.map((field) => (
        <FormControl key={field.id} className='w-full'>
            <IconInput
                label={field.label}
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                {...register(field.id)}
                aria-required={field.required ?? false}
            />
        </FormControl>
    ))
}

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