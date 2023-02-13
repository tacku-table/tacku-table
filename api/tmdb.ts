const BASE_URL = "https://api.themoviedb.org/3/movie";
const API_KEY = "968fea3df66896d51a8ee0068c075085";
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=`;

export const searchMovieTitle = (searchKeyWord: string) =>
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&page=1&query=${searchKeyWord}&language=ko-KR`
  ).then((res) => res.json());
