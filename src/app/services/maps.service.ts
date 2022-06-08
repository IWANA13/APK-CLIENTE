import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  private BASE_URL: string = "http://api.positionstack.com/v1/forward?access_key=5e7f185bbed6e051864aac654d7d8004&query=";

  constructor( private _http: HttpClient) { }
  getmap(direccion): void {
    //Crida al mètode GET

    console.log(this.BASE_URL+direccion);
    // this._http.get(this.BASE_URL+direccion).subscribe(
    //     (maps: any) => {
    //         // console.log(photos);
    //         console.log(maps);
    //     }
    // );
}


}
