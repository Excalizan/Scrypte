require('dotenv').config()

const Spotify = require('spotifydl-core').default
const fs = require('fs')

cred = {
	clientId: process.env.SPOTIFY_CLIENT_ID,
	clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
}
const spotify = new Spotify(cred)

async function downloadTrackFromSpotify(bot, chatId, url) {
	console.log(url)
	const data = await spotify.getTrack(url)
	const buffer = await spotify.downloadTrack(url)
	bot.sendAudio(
		chatId,
		buffer,
		{
			title: data.name,
			performer: data.artists[0].name,
		},
		{
			filename: `${data.name}.mp3`,
			contentType: 'audio/mpeg',
		}
	)
}

async function downloadAlbumFromSpotify(bot, chatId, url) {
	const albumData = await spotify.getAlbum(url)
	const buffer = await spotify.downloadAlbum(url)

	for (let i = 0; i < albumData.tracks.length; i++) {
		const track = albumData.tracks[i]
		const trackData = await spotify.getTrack(track)
		bot.sendAudio(
			chatId,
			buffer[i],
			{
				title: trackData.name,
				performer: trackData.artists[0].name,
			},
			{
				filename: `${trackData.name}.mp3`,
				contentType: 'audio/mpeg',
			}
		)
	}
}

async function downloadPlaylistFromSpotify(bot, chatId, url) {
	const playlistData = await spotify.getPlaylist(url)
	const buffer = await spotify.downloadPlaylist(url)

	for (let i = 0; i < playlistData.tracks.length; i++) {
		const track = playlistData.tracks[i]
		const trackData = await spotify.getTrack(track)
		bot.sendAudio(
			chatId,
			buffer[i],
			{
				title: trackData.name,
				performer: trackData.artists[0].name,
			},
			{
				filename: `${trackData.name}.mp3`,
				contentType: 'audio/mpeg',
			}
		)
	}
}
module.exports = {
	downloadTrackFromSpotify,
	downloadAlbumFromSpotify,
	downloadPlaylistFromSpotify,
}
