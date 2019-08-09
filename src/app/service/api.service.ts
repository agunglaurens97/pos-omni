import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private storage: Storage) { }

  url = 'http://willhardevelopers.site/apiku/index.php/api';
  apiKey = 123;

  getAllProducts(id){
    var headers = new HttpHeaders();
    headers.append("Accept", 'Access-Control-Allow-Origin');
    headers.append('Content-Type', 'application/json' );

    return new Promise(resolve => {
      this.http.post(`${this.url}/listProduct/?key=${this.apiKey}`, {
        "id_outlet": id
      }, {
        headers
      })
      .subscribe(data => {
        resolve(data["data"]);
      }, error => {
        console.log("No Internet Connection!");
      });
    });
  }

  getProductCategory(id){
    var headers = new HttpHeaders();
    headers.append("Accept", 'Access-Control-Allow-Origin');
    headers.append('Content-Type', 'application/json' );

    return new Promise(resolve => {
      this.http.post(`${this.url}/listProductCategory/?key=${this.apiKey}`, {
        "id_outlet": id
      }, {
        headers
      })
      .subscribe(data => {
        resolve(data["data"]);
      }, error => {
        console.log("No Internet Connection!");
      });
    });
  }

  getAllTransaction(id){
    var headers = new HttpHeaders();
    headers.append("Accept", 'Access-Control-Allow-Origin');
    headers.append('Content-Type', 'application/json' );

    return new Promise(resolve => {
      this.http.post(`${this.url}/transactionHistory/?key=${this.apiKey}`, {
        "id_outlet": id,
        "mode": "all"
      }, {
        headers
      })
      .subscribe(data => {
        resolve(data["data"]);
      }, error => {
        console.log("No Internet Connection!");
      });
    });
  }

  getCustomerInfo(info){
    var headers = new HttpHeaders();
    headers.append("Accept", 'Access-Control-Allow-Origin');
    headers.append('Content-Type', 'application/json' );

    return new Promise(resolve => {
      this.http.post(`${this.url}/customerInfo/?key=${this.apiKey}`, {
        "param": info,
      }, {
        headers
      })
      .subscribe(data => {
        resolve(data["data"]);
      }, error => {
        console.log("No Internet Connection!");
      });
    });
  }

  useVoucher(code){
    var headers = new HttpHeaders();
    headers.append("Accept", 'Access-Control-Allow-Origin');
    headers.append('Content-Type', 'application/json' );

    return new Promise(resolve => {
      this.http.post(`${this.url}/scanVoucher/?key=${this.apiKey}`, {
        "voucherCode": code,
      }, {
        headers
      })
      .subscribe(data => {
        resolve(data["data"]);
      }, error => {
        console.log("No Internet Connection!");
      });
    });
  }
}
