require('module-alias/register')

const dotenv = require('dotenv')

dotenv.config()

console.log(`Message: ${process.env.MSG}`)

const Logger = require('@utils/winston')

Logger.error('This is an error log')
Logger.warn('This is a warn log')
Logger.info('This is a info log')
Logger.debug('This is a debug log')
