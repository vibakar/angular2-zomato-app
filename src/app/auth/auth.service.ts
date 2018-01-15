import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {

  constructor() {}
  loggedIn() {
    var token = localStorage.getItem('token');
    if(!token){
    	return false;
    } else{
    	let jwtHelper = new JwtHelper();
    	var isExpired = jwtHelper.isTokenExpired(token);
    	return !isExpired;
    }
  }

  getUserEmail(){
    if(this.loggedIn()){
      var token = localStorage.getItem('token');
      let jwtHelper = new JwtHelper();
      return jwtHelper.decodeToken(token);
    } else {
      return null;
    }
  }
}
