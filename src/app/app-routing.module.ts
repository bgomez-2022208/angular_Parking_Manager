import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'auditory',
    loadChildren: () =>
      import('./auditoria/auditoria.module').then((m) => m.AuditoriaModule),
  },
  {
    path: 'profiles',
    loadChildren: () => import('./admin/profiles/profiles.module').then(m => m.ProfilesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
