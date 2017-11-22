import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() {}
  loggedIn() {
    var isLoggedIn = localStorage.getItem("username");
    if(isLoggedIn){
      return true;
    }else{
      return false;
    }
  }

}
