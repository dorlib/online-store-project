import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemFormComponent } from './item-list/item-form/item-form.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ItemFormComponent,
    WelcomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
