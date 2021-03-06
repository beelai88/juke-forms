'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('Song')
// to get access to the Song model.

const Playlist = require('./playlist');
const Artist = require('./artist');
const Album = require('./album');
const Song = require('./song');

// Form the associations

Song.belongsTo(Album);
Album.hasMany(Song);

Artist.belongsToMany(Song, { through: 'artistSong' });
Song.belongsToMany(Artist, { through: 'artistSong' });

// PlaylistSong = sequelize.define('playlistSong', {
// 	order: Sequelize.INTEGER; 
// });

Song.belongsToMany(Playlist, { through: 'playlistSong' });
Playlist.belongsToMany(Song, { through: 'playlistSong' });

// exported just in case, but can also be fetched via db.model('Album') etc.

module.exports = {
  Album: Album,
  Song: Song,
  Artist: Artist,
  Playlist: Playlist
};
