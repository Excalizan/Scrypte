const ig = require('instagram-url-dl')

function downloadFromInstagram(bot, chatId, url) {
	ig(url)
		.then((res) => {
			bot.sendMessage(chatId, 'Downloading...')
			// if there are multiple images/videos
			if (res.data.length > 1) {
				res.data.forEach((item) => {
					if (item.type === 'image') {
						bot.sendPhoto(chatId, item.url).catch((err) => {
							bot.sendMessage(chatId, 'Error sending photo')
							console.log(err)
						})
					} else if (item.type === 'video') {
						bot.sendVideo(chatId, item.url).catch((err) => {
							bot.sendMessage(chatId, 'Error sending video')
							console.log(err)
						})
					}
				})
			} else {
				if (res.data[0].type === 'image') {
					bot.sendPhoto(chatId, res.data[0].url).catch((err) => {
						bot.sendMessage(chatId, 'Error sending photo')
						console.log(err)
					})
				} else if (res.data[0].type === 'video') {
					bot.sendVideo(chatId, res.data[0].url).catch((err) => {
						bot.sendMessage(chatId, 'Error sending video')
						console.log(err)
					})
				}
			}
		})
		.catch((err) => {
			bot.sendMessage(chatId, 'Error: ' + err.message).catch((err) => {
				console.log(err)
			})
			console.log(err)
		})
}

module.exports = downloadFromInstagram
