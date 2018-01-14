import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { UsersService } from './../../../services/users.service';
import { DialogsService } from './../../../services/dialogs.service';
import { AuthService } from './../../../auth/auth.service';

@Component({
  selector: 'app-display-restaurants',
  templateUrl: './display-restaurants.component.html',
  styleUrls: ['./display-restaurants.component.css'],
  providers: [UsersService, DialogsService, AuthService]
})

export class DisplayRestaurantsComponent implements OnInit, OnChanges {
  @Input() restaurantsData:any;
  @Input() paginate:any;

  filteredRestaurantData:any;
  dbRestaurantData:any = [];
  p:number = 1;
  isLoggedIn: boolean;

  constructor(private usersApi:UsersService,private dialogsService: DialogsService,private auth: AuthService) {
  }

  ngOnInit() {
    this.isLoggedIn = this.auth.loggedIn();
    if(this.isLoggedIn && this.isLoggedIn == true){
        this.usersApi.getUsersRestaurants().then((res)=>{
          let response = JSON.parse(JSON.stringify(res));
          if(response.name=="MongoError"){
            this.dbRestaurantData = [];
          }
          else{
            this.dbRestaurantData = response;
          }
      },(err)=>{
          this.dbRestaurantData = [];
      });
    }
  }

  ngOnChanges(changes) {
      if(changes.restaurantsData.currentValue){
        if(this.dbRestaurantData.length > 0){
        this.filteredRestaurantData = [];
        for(let i = 0; i < this.dbRestaurantData.length; i++){
          for (let j = 0; j < changes.restaurantsData.currentValue.length; j++) {
              if(this.dbRestaurantData[i].restaurantId==changes.restaurantsData.currentValue[j].restaurant.id){
                let already_exists = changes.restaurantsData.currentValue[j];
                changes.restaurantsData.currentValue[j].buttonValue = "Added to favourites";
                this.filteredRestaurantData.push(already_exists);
              }else{
                this.filteredRestaurantData.push(changes.restaurantsData.currentValue[j]);
              }
          }
        }
      }else{
        this.filteredRestaurantData = changes.restaurantsData.currentValue;
      }
    }
  }

  addRestaurant(restaurant,id): void {
    $(".loading").show();
    if(!this.isLoggedIn){
      $(".loading").hide();
      this.dialogsService.alert("Message","Please Login to add to your favourites!");
      return;
    }
    if(restaurant.buttonValue){
      $(".loading").hide();
      this.dialogsService.alert("Message","Restaurant already exists!!");
      return;
    }else{
      this.usersApi.addUsersRestaurants(restaurant).then((res)=>{
        $(".loading").hide();
        let response = JSON.parse(JSON.stringify(res));
        if(response && response._id){
          this.dialogsService.alert("Message","Restaurant added to favourites!!");
          this.filteredRestaurantData.filter((obj)=>{
            if(obj.restaurant.id==restaurant.restaurant.id){
              obj.buttonValue ="Added to favourites";
            }
          });
        }else{
          this.dialogsService.alert("Message","Failed to add restaurant.Please try again Later")
        }
      },(err)=>{
        $(".loading").hide();
        this.dialogsService.alert("Message","System busy.Please try again Later")
      })
    }
  }

}
