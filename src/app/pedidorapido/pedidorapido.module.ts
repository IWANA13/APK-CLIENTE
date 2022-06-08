import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidorapidoPageRoutingModule } from './pedidorapido-routing.module';

import { PedidorapidoPage } from './pedidorapido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidorapidoPageRoutingModule
  ],
  declarations: [PedidorapidoPage]
})
export class PedidorapidoPageModule {}
