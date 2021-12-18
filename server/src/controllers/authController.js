const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const wrapAsync = require('../utils/wrapAsync')
const WrapError = require('../utils/wrapError')
const User = require('../models/userModel')

const signToken = id => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN
	})
}

const sendToken = (user, status, res) => {
	const token = signToken(user._id)
	const cookieOptions = {
		expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
		httpOnly: true
	}
	if (process.env.NODE_ENV === 'prod') cookieOptions.secure = true
	res.cookie('jwt', token, cookieOptions)
	user.password = undefined
	res.status(status).json({
		status: 'success',
		token,
		data: {
			user
		}
	})
}

exports.signup = wrapAsync(async (req, res) => {
	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	})
	sendToken(newUser, 201, res)
})

exports.login = wrapAsync(async (req, res, next) => {
	const { email, password } = req.body

	if (!email || !password) {
		return next(new WrapError('Please provide email and password', 400))
	}

	const user = await User.findOne({ email }).select('+password')

	if (!user || !(await user.correctPassword(password, user.password))) {
		return next(new WrapError('Incorrect email or password', 401))
	}
	sendToken(user, 200, res)
})

exports.protect = wrapAsync(async (req, _res, next) => {
	let token
	if (req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1]
	}

	if (!token) {
		return next(new WrapError('You\'re not logged in !', 401))
	}

	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
	const user = await User.findById(decoded.id)

	req.user = user
	next()
})
