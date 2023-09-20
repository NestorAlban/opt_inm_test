import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Router} from "@angular/router";
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://159.65.96.86:8080/services/auth/signin'

  session: any
  constructor(private router: Router, private http:HttpClient) { 
    let session: any = localStorage.getItem('session');
    if (session) {
      session = JSON.parse(session);
    }
    this.session = session
  }
  authBody(email: string, password: string): Observable<HttpResponse<any>>{
    const body = {
      password: password,
      username: email
    }
    return this.http.post(this.authUrl, body, {observe: 'response'})
  }
  login(email: string, password: string){

    return this.authBody(email, password).pipe(
      map((response: HttpResponse<any>) => {
        const status = response.status;
        const responseData = response.body;
        if (status === 200) {
          const accessToken = responseData.accessToken;
          this.session = {
            username: email,
            token: accessToken
          };
          localStorage.setItem('session', JSON.stringify(this.session))
          return accessToken;
        } else {
          console.log('Status code:', status);
          console.log('Respuesta del servidor:', responseData);
          throw new Error('Error durante el inicio de sesión');
        }
      })
    );

  }
  logout(){
    this.session = undefined
    localStorage.removeItem('session')
    this.router.navigateByUrl('/login')
  }
}
