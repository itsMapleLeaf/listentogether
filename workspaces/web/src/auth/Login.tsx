import { Form, Formik } from "formik"
import { observer } from "mobx-react-lite"
import React from "react"
import { object, string } from "yup"
import extractErrorMessage from "../common/extractErrorMessage"
import Link from "../navigation/Link"
import { appRoutes } from "../navigation/NavigationStore"
import FormTextInput from "../ui/FormTextInput"
import { AuthStore } from "./AuthStore"

type Props = {
  auth: AuthStore
}

type FormValues = {
  email: string
  password: string
}

const initialValues: FormValues = {
  email: "",
  password: "",
}

const validationSchema = object<FormValues>({
  email: string()
    .email()
    .required(),
  password: string().required(),
})

function Login({ auth }: Props) {
  const handleSubmit = (variables: FormValues) => {
    auth.login(variables)
  }

  return (
    <>
      <h1>log in</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <fieldset disabled={auth.loginState.type === "loading"}>
            <FormTextInput name="email" type="email" label="email" />
            <FormTextInput name="password" type="password" label="password" />
            <button type="submit">submit</button>
          </fieldset>
        </Form>
      </Formik>
      {auth.loginState.type === "error" && (
        <p>{extractErrorMessage(auth.loginState.error)}</p>
      )}
      <Link to={appRoutes.home}>return to home</Link>
    </>
  )
}

export default observer(Login)
