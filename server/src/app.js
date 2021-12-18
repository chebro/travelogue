#!/bin/node

const path = require('path')
const express = require('express')
const app = express()

const mainRouter = require('./routes/mainRouter')
const authRouter = require('./routes/authRouter')
const journeysRouter = require('./routes/journeysRouter')

app.set('views', path.join(__dirname, 'client', 'views'))
app.set('view engine', 'ejs')
app.set('trust proxy', true)

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.use('/', mainRouter)
app.use('/api/users', authRouter)
app.use('/api/journeys', journeysRouter)

app.use((_req, res) => res.status(404).render('404'))

module.exports = app
