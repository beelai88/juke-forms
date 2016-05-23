'use strict';

juke.factory('PlaylistFactory', function($http) {

    var PlaylistFactory = {};
    var cachedPlaylists = [];


    PlaylistFactory.create = function(playlistName) {
        return $http({
                url: '/api/playlists',
                method: "POST",
                data: { name: playlistName }
            })
            .then(function(response) {
                cachedPlaylists.push(response.data);
                return response.data;
            })
    };

    PlaylistFactory.fetchAll = function() {
        return $http.get('/api/playlists')
            .then(function(response) {
                angular.copy(response.data, cachedPlaylists);
                return cachedPlaylists;
            });
    };

    PlaylistFactory.fetchById = function(playlistId) {
        return $http.get('/api/playlists/' + playlistId)
            .then(function(response) {
              // console.log("I'm the response data ", response.data)
                return response.data
            });
    };

    PlaylistFactory.addSong = function(songId, playlistId){
      // console.log('Im the song! ', songId);
      return $http({
                url: '/api/playlists/' + playlistId + '/songs',
                method: "POST",
                data: {id: songId}
            })
      .then(function(response){

        return response.data;
      })

    };

    PlaylistFactory.deleteSong = function(songId, playlistId){
      console.log("Song id: " +songId + " Playlist Id: " + playlistId);
      return $http.delete('/api/playlists/' + playlistId + '/songs/' + songId)
      .then(function(response){
        console.log("Song #" + songId + " deleted.")
          return response;
      })
    }




    return PlaylistFactory;

});
