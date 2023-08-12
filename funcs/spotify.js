const SpottyDL = require('spottydl')
const fs = require('fs')

async function downloadTrackFromSpotify(bot, chatId, url) {
	await SpottyDL.getTrack(url).then(async (results) => {
		await SpottyDL.downloadTrack(results, 'content')
			.then((res) => {
				bot.sendAudio(chatId, res[0].filename, {
					title: results.title,
					performer: results.artist,
				})
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


module.exports = { downloadTrackFromSpotify }
