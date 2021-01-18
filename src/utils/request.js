import { toast } from 'react-toastify';
const axios = require('axios');
export const basePath = `https://api.themoviedb.org/3/`;
export const imageBasePath = `https://image.tmdb.org/t/p/w500`;

export function requestGet(data) {
  return axios
    .get(`${basePath + data[0]}`, {
      params: {
        api_key: '1e448e0dfcdbb565f5d329820065b4d2'
      }
    })
    .then(response => response.data)
    .catch(error => error.response.data)
    .finally(() => {
      // always executed
    });
}

export function StoreData(data) {
  // eslint-disable-next-line no-restricted-syntax
  let tem_arr = [];
  data.forEach((element, index) => {
    element.watchStatus = false;
    tem_arr.push(element)
    if (data.length === index + 1) {
      let movieStr = JSON.stringify(tem_arr);
      localStorage.setItem('movies', movieStr);
    }
  });

}

export function updateData(id) {
  let movies = getData();

  movies.forEach((data, index) => {
    if (data.id === id) {
      movies[index].watchStatus = true;
    }
    if (index === movies.length - 1) {
      let movieStr = JSON.stringify(movies);

      localStorage.setItem('movies', movieStr);
    }
  });
}

export function getData() {
  const movieStr = localStorage.getItem('movies');
  const getMovies = JSON.parse(movieStr);
  return getMovies;
}

export function successMsg(content) {
  return toast.success(content, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
  });
}
