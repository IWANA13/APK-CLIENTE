import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BarcodeScannerService } from '../services/barcode-scanner.service';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-pedidorapido',
  templateUrl: './pedidorapido.page.html',
  styleUrls: ['./pedidorapido.page.scss'],
})
export class PedidorapidoPage implements OnInit {

  scanActive: boolean = false;
  scanContent: any;
  booksarr: any = [];

  public idRes: string="";
  public codMesa: string = "";

  constructor(private _bsService: BarcodeScannerService,private _authService: AuthService, private _pedido:PedidoService, private router: Router) { 
    this._bsService.configureScanner();
  }

  ngOnInit() {
  }
  async startScanner() {
    const allowed = await this._bsService.checkPermission();
    if(allowed) {
        this.scanActive = true;
        document.body.classList.add("qrscanner");           //Gestió d'estils per permetre visualitzar la càmera
        const code = await this._bsService.startScanner();
        document.body.classList.remove("qrscanner");        //Gestió d'estils per permetre visualitzar la càmera

        if(code) {
            console.log(code);
            var cosigo =code.split(" ", 2);
            let mesaRapida=await this._pedido.pedidoRapido(cosigo[1], cosigo[0]);


            localStorage.setItem('idRes', cosigo[1]);
            localStorage.setItem('Tipo_Comanda', mesaRapida['Tipo']);
            localStorage.setItem('Mesa', mesaRapida['CodigoMesas']);
            this.router.navigate(['/carta', cosigo[1]]);
        }
    }
  }
  isUserAuthenticated(): boolean {
    return this._authService.isUserAuthenticated();
  }
  logout(){
    this._authService.logout();
  }
  async pedirMesa():Promise<void>{
    let mesaRapida=await this._pedido.pedidoRapido(this.idRes, this.codMesa);


    localStorage.setItem('idRes', this.idRes);
    localStorage.setItem('Tipo_Comanda', mesaRapida['Tipo']);
    localStorage.setItem('Mesa', mesaRapida['CodigoMesas']);
    this.router.navigate(['/carta', this.idRes]);
  }
}
