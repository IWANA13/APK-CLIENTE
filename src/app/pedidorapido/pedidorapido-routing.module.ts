import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidorapidoPage } from './pedidorapido.page';

const routes: Routes = [
  {
    path: '',
    component: PedidorapidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidorapidoPageRoutingModule {}
