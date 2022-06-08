import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GalleryService } from '../services/gallery.service';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.page.html',
  styleUrls: ['./carta.page.scss'],
})
export class CartaPage implements OnInit {
  id: any;

  constructor(private _authService: AuthService, private _gallery: GalleryService, private _activeRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this._activeRouter.snapshot.params;
    console.log(this.id);
    this._gallery.getcartas(this.id.id);
    this._gallery.getcartasimg(this.id.id);
  }
  isUserAuthenticated(): boolean {
    return this._authService.isUserAuthenticated();
  }

  get cartas_rest():any[]{
    console.log(this._gallery.cartas);
    return this._gallery.cartas;
  }
  get img_cartas_rest():any[]{
    console.log(this._gallery.imgcartas);
    return this._gallery.imgcartas;
  }
}
