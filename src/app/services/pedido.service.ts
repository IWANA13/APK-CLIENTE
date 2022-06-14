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
  private MESAS: string="pedido/listaMesas/";
  private HISTORIAL: string="pedido/historial/";
  private PEDIDORAPIDO:string="pedido/rapido/";
  private NOTICAM:string="pedido/notiCam/";
  private PRECIOFINAL:string="pedido/precioFinal/";


  private _lista_pedido: any[] = [];
  private _lista_mesas: any[] = [];
  private _lista_historial: any[] = [];
  private _mesa_pedidoRapido: any[] = [];
  private _precio:number;

  constructor(private _http: HttpClient) { }


  async enviarPedido(personas,codigoMesa): Promise<number>{
    this._precio=0;
    let idRes=localStorage.getItem('idRes');
    let tipo=localStorage.getItem('Tipo_Comanda');

    const hoy=new Date();
    var fecha = hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getDate();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    let comFecha=fecha + "%20" + hora;

    let idUser=localStorage.getItem('idUser');
    let personasPed=personas;
    let mesa=codigoMesa;
    return new Promise(
      (resolve) => {
    this._http.get(this.BASE_URL+this.CREAR+idRes+"/"+tipo+"/"+comFecha+"/"+idUser+"/"+personasPed+"/"+mesa).subscribe(
      (data:any)=>{
        var com=data.data;
        
        this._lista_pedido = JSON.parse(localStorage.getItem('pedido_data'));
        console.log(this._lista_pedido);
        console.log(this._lista_pedido.length);
        for(let i=0;i<this._lista_pedido.length;i++){
          let idPlato=this._lista_pedido[i]['idplato'];
          let cantidad=this._lista_pedido[i]['cantidad'];
          let observacion=this._lista_pedido[i]['observacion'];

          console.log(this.BASE_URL+this.PLATO+idPlato+"/"+com+"/"+observacion+"/"+cantidad);
            this._http.get(this.BASE_URL+this.PLATO+idPlato+"/"+com+"/"+observacion+"/"+cantidad).subscribe(
            (platos:any)=>{
              console.log(platos);
                  this._precio=platos.data.Precio*cantidad;
                }
            );
            
        }

        if(data.status == 202) {
          this.precioFinal(com, this._precio);
          resolve(com);
        }
        else resolve(0);


      }
      );
      }
    );
  }

  pillarMesasTipo(idRes,tipo):void{
    this._lista_mesas=[];
    this._http.get(this.BASE_URL+this.MESAS+idRes+"/"+tipo).subscribe(
      (mesas:any)=>{
        console.log(this.BASE_URL+this.MESAS+idRes+"/"+tipo);
        for(let i=0;i<mesas.data.length;i++){
          let mesa=mesas.data[i].CodigoMesas;
          this._lista_mesas.push(mesa);
        }
        
      });
  }
  
  pillarHistorial(idUser):void{
    this._lista_historial=[];

    this._http.get(this.BASE_URL+this.HISTORIAL+idUser).subscribe(
      (historial:any)=>{

        for(let i=0;i<historial.data.length;i++){

          this._lista_mesas.push(historial.data[i]);
        }
        
      });
  }

  precioFinal(codComanda,precio):void{

    this._http.get(this.BASE_URL+this.PRECIOFINAL+codComanda+"/"+precio).subscribe(
      (data:any)=>{});
  }

  notiCam(codigoMesas, tipo,texto,idRes):void{

    this._http.get(this.BASE_URL+this.NOTICAM+codigoMesas+"/"+tipo+"/"+texto+"/"+idRes).subscribe(
      (data:any)=>{});
  }

  async pedidoRapido(mesa,idRes):Promise<any[]>{
    this._mesa_pedidoRapido=[];
    return new Promise(
      (resolve) => {
    this._http.get(this.BASE_URL+this.PEDIDORAPIDO+mesa+"/"+idRes).subscribe(
      (data:any)=>{
        this._mesa_pedidoRapido.push(data.data[0]);

        if(data.status == 202) {
          resolve(data.data[0]);
        }
        else resolve([]);
      });
    }
    );
  }

  get listarMesas():any[]{
    return this._lista_mesas;
  }
  
  get listarHistorial():any[]{
    return this._lista_historial;
  }

  get mesaPedidoRapido():any[]{
    return this._mesa_pedidoRapido;
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
console.log(nombre, platoid, cantidad, sup, observacion, precio);
    this._lista_pedido.push({idplato: platoid, plato: nombre, cantidad: cantidad, suplementos: sup, observacion: observacion, precio: precio});
    localStorage.setItem('pedido_data', JSON.stringify(this._lista_pedido));
    
    console.log(this._lista_pedido);
  }
}
