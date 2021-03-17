import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { User } from 'src/app/schemas/user.schema';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User;
  id: any;
  userData: any;

  constructor( private authenticationService: AuthenticationService, 
    private _toastr: ToastrService) {
    this.user = this.authenticationService.userValue;
}

  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    if(this.id){
      this.getUserById();
    }
  }
 
  getUserById() {
    this.authenticationService.getUserById(this.id)
    .pipe(first())
    .subscribe(response => {
      this.userData = response;      
 },
      error => {
        this._toastr.error(error, 'Error');
      });
  }
}
