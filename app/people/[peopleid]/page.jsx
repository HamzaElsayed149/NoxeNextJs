"use client"
import ProtectedRoute from '@/app/_components/ProtectedRoute'
import React from 'react'

export default async function page({params}) {
  
  let id = params.peopleid
  async function getdetails() {
    let response = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=664ad047271160036661d41b18ad9034&language=en-US`)
    response= await response.json()
    
    return response
  }
  let details = await getdetails()
  console.log(details);

  return (
       <ProtectedRoute>


<div class="container mx-auto py-5 grid grid-cols-12 gap-4">
  <div class="col-span-12 md:col-span-4">
    <img src={"https://image.tmdb.org/t/p/w500" + details?.profile_path}class="w-full rounded-lg mb-4" alt="Image 1" />
  </div>

  <div class="col-span-12 md:col-span-8">
    <h1 class="text-2xl font-bold text-red-800 mb-4">{details?.name}</h1>
    <p class="text-lg">birthday: {details?.birthday}</p>
    {details?.gender =='1'?     <p class="text-lg">Female</p>:    <p class="text-lg">Male</p>}
<p>{details.biography}</p>

  </div>
</div>
</ProtectedRoute>

  )
}
