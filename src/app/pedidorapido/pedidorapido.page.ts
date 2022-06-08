import { Component, OnInit } from '@angular/core';
import { BarcodeScannerService } from '../services/barcode-scanner.service';

@Component({
  selector: 'app-pedidorapido',
  templateUrl: './pedidorapido.page.html',
  styleUrls: ['./pedidorapido.page.scss'],
})
export class PedidorapidoPage implements OnInit {

  scanActive: boolean = false;
  scanContent: any;
  booksarr: any = [];

  constructor(private _bsService: BarcodeScannerService) { 
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
        }
    }
}
}
