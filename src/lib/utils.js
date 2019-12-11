const { logger, id } = require('./logger')

const libs = {}

libs.debugOutput = () => {
    logger.info(`Fetching debug info for ${id()}`)
    return {
        xRequestId: id()
    }
}

module.exports = libs