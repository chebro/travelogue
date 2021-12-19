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
	for(let i = 0; i < user.journeys.length; i++) {
		isPublished.push(user.journeys[i].published)
		journeyTitles.push(user.journeys[i].title)	
	}
	const inject = {
		name,
		title: journeyTitles,
		num_cards: user.journeys.length,
		profile_pic: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		port_image: 'https://travel.usnews.com/dims4/USNEWS/a600cb2/2147483647/resize/445x280%5E%3E/crop/445x280/quality/85/?url=https://travel.usnews.com/images/tahiti_main_getty_samantha_t_photography_edited_445x280_v43QKbF.jpg',
		port_link: `/${name}/travels/journey`,
		port_publish: isPublished
	}
	res.status(200).render('travels', inject)
})
