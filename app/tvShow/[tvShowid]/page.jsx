import ProtectedRoute from '@/app/_components/ProtectedRoute'
import Link from 'next/link'
import React from 'react'

export default async function page({params}) {
  let id = params.tvShowid
  async function getdetails() {
    let response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=664ad047271160036661d41b18ad9034&language=en-US`)
    response= await response.json()
    return response
  }
  async function getactors() {
    let response = await fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=664ad047271160036661d41b18ad9034&language=en-US`)
    response= await response.json()
    
    return response.cast
  }


  let details = await getdetails()
let actors = await getactors()
  console.log(details);
  console.log(actors);

  return (
    <ProtectedRoute>
<div className="container mx-auto py-5">
  <div className="flex flex-wrap">
    <div className="w-full md:w-1/4">
      <img
        src={"https://image.tmdb.org/t/p/w500" + details?.poster_path}
        className="w-full rounded-lg"
        alt=""
      />
      <img
        src={"https://image.tmdb.org/t/p/w500" + details?.profile_path}
        className="w-full rounded-lg mt-4"
        alt=""
      />
    </div>
    <div className="w-full md:w-3/4 pt-1">
      <h1 className="text-2xl font-bold text-red-800">
        {details?.original_title} {details?.name}
      </h1>
      <p className="text-lg">{details?.tagline}</p>
      <ul className="flex flex-wrap">
        {details?.genres?.map((genre, index) => (
          <li
            key={index}
            className="p-2  bg-red-600 rounded-lg mx-2 mb-2"
          >
            {genre.name}
          </li>
        ))}
      </ul>
      {details?.vote_average && (
        <p className="text-lg  text-yellow-500">
          Vote: {details?.vote_average}{" "}
          <i class="fa-solid fa-star"></i>        </p>
      )}
      {details?.release_date && <p>Release date: {details?.release_date}</p>}
      {details?.first_air_date && (
        <p>Release date: {details?.first_air_date}</p>
      )}
      {details?.number_of_seasons && (
        <p>Number of seasons: {details?.number_of_seasons}</p>
      )}
      {details?.birthday && <p>Birthday: {details?.birthday}</p>}
      {details?.deathday && <p>Death day: {details?.deathday}</p>}
      {details?.place_of_birth && (
        <p className="pt-2">Place of birth: {details?.place_of_birth}</p>
      )}
      <ul className="flex flex-wrap pt-2">
        {details.also_known_as && <p className="pt-2">Also known as:</p>}
        {details?.also_known_as?.slice(0, 2).map((mov, index) => (
          <li key={index} className="p-2 bg-gray-200 rounded-lg mx-2 mb-2">
            {mov}
          </li>
        ))}
      </ul>
      <p>{details?.biography?.slice(0, 700)}</p>
      <p className="text-xl">{details?.overview}</p>
      {!details?.profile_path && <p>Actors:</p>}
      <div className="flex flex-wrap">
        {actors?.slice(0, 4).map((actor) => (
          <div key={actor.id} className="w-1/2 md:w-1/4 p-2">
            <Link href={`/people/` + actor.id}>
              <img
                src={"https://image.tmdb.org/t/p/w500" + actor?.profile_path}
                className="w-full rounded-lg mb-2"
                alt=""
              />
            </Link>
            <h4 className="text-sm">{actor?.name}</h4>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

    </ProtectedRoute>
  )
}
