import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PrintPageComponent } from './components/print-page/print-page.component';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { ReadTableComponent } from './components/read-table/read-table.component';

const routes: Routes = [{
  path: '', component: HomeComponent
},{
  path: 'Login', component: LoginComponent
},{
  path: 'Dashboard', component: DashboardComponent
},{
  path: 'printpage', component: PrintPageComponent
},
{
  path: 'create', component: CreateFormComponent
},
{
  path: 'read', component: ReadTableComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
