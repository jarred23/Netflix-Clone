/*----------------------------------------------------------------
---------------------API Connection----------------------------
------------------------------------------------------------------*/

// api key  from TMDB
const api = "api_key=0f55fe2a694492b1ce3e112be30c78aa";
// base url of the site
const base_url = "https://api.themoviedb.org/3";
// url
const final_url = base_url + "/discover/movie?sort_by=popularity.desc&" + api;
// img url
const img_url = "https://image.tmdb.org/t/p/original";

// requests for movies data

const requests = {
  //---------------Home Page----------------//

  fetchPopular: `${base_url}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&${api}`,
  fetchTrending: `${base_url}/trending/all/week?${api}&language=en-US`,
  fetchNetflixOrignals: `${base_url}/discover/tv?${api}&with_networks=213`,
  fetchActionMovies: `${base_url}/discover/movie?${api}&with_genres=28`,
  fetchComedyMovies: `${base_url}/discover/movie?${api}&with_genres=35`,
  fetchHorrorMovies: `${base_url}/discover/movie?${api}&with_genres=27`,
  fetchRomanceMovies: `${base_url}/discover/movie?${api}&with_genres=10749`,
  fetchDocumentaries: `${base_url}/discover/movie?${api}&with_genres=99`,

  //---------------Movies----------------//

  fetchPopularMovies: `${base_url}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc& ${api}`,
  fetchTrendingMovies: `${base_url}/trending/movie/week?${api}&language=en-US`,
  fetchNetflixOrignalsMovies: `${base_url}/discover/movie?${api}&with_networks=213`,
  fetchActionMoviesMovies: `${base_url}/discover/movie?${api}&with_genres=28`,
  fetchComedyMoviesMovies: `${base_url}/discover/movie?${api}&with_genres=35`,
  fetchHorrorMoviesMovies: `${base_url}/discover/movie?${api}&with_genres=27`,
  fetchRomanceMoviesMovies: `${base_url}/discover/movie?${api}&with_genres=10749`,
  fetchDocumentariesMovies: `${base_url}/discover/movie?${api}&with_genres=99`,

  //------------New & Popular-------------//
  fetchPopularMoviesNew: `${base_url}/movie/popular?${api}&language=en-US&page=1&region=US`,
  fetchPopularTvNew: `${base_url}/discover/tv?include_adult=false&include_null_first_air_dates=false&${api}&language=en-US&page=1&sort_by=popularity.desc`,
  fetchUpcommingMovies: `${base_url}/movie/upcoming?${api}&language=en-US&page=1&region=US`,
  fetchUpcommingMovies2: `${base_url}/movie/upcoming?${api}&language=en-US&page=1&region=US`,
  fetchTopRatedTv: `${base_url}/tv/top_rated?${api}&language=en-US&page=1`,
  //---------------Tv Shows----------------//
  fetchTrendingTvTodayBan: `${base_url}/trending/tv/day?${api}&language=en-US`,
  fetchTrendingTvToday: `${base_url}/trending/tv/day?${api}&language=en-US`,
  fetchTrendingTvWeek: `${base_url}/trending/tv/day?${api}&language=en-US`,
  fetchPopularTvShows: `${base_url}/tv/popular?${api}&language=en-US`,
  fetchTopRatedTVShows: `${base_url}/tv/top_rated?${api}&language=en-US&page=1`,
  //---------------My List----------------//
};

/*----------------------------------------------------------------
---------------------Universal Function----------------------------
------------------------------------------------------------------*/

function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

/*----------------------------------------------------------------
-----------------------------Home Page----------------------------
------------------------------------------------------------------*/

// banner
fetch(requests.fetchNetflixOrignals)
  .then((res) => res.json())
  .then((data) => {
    console.log(data.results);
    // every refresh the movie will be change
    const setMovie =
      data.results[Math.floor(Math.random() * data.results.length - 1)];
    console.log(setMovie);
    var banner = document.getElementById("banner");
    var banner_title = document.getElementById("banner__title");
    var banner__desc = document.getElementById("banner__description");
    banner.style.backgroundImage =
      "url(" + img_url + setMovie.backdrop_path + ")";
    banner__desc.innerText = truncate(setMovie.overview, 150);
    banner_title.innerText = setMovie.name;
  });

// top rated
fetch(requests.fetchTrending)
  .then((res) => res.json())
  .then((data) => {
    const headrow = document.getElementById("headrow");
    const row = document.createElement("div");
    row.className = "row";
    headrow.appendChild(row);
    const title = document.createElement("h2");
    title.className = "row__title";
    title.innerText = "Top Movies in South Africa Today";
    row.appendChild(title);
    const row_posters = document.createElement("div");
    row_posters.className = "row__posters";
    row.appendChild(row_posters);
    data.results.forEach((movie) => {
      console.log(movie);
      const poster = document.createElement("img");
      poster.className = "row__posterLarge";
      var s2 = movie.id;
      poster.id = s2;
      poster.src = img_url + movie.poster_path;
      row_posters.appendChild(poster);
      

      poster.addEventListener("click", () => {
        window.location.href = `movie-details.php?id=${movie.id}`;
      });
    });
  });

// movies rows
fetch(requests.fetchNetflixOrignals)
  .then((res) => res.json())
  .then((data) => {
    const headrow = document.getElementById("headrow");
    const row = document.createElement("div");
    row.className = "row";
    row.classList.add("netflixrow");
    headrow.appendChild(row);
    const title = document.createElement("h2");
    title.className = "row__title";
    title.innerText = "NETFLIX ORIGINALS";
    row.appendChild(title);
    const row_posters = document.createElement("div");
    row_posters.className = "row__posters";
    row.appendChild(row_posters);
    data.results.forEach((movie) => {
      const poster = document.createElement("img");
      poster.className = "row__posterLarge";
      var s = movie.name.replace(/\s+/g, "");
      poster.id = s;
      poster.src = img_url + movie.poster_path;
      row_posters.appendChild(poster);

      poster.addEventListener("click", () => {
        window.location.href = `movie-details.php?id=${movie.id}`;
      });
    });
  });

// Trending
fetch(requests.fetchPopular)
  .then((res) => res.json())
  .then((data) => {
    const headrow = document.getElementById("headrow");
    const row = document.createElement("div");
    row.className = "row";
    row.classList.add("popularrow");
    headrow.appendChild(row);
    const title = document.createElement("h2");
    title.className = "row__title";
    title.innerText = "Trending Now";
    row.appendChild(title);
    const row_posters = document.createElement("div");
    row_posters.className = "row__posters";
    row.appendChild(row_posters);
    data.results.forEach((movie) => {
      const poster = document.createElement("img");
      poster.className = "row__posterLarge";
      var s2 = movie.id;
      poster.id = s2;
      poster.src = img_url + movie.poster_path;
      row_posters.appendChild(poster);

      poster.addEventListener("click", () => {
        window.location.href = `movie-details.php?id=${movie.id}`;
      });
    });
  });

// Action
fetch(requests.fetchActionMovies)
  .then((res) => res.json())
  .then((data) => {
    const headrow = document.getElementById("headrow");
    const row = document.createElement("div");
    row.className = "row";
    headrow.appendChild(row);
    const title = document.createElement("h2");
    title.className = "row__title";
    title.innerText = "Action Movies";
    row.appendChild(title);
    const row_posters = document.createElement("div");
    row_posters.className = "row__posters";
    row.appendChild(row_posters);
    data.results.forEach((movie) => {
      console.log(movie);
      const poster = document.createElement("img");
      poster.className = "row__poster";
      var s2 = movie.id;
      poster.id = s2;
      poster.src = img_url + movie.backdrop_path;
      row_posters.appendChild(poster);

      poster.addEventListener("click", () => {
        window.location.href = `movie-details.php?id=${movie.id}`;
      });
    });
  });
// Comedy
fetch(requests.fetchComedyMovies)
  .then((res) => res.json())
  .then((data) => {
    const headrow = document.getElementById("headrow");
    const row = document.createElement("div");
    row.className = "row";
    headrow.appendChild(row);
    const title = document.createElement("h2");
    title.className = "row__title";
    title.innerText = "Comedy Movies";
    row.appendChild(title);
    const row_posters = document.createElement("div");
    row_posters.className = "row__posters";
    row.appendChild(row_posters);
    data.results.forEach((movie) => {
      console.log(movie);
      const poster = document.createElement("img");
      poster.className = "row__poster";
      var s2 = movie.id;
      poster.id = s2;
      poster.src = img_url + movie.backdrop_path;
      row_posters.appendChild(poster);

      poster.addEventListener("click", () => {
        window.location.href = `movie-details.php?id=${movie.id}`;
      });
    });
  });
// Horror
fetch(requests.fetchHorrorMovies)
  .then((res) => res.json())
  .then((data) => {
    const headrow = document.getElementById("headrow");
    const row = document.createElement("div");
    row.className = "row";
    headrow.appendChild(row);
    const title = document.createElement("h2");
    title.className = "row__title";
    title.innerText = "Horror Movies";
    row.appendChild(title);
    const row_posters = document.createElement("div");
    row_posters.className = "row__posters";
    row.appendChild(row_posters);
    data.results.forEach((movie) => {
      console.log(movie);
      const poster = document.createElement("img");
      poster.className = "row__poster";
      var s2 = movie.id;
      poster.id = s2;
      poster.src = img_url + movie.backdrop_path;
      row_posters.appendChild(poster);

      poster.addEventListener("click", () => {
        window.location.href = `movie-details.php?id=${movie.id}`;
      });
    });
  });
// Romance
fetch(requests.fetchRomanceMovies)
  .then((res) => res.json())
  .then((data) => {
    const headrow = document.getElementById("headrow");
    const row = document.createElement("div");
    row.className = "row";
    headrow.appendChild(row);
    const title = document.createElement("h2");
    title.className = "row__title";
    title.innerText = "Romance Movies";
    row.appendChild(title);
    const row_posters = document.createElement("div");
    row_posters.className = "row__posters";
    row.appendChild(row_posters);
    data.results.forEach((movie) => {
      console.log(movie);
      const poster = document.createElement("img");
      poster.className = "row__poster";
      var s2 = movie.id;
      poster.id = s2;
      poster.src = img_url + movie.backdrop_path;
      row_posters.appendChild(poster);

      poster.addEventListener("click", () => {
        window.location.href = `movie-details.php?id=${movie.id}`;
      });
    });
  });
// Documentary
fetch(requests.fetchDocumentaries)
  .then((res) => res.json())
  .then((data) => {
    const headrow = document.getElementById("headrow");
    const row = document.createElement("div");
    row.className = "row";
    headrow.appendChild(row);
    const title = document.createElement("h2");
    title.className = "row__title";
    title.innerText = "Documentaries";
    row.appendChild(title);
    const row_posters = document.createElement("div");
    row_posters.className = "row__posters";
    row.appendChild(row_posters);
    data.results.forEach((movie) => {
      console.log(movie);
      const poster = document.createElement("img");
      poster.className = "row__poster";
      var s2 = movie.id;
      poster.id = s2;
      poster.src = img_url + movie.backdrop_path;
      row_posters.appendChild(poster);

      poster.addEventListener("click", () => {
        window.location.href = `movie-details.php?id=${movie.id}`;
      });
    });
  });

/*----------------------------------------------------------------
-----------------------------Movies-------------------------------
------------------------------------------------------------------*/

// banner
fetch(requests.fetchNetflixOrignalsMovies)
  .then((res) => res.json())
  .then((data) => {
    console.log(data.results);
    // every refresh the movie will be change
    const setMovie =
      data.results[Math.floor(Math.random() * data.results.length - 1)];
    console.log(setMovie);
    var banner = document.getElementById("bannerMovies");
    var banner_title = document.getElementById("banner__titleMovies");
    var banner__desc = document.getElementById("banner__descriptionMovies");
    banner.style.backgroundImage =
      "url(" + img_url + setMovie.backdrop_path + ")";
    banner__desc.innerText = truncate(setMovie.overview, 150);
    banner_title.innerText = setMovie.name;

    poster.addEventListener("click", () => {
      window.location.href = `movie-details.php?id=${movie.id}`;
    });
  });

// top rated
fetch(requests.fetchTrendingMovies)
  .then((res) => res.json())
  .then((data) => {
    const headrow = document.getElementById("headrowMovies");
    const row = document.createElement("div");
    row.className = "rowMovies";
    headrow.appendChild(row);
    const title = document.createElement("h2");
    title.className = "row__titleMovies";
    title.innerText = "Top Movies in South Africa Today";
    row.appendChild(title);
    const row_posters = document.createElement("div");
    row_posters.className = "row__postersMovies";
    row.appendChild(row_posters);
    data.results.forEach((movie) => {
      console.log(movie);
      const poster = document.createElement("img");
      poster.className = "row__posterLargeMovies";
      var s2 = movie.id;
      poster.id = s2;
      poster.src = img_url + movie.poster_path;
      row_posters.appendChild(poster);

      poster.addEventListener("click", () => {
        window.location.href = `movie-details.php?id=${movie.id}`;
      });
    });
  });

// movies rows
fetch(requests.fetchNetflixOrignalsMovies)
  .then((res) => res.json())
  .then((data) => {
    const headrow = document.getElementById("headrowMovies");
    const row = document.createElement("div");
    row.className = "rowMovies";
    row.classList.add("netflixrowMovies");
    headrow.appendChild(row);
    const title = document.createElement("h2");
    title.className = "row__titleMovies";
    title.innerText = "NETFLIX ORIGINALS";
    row.appendChild(title);
    const row_posters = document.createElement("div");
    row_posters.className = "row__postersMovies";
    row.appendChild(row_posters);
    data.results.forEach((movie) => {
      const poster = document.createElement("img");
      poster.className = "row__posterLargeMovies";
      var s = movie.name.replace(/\s+/g, "");
      poster.id = s;
      poster.src = img_url + movie.poster_path;
      row_posters.appendChild(poster);

      poster.addEventListener("click", () => {
        window.location.href = `movie-details.php?id=${movie.id}`;
      });
    });
  });

// Trending
fetch(requests.fetchTrendingMovies)
  .then((res) => res.json())
  .then((data) => {
    const headrow = document.getElementById("headrowMovies");
    const row = document.createElement("div");
    row.className = "rowMovies";
    row.classList.add("popularrowMovies");
    headrow.appendChild(row);
    const title = document.createElement("h2");
    title.className = "row__titleMovies";
    title.innerText = "Trending Now";
    row.appendChild(title);
    const row_posters = document.createElement("div");
    row_posters.className = "row__postersMovies";
    row.appendChild(row_posters);
    data.results.forEach((movie) => {
      const poster = document.createElement("img");
      poster.className = "row__posterLargeMovies";
      var s2 = movie.id;
      poster.id = s2;
      poster.src = img_url + movie.poster_path;
      row_posters.appendChild(poster);

      poster.addEventListener("click", () => {
        window.location.href = `movie-details.php?id=${movie.id}`;
      });
    });
  });

// Action
fetch(requests.fetchActionMoviesMovies)
  .then((res) => res.json())
  .then((data) => {
    const headrow = document.getElementById("headrowMovies");
    const row = document.createElement("div");
    row.className = "rowMovies";
    headrow.appendChild(row);
    const title = document.createElement("h2");
    title.className = "row__titleMovies";
    title.innerText = "Action Movies";
    row.appendChild(title);
    const row_posters = document.createElement("div");
    row_posters.className = "row__postersMovies";
    row.appendChild(row_posters);
    data.results.forEach((movie) => {
      console.log(movie);
      const poster = document.createElement("img");
      poster.className = "row__posterMovies";
      var s2 = movie.id;
      poster.id = s2;
      poster.src = img_url + movie.backdrop_path;
      row_posters.appendChild(poster);

      poster.addEventListener("click", () => {
        window.location.href = `movie-details.php?id=${movie.id}`;
      });
    });
  });
// Comedy
fetch(requests.fetchComedyMoviesMovies)
  .then((res) => res.json())
  .then((data) => {
    const headrow = document.getElementById("headrowMovies");
    const row = document.createElement("div");
    row.className = "rowMovies";
    headrow.appendChild(row);
    const title = document.createElement("h2");
    title.className = "row__titleMovies";
    title.innerText = "Comedy Movies";
    row.appendChild(title);
    const row_posters = document.createElement("div");
    row_posters.className = "row__postersMovies";
    row.appendChild(row_posters);
    data.results.forEach((movie) => {
      console.log(movie);
      const poster = document.createElement("img");
      poster.className = "row__posterMovies";
      var s2 = movie.id;
      poster.id = s2;
      poster.src = img_url + movie.backdrop_path;
      row_posters.appendChild(poster);

      poster.addEventListener("click", () => {
        window.location.href = `movie-details.php?id=${movie.id}`;
      });
    });
  });
// Horror
fetch(requests.fetchHorrorMoviesMovies)
  .then((res) => res.json())
  .then((data) => {
    const headrow = document.getElementById("headrowMovies");
    const row = document.createElement("div");
    row.className = "rowMovies";
    headrow.appendChild(row);
    const title = document.createElement("h2");
    title.className = "row__titleMovies";
    title.innerText = "Horror Movies";
    row.appendChild(title);
    const row_posters = document.createElement("div");
    row_posters.className = "row__postersMovies";
    row.appendChild(row_posters);
    data.results.forEach((movie) => {
      console.log(movie);
      const poster = document.createElement("img");
      poster.className = "row__posterMovies";
      var s2 = movie.id;
      poster.id = s2;
      poster.src = img_url + movie.backdrop_path;
      row_posters.appendChild(poster);

      poster.addEventListener("click", () => {
        window.location.href = `movie-details.php?id=${movie.id}`;
      });
    });
  });
// Romance
fetch(requests.fetchRomanceMoviesMovies)
  .then((res) => res.json())
  .then((data) => {
    const headrow = document.getElementById("headrowMovies");
    const row = document.createElement("div");
    row.className = "rowMovies";
    headrow.appendChild(row);
    const title = document.createElement("h2");
    title.className = "row__titleMovies";
    title.innerText = "Romance Movies";
    row.appendChild(title);
    const row_posters = document.createElement("div");
    row_posters.className = "row__postersMovies";
    row.appendChild(row_posters);
    data.results.forEach((movie) => {
      console.log(movie);
      const poster = document.createElement("img");
      poster.className = "row__posterMovies";
      var s2 = movie.id;
      poster.id = s2;
      poster.src = img_url + movie.backdrop_path;
      row_posters.appendChild(poster);

      poster.addEventListener("click", () => {
        window.location.href = `movie-details.php?id=${movie.id}`;
      });
    });
  });
// Documentary
fetch(requests.fetchDocumentariesMovies)
  .then((res) => res.json())
  .then((data) => {
    const headrow = document.getElementById("headrowMovies");
    const row = document.createElement("div");
    row.className = "rowMovies";
    headrow.appendChild(row);
    const title = document.createElement("h2");
    title.className = "row__titleMovies";
    title.innerText = "Documentaries";
    row.appendChild(title);
    const row_posters = document.createElement("div");
    row_posters.className = "row__postersMovies";
    row.appendChild(row_posters);
    data.results.forEach((movie) => {
      console.log(movie);
      const poster = document.createElement("img");
      poster.className = "row__posterMovies";
      var s2 = movie.id;
      poster.id = s2;
      poster.src = img_url + movie.backdrop_path;
      row_posters.appendChild(poster);

      poster.addEventListener("click", () => {
        window.location.href = `movie-details.php?id=${movie.id}`;
      });
    });
  });

/*----------------------------------------------------------------
-------------------------New & Popular----------------------------
------------------------------------------------------------------*/
//Banner//
fetch(requests.fetchUpcommingMovies)
  .then((res) => res.json())
  .then((data) => {
    console.log(data.results);
    // every refresh the movie will be change
    const setMovie =
      data.results[Math.floor(Math.random() * data.results.length - 1)];
    console.log(setMovie);
    var banner = document.getElementById("bannerNew");
    var banner_title = document.getElementById("banner__titleNew");
    var banner__desc = document.getElementById("banner__descriptionNew");
    banner.style.backgroundImage =
      "url(" + img_url + setMovie.backdrop_path + ")";
    banner__desc.innerText = truncate(setMovie.overview, 150);
    banner_title.innerText = setMovie.name;
    
  });

// Popular Movies
fetch(requests.fetchPopularMoviesNew)
  .then((res) => res.json())
  .then((data) => {
    const headrow = document.getElementById("headrowNew");
    const row = document.createElement("div");
    row.className = "rowNew";
    headrow.appendChild(row);
    const title = document.createElement("h2");
    title.className = "row__titleNew";
    title.innerText = "Popular Movies";
    row.appendChild(title);
    const row_posters = document.createElement("div");
    row_posters.className = "row__postersNew";
    row.appendChild(row_posters);
    data.results.forEach((movie) => {
      console.log(movie);
      const poster = document.createElement("img");
      poster.className = "row__posterNew";
      var s2 = movie.id;
      poster.id = s2;
      poster.src = img_url + movie.backdrop_path;
      row_posters.appendChild(poster);

      poster.addEventListener("click", () => {
        window.location.href = `movie-details.php?id=${movie.id}`;
      });
    });
  });

// Popular TV
fetch(requests.fetchPopularTvNew)
  .then((res) => res.json())
  .then((data) => {
    const headrow = document.getElementById("headrowNew");
    const row = document.createElement("div");
    row.className = "rowNew";
    headrow.appendChild(row);
    const title = document.createElement("h2");
    title.className = "row__titleNew";
    title.innerText = "Popular Tv";
    row.appendChild(title);
    const row_posters = document.createElement("div");
    row_posters.className = "row__postersNew";
    row.appendChild(row_posters);
    data.results.forEach((movie) => {
      console.log(movie);
      const poster = document.createElement("img");
      poster.className = "row__posterNew";
      var s2 = movie.id;
      poster.id = s2;
      poster.src = img_url + movie.backdrop_path;
      row_posters.appendChild(poster);

      poster.addEventListener("click", () => {
        window.location.href = `tv-details.php?id=${movie.id}`;
      });
    });
  });

// Up Coming
fetch(requests.fetchUpcommingMovies2)
  .then((res) => res.json())
  .then((data) => {
    const headrow = document.getElementById("headrowNew");
    const row = document.createElement("div");
    row.className = "rowNew";
    headrow.appendChild(row);
    const title = document.createElement("h2");
    title.className = "row__titleNew";
    title.innerText = "Up Coming";
    row.appendChild(title);
    const row_posters = document.createElement("div");
    row_posters.className = "row__postersNew";
    row.appendChild(row_posters);
    data.results.forEach((movie) => {
      console.log(movie);
      const poster = document.createElement("img");
      poster.className = "row__posterNew";
      var s2 = movie.id;
      poster.id = s2;
      poster.src = img_url + movie.backdrop_path;
      row_posters.appendChild(poster);

      poster.addEventListener("click", () => {
        window.location.href = `movie-details.php?id=${movie.id}`;
      });
    });
  });

// Popular TV
fetch(requests.fetchTopRatedTv)
  .then((res) => res.json())
  .then((data) => {
    const headrow = document.getElementById("headrowNew");
    const row = document.createElement("div");
    row.className = "rowNew";
    headrow.appendChild(row);
    const title = document.createElement("h2");
    title.className = "row__titleNew";
    title.innerText = "Top Rated Tv";
    row.appendChild(title);
    const row_posters = document.createElement("div");
    row_posters.className = "row__postersNew";
    row.appendChild(row_posters);
    data.results.forEach((movie) => {
      console.log(movie);
      const poster = document.createElement("img");
      poster.className = "row__posterNew";
      var s2 = movie.id;
      poster.id = s2;
      poster.src = img_url + movie.backdrop_path;
      row_posters.appendChild(poster);

      poster.addEventListener("click", () => {
        window.location.href = `tv-details.php?id=${movie.id}`;
      });
    });
  });

/*----------------------------------------------------------------
---------------------------Tv Shows-------------------------------
------------------------------------------------------------------*/
// banner
fetch(requests.fetchTrendingTvTodayBan)
  .then((res) => res.json())
  .then((data) => {
    console.log(data.results);
    // every refresh the movie will be change
    const setMovie =
      data.results[Math.floor(Math.random() * data.results.length - 1)];
    console.log(setMovie);
    var banner = document.getElementById("bannerTVs");
    var banner_title = document.getElementById("banner__titleTVs");
    var banner__desc = document.getElementById("banner__descriptionTVs");
    banner.style.backgroundImage =
      "url(" + img_url + setMovie.backdrop_path + ")";
    banner__desc.innerText = truncate(setMovie.overview, 150);
    banner_title.innerText = setMovie.name;

    poster.addEventListener("click", () => {
      window.location.href = `.tv-details.php?id=${movie.id}`;
    });
  });

fetch(requests.fetchTrendingTvToday)
  .then((res) => res.json())
  .then((data) => {
    const headrow = document.getElementById("headrowTVs");
    const row = document.createElement("div");
    row.className = "rowTVs";
    headrow.appendChild(row);
    const title = document.createElement("h2");
    title.className = "row__titleTVs";
    title.innerText = "Top Movies Today";
    row.appendChild(title);
    const row_posters = document.createElement("div");
    row_posters.className = "row__postersTVs";
    row.appendChild(row_posters);
    data.results.forEach((movie) => {
      console.log(movie);
      const poster = document.createElement("img");
      poster.className = "row__posterLargeTVs";
      var s2 = movie.id;
      poster.id = s2;
      poster.src = img_url + movie.poster_path;
      row_posters.appendChild(poster);

      poster.addEventListener("click", () => {
        window.location.href = `tv-details.php?id=${movie.id}`;
      });
    });
  });
fetch(requests.fetchTrendingTvWeek)
  .then((res) => res.json())
  .then((data) => {
    const headrow = document.getElementById("headrowTVs");
    const row = document.createElement("div");
    row.className = "rowTVs";
    headrow.appendChild(row);
    const title = document.createElement("h2");
    title.className = "row__titleTVs";
    title.innerText = "Top Movies This Week";
    row.appendChild(title);
    const row_posters = document.createElement("div");
    row_posters.className = "row__postersTVs";
    row.appendChild(row_posters);
    data.results.forEach((movie) => {
      console.log(movie);
      const poster = document.createElement("img");
      poster.className = "row__posterLargeTVs";
      var s2 = movie.id;
      poster.id = s2;
      poster.src = img_url + movie.poster_path;
      row_posters.appendChild(poster);

      poster.addEventListener("click", () => {
        window.location.href = `tv-details.php?id=${movie.id}`;
      });
    });
  });
fetch(requests.fetchPopularTvShows)
  .then((res) => res.json())
  .then((data) => {
    const headrow = document.getElementById("headrowTVs");
    const row = document.createElement("div");
    row.className = "rowTVs";
    headrow.appendChild(row);
    const title = document.createElement("h2");
    title.className = "row__titleTVs";
    title.innerText = "Popular Shows";
    row.appendChild(title);
    const row_posters = document.createElement("div");
    row_posters.className = "row__postersTVs";
    row.appendChild(row_posters);
    data.results.forEach((movie) => {
      console.log(movie);
      const poster = document.createElement("img");
      poster.className = "row__posterLargeTVs";
      var s2 = movie.id;
      poster.id = s2;
      poster.src = img_url + movie.poster_path;
      row_posters.appendChild(poster);

      poster.addEventListener("click", () => {
        window.location.href = `tv-details.php?id=${movie.id}`;
      });
    });
  });
fetch(requests.fetchTopRatedTVShows)
  .then((res) => res.json())
  .then((data) => {
    const headrow = document.getElementById("headrowTVs");
    const row = document.createElement("div");
    row.className = "rowTVs";
    headrow.appendChild(row);
    const title = document.createElement("h2");
    title.className = "row__titleTVs";
    title.innerText = "Top Rated Shows";
    row.appendChild(title);
    const row_posters = document.createElement("div");
    row_posters.className = "row__postersTVs";
    row.appendChild(row_posters);
    data.results.forEach((movie) => {
      console.log(movie);
      const poster = document.createElement("img");
      poster.className = "row__posterLargeTVs";
      var s2 = movie.id;
      poster.id = s2;
      poster.src = img_url + movie.poster_path;
      row_posters.appendChild(poster);

      poster.addEventListener("click", () => {
        window.location.href = `tv-details.php?id=${movie.id}`;
      });
    });
  });
/*----------------------------------------------------------------
------------------------------My List-----------------------------
------------------------------------------------------------------*/


