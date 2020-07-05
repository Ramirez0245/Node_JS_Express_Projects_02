const moment = require('moment');
const logger = (req, res, next) => 
{
    
    console.log('Hello from logger');
    //Try removing some parts and hitting the url to see things different
    console.log(`${req.protocol}://${req.get('host')}${
        req.originalUrl
    }: ${moment().format()}`);
    next();
}

module.exports = logger;