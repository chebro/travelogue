const User = require('../models/userModel')
const wrapAsync = require('../utils/wrapAsync')

exports.getIndex = (_req, res) => {
	res.status(200).render('index', {})
}

exports.getLogin = (_req, res) => {
	res.status(200).render('login')
}

exports.getRegister = (_req, res) => {
	res.status(200).render('register')
}

exports.getTravels = wrapAsync(async (req, res) => {
	const name = req.params.user
	const user = await User.findOne({ name })
	let isPublished = []
	let journeyTitles=[]
	let portImage=[]
	for(let i = 0; i < user.journeys.length; i++) {
		isPublished.push(user.journeys[i].published)
		journeyTitles.push(user.journeys[i].title)	
		portImage.push(user.journey[i].title)
	}
	const inject = {
		name,
		title: journeyTitles,
		num_cards: user.journeys.length,
		profile_pic: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		port_image: portImage,
		port_link: `/${name}/travels/`,
		port_publish: isPublished
	}
	res.status(200).render('travels', inject)
})

exports.getMap = wrapAsync(async (req, res) => {
	const name = req.params.user
	const journey = req.params.journey
	const user = await User.findOne({ name })

	const inject = {
		name,
		title: user.journeys[journey],
		journey_no: journey,
		profile_pic: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
	}
	res.status(200).render('travel_map', inject)
})
