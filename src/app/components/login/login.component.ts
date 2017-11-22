import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { UsersService } from '../../services/users.service';
import { DialogsService } from './../../services/dialogs.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsersService,DialogsService]
})
export class LoginComponent implements OnInit {
  constructor(private usersApi:UsersService,private router:Router,private dialogsService: DialogsService,private route: ActivatedRoute) { }
  showlogin:boolean = true;
  returnUrl: string;
  validName; validEmail; validPassword; validConfirmPassword; userNewPassword; userConfirmPassword; enableSignupBtn; emailExists;
  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  login(email,password){
    if(!email && !password){
      this.dialogsService.alert("Message","Please enter your email and password");
      return;
    }
    if(!email){
      this.dialogsService.alert("Message","Please enter your email");
      return;
    }
    if(!password){
      this.dialogsService.alert("Message","Please enter your password");
      return;
    }
    else{
      this.usersApi.login(email,password)
                    .then((res)=>{
                      var response = JSON.parse(JSON.stringify(res));
                      if(response.responseText=="authenticated"){
                          this.usersApi.getUsername().then((resp)=>{
                            var user = JSON.parse(JSON.stringify(resp));
                            localStorage.setItem("username",user[0].username);
                            this.router.navigateByUrl(this.returnUrl);
                          },(err)=>{
                            this.dialogsService.alert("Message","Try login again");
                          })
                      }else{
                        this.dialogsService.alert("Message","Email or Password Incorrect");
                      }
                    },
                    (err)=>{
                      this.dialogsService.alert("Message","Email or Password Incorrect");
                    })
    }
  }

  showSignup(){
    this.showlogin = false;
  }

  showLogin(){
    this.showlogin = true;
  }

  signup(username,email,password,confirmPassword){
    if(!username || !email || !password || !confirmPassword){
      this.dialogsService.alert("Message","Please fill all the fields");
      return;
    }
    if(password!==confirmPassword){
      this.dialogsService.alert("Message","Password and confirmPassword should be same");
      return;
    }
    else{
      this.usersApi.signup({username:username,email:email,password:password})
                   .then((res)=>{
                    var response = JSON.parse(JSON.stringify(res));
                    if(response.code==11000){
                      this.dialogsService.alert("Message","Email already exists.Try another!!");
                    }else{
                      localStorage.setItem("username", username);
                      this.router.navigate(['/home']);
                    }
                  },(err)=>{
                    this.dialogsService.alert("Message","System busy.Try Later!!");
                  })
    }
  }

  resetPassword() {
    this.router.navigate(['/reset']);
  }

  // detecting input field change
  usernameChange(event: any){
    let username = event.target.value;
    if(username.length > 3){
      this.validName = "yes";
    }else{
      this.validName = "no";
    }

    if(this.validName && this.validName == "yes" && this.validEmail && this.validEmail == "yes" && this.validPassword && this.validPassword == "yes" && this.validConfirmPassword && this.validConfirmPassword == "yes"){
      this.enableSignupBtn = true;
    }
    else {
      this.enableSignupBtn = false;
    }
  }

  useremailChange(event: any){
    let userEmail = event.target.value;

    this.usersApi.isUserExists(userEmail)
                 .then((res)=>{
                    var response = JSON.parse(JSON.stringify(res));
                     if(response && response.length > 0) {
                        this.emailExists = "yes";
                     }else {
                        this.emailExists = "no";
                     }
                 },(err)=>{
                        this.emailExists = "no";
                 })

    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(regex.test(userEmail)){
      this.validEmail = "yes";
    }else{
      this.validEmail = "no";
    }

    if(this.validName && this.validName == "yes" && this.validEmail && this.validEmail == "yes" && this.validPassword && this.validPassword == "yes" && this.validConfirmPassword && this.validConfirmPassword == "yes"){
      this.enableSignupBtn = true;
    }
    else {
      this.enableSignupBtn = false;
    }

  }

  userPassword(event: any){
    this.userNewPassword = event.target.value;
    let regex =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if(regex.test(this.userNewPassword)){
      this.validPassword = "yes";
    }else{
      this.validPassword = "no";
    }

    if(this.userConfirmPassword  && this.userConfirmPassword == this.userNewPassword){
      this.validConfirmPassword = "yes";
    }
    else if (this.userConfirmPassword  && this.userConfirmPassword != this.userNewPassword){
       this.validConfirmPassword = "no";
    }

    if(this.validName && this.validName == "yes" && this.validEmail && this.validEmail == "yes" && this.validPassword && this.validPassword == "yes" && this.userConfirmPassword && this.userConfirmPassword == this.userNewPassword){
      this.enableSignupBtn = true;
    }
    else {
      this.enableSignupBtn = false;
    }
  }
  userConfirmPasswordCheck(event: any){
    this.userConfirmPassword = event.target.value;
    if(this.userNewPassword && this.userNewPassword == this.userConfirmPassword){
      this.validConfirmPassword = "yes";
    }
    else {
      this.validConfirmPassword = "no";
    }

    if(this.validName && this.validName == "yes" && this.validEmail && this.validEmail == "yes" && this.validPassword && this.validPassword == "yes" && this.validConfirmPassword && this.validConfirmPassword == "yes"){
      this.enableSignupBtn = true;
    }
    else {
      this.enableSignupBtn = false;
    }
  }

}
