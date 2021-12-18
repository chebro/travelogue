const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Username required!'],
	},
	email: {
		type: String,
		required: [true, 'Email required!'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Password required'],
	},
	bio: String,
	journeys: Array,
})

userSchema.pre('save', async function (next) {
	this.password = await bcrypt.hash(this.password, 12)
	next()
})

userSchema.methods.correctPassword = async (a, b) => {
	return await bcrypt.compare(a, b)
}

const User = mongoose.model('User', userSchema)

module.exports = User
