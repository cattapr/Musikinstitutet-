//Global variables
let selectedArtist = '';
let selectedAlbum = '';
let selectTrack = '';
let commentValue = '';
let ratingValue = '';
let commentBy = '';


const FetchModel = {

    fetchArtists() {
        return fetch('https://folksa.ga/api/artists?key=flat_eric&limit=50')
            .then((response) => response.json())
            .then((artists) => {
                console.log(artists);
                Controller.checkIfArtistExists(artists);
                View.displayArtistList(artists);
            })

            .catch((error) => {
                console.log(error);
                console.log('det funkar inte');
                View.errorMessage();
            });
    },

    fetchAlbums() {
        return fetch('https://folksa.ga/api/albums?key=flat_eric&limit=20&populateArtists=true')
            .then((response) => response.json())
            .then((albums) => {
                console.log('Albums', albums);
                View.displayAlbumList(albums);
            })

            .catch((error) => {
                console.log(error);
            });
    },


    fetchTracks() {
        return fetch('https://folksa.ga/api/tracks?key=flat_eric&limit=50')
            .then((response) => response.json())
            .then((tracks) => {
                View.displayTracksList(tracks);
                console.log('tracks:', tracks);
            })
            .catch((error) => {
                console.log(error);
            });
    },

    fetchPlaylist() {
        return fetch('https://folksa.ga/api/playlists?key=flat_eric&limit=10')
            .then((response) => response.json())
            .then((playlists) => {
                console.log('playlist:', playlists);
                View.displayPlayLists(playlists);
            })
            .catch((error) => {
                console.log(error);
            });
    },

    fetchComments() {
        return fetch(`https://folksa.ga/api/comments?key=flat_eric`)
            .then((response) => response.json())
            .then((comments) => {
                console.log('All comments: ', comments);
            });
    },

    fetchCommentsforSpecifikPlaylist(playlistID) {
        let playlist = playlistID.id;
        return fetch(`https://folksa.ga/api/playlists/${playlist}/comments?key=flat_eric`)
            .then((response) => response.json())
            .then((comments) => {
                for(comment of comments){
                const container = playlistID.parentElement;
                const commentBody = document.createElement('p');
                const commentUser = document.createElement('p');
                const deleteComment = document.createElement('button');
                deleteComment.innerText = 'Delete comment';
                commentBody.innerHTML = `Comment: ${comment.body}`;
                commentUser.innerHTML = `By: ${comment.username}`;
                container.appendChild(commentBody);
                container.appendChild(commentUser);
                container.appendChild(deleteComment);
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
                console.log(artist);
                updateModel.updateArtists();
            })
            .catch((error) => {
                console.log(error);
                console.log('det funkar inte');
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
                console.log('New album:', albums);
                selectedAlbum = Controller.getAlbumId(albums);
                selectedArtist = Controller.getArtistId(albums);
            })

            .catch((error) => {
                console.log(error);
                console.log('det funkar inte');
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
                console.log('One track:', postedTrack);
            })

            .catch((error) => {
                console.log(error);
                console.log('det funkar inte');
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
                console.log(playlist);
            })

            .catch((error) => {
                console.log(error);
                console.log('det funkar inte');
                View.errorMessage();
            });
    },

    getPlaylistComment(playlistID) {
        let playlistid = playlistID;

        let comment = {
            playlist: playlistid,
            body: commentValue,
            username: commentBy
        }
        postModel.postCommentToPlaylist(playlistid, comment)
    },


    postCommentToPlaylist(playlistid, comment) {
        return fetch(`https://folksa.ga/api/playlists/${playlistid}/comments?key=flat_eric`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(comment)
            })

            .then((response) => response.json())
            .then((playlist) => {
                console.log(playlist);
            })

            .catch((error) => {
                console.log(error);
                console.log('det funkar inte');
                View.errorMessage();
            });
    },

    playlistRating(playlist) {
        let playlistID = playlist;
        let vote = ratingValue;
        postModel.voteOnPlaylist(playlistID, vote);
    },

    voteOnPlaylist(playlistID, vote) {
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
                console.log(playlist);
            });
    }
};


const updateModel = {

    updateAlbums() {
        return fetch('https://folksa.ga/api/albums?key=flat_eric')
            .then((response) => response.json())
            .then((albums) => {
                console.log('Albums:', albums);
            })
            .catch((error) => {
                console.log(error);
                console.log('det funkar inte');
                View.errorMessage();
            });
    },

    updateArtists() {
        return fetch('https://folksa.ga/api/artists?key=flat_eric&sort=asc&limit=50')
            .then((response) => response.json())
            .then((artists) => {
                console.log('update:', artists);
                View.displayArtistList(artists);
            })
            .catch((error) => {
                console.log(error);
                console.log('det funkar inte');
                View.errorMessage();
            });
    },

    changeAlbumTitle(album) {
        let updates = {
            title: changedAlbumTitle,
        }

        let albumID = album;
        console.log(updates, albumID);
        updateModel.updateAspecifikAlbum(albumID, updates);
    },

    updateAspecifikAlbum(albumID, updates) {
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
                console.log('Update album Title:', album);
            });
    },

    changePlaylistTitle(playlist) {
        let updates = {
            title: changedPlaylistTitle,
        }

        let playlistID = playlist;
        console.log(updates, playlistID);
        updateModel.updateAspecifikPlaylist(playlistID, updates);

    },

    updateAspecifikPlaylist(playlistID, updates) {
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
                console.log('Update playlist Title:', playlist);
            });
    }
};


const deleteDataModel = {

    deleteArtist(artistID) {
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
            })
            .catch((error) => {
                console.log(error);
                console.log('det funkar inte');
                View.errorMessage();
            });
    },


    deleteAlbum(albumID) {
        return fetch(`https://folksa.ga/api/albums/${albumID}?key=flat_eric`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => response.json())
            .then((album) => {
                console.log(album);
            })
            .catch((error) => {
                console.log(error);
                console.log('det funkar inte');
                View.errorMessage();
            });
    },

    deleteTrack(trackID) {
        return fetch(`https://folksa.ga/api/tracks/${trackID}?key=flat_eric`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => response.json())
            .then((track) => {
                console.log(track);
            })
            .catch((error) => {
                console.log(error);
                console.log('det funkar inte');
                View.errorMessage();
            });
    },

    deletePlaylist(playlistID) {
        return fetch(`https://folksa.ga/api/playlists/${playlistID}?key=flat_eric`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => response.json())
            .then((playlist) => {
                console.log(playlist);
            })

            .catch((error) => {
                console.log(error);
                console.log('det funkar inte');
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
                    console.log(comment);
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
        console.log(albumId);
        return albumId;
    },

    getArtistId(albums) {
        let artistId = albums.artists.join(',');
        console.log(artistId);
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

    addAlbumbutton() {
        const addAlbumButton = document.getElementById('albumButton');
        addAlbumButton.onclick = function() {
            const errorMessage = document.getElementById('chooseArtistErrorMsg');
            let errorMessageText = document.getElementById('errorMsgText');
            errorMessageText.innerText = 'You need to choose an artist first!';
        }
    },

    registerCreateAlbumClickHandler(albumButton) {
        let id = albumButton.id;
        let button = albumButton;

        button.onclick = function createAlbum() {
            let albumTitle = View.albumTitle();
            let albumReleaseDate = View.albumReleaseDate();
            let albumGenre = View.albumGenre();

            if (albumTitle === "" || albumReleaseDate === "" || albumGenre === "") {
                console.log("you need to fill in all fields!");

            } else {

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
        }
    },

    addTrackButton() {
        const addTrackButton = document.getElementById('trackButton');
        addTrackButton.onclick = function() {
            const errorMessage = document.getElementById('addTrackErrorMsg');
            let errorMessageText = document.getElementById('errorMsg');
            errorMessageText.innerText = 'You need to choose an album to add a new track!';
        }
    },

    trackButton: document.getElementById('trackButton'),

    registerTrackTitleToAlbumClickHandler(artistId) {
        trackButton.onclick = function createTrack() {
            let track = {
                title: View.albumTrack(),
                artists: artistId, // Must be a string with comma separated values
                album: selectedAlbum, // Must be a string with comma separated values
                genres: "Folk,Rock"
            }
            console.log(track);
            postModel.postTrack(track);
        }
    },

    createPlaylistButton() {
        const createPlaylistButton = document.getElementById('playlistButton');
        createPlaylistButton.onclick = function() {
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
            console.log('hej');
            postModel.postPlaylist(playlist);
        }
    },

    trackArray(playlistID) {
        let tracks = selectTrack;
        let playlist = playlistID.dataset.id;

        Controller.postTrackToPlaylist(playlist, tracks);
        console.log('Innehåller den id?', tracks);
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
                console.log('new track to playlist:', playlist);
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
            } //End of loop
        })
    },

    filterAlbums() {
        View.input1.addEventListener('keyup', function() {
            console.log('all');
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
            } //End of loop
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
            deleteButton.className = 'deleteButtonArtist';
            const clickOnArtist = document.createElement('a');
            clickOnArtist.id = artist._id;
            clickOnArtist.dataset.id = artist._id;
            clickOnArtist.innerText = artist.name;
            li.classList.add('artistlist');
            clickOnArtist.addEventListener('click', function() {
                this.dataset.id;
                this.innerText;
                View.addAlbumToArtistId(this);
            });

            deleteButton.addEventListener('click', function() {
                deleteDataModel.deleteArtist(clickOnArtist.id);

            });

            artistList.appendChild(ul);
            ul.appendChild(li);
            li.appendChild(clickOnArtist);
            li.appendChild(deleteButton);

        } //End of loop
        View.filterArtists();
    },


    addAlbumToArtistId(element) {
        const addAlbumDiv = document.getElementById('addAlbum');
        const albumButton = document.getElementById('albumButton');
        albumButton.id = element.id;
        albumButton.dataset.id = element.id;

        let artistHeading = document.getElementById('artistHeading');
        artistHeading.innerText = element.innerText;

        Controller.registerCreateAlbumClickHandler(albumButton);
    },

    displayTracksList(tracks) {
        for (let track of tracks) {
            const tracksList = document.getElementById('tracks');
            const ul = document.getElementById('tracklist');
            const li = document.createElement('li');
            const clickOnTrack = document.createElement('a');
            const deleteTrack = document.createElement('button');
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
                View.addTrackToPlaylist(this);
            });

            deleteTrack.addEventListener('click', function() {
                deleteDataModel.deleteTrack(clickOnTrack.id);
            });

            tracksList.appendChild(ul);
            ul.appendChild(li);
            li.appendChild(clickOnTrack);
            li.appendChild(deleteTrack);
        } //End of loop

        View.filterTracks();
    },

    addPlaylist: document.getElementById('playlistButton'),

    addTrackToPlaylist(song) {
        console.log('Playlist id:', song.id);
        console.log('Songtrack id:', song.trackId);
        selectTrack = song.trackId;
        Controller.registerTrackToPlaylistClickHandler();

    },

    displayAlbumList(albums) {
        for (let album of albums) {
            for (let artist of album.artists) {
                const albumList = document.getElementById('albums');
                const ul = document.getElementById('albumslist');
                const li = document.createElement('li');
                li.id = album._id;
                li.dataset.id = album._id;
                li.innerText = album.title;
                li.artistId = album.artists;

                const albumCard = document.createElement('div');
                const albumCardAction = document.createElement('div');

                const clickOnAlbum = document.createElement('a');
                const albumArtist = document.createElement('span');

                const showAlbumAction = document.createElement('button');
                const deleteAlbum = document.createElement('button');
                const updateAlbum = document.createElement('button');

                albumCard.className = 'albumCard';
                albumCardAction.className = 'albumCardAction';

                showAlbumAction.className = 'showAlbumAction';
                deleteAlbum.className = 'deleteAlbum';
                updateAlbum.className = 'updateAlbum';

                showAlbumAction.innerText = 'Edit';
                updateAlbum.innerText = 'Update';
                deleteAlbum.innerText = 'Delete Album';
                albumArtist.innerText = artist.name;

                const coverAlbum = document.createElement('img');
                coverAlbum.className = 'coverAlbum';
                const coverAlbumSrc = album.coverImage;
                coverAlbum.setAttribute('onerror', 'src="https://upload.wikimedia.org/wikipedia/en/d/dd/Ray_of_Light_Madonna.png"');
                coverAlbum.setAttribute('src', coverAlbumSrc);

                let inputChangeAlbumTitle = document.createElement('input');
                const inputChangeAlbumLabel = document.createElement('label');
                inputChangeAlbumTitle.setAttribute('type', 'text');
                inputChangeAlbumTitle.setAttribute('placeholder', 'Change title here');
                inputChangeAlbumLabel.innerText = 'Update album title';

                clickOnAlbum.id = album._id;
                clickOnAlbum.dataset.id = album._id;
                clickOnAlbum.innerText = album.title;
                clickOnAlbum.artistId = album.artists;


                li.addEventListener('click', function() {
                    this.dataset.id;
                    this.artistId;
                    this.innerText;
                    View.registerAlbumId(this);
                });

                clickOnAlbum.addEventListener('click', function() {
                    this.dataset.id;
                    this.artistId;
                    this.innerText;
                    View.registerAlbumId(this);
                });

                deleteAlbum.addEventListener('click', function() {
                    deleteDataModel.deleteAlbum(clickOnAlbum.id);
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

                albumContainer.appendChild(albumCard);

                albumCard.appendChild(coverAlbum);
                albumCard.appendChild(clickOnAlbum);
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


    registerAlbumId(album) {
        console.log('Album Id:', album.id);
        console.log('Artist Id of clicked album:', album.artistId);
        let artistsId =
            selectedArtist = album.artistId;
        selectedAlbum = album.id;

        for (artist of selectedArtist) {
            let artistId = artist._id;
            console.log(artistId);
            Controller.registerTrackTitleToAlbumClickHandler(artistId);
        }
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
            rating.setAttribute('placeholder', 'Rate (1-10)');

            let ratingButton = document.createElement('button');
            ratingButton.innerText = 'Vote';

            let inputComment = document.createElement('textarea');
            inputComment.setAttribute('type', 'text');
            inputComment.setAttribute('rows', 8);
            inputComment.setAttribute('cols', 50);
            inputComment.setAttribute('placeholder', 'Comment here..')
            let inputCommentBy = document.createElement('input');
            inputCommentBy.setAttribute('type', 'text');
            inputCommentBy.setAttribute('placeholder', 'Comment by:')
            const inputButton = document.createElement('button');
            inputButton.innerText = "Comment";

            const clickOnPlaylist = document.createElement('button');
            clickOnPlaylist.className = 'clickOnPlaylist';

            const deletePlaylist = document.createElement('button');
            const updatePlaylist = document.createElement('button');
            const showMorePlaylist = document.createElement('button');
            showMorePlaylist.className = 'showMorePlaylist';

            //Button names
            deletePlaylist.innerText = 'Delete Playlist';
            updatePlaylist.innerText = 'Update Playlist';
            showMorePlaylist.innerHTML = 'View songs';

            let singlePlaylistContainer = document.createElement('div');
            singlePlaylistContainer.className = "singlePlaylistContainer";

            let viewComments = document.createElement('button');
            viewComments.id = playlist._id;
            viewComments.innerText = 'View all comments';

            clickOnPlaylist.id = playlist._id;
            clickOnPlaylist.dataset.id = playlist._id;
            clickOnPlaylist.innerText = '+';
            clickOnPlaylist.createdBy = playlist.createdBy;
            clickOnPlaylist.trackId = selectTrack;

            clickOnPlaylist.addEventListener('click', function() {
                this.trackId;
                this.dataset.id;
                this.innerText;
                Controller.trackArray(this);

            });

            inputButton.addEventListener('click', function() {
                commentValue = inputComment.value
                commentBy = inputCommentBy.value;
                postModel.getPlaylistComment(clickOnPlaylist.dataset.id);
            });

            deletePlaylist.addEventListener('click', function() {
                deleteDataModel.deletePlaylist(clickOnPlaylist.id);
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
                FetchModel.fetchCommentsforSpecifikPlaylist(this);
            });


            function renderHtmlSinglePlaylist() {
                singlePlaylistContainer.innerHTML = `
                            <h4>Tracks</h4>`;

                for (let track of playlist.tracks) {

                    for (let artist of track.artists) {

                        singlePlaylistContainer.innerHTML += `
                                
                                <p>${artist.name} - ${track.title}</p>
                                `;
                    }
                }                  

                singlePlaylistContainer.appendChild(deletePlaylist);
                singlePlaylistContainer.appendChild(updatePlaylist);
                singlePlaylistContainer.appendChild(inputChangePlaylistTitle);
                singlePlaylistContainer.appendChild(rating);
                singlePlaylistContainer.appendChild(ratingButton);

                singlePlaylistContainer.appendChild(inputComment);
                singlePlaylistContainer.appendChild(inputCommentBy);
                singlePlaylistContainer.appendChild(inputButton);
                singlePlaylistContainer.appendChild(viewComments);
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
FetchModel.fetchComments();
Controller.addAlbumbutton();
Controller.addTrackButton();
Controller.createPlaylistButton();
Controller.registerCreateArtistClickHandler();