import axios from 'axios';

const TOKEN_URL =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjEwNDgzZDQ3OGI0MTJiMzdjZjJiYmM1MDMxZThhYyIsInN1YiI6IjY1Zjg4YmUyMThiNzUxMDE2NWY2ZGYwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wCIuYb3z9PTeo91usjXbBEl505SMuYskveKlLjkHVQE';

// Trending movies  https://api.themoviedb.org/3/trending/movie/day?language=en-US

export const getTrendingMovies = async () => {
  const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
  const options = {
    headers: {
      Authorization: `Bearer ${TOKEN_URL}`,
    },
  };
  const response = await axios.get(url, options);
  return response.data.results;
};

// export const getMoviesSearch = async query => {
//   const options = (url, query) => {
//     return {
//       method: 'GET',
//       url: `https://api.themoviedb.org/${url}`,
//       params: { query: `${query}`, include_adult: 'false', language: 'en-US' },
//       headers: {
//         accept: 'application/json',
//         Authorization: `Bearer ${TOKEN_URL}`,
//       },
//     };
//   };
//   const data = await axios.request(options(`3/search/movie`, query));

//   return data;
// };
export const getMoviesSearch = async query => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

  const options = {
    headers: {
      Authorization: `Bearer ${TOKEN_URL}`,
    },
  };
  try {
    const data = await axios.get(url, options);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

// Movie details    https://api.themoviedb.org/3/movie/movie_id?language=en-US

export const getMoviesDetails = async (id, codeWord = '') => {
  const url = `https://api.themoviedb.org/3/movie/${id}${codeWord}?language=en-US`;

  const options = {
    headers: {
      Authorization: `Bearer ${TOKEN_URL}`,
    },
  };
  try {
    const { data } = await axios.get(url, options);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
