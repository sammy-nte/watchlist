const searchBtn = document.getElementById("search-btn");
const container = document.getElementById("result-container");
let inputField = document.getElementById("input-search");
const searchDisplay = document.getElementById("search-display");

// function query() {
//   return `http://www.omdbapi.com/?apikey=eaeb9e1e&s=${inputField.value}`;
// }

// inputField.addEventListener("keyup", () => {
//   if (inputField.value) {
//     document.querySelector(".greeting").style.display = "none";
//   } else {
//     document.querySelector(".greeting").style.display = "flex";
//   }
// });

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchDisplay.textContent = `Your Search: "${inputField.value}"`;
  container.innerHTML = "";
  // const url = query();
  // Fetch data from api based on user input
  fetch(`https://www.omdbapi.com/?apikey=eaeb9e1e&s=${inputField.value}`)
    .then((response) => response.json())
    .then((data) => {
      for (let result of data.Search) {
        function newQueryUrl() {
          const imdb = result.imdbID;
          return `https://www.omdbapi.com/?apikey=eaeb9e1e&i=${imdb}&plot=full`;
        }

        let newUrl = newQueryUrl();
        // New fetch
        fetch(newUrl)
          .then((response) => response.json())
          .then((data) => {
            let htmlRender = `
                  <div class="result-item" id="${data.imdbID}">
                  <div class="poster">
                      <img src="${data.Poster}">
                  </div>
                  <div class="details">
                      <div class="title-rating">
                          <h3>${data.Title}</h3>
                          <span>⭐${data.imdbRating}</span>
                      </div>
                      <div class="area">
                         <p class="duration">${data.Runtime}</p> 
                         <p class="genre">${data.Genre}</p>
                         <button data-watchlist="${data.imdbID}" class="watchlist-btn">Add to watchlist</button>
                         <p class="type">⬤ ${data.Type}</p>
                      </div>
                      <div class="plot">
                          <p>${data.Plot}</p>
                      </div>
                  </div>
              </div>      
                  
                  `;
            container.innerHTML += htmlRender;
          });
      }
    });
  inputField.value = "";
  document.querySelector(".greeting").style.display = "none";
});

let array = [];

window.addEventListener("click", (e) => {
  const imdb = e.target.dataset.watchlist;
  if (imdb) {
    fetch(`https://www.omdbapi.com/?apikey=eaeb9e1e&i=${imdb}&plot=full`)
      .then((response) => response.json())
      .then((data) => {
        array.push(data);
        let array_serialized = JSON.stringify(array);
        localStorage.setItem("list", array_serialized);
      });
  }
});
