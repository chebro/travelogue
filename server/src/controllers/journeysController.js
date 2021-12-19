const User = require('../models/userModel')
const Feed = require('../models/feedModel')
const wrapAsync = require('../utils/wrapAsync')

exports.setPublished = wrapAsync(async (req, res) => {
	const user = req.body.name
	// TODO: insert journey to Published db
	let userInfo = await User.findOne({ name: user })
	if(!userInfo) {
		res.status(400).json({
			status: 'fail',
			message: 'bad request'
		})
	}
	userInfo.journeys[req.body.journey_no].published = true
	await User.findOneAndUpdate({ name: user }, userInfo)
	const newFeed = await Feed.create({
		authorName: userInfo.name,
		feedTitle: userInfo.journeys[req.body.journey_no].title,
		feedText: userInfo.journeys[req.body.journey_no].description,
		feedImage: userInfo.journeys[req.body.journey_no].image,
		journey_no: req.body.journey_no
	})
	res.status(200).json({
		status:'success',
		data: newFeed
	})
})

exports.getCoords = wrapAsync(async (req, res) => {
	const user = req.body.uname
	let userInfo = await User.findOne({ name: user })
	if(!userInfo) {
		res.status(400).json({
			status: 'fail',
			message: 'bad request'
		})
	}
	res.status(200).json({
		status:'success',	
		data: userInfo.journeys[req.body.journey_no]
	})
})

exports.addLocation = wrapAsync(async (req, res) => {
	const user = req.body.uname
	let userInfo = await User.findOne({ name: user })
	if(!userInfo) {
		res.status(400).json({
			status: 'fail',
			message: 'bad request'
		})
	}
	userInfo.journeys[req.body.journey_no].destinations.push({
		lat: req.body.lat,
		long: req.body.long,
		title: req.body.title,
		description: req.body.description,
	})

	await User.findOneAndUpdate({ user }, userInfo)
	res.status(200).json({
		status:'success'	
	})
})

exports.createJourney = wrapAsync(async (req, res) => {
	let userInfo = await User.findOne({ name: req.body.name })
	if(!userInfo) {
		res.status(400).json({
			status: 'fail',
			message: 'bad request'
		})
	}
	userInfo.journeys.push({
		title: req.body.jname,
		description: req.body.jdesc,
		published: false
	})
	await User.findOneAndUpdate({ name: req.body.name }, userInfo)
	res.status(200).json({
		status:'success'	
	})
})

