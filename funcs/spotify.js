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
						contentType: 'audio/mp3',
					}
				)
					.then(() => {
						fs.unlinkSync(res[0].filename)
					})
					.catch((err) => {
						console.log(err)
					})
			})
			.catch((err) => {
				console.log(err)
			})
	})
}

async function downloadAlbumFromSpotify(bot, chatId, url) {
	await SpottyDL.getAlbum(url).then(async (results) => {
		let album = await SpottyDL.downloadAlbum(
			results,
			'content',
			false
		).then((res) => {
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
						contentType: 'audio/mp3',
					}
				)
					.then(() => {
						fs.unlinkSync(track.filename)
					})
					.catch((err) => {
						console.log(err)
					})
			})
		})

		console.log(album)
	})
}

module.exports = { downloadTrackFromSpotify, downloadAlbumFromSpotify }
