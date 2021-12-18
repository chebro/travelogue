#!/bin/node

const dotenv = require('dotenv')
const app = require('./src/app')
const db = require('mongoose')

dotenv.config('./.env')
const host = process.env.HOST
const port = process.env.PORT
const addr = process.env.ADDR
const mongo_uri = process.env.MONGO_URI

db.connect(mongo_uri, () => {
	console.log('Database connected')
})

app.listen(port, addr, err => {
	if (err) throw err
	console.log(`server listening on ${host}:${port}`)
})

