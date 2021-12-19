const User = require('../models/userModel')
//TODO: create published schema
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
	await User.findOneAndUpdate({ user }, userInfo)
	res.status(200).json({
		status:'success'	
	})
})

exports.getCoords = wrapAsync(async (req, res) => {
	const user = req.body.uname
	console.log(req.body)
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

