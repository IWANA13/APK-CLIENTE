import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private BASE_URL: string = "http://localhost/api/";
  private CREAR: string="pedido/crear/";
  private PLATO: string="pedido/addplatos/";
  private SUPLEMENTO: string="pedido/addsup/";
  private _lista_pedido: any[] = [];
  constructor(private _http: HttpClient) { }


  enviarPedido(personas,codigoMesa):void{
    let idRes=localStorage.getItem('IdRes');
    let tipo=localStorage.getItem('Tipo_Comanda');

    const hoy=new Date();
    var fecha = hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getDate();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    let comFecha=fecha + "%20" + hora;

    let idUser=localStorage.getItem('idUser');
    let personasPed=personas;
    let mesa=codigoMesa;

    this._http.get(this.BASE_URL+this.CREAR+idRes+"/"+tipo+"/"+comFecha+"/"+idUser+"/"+personasPed+"/"+mesa).subscribe(
      (data:any)=>{
        let com=data.data;
        this._lista_pedido = JSON.parse(localStorage.getItem('pedido_data'));
        for(let i=0;i<this._lista_pedido.length;i++){
          let idPlato=this._lista_pedido[i]['idplato'];
          let cantidad=this._lista_pedido[i]['cantidad'];
          let observacion=this._lista_pedido[i]['observacion'];

            this._http.get(this.BASE_URL+this.PLATO+idPlato+"/"+com+"/"+cantidad+"/"+observacion).subscribe(
            (platos:any)=>{

                this._lista_pedido[i]['suplementos'].forEach(element => {
                    this._http.get(this.BASE_URL+this.SUPLEMENTO+com+"/"+idPlato+"/"+element).subscribe(
                    (sup:any)=>{});
                });

                }
            );
          
        }
      }
    );
  }




  get listarPlatos():any[]{
    this._lista_pedido = JSON.parse(localStorage.getItem('pedido_data'));
    return this._lista_pedido;
  }

  eliminarPlato(num):void{
    this._lista_pedido.splice(num,1);
    localStorage.setItem("pedido_data",JSON.stringify(this._lista_pedido));
  }

  saveplato(nombre, platoid, cantidad, sup, observacion, precio):void {

    if(localStorage.getItem('pedido_data')!=null){
      this._lista_pedido = JSON.parse(localStorage.getItem('pedido_data'));
    }

    this._lista_pedido.push({idplato: platoid, plato: nombre, cantidad: cantidad, suplementos:sup, observacion: observacion, precio: precio});
    
    localStorage.setItem('pedido_data', JSON.stringify(this._lista_pedido));
    
    console.log(this._lista_pedido);
  }
}
