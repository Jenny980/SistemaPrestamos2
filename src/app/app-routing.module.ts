import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrimeraVistaComponent } from './components/primera-vista/primera-vista.component';
import { DashboardRoutingModule } from './modules/dashboard/dashboard-routing.module';

const routes: Routes = [
  { path: 'dashboard', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: '**', component: PrimeraVistaComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes),DashboardRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
