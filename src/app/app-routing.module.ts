import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth-guard/auth.guard';
import { HomeComponent } from './pages/dashboard/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then((module) => module.AuthModule)
  },
  {
    path: 'dashbaord',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then((module) => module.DashbaordModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
