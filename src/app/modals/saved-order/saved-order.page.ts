import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-saved-order',
  templateUrl: './saved-order.page.html',
  styleUrls: ['./saved-order.page.scss'],
})
export class SavedOrderPage implements OnInit {

  savedOrder = [];
  loadedOrder = [];

  constructor(
    private nav: NavParams,
    private modalController: ModalController,
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.storageService.getItemSavedOrder().then(items => {
      this.savedOrder = items;
    });
  }

  loadOrder(id){
    this.storageService.getItemSavedOrder().then(items => {
      this.savedOrder = items;
      this.savedOrder.forEach(element => {
        if(element.id == id) this.modalController.dismiss(element);
      });
    });
  }

  deleteSaved(id){
    this.storageService.getItemSavedOrder().then(items => {
      this.savedOrder = items;
      this.savedOrder.forEach(element => {
        if(element.id == id) this.storageService.deleteItemSavedOrder(element.id);
      });

      this.ionViewWillEnter();
    });
  }

}
