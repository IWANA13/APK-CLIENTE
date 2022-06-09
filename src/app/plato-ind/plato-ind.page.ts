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
  private _lista_pedido: any[] = [];
  constructor(private _gallery: GalleryService, private _authService: AuthService, private _activeRouter: ActivatedRoute) { }
  isUserAuthenticated(): boolean {
    return this._authService.isUserAuthenticated();
  }
  ngOnInit(): void {
    this.id = this._activeRouter.snapshot.params;
    console.log(this.id);
    this._gallery.getplatos_ind(this.id.id);
    this._gallery.getplatosimg_ind(this.id.id1, this.id.id);
    this._gallery.getalergenos(this.id.id);
    // this.resultados = this._gallery.photos;
  }

  get platoind():any[]{
    return this._gallery.platos_ind;
  }
  get alergeno():any[]{
    return this._gallery.alergeno;
  }
  get imgplatos_ind():any[]{
    return this._gallery.imgplatos_ind;
  }
  saveplato(nombre, platoid):void {
    //ALERT CON INPUT DE CANTIDAD Y OBSERVACIONES
    var plato_pedido: any[] = [];
    plato_pedido.push({idplato: platoid, plato: nombre});

    if(localStorage.getItem('pedido_data')!=null){
      this._lista_pedido = JSON.parse(localStorage.getItem('pedido_data'));
    }

    this._lista_pedido.push(plato_pedido);
    
    localStorage.setItem('pedido_data', JSON.stringify(this._lista_pedido));
    
    console.log(this._lista_pedido);
    // redirect a los menus de nuevo

  }

}
