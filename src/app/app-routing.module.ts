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
    path: 'search',
    loadChildren: () => import('./product/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'customer',
    loadChildren: () => import('./order/customer/customer.module').then( m => m.CustomerPageModule)
  },
  {
    path: 'pos',
    loadChildren: () => import('./pos/pos.module').then( m => m.PosPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
