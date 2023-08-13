const SpottyDL = require('spottydl')
const fs = require('fs')

async function downloadTrackFromSpotify(bot, chatId, url) {
	await SpottyDL.getTrack(url).then(async (results) => {
		await SpottyDL.downloadTrack(results, 'content')
			.then((res) => {
				bot.sendAudio(
					chatId,
					res[0].filename,
					{
						title: results.title,
						performer: results.artist,
					},
					{
						filename: `content/${res.filename}`,
						contentType: 'audio/mpeg',
					}
				)
					.then(() => {
						fs.unlinkSync(res[0].filename)
					})
					.catch((err) => {
						console.log(err)
						bot.sendMessage(chatId, 'Error sending track')
					})
			})
			.catch((err) => {
				console.log(err)
				bot.sendMessage(chatId, 'Error downloading track')
			})
	})
}

async function downloadAlbumFromSpotify(bot, chatId, url) {
	await SpottyDL.getAlbum(url).then(async (results) => {
		await SpottyDL.downloadAlbum(results, 'content', false)
			.then((res) => {
				res.forEach((track) => {
					bot.sendAudio(
						chatId,
						track.filename,
						{
							title: track.title,
							performer: track.artist,
						},
						{
							filename: `content/${res.filename}`,
							contentType: 'audio/mpeg',
						}
					)
						.then(() => {
							fs.unlinkSync(track.filename)
						})
						.catch((err) => {
							console.log(err)
							bot.sendMessage(chatId, 'Error sending track')
						})
				})
			})
			.catch((err) => {
				console.log(err)
				bot.sendMessage(chatId, 'Error downloading album')
			})
	})
}

// TODO: Fix playlist download
async function downloadPlaylistFromSpotify(bot, chatId, url) {
	bot.sendMessage(
		chatId,
		'This feature is currently disabled, sorry for the inconvenience.\nDeveloper contact: @excalizan'
	)
	// await SpottyDL.getPlaylist(url).then(async (results) => {
	// 	await SpottyDL.downloadPlaylist(results, 'content', false)
	// 		.then((res) => {
	// 			res.forEach((track) => {
	// 				bot.sendAudio(
	// 					chatId,
	// 					track.filename,
	// 					{
	// 						title: track.title,
	// 						performer: track.artist,
	// 					},
	// 					{
	// 						filename: `content/${res.filename}`,
	// 						contentType: 'audio/mpeg',
	// 					}
	// 				)
	// 					.then(() => {
	// 						fs.unlinkSync(track.filename)
	// 					})
	// 					.catch((err) => {
	// 						console.log(err)
	// 						bot.sendMessage(chatId, 'Error sending track')
	// 					})
	// 			})
	// 		})
	// 		.catch((err) => {
	// 			console.log(err)
	// 			bot.sendMessage(chatId, 'Error downloading playlist')
	// 		})
	// })
}
module.exports = {
	downloadTrackFromSpotify,
	downloadAlbumFromSpotify,
	downloadPlaylistFromSpotify,
}
