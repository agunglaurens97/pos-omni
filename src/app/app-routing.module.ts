import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },  { path: 'scan-customer', loadChildren: './modals/scan-customer/scan-customer.module#ScanCustomerPageModule' },
  { path: 'saved-order', loadChildren: './modals/saved-order/saved-order.module#SavedOrderPageModule' },
  { path: 'scan-voucher', loadChildren: './modals/scan-voucher/scan-voucher.module#ScanVoucherPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
