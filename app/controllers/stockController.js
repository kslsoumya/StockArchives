
const mongoose = require('mongoose')
const check = require('../libs/checkLib')

const stocksModel = mongoose.model('Stocks')
const logger = require('../libs/loggerLib')
const response = require('../libs/responseLib')



// Get Stocks function--

let getAllStocks = (req, res) => {
    stocksModel.find().sort('date')
    .skip(parseInt(req.query.skip)|| 0)
    .lean()
    .limit(50).lean().exec((err, stocks)=>{
        if (err) {
            logger.error('Failed To Get Stocks', 'Stock Controller:Get All Stocks()', 10)
             let apiResponse = response.generate(true, 'Failed to Get All Stocks', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(stocks)) {
            logger.info('No Stocks Found', 'stockController:Get All Stocks()', 4)
            let  apiResponse = response.generate(false, 'No Stocks Found', 404, null)
            res.send(apiResponse)

        } else {
            logger.info('Stocks retrieved', 'stockController:Get All Stocks()', 4)
            delete stocks._id;
            delete stocks.__v;
            let  apiResponse = response.generate(false, 'Stocks retrieved', 200, stocks)
            res.send(apiResponse)
        }
    })
}
// End of getAllStocks function




// Get getDistinctSymbols Function--

let getDistinctSymbols = (req, res) => {
    stocksModel.find().distinct('symbol').lean().exec((err, retrievedDetails) => {
        if (err) {
            logger.error('Failed to get Symbols ', 'stockController:getDistinctSymbols()', 10)
            let apiResponse = response.generate(true, 'Failed to get Symbols', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(retrievedDetails)) {
            logger.info('No Symbols Found', 'stockController:getDistinctSymbols()', 10)
            let apiResponse = response.generate(false, 'No Symbols Found', 404, null)
            res.send(apiResponse)
        } else {
            delete retrievedDetails._id;
            delete retrievedDetails.__v;
            logger.info(' Symbols Found', 'stockController:getDistinctSymbols()', 10)
            let apiResponse = response.generate(false, 'Symbols retrieved', 200, retrievedDetails)
            res.send(apiResponse)
        }
    })
}

// End of getDistinctSymbols---


// getStocksBySymbol ------- 

let getStocksBySymbol = (req, res) => {
    stocksModel.find({ 'symbol' :req.params.symbol }).skip(parseInt(req.query.skip)|| 0)
    .lean()
    .limit(50).exec((err, retrievedDetails) => {
        if (err) {
            logger.error('Failed to get Product details', 'stockController:getStocksBySymbol()', 10)
            let apiResponse = response.generate(true, 'Failed to get Product details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(retrievedDetails)) {
            logger.info('No Stocks Found', 'stockController:getStocksBySymbol()', 10)
            let apiResponse = response.generate(false, 'No Stocks Found', 404, null)
            res.send(apiResponse)
        } else {
            delete retrievedDetails._id;
            delete retrievedDetails.__v;
            logger.info(' Stocks Found', 'stockController:getStocksBySymbol()', 10)
            let apiResponse = response.generate(false, 'Stocks retrieved', 200, retrievedDetails)
            res.send(apiResponse)
        }
    })
}

// End of getStocksBySymbol ---

// getStocksCountBySymbol function ---

let getStocksCountBySymbol = (req, res) => {
    stocksModel.count({ 'symbol' :req.params.symbol }).lean().exec((err, retrievedDetails) => {
        if (err) {
            logger.error('Failed to get Product details', 'stockController:getStocksCountBySymbol()', 10)
            let apiResponse = response.generate(true, 'Failed to get Stock details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(retrievedDetails)) {
            logger.info('No Stocks Found', 'stockController:getStocksCountBySymbol()', 10)
            let apiResponse = response.generate(false, 'No Stocks Found', 404, null)
            res.send(apiResponse)
        } else {
            delete retrievedDetails._id;
            delete retrievedDetails.__v;
            logger.info(' Stocks Found', 'stockController:getStocksCountBySymbol()', 10)
            let apiResponse = response.generate(false, 'Stocks Counted', 200, retrievedDetails)
            res.send(apiResponse)
        }
    })
}

// End of getStocksCountBySymbol--

// getStocksCount ------

let getStocksCount = (req, res) => {
    stocksModel.count({}).lean().exec((err, retrievedDetails) => {
        if (err) {
            logger.error('Failed to get Product details', 'stockController:getStocksCount()', 10)
            let apiResponse = response.generate(true, 'Failed to get Stock details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(retrievedDetails)) {
            logger.info('No Stocks Found', 'stockController:getStocksCount()', 10)
            let apiResponse = response.generate(false, 'No Stocks Found', 404, null)
            res.send(apiResponse)
        } else {
            delete retrievedDetails._id;
            delete retrievedDetails.__v;
            logger.info(' Stocks Found', 'stockController:getStocksCount()', 10)
            let apiResponse = response.generate(false, 'Stocks Counted', 200, retrievedDetails)
            res.send(apiResponse)
        }
    })
}

// -- End of getStocksCount



module.exports = {
    getAllStocks: getAllStocks,
    getStocksCount:getStocksCount,
    getStocksCountBySymbol: getStocksCountBySymbol,
    getDistinctSymbols : getDistinctSymbols,
    getStocksBySymbol : getStocksBySymbol
}