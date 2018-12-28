import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { StocksComponent } from './stocks/stocks.component';
import  {RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component'
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';
import { OrderModule } from 'ngx-order-pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import {NgxPaginationModule} from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    StocksComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    OrderModule,
    RouterModule.forRoot([
      { path: 'stocks', component: StocksComponent },
      { path: '', redirectTo: 'stocks', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent }
    ])
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
