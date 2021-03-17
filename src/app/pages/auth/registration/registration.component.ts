import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

    imageChangedEvent: any = '';
    croppedImage: any = '';
    form: FormGroup;
    loading = false;
    submitted = false;
    maxDate = new Date();
    
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private _toastr: ToastrService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.maxLength(30)]],
            lastName: ['', [Validators.required, Validators.maxLength(30)]],
            // surname: ['', [Validators.required, Validators.maxLength(30)]],
            mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
            email: [null, Validators.compose([Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])],
            address: ['', Validators.required],
            dob: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            profilePicture: ['', Validators.required]
        });
    }

    get f() { return this.form.controls; }

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
    }
    imageLoaded() {
        /* show cropper */
    }
    cropperReady() {
        /* cropper ready */
    }
    loadImageFailed() {
        /* show message */
    }

    onSubmit() {
        this.submitted = true;
        
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        this.loading = true;
        const obj = {
            email: this.form.value.email,
            password: this.form.value.password
        }
        this.authenticationService.register(obj)
            .pipe(first())
            .subscribe(response => {
                localStorage.setItem('registeredUser', JSON.stringify(response));
                this._toastr.success('Registration successful', 'Success');
                this.router.navigate(['../login'], { relativeTo: this.route });
            },
                error => {
                    this._toastr.error(error.error.error, 'Error');
                    this.loading = false;
                });
    }
}
