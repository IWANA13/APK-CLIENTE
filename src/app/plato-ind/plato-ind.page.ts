import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { GalleryService } from '../services/gallery.service';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-plato-ind',
  templateUrl: './plato-ind.page.html',
  styleUrls: ['./plato-ind.page.scss'],
})
export class PlatoIndPage implements OnInit {
  id: any;
  private _lista_pedido: any[] = [];
  constructor(private alertCtrl: AlertController, private _gallery: GalleryService, private _authService: AuthService, private _activeRouter: ActivatedRoute,private _pedido:PedidoService,private router: Router) { }
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

  async showAlert(nombre, platoid, precio){
    const alert =await this.alertCtrl.create({
      header: 'Información adicional',
      // 'Local', 'Virtual'
      inputs: [
        {
          type: 'number', name: 'n_platos', placeholder: 'Numero de platos'
        },
        {
          type: 'text', name: 'observaciones', placeholder: 'Observaciones'
        }
      ],
      buttons: [
        {
          text: 'Añadir',
          role: 'Cancle',
          handler: (res) => {
            // console.log(res.n_platos);
            // console.log(res.observaciones);
            
            let cantidad=res.n_platos;
            let sup=0;
            let observacion=res.observaciones;

            this._pedido.saveplato(nombre, platoid, cantidad, sup, observacion, precio);

            this.router.navigate(['/pedido']);

          }
          // handler: (value: any) => {
            // localStorage.setItem('IdRes', id);
            // localStorage.setItem('Tipo_Comanda', 'Local');
            // this.router.navigate(['/carta', id]);
          // }
        }
      ],
    });
    await alert.present();

  }


  // saveplato(nombre, platoid):void {

  //   let cantidad=0;
  //   let sup=0;
  //   let observacion=0;

  //   this._pedido.saveplato(nombre, platoid, cantidad, sup, observacion);

  //   this.router.navigate(['/pedido']);
  // }

}
