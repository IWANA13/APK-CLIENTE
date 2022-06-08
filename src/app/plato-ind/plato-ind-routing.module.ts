import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlatoIndPage } from './plato-ind.page';

const routes: Routes = [
  {
    path: '',
    component: PlatoIndPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatoIndPageRoutingModule {}
