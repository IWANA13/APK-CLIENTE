import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  constructor(private _pedido:PedidoService,private _authService: AuthService) { }

  isUserAuthenticated(): boolean {
    return this._authService.isUserAuthenticated();
  }

  ngOnInit() {
  }

  get platosPed():any[]{
    console.log(this._pedido.listarPlatos);
    return this._pedido.listarPlatos;
  }

  enviarPedido():void{
    let personas=0;
    let codigoMesa=0;

    this._pedido.enviarPedido(personas,codigoMesa);
  }
}
