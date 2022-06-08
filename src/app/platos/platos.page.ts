import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GalleryService } from '../services/gallery.service';

@Component({
  selector: 'app-platos',
  templateUrl: './platos.page.html',
  styleUrls: ['./platos.page.scss'],
})
export class PlatosPage implements OnInit {
  id: any;

  constructor(private _authService: AuthService, private _gallery: GalleryService, private _activeRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this._activeRouter.snapshot.params;
    console.log(this.id);
    this._gallery.getplatos(this.id.id, this.id.id1);
    this._gallery.getplatosimg(this.id.id);

  }
  isUserAuthenticated(): boolean {
    return this._authService.isUserAuthenticated();
  }

  get platos_rest():any[]{
    console.log(this._gallery.platos);
    return this._gallery.platos;
  }
  get img_platos_rest():any[]{
    console.log(this._gallery.imgplatos);
    return this._gallery.imgplatos;
  }
}
