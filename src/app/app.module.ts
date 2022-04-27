import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ItemsListComponent } from './components/home/item-list/items-list.component';
import { ItemDisplayComponent } from './components/home/item-display/item-display.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { FilterItemsPipe } from './pipes/filter-items.pipe';
import { ClickedOutDirective } from './directives/clicked-out.directive';

@NgModule({
  declarations: [
    AppComponent,
    ItemsListComponent,
    ItemDisplayComponent,
    HomeComponent,
    FilterItemsPipe,
    ClickedOutDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
