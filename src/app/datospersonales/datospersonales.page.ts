import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GalleryService } from '../services/gallery.service';
import { MisdatosService } from '../services/misdatos.service';

@Component({
  selector: 'app-datospersonales',
  templateUrl: './datospersonales.page.html',
  styleUrls: ['./datospersonales.page.scss'],
})
export class DatospersonalesPage implements OnInit {

  public apodo: string;
  public nombre: string;
  public apellido1: string;
  public apellido2: string;
  public correo: string;
  public telefono: string;
  public contra: string;
  public contraN: string;

  constructor(private _gallery: GalleryService, private _authService: AuthService,  private _misdatosService: MisdatosService, private _router: Router) { }
  isUserAuthenticated(): boolean {
    return this._authService.isUserAuthenticated();
  }
  ngOnInit() {
    this._gallery.getdatos();
  }
  logout(){
    this._authService.logout();
  }
  get misdatos():any[]{
    // console.log(this._gallery.datospersonales);
    return this._gallery.datospersonales;
  }

    async updateuser(): Promise<void> {
      /*L'estructura try/catch ens permet gestionar qualsevol error de xarxa en la
      comunicació amb el servidor*/
      try {
          const response = await this._misdatosService.updateuser(this.apodo, this.nombre, this.apellido1, this.apellido2, this.correo, this.telefono, this.contra, this.contraN);
          //console.log(response.);
          if(response) {
              this._router.navigate(["/home"]);
          }
      } catch(error) {
          console.log(error);
      }
    }
  
}
