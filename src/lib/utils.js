const { logger, id } = require('./logger')

const libs = {}

/**
 * A random little method that makes sure we can get the
 * request id from anywhere, and use it in the logger as
 * well as the output.
 */
libs.debugOutput = () => {
    logger.info(`Fetching debug info for ${id()}`)
    return {
        xRequestId: id(),
        foo: 'bar',
    }
}

module.exports = libs
