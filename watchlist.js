const deserializedArray = JSON.parse(localStorage.getItem("list"));

deserializedArray.forEach((item) => {
  let htmlRender = `
    <div class="result-item" id="${item.imdbID}">
        <div class="poster">
            <img src="${item.Poster}">
        </div>
        <div class="details">
            <div class="title-rating">
                <h3>${item.Title}</h3>
                <span>⭐${item.imdbRating}</span>
            </div>
            <div class="area">
                <p class="duration">${item.Runtime}</p> 
                <p class="genre">${item.Genre}</p>
                <button item-watchlist="${item.imdbID}" class="watchlist-btn">Remove</button>
                <p class="type">⬤ ${item.Type}</p>
            </div>
            <div class="plot">
                <p>${item.Plot}</p>
            </div>
        </div>
    </div>      `;
  document.getElementById("watchlist").innerHTML += htmlRender;
});
