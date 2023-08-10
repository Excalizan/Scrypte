require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api')

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true })

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
	// 'msg' is the received Message from Telegram
	// 'match' is the result of executing the regexp above on the text content
	// of the message

	const chatId = msg.chat.id
  const resp = match[1] // the captured "whatever"


	// send back the matched "whatever" to the chat
	bot.sendMessage(chatId, resp)
})

// help
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id
  const resp = 'Help message'

  bot.sendMessage(chatId, resp)
})

// match youtube link
bot.onText(/https:\/\/www\.youtube\.com\/watch\?v=(.+)/, (msg, match) => {
  const chatId = msg.chat.id
  const resp = `https://www.youtube.com/watch?v=${match[1]}`
  console.log(match[1])
  bot.sendMessage(chatId, resp)
})

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
	const chatId = msg.chat.id

	// send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message')
  console.log(`${msg.chat.username}: ${msg.text}`)
})
