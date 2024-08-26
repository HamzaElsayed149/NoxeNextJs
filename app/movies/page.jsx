"use client";
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import ProtectedRoute from '../_components/ProtectedRoute';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    async function fetchMovies() {
      let response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=664ad047271160036661d41b18ad9034&page=${pageNum}`);
      response = await response.json();
      setMovies(response.results);
    }
    fetchMovies();
  }, [pageNum]);

  const pagenumbers = new Array(10).fill("").map((_, i) => i + 1);

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4">
        <div className=" mb-4 flex flex-wrap">
          <div className="w-full md:w-1/3">
            <div className="content pt-5 mb-5">
              <h1 className="relative text-3xl text-red-900">
                Trending Movies To Watch
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {movies.map((ele) => (
              <div key={ele.id}>
                <Link href={`/movies/${ele.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${ele.poster_path}`}
                    className="w-full"
                    alt={ele.title}
                  />
                  <h1>{ele.title}</h1>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="row flex flex-wrap justify-center">
      
          <nav className='bg-slate-600 mb-6' aria-label="  navigation example">
            <ul className="flex  w-96">
              {pagenumbers.map((el) => (
                <li
                  key={el}
                  className={`page-item w-80 cursor-pointer ${el === pageNum ? 'active' : ''}`}
                  onClick={() => setPageNum(el)}
                >
                  <a className="page-link">{el}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </ProtectedRoute>
  );
}
