import React, { Component } from 'react';
import './App.css';
import Search from './Components/SearchBox/Search';
import Cards from './Components/Cards/Card';
import { requestGet, StoreData, updateData, getData } from '../src/utils/request';
import Navbar from './Components/Navbar/Navbar';
import PageHeader from './Components/PageHeader/PageHeader';
import Footer from './Components/Footer/Footer';
import BackTop from './Components/BackToTop/BackTop';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cardStatus: false,
    }

  }

  updateMovies = () => {
    const movieStr = localStorage.getItem('movies');
    const movies = JSON.parse(movieStr);
    setTimeout(() => {
      this.setState({ movies }, () => {
        console.log("movie update")
      })
    }, 1000)
  }

  componentDidMount() {
    let req = ['movie/top_rated'];
    // let getMovies = getData();
    if (localStorage.getItem("movies") === null) {
      console.log('moviesss')
      requestGet(req).then((res) => {
        setTimeout(() => {
          StoreData(res.results);
          this.setState({ movies: res.results })


        }, 1000)
      }).catch((err) => {
        console.log(err)
      });
    } else {
      this.updateMovies()
    }

  }


  updateStatus = (index, id) => {


    this.setState({
      movies: [
        ...this.state.movies.slice(0, index),
        Object.assign({}, this.state.movies[index], { watchStatus: !this.state.movies[index].watchStatus }),
        ...this.state.movies.slice(index + 1)
      ]
    }, () => {
      updateData(id)
    });
  }

  searchMovies = (e) => {
    console.log(e.target.value)
    const keyword = e.target.value;
    if (keyword === "") {
      this.updateMovies()
    } else {

    }
    const movies = this.state.movies.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.toLowerCase().includes(keyword)));
    this.setState({ movies })
  }

  filterMovies = (movies, selectedValue, data) => {
    return movies.filter(function (el) {
      let str = el[data];
      let checkMatch = str.match(selectedValue);
      let result = checkMatch === null ? false : true;
      return result;
    });
  }

  filterLangMovies = (movies, selectedValue, data) => {
    return movies.filter(function (el) {
      let str = el[data];
      if (selectedValue === 'en' && str === 'en') {
        return true;
      } else if (selectedValue === 'other' && str !== 'en') {
        return true;
      }
    });
  }

  getByDate = (date_moment, selectedDate) => {
    const getMovies = getData();
    let movies = this.filterMovies(getMovies, selectedDate, 'release_date');
    this.setState({ movies })
  }

  filterLang = (selectedLang) => {
    const getMovies = getData();
    let movies = this.filterLangMovies(getMovies, selectedLang.value, 'original_language');
    this.setState({ movies })
    console.log(movies);
  }
  readMoreButton = (movieId) => {
    console.log()
    let req = [`movie/${movieId}`];
    requestGet(req).then((res) => {
      console.log(res)
      if (res.imdb_id != null) {
        let IMDB_url = `https://www.imdb.com/title/${res.imdb_id}/`
        var win = window.open(IMDB_url, '_blank');
        win.focus();
      }else{
        alert("No movie")
      }

    }).catch((err) => {
      console.log(err)
    });

  }

  render() {
    return (
      <>
        <Navbar />
        <PageHeader />
        <section>
          <Search searchMovies={this.searchMovies} getByDate={this.getByDate} filterLang={this.filterLang} />
          {this.state.movies ? <Cards movies={this.state.movies} updateStatus={this.updateStatus} readMoreButton={this.readMoreButton} /> : "Loading.."}
          {/* <Cards /> */}
        </section>
        <Footer />
        <BackTop />
      </>
    )
  }
}

export default App;