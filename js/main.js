let selectedArtist = '';
let selectedAlbum = '';

function fetchArtists() {
    // Always returns a promise
    fetch('https://folksa.ga/api/artists?key=flat_eric&limit=200')
        .then((response) => response.json())
        .then((artists) => {
            console.log(artists);
            checkIfArtistExists(artists);
            displayArtistList(artists);
        })
}

fetchArtists();

//function isTrue(artists) {
    
    function getinputName() {
       let getinputName = document.getElementById('name').value;
       return getinputName;

   }

 function getinputGenre() {
       let getinputGenre = document.getElementById('genre').value;
       return getinputGenre;

   }



function checkIfArtistExists(artists) {
    	   for (var i = 0; i < artists.length; i++) {
            var id = artists[i]._id;
            var nameOfArtist = artists[i].name;
            id = nameOfArtist;
            let inputname = getinputName();


            if (id ==  inputname) {
                console.log("Artist already exists", id);
            } else {
                console.log("not match");
                
            }
        }
   };



const button = document.getElementById('submitButton');
button.onclick = function createArtist() {

    let artist = {
        name: getinputName(),
        gender: "other",
        genres: getinputGenre(), //Must be a comma separated string
        spotifyURL: "https://open.spotify.com/artist/6zHRqvws8dVeqL8D31ponr?si=QFWoLwwBTa-KrR3gUcLMYQ",
        coverImage: "https://img.discogs.com/D7eDvyQrOJIJlDX-ieliD0QmAG4=/500x500/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/A-71872-1426020311-7115.jpeg.jpg"
    }

    postArtist(artist);

};



function postArtist(artist) {
    fetch('https://folksa.ga/api/artists?key=flat_eric', {
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
            updateArtists();
        });

} //end of postArtists




function updateArtists() {
    fetch('https://folksa.ga/api/artists?key=flat_eric&sort=asc&limit=200')
        .then((response) => response.json())
        .then((artists) => {
            console.log('update:', artists);
            displayArtistList(artists);
        });
};




function displayArtistList(artists) {

    for (let artist of artists) {
        const artistList = document.getElementById('artists');
        const ul = document.getElementById('ul');
        const li = document.createElement('li');
        const clickOnArtist = document.createElement('button');
        clickOnArtist.id = artist._id;
        clickOnArtist.dataset.id = artist._id;
        clickOnArtist.innerText = artist.name;
        li.classList.add('artistlist');
        clickOnArtist.addEventListener('click', function() {
            this.dataset.id;
            this.innerText;
            addAlbumToArtistId(this);
        });

        artistList.appendChild(ul);
        ul.appendChild(li);
        li.appendChild(clickOnArtist);
    } //End of loop

    const input = document.getElementById("myInput");
    input.addEventListener('keyup', function() {
        let filter, ul, li, i;
        filter = input.value.toUpperCase();
        ul = document.getElementById("ul");
        li = ul.getElementsByTagName("li");

	        for (i = 0; i < li.length; i++) {
	            if (li[i].innerText.toUpperCase().indexOf(filter) > -1) {
	                li[i].style.display = "block";
	            } else {
	                li[i].style.display = "none";

	            }
	        } //End of loop
    	})
}; //End of displayArtistList()

function getAlbums() {
    fetch('https://folksa.ga/api/albums?key=flat_eric')
        .then((response) => response.json())
        .then((albums) => {
            console.log(albums);
        });
}; getAlbums();

function addAlbumToArtistId(element) {
	const addAlbumDiv = document.getElementById('addAlbum');
	let addAlbumButton = document.getElementById('albumButton');
    let albumButton = document.getElementById('albumButton');
    albumButton.id = element.id;
    albumButton.dataset.id = element.id;

    let artistHeading = document.createElement('h3');
    artistHeading.innerText = element.innerText;

    addAlbumDiv.appendChild(artistHeading);

   createAlbum(addAlbumButton, albumButton);
}; //End of addAlbumToArtist()



   function albumTitle() {
	 let albumTitle = document.getElementById('albumTitle').value;
	 return albumTitle;
}

  function albumReleaseDate() {
	 let albumReleaseDate = document.getElementById('albumRelease').value;
	 return albumReleaseDate;
}

  function albumGenre() {
	 let albumGenre = document.getElementById('albumGenre').value;
	 return albumGenre;
}

  function albumTrack() {
	 let albumTrack = document.getElementById('albumTrack').value;
	 return albumTrack;
}



function createAlbum(addAlbumButton, albumButton) {

	addAlbumButton.onclick = function() {

	    let album = {
	        title: albumTitle(),
	        artists: albumButton.id, //Can be multiple IDs, must be comma separated string if multiple
	        releaseDate: albumReleaseDate(),
	        genres: albumGenre(), //Must be a comma separated string
	        spotifyURL: "https://open.spotify.com/album/1jKfTvT64lcQwA74WmkKiJ?si=nmdUZ2UpS4uUknUrGX1smg",
	        coverImage: "https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Tim_Buckley_-_Goodbye_And_Hello.jpg/220px-Tim_Buckley_-_Goodbye_And_Hello.jpg"
	    }
    
         fetch('https://folksa.ga/api/albums?key=flat_eric', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(album)
            })

            .then((response) => response.json())
            .then((albums) => {
                console.log('New album:' , albums);
                selectedAlbum = getAlbumId(albums);
                selectedArtist = getArtistId(albums);
            });

        //hämtar album
        fetch('https://folksa.ga/api/albums?key=flat_eric')
            .then((response) => response.json())
            .then((albums) => {
                console.log('Albums:', albums);
            });

    };
};


 function getAlbumId(albums){

		let albumId = albums._id;
		console.log(albumId);
		return albumId;
}

function getArtistId(albums){
        let artistId = albums.artists.join(',');
        console.log(artistId);
        return artistId;
}



//get tracks

function getTracks(){
	fetch('https://folksa.ga/api/tracks?key=flat_eric')
  .then((response) => response.json())
  .then((tracks) => {
    console.log('tracks:', tracks);
  });
}

getTracks();


//get playlists 

function getplaylist(){
	fetch('https://folksa.ga/api/playlists?key=flat_eric')
  .then((response) => response.json())
  .then((playlists) => {
    console.log('playlist:', playlists);
  });
}

getplaylist();


//Post tracks
let trackButton = document.getElementById('trackButton');
trackButton.onclick = function postTracks() {
    let track = {
        title: albumTrack(),
        artists: selectedArtist, // Must be a string with comma separated values
        album: selectedAlbum,   // Must be a string with comma separated values
        genres: "Folk,Rock"
    }
    console.log(track);
    fetch('https://folksa.ga/api/tracks?key=flat_eric',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(track)
      })
      .then((response) => response.json())
      .then((postedTrack) => {
        console.log('One track:', postedTrack);
        console.log('hej');
      });
   
}

 function getinputPlaylist() {
       let getinputPlaylist = document.getElementById('createdPlaylist').value;
       return getinputPlaylist;

   }

function getinputCreatedBy() {
       let getinputCreatedBy = document.getElementById('createdBy').value;
       return getinputCreatedBy;

   }
const addPlaylistButton = document.getElementById('playlistButton');
addPlaylistButton.onclick = function createPlaylist() {
    let playlist = {
    title: getinputPlaylist(),
    genres: "Folk, Folk Rock",
    createdBy: getinputCreatedBy(),
    tracks: "5aae2d13b9791d0344d8f717,5aae2e6fb9791d0344d8f71c",
    coverImage: "https://www.internetmuseum.se/wordpress/wp-content/uploads/compisknappar-504x329.jpg",
    coverImageColor: "#000"
}

fetch('https://folksa.ga/api/playlists?key=flat_eric',{
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(playlist)
  })
  .then((response) => response.json())
  .then((playlist) => {
    console.log(playlist);
  });
};
