import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
 
export interface Item {
  id: number,
  title: string,
  price: number,
  qty: number
}

export interface Orders {
  id: number,
  details: Item[],
  grandtotal: number,
}
 
const ITEMS_KEY = 'orders';
 
@Injectable({
  providedIn: 'root'
})
export class StorageService {
 
  orderku: Orders;
  constructor(private storage: Storage) { }
 
  // CREATE
  addItem(item: Item): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((orders: Orders[]) => {
      if(orders){
        if (orders['details']) {
          orders['details'].push(item);
          return this.storage.set(ITEMS_KEY, orders);
        } else {
          orders['details'] = item;
          return this.storage.set(ITEMS_KEY, orders);
        }
      }else {
        this.orderku = {
          id: 0,
          details: [item],
          grandtotal: 0,
        }
        return this.storage.set(ITEMS_KEY, this.orderku);
      }
     
    });
  }

  // CREATE FOR SAVED ORDER
  addItemSavedOrder(item): Promise<any> {
    return this.storage.get("savedOrder").then((items: Item[]) => {
      if (items) {
        items.push(item);
        return this.storage.set("savedOrder", items);
      } else {
        return this.storage.set("savedOrder", [item]);
      }
    });
  }

  getKey(){
    return ITEMS_KEY;
  }

  checkItem(item : Item): Promise<any>{
    return this.storage.get(ITEMS_KEY).then((orders: Orders[]) => {
      //console.log("asd",items);
      if (orders == null) {
        return 0;
      } else {
        return this.storage.get(ITEMS_KEY).then((orders: Orders[]) => {
          for (let i of orders['details']) {
            if (i.id === item.id) {
              return 1;
            }
          }
          return 0;
        });
      }
    }); 
  }

  checkQty(item : Item): Promise<any>{
    return this.storage.get(ITEMS_KEY).then((orders: Orders[]) => {
      for (let i of orders['details']) {
        if (i.id === item.id) {
          return i.qty;
        }
      }
    });
  }
 
  // READ
  getItems(): Promise<Item[]> {
    return this.storage.get(ITEMS_KEY);
  }

  // READ FOR SAVED ORDER
  getItemSavedOrder(): Promise<Item[]> {
    return this.storage.get("savedOrder");
  }
 
  // UPDATE
  updateItem(item: Item): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((orders: Orders[]) => {
      if (!orders) {
        return null;
      }
 
      
      let newItems: Item[] = [];

      let orderbaru = {
        id: orders['id'],
        details: newItems,
        grandtotal: orders['grandtotal'],
      }
 
      for (let i of orders['details']) {
        if (i.id === item.id) {
          orderbaru['details'].push(item);
        } else {
          orderbaru['details'].push(i);
        }
      }
      
      return this.storage.set(ITEMS_KEY, orderbaru);
    });
  }

  // UPDATE ORDERS
  updateOrder(order: Orders): Promise<any>{
    return this.storage.set(ITEMS_KEY, order);
  }
 
  // DELETE
  deleteItem(id: number): Promise<Item> {
    return this.storage.get(ITEMS_KEY).then((orders: Orders[]) => {
      if (!orders || orders.length === 0) {
        return null;
      }
 
      let toKeep: Item[] = [];

      let orderbaru = {
        id: orders['id'],
        details: toKeep,
        grandtotal: orders['grandtotal'],
      }
 
      for (let i of orders['details']) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, orderbaru);
    });
  }

  // DELETE ITEM SAVED ORDER
  deleteItemSavedOrder(id: number): Promise<Item> {
    return this.storage.get("savedOrder").then((items: Item[]) => {
      if (!items || items.length === 0) {
        return null;
      }
 
      let toKeep: Item[] = [];
 
      for (let i of items) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set("savedOrder", toKeep);
    });
  }
  
}