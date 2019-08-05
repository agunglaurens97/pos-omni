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
  public saved = {};
  orders: Item[] = [];
  total = 0;
  newItem: Item = <Item>{};

  savedItems= [];
  
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

    this.loadItemsSaved();

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
    this.storageService.addItemSavedOrder(this.orders);

    this.storage.remove(this.storageService.getKey());
    this.total = 0;
    this.orders = [];
  }

  clearCart(){
    this.orders = [];
    this.storage.remove(this.storageService.getKey());

    this.total = 0;

  }

  // CREATE
  addItem(item) {
    this.newItem = {
      id: item.id_product,
      price: parseInt(item.price),
      title: item.name,
      qty: 1
    }

    this.storageService.checkItem(this.newItem).then( item =>{
      // itemnya ada, nambah jumlah tok
      if(item == 1){
        this.storageService.checkQty(this.newItem).then( data => {
          this.newItem.qty = data;
          this.updateItem(this.newItem);
        })
        
      }else {
        this.storageService.addItem(this.newItem).then(item => {
          this.newItem = <Item>{};
          this.loadItems(); // Or add it to the array directly
        });
      }
    })
  }

  // READ
  loadItems() {
    this.storageService.getItems().then(items => {
      this.orders = items;

      this.calculateTotal(items);
    });
  }

  // READ SAVED ITEM
  loadItemsSaved(){
    this.storageService.getItemSavedOrder().then(items => {
      if(items){
        items.forEach(element => {
          var details = JSON.parse(JSON.stringify(element));
          console.log(details);
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
