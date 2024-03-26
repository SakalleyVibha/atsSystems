import { CanActivateFn } from '@angular/router';
import { CommonApiService } from '../services/common-api.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authenticateGuard: CanActivateFn = (route, state) => {
  const AuthService = inject(CommonApiService);
  const Route = inject(Router);
  if(AuthService.isLoggedIn()){
    return true
  }
  return Route.navigate(['/login']);
};