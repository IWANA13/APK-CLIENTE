import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { GalleryService } from '../services/gallery.service';

@Component({
  selector: 'app-listarest',
  templateUrl: './listarest.page.html',
  styleUrls: ['./listarest.page.scss'],
})
export class ListarestPage implements OnInit {
  constructor(private _gallery: GalleryService, private _authService: AuthService) { }
  isUserAuthenticated(): boolean {
    return this._authService.isUserAuthenticated();
  }
  ngOnInit(): void {
    this._gallery.getgallery();
    this._gallery.getimgrest();

    // this.resultados = this._gallery.photos;
  }

  get listarest():any[]{
    // console.log(this._gallery.photos);
    return this._gallery.photos;
  }
  get imgrest():any[]{
    // console.log(this._gallery.imgrest);
    return this._gallery.imgrest;
  }
}
