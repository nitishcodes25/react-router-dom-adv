import React, { useEffect } from 'react'
import { useFetcher } from 'react-router-dom'

export default function Newsletter() {
  const fetcher = useFetcher()
  const {data, state}= fetcher

  useEffect(()=>{
    if(state === 'idle' && data && data.message){
      window.alert(data.message)
    }
  },[data,state])
  return (
    <fetcher.Form method='post' action="/newsletter">
        <input type="email" name="email" required />
        <button>Sign up</button>
    </fetcher.Form>
  )
}
