import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor() { }

  loginUser(credential){
    return new Promise((accept, reject)=> {
      if(credential.email == 'abel@gmail.com' && credential.password == '001garcia'){
        accept('login correcto');
      } else {
        reject('login incorrecto');
      }
    });

    // si se hace el enlace a un backend
    // return fetch("url_del_servidor");
  }
}
