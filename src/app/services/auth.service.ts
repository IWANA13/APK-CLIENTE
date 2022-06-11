import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    //Atributs que ha d'emmagatzemar: URL base i credencials
    private BASE_URL: string = "http://localhost/api";
    private _email: string = null;
    private _password: string = null;
    private _apodo: string = null;
    private _nombre: string = null;
    private _apellido1: string = null;
    private _apellido2: string = null;
    private _correo: string = null;
    private _telefono: string = null;
    private _contra: string = null;
    private _contraconfirm: string;

    //Injecció del servei HttpClient per poder fer les peticions al WebService
    constructor(private _http: HttpClient) {}

    /*La funció de login serà async perquè, en el moment d'iniciar sessió,
    voldrem esperar-ne el resultat abans d'accedir a la part privada del client.*/
    async login(email: string, password: string): Promise<boolean> {
        this._email = email;
        this._password = password;

        /*La crida necessita els headers, en aquest cas, el 'Content-Type'.
        També s'hi pot afegir el header 'Accept'*/
        let options: any = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        }

        //Com que és una crida de tipus POST, cal generar les dades a enviar en format JSON
        const data: any = {
            'email':  this._email,
            'password':  this._password
        }

        //Realització de la crida, embolcallada en una Promise (per poder fer l'await)
        return new Promise(
            (resolve, reject) => {
                //Una crida POST ha de rebre l'URL, les dades i les opcions (capçaleres)
                this._http.post(this.BASE_URL + "/login", data, options).subscribe(
                    (response: any) => {
                        if(response.status == 200) {
                            console.log(response);
                            //Si tot va bé, emmagatzemem el TOKEN al LS
                            localStorage.setItem("TOKEN", response.token);
                            localStorage.setItem("idUser", response.data.uid);
                            resolve(true);
                        }
                        else resolve(false);
                    },
                    (error: any) => {
                        console.log(error);
                        reject("Error");
                    }
                );
            }
        );
    }

    //REGISTER
    async register(apodo: string, nombre: string, apellido1: string, apellido2: string, correo: string, telefono: string, contra: string, contraconfirm: string): Promise<boolean> {
        this._apodo = apodo;
        this._nombre = nombre;
        this._apellido1 = apellido1;
        this._apellido2 = apellido2;
        this._correo = correo;
        this._telefono = telefono;
        this._contra = contra;
        this._contraconfirm = contraconfirm;

        /*La crida necessita els headers, en aquest cas, el 'Content-Type'.
        També s'hi pot afegir el header 'Accept'*/
        let options: any = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        }

        //Com que és una crida de tipus POST, cal generar les dades a enviar en format JSON
        const data: any = {
            'apodo':  this._apodo,
            'nombre':  this._nombre,
            'apellido1':  this._apellido1,
            'apellido2':  this._apellido2,
            'correo':  this._correo,
            'contra':  this._contra,
            'confirmarContra':  this._contraconfirm,
            'telefono': this._telefono
        }

        //Realització de la crida, embolcallada en una Promise (per poder fer l'await)
        return new Promise(
            (resolve, reject) => {
                //Una crida POST ha de rebre l'URL, les dades i les opcions (capçaleres)
                this._http.post(this.BASE_URL + "/register", data, options).subscribe(
                    (response: any) => {
                        if(response.status == 200) {
                            //Si tot va bé, emmagatzemem el TOKEN al LS
                            localStorage.setItem("TOKEN", response.token);
                            resolve(true);
                        }
                        else resolve(false);
                    },
                    (error: any) => {
                        console.log(error);
                        reject("Error");
                    }
                );
            }
        );
    }

    /*Utilitzarem aquesta funció per reinicar la sessió quan el token hagi expirat.
    Cal tenir en compte que, per poder-la executar, ens cal assegurar que el service tingui
    les dades de les credencials de l'usuari*/
    async restartSession(): Promise<boolean> {
        if(this._email != null && this._password != null) {
            const logResult = await this.login(this._email, this._password);
            if(logResult) return true;
        }
        return false;
    }

    //Per tancar la sessió només cal esborrar credencials i el TOKEN
    logout(): void {
        localStorage.removeItem('Tipo_Comanda');
        localStorage.removeItem('IdRes');
        localStorage.removeItem('pedido_data');
        
        localStorage.removeItem("TOKEN");
    }

    get token(): string {
        return localStorage.getItem("TOKEN");
    }

    set token(token: string) {
        // console.log(token);
        localStorage.setItem("TOKEN", token);
    }

    /*Per ajudar-vos durant el desenvolupament i per tal que pugueu ser més àgils programant,
    podeu comentar la comprovació de les credencials. En el codi final, aquesta comprovació 
    hi ha de ser*/
    isUserAuthenticated(): boolean {
        return localStorage.getItem("TOKEN") != null;
    }

}
