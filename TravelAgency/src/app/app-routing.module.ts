import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authenticatedGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/+auth/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'admin-tabs',
    canActivate: [authenticatedGuard],
    loadChildren: () => import('./modules/+admin-tabs/admin-tabs.module').then(m => m.AdminTabsModule)
  },
  {
    path: 'user-tabs',
    canActivate: [authenticatedGuard],
    loadChildren: () => import('./modules/+user-tabs/user-tabs.module').then(m => m.UserTabsModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
