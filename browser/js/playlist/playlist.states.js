'use strict';

juke.config(function ($stateProvider) {

  $stateProvider.state('newPlaylist', {
    url: '/playlists/new',
    templateUrl: '/js/playlist/templates/playlist.html',
    controller: 'PlaylistsCtrl'
  });


  $stateProvider.state('playlists', {
    url: '/playlists/:playlistId',
    templateUrl: '/js/playlist/templates/indivPlaylist.html',
    controller: 'PlaylistCtrl',
    resolve: {
      playlist: function (PlaylistFactory, $stateParams) {
        return PlaylistFactory.fetchById($stateParams.playlistId);
      }
    }
  });


});
