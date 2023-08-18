const NetworkSpeed = require('network-speed')
const testNetworkSpeed = new NetworkSpeed()

async function getNetworkDownloadSpeed(bot, chatId) {
	console.log('Calculating Download Speed...')
	bot.sendMessage(chatId, 'Calculating Download Speed...').catch((err) => {
		console.log(err)
	})
	const baseUrl = 'https://eu.httpbin.org/stream-bytes/50000'
	const fileSizeInBytes = 50000
	const speed = await testNetworkSpeed.checkDownloadSpeed(
		baseUrl,
		fileSizeInBytes
	)
	bot.sendMessage(chatId, `Download Speed: ${speed.mbps} Mbps`).catch(
		(err) => {
			console.log(err)
		}
	)
	console.log(`Download Speed: ${speed.mbps} Mbps`)
}

async function getNetworkUploadSpeed(bot, chatId) {
	console.log('Calculating Upload Speed...')
	bot.sendMessage(chatId, 'Calculating Upload Speed...').catch((err) => {
		console.log(err)
	})
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
	bot.sendMessage(chatId, `Upload Speed: ${speed.mbps} Mbps`).catch((err) => {
		console.log(err)
	})
	console.log(`Upload Speed: ${speed.mbps} Mbps`)
}

module.exports = {
	getNetworkDownloadSpeed,
	getNetworkUploadSpeed,
}
