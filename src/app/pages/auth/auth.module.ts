import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth.routing';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [LoginComponent, RegistrationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    BsDatepickerModule.forRoot(),
    ImageCropperModule
  ]
})
export class AuthModule { }
