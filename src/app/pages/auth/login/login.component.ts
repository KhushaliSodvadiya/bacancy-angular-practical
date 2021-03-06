import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private _toastr: ToastrService) {
  }

  get fval() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])],
      password: [null, [Validators.required]]
    });
  }

  submit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    
    const obj = {
      email: this.fval.email.value, 
      password: this.fval.password.value
    }

    this.authenticationService.login(obj)
      .pipe(first())
      .subscribe(response => {
        this.loading = false;
        // let getRegisteredData = [];
        const getData: any = localStorage.getItem('registeredUser');
        if (getData) {
          const user = JSON.parse(getData);
          localStorage.setItem("id", user.id);
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard/home';
            this.router.navigateByUrl(returnUrl);
        } else {
          this._toastr.error('Please Register Yourself First!', 'Error');
          this.router.navigate(['/auth/registration']);
        }
      },
        error => {
          this._toastr.error(error.error.error, 'Error');
          this.loading = false;
        });
  }
}
