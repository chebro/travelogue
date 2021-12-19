const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const feedSchema = new mongoose.Schema({
	authorName: String,
	feedTitle: String,
	feedText: String,
	feedImage: String
})

feedSchema.pre('save', async function (next) {
	this.password = await bcrypt.hash(this.password, 12)
	next()
})

feedSchema.methods.correctPassword = async (a, b) => {
	return await bcrypt.compare(a, b)
}

const Feed = mongoose.model('Feed', feedSchema)

module.exports = Feed
