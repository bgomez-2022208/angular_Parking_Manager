import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./user/auth/auth.module').then(m => m.default) },
  { path: 'security', loadChildren: () => import('./user/security/security.module').then(m => m.default) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then((m)=> m.AdminModule)},
  {path: '', redirectTo: '/auth/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
