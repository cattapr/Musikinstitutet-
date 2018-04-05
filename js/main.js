function fetchArtists() {
    // Always returns a promise
    fetch('https://folksa.ga/api/artists?key=flat_eric&limit=200')
        .then((response) => response.json())
        .then((artists) => {
            console.log(artists);
            getinputName(artists);
            displayArtists(artists);
        })
}

fetchArtists();

//function isTrue(artists) {
    
    function getinputName(artists) {
       let getinputName = document.getElementById('name').value;
       return getinputName;

           for (var i = 0; i < artists.length; i++) {
            var id = artists[i]._id;
            var nameOfArtist = artists[i].name;
            id = nameOfArtist;
            if (id == inputValue) {
                console.log("Artist already exists", id);
            } else {
                console.log("not match");
            }
        }
        
};



 function getinputGenre() {
       let getinputGenre = document.getElementById('genre').value;
       return getinputGenre;

   }

    

const button = document.getElementById('button');
button.onclick = function createArtist() {
    let artist = {
        name: getinputName(),
        gender: "other",
        genres: getinputGenre(), //Must be a comma separated string
        spotifyURL: "https://open.spotify.com/artist/6zHRqvws8dVeqL8D31ponr?si=QFWoLwwBTa-KrR3gUcLMYQ",
        coverImage: "https://img.discogs.com/D7eDvyQrOJIJlDX-ieliD0QmAG4=/500x500/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/A-71872-1426020311-7115.jpeg.jpg"
    }

    postArtist(artist);

}



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
        });
};




function displayArtists(artists) {

    for (let artist of artists) {

        const artistList = document.getElementById('artists');


        ul = document.getElementById('ul');
        li = document.createElement('li');
        a = document.createElement('a');
        a.href = "#";
        a.id = artist._id;
        a.dataset.id = artist._id;
        li.innerText = artist.name;
        li.classList.add('button');
        // button.addEventListener('click', logInfo);
        a.addEventListener('click', function() {

            this.dataset.id;
            this.innerText;
            logInfo(this);
        });



        artistList.appendChild(ul);
        ul.appendChild(a);
        a.appendChild(li);

    }

    input = document.getElementById("myInput");
    input.addEventListener('keyup', function() {

        var filter, ul, li, i;

        filter = input.value.toUpperCase();

        ul = document.getElementById("ul");
        li = ul.getElementsByTagName("li");

        for (i = 0; i < li.length; i++) {

            if (li[i].innerText.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "block";
            } else {
                li[i].style.display = "none";

            }
        }

    });
};

function logInfo(element) {


    const addAlbumDiv = document.getElementById('addAlbum');
 


    let albumButton = document.getElementById('albumButton');


    albumButton.id = element.id;
    albumButton.dataset.id = element.id;




    console.group("Button properties");
    console.log('albumtitle:', value);
    console.log('id:', element.id);
    console.log('class:', element.className);


    //skapar album

    /*   let album = {
        title: albumTitle,
        artists: element.id, //Can be multiple IDs, must be comma separated string if multiple
        releaseDate: 1967,
        genres: "Folk rock, Psychedelic Rock", //Must be a comma separated string
        spotifyURL: "https://open.spotify.com/album/1jKfTvT64lcQwA74WmkKiJ?si=nmdUZ2UpS4uUknUrGX1smg",
        coverImage: "https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Tim_Buckley_-_Goodbye_And_Hello.jpg/220px-Tim_Buckley_-_Goodbye_And_Hello.jpg"
    }
*/
    createAlbum(element, value, albumButton);

}



function getAlbum() {
    fetch('https://folksa.ga/api/albums?key=flat_eric')
        .then((response) => response.json())
        .then((albums) => {
            console.log(albums);

        });
};

getAlbum();




function postAlbum(album, albumButton) {
    //skickar album
    albumButton.onclick = function() {
           const albumTitle = document.getElementById('input');
    let value = albumTitle.value;
    function createAlbum(element, value, albumButton) {

    let album = {
        title: value,
        artists: element.id, //Can be multiple IDs, must be comma separated string if multiple
        releaseDate: 1967,
        genres: "Folk rock, Psychedelic Rock", //Must be a comma separated string
        spotifyURL: "https://open.spotify.com/album/1jKfTvT64lcQwA74WmkKiJ?si=nmdUZ2UpS4uUknUrGX1smg",
        coverImage: "https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Tim_Buckley_-_Goodbye_And_Hello.jpg/220px-Tim_Buckley_-_Goodbye_And_Hello.jpg"
    }

    postAlbum(album, albumButton);


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
                console.log(album);
            });

        console.groupEnd();

        //hämtar album
        fetch('https://folksa.ga/api/albums?key=flat_eric')
            .then((response) => response.json())
            .then((albums) => {
                console.log('Albums:', albums);
            });

    };
};


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