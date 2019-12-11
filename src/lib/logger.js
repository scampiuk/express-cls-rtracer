const rTracer = require('cls-rtracer')

const { createLogger, format, transports } = require('winston')
const { combine, timestamp, printf } = format

const LoggerLib = {}


// a custom format that outputs request id
const rTracerFormat = printf((info) => {
    const rid = rTracer.id()
    return rid
        ? `${info.timestamp} [${rid}]: ${info.message}`
        : `${info.timestamp}: ${info.message}`
})

// Create the logger and transport
const logger = createLogger({
    format: combine(
        timestamp(),
        rTracerFormat
    ),
    transports: [new transports.Console()]
})


LoggerLib.logger = logger
LoggerLib.rTracer = rTracer
LoggerLib.id = rTracer.id

module.exports = LoggerLib
