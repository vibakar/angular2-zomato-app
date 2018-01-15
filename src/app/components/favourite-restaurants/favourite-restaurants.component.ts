import { Component, OnInit } from '@angular/core';

import { UsersService } from './../../services/users.service';
import { DialogsService } from './../../services/dialogs.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-favourite-restaurants',
  templateUrl: './favourite-restaurants.component.html',
  styleUrls: ['./favourite-restaurants.component.css'],
  providers: [UsersService,DialogsService,AuthService]
})
export class FavouriteRestaurantsComponent implements OnInit {
  fetchedRestaurants:any;
  noRestaurantsFound = false;
  p:number = 1;
  userEmail:string;
  constructor(private usersApi:UsersService,private dialogsService: DialogsService, private auth:AuthService) { 
    this.userEmail = this.auth.getUserEmail() ? this.auth.getUserEmail().email : '';
  }

  ngOnInit() {
      $(".loading").show();
      this.usersApi.getUsersRestaurants(this.userEmail).then((res)=>{
        $(".loading").hide();
        if(res){
          this.fetchedRestaurants = res;
        }
        if(this.fetchedRestaurants.length == 0){
          this.noRestaurantsFound = true;
        }
      },(err)=>{
        $(".loading").hide();
        this.noRestaurantsFound = true;
        this.dialogsService.alert("Message","System busy.Try again later");
      })
  }

  deleteAllRestaurants(): void {
    this.dialogsService.confirm("Warning","Are you sure to clear all?")
                       .subscribe((res)=>{
                         if(res){
                           $(".loading").show();
                           this.usersApi.deleteAllRestaurants().then((resp)=>{
                             $(".loading").hide();
                             let response = JSON.parse(JSON.stringify(resp));
                             if(response && response.n == 1){
                               this.dialogsService.alert("Message","Your favourite Restaurants Deleted");
                               this.fetchedRestaurants = [];
                               this.noRestaurantsFound = true;
                             }else{
                               this.dialogsService.alert("Message","Failed to clear Restaurants.Try again Later");
                             }
                           },(err)=>{
                             $(".loading").hide();
                             this.dialogsService.alert("Message","System busy.Try again later");
                           })
                         }
                       })
  }

  deleteRestaurant(id): void {
    this.dialogsService.confirm("Warning","Are you sure to delete?")
                       .subscribe((res)=>{
                            if(res){
                              $(".loading").show();
                              this.usersApi.deleteUsersRestaurant(id).then((resp)=>{
                                $(".loading").hide();
                                let response = JSON.parse(JSON.stringify(resp));
                                if(response && response.n==1){
                                  this.fetchedRestaurants = this.fetchedRestaurants.filter((obj)=>obj.restaurantId!==id);
                                  this.dialogsService.alert("Message","Your favourite Restaurant Deleted");
                                  if(this.fetchedRestaurants.length == 0){
                                    this.noRestaurantsFound = true;
                                  }
                                }else{
                                  this.dialogsService.alert("Message","Failed to delete restaurant.Try again Later!!");
                                }
                              },(err)=>{
                                $(".loading").hide();
                                this.dialogsService.alert("Message","System busy.Try again Later!!");
                              })
                            }
                       })
  }

}
