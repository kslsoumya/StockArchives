import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public baseUrl = 'http://stockarchives-api.themeanstackpro.com';
  


  constructor(public _http: HttpClient) { }

  public getAllStocks = (skip) => {
    return this._http.get(`${this.baseUrl}/api/v1/stocks/get/all?skip=${skip}`);
  }
  public getStocksCount = () => {
    return this._http.get(`${this.baseUrl}/api/v1/stocks/get/count`)
  }
  public getAllSymbols = () => {
    return this._http.get(`${this.baseUrl}/api/v1/stocks/get/symbols`);
  }
  public getStocksBySymbol = (symbol,skip) => {
    return this._http.get(`${this.baseUrl}/api/v1/stocks/get/filter/${symbol}?skip=${skip}`)
  }

  public getStocksCountBySymbol = (symbol) => {
    return this._http.get(`${this.baseUrl}/api/v1/stocks/get/symbol_count/${symbol}`)
  }

}
