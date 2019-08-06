
import { StorageService } from './../service/storage.service';
import { ApiService } from './../service/api.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Item } from '../service/storage.service';
import { Platform, ModalController } from '@ionic/angular';
import { PaymentModalPage } from '../modals/payment-modal/payment-modal.page';
import { ScanCustomerPage } from '../modals/scan-customer/scan-customer.page';
import { SavedOrderPage } from '../modals/saved-order/saved-order.page';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})

export class ListPage implements OnInit {
  

  listProduct: {};
  listCategory: {};
  public filter = "-1";
  public saved = {};
  details: Item = <Item>{};
  detail: Item[] = [];
  orders = [{
    "id": 1,
    "details": this.details,
    "total": 0
  }];
  
  total = 0;
  newItem: Item = <Item>{};

  tmpItem = {};

  customer = "Scan Customer";
  savedItems= {};
  
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(
    private storage: Storage, 
    private API: ApiService, 
    private plt: Platform, 
    private modalController: ModalController,
    private storageService: StorageService) {
    this.plt.ready().then(() => {
      this.loadItems();
    });
  }

  ionViewWillEnter(){
    this.API.getAllProducts(1).then( data =>{
      this.listProduct = data;
    });

    this.API.getProductCategory(1).then( data =>{
      this.listCategory = data;
    })

    //this.loadItemsSaved();

  }

  calculateTotal(items){
    if(items != null){
      this.total = 0;
      items.forEach(element => {
        this.total = this.total + (element.price*element.qty);
      });
    }
  }

  saveOrder(){
    let idx = 0;
    this.storageService.getItemSavedOrder().then( data =>{
      if(data == null) idx = 0
      else idx = data[data.length-1].id;

      this.savedItems = {
        "id": idx+1,
        "details": this.detail,
        "total": this.total
      };
  
      this.storageService.addItemSavedOrder(this.savedItems);
  
      this.storage.remove(this.storageService.getKey());
      
      this.resetInput();
    })
   
  }

  resetInput(){
    this.total = 0;
    this.orders = [];
    this.detail = [];
  }

  async loadSaveOrder(){
    const modal = await this.modalController.create({
      component: SavedOrderPage,
      componentProps: {
        orders: this.orders
      }
    });

    modal.onDidDismiss()
    .then((data) => {
      this.detail = [];
      if(data["data"] != null){

        console.log(data["data"]['details'])
        
        this.detail = data["data"]["details"]

        // this.addItem(data["data"][0]);

        // this.loadItems();
        this.calculateTotal(this.orders);
      }
  });
    modal.present();
  }

  loadedItems(item): Promise<any> {
    return this.storage.get("savedOrder").then((items: Item[]) => {
      if (items) {
        items.push(item);
        return this.storage.set("savedOrder", items);
      } else {
        return this.storage.set("savedOrder", [item]);
      }
    });
  }

  clearCart(){
    this.storage.remove(this.storageService.getKey());

    this.resetInput();

  }

  async btnBayar(){
    const modal = await this.modalController.create({
      component: PaymentModalPage,
      componentProps: {
        orders: this.detail
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        if(data["data"] == "success"){
          this.storage.remove(this.storageService.getKey());

          this.resetInput();
        }
    });

    modal.present();
  }

  async scanCustomer(){
    const modal = await this.modalController.create({
      component: ScanCustomerPage,
    });

    modal.onDidDismiss()
      .then((data) => {
        if(data["data"] != null){
          this.customer = data["data"];

          console.log(this.customer);
        }
    });

    modal.present();
  }

  // CREATE
  addItem(item) {
    this.newItem = {
      id: item.id_product,
      price: parseInt(item.price),
      title: item.name,
      qty: 1,
    }

    this.orders = [{
      "id": 1,
      "details": this.newItem,
      "total": this.total
    }];
    
    // console.log(this.orders[0]["details"]);
    
    this.storageService.checkItem(this.orders[0]["details"]).then( item =>{
      // itemnya ada, nambah jumlah tok
      if(item == 1){
        this.storageService.checkQty(this.orders[0]["details"]).then( data => {
          this.newItem.qty = data;
          this.updateItem(this.newItem);
          this.newItem = <Item>{};
        })
        
      }else {
        this.storageService.addItem(this.orders[0]["details"]).then(item => {
          this.newItem = <Item>{};
          this.loadItems(); // Or add it to the array directly
        });
      }
    });

    this.loadItems();
  }

  // READ
  loadItems() {
    this.storageService.getItems().then(items => {
      // this.orders = [{
      //   "id": 
      // }
      // ];
      // this.orders = items;

      this.detail = items;

      this.calculateTotal(items);
    });
  }

  // READ SAVED ITEM
  loadItemsSaved(){
    this.storageService.getItemSavedOrder().then(items => {
      if(items){
        items.forEach(element => {
          var details = JSON.parse(JSON.stringify(element));
          console.log(element);
          for(let i=0 ;i<details.length;i++)
          {
            console.log(details[i].id);
          }
          
        });
        
      }else {
        
      }
      
    });
  }

  // UPDATE
  updateItem(item: Item) {
    item.qty++;

    this.storageService.updateItem(item).then(item => {
      this.loadItems(); // Or update it inside the array directly
    });
  }

  // DELETE
  deleteItem(item: Item) {
    this.storageService.deleteItem(item.id).then(item => {
      this.loadItems(); // Or splice it from the array directly
    });
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
