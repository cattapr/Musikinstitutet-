//Global variables
let selectedArtist = '';
let selectedAlbum = '';
let selectTrack = '';
let commentValue = '';
let ratingValue = '';
let commentBy = '';


const FetchModel = {

    fetchArtists() {
        return fetch('https://folksa.ga/api/artists?key=flat_eric&limit=50&sort=desc')
            .then((response) => response.json())
            .then((artists) => {
                Controller.checkIfArtistExists(artists);
                View.displayArtistList(artists);
            })

            .catch((error) => {
                View.errorMessage();
            });
    },

    fetchAlbums() {
        return fetch('https://folksa.ga/api/albums?key=flat_eric&limit=20&sort=desc&populateArtists=true')
            .then((response) => response.json())
            .then((albums) => {
                View.displayAlbumList(albums);
            })
            .catch((error) => {

            });
    },


    fetchTracks() {
        return fetch('https://folksa.ga/api/tracks?key=flat_eric&limit=50&sort=desc')
            .then((response) => response.json())
            .then((tracks) => {
                View.displayTracksList(tracks);
            })
            .catch((error) => {

            });
    },

    fetchPlaylist() {
        return fetch('https://folksa.ga/api/playlists?key=flat_eric&limit=10&sort=desc')
            .then((response) => response.json())
            .then((playlists) => {
                View.displayPlayLists(playlists);
            })
            .catch((error) => {
    
            });
    },

    fetchSpecificAlbum(albumID, albumCard){
        return fetch(`https://folksa.ga/api/albums/${albumID}?key=flat_eric`)
              .then((response) => response.json())
              .then((album) => {
                for(let track of album.tracks){
                    const container = albumCard;
                    const trackTitle = document.createElement('p');
                    const deleteTrackButton = document.createElement('button');
                    deleteTrackButton.innerText = 'Delete track';
                    trackTitle.innerText = track.title;
                    container.appendChild(trackTitle);
                    trackTitle.appendChild(deleteTrackButton);
                    deleteDataModel.registerDeleteTrackClickHandler(deleteTrackButton, track._id);
                }
              });
    },

     fetchCommentsforSpecificPlaylist(viewCommentsButton) {
        let playlistID = viewCommentsButton.dataset.id;
        return fetch(`https://folksa.ga/api/playlists/${playlistID}/comments?key=flat_eric`)
            .then((response) => response.json())
            .then((comments) => {
                for(comment of comments){
                    const container = viewCommentsButton.parentElement;
                    const commentContainer = document.createElement('div');
                    const commentBody = document.createElement('p');
                    const commentUser = document.createElement('p');
                    const deleteComment = document.createElement('button');
                    commentContainer.className = 'commentContainer';
                    deleteComment.innerText = 'Delete comment';
                    deleteComment.className = 'deleteComment';
                    commentBody.innerHTML = `Comment: ${comment.body}`;
                    commentUser.innerHTML = `By: ${comment.username}`;
                    container.appendChild(commentContainer);
                    commentContainer.appendChild(commentBody);
                    commentContainer.appendChild(commentUser);
                    commentContainer.appendChild(deleteComment);
                    deleteDataModel.registerDeleteCommentClickHandler(deleteComment, comment._id);
                };
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
                updateModel.fetchUpdatedArtists();
            })
            .catch((error) => {
                View.errorMessage();
            });
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
                selectedAlbum = Controller.getAlbumId(albums);
                selectedArtist = Controller.getArtistId(albums);
                fetchUpdatedAlbums();
            })
            .catch((error) => {
                View.errorMessage();
            });
    },

    postTrack(track) {
        return fetch('https://folksa.ga/api/tracks?key=flat_eric', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(track)
            })
            .then((response) => response.json())
            .then((postedTrack) => {
            })
            .catch((error) => {
                View.errorMessage();
            });
    },

    postPlaylist(playlist) {
        return fetch('https://folksa.ga/api/playlists?key=flat_eric', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(playlist)
            })

            .then((response) => response.json())
            .then((playlist) => {

            })
            .catch((error) => {
                View.errorMessage();
            });
    },

    getPlaylistComment(playlistid) {
        let playlistID = playlistid;

        let comment = {
            playlist: playlistid,
            body: commentValue,
            username: commentBy
        }
        postModel.postCommentToPlaylist(playlistID, comment)
    },


    postCommentToPlaylist(playlistID, comment) {
        return fetch(`https://folksa.ga/api/playlists/${playlistID}/comments?key=flat_eric`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(comment)
            })

            .then((response) => response.json())
            .then((playlist) => {
            })

            .catch((error) => {
                View.errorMessage();
            });
    },

    playlistRating(playlistid) {
        let playlistID = playlistid;
        let vote = ratingValue;
        postModel.postVoteToPlaylist(playlistID, vote);
    },

    postVoteToPlaylist(playlistID, vote) {
        return fetch(`https://folksa.ga/api/playlists/${playlistID}/vote?key=flat_eric`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ rating: vote })
            })

            .then((response) => response.json())
            .then((playlist) => {
            });
    }
};


const updateModel = {

    fetchUpdatedAlbums() {
        return fetch('https://folksa.ga/api/albums?key=flat_eric&limit=50&sort=desc')
            .then((response) => response.json())
            .then((albums) => {
                View.displayAlbumList(albums);
            })
            .catch((error) => {
                View.errorMessage();
            });
    },

    fetchUpdatedArtists() {
        return fetch('https://folksa.ga/api/artists?key=flat_eric&limit=50&sort=desc')
            .then((response) => response.json())
            .then((artists) => {
                View.displayArtistList(artists);
            })
            .catch((error) => {
                View.errorMessage();
            });
    },

    changeAlbumTitle(album) {
        let updates = {
            title: changedAlbumTitle,
        }

        let albumID = album;
        updateModel.updateAlbumTitle(albumID, updates);
    },

    updateAlbumTitle(albumID, updates) {
        return fetch(`https://folksa.ga/api/albums/${albumID}?key=flat_eric`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updates)
            })
            .then((response) => response.json())
            .then((album) => {

            });
    },

    changePlaylistTitle(playlist) {
        let updates = {
            title: changedPlaylistTitle,
        }

        let playlistID = playlist;
        updateModel.updatePlaylistTitle(playlistID, updates);
    },

    updatePlaylistTitle(playlistID, updates) {
        return fetch(`https://folksa.ga/api/playlists/${playlistID}?key=flat_eric`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updates)
            })
            .then((response) => response.json())
            .then((playlist) => {
            });
    }
};


const deleteDataModel = {

    deleteArtist(deleteArtistButton) {
        let artistID = deleteArtistButton.dataset.id;
        return fetch(`https://folksa.ga/api/artists/${artistID}?key=flat_eric`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((artist) => {
            })
            .catch((error) => {
                View.errorMessage();
            });
    },


    deleteAlbum(deleteAlbumButton) {
        let albumID = deleteAlbumButton.dataset.id;
        return fetch(`https://folksa.ga/api/albums/${albumID}?key=flat_eric`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => response.json())
            .then((album) => {
            })
            .catch((error) => {
                View.errorMessage();
            });
    },

    registerDeleteTrackClickHandler(deleteTrackButton, track){
        deleteTrackButton.onclick = function deleteTrackFromAlbum(){
        let trackID = track;
        return fetch(`https://folksa.ga/api/tracks/${trackID}?key=flat_eric`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => response.json())
            .then((track) => {
            })
            .catch((error) => {
                View.errorMessage();
            });
        };    
    },

    deleteTrack(deleteTrackButton) {
        let trackID = deleteTrackButton.dataset.id;
        return fetch(`https://folksa.ga/api/tracks/${trackID}?key=flat_eric`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => response.json())
            .then((track) => {
            })
            .catch((error) => {
                View.errorMessage();
            });
    },

    deletePlaylist(deletePlaylistButton) {
        let playlistID = deletePlaylistButton.dataset.id;
        return fetch(`https://folksa.ga/api/playlists/${playlistID}?key=flat_eric`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => response.json())
            .then((playlist) => {
            })

            .catch((error) => {
                View.errorMessage();
            });
    },

    registerDeleteCommentClickHandler(deleteButton, commentsID){
        deleteButton.onclick = function deleteAcomment() {
            return fetch(`https://folksa.ga/api/comments/${commentsID}?key=flat_eric`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },

                })
                .then((response) => response.json())
                .then((comment) => {
                });
        }
    }
};



const Controller = {
    checkIfArtistExists(artists) {
        for (var i = 0; i < artists.length; i++) {
            var id = artists[i]._id;
            var nameOfArtist = artists[i].name;
            id = nameOfArtist;
            let inputname = View.getinputName();

            if (id == inputname) {
                console.log("Artist already exists", id);
            } else {
                console.log("not match");
            }
        }
    },

    getAlbumId(albums) {
        let albumId = albums._id;
        return albumId;
    },

    getArtistId(albums) {
        let artistId = albums.artists.join(',');

        return artistId;
    },

    submitButton: document.getElementById('submitButton'),

    registerCreateArtistClickHandler() {
        submitButton.onclick = function createArtist() {
            let artistName = View.getinputName();
            let artistGenre = View.getinputGenre();

            if (artistName === "" || artistGenre === "") {
                const errorContainer = document.getElementById('emptyInput');
                let errorMessage = document.getElementById('error');
                errorMessage.innerText = 'You need to fill in both fields!';
            } else {
                let artist = {
                    name: View.getinputName(),
                    gender: "other",
                    genres: View.getinputGenre(), //Must be a comma separated string
                    spotifyURL: "https://open.spotify.com/artist/6zHRqvws8dVeqL8D31ponr?si=QFWoLwwBTa-KrR3gUcLMYQ",
                    coverImage: "https://img.discogs.com/D7eDvyQrOJIJlDX-ieliD0QmAG4=/500x500/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/A-71872-1426020311-7115.jpeg.jpg"
                }
                postModel.postArtist(artist);
            }
        };
    },  

    addAlbumButton: document.getElementById('albumButton'),

    registerAddAlbumButtonClickHandler() {
        Controller.addAlbumButton.onclick = function errorMessage() {
            const errorMessage = document.getElementById('chooseArtistErrorMsg');
            let errorMessageText = document.getElementById('errorMsgText');
            errorMessageText.innerText = 'You need to choose an artist first!';
        }
    },

    registerCreateAlbumClickHandler(albumButton) {
        let id = albumButton.id;
        let button = albumButton;

        button.onclick = function createAlbum() {
            let albumTitle = View.getinputAlbumTitle();
            let albumReleaseDate = View.getinputAlbumReleaseDate();
            let albumGenre = View.getinputAlbumGenre();

            if (albumTitle === "" || albumReleaseDate === "" || albumGenre === "") {
                let errorMessage = document.getElementById('errorMsgCreateAlbum');
                errorMessage.innerText = 'You need to fill in all fields!';

            } else {

                let album = {
                    title: View.getinputAlbumTitle(),
                    artists: id, //Can be multiple IDs, must be comma separated string if multiple
                    releaseDate: View.getinputAlbumReleaseDate(),
                    genres: View.getinputAlbumGenre(), //Must be a comma separated string
                    spotifyURL: "https://open.spotify.com/album/1jKfTvT64lcQwA74WmkKiJ?si=nmdUZ2UpS4uUknUrGX1smg",
                    coverImage: "https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Tim_Buckley_-_Goodbye_And_Hello.jpg/220px-Tim_Buckley_-_Goodbye_And_Hello.jpg"
                }
                postModel.postAlbum(album);
            }
        }
    },

    addTrackButton: document.getElementById('trackButton'),

    registerAddTrackButtonClickHandler() {   
        Controller.addTrackButton.onclick = function errorMessage() {
            const errorMessage = document.getElementById('addTrackErrorMsg');
            let errorMessageText = document.getElementById('errorMsg');
            errorMessageText.innerText = 'You need to choose an album to add a new track!';
        }
    },

    trackButton: document.getElementById('trackButton'),

    registerTrackTitleToAlbumClickHandler(artistId) {
        Controller.trackButton.onclick = function createTrack() {
            let trackTitle = View.getinputAlbumTrack();
            if (trackTitle === "") {
                let errorMessage = document.getElementById('errorMsgAddTrack');
                errorMessage.innerText = 'You need to fill in a track name!';

            } else {

            let track = {
                title: View.getinputAlbumTrack(),
                artists: artistId, // Must be a string with comma separated values
                album: selectedAlbum, // Must be a string with comma separated values
                genres: "Folk,Rock"
            }
            postModel.postTrack(track);
        }
     }

    },

    createPlaylistButton: document.getElementById('playlistButton'),

    registerCreatePlaylistButtonClickHandler() {
        Controller.createPlaylistButton.onclick = function errorMessage() {
            const errorMessage = document.getElementById('createPlaylistErrorMsg');
            let errorMessageText = document.getElementById('errorTextMsg');
            errorMessageText.innerText = 'You need to choose a track first if you want to create a new playlist!';
        }
    },

    registerTrackToPlaylistClickHandler() {
        let addPlaylistButton = View.addPlaylist;
        addPlaylistButton.onclick = function createPlaylist() {
            let playlist = {
                title: View.getinputPlaylist(),
                genres: "Folk, Folk Rock",
                createdBy: View.getinputCreatedBy(),
                tracks: selectTrack,
                coverImage: "https://www.internetmuseum.se/wordpress/wp-content/uploads/compisknappar-504x329.jpg",
                coverImageColor: "#000"
            }
            postModel.postPlaylist(playlist);
        }
    },

    registerTrackIdandPlaylistId(clickOnPlaylistButton) {
        let tracks = selectTrack;
        let playlist = clickOnPlaylistButton.dataset.id;

        Controller.postTrackToPlaylist(playlist, tracks);
    },

    postTrackToPlaylist(playlist, tracks) {
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
            });
    }
};


const View = {

    errorMessage() {
        const errorMessageContainer = document.getElementById('errorMessage');
        const errorMessage = document.getElementById('errorText');
        errorMessage.innerText = 'Something went wrong, please try again!';
        errorMessageContainer.appendChild(errorMessage);
    },

    getinputName() {
        let getinputName = document.getElementById('name').value;
        return getinputName;
    },

    getinputGenre() {
        let getinputGenre = document.getElementById('genre').value;
        return getinputGenre;
    },

    getinputAlbumTitle() {
        let albumTitle = document.getElementById('albumTitle').value;
        return albumTitle;
    },

    getinputAlbumReleaseDate() {
        let albumReleaseDate = document.getElementById('albumRelease').value;
        return albumReleaseDate;
    },

    getinputAlbumGenre() {
        let albumGenre = document.getElementById('albumGenre').value;
        return albumGenre;
    },

    getinputAlbumTrack() {
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

    input1: document.getElementById("myInput1"),

    input2: document.getElementById("myInput2"),

    filterArtists() {
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
            } 
        })
    },

    filterAlbums() {
        View.input1.addEventListener('keyup', function() {
            let filter, ul, li, i;
            filter = View.input1.value.toUpperCase();

            ul = document.getElementById("albumslist");
            li = ul.getElementsByTagName("li");

            for (i = 0; i < li.length; i++) {
                if (li[i].innerText.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "block";
                } else {
                    li[i].style.display = "none";
                }
            } 
        })
    },

    filterTracks() {
        View.input2.addEventListener('keyup', function() {
            let filter, ul, li, a, i;
            filter = View.input2.value.toUpperCase();

            ul = document.getElementById("tracklist");
            li = ul.getElementsByTagName("li");

            for (i = 0; i < li.length; i++) {
                if (li[i].innerText.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "block";
                } else {
                    li[i].style.display = "none";
                }
            } 
        })
    },

    displayArtistList(artists) {

        for (let artist of artists) {
            const artistList = document.getElementById('artists');
            const ul = document.getElementById('ul');
            const li = document.createElement('li');
            const deleteButton = document.createElement('button');
            deleteButton.dataset.id = artist._id;
            deleteButton.innerText = 'Delete';
            deleteButton.className = 'deleteButtonArtist';
            
            const clickOnArtist = document.createElement('a');
            clickOnArtist.id = artist._id;
            clickOnArtist.dataset.id = artist._id;
            clickOnArtist.innerText = artist.name;
            li.classList.add('artistlist');
            clickOnArtist.addEventListener('click', function() {
                this.dataset.id;
                this.innerText;
                View.addArtistIdToAlbumButton(this);
            });

            deleteButton.addEventListener('click', function() {
                deleteDataModel.deleteArtist(this);

            });

            artistList.appendChild(ul);
            ul.appendChild(li);
            li.appendChild(clickOnArtist);
            li.appendChild(deleteButton);

        } 
        View.filterArtists();
    },

    displayChosenArtist(element){
        let artistHeading = document.getElementById('artistHeading');
        artistHeading.innerText = element.innerText;
        return artistHeading;
    },

    addArtistIdToAlbumButton(element) {
        const addAlbumDiv = document.getElementById('addAlbum');
        const albumButton = document.getElementById('albumButton');
        albumButton.id = element.id;
        albumButton.dataset.id = element.id;

        View.displayChosenArtist(element);

        Controller.registerCreateAlbumClickHandler(albumButton);
    },

    displayChosenTrack(track){
        let trackHeading = document.getElementById('trackHeading');
        trackHeading.innerText = track.innerText;
        return trackHeading;
    },

    displayTracksList(tracks) {
        for (let track of tracks) {
            const tracksList = document.getElementById('tracks');
            const ul = document.getElementById('tracklist');
            ul.className = 'tracklist';
            const li = document.createElement('li');
            const clickOnTrack = document.createElement('a');
            const deleteTrack = document.createElement('button');
            deleteTrack.dataset.id = track._id;
            deleteTrack.className = 'deleteTrack';
            deleteTrack.innerText = 'Delete Track';
            clickOnTrack.id = track._id;
            clickOnTrack.dataset.id = track._id;
            clickOnTrack.innerText = track.title;
            clickOnTrack.trackId = track._id;
            li.classList.add('trackContainer');
            clickOnTrack.addEventListener('click', function() {
                this.dataset.id;
                this.innerText;
                this.trackId;
                View.displayChosenTrack(this);
                View.addTrackToPlaylist(this);
            });

            deleteTrack.addEventListener('click', function() {
                deleteDataModel.deleteTrack(this);
            });

            tracksList.appendChild(ul);
            ul.appendChild(li);
            li.appendChild(clickOnTrack);
            li.appendChild(deleteTrack);
        } 

        View.filterTracks();
        View.filterTracksinPlaylistContainer();
    },

    addPlaylist: document.getElementById('playlistButton'),

    addTrackToPlaylist(song) {
        selectTrack = song.trackId;
        Controller.registerTrackToPlaylistClickHandler();

    },

    displayAlbumList(albums) {
        for (let album of albums) {
            for (let artist of album.artists) {
                const albumList = document.getElementById('albums');
                const ul = document.getElementById('albumslist');
                const li = document.createElement('li');

                const albumCard = document.createElement('div');
                const albumCardAction = document.createElement('div');
                const albumTitle = document.createElement('p');

                const clickOnAlbum = document.createElement('a');
                const albumArtist = document.createElement('span');

                const showAlbumAction = document.createElement('button');
                const deleteAlbum = document.createElement('button');
                const updateAlbum = document.createElement('button');

                let albumID = album._id;
                FetchModel.fetchSpecificAlbum(albumID,albumCard);

                albumCard.className = 'albumCard';
                albumCardAction.className = 'albumCardAction';
                clickOnAlbum.className = 'clickOnAlbum';
                showAlbumAction.className = 'showAlbumAction';
                deleteAlbum.className = 'deleteAlbum';
                updateAlbum.className = 'updateAlbum';

                deleteAlbum.dataset.id = album._id;
                clickOnAlbum.id = album._id;
                clickOnAlbum.dataset.id = album._id;
                clickOnAlbum.artistId = album.artists;

                clickOnAlbum.innerText = album.title;
                albumTitle.innerText = album.title;
                showAlbumAction.innerText = 'Edit';
                updateAlbum.innerText = 'Update';
                deleteAlbum.innerText = 'Delete Album';
                albumArtist.innerText = artist.name;

                const coverAlbum = document.createElement('img');
                coverAlbum.className = 'coverAlbum';
                const coverAlbumSrc = album.coverImage;
                coverAlbum.setAttribute('onerror', 'src="images/no-cover.png"');
                coverAlbum.setAttribute('src', coverAlbumSrc);

                let inputChangeAlbumTitle = document.createElement('input');
                const inputChangeAlbumLabel = document.createElement('label');
                inputChangeAlbumTitle.setAttribute('type', 'text');
                inputChangeAlbumTitle.setAttribute('placeholder', 'Change title here');
                inputChangeAlbumLabel.innerText = 'Update album title';

                clickOnAlbum.addEventListener('click', function() {
                    this.dataset.id;
                    this.artistId;
                    this.innerText;
                    View.registerAlbumIdandArtistId(this);
                });

                deleteAlbum.addEventListener('click', function() {
                    deleteDataModel.deleteAlbum(this);
                });

                updateAlbum.addEventListener('click', function() {
                    changedAlbumTitle = inputChangeAlbumTitle.value;
                    updateModel.changeAlbumTitle(clickOnAlbum.id);
                });

                albumCardAction.style.display = "none";

                showAlbumAction.addEventListener('click', function() {
                    if (albumCardAction.style.display === "none") {
                        albumCardAction.style.display = "block";
                    } else {
                        albumCardAction.style.display = "none";
                    }
                })


                albumList.appendChild(ul);
                ul.appendChild(li);
                li.appendChild(clickOnAlbum);

                albumContainer.appendChild(albumCard);

                albumCard.appendChild(coverAlbum);
                albumCard.appendChild(albumTitle);
                albumCard.appendChild(albumArtist);


                albumCard.appendChild(showAlbumAction);
                albumCard.appendChild(albumCardAction);

                albumCardAction.appendChild(inputChangeAlbumLabel);
                albumCardAction.appendChild(inputChangeAlbumTitle);
                albumCardAction.appendChild(updateAlbum);
                albumCardAction.appendChild(deleteAlbum);

            }
        } //End of loop

        View.filterAlbums();
    },

      displayChosenAlbum(album){
        let albumHeading = document.getElementById('albumHeading');
        albumHeading.innerText = album.innerText;
        return albumHeading;
    },


    registerAlbumIdandArtistId(album) {
        let artistId = album.artists;
            selectedArtist = album.artistId;
            selectedAlbum = album.id;

            View.displayChosenAlbum(album);

            Controller.registerTrackTitleToAlbumClickHandler(artistId);
    },

    showAllplaylists: document.getElementById("showAllplaylists"),

        displayPlayLists(playlists) {

        const playlistContainer = document.getElementById('playlistContainer');
        const table = document.createElement('table');
        table.className = "tablePlaylist";
        playlistContainer.appendChild(table);

        let thPlaylist = document.createElement('th');
        thPlaylist.innerText = 'Playlist';

        let thCreatedBy = document.createElement('th');
        thCreatedBy.innerText = 'Created by';

        let thRating = document.createElement('th');
        thRating.innerText = 'Rating';

        let thShowMore = document.createElement('th');
        thShowMore.innerText = 'Show more';

        table.appendChild(thPlaylist);
        table.appendChild(thCreatedBy);
        table.appendChild(thRating);
        table.appendChild(thShowMore);

        for (let playlist of playlists) {
            const playlistContainer = document.getElementById('playlistContainer');

            let inputChangePlaylistTitle = document.createElement('input');
            inputChangePlaylistTitle.setAttribute('type', 'text');
            inputChangePlaylistTitle.setAttribute('placeholder', 'New title')

            let rating = document.createElement('input');
            rating.setAttribute('type', 'number');
            rating.setAttribute('max', 10);
            rating.setAttribute('min', 0);

            let ratingButton = document.createElement('button');
            ratingButton.className = 'ratingButton';
            ratingButton.innerText = 'Vote';

            let inputComment = document.createElement('textarea');
            inputComment.setAttribute('type', 'text');
            inputComment.setAttribute('rows', 8);
            inputComment.setAttribute('cols', 50);
            inputComment.setAttribute('placeholder', 'Write your heart out.');
            
            let inputCommentBy = document.createElement('input');
            inputCommentBy.setAttribute('type', 'text');
            inputCommentBy.setAttribute('placeholder', 'Ex. The Commentor');
            
            const inputCommentButton = document.createElement('button');
            inputCommentButton.className = 'inputCommentButton';
            inputCommentButton.innerText = "Fire away";

            const clickOnPlaylist = document.createElement('button');
            clickOnPlaylist.className = 'clickOnPlaylist';

            const deletePlaylist = document.createElement('button');
            const updatePlaylist = document.createElement('button');
            const showMorePlaylist = document.createElement('button');
            let viewComments = document.createElement('button');
            
            deletePlaylist.innerText = 'Delete Playlist';
            updatePlaylist.innerText = 'Update Playlist';
            showMorePlaylist.innerText = 'View songs';
            viewComments.innerText = 'View all comments';
            
            deletePlaylist.dataset.id = playlist._id;
            deletePlaylist.className = 'deletePlaylist';
            updatePlaylist.className = 'updatePlaylist';
            showMorePlaylist.className = 'showMorePlaylist';
            viewComments.className = 'viewComments';
            
            let singlePlaylistContainer = document.createElement('ol');
            singlePlaylistContainer.className = "singlePlaylistContainer";
            
            let singlePlaylistAction = document.createElement('div');
            singlePlaylistAction.className = 'singlePlaylistAction';
            
            const editPlaylistButton = document.createElement('button');
            editPlaylistButton.innerText = 'Edit playlist';
            editPlaylistButton.className = 'editPlaylistButton';
            
            const labelEditPlaylist = document.createElement('label');
            const labelVote = document.createElement('label');
            const labelComment = document.createElement('label');
            const labelCommentBy = document.createElement('label');
            
            labelEditPlaylist.innerText = 'Edit playlist title';
            labelVote.innerText = 'Vote (1-10)';
            labelComment.innerText = 'Comment';
            labelCommentBy.innerText = 'Comment by';
            
            viewComments.dataset.id = playlist._id;

            clickOnPlaylist.id = playlist._id;
            clickOnPlaylist.dataset.id = playlist._id;
            clickOnPlaylist.innerText = '+';
            clickOnPlaylist.createdBy = playlist.createdBy;
            clickOnPlaylist.trackId = selectTrack;
    
            clickOnPlaylist.addEventListener('click', function() {
                this.trackId;
                this.dataset.id;
                this.innerText;
                Controller.registerTrackIdandPlaylistId(this);
            });

            inputCommentButton.addEventListener('click', function() {
                commentValue = inputComment.value
                commentBy = inputCommentBy.value;
                postModel.getPlaylistComment(clickOnPlaylist.dataset.id);
            });

            deletePlaylist.addEventListener('click', function() {
                deleteDataModel.deletePlaylist(this);
            });

            updatePlaylist.addEventListener('click', function() {
                changedPlaylistTitle = inputChangePlaylistTitle.value;
                updateModel.changePlaylistTitle(clickOnPlaylist.id);
            });

            ratingButton.addEventListener('click', function() {
                ratingValue = rating.value;
                postModel.playlistRating(clickOnPlaylist.dataset.id);
            });

            viewComments.addEventListener('click', function() {
                FetchModel.fetchCommentsforSpecificPlaylist(this);
            });


            function renderHtmlSinglePlaylist() {
                singlePlaylistContainer.innerHTML = `
                            <h4>Tracks</h4>
                            `;     
                for (let track of playlist.tracks) {
                   
                    
                    for (let artist of track.artists) {

                        singlePlaylistContainer.innerHTML += `
                                
                            <li>${artist.name} - ${track.title}</li>
                                `;

                    }
                }
                
                singlePlaylistAction.style.display = "none";

                editPlaylistButton.addEventListener('click', function() {
                    if (singlePlaylistAction.style.display === "none") {
                        singlePlaylistAction.style.display = "block";
                    } else {
                        singlePlaylistAction.style.display = "none";
                    }
                })
                
                
                singlePlaylistContainer.appendChild(singlePlaylistAction);
                singlePlaylistContainer.appendChild(viewComments);
                
                singlePlaylistContainer.appendChild(editPlaylistButton);
                singlePlaylistAction.appendChild(labelEditPlaylist); 
                singlePlaylistAction.appendChild(inputChangePlaylistTitle);
                singlePlaylistAction.appendChild(updatePlaylist);
                singlePlaylistAction.appendChild(deletePlaylist);
         
                singlePlaylistAction.appendChild(labelVote);
                singlePlaylistAction.appendChild(rating);
                singlePlaylistAction.appendChild(ratingButton);
                
                singlePlaylistAction.appendChild(labelCommentBy)
                singlePlaylistAction.appendChild(inputCommentBy);
                singlePlaylistAction.appendChild(labelComment);
                singlePlaylistAction.appendChild(inputComment);
                singlePlaylistAction.appendChild(inputCommentButton);
                
            };


            for (var i = 0; i < 1; i++) {

                function sumOfRatings() {
                    let ratingOfPlaylist = playlist.ratings;
                    var ratingSum = 0;
                    for (var i = 0; i < ratingOfPlaylist.length; i++) {
                        ratingSum += ratingOfPlaylist[i];
                    }

                    return ratingSum;
                };

                let tr = document.createElement('tr');
                table.appendChild(tr);
                let playlistTd = document.createElement('td');
                playlistTd.innerText = playlist.title;
                let createdByTd = document.createElement('td');
                createdByTd.innerText = playlist.createdBy;
                let ratingsTd = document.createElement('td');
                ratingsTd.innerText = sumOfRatings();
                let showmore = document.createElement('td');


                createdByTd.innerText = playlist.createdBy;

                tr.appendChild(playlistTd);
                playlistTd.appendChild(clickOnPlaylist);
                tr.appendChild(createdByTd);
                tr.appendChild(ratingsTd);
                tr.appendChild(showmore);

                showmore.appendChild(showMorePlaylist);
                table.appendChild(singlePlaylistContainer);

            }
            singlePlaylistContainer.style.display = "none";

            showMorePlaylist.addEventListener('click', function() {
                if (singlePlaylistContainer.style.display === "none") {
                    singlePlaylistContainer.style.display = "block";

                } else {
                    singlePlaylistContainer.style.display = "none";
                }
            })

            renderHtmlSinglePlaylist();
        } //End of loop
    },
};


FetchModel.fetchArtists();
FetchModel.fetchAlbums();
FetchModel.fetchTracks();
FetchModel.fetchPlaylist();
Controller.registerAddAlbumButtonClickHandler(); 
Controller.registerAddTrackButtonClickHandler();
Controller.registerCreatePlaylistButtonClickHandler();
Controller.registerCreateArtistClickHandler();