import { Form, Formik } from "formik"
import React from "react"
import { object, string } from "yup"
import Link from "../navigation/Link"
import { appRoutes } from "../navigation/NavigationStore"
import FormTextInput from "../ui/FormTextInput"

type FormValues = {
  name: string
  email: string
  password: string
}

let initialValues: FormValues = {
  name: "",
  email: "",
  password: "",
}

let validationSchema = object<FormValues>({
  name: string()
    .max(15)
    .required(),
  email: string()
    .email()
    .required(),
  password: string()
    .min(8)
    .required(),
})

function Signup() {
  const handleSubmit = (values: FormValues) => {
    console.log(values)
  }

  return (
    <>
      <h1>sign up</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <FormTextInput name="name" label="name" />
          <FormTextInput name="email" label="email" />
          <FormTextInput name="password" label="password" />
          <button type="submit">submit</button>
        </Form>
      </Formik>
      <Link to={appRoutes.home}>return to home</Link>
    </>
  )
}

export default Signup
