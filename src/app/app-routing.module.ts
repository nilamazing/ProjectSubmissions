import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './components/chart/chart.component';
import { DashboardCreate } from './components/dashboard/dashboard.create';
import { DashboardDetailComponent } from './components/dashboard/dashboard.detail';
import { DashboardList } from './components/dashboard/dashboard.list';
import { NoRouteComponent } from './components/no-route/noroute.component';

const routes: Routes = [
  {path: '', pathMatch: "full", redirectTo: "dashboard/list"},
  {path:'dashboard/list', component: DashboardList},
  {path: 'dashboard/create', component: DashboardCreate},
  {path:'dashboard/detail/:id', component: DashboardDetailComponent},
  {path: 'dashboard/edit/:id', component:DashboardCreate},
  {path:'chart/create/:id', component:ChartComponent},
  {path:'chart/edit/:id/:chartId',component:ChartComponent},
  {path: '**', component: NoRouteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
