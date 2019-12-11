const rTracer = require('cls-rtracer')
const winston = require('winston')
const { createLogger, format, transports } = require('winston')

const LoggerLib = {}

const { combine, timestamp, printf } = format

// a custom format that outputs request id
const rTracerFormat = printf((info) => {
    const rid = rTracer.id()
    return rid
      ? `${info.timestamp} [${rid}]: ${info.message}`
      : `${info.timestamp}: ${info.message}`
  })

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