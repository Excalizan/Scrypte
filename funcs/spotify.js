require('dotenv').config()

const Spotify = require('spotifydl-core').default

cred = {
	clientId: process.env.SPOTIFY_CLIENT_ID,
	clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
}
const spotify = new Spotify(cred)

async function downloadTrackFromSpotify(bot, chatId, url) {
	try {
		const data = await spotify.getTrack(url).catch((err) => {
			console.log(err)
		})
		bot.sendMessage(
			chatId,
			`Downloading track "${data.name}" by "${data.artists[0]}"`
		).catch((err) => {
			console.log(err)
		})
	} catch (err) {
		console.log(err)
		bot.sendMessage(
			chatId,
			'Error finding track, make sure the link is correct'
		)
		return
	}
	const buffer = await spotify.downloadTrack(url).catch((err) => {
		console.log(err)
		bot.sendMessage(chatId, 'Error downloading track')
	})
	bot.sendAudio(
		chatId,
		buffer,
		{
			title: data.name,
			performer: data.artists[0],
		},
		{
			filename: `${data.name}.mp3`,
			contentType: 'audio/mpeg',
		}
	).catch((err) => {
		console.log(err)
		bot.sendMessage(chatId, 'Error sending track')
	})
}

async function downloadAlbumFromSpotify(bot, chatId, url) {
	try {
		const albumData = await spotify.getAlbum(url).catch((err) => {
			console.log(err)
		})
		const albumFormat = albumData.name.split(' - ')
		const albumName = albumFormat[0]
		const albumArtist = albumFormat[1]
		bot.sendMessage(
			chatId,
			`Downloading album "${albumName}" by "${albumArtist}"`
		).catch((err) => {
			console.log(err)
		})
	} catch (err) {
		console.log(err)
		bot.sendMessage(
			chatId,
			'Error finding album, make sure the link is correct'
		)
		return
	}
	const buffer = await spotify.downloadAlbum(url).catch((err) => {
		console.log(err)
		bot.sendMessage(chatId, 'Error downloading album').catch((err) => {
			console.log(err)
		})
	})

	for (let i = 0; i < albumData.tracks.length; i++) {
		const track = albumData.tracks[i]
		const trackData = await spotify.getTrack(track)
		bot.sendAudio(
			chatId,
			buffer[i],
			{
				title: trackData.name,
				performer: trackData.artists[0],
			},
			{
				filename: `${trackData.name}.mp3`,
				contentType: 'audio/mpeg',
			}
		).catch((err) => {
			console.log(err)
			bot.sendMessage(chatId, 'Error sending track').catch((err) => {
				console.log(err)
			})
		})
	}
}

async function downloadPlaylistFromSpotify(bot, chatId, url) {
	try {
		const playlistData = await spotify.getPlaylist(url).catch((err) => {
			console.log(err)
		})
		bot.sendMessage(
			chatId,
			`Downloading playlist "${playlistData.name}"`
		).catch((err) => {
			console.log(err)
		})
	} catch (err) {
		console.log(err)
		bot.sendMessage(
			chatId,
			'Error finding playlist, make sure the link is correct'
		)
		return
	}
	const buffer = await spotify.downloadPlaylist(url).catch((err) => {
		console.log(err)
		bot.sendMessage(chatId, 'Error downloading playlist').catch((err) => {
			console.log(err)
		})
	})

	for (let i = 0; i < playlistData.tracks.length; i++) {
		const track = playlistData.tracks[i]
		const trackData = await spotify.getTrack(track)
		bot.sendAudio(
			chatId,
			buffer[i],
			{
				title: trackData.name,
				performer: trackData.artists[0],
			},
			{
				filename: `${trackData.name}.mp3`,
				contentType: 'audio/mpeg',
			}
		).catch((err) => {
			console.log(err)
			bot.sendMessage(chatId, 'Error sending track').catch((err) => {
				console.log(err)
			})
		})
	}
}

module.exports = {
	downloadTrackFromSpotify,
	downloadAlbumFromSpotify,
	downloadPlaylistFromSpotify,
}
