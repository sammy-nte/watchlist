const watchlistData = JSON.parse(localStorage.getItem("list"));

// render using local storage data
watchlistData.forEach(async (item) => {
  const data = await apiCall(item);
  document.getElementById("watchlist").innerHTML += renderMovie(data);
});

//Remove from watchlist
window.addEventListener("click", (e) => {
  const addedMovie = e.target.dataset.watchlist;
  if (addedMovie) {
    const watchlistValues = Object.values(watchlistData);
    if (watchlistValues.includes(addedMovie)) {
      const index = watchlistValues.indexOf(addedMovie);
      delete watchlistData[index];
      const newList = watchlistData;
      localStorage.setItem("list", JSON.stringify(newList));
      const parsed_newList = JSON.parse(localStorage.getItem("list"));
      const filterdList = parsed_newList.filter((item) => item !== null);
      localStorage.setItem("list", JSON.stringify(filterdList));
      const updatedLocalStorage = JSON.parse(localStorage.getItem("list"));
      document.location.reload(true);
      updatedLocalStorage.forEach((item) => {
        fetch(`https://www.omdbapi.com/?apikey=eaeb9e1e&i=${item}`)
          .then((response) => response.json())
          .then((data) => {
            document.getElementById("watchlist").innerHTML += renderMovie(data);
          });
      });
    }
  }
});

// Html to render
function renderMovie(data) {
  return `
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
            <button data-watchlist="${data.imdbID}" class="watchlist-btn">Remove</button>
            <p class="type">⬤ ${data.Type}</p>
        </div>
        <div class="plot">
            <p>${data.Plot}</p>
        </div>
    </div>
    `;
}

//Api call
async function apiCall(query) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=eaeb9e1e&i=${query}`
  );
  const data = await response.json();
  return data;
}
