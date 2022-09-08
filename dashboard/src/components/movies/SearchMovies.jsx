import MovieCard from "./MovieCard";
import React, { useEffect, useRef, useState } from "react";

function SearchMovies() {
  const movies = [
    {
      Id: 55,
      Title: "Parchís",
      Year: "1983",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BYTgxNjg2MTAtYjhmYS00NjQwLTk1YTMtNmZmOTMyNTAwZWUwXkEyXkFqcGdeQXVyMTY5MDE5NA@@._V1_SX300.jpg",
    },
    {
      Id: 9583,
      Title: "Brigada en acción",
      Year: "1977",
      Poster: "N/A",
    },
  ];

  const keyword = "Avatar";

  const [pelis, setPelis] = useState([]);

  useEffect(() => {
    console.log("se monto el effect");
    fetch(`http://www.omdbapi.com/?s=action&apikey=b92627cb`)
      .then((response) => response.json())
      .then((data) => {
        setPelis(data.Search);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {}, [pelis]);

  useEffect(() => {
    return () => console.log("se desmonto el componente");
  }, []);

  const userQuery = useRef();

  return (
    <div className="container-fluid">
      <div className="row my-4">
        <div className="col-12 col-md-6">
          {/* Buscador */}
          <form method="GET">
            <div className="form-group">
              <label htmlFor="">Buscar por título:</label>
              <input ref={userQuery} type="text" className="form-control" />
            </div>
            <button className="btn btn-info">Search</button>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h2>Películas para la búsqueda: {keyword}</h2>
        </div>
        {pelis.map((movie) => {
          return <MovieCard movie={movie} key={movie.Id} />;
        })}
      </div>
      {movies.length === 0 && (
        <div className="alert alert-warning text-center">
          No se encontraron películas
        </div>
      )}
    </div>
  );
}

export default SearchMovies;
