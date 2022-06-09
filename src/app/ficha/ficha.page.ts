import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GalleryService } from '../services/gallery.service';
import { MapsService } from '../services/maps.service';
import { HttpClient } from '@angular/common/http';

import * as L from 'leaflet';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.page.html',
  styleUrls: ['./ficha.page.scss'],
})
export class FichaPage implements OnInit, AfterViewInit {
  id: any;
  private map;
  direccion: string;
  capitals: string = '/assets/data/usa-capitals.geojson';


  constructor(private alertCtrl: AlertController, private router: Router, private _gallery: GalleryService, private _mapsService: MapsService,private _authService: AuthService, private _activeRouter: ActivatedRoute, private http: HttpClient) { }
  isUserAuthenticated(): boolean {
    return this._authService.isUserAuthenticated();
  }
  ngOnInit(): void {
    this.id = this._activeRouter.snapshot.params;
    console.log(this.id);
    this._gallery.getindgallery(this.id.id);
    this._gallery.getimgrestind(this.id.id);    
  }


get ind_rest():any[]{
  return this._gallery.ind_rest;
  
}
get imgrestind():any[]{
  console.log(this._gallery.imgrestind);
  return this._gallery.imgrestind;
}
  // loaddesc(id:string){
  //   document.getElementById("ckeditor-desc"+id).innerHTML = this._gallery.ind_rest[id].Descripcio;
  // }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 41.61453, 0.6271 ],
      zoom: 10
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 10,
      attribution: ''
    });

    tiles.addTo(this.map);
    
  }

  restpedido(restid):void{
    localStorage.setItem('rest_pedido',restid);
  }

  async showAlert(){
    const alert =await this.alertCtrl.create({
      header: 'Selecciona el tipo de pedido que quieres realizar',
      // 'Local', 'Virtual'
      buttons: [
        {
          text: 'Local',
          role: 'Cancle',
          handler: (value: any) => {
            localStorage.setItem('IdRes', this.id.id);
            localStorage.setItem('Tipo_Comanda', 'local');
            this.router.navigate(['/carta', this.id.id]);
          }
        },
        {
          text: 'Virtual',
          role: 'Cancle',
          handler: (value: any) => {
            localStorage.setItem('IdRes', this.id.id);
            localStorage.setItem('Tipo_Comanda', 'virtual');
            this.router.navigate(['/carta', this.id.id]);
          }
        }
      ],
    });
    
    await alert.present();
  }

  ngAfterViewInit(): void {
    // this.initMap();
  }
}
