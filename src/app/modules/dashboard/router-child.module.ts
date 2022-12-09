import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrimeraVistaComponent } from 'src/app/components/primera-vista/primera-vista.component';
import { CategoryComponent } from '../category/components/category/category.component';
import { PrestamosComponent } from '../prestamos/components/prestamos/prestamos.component';
import { HomeComponent } from './components/home/home.component';
import { ReportesComponent } from './components/reportes/reportes.component';


export const childRoutes: Routes = [
    { path: 'inicio/:id', component: PrimeraVistaComponent },
    { path: 'cuenta', component: HomeComponent },
    { path: 'clientes', component: CategoryComponent },
    { path: 'reportes', component: ReportesComponent },
    { path: 'prestamos/:id', component: PrestamosComponent },
    { path: '**', component: PrimeraVistaComponent },
]

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule],
})
export class RouterChildModule { }
