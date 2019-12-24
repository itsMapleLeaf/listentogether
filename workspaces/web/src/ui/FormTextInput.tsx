import { useField } from "formik"
import React from "react"

type FormTextInputProps = React.ComponentPropsWithoutRef<"input"> & {
  label?: string
}

export default function FormTextInput({ label, ...props }: FormTextInputProps) {
  let [field, meta] = useField(props as any)
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <br />
      <input {...field} {...props} />
      <br />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </div>
  )
}
