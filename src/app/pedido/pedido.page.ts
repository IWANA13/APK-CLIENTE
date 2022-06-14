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

  
  public codigoMesa: string = null;

  constructor(private alertCtrl: AlertController,private _pedido:PedidoService,private _authService: AuthService, private _gallery: GalleryService,private router: Router) { 
    let idRes=localStorage.getItem('idRes');
    let tipo=localStorage.getItem('Tipo_Comanda');

    if(localStorage.getItem('Mesa')===null){
      this._pedido.pillarMesasTipo(idRes,tipo);
    }
  }




  isUserAuthenticated(): boolean {
    return this._authService.isUserAuthenticated();
  }

  ngOnInit() {
    if(localStorage.getItem('Mesa')!==null){
      this.codigoMesa=localStorage.getItem('Mesa');
    }
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
  logout(){
    this._authService.logout();
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
          handler: async (res) => {
            // console.log(res.n_platos);
            // console.log(res.observaciones);
            
            let comensales=res.comensales;

            var coCom=await this._pedido.enviarPedido(comensales, this.codigoMesa);
            let tipo=localStorage.getItem('Tipo_Comanda');

            localStorage.removeItem('Tipo_Comanda');
            localStorage.removeItem('idRes');
            localStorage.removeItem('pedido_data');
            if(localStorage.getItem('Mesa')!=null){
              localStorage.removeItem('Mesa');
            }
            this.router.navigate(['/ticket',coCom,tipo]);

          }
        }
      ],
    });
    await alert.present();

  }
  denegarPedido(){
    localStorage.removeItem('Tipo_Comanda');
    localStorage.removeItem('idRes');
    localStorage.removeItem('pedido_data');
    if(localStorage.getItem('Mesa')!=null){
      localStorage.removeItem('Mesa');
    }
    this.router.navigate(['/home']);
  }
}
