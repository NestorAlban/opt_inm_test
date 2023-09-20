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
  users: any[] = [
    {
      id:1,
      email:'email1@gmail.com',
      password: 'password1',
    },
    {
      id:2,
      email:'email2@gmail.com',
      password: 'password2',
    },
    {
      id:3,
      email:'email3@gmail.com',
      password: 'password3',
    },
    {
      id:4,
      email:'a',
      password: 'a',
    }
  ]
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
          // Realiza acciones con el token de acceso, si es necesario
          // console.log('Token de acceso:', accessToken);

          // Guarda el token en sesión o en otro lugar según tus necesidades
          this.session = {
            username: email,
            token: accessToken
          };
          localStorage.setItem('session', JSON.stringify(this.session))

          // Devuelve el token de acceso
          return accessToken;
        } else {
          console.log('Status code:', status);
          console.log('Respuesta del servidor:', responseData);
          throw new Error('Error durante el inicio de sesión');
        }
      })
    );

 

    // let user = this.users.find((us) => us.email === email && us.password === password)
    // if(user){
    //   this.session = user
    //   localStorage.setItem('session', JSON.stringify(this.session))
    // }
    // return user
    
  }
  logout(){
    this.session = undefined
    localStorage.removeItem('session')
    this.router.navigateByUrl('/login')
  }
}
