import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scan-customer',
  templateUrl: './scan-customer.page.html',
  styleUrls: ['./scan-customer.page.scss'],
})
export class ScanCustomerPage implements OnInit {

  customer = null;
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  btnConfirm(){
    this.modalController.dismiss(this.customer);
  }

  btnClose(){
    this.modalController.dismiss();
  }

}
