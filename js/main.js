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
  let gender = document.getElementById('female').checked; 
  gender = document.getElementById('male').checked;
  gender = document.getElementById('other').checked;


   let artist = {
    name: inputValue,
    gender: gender,
    genres: genreValue,//"Folk,Rock", //Must be a comma separated string
    spotifyURL: spotifyValue, //"https://open.spotify.com/artist/6zHRqvws8dVeqL8D31ponr?si=QFWoLwwBTa-KrR3gUcLMYQ",
    coverImage: imageValue//"https://img.discogs.com/D7eDvyQrOJIJlDX-ieliD0QmAG4=/500x500/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/A-71872-1426020311-7115.jpeg.jpg"
}

console.log(artists.spotifyURL);

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


 