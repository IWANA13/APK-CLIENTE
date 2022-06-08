import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarestPageRoutingModule } from './listarest-routing.module';

import { ListarestPage } from './listarest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarestPageRoutingModule
  ],
  declarations: [ListarestPage]
})
export class ListarestPageModule {}
