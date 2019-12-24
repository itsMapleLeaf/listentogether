import { Form, Formik } from "formik"
import React from "react"
import { object, string } from "yup"
import extractErrorMessage from "../common/extractErrorMessage"
import { useLoginMutation } from "../generated/graphql"
import { useRoutes } from "../navigation/routerContext"
import FormTextInput from "../ui/FormTextInput"

type Props = {
  onLoginSuccess: (token: string) => void
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

function Login(props: Props) {
  const [login, { loading, error }] = useLoginMutation()
  const routes = useRoutes()

  const handleSubmit = async (variables: FormValues) => {
    try {
      const result = await login({ variables })
      const token = result.data?.login.token
      if (token) props.onLoginSuccess(token)
    } catch (error) {
      console.error(error)
    }
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
          <fieldset disabled={loading}>
            <FormTextInput name="email" type="email" label="email" />
            <FormTextInput name="password" type="password" label="password" />
            <button type="submit">submit</button>
          </fieldset>
        </Form>
      </Formik>
      {error && <p>{extractErrorMessage(error)}</p>}
      <a {...routes.home.link()}>return to home</a>
    </>
  )
}

export default Login
