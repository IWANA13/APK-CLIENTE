import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public apodo: string;
  public nombre: string;
  public apellido1: string;
  public apellido2: string;
  public correo: string;
  public telefono: string;
  public contra: string;
  public contraconfirm: string;
  
  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  async register(): Promise<void> {
    /*L'estructura try/catch ens permet gestionar qualsevol error de xarxa en la
    comunicació amb el servidor*/
    try {
        const response = await this._authService.register(this.apodo, this.nombre, this.apellido1, this.apellido2, this.correo, this.telefono, this.contra, this.contraconfirm);
        //console.log(response.);
        if(response) {
            this._router.navigate(["/home"]);
        }
    } catch(error) {
        console.log("Error!");
    }
  }
}
