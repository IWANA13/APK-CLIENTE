import { Component, OnInit } from '@angular/core';
import { Galeria } from '../models/galeria';
import { AuthService } from '../services/auth.service';
import { GalleryService } from '../services/gallery.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  restaurantesarr: any = [];

  constructor(private _gallery: GalleryService, private _authService: AuthService) { }
  isUserAuthenticated(): boolean {
    return this._authService.isUserAuthenticated();
  }
  ngOnInit(): void {
    this._gallery.getgallery();
    this._gallery.getimgrest();
    // this.resultados = this._gallery.photos;
  }
  logout(){
    this._authService.logout();
  }
  get listarest():any[]{
    console.log(this._gallery.photos);

    return this._gallery.photos;
  }
  get imgrest():any[]{
    console.log(this._gallery.imgrest);
    return this._gallery.imgrest;
  }

  isdark(): string{
    return localStorage.getItem("BG");
  }


  setDarkMode(event):void{
    if(event.detail.checked){
      document.body.setAttribute('color-theme', "dark");
      localStorage.setItem("BG","true");
    }else{
      document.body.removeAttribute('color-theme');
      localStorage.setItem("BG","false");
    }
  }
}
