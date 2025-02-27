import React from 'react'
import Newsletter from '../components/Newsletter.jsx'

export default function NewsletterPage() {
  return (
    <>
    <h1>Join our awesome letter</h1>
    <Newsletter/>
    </>
  )
}

export const action = async({request,params}) => {
    const data = await request.formData()
    const email = data.get('email')
    
    console.log('Sendiing email', email)
    return {message: "Signup successful"}
}
