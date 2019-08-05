import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
 
export interface Item {
  id: number,
  title: string,
  price: number,
  qty: number
}
 
const ITEMS_KEY = 'orders';
 
@Injectable({
  providedIn: 'root'
})
export class StorageService {
 
  constructor(private storage: Storage) { }
 
  // CREATE
  addItem(item: Item): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if (items) {
        items.push(item);
        return this.storage.set(ITEMS_KEY, items);
      } else {
        return this.storage.set(ITEMS_KEY, [item]);
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
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if (items == null) {
        return 0;
      } else {
        return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
          for (let i of items) {
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
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      for (let i of items) {
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
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if (!items || items.length === 0) {
        return null;
      }
 
      let newItems: Item[] = [];
 
      for (let i of items) {
        if (i.id === item.id) {
          newItems.push(item);
        } else {
          newItems.push(i);
        }
      }
 
      return this.storage.set(ITEMS_KEY, newItems);
    });
  }
 
  // DELETE
  deleteItem(id: number): Promise<Item> {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if (!items || items.length === 0) {
        return null;
      }
 
      let toKeep: Item[] = [];
 
      for (let i of items) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    });
  }
  
}