import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface StringFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  registration: UseFormRegisterReturn;
}

export function StringField({
  id,
  label,
  registration,
  ...props
}: StringFieldProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>

      <input id={id} {...props} {...registration} />
    </div>
  );
}
