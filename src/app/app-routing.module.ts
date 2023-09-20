import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AppComponent } from "./app.component";
import { authGuard } from "./auth.guard";

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        pathMatch: "full",
    },
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: "full",
    },
    {
        path: 'dashboard',
        loadChildren: () => import("./dashboard/dashboard.module").then(m => m.DashboardModule),
        // component: DashboardComponent,
        // pathMatch: "full",
        canActivate: [authGuard]
    },
];
  
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

