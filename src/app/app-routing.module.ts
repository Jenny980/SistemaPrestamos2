import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PrimeraVistaComponent } from './components/primera-vista/primera-vista.component';
import { RegistroComponent } from './components/registro/registro.component';
import { DashboardRoutingModule } from './modules/dashboard/dashboard-routing.module';

const routes: Routes = [
  { path: 'dashboard', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: 'registro', component: RegistroComponent},
  { path: 'login', component: LoginComponent},
  { path: 'init', component: PrimeraVistaComponent},
  { path: '**', component: PrimeraVistaComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes),DashboardRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
