import { ApiService } from './../../service/api.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";


@Component({
  selector: 'app-scan-customer',
  templateUrl: './scan-customer.page.html',
  styleUrls: ['./scan-customer.page.scss'],
})
export class ScanCustomerPage implements OnInit {
  encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  customer = null;

  data = null;
  constructor(private modalController: ModalController, private barcodeScanner: BarcodeScanner, private API: ApiService) {
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
   }

  ngOnInit() {
  }

  btnCekCustomer(){
    this.API.getCustomerInfo(this.customer).then( data =>{
     
      if(data[0]['name']){
        this.data = "Nama User: "+  data[0]['name'];
      }else  this.data = "User Tidak Ada!";
      console.log(this.data, this.customer)
    });
  }

  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        let x = barcodeData;

        this.API.getCustomerInfo(barcodeData['text']).then( data =>{
          this.data = data['data'];
        });
        console.log(x);
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

  btnConfirm(){
    console.log(this.data);
    if(this.data != "User Tidak Ada!" && this.data != null) this.modalController.dismiss(this.customer);
  }

  btnClose(){
    this.modalController.dismiss();
  }

}
