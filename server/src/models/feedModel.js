const mongoose = require('mongoose')

const feedSchema = new mongoose.Schema({
	authorName: String,
	feedTitle: String,
	feedText: String,
	feedImage: String,
	journey_no: Number
})

const Feed = mongoose.model('Feed', feedSchema)

module.exports = Feed
