import React, { useEffect } from "react";
import { Outlet, useLoaderData, useNavigation, useSubmit } from "react-router-dom";
import Header from "../components/Header.jsx";
import { getTokenDuration } from "../utils/storage.js";

export default function RootLayout() {
  const token = useLoaderData()
  const navigation = useNavigation()
  const submit = useSubmit()

  useEffect(()=>{
    if(!token){
      return
    }

    if(token === 'EXPIRED'){
      submit(null,{action:'/logout', method: 'post'})
      return
    }

    const tokenDuration = getTokenDuration()
    console.log(tokenDuration)

    setTimeout(()=>{
      submit(null,{action:'/logout', method: 'post'})
    },tokenDuration)
  },[token])

  const isLoading = navigation.state === 'loading'
  return (
    <>
      <Header />
      {isLoading && <p>Loading...</p>}
      <main>
        <Outlet />
      </main>
    </>
  );
}
