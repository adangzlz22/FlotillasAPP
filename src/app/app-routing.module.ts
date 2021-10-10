import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./page/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'bitacora',
    loadChildren: () => import('./page/bitacora/bitacora.module').then( m => m.BitacoraPageModule)
  },
  {
    path: 'editar-bitacora',
    loadChildren: () => import('./page/editar-bitacora/editar-bitacora.module').then( m => m.EditarBitacoraPageModule)
  },
  {
    path: 'certificar-inspeccion',
    loadChildren: () => import('./page/certificar-inspeccion/certificar-inspeccion.module').then( m => m.CertificarInspeccionPageModule)
  },
  {
    path: 'obtener-vehiculos',
    loadChildren: () => import('./page/obtener-vehiculos/obtener-vehiculos.module').then( m => m.ObtenerVehiculosPageModule)
  },
  {
    path: 'modal-remolque',
    loadChildren: () => import('./page/modal-remolque/modal-remolque.module').then( m => m.ModalRemolquePageModule)
  },
  {
    path: 'certificacionesLst',
    loadChildren: () => import('./page/certificaciones/certificaciones.module').then( m => m.CertificacionesLstPageModule)
  },  {
    path: 'envios-de-correos',
    loadChildren: () => import('./envios-de-correos/envios-de-correos.module').then( m => m.EnviosDeCorreosPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
