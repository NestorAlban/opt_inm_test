import { Component } from "@angular/core";
import {FormGroup, FormBuilder, Validators } from "@angular/forms";

import { AuthService } from "../auth.service";

@Component({
    selector: "app-login",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent {
    constructor(
        private authService: AuthService, 
    ) {

    }
    // email: string, password: string
    
    logout() {
        this.authService.logout()
    }
}



