const ig = require('instagram-url-dl')

function downloadInstagramPost(bot, chatId, url) {
	const instagramId = url.split('/')[url.split('/').length - 2]

	ig(url)
		.then((res) => {
			// if there are more than one files
			if (res.data.length > 1) {
				res.data.forEach((item) => {
					if (item.type === 'image') {
						bot.sendPhoto(chatId, item.url)
					} else if (item.type === 'video') {
						bot.sendVideo(chatId, item.url)
					}
				})
			} else {
				if (res.data[0].type === 'image') {
					bot.sendPhoto(chatId, res.data[0].url)
				} else if (res.data[0].type === 'video') {
					bot.sendVideo(chatId, res.data[0].url)
				}
			}
		})
		.catch((err) => {
			// if (err.message === 'Not a valid URL') {
			// 	bot.sendMessage(chatId, 'Not a valid URL')
			// } else {
			// 	bot.sendMessage(chatId, 'Error')
			// }
			console.log(err)
		})
}

function downloadInstagramStory(bot, chatId, url) {
	const instagramId = url.split('/')[url.split('/').length - 2]

	save(instagramId, 'content/', { story: true })
		.then((res) => {
			console.log(res.file)
			bot.sendVideo(chatId, res.file)
		})
		.catch((err) => {
			if (err.message === 'Not a valid URL') {
				bot.sendMessage(chatId, 'Not a valid URL')
			} else {
				bot.sendMessage(chatId, 'Error')
			}
			console.log(err)
		})
}

module.exports = {
	downloadInstagramPost,
	downloadInstagramStory,
}
