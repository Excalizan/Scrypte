const fs = require('fs')
const ytdl = require('ytdl-core')

async function downloadFromYoutube(bot, chatId, url) {
	try {
		// Get video information and thumbnail URL
		const videoInfo = await ytdl.getInfo(url)
		const title = videoInfo.player_response.videoDetails.title
		const thumbnailUrl =
			videoInfo.videoDetails.thumbnails[
				videoInfo.videoDetails.thumbnails.length - 1
			].url
		// Send a message to show the download progress
		const message = await bot
			.sendMessage(chatId, `*Downloading video:* ${title}`)
			.catch((err) => {
				console.log(err)
			})

		// Create a writable stream to store the video file
		const writeStream = fs.createWriteStream(
			`content/${title}-${chatId}.mp4`
		)

		// Start the download and pipe the video data to the writable stream
		ytdl(url, { filter: 'audioandvideo' }).pipe(writeStream)

		// When the download is complete, send the video and delete the file
		writeStream.on('finish', () => {
			bot.sendVideo(
				chatId,
				`content/${title}-${chatId}.mp4`,
				{
					caption: `*Video downloaded:* ${title} "by" @Excalizan`,
					thumb: thumbnailUrl,
					duration: videoInfo.videoDetails.lengthSeconds,
					parse_mode: 'Markdown',
				},
				{
					filename: `content/${title}-${chatId}.mp4`,
					contentType: 'video/mp4',
				}
			)
				.catch((err) => {
					bot.sendMessage(chatId, 'Error sending video.').catch(
						(err) => {
							console.log(err)
						}
					)
					console.log(err)
				})

				.then(() => {
					try {
						fs.unlinkSync(`content/${title}-${chatId}.mp4`) // delete the file
					} catch (error) {
						console.error(error)
					}
				})
				.catch((error) => {
					bot.sendMessage(chatId, 'Error sending video.').catch(
						(err) => {
							console.log(err)
						}
					)
					console.error(error)
				})
		})
	} catch (error) {
		bot.sendMessage(chatId, 'Error downloading video.').catch((err) => {
			console.log(err)
		})
		console.error(error)
	}
}

module.exports = downloadFromYoutube
