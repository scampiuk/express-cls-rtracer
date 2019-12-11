'use strict'

const express = require('express')

const expressWinston = require('express-winston')

const { logger, rTracer } = require('./lib/logger')
const utils = require('./lib/utils')

const app = express()
const port = 3000


app.use(expressWinston.logger(logger));

app.use(rTracer.expressMiddleware({
    useHeader: true,
    headerName: 'xRequestId',
}))

app.use((req, res, next) => {
    res.setHeader('xRequestId', rTracer.id())
    next()
})

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/debug', (req, res, next) => {
    const debug = utils.debugOutput()
    res.send(debug)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))