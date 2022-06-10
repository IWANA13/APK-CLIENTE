import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'pedidorapido',
    loadChildren: () => import('./pedidorapido/pedidorapido.module').then( m => m.PedidorapidoPageModule)
  },
  {
    path: 'listarest',
    loadChildren: () => import('./listarest/listarest.module').then( m => m.ListarestPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'ficha/:id',
    loadChildren: () => import('./ficha/ficha.module').then( m => m.FichaPageModule)
  },
  {
    path: 'carta/:id',
    loadChildren: () => import('./carta/carta.module').then( m => m.CartaPageModule)
  },
  {
    path: 'categorias/:id/:id1',
    loadChildren: () => import('./categorias/categorias.module').then( m => m.CategoriasPageModule)
  },
  {
    path: 'platos/:id/:id1',
    loadChildren: () => import('./platos/platos.module').then( m => m.PlatosPageModule)
  },
  {
    path: 'plato-ind/:id/:id1',
    loadChildren: () => import('./plato-ind/plato-ind.module').then( m => m.PlatoIndPageModule)
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
  },
  {
    path: 'datospersonales',
    loadChildren: () => import('./datospersonales/datospersonales.module').then( m => m.DatospersonalesPageModule)
  },
  {
    path: 'pedido',
    loadChildren: () => import('./pedido/pedido.module').then( m => m.PedidoPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
