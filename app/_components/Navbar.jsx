'use client'

import Link from 'next/link'
import React, { useContext } from 'react'
import { tokenContext } from '../../context/tokenContext';
import { useRouter } from 'next/navigation'

export default function Navbar() {
  let {token,setToken}= useContext(tokenContext)
  const router = useRouter()
  function logOut() {
   localStorage.removeItem('token')
   setToken(null)
  console.log(token);
  router.push('/login')
}
  return (
<header className="bg-white">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
      <div className="md:flex md:items-center md:gap-12">
      <Link className="text-slate-800 font-bold" href='/'  >NOXE</Link>

      </div>
{token?  <div className="hidden md:block">
        <nav aria-label="Global">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <Link className="text-gray-500 transition hover:text-gray-500/75" href="/movies"> Movies </Link>
            </li>

            <li>
              <Link className="text-gray-500 transition hover:text-gray-500/75" href="/tvShow"> Tv show </Link>
            </li>

            <li>
              <Link className="text-gray-500 transition hover:text-gray-500/75" href="/people"> People </Link>
            </li>

            <li>
              <a className="text-gray-500 transition hover:text-gray-500/75" onClick={logOut}> Logout </a>
            </li>

          </ul>
          
        </nav>
        
      </div>:
      <div className="flex items-center gap-4">
        <div className="sm:flex sm:gap-4">
          <Link
            className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
            href="/login"
          >
            Login
          </Link>

          <div className="hidden sm:flex">
            <Link
              className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
              href="/register"
            >
              Register
            </Link>
          </div>
        </div>

        <div className="block md:hidden">
          <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>}
    

    </div>
  </div>
</header>
  )
}
