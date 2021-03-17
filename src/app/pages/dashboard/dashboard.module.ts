import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DashboardRoutingModule } from './dashboard.routing.module';
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
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    BsDatepickerModule.forRoot(),
    ImageCropperModule
  ]
})
export class DashbaordModule { }
