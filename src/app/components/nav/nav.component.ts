import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { UsersService } from '../../services/users.service';
import { DialogsService } from '../../services/dialogs.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [UsersService,DialogsService]
})

export class NavComponent implements OnInit {

  constructor(private usersApi:UsersService,private router: Router,private dialogsService: DialogsService,private auth: AuthService) { }
  username: string;
  isLoggedIn: boolean;
  ngOnInit() {
    this.username = localStorage.getItem("username");
    this.isLoggedIn = this.auth.loggedIn();
  }

  logout() {
    this.usersApi.logout().then((res)=>{
      var response = JSON.parse(JSON.stringify(res));
      if(response.responseText=="sessionDestroyed"){
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("userlocation");
        localStorage.removeItem("useremail");
        this.router.navigate(['/login']);
      }else{
        this.dialogsService.alert("Message","Something went wrong.Try later");
      }
    },(err)=>{
        this.dialogsService.alert("Message","Something went wrong.Try later");
    })
  }
}
