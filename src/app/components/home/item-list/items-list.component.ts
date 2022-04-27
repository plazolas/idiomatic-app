import {Component, Input, ElementRef, AfterViewInit, OnInit, Output, ViewChild} from '@angular/core';
import {Item} from '../../../models/item.model';
import {ItemsEntryService} from '../../../services/items-entry.service';
import {ItemDisplayComponent} from '../item-display/item-display.component';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit, AfterViewInit {

  @Input() items!: Item[];
  @Input() term = '';

  itemDisplayElements!: ElementRef;
  item!: Item;

  buttons!: HTMLCollection;
  tableRows!: HTMLCollection;
  initTableRows!: HTMLCollection;

  createBtn!: HTMLElement;
  updateBtn!: HTMLElement;
  deleteBtn!: HTMLElement;

  @ViewChild('itemsListCmp', {static: false}) cmp: ElementRef;
  @ViewChild('itemDisplayComponent', {static: false}) itemDisplayCmp: ItemDisplayComponent;

  constructor(private itemsService: ItemsEntryService) {
  }

  ngOnInit() {
    this.items = this.itemsService.getItems();
    this.resetDisplayItem();
  }

  ngAfterViewInit() {
    this.itemDisplayElements = this.itemDisplayCmp.itemDisplayRoot;
    this.buttons = this.cmp.nativeElement.querySelectorAll('.btn');
    this.tableRows = this.cmp.nativeElement.querySelectorAll('.items-table-cell');
    this.initTableRows = this.cmp.nativeElement.querySelectorAll('.items-table-cell');
    this.createBtn = this.cmp.nativeElement.querySelector('#create-btn');
    this.updateBtn = this.cmp.nativeElement.querySelector('#update-btn');
    this.deleteBtn = this.cmp.nativeElement.querySelector('#delete-btn');
  }

  clickedListItem(event: any, clickedItem: Item) {
    const clickedRow: HTMLElement = event.target;

    this.item = clickedItem;

    Array.from(this.buttons).forEach((button) => {
      if (button.id === 'create-btn' || button.id === 'update-btn') {
        button.setAttribute('disabled', 'true');
      } else {
        button.removeAttribute('disabled');
      }
    });
    const b = this.initTableRows;
    const a = Array.from(this.initTableRows);
    b.item(0);
    const c = this.buttons;

    a.filter(o => o.querySelector('span').innerText !== clickedItem.id.toString())
      .forEach((row) => {
        row.removeAttribute('style');
      });

    clickedRow.setAttribute('style', 'background-color: lightskyblue;');

  }

  updateItem() {
    this.createItem();
    Array.from(this.tableRows).forEach((row) => {
      row.removeAttribute('style');
    });
    this.updateBtn.setAttribute('disabled', 'true');
    this.deleteBtn.setAttribute('disabled', 'true');
    this.resetDisplayItem();
  }

  createItem() {
    let currentItem!: Item;
    const itemNum = parseInt(this.itemDisplayElements.nativeElement.querySelector('#d-item-id').innerText, 10);
    const iName: string = this.itemDisplayElements.nativeElement.querySelector('#d-item-name-value').innerText;
    const iSurname: string = this.itemDisplayElements.nativeElement.querySelector('#d-item-surname-value').innerText;
    if (itemNum === 0) {
      if (iName.length === 0 || iSurname.length === 0) {
        alert('You must enter Name and Surname to create a new item');
        return;
      }
      const iId = this.itemsService.getNextId();
      currentItem = {id: iId, itemName: this.capitalize(iName), itemSurname: this.capitalize(iSurname)};
      this.itemsService.addItem(currentItem);
    } else {
      currentItem = {id: itemNum, itemName: this.capitalize(iName), itemSurname: this.capitalize(iSurname)};
      this.itemsService.updateItem(currentItem);
    }
    this.items = this.itemsService.getItems();
    this.createBtn.setAttribute('disabled', 'true');
    this.updateBtn.setAttribute('disabled', 'true');
    this.deleteBtn.setAttribute('disabled', 'true');
    this.resetDisplayItem();
  }

  deleteItem() {
    const e: HTMLElement = this.itemDisplayElements.nativeElement.querySelector('#d-item-id');
    const itemNum = (this.isElement(e)) ? parseInt(e.innerText, 10) : 0;
    if (itemNum > 0) {
      this.itemsService.deleteItem(itemNum);
      this.items = this.itemsService.getItems();
      this.deleteBtn.setAttribute('disabled', 'false');
      this.resetDisplayItem();
    }
  }

  onDisplayItemChange() {
    const e: HTMLElement = this.itemDisplayElements.nativeElement.querySelector('#d-item-id');
    const itemNum = (this.isElement(e)) ? parseInt(e.innerText, 10) : 0;
    if (itemNum === 0) {
      this.createBtn.removeAttribute('disabled');
    } else {
      this.updateBtn.removeAttribute('disabled');
    }
  }

  capitalize(s: string): string {
    if (typeof s !== 'string') {
      return '';
    }
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  resetDisplayItem() {
    this.item = {id: 0, itemName: '', itemSurname: ''};
  }

  isElement($obj) {
    try {
      return ($obj.constructor.__proto__.prototype.constructor.name) ? true : false;
    } catch (e) {
      return false;
    }
  }
}
