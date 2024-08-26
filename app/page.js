import Link from "next/link";

export default async function Home() {
  
  async function gettrindingmovies() {
    let response = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=664ad047271160036661d41b18ad9034')
    response= await response.json()

    return response.results
  }
  async function gettrindingtv() {
    let response = await fetch('https://api.themoviedb.org/3/trending/tv/day?api_key=664ad047271160036661d41b18ad9034')
    response= await response.json()

    return response.results
  }
  let movies = await gettrindingmovies()
  let tvshows = await gettrindingtv()
  
  return (
<div className="container mx-auto px-4">
  <div className="row mb-4 flex flex-wrap">
    <div className="col-md-4 w-full md:w-1/3">
      <div className="content pt-5 mb-5">
        <h1 className="relative text-3xl text-red-900">
          Trinding  Movies  To watch
        </h1>
      </div>
    </div>
    <div className=" grid grid-cols-4  gap-4">
      {movies.map((ele) => (
        <div className=" ">
              <Link href={'/movies/'+ele.id}>

          <img src={"https://image.tmdb.org/t/p/w500" + ele.poster_path} className="w-full" alt="" />
          <h1>{ele.name} </h1>
          </Link>
        </div>

      ))}
      
    </div>
  </div>
  <div className="row mb-4 flex flex-wrap">
    <div className="col-md-4 w-full md:w-1/3">
      <div className="content pt-5 mb-5">
        <h1 className="relative text-3xl text-red-900">
          Trinding  tv  To watch
        </h1>
      </div>
    </div>
    <div className=" grid grid-cols-4  gap-4">
      {tvshows.map((ele) => (
        <div className=" ">
              <Link href={'/tvShow/'+ele.id}>

          <img src={"https://image.tmdb.org/t/p/w500" + ele.poster_path} className="w-full" alt="" />
          </Link>
        </div>

      ))}
      
    </div>
  </div>
</div>

  );
}
