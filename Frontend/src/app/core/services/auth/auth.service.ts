import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Api } from '../../enums/api.enum';
import { Roles } from '../../enums/roles.enum';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { ModulesPaths, ComponentsPaths } from '../../enums/routes-paths.enum';
import jwtDecode from 'jwt-decode';

export interface TokenPayload {
  sub: string;
  role: Roles;
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userToken: string;
  private userTokenPayload: TokenPayload;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  public setUserToken(token: string): void {
    this.userToken = token;
    this.userTokenPayload = jwtDecode(token);
  }

  public tryToken(): void{
    this.setUserToken(localStorage.getItem('token'));
    try {
      jwt_decode(this.userToken);
    } catch (err) {
      localStorage.clear();
      this.router.navigate(['/']);
    }
  }

  public isAuthenticated(): boolean {
    this.setUserToken(localStorage.getItem('token'));
    if (!this.userToken) {
      return false;
    } else {
      return true;
    }
  }

  public isAuthorized(expectedRoleArray: Roles[]): boolean {
    this.setUserToken(localStorage.getItem('token'));
    
    for (let i = 0; i < expectedRoleArray.length; i++) {
      if (expectedRoleArray[i] == this.userTokenPayload.role) {
        return true;
      }
    }
    return false;
  }

  public defaultRoute(): void {
    this.setUserToken(localStorage.getItem('token'));

    if(this.userTokenPayload.role == Roles.ADMIN) {
      this.router.navigate(['/' + ModulesPaths.DASHBOARD + '/' + ComponentsPaths.STATISTICS]);
    }
    if (this.userTokenPayload.role == Roles.USER) {
      this.router.navigate(['/' + ModulesPaths.ORDER + '/' + ComponentsPaths.MENU]);
    }
  }

  public checkToken() {
    return this.httpClient.get(environment.apiUrl + Api.AUTH_CHECK_TOKEN);
  }
}


