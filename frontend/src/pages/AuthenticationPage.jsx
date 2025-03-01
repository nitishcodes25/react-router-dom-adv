import React from 'react'
import AuthForm from '../components/AuthForm.jsx'
import { redirect } from 'react-router-dom'

export default function AuthenticationPage() {
  return (
    <>
        <AuthForm/>
    </>
  )
}

export const action = async({request})=>{
    const searchParmas = new URL(request.url).searchParams
    let mode = searchParmas.get('mode') || 'signup'

    if(mode !== 'login' && mode !== 'signup'){
        mode = 'signup'
    }
    const data = await request.formData()

    const authData = {
        email: data.get('email'),
        password: data.get('password')
    }

    const res = await fetch(`http://localhost:3000/auth/${mode}`,{
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(authData)
    })
    
    if(res.status === 422 || res.status === 401 || res.status === 404 || res.status === 409){
        return res
    }

    if(!res.ok){
        throw new Response(JSON.stringify({message: "Could not authenticate user!"}),{status: 500})
    }

    const response = await res.json()
    localStorage.setItem("token",response.token)
    const expiration = new Date()
    expiration.setHours(expiration.getHours() + 1)
    localStorage.setItem("expiration",expiration.toISOString())
    
    return redirect('/')
}