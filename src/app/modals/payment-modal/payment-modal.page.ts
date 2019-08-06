import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Item } from 'src/app/service/storage.service';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.page.html',
  styleUrls: ['./payment-modal.page.scss'],
})
export class PaymentModalPage implements OnInit {

  passedOrder = null;
  total = 0;
  diskon = 0;
  newItem: Item = <Item>{};
  
  constructor(private nav: NavParams, private modalController: ModalController) { }

  ngOnInit() {
    this.passedOrder = this.nav.get("orders");
    this.calculateTotal(this.passedOrder);
  }

  btnClose(){
    this.modalController.dismiss();
  }

  calculateTotal(items){
    if(items != null){
      this.total = 0;
      items.forEach(element => {
        this.total = this.total + (element.price*element.qty);
      });
    }
  }

  btnBayar(){
    this.modalController.dismiss("success");
  }

}
