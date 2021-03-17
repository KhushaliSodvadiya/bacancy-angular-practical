import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { DashboardRoutingModule } from './dashboard.routing.module';
// Components
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from 'src/app/components/partials/header/header.component';
import { FooterComponent } from 'src/app/components/partials/footer/footer.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
