import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { GalleryService } from '../services/gallery.service';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  public codigoMesa: string = "";

  constructor(private alertCtrl: AlertController,private _pedido:PedidoService,private _authService: AuthService, private _gallery: GalleryService,private router: Router) { 
    let idRes=localStorage.getItem('IdRes');
    let tipo=localStorage.getItem('Tipo_Comanda');
    this._pedido.pillarMesasTipo(idRes,tipo);
  }

  isUserAuthenticated(): boolean {
    return this._authService.isUserAuthenticated();
  }

  ngOnInit() {
  }

  get platosPed():any[]{
    return this._pedido.listarPlatos;
  }
  get imgplatos_ind():any[]{
    return this._gallery.imgplatos_ind;
  }

  get mesasRestaurante():any[]{
     return this._pedido.listarMesas;
  }
  async enviarPedido(){
    const alert =await this.alertCtrl.create({
      header: 'Datos Pedido',
      // 'Local', 'Virtual'
      inputs: [
        {
          type: 'number', name: 'comensales', placeholder: 'Nº Comensales'
        }
      ],
      buttons: [
        {
          text: 'Enviar Pedido',
          role: 'Cancle',
          handler: (res) => {
            // console.log(res.n_platos);
            // console.log(res.observaciones);
            
            let comensales=res.comensales;

            var coCom=this._pedido.enviarPedido(comensales, this.codigoMesa);

            //this.router.navigate(['/ticket',coCom]);

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
}
