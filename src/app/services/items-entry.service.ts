import { Injectable } from '@angular/core';
import {Item, items} from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsEntryService {
  private currentItems: Item[] = items;

  constructor() { }

  getItems(): Item[] {
    return  this.currentItems;
  }
  getItemById(itemId: number): Item {
    return  this.currentItems.find(item => item.id === itemId);
  }
  addItem(item: Item) {
    this.currentItems.push(item);
  }
  deleteItem(itemId: number): void {
    this.currentItems = this.currentItems.filter(o => o.id !== itemId);
  }
  updateItem(item: Item): void {
    const oldItem: Item = this.getItemById(item.id);
    if (typeof oldItem !== 'undefined') {
      oldItem.itemName = item.itemName;
      oldItem.itemSurname = item.itemSurname;
    }
  }
  getNextId(): number {
    let max = 0;
    this.currentItems.forEach(item => {
      if (item.id > max) {
        max = item.id;
      }
    });
    return max + 1;
  }
}
