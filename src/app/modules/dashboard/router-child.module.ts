import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from '../category/components/category/category.component';
import { HomeComponent } from './components/home/home.component';
import { ReportesComponent } from './components/reportes/reportes.component';


export const childRoutes: Routes = [
    { path: 'path', component: HomeComponent },
    { path: 'cuenta', component: HomeComponent },
    { path: 'clientes', component: CategoryComponent },
    { path: 'reportes', component: ReportesComponent },
]

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule],
})
export class RouterChildModule { }
