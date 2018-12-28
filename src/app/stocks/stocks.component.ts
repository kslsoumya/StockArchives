import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { OrderPipe } from 'ngx-order-pipe';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  public stocksList = [];
  public symbol;
  public symbolsList = [];
  public reverse = false;
  public selectedSymbol;
  public stockDetail;
  public order = 'symbol'
  public p = 1;
  public stocksCount;
  public columns = [{ title: 'Symbol', reverse: false },
  { title: 'Low', reverse: false }, { title: 'High', reverse: false },
  { title: 'Open', reverse: false }, { title: 'Close', reverse: false }]

  constructor(public http: HttpService, private orderPipe: OrderPipe, public spinner: NgxSpinnerService,
    private toastr: ToastrService) {
    this.stocksList = this.orderPipe.transform(this.stocksList, this.order);
  }

  ngOnInit() {
    this.getDefaultValues();
    this.getSymbolsList();
  }

  public getDefaultValues =()=> {
    this.spinner.show()
    let skip = 1;
    this.http.getAllStocks(skip).subscribe(
      (resp) => {
        this.spinner.hide();
        if (resp['status'] === 200) {
          this.stocksList = resp['data'];
        } else if (resp['status'] === 404) {
          this.toastr.warning('No Stocks Found!!');
        }
      },
      (err) => {
        this.spinner.hide();
        this.toastr.error(err);
      }
    )
    this.http.getStocksCount().subscribe(
      (resp) => {
        this.stocksCount = resp['data'];
      },
      (err) => {
        this.toastr.error(err);
      }
    )
  }

  public getSymbolsList =() =>{
    this.http.getAllSymbols().subscribe(
      (resp) => {
        this.symbolsList = resp['data']
      },
      (err) => {
        this.toastr.error(err);
      });
  }


  public setOrder(value) {
    this.toastr.success('Sorting');
    this.columns.forEach((ele, i) => {
      if (ele.title === value) {
        this.columns[i].reverse = !this.columns[i].reverse
      }
    })
    if (this.order === value.toLowerCase()) {
      this.reverse = !this.reverse;
    }
    this.order = value.toLowerCase();
  }

  public changePage = (event) => {
    this.spinner.show();
    if (!this.selectedSymbol) {
      this.http.getAllStocks(event).subscribe(
        (resp) => {
          this.spinner.hide();
          if (resp['status'] === 200) {
            this.stocksList = resp['data']
          } else if (resp['status'] === 404) {
            this.toastr.warning('No Stocks Found');
          }
        },
        (err) => { this.toastr.error(err); }
      )
    } else if (this.selectedSymbol) {
      this.http.getStocksBySymbol(this.selectedSymbol, event).subscribe(
        (resp) => {
          this.spinner.hide();
          if (resp['status'] === 200) {
            this.stocksList = resp['data'];
          } else if (resp['status'] === 404) {
            this.toastr.warning('No Stocks Found');
          }
        },
        (err) => {
          this.toastr.error(err);
        }
      )
    }
  }

  public filterSymbol = () => {
    this.spinner.show();
    this.http.getStocksCountBySymbol(this.selectedSymbol).subscribe(
      (resp) => {
        this.stocksCount = resp['data'];
      },
      (err) => {
        this.toastr.error(err);
      }
    )
    this.http.getStocksBySymbol(this.selectedSymbol, 1).subscribe(
      (resp) => {
        this.spinner.hide();
        if (resp['status'] === 200) {
          this.stocksList = resp['data'];
        } else if (resp['status'] === 404) {
          this.toastr.warning('No Stocks Found');
        }
      },
      (err) => {
        this.toastr.error(err);
      }
    )
  }

  public modalClick = (stock) => {
    this.stockDetail = stock;
  }

  public clearSelection() {
    if(this.selectedSymbol){
    this.getDefaultValues();
    this.selectedSymbol=''
    }
  }


}
