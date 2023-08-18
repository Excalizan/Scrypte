require('dotenv').config()
process.env['NTBA_FIX_350'] = 1
/* required to disable the deprecation warning, 
will be fixed when node-telegram-bot-api gets a new update */


// irrelevant with the bot, just to keep it alive in replit with uptimerobot
const express = require('express')
const app = express()
const port = 3000
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () =>
	console.log(`Example app listening at http://localhost:${port}`)
)

// bot
const TelegramBot = require('node-telegram-bot-api')
const downloadFromYoutube = require('./funcs/youtube')
const downloadFromInstagram = require('./funcs/instagram')
const {
	downloadTrackFromSpotify,
	downloadAlbumFromSpotify,
	downloadPlaylistFromSpotify,
} = require('./funcs/spotify')
const {
	getNetworkUploadSpeed,
	getNetworkDownloadSpeed,
} = require('./funcs/dev')

const token = process.env.TOKEN
const bot = new TelegramBot(token, { polling: true })

console.log('Bot is running...')

// help
bot.onText(/\/help/, (msg) => {
	const chatId = msg.chat.id

	const response =
		'Welcome to Scrypte!\nSend a valid Instagram, Youtube or Spotify link to download the content.'

	bot.sendMessage(chatId, response)
})

// start
bot.onText(/\/start/, (msg) => {
	const chatId = msg.chat.id

	const response =
		'Welcome to Scrypte!\nSend a valid Instagram, Youtube or Spotify link to download the content.'

	bot.sendMessage(chatId, response)
})

// !dev commands
// get network upload speed
bot.onText(/\/upload/, async (msg) => {
	const chatId = msg.chat.id

	// if user is not the developer
	if (String(msg.from.id) !== String(process.env.DEV_ID)) {
		return
	}

	await getNetworkUploadSpeed(bot, chatId)
})

// get network download speed
bot.onText(/\/download/, async (msg) => {
	const chatId = msg.chat.id

	// if user is not the developer
	if (String(msg.from.id) !== String(process.env.DEV_ID)) {
		return
	}

	await getNetworkDownloadSpeed(bot, chatId)
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

		downloadPlaylistFromSpotify(bot, chatId, url)
	}
)
