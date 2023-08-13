require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api')

const downloadFromYoutube = require('./funcs/youtube')
const downloadFromInstagram = require('./funcs/instagram')
const {
	downloadTrackFromSpotify,
	downloadAlbumFromSpotify,
	downloadPlaylistFromSpotify,
} = require('./funcs/spotify')
const downloadFromReddit = require('./funcs/reddit')

const token = process.env.TOKEN
const bot = new TelegramBot(token, { polling: true })

console.log('Bot is running...')

// help
bot.onText(/\/help/, (msg) => {
	const chatId = msg.chat.id
	const resp = 'Help message'

	bot.sendMessage(chatId, resp)
})

// match youtube link
bot.onText(
	/(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/,
	async (msg, match) => {
		const chatId = msg.chat.id
		const url = match[0]

		await downloadFromYoutube(bot, chatId, url)
	}
)

// match instagram post link
bot.onText(
	/(https?:\/\/)?(www\.)?(instagram\.com|instagr\.?am)\/p\/.+/,
	(msg, match) => {
		const chatId = msg.chat.id
		const url = match[0]

		downloadFromInstagram(bot, chatId, url)
	}
)

// match instagram story link
bot.onText(
	/(https?:\/\/)?(www\.)?(instagram\.com|instagr\.?am)\/stories\/.+/,
	(msg, match) => {
		const chatId = msg.chat.id
		const url = match[0]

		downloadFromInstagram(bot, chatId, url)
	}
)

// match instagram reel link
bot.onText(
	/(https?:\/\/)?(www\.)?(instagram\.com|instagr\.?am)\/reel\/.+/,
	(msg, match) => {
		const chatId = msg.chat.id
		const url = match[0]

		downloadFromInstagram(bot, chatId, url)
	}
)
// match spotify track link
bot.onText(
	/(https?:\/\/)?(www\.)?(open\.spotify\.com|spotify\.?com)\/track\/.+/,
	(msg, match) => {
		const chatId = msg.chat.id
		const url = match[0]

		downloadTrackFromSpotify(bot, chatId, url)
	}
)

// match spotify album link
bot.onText(
	/(https?:\/\/)?(www\.)?(open\.spotify\.com|spotify\.?com)\/album\/.+/,
	(msg, match) => {
		const chatId = msg.chat.id
		const url = match[0]

		downloadAlbumFromSpotify(bot, chatId, url)
	}
)

// match spotify playlist link
bot.onText(
	/(https?:\/\/)?(www\.)?(open\.spotify\.com|spotify\.?com)\/playlist\/.+/,
	(msg, match) => {
		const chatId = msg.chat.id
		const url = match[0]

		// TODO: fix this
		downloadPlaylistFromSpotify(bot, chatId, url)
	}
)

// match reddit link
bot.onText(
	/(https?:\/\/)?(www\.)?(reddit\.com|redd\.?it)\/.+/,
	(msg, match) => {
		const chatId = msg.chat.id
		const url = match[0]

		downloadFromReddit(bot, chatId, url)
	}
)
