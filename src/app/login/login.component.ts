import { Component } from "@angular/core";
import {FormGroup, FormBuilder, Validators } from "@angular/forms";
import {Router} from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
})
export class LoginComponent {
    form: FormGroup = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });

    constructor(
        private authService: AuthService, 
        private fb: FormBuilder, 
        private router: Router
    ) {

    }
    login() {
        let user = this.authService.login(
            this.form.value.email, 
            this.form.value.password
        ).subscribe(
            (accessToken: string) => {
                this.router.navigateByUrl('/dashboard')
            },
            (error) => {
                alert('invalid email or password')
            }
        )
    }
}



