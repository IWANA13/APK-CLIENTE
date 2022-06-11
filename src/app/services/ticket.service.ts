import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platos } from '../model/platos';
import { Suplementos } from '../model/suplementos';
import { Ticket } from '../model/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private BASE_URL: string = "http://localhost/api/";
  private TICKET: string="pedido/ticket/";
  private TICKETPLATO: string="pedido/platosTicket/";
  private TICKETSUPLEMENTO: string="pedido/suplementosTicket/";

  private _tickets: Ticket;
  private _platos: Platos[] = [];
  private _suplementos: Suplementos[] = [];
  constructor(private _http: HttpClient) { }

  ticket(tipo,idCom,idUser):any{

    this._http.get(this.BASE_URL+this.TICKET+tipo+"/"+idCom+"/"+idUser).subscribe(
      (data:any)=>{
        let codCom=data.data.IdCom;
        let restaurante=data.data.Nombre;
        let idRes=data.data.idRes;
        let tipo=data.data.Tipo;
        let fecha=data.data.Fecha;
        let precioFinal=data.data.PrecioFinal;


            this._http.get(this.BASE_URL+this.TICKETPLATO+idCom).subscribe(
            (platos:any)=>{
              
              for(let i=0;i<platos.data.length;i++){
                  let plato=platos.data[i].Nombre;
                  let idPlato=platos.data[i].IdPlatos;
                  let cantidad=platos.data[i].Cantidad;
                  let precio=platos.data[i].Precio;


                    let platosOb:Platos={
                      platos:plato,
                      cantidad:cantidad,
                      precio:precio
                    }

                    this._platos.push(platosOb);
                }
            });
          
            let ticket:Ticket={
              codCom:codCom,
              restaurante:restaurante,
              idRes:idRes,
              tipo:tipo,
              fecha:fecha,
              platos:this._platos,
              preciofinal:precioFinal
            }
            this._tickets=(ticket);
      }
    );
  }

  get visualTicket():Ticket{
      return this._tickets;
  }
}
