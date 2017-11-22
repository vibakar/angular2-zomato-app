import { Component, OnInit } from '@angular/core';

import { DialogsService } from './../../services/dialogs.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [UsersService,DialogsService]
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private usersApi:UsersService, private dialogsService: DialogsService) { }
  reset: boolean = true;
  formField: boolean = false;
  successMessage: boolean = false;
  validNewPassword; validConfirmPassword; newPassword; confirmPassword; enableReset;

  ngOnInit() {
  }

  isUserExists(email) {
    if(!email){
      this.dialogsService.alert("Message","Please enter your registered email ");
    }else{
      this.usersApi.isUserExists(email)
                   .then((res)=>{
                     var response = JSON.parse(JSON.stringify(res));
                     console.log(response)
                     if(response && response.length > 0) {
                       localStorage.setItem("useremail", email);
                       this.reset = false;
                       this.formField = true;
                     }else {
                       this.dialogsService.alert("Message","Email not found");
                     }
                   },(err)=>{
                     this.dialogsService.alert("Message","Email not found");
                   })
    }
  }

  resetPassword(password, confirmPassword) {
    if(!password || !confirmPassword){
      this.dialogsService.alert("Message","Please fill all the fields");
      return;
    }
    if(password !== confirmPassword){
      this.dialogsService.alert("Message","New password  and confirm password should be same");
      return;
    }
    else{
      this.usersApi.resetPassword(password)
                    .then((res)=>{
                      var response = JSON.parse(JSON.stringify(res));
                      if(response && response.n == 1){
                        this.formField = false;
                        this.successMessage = true;
                      }else {
                        this.dialogsService.alert("Message","Something went wrong.Try again");
                      }
                    },(err)=>{
                        this.dialogsService.alert("Message","Something went wrong.Try again");
                    })
    }
  }

  newPasswordChange(event: any) {
    this.newPassword = event.target.value;
    let regex =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    let passwordFormat = "no";

    if(regex.test(this.newPassword)){
      passwordFormat = "yes"
    }else{
      passwordFormat = "no"
    }

    if(this.confirmPassword && this.confirmPassword == this.newPassword && passwordFormat == "yes"){
      this.validNewPassword = "yes";
      this.validConfirmPassword = "yes";
    }
    else if(this.confirmPassword && this.confirmPassword != this.newPassword){
      this.validNewPassword = "no";
    }
    else if(!this.confirmPassword && passwordFormat == "yes"){
      this.validNewPassword = "yes";
    }
    else {
      this.validNewPassword = "no";
    }

    if(this.validNewPassword && this.validNewPassword == "yes" && this.validConfirmPassword && this.validConfirmPassword == "yes") {
      this.enableReset = true;
    }else{
      this.enableReset = false;
    }
  }

  confirmPasswordChange(event: any) {
    this.confirmPassword = event.target.value;
    let regex =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    let passwordFormat = "no";

    if(regex.test(this.confirmPassword)){
       passwordFormat = "yes"
     }else{
       passwordFormat = "no"
     }

    if(this.newPassword && this.newPassword == this.confirmPassword && passwordFormat == "yes"){
      this.validConfirmPassword = "yes";
      this.validNewPassword = "yes";
    }
    else if(this.newPassword && this.newPassword != this.confirmPassword){
      this.validConfirmPassword = "no";
    }
    else if(!this.newPassword && passwordFormat == "yes"){
      this.validConfirmPassword = "yes";
    }
    else{
      this.validConfirmPassword = "no"; 
    }

    if(this.validNewPassword && this.validNewPassword == "yes" && this.validConfirmPassword && this.validConfirmPassword == "yes") {
      this.enableReset = true;
    }else{
      this.enableReset = false;
    }

  }

}
