import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GalleryService } from '../services/gallery.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  id: any;

  constructor(private _authService: AuthService, private _gallery: GalleryService, private _activeRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this._activeRouter.snapshot.params;
    console.log(this.id);
    this._gallery.getcategorias(this.id.id, this.id.id1);
    this._gallery.getcategoriasimg(this.id.id);

  }
  isUserAuthenticated(): boolean {
    return this._authService.isUserAuthenticated();
  }

  get categorias_rest():any[]{
    console.log(this._gallery.categorias);
    return this._gallery.categorias;
  }
  get img_categorias_rest():any[]{
    console.log(this._gallery.imgcategorias);
    return this._gallery.imgcategorias;
  }

}
