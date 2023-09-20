import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import {Router} from "@angular/router";

export const authGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).session) return true
  inject(Router).navigateByUrl('/login')
  return false;
};
