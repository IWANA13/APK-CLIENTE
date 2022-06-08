import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Galeria } from '../models/galeria';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

   /*Atributs que ha d'emmagatzemar: URL base i l'array de notícies.
        Aquest array, en comptes de ser de tipus 'any', hauria de ser de tipus 'News' (cal crear
        un model)*/
        private BASE_URL: string = "http://localhost/api/";
        private _photos: any[] = [];
        private _indrest: any[] = [];
        private _cartas: any[] = [];
        private _categorias: any[] = [];
        private _platos: any[] = [];
        private _platosind: any[] = [];
        private _alergenos: any[] = [];
        private _notificaciones: any[] = [];
        private _misdatos: any[] = [];
        private _imgrest: any[] = [];
        private _imgcartas: any[] = [];
        private _imgcategorias: any[] = [];
        private _imgplatos: any[] = [];

        //Injecció dels services AuthService (gestió de sessió) i HttpClient (gestió de crides)
        constructor(private _authService: AuthService, private _http: HttpClient, private _router: Router) {}

        //Aquesta funció s'encarrega de obtenir totes les notícies (WebService públic)
        getgallery(): void {
            //Crida al mètode GET
            this._http.get(this.BASE_URL + "rest").subscribe(
                (photos: any) => {
                    // console.log(photos);
                    this._photos = photos.data;

                }
            );
        }

        getindgallery(id):void{
            //Crida al mètode GET
            console.log(this.BASE_URL + "rest/" + id);
            this._http.get(this.BASE_URL + "rest/" + id).subscribe(
                (rest: any) => {
                    this._indrest = [];
                    this._indrest.push(rest.data);
                }
            );
        }

        getcartas(id):void{
            //Crida al mètode GET
            console.log(this.BASE_URL + "menusapi/" + id);
            this._http.get(this.BASE_URL + "menusapi/" + id).subscribe(
                (carta: any) => {
                    this._cartas = carta.data;
                }
            );
        }

        getcategorias(id, id1):void{
            //Crida al mètode GET
            console.log(this.BASE_URL + "categoriasapi/" + id + "/" + id1);
            this._http.get(this.BASE_URL + "categoriasapi/" + id + "/" + id1).subscribe(
                (categoria: any) => {
                    this._categorias = categoria.data;
                }
            );
        }

        getplatos(id, id1):void{
            //Crida al mètode GET
            console.log(this.BASE_URL + "platosapi/" + id + "/" + id1);
            this._http.get(this.BASE_URL + "platosapi/" + id + "/" + id1).subscribe(
                (platos: any) => {
                    this._platos = [];
                    this._platos=platos.data;
                }
            );
        }

        getplatos_ind(id):void{
            //Crida al mètode GET
            console.log(this.BASE_URL + "platosapi_ind/" + id);
            this._http.get(this.BASE_URL + "platosapi_ind/" + id).subscribe(
                (plato: any) => {
                    this._platosind = [];
                    this._platosind.push(plato.data);
                }
            );
        }

        getalergenos(id):void{
            //Crida al mètode GET
            console.log(this.BASE_URL + "alergenos/" + id);
            this._http.get(this.BASE_URL + "alergenos/" + id).subscribe(
                (alergeno: any) => {
                    this._alergenos = [];
                    this._alergenos.push(alergeno.data);
                }
            );
        }

        getnotificaciones():void{
            //Crida al mètode GET
            const options: any = {
                headers: new HttpHeaders()
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + this._authService.token)
            };
            
            this._http.get(this.BASE_URL + "notificaciones/" + 1,options).subscribe(
                (notificacion: any) => {
                    console.log(notificacion);
                    // this._notificaciones = [];
                    this._notificaciones = notificacion.data;
                    this._authService.token = notificacion.refreshToken;

                }
            );
        }

        getdatos():void{
            //Crida al mètode GET
            const options: any = {
                headers: new HttpHeaders()
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + this._authService.token)
            };
            
            this._http.get(this.BASE_URL + "misdatos",options).subscribe(
                (datos: any) => {
                    // console.log(datos);
                    // this._misdatos = [];
                    this._misdatos = datos.data;
                    this._authService.token = datos.refreshToken;
                }
            );
        }

        getimgrest():void{
            //Crida al mètode GET
            console.log(this.BASE_URL + "cameca_rest/");
            this._http.get(this.BASE_URL + "cameca_rest/").subscribe(
                (img: any) => {
                    this._imgrest = [];
                    this._imgrest = img.data;
                }
            );
        }
        getcartasimg(id):void{
            //Crida al mètode GET
            console.log(this.BASE_URL + "cameca_menus/");
            this._http.get(this.BASE_URL + "cameca_menus/" + id).subscribe(
                (img: any) => {
                    this._imgcartas = [];
                    this._imgcartas = img.data;
                }
            );
        }
        getcategoriasimg(id):void{
            //Crida al mètode GET
            console.log(this.BASE_URL + "cameca_categorias/");
            this._http.get(this.BASE_URL + "cameca_categorias/" + id).subscribe(
                (img: any) => {
                    this._imgcategorias = [];
                    this._imgcategorias = img.data;
                }
            );
        }
        getplatosimg(id):void{
            //Crida al mètode GET
            console.log(this.BASE_URL + "cameca_platos/");
            this._http.get(this.BASE_URL + "cameca_platos/" + id).subscribe(
                (img: any) => {
                    this._imgplatos = [];
                    this._imgplatos = img.data;
                }
            );
        }
        

        get photos() {
            // console.log(this._photos);
            return this._photos;
        }
        get ind_rest() {
            
            return this._indrest;
        }
        get cartas(){
            // console.log(this._cartas);
            return this._cartas;
        }
        get categorias(){
            return this._categorias;
        }
        get platos(){
            return this._platos;
        }
        get platos_ind(){
            console.log(this._platosind);

            return this._platosind;
        }
        get alergeno(){
            return this._alergenos[0];
        }
        get notificaciones(){
            return this._notificaciones;
        }
        get datospersonales(){
            return this._misdatos;
        }
        get imgrest(){
            return this._imgrest;
        }
        get imgcartas(){
            return this._imgcartas;
        }
        get imgcategorias(){
            return this._imgcategorias;
        }
        get imgplatos(){
            return this._imgplatos;
        }
      
}
