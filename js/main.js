//Global variables
let selectedArtist = '';
let selectedAlbum = '';
let selectTrack = '';





const FetchModel = {

    fetchArtists() {
        return fetch('https://folksa.ga/api/artists?key=flat_eric&limit=200')
            .then((response) => response.json())
            .then((artists) => {
                console.log(artists);
                Controller.checkIfArtistExists(artists);
                View.displayArtistList(artists);
            })
    },

    fetchAlbums() {
        return fetch('https://folksa.ga/api/albums?key=flat_eric&limit=200')
           .then((response) => response.json())
           .then((albums) => {
                console.log(albums);
                View.displayAlbumList(albums);
            })
    },

    fetchTracks(){
        return fetch('https://folksa.ga/api/tracks?key=flat_eric&limit=1000')
           .then((response) => response.json())
           .then((tracks) => {
               View.displayTracksList(tracks);    
               console.log('tracks:', tracks);
        })
    },

    fetchPlaylist(){
        return fetch('https://folksa.ga/api/playlists?key=flat_eric&limit=10')
           .then((response) => response.json())
           .then((playlists) => {
               console.log('playlist:', playlists);
               View.displayPlayLists(playlists);
        })
    },

};



    const updateModel = {

        //hämtar album
    updateAlbums() {
        return fetch('https://folksa.ga/api/albums?key=flat_eric')
            .then((response) => response.json())
            .then((albums) => {
                console.log('Albums:', albums);   
            })
    },

    updateArtists() {
        return fetch('https://folksa.ga/api/artists?key=flat_eric&sort=asc&limit=200')
           .then((response) => response.json())
           .then((artists) => {
                console.log('update:', artists);
                View.displayArtistList(artists);
        })
    },

};





const deleteDataModel = {

     registerDeleteArtistClickHandler(artistID) {
        return fetch(`https://folksa.ga/api/artists/${artistID}?key=flat_eric`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
            .then((response) => response.json())
            .then((artist) => {
                console.log(artist);
            });
        },


   /* registerDeleteAlbumClickHandler(Album, deleteButton){
        deleteButton.onclick = function deleteAlbum(){
            return fetch(`https://folksa.ga/api/albums/${Album.id}?key=flat_eric`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                  })
                  .then((response) => response.json())
                  .then((album) => {
                    console.log(album);
                  });

        }
    },*/
};


    


const Controller = {

    checkIfArtistExists(artists) {
        for (var i = 0; i < artists.length; i++) {
            var id = artists[i]._id;
            var nameOfArtist = artists[i].name;
            id = nameOfArtist;
            let inputname = View.getinputName();

            if (id ==  inputname) {
                console.log("Artist already exists", id);
            } else {
                console.log("not match");
            }
        }
   },

    getAlbumId(albums){
        let albumId = albums._id;
        console.log(albumId);
        return albumId;
    },

    getArtistId(albums){
        let artistId = albums.artists.join(',');
        console.log(artistId);
        return artistId;
    },
            
    submitButton: document.getElementById('submitButton'),

   registerCreateArtistClickHandler() {
        submitButton.onclick = function createArtist(){
            let artist = {
                name: View.getinputName(),
                gender: "other",
                genres: View.getinputGenre(), //Must be a comma separated string
                spotifyURL: "https://open.spotify.com/artist/6zHRqvws8dVeqL8D31ponr?si=QFWoLwwBTa-KrR3gUcLMYQ",
                coverImage: "https://img.discogs.com/D7eDvyQrOJIJlDX-ieliD0QmAG4=/500x500/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/A-71872-1426020311-7115.jpeg.jpg"
            }

            postModel.postArtist(artist); 
        }
    },

    registerCreateAlbumClickHandler(albumButton) {
        let id = albumButton.id;
        let button = albumButton;
        button.onclick = function createAlbum() {
            let album = {
                title: View.albumTitle(),
                artists: id, //Can be multiple IDs, must be comma separated string if multiple
                releaseDate: View.albumReleaseDate(),
                genres: View.albumGenre(), //Must be a comma separated string
                spotifyURL: "https://open.spotify.com/album/1jKfTvT64lcQwA74WmkKiJ?si=nmdUZ2UpS4uUknUrGX1smg",
                coverImage: "https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Tim_Buckley_-_Goodbye_And_Hello.jpg/220px-Tim_Buckley_-_Goodbye_And_Hello.jpg"
            } 

             postModel.postAlbum(album); 
        }
    },

    trackButton: document.getElementById('trackButton'),

    registerTrackToAlbumClickHandler(album, artist) {
        trackButton.onclick = function createTrack() {
            let track = {
                title: View.albumTrack(),
                artists: artist.join(','), // Must be a string with comma separated values
                album: album,   // Must be a string with comma separated values
                genres: "Folk,Rock"
            }
            console.log(track); 
            postModel.postTrack(track);
         }
    },

   registerTrackToPlaylistClickHandler(song){
        let addPlaylistButton = View.addPlaylist;
         addPlaylistButton.onclick = function createPlaylist() {
                let playlist = {
                    title: View.getinputPlaylist(),
                    genres: "Folk, Folk Rock",
                    createdBy: View.getinputCreatedBy(),
                    tracks: song,
                    coverImage: "https://www.internetmuseum.se/wordpress/wp-content/uploads/compisknappar-504x329.jpg",
                    coverImageColor: "#000"
                }
                console.log('hej');
                postModel.postPlaylist(playlist);
        }
    },

    trackArray(playlistID) {

        let tracks = selectTrack;
        let playlist = playlistID.dataset.id;

        Controller.postTrackToPlaylist(playlist, tracks);
        console.log('Innehåller den id?' , tracks);
    },

     postTrackToPlaylist (playlist, tracks) { 
        return fetch(`https://folksa.ga/api/playlists/${playlist}/tracks?key=flat_eric`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tracks: tracks })
          })

          .then((response) => response.json())
          .then((playlist) => {
            console.log('new track to playlist:', playlist);


          });

        }

};


const postModel = {

    postArtist(artist) {
        return fetch('https://folksa.ga/api/artists?key=flat_eric', {
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
                updateModel.updateArtists();
         })
    },

    postAlbum(album) {
        return fetch('https://folksa.ga/api/albums?key=flat_eric', {
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
                selectedAlbum = Controller.getAlbumId(albums);
                selectedArtist = Controller.getArtistId(albums);
        })
    },

    postTrack(track) { 
        return fetch('https://folksa.ga/api/tracks?key=flat_eric',{
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
        })
    },

    postPlaylist(playlist) {
        return fetch('https://folksa.ga/api/playlists?key=flat_eric',{
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
        })
    }
};



const View = {

    getinputName() {
       let getinputName = document.getElementById('name').value;
       return getinputName;
    },

    getinputGenre() {
       let getinputGenre = document.getElementById('genre').value;
       return getinputGenre;
    },

    albumTitle() {
     let albumTitle = document.getElementById('albumTitle').value;
     return albumTitle;
    },

    albumReleaseDate() {
     let albumReleaseDate = document.getElementById('albumRelease').value;
     return albumReleaseDate;
    },

    albumGenre() {
     let albumGenre = document.getElementById('albumGenre').value;
     return albumGenre;
    },

    albumTrack() {
     let albumTrack = document.getElementById('albumTrack').value;
     return albumTrack;
    },

    getinputPlaylist() {
       let getinputPlaylist = document.getElementById('createdPlaylist').value;
       return getinputPlaylist;

    },

    getinputCreatedBy() {
       let getinputCreatedBy = document.getElementById('createdBy').value;
       return getinputCreatedBy;

    },

    input: document.getElementById("myInput"),

    filterArtists () {
        View.input.addEventListener('keyup', function() {
            let filter, ul, li, i;
            filter = View.input.value.toUpperCase();
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
    },

   displayArtistList(artists) {

        for (let artist of artists) {
            const artistList = document.getElementById('artists');
            const ul = document.getElementById('ul');
            const li = document.createElement('li');
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            const addToAlbum = document.createElement('button');
            addToAlbum.innerText = 'Add to album';
            const clickOnArtist = document.createElement('button');
            clickOnArtist.id = artist._id;
            clickOnArtist.dataset.id = artist._id;
            clickOnArtist.innerText = artist.name;
            li.classList.add('artistlist');
            clickOnArtist.addEventListener('click', function() {
                this.dataset.id;
                this.innerText;
                View.addAlbumToArtistId(this);
            });

            deleteButton.addEventListener('click', function(){
                deleteDataModel.registerDeleteArtistClickHandler(clickOnArtist.id);

            });

            artistList.appendChild(ul);
            ul.appendChild(li);
            li.appendChild(clickOnArtist);
            li.appendChild(deleteButton);
            li.appendChild(addToAlbum);

        } //End of loop
         View.filterArtists();
    },
 

     addAlbumToArtistId(element) {
        const addAlbumDiv = document.getElementById('addAlbum');
        const albumButton = document.getElementById('albumButton');
        albumButton.id = element.id;
        albumButton.dataset.id = element.id;

        let artistHeading = document.createElement('h3');
        artistHeading.innerText = element.innerText;

        addAlbumDiv.appendChild(artistHeading);

        Controller.registerCreateAlbumClickHandler(albumButton);
    },


    showAllTracks: document.getElementById("showAllTracks"),


    displayTracksList(tracks) {
        showAllTracks.addEventListener('click', function(){
            for (let track of tracks) {
                const trackContainer = document.getElementById('trackContainer');
                const ul = document.getElementById('trackList');
                const li = document.createElement('li');
                const clickOnTrack = document.createElement('button');
                clickOnTrack.id = track._id;
                clickOnTrack.dataset.id = track._id;
                clickOnTrack.innerText = track.title;
                clickOnTrack.trackId = track._id;
                li.classList.add('trackContainer');
                clickOnTrack.addEventListener('click', function() {
                    this.dataset.id;
                    this.innerText;
                    this.trackId;
                    View.addTrackToPlaylist(this);
                });

                trackContainer.appendChild(ul);
                ul.appendChild(li);
                li.appendChild(clickOnTrack);
            } //End of loop
        })  
    },

    addPlaylist: document.getElementById('playlistButton'),

    addTrackToPlaylist(song) {
        console.log('Playlist id:', song.id);

        console.log('Songtrack id:', song.trackId);

        selectTrack = song.trackId;

    },


    showAllAlbums: document.getElementById("showAllAlbums"),

    displayAlbumList(albums) {
        View.showAllAlbums.addEventListener('click', function(){
            for (let album of albums) {
                const albumContainer = document.getElementById('albumContainer');
                const ul = document.getElementById('albumList');
                const li = document.createElement('li');
                const clickOnAlbum = document.createElement('button');
                clickOnAlbum.id = album._id;
                clickOnAlbum.dataset.id = album._id;
                clickOnAlbum.innerText = album.title;
                clickOnAlbum.artistId = album.artists;
                li.classList.add('albumContainer');
                clickOnAlbum.addEventListener('click', function() {
                    this.dataset.id;
                    this.artistId;
                    this.innerText;
                    View.registerAlbumId(this);
                });

                albumContainer.appendChild(ul);
                ul.appendChild(li);
                li.appendChild(clickOnAlbum);
            } //End of loop
        })
    },


    registerAlbumId(albumId) {
        console.log('Album Id:', albumId.id);
        console.log('Artist Id of clicked album:', albumId.artistId);

        let album = albumId.id;
        let artist = albumId.artistId;
     
        Controller.registerTrackToAlbumClickHandler(album, artist);    
    },

    showAllplaylists: document.getElementById("showAllplaylists"),

    displayPlayLists(playlists) {
        showAllplaylists.addEventListener('click', function(){
            for (let playlist of playlists) {
                const playlistContainer = document.getElementById('playlistContainer');
                const ul = document.getElementById('playList');
                const li = document.createElement('li');
                const clickOnPlaylist = document.createElement('button');
                clickOnPlaylist.id = playlist._id;
                clickOnPlaylist.dataset.id = playlist._id;
                clickOnPlaylist.innerText = playlist.title;
                clickOnPlaylist.createdBy = playlist.createdBy;     
                clickOnPlaylist.trackId = selectTrack;

                li.classList.add('playlistContainer');
                clickOnPlaylist.addEventListener('click', function() {
                    this.trackId;
                    this.dataset.id;
                    this.innerText;
                    View.addTrackToPlaylist(this);

                    Controller.trackArray(this);  
             
                });

                playlistContainer.appendChild(ul);
                ul.appendChild(li);
                li.appendChild(clickOnPlaylist);
            } //End of loop
        })
    },
};


FetchModel.fetchArtists();
FetchModel.fetchAlbums();
FetchModel.fetchTracks();
FetchModel.fetchPlaylist();
Controller.registerCreateArtistClickHandler();


