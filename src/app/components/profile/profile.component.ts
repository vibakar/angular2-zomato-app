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
  validOldPassword; validNewPassword; validConfirmPassword; newPassword; confirmPassword; enableChangePassword; oldPassword;
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
              this.userImage = '../../../assets/images/'+ this.userDetails.photo.toString();
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

   	this.usersApi.updateUserDetails(this.userDetails)
   				 .then((res)=>{
   				 	var user = JSON.parse(JSON.stringify(res));
   				 	if(user.n == 1){
              localStorage.setItem('username',this.userDetails.firstName);
   				 		this.dialogsService.alert("Message","Personal data updated!!");
   				 	}else{
   				 		this.dialogsService.alert("Message","Unable to update your details.Try later");
   				 	}
   				 },(err)=>{
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
    if(!oldpwd || !newpwd || !confirmpwd) {
      this.dialogsService.alert("Message","Please fill all the fields");
      return;
    }
    if(oldpwd != this.oldPassword) {
      this.dialogsService.alert("Message","Old password is wrong");
      return;
    }
    if(newpwd != confirmpwd) {
      this.dialogsService.alert("Message","New and Confirm password should be same");
      return;
    }
    else {
      this.usersApi.resetPassword(confirmpwd)
                    .then((res)=>{
                      var response = JSON.parse(JSON.stringify(res));
                      this.validOldPassword = '';
                      this.validNewPassword = '';
                      this.validConfirmPassword = '';
                      if(response && response.n == 1){
                        this.dialogsService.alert("Message","Password changed successfully");
                      }else {
                        this.dialogsService.alert("Message","Something went wrong.Try again");
                      }
                    },(err)=>{
                        this.dialogsService.alert("Message","Something went wrong.Try again");
                    })
    }
  }

  oldPasswordCheck(event: any) {
    let password = event.target.value;

    if(password == this.oldPassword) {
      this.validOldPassword = "yes";
    } else {
      this.validOldPassword = "no";
    }

    if(this.validOldPassword && this.validOldPassword== "yes" && this.validNewPassword && this.validNewPassword == "yes" && this.validConfirmPassword && this.validConfirmPassword == "yes") {
      this.enableChangePassword = true;
    }else{
      this.enableChangePassword = false;
    }
  }

  newPasswordChange(event: any) {
    this.newPassword = event.target.value;
    let regex =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    let passwordFormat = "no"
    if(regex.test(this.newPassword)){
      passwordFormat = "yes";
    }else{
      passwordFormat = "no";
    }

    if(this.confirmPassword && this.confirmPassword == this.newPassword && passwordFormat == "yes"){
      this.validNewPassword = "yes";
      this.validConfirmPassword = "yes";
    }
    else if(this.confirmPassword && this.confirmPassword != this.newPassword){
      this.validNewPassword = "no";
    }
    else if(!this.confirmPassword && passwordFormat == "yes") {
       this.validNewPassword = "yes";
    }
    else {
        this.validNewPassword = "no";
    }

    if(this.validOldPassword && this.validOldPassword== "yes" && this.validNewPassword && this.validNewPassword == "yes" && this.validConfirmPassword && this.validConfirmPassword == "yes") {
      this.enableChangePassword = true;
    }else{
      this.enableChangePassword = false;
    }
  }

  confirmPasswordChange(event: any) {
    this.confirmPassword = event.target.value;
     let regex =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
     let passwordFormat = "no";
    if(regex.test(this.confirmPassword)){
       passwordFormat = "yes";
     }else{
       passwordFormat = "no";
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


    if(this.validOldPassword && this.validOldPassword== "yes" && this.validNewPassword && this.validNewPassword == "yes" && this.validConfirmPassword && this.validConfirmPassword == "yes") {
      this.enableChangePassword = true;
    }else{
      this.enableChangePassword = false;
    }

  }
}
