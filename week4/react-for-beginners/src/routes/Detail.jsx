import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const [movie, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovies(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <img src={movie.medium_cover_image} alt={movie.title} />
          <h1>{movie.title}</h1>
          <p>{movie.description_full}</p>
          <p>Rating: {movie.rating}</p>
          <p>Runtime: {movie.runtime} minutes</p>
          <ul>
            {movie.genres?.map((genre) => (
              <li key={genre}>{genre}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Detail;
