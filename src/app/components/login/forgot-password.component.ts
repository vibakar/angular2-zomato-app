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
  validNewPassword; validConfirmPassword; newPassword; confirmPassword;

  ngOnInit() {
  }

  isUserExists(email) {
    if(!email){
      this.dialogsService.alert("Message","Please enter your registered email ");
    }else{
      this.usersApi.isUserExists(email)
                   .then((res)=>{
                     var response = JSON.parse(JSON.stringify(res));
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
      $(".loading").show();
      this.usersApi.resetPassword(password)
                    .then((res)=>{
                      $(".loading").hide();
                      var response = JSON.parse(JSON.stringify(res));
                      if(response && response.n == 1){
                        this.formField = false;
                        this.successMessage = true;
                      }else {
                        this.dialogsService.alert("Message","Something went wrong.Try again");
                      }
                    },(err)=>{
                        $(".loading").hide();
                        this.dialogsService.alert("Message","Something went wrong.Try again");
                    })
  }

  newPasswordChange(event: any) {
    this.newPassword = event.target.value;
    let regex =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;
    if(this.newPassword.length > 0){
      if(regex.test(this.newPassword)){
        this.validNewPassword = "yes"
      }else{
        this.validNewPassword = "no"
      }
    }

    if(this.validNewPassword && this.validNewPassword == "yes" && this.confirmPassword && this.confirmPassword == this.newPassword) {
       (<HTMLInputElement>document.getElementById('reset')).removeAttribute('disabled');
    }else{
       (<HTMLInputElement>document.getElementById('reset')).setAttribute('disabled', '');
    }
  }

  confirmPasswordChange(event: any) {
    this.confirmPassword = event.target.value;
    if(this.confirmPassword.length > 0){
      if(this.newPassword && this.newPassword == this.confirmPassword){
         this.validConfirmPassword = "yes";
       }else {
         this.validConfirmPassword = "no";
       }
    }

    if(this.validNewPassword && this.validNewPassword == "yes" && this.newPassword && this.confirmPassword == this.newPassword) {
      (<HTMLInputElement>document.getElementById('reset')).removeAttribute('disabled');
    }else{
      (<HTMLInputElement>document.getElementById('reset')).setAttribute('disabled', '');
    }

  }

}
