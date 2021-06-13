import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let isLogin: boolean;
    // Determine se o usuário está logado
    const token = sessionStorage.getItem('token');
    if (!token) {
      isLogin = false;
      // Não conectado, vá para a interface de login
      this.router.navigateByUrl('/login');
    } else {
      isLogin = true;
    }
    return isLogin;
  }
}
