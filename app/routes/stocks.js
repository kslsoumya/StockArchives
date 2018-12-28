const express = require('express');
const router = express.Router();
const stocksController = require("./../../app/controllers/stockController");
const appConfig = require("./../../config/appConfig")

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/stocks`;

    //  defining routes.
    app.get(`${baseUrl}/get/all`, stocksController.getAllStocks);

     /**
      * @apiGroup Stocks
      * @apiVersion  1.0.0
      * @api {get} /api/v1/stocks/get/all Get Stocks

      * 
      * @apiSuccess {object} myResponse shows error status, message, http status code, result.
      * 
      * @apiSuccessExample {object} Success-Response:
          {
             "error": false,
             "message": "Stocks retrieved",
             "status": 200,
             "data": {
                      "_id":"5c24c6e1cf529adecee4a98a",
                      "date":"2010-01-04",
                      "symbol":"A",
                      "open":31.389999,
                      "close":31.300001,
                      "low":31.13,
                      "high":31.630001,
                      "volume":3815500
                     }
         }
    */

     app.get(`${baseUrl}/get/symbols`,stocksController.getDistinctSymbols);

     /**
      * @apiGroup Stocks
      * @apiVersion  1.0.0
      * @api {get} /api/v1/stocks/get/symbols Get Symbols

      * 
      * @apiSuccess {object} myResponse shows error status, message, http status code, result.
      * 
      * @apiSuccessExample {object} Success-Response:
          {
             "error": false,
             "message": "Symbols retrieved",
             "status": 200,
             "data": ["WLTW","A","AAL","AAPL","ABC","ACN",
                      "AAP","ADBE","ADI","ABT","ADP","ADS",
                      "ADSK"......]
         }
    */

     



app.get(`${baseUrl}/get/filter/:symbol`, stocksController.getStocksBySymbol);


 /**
      * @apiGroup Stocks
      * @apiVersion  1.0.0
      * @api {get} /api/v1/stocks/get/filter/:symbol  Symbol Filter
      *

      * 
      * @apiSuccess {object} myResponse shows error status, message, http status code, result.
      * 
      * @apiSuccessExample {object} Success-Response:
          {
             "error": false,
             "message": "Stocks retrieved",
             "status": 200,
             "data": {
                       "_id":"5c24c6e1cf529adecee4a9e7",
                       "date":"2010-01-04",
                       "symbol":"CMS",
                       "open":15.67,
                       "close":15.79,
                       "low":15.61,
                       "high":15.86,
                       "volume":5875500}
                        
                     }
         }
    */

   app.get(`${baseUrl}/get/count`, stocksController.getStocksCount);

   /**
      * @apiGroup Stocks
      * @apiVersion  1.0.0
      * @api {get} /api/v1/stocks/get/count  Get Stocks Count
      *

      * 
      * @apiSuccess {object} myResponse shows error status, message, http status code, result.
      * 
      * @apiSuccessExample {object} Success-Response:
          {
             "error": false,
             "message": "Stocks Counted",
             "status": 200,
             "data": 851264
         }
    */
   app.get(`${baseUrl}/get/symbol_count/:symbol`, stocksController.getStocksCountBySymbol);

 /**
      * @apiGroup Stocks
      * @apiVersion  1.0.0
      * @api {get} /api/v1/stocks/get/symbol_count/:symbol  Get Stocks Count of a Symbol
      *

      * 
      * @apiSuccess {object} myResponse shows error status, message, http status code, result.
      * 
      * @apiSuccessExample {object} Success-Response:
          {
             "error": false,
             "message": "Stocks Counted",
             "status": 200,
             "data": 1372
         }
    */


}
