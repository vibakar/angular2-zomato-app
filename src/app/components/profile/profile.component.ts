import { Component, OnInit } from '@angular/core';
import { DialogsService } from './../../services/dialogs.service';
import { UsersService } from '../../services/users.service';

interface User {
	firstName: string,
	lastName: string,
	email: string,
	city: string,
  state: string,
	mobile: string,
	photo: string
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UsersService,DialogsService]
})

export class ProfileComponent implements OnInit {

  constructor(private usersApi:UsersService,private dialogsService: DialogsService) { }
  userDetails: User = {
  	firstName: '',
  	lastName: '',
  	email: '',
  	city: '',
    state: '',
  	mobile: '',
  	photo: ''
  };
  validOldPassword; validNewPassword; validConfirmPassword; newPassword; confirmPassword; oldPassword;
  userImage;
  editFoto:boolean = false;
  ngOnInit() {
  	this.usersApi.getUsername()
  			     .then((res)=>{
  			     	var user = JSON.parse(JSON.stringify(res));
  			     	this.userDetails.firstName = user[0].username;
  			     	this.userDetails.lastName = user[0].lastname;
  			     	this.userDetails.email = user[0].email;
  			     	this.userDetails.city = user[0].city;
              this.userDetails.state = user[0].state;
  			     	this.userDetails.mobile = user[0].mobile;
  			     	this.userDetails.photo = user[0].photo || 'default.png';
              this.oldPassword = user[0].password;
              this.userImage = 'assets/images/'+ this.userDetails.photo.toString();
  			     },(err)=>{
  			     	 this.dialogsService.alert("Message","Unable to fetch your details.Try later");
  			     })
  }

  enableEdit() {
    (<HTMLInputElement>document.getElementById('firstname')).removeAttribute('disabled');
    (<HTMLInputElement>document.getElementById('lastname')).removeAttribute('disabled');
    (<HTMLInputElement>document.getElementById('city')).removeAttribute('disabled');
    (<HTMLInputElement>document.getElementById('state')).removeAttribute('disabled');
    (<HTMLInputElement>document.getElementById('mobile')).removeAttribute('disabled');
    (<HTMLInputElement>document.getElementById('save')).removeAttribute('disabled');
  }

  saveUserDetails() {
  	(<HTMLInputElement>document.getElementById('firstname')).setAttribute('disabled', '');
  	(<HTMLInputElement>document.getElementById('lastname')).setAttribute('disabled', '');
    (<HTMLInputElement>document.getElementById('city')).setAttribute('disabled', '');
    (<HTMLInputElement>document.getElementById('state')).setAttribute('disabled', '');
    (<HTMLInputElement>document.getElementById('mobile')).setAttribute('disabled', '');
   	(<HTMLInputElement>document.getElementById('save')).setAttribute('disabled', '');
    $(".loading").show();
   	this.usersApi.updateUserDetails(this.userDetails)
   				 .then((res)=>{
             $(".loading").hide();
   				 	var user = JSON.parse(JSON.stringify(res));
   				 	if(user.n == 1){
              localStorage.setItem('username',this.userDetails.firstName);
   				 		this.dialogsService.alert("Message","Personal data updated!!");
   				 	}else{
   				 		this.dialogsService.alert("Message","Unable to update your details.Try later");
   				 	}
   				 },(err)=>{
             $(".loading").hide();
   				 	 this.dialogsService.alert("Message","Unable to update your details.Try later");
   				 })
  }

  enableFotoEdit() {
    if(this.editFoto == false) {
      this.editFoto = true;
    }else{
      this.editFoto = false;
    }
  }

  changePassword(oldpwd,newpwd,confirmpwd) {
     $(".loading").show();
      this.usersApi.resetPassword(confirmpwd)
                    .then((res)=>{
                      $(".loading").hide();
                      var response = JSON.parse(JSON.stringify(res));
                      this.validOldPassword = '';
                      this.validNewPassword = '';
                      this.validConfirmPassword = '';
                      if(response && response.n == 1){
                        this.dialogsService.alert("Message","Password changed successfully");
                        (<HTMLInputElement>document.getElementById('changePwdBtn')).setAttribute('disabled', '');
                      }else {
                        this.dialogsService.alert("Message","Something went wrong.Try again");
                        (<HTMLInputElement>document.getElementById('changePwdBtn')).setAttribute('disabled', '');
                      }
                    },(err)=>{
                        $(".loading").hide();
                        this.dialogsService.alert("Message","Something went wrong.Try again");
                        (<HTMLInputElement>document.getElementById('changePwdBtn')).setAttribute('disabled', '');
                    })
  }

  oldPasswordCheck(event: any) {
    let password = event.target.value;
    if(password.length > 0){
      if(password == this.oldPassword) {
        this.validOldPassword = "yes";
      } else {
        this.validOldPassword = "no";
      }
    }

    if(this.validOldPassword && this.validOldPassword== "yes" && this.newPassword && this.confirmPassword  && this.newPassword == this.confirmPassword) {
        (<HTMLInputElement>document.getElementById('changePwdBtn')).removeAttribute('disabled');
    }else{
        (<HTMLInputElement>document.getElementById('changePwdBtn')).setAttribute('disabled', '');
    }
  }

  newPasswordChange(event: any) {
    this.newPassword = event.target.value;
    let regex =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if(this.newPassword.length > 0){
        if(regex.test(this.newPassword)){
           this.validNewPassword = "yes";
        }else{
           this.validNewPassword = "no";
        }
    }

    if(this.validOldPassword && this.validOldPassword== "yes" && this.validNewPassword == "yes" && this.confirmPassword && this.confirmPassword == this.newPassword) {
      (<HTMLInputElement>document.getElementById('changePwdBtn')).removeAttribute('disabled');
    }else{
      (<HTMLInputElement>document.getElementById('changePwdBtn')).setAttribute('disabled', '');
    }
  }

  confirmPasswordChange(event: any) {
    this.confirmPassword = event.target.value;
     
     if(this.confirmPassword.length > 0){
       if(this.newPassword && this.newPassword == this.confirmPassword){
          this.validConfirmPassword = "yes";
       }else{
          this.validConfirmPassword = "no";
       }
     }


    if(this.validOldPassword && this.validOldPassword== "yes" && this.newPassword  && this.newPassword ==this.confirmPassword) {
      (<HTMLInputElement>document.getElementById('changePwdBtn')).removeAttribute('disabled');
    }else{
      (<HTMLInputElement>document.getElementById('changePwdBtn')).setAttribute('disabled', '');
    }

  }
}
