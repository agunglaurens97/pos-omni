import { StorageService } from './../service/storage.service';
import { ApiService } from './../service/api.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Item } from '../service/storage.service';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})

export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];

  listProduct: {};
  listCategory: {};
  public filter = "-1";
  orders: Item[] = [];
 
  newItem: Item = <Item>{};
  
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(private storage: Storage, private API: ApiService, private plt: Platform, private storageService: StorageService) {
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
  }

  // CREATE
  addItem(item) {
    this.newItem = {
      id: item.id_product,
      price: item.price,
      title: item.name,
      qty: 1
    }
    
    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
      this.loadItems(); // Or add it to the array directly
    });

    
  }

  // READ
  loadItems() {
    this.storageService.getItems().then(items => {
      this.orders = items;
    });

    console.log(this.orders);
  }

  // UPDATE
  updateItem(item: Item) {
    item.qty++;

    this.storageService.updateItem(item).then(item => {
      this.loadItems(); // Or update it inside the array directly
    });
  }

  // // DELETE
  // deleteItem(item: Item) {
  //   this.storageService.deleteItem(item.id).then(item => {
  //     this.showToast('Item removed!');
  //     this.mylist.closeSlidingItems(); // Fix or sliding is stuck afterwards
  //     this.loadItems(); // Or splice it from the array directly
  //   });
  // }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
