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
		const message = await bot.sendMessage(
			chatId,
			`*Downloading video:* ${title}`
		)

		// Create a writable stream to store the video file
		const writeStream = fs.createWriteStream(
			`content/${title}-${chatId}.mp4`
		)

		// Start the download and pipe the video data to the writable stream
		ytdl(url, { filter: 'audioandvideo' }).pipe(writeStream)

		// Set up an interval to update the message with the download progress every 5 seconds
		let progress = 0
		const updateInterval = setInterval(() => {
			progress = writeStream.bytesWritten / (1024 * 1024)
			bot.editMessageText(
				`*Downloading video:* ${title} (${progress.toFixed(
					2
				)} MB) \u{1F4E6}`,
				{
					chat_id: chatId,
					message_id: message.message_id,
					parse_mode: 'Markdown', // use Markdown formatting
				}
			)
		}, 2000)

		// When the download is complete, send the video and delete the file
		writeStream.on('finish', () => {
			clearInterval(updateInterval) // stop updating the message
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

				.then(() => {
					try {
						fs.unlinkSync(`content/${title}-${chatId}.mp4`) // delete the file
					} catch (error) {
						console.error(error)
					}
				})
				.catch((error) => {
					bot.sendMessage(chatId, 'Error sending video.')
					console.error(error)
				})
		})
	} catch (error) {
		bot.sendMessage(chatId, 'Error downloading video.')
		console.error(error)
	}
}

module.exports = downloadFromYoutube
