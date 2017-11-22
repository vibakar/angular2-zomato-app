import { Component, OnInit } from '@angular/core';

import { UsersService } from './../../services/users.service';
import { DialogsService } from './../../services/dialogs.service';

@Component({
  selector: 'app-favourite-restaurants',
  templateUrl: './favourite-restaurants.component.html',
  styleUrls: ['./favourite-restaurants.component.css'],
  providers: [UsersService,DialogsService]
})
export class FavouriteRestaurantsComponent implements OnInit {
  fetchedRestaurants:any;
  noRestaurantsFound = false;
  p:number = 1;
  constructor(private usersApi:UsersService,private dialogsService: DialogsService) { }

  ngOnInit() {
      this.usersApi.getUsersRestaurants().then((res)=>{
        if(res){
          this.fetchedRestaurants = res;
        }
        if(this.fetchedRestaurants.length == 0){
          this.noRestaurantsFound = true;
        }
      },(err)=>{
        this.noRestaurantsFound = true;
        this.dialogsService.alert("Message","System busy.Try again later");
      })
  }

  deleteAllRestaurants(): void {
    this.dialogsService.confirm("Warning","Are you sure to clear all?")
                       .subscribe((res)=>{
                         if(res){
                           this.usersApi.deleteAllRestaurants().then((resp)=>{
                             let response = JSON.parse(JSON.stringify(resp));
                             if(response && response.n == 1){
                               this.dialogsService.alert("Message","Your favourite Restaurants Deleted");
                               this.fetchedRestaurants = [];
                               this.noRestaurantsFound = true;
                             }else{
                               this.dialogsService.alert("Message","Failed to clear Restaurants.Try again Later");
                             }
                           },(err)=>{
                             this.dialogsService.alert("Message","System busy.Try again later");
                           })
                         }
                       })
  }

  deleteRestaurant(id): void {
    this.dialogsService.confirm("Warning","Are you sure to delete?")
                       .subscribe((res)=>{
                            if(res){
                              this.usersApi.deleteUsersRestaurant(id).then((resp)=>{
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
                                this.dialogsService.alert("Message","System busy.Try again Later!!");
                              })
                            }
                       })
  }

}
