function searchMovie() {

  let keyword;
  keyword = document.getElementById('input').value;

  const url = `http://www.omdbapi.com/?s=${keyword}&type=movie&apikey=8198d9c5`;

  fetch(url)
    .then(response => response.json())
    .then(data => {

      $('#movieList').html('');

      data.Search.map((value) => {

        if (value.Poster === "N/A") {
          value.Poster = "https://cdn.sporx.com/img/59/2019/752x395-la-casa-de-papel-3-sezon-ne-zaman-baslayacak-la-casa.jpg"
        }

        $("#movieList").append(
          `<div class="mt-1">
                <div class="card m-2">
                    <img id="imageID" src='${value.Poster}' class="card-img-top" alt="Card image cap">
                  <div class="card-body  d-flex flex-column">
                      <h6 class="card-title"><b>${value.Title}</b></h6>
                      <p class="align-self-start my-auto"><em>Year</em>: ${value.Year}</p>
                      <div class="justify-content-center">
                        <button onclick='showDetails("${value.imdbID}")' type="button" class="btn btn-sm mt-auto"       data-toggle="modal" data-target="#filmInfo">Details</button>
                        <button onclick='addMovieToList("${value.imdbID}")' type="button" class="btn btn-sm mt-auto">Add List</button>
                      </div>
                  </div>
                </div>
            </div>`
        );

      })

    })
    .catch(error => console.log(error))

}

function showDetails(elem) {

  const url = `http://www.omdbapi.com/?i=${elem}&apikey=8198d9c5`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      $('#filmInfoLabel').html(data.Title);
      $('#filmPoster').attr("src", data.Poster);
      $('#releaseTime').html(data.Released);
      $('#runTime').html(data.Runtime);
      $('#category').html(data.Genre);
      $('#director').html(data.Director);
      $('#writer').html(data.Writer);
      $('#actors').html(data.Actors);
      $('#plot').html(data.Plot);

    })
    .catch(error => console.log(error))

}

$('#input').on("keyup", function (event) {

  if (event.keyCode === 13) {
    event.preventDefault();
    searchMovie()
  }
});


function addMovieToList(event) {

  alert('The movie add to your list.')
  const url = `http://www.omdbapi.com/?i=${event}&apikey=8198d9c5`;

  fetch(url)
    .then(response => response.json())
    .then((data) => {
      console.log(data.imdbID);


      $('#wishModal').append(
        `<div id="${data.imdbID}" class="mt-1">
        <div id="wishCard" class="card m-2">
          <img id="imageWishID" src="${data.Poster}" class="card-img-top" alt="Card image cap">
          <div class="card-body  d-flex flex-column">
            <h6 class="card-title"><b>${data.Title}</b></h6>
            <p class="align-self-start my-auto"><em>Year</em>: ${data.Year}</p>
            <p class="align-self-start my-auto"><em>IMDB</em>: ${data.imdbRating}</p>
            <i onclick='removeWishList("${data.imdbID}")' class="fas fa-trash align-self-end"></i>
          </div>
      </div>
      </div>`)

    })
    .catch(error => console.log(error))

}


function removeWishList(event) {

  $(`#${event}`).remove();

}