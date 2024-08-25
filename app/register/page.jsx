'use client'
import React, { useState } from 'react'
import { Formik, useFormik  } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'

import axios from 'axios';
export default function Register() {
  
const [Isloading,setisloading]=useState(false)
let [apiError,setapiError]=useState("")
const router = useRouter()
async function register(values) {
  setisloading(true);
  setapiError(" ");
 let {data}=  await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).catch((err)=>{
  setisloading(false)
  setapiError(err.response.data.message)
 }

 )

 if(data.message =="success"){
    console.log(data.message);
    router.push('/login')
  setisloading(false);

}
}
  let validationSchema= Yup.object({
    name: Yup.string().min(3,"Name should more than 2 ").max(15,"Name should less than 15 ").required('Required'),
    email: Yup.string().email('email not valid').required('Required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,8}$/,"password should start with Capital").required('Required') ,
    rePassword: Yup.string().oneOf([Yup.ref('password')],"RePassword should match Password").required('Required'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/,"Phone is invalid").required('Required')
  })
  let formik =useFormik({
    initialValues:{  
        name: "",
        email:"",
        password:"",
        rePassword:"",
        phone:""
    },
    validationSchema:validationSchema,
    onSubmit:(values)=>register(values)
  })
  return (
<>


<section className=" ">
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12 ">
    <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </aside>

    <main
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
      <div className="max-w-xl lg:max-w-3xl">
    

        <h1 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Welcome to Noxe 🦑
        </h1>
        {apiError ? (
    <div className="validation text-red-600 font-bold mb-1">
      {apiError}
    </div>
  ) : (
    ''
  )}
      

        <form onSubmit={formik.handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="Name" className="block text-sm font-mediumtext-white">
               Name
            </label>

            <input
              type="text"
              id="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-stone-800 shadow-sm"
            />
                <div className="validation text-red-600">
      {formik.errors.name}
    </div>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="Phone" className="block text-sm font-medium text-white">
              Phone
            </label>

            <input
              type="tel"
           id="phone"
      name="phone"
      onChange={formik.handleChange}
      value={formik.values.phone}

              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-stone-800 shadow-sm"
            />
                <div className="validation text-red-600">
      {formik.errors.phone}
    </div>
          </div>

          <div className="col-span-6">
            <label htmlFor="email" className="block text-sm font-medium text-white"> Email </label>

            <input
              type="email"
             id="email"
      name="email"
      onChange={formik.handleChange}

              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-stone-800 shadow-sm"
            />
                    <div className="validation text-red-600">
      {formik.errors.email}
    </div>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="password" className="block text-sm font-medium text-white"> Password </label>

            <input
              type="password"
  id="password"
      name="password"
      value={formik.values.password}
      onChange={formik.handleChange}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-stone-800 shadow-sm"
            />
                          <div className="validation text-red-600">
      {formik.errors.password}
    </div>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="rePassword" className="block text-sm font-medium text-white">
              Password Confirmation
            </label>

            <input
              type="Password"
          id="rePassword"
      name="rePassword"
      value={formik.values.rePassword}
      onChange={formik.handleChange}

              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-stone-800 shadow-sm"
            />
                              <div className="validation text-red-600">
      {formik.errors.rePassword}
    </div>
          </div>


          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
             disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
            >
              Create an account
            </button>

            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              Already have an account?
              <a href="/login" className="text-gray-700 underline">Log in</a>.
            </p>
          </div>
        </form>
      </div>
    </main>
  </div>
</section>

</>  )
}
