'use strict';

/* PLAYLISTS CONTROLLER */

juke.controller('PlaylistsCtrl', function($scope, PlaylistFactory, $state) {


    $scope.isSubmitted;

    $scope.submitPlaylist = function(playlistName) {
        return PlaylistFactory.create(playlistName)
            .then(function(newPlaylist) {
                $scope.newPlaylist.$setPristine();
                $scope.playlistName = "";
                $state.go('playlists', { playlistId: newPlaylist.id });
            })

    }

    $scope.playlists = PlaylistFactory.fetchAll();

});

juke.controller('PlaylistCtrl', function($scope, PlaylistFactory, playlist, SongFactory) {


    $scope.playlist = playlist;

    SongFactory.getAllSongs()
        .then(function(allSongs) {
            $scope.songs = allSongs;
        })

    $scope.addSong = function(songId, playlistId) {
        return PlaylistFactory.addSong(songId, playlistId)
            .then(function(response) {
                SongFactory.convert(response);
                $scope.playlist.songs.push(response);
                $scope.allSongs = "";
            })
    };

    $scope.remove = function(songId, playlistId) {
        return PlaylistFactory.deleteSong(songId, playlistId)
            .then(function(response) {
                $scope.playlist.songs = $scope.playlist.songs.filter(function(element) {
                  if (element.id != songId) return true;
                });
            });
    };


});
