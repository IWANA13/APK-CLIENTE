import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GalleryService } from '../services/gallery.service';

@Component({
  selector: 'app-plato-ind',
  templateUrl: './plato-ind.page.html',
  styleUrls: ['./plato-ind.page.scss'],
})
export class PlatoIndPage implements OnInit {
  id: any;

  constructor(private _gallery: GalleryService, private _authService: AuthService, private _activeRouter: ActivatedRoute) { }
  isUserAuthenticated(): boolean {
    return this._authService.isUserAuthenticated();
  }
  ngOnInit(): void {
    this.id = this._activeRouter.snapshot.params;
    console.log(this.id);
    this._gallery.getplatos_ind(this.id.id);
    this._gallery.getalergenos(this.id.id);
    // this.resultados = this._gallery.photos;
  }

  get platoind():any[]{
    return this._gallery.platos_ind;
  }
  get alergeno():any[]{
    return this._gallery.alergeno;
  }
  saveplato():void {
    console.log("guardar plato");
  }

}
