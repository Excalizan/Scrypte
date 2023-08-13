const fs = require('fs')
const request = require('request')

function downloadFromReddit(bot, chatId, url) {
	// turn into reddit api url
	url = url.replace('www', 'oauth')
	url = url.replace('reddit', 'redditmedia')
	url = url.replace('comments', 'comments.json')

	// fetch reddit post
	request(url, (err, res, body) => {
		if (err) {
			bot.sendMessage(chatId, 'Error fetching reddit post')
			return
		}

		// parse json
		const json = JSON.parse(body)

		// check if post is a video
		if (json[0].data.children[0].data.is_video) {
			// get video url
			const videoUrl =
				json[0].data.children[0].data.secure_media.reddit_video
					.fallback_url

			// download video
			const video = fs.createWriteStream('video.mp4')
			request(videoUrl).pipe(video)

			// send video
			video.on('close', () => {
				bot.sendVideo(chatId, 'video.mp4')
			})
		} else {
			// get image url
			const imageUrl =
				json[0].data.children[0].data.url_overridden_by_dest

			// download image
			const image = fs.createWriteStream('image.jpg')
			request(imageUrl).pipe(image)

			// send image
			image.on('close', () => {
				bot.sendPhoto(chatId, 'image.jpg')
			})
		}
	})
}

module.exports = downloadFromReddit
