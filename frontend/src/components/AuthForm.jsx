import React from 'react'
import { Form, Link, useActionData, useNavigation, useSearchParams } from 'react-router-dom'

export default function AuthForm() {
    const [searchParams] = useSearchParams()
    const data = useActionData()
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'
    const isLogin = searchParams.get('mode') === 'login'
  return (
    <Form method='post'>
        <h1>{isLogin ? 'Login' : 'Create new user'}</h1>
        {data && data.message && <p>{data.message}</p>}
        <input type="email" name="email" required/>
        <input type="password" name="password" required/>
        <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>{isLogin ? 'Create new user' : 'Login'}</Link>
        <button disabled={isSubmitting}>{isSubmitting ?  "Submitting..." : "Submit" }</button>
    </Form>
  )
}
