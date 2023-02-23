export const searchMovieTitle = (searchKeyWord: string) =>
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API}&page=1&query=${searchKeyWord}&language=ko-KR`
  ).then((res) => res.json());
