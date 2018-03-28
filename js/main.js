function fetchArtists(){
  // Always returns a promise
  fetch('https://folksa.ga/api/artists?key=flat_eric')
    .then((response) => response.json())
    .then((artists) => {
      displayArtists(artists);
      console.log(artists);
    })
}

fetchArtists();

function displayArtists(artists){
  const artistList = document.getElementById('artists');
  for(let artist of artists){
    let button = document.createElement('button');
    button.id = artist._id; 
    button.dataset.id = artist._id;
    button.innerText = artist.name;
    button.classList.add('button'); 
    // button.addEventListener('click', logInfo);
    button.addEventListener('click', function() {
      this.dataset.id;
      this.innerText;
      logInfo(this);
    });
    artistList.appendChild(button);
  }
}

function logInfo(element) {

  console.group("Button properties");
  console.log('id:', element.id);
  console.log('class:', element.className);

  let album = {
    title: "Thriller",
    artists: element.id, //Can be multiple IDs, must be comma separated string if multiple
    releaseDate: 1967,
    genres: "Folk rock, Psychedelic Rock", //Must be a comma separated string
    spotifyURL: "https://open.spotify.com/album/1jKfTvT64lcQwA74WmkKiJ?si=nmdUZ2UpS4uUknUrGX1smg",
    coverImage: "https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Tim_Buckley_-_Goodbye_And_Hello.jpg/220px-Tim_Buckley_-_Goodbye_And_Hello.jpg"
}

fetch('https://folksa.ga/api/albums?key=flat_eric',{
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(album)
  })
  .then((response) => response.json())
  .then((album) => {
    console.log(album);
  });


  console.groupEnd();
}


  fetch('https://folksa.ga/api/albums?key=flat_eric')
  .then((response) => response.json())
  .then((albums) => {
    console.log(albums);
  });





fetch('https://folksa.ga/api/artists?key=flat_eric')
  .then((response) => response.json())
  .then((artists) => {
    console.log(artists);
  });

  
  const button = document.getElementById('button');

 button.addEventListener('click', function(){
  let inputValue = document.getElementById('name').value;
  let genreValue = document.getElementById('genre').value;
  let spotifyValue = document.getElementById('spotify').value;
  let imageValue = document.getElementById('image').value; 
  /*let gender = document.getElementById('female').checked; 
  gender = document.getElementById('male').checked;
  gender = document.getElementById('other').checked;*/


   let artist = {
    name: inputValue,
    gender: gender,
    genres: genreValue,//"Folk,Rock", //Must be a comma separated string
    spotifyURL: spotifyValue, //"https://open.spotify.com/artist/6zHRqvws8dVeqL8D31ponr?si=QFWoLwwBTa-KrR3gUcLMYQ",
    coverImage: imageValue//"https://img.discogs.com/D7eDvyQrOJIJlDX-ieliD0QmAG4=/500x500/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/A-71872-1426020311-7115.jpeg.jpg"
}



fetch('https://folksa.ga/api/artists?key=flat_eric',{
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(artist)
  })
  .then((response) => response.json())
  .then((artist) => {
    console.log(artist);
  });

});


//Create album with artist ID 
//under construction





