'use strict'

const express = require('express')

const expressWinston = require('express-winston')

const LoggerLib = require('./lib/logger')
const utils = require('./lib/utils')

// Set up express
const app = express()
const port = 3000

// Set the logger that includes the request Id
app.use(expressWinston.logger(LoggerLib.logger));

// Set up the middleware so the request ends up available per request
app.use(LoggerLib.rTracer.expressMiddleware({
    useHeader: true,
    headerName: 'xRequestId',
}))

// Add the xRequestId into the header of every request so we don't have to think about it
app.use((req, res, next) => {
    res.setHeader('xRequestId', LoggerLib.id())
    next()
})

// Simple hello world
app.get('/', (req, res) => res.send('Hello World!'))

// ''Debug'' endpoint that includes the xRequestId in the body, and a log line
app.get('/debug', (req, res) => {
    const debug = utils.debugOutput()
    res.send(debug)
})

// start the express app
app.listen(port, () => LoggerLib.logger.info(`Example app listening on port ${port}!`))