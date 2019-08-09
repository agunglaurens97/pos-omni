import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-scan-voucher',
  templateUrl: './scan-voucher.page.html',
  styleUrls: ['./scan-voucher.page.scss'],
})
export class ScanVoucherPage implements OnInit {
  data = null;
  voucher = null;
  grandtotal = 0;
  diskon = 0;

  constructor(private modalController: ModalController, private barcodeScanner: BarcodeScanner, private API: ApiService, private nav: NavParams) { }

  ngOnInit() {
    this.grandtotal = this.nav.get("grandtotal");
  }

  btnClose(){
    this.modalController.dismiss();
  }

  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        let x = barcodeData;

        this.API.useVoucher(barcodeData['text']).then( data =>{
          this.data = data['data'];
        });
        console.log(x);
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

  btnConfirm(){
    this.modalController.dismiss(this.diskon);
  }

  btnCekCustomer(){
    this.API.useVoucher(this.voucher).then( data =>{

      console.log(data, this.grandtotal);
      if(this.grandtotal >= parseInt(data['minimum_spend'])){
        if(data['type'] == 'fixed') {
          this.diskon = parseInt(data['maximum_discount']);
          this.data = `<ion-label style='color: red'>BERHASIL! Total Sekarang Rp ${this.grandtotal - this.diskon} dari Rp ${this.grandtotal}</ion-label>`;
        }
        else {
          this.diskon = this.grandtotal*(100/parseInt(data['maximum_discount']));
          this.data = `<ion-label style='color: red'>BERHASIL! Total Sekarang Rp ${this.grandtotal - this.diskon} dari Rp ${this.grandtotal}</ion-label>`;
        }
      } else if(data == 'NULL') this.data = `<ion-label style='color: red'>Voucher tidak ada atau sudah expired! Cek expired voucher anda</ion-label>`;
      else {
        this.data = `<ion-label style='color: red'>Minimum Grandtotal harus Rp ${data['minimum_spend']}</ion-label>`;
      }
    });
  }

}
