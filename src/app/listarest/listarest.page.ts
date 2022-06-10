import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { GalleryService } from '../services/gallery.service';

@Component({
  selector: 'app-listarest',
  templateUrl: './listarest.page.html',
  styleUrls: ['./listarest.page.scss'],
})
export class ListarestPage implements OnInit {
  constructor(private alertCtrl: AlertController, private router: Router, private _gallery: GalleryService, private _authService: AuthService) { }
  isUserAuthenticated(): boolean {
    return this._authService.isUserAuthenticated();
  }
  ngOnInit(): void {
    this._gallery.getgallery();
    this._gallery.getimgrest();

    // this.resultados = this._gallery.photos;
  }

  get listarest():any[]{
    console.log(this._gallery.photos);
    return this._gallery.photos;
  }
  get imgrest():any[]{
    // console.log(this._gallery.imgrest);
    return this._gallery.imgrest;
  }
  async showAlert(id){
    const alert =await this.alertCtrl.create({
      header: 'Selecciona el tipo de pedido que quieres realizar',
      // 'Local', 'Virtual'
      buttons: [
        {
          text: 'Local',
          role: 'Cancle',
          handler: (value: any) => {
            localStorage.setItem('IdRes', id);
            localStorage.setItem('Tipo_Comanda', 'Local');
            this.router.navigate(['/carta', id]);
          }
        },
        {
          text: 'Virtual',
          role: 'Cancle',
          handler: (value: any) => {
            localStorage.setItem('IdRes', id);
            localStorage.setItem('Tipo_Comanda', 'Virtual');
            this.router.navigate(['/carta', id]);
          }
        }
      ],
    });
    await alert.present();

  }
}
