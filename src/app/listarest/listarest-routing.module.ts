import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarestPage } from './listarest.page';

const routes: Routes = [
  {
    path: '',
    component: ListarestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarestPageRoutingModule {}
