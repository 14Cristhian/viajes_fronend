import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Pantalla2Component } from './pantalla2/pantalla2.component';
import { Pantalla3Component } from './pantalla3/pantalla3.component';
import { Pantalla1Component } from './pantalla1/pantalla1.component';
import { Pantalla2Guard } from './guards/pantalla2.guard';
import { Pantalla3Guard } from './guards/pantalla3.guard';
import { ConsultaComponent } from './consulta/consulta.component';
export const routes: Routes = [
  { path: 'pantalla1', component: Pantalla1Component },
  {
    path: 'pantalla2',
    component: Pantalla2Component,
    canActivate: [Pantalla2Guard],
  },
  {
    path: 'pantalla3',
    component: Pantalla3Component,
    canActivate: [Pantalla3Guard],
  },

  {
    path: 'consulta',
    component: ConsultaComponent,
  },
  { path: '', redirectTo: '/pantalla1', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
