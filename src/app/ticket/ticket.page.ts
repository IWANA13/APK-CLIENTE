import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Ticket } from '../model/ticket';
import { AuthService } from '../services/auth.service';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {

  private id:any;

  constructor(private _ticket:TicketService,private _activatedRoute: ActivatedRoute,private _authService: AuthService) {

    this.id = this._activatedRoute.snapshot.params;
        let codCom = this.id.codCom;
        let tipo=this.id.tipo;
        let idUser=localStorage.getItem('idUser');
        this._ticket.ticket(tipo,codCom,idUser);
  }

  
  isUserAuthenticated(): boolean {
    return this._authService.isUserAuthenticated();
  }

  ngOnInit() {
  }

  get visualTicket():Ticket{
   
    return this._ticket.visualTicket;
  }
}
