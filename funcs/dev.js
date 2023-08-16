const NetworkSpeed = require('network-speed')
const testNetworkSpeed = new NetworkSpeed()

async function getNetworkDownloadSpeed(bot, chatId) {
	bot.sendMessage(chatId, 'Calculating Download Speed...')
	const baseUrl = 'https://eu.httpbin.org/stream-bytes/500000'
	const fileSizeInBytes = 500000
	const speed = await testNetworkSpeed.checkDownloadSpeed(
		baseUrl,
		fileSizeInBytes
	)
	bot.sendMessage(chatId, `Download Speed: ${speed.mbps} Mbps`)
}

async function getNetworkUploadSpeed(bot, chatId) {
	bot.sendMessage(chatId, 'Calculating Upload Speed...')
	const options = {
		hostname: 'www.google.com',
		port: 80,
		path: '/catchers/544b09b4599c1d0200000289',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	}
	const fileSizeInBytes = 2000000
	const speed = await testNetworkSpeed.checkUploadSpeed(
		options,
		fileSizeInBytes
	)
	bot.sendMessage(chatId, `Upload Speed: ${speed.mbps} Mbps`)
}

module.exports = {
	getNetworkDownloadSpeed,
	getNetworkUploadSpeed,
}
