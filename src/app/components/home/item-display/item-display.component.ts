import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Item } from '../../../models/item.model';

@Component({
  selector: 'app-item-display',
  templateUrl: './item-display.component.html',
  styleUrls: ['./item-display.component.css']
})
export class ItemDisplayComponent implements OnInit {
  
  @Input()  displayItem: Item = { id: 0, itemName: '', itemSurname: '' };

  @Output() editItem = new EventEmitter<Event>();
  
  @ViewChild('itemDisplayCmp', {static: false}) itemDisplayRoot: ElementRef;
  constructor() {}

  ngOnInit() {}

  itemDisplayedChanged(event: Event, item: Item) {
    this.editItem.emit(event);
  }

  activateClearButton() {
    console.log('OUTSIDE');
  }

}
