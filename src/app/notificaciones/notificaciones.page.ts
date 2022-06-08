import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { GalleryService } from '../services/gallery.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {

  constructor(private _gallery: GalleryService, private _authService: AuthService) { }
  isUserAuthenticated(): boolean {
    return this._authService.isUserAuthenticated();
  }
  ngOnInit() {
    this._gallery.getnotificaciones();
  }

  get notificaciones():any[]{
    // console.log(this._gallery.notificaciones[0][1]);
    return this._gallery.notificaciones;
  }

}
