import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlatoIndPageRoutingModule } from './plato-ind-routing.module';

import { PlatoIndPage } from './plato-ind.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlatoIndPageRoutingModule
  ],
  declarations: [PlatoIndPage]
})
export class PlatoIndPageModule {}
