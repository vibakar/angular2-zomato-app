import { Component, OnInit } from '@angular/core';

import { ZomatoService } from './../../services/zomato.service';
import { DialogsService } from './../../services/dialogs.service';
import { UsersService } from '../../services/users.service';
import * as $ from "jquery";

@Component({
  selector: 'app-search',
  templateUrl: './search-restaurants.component.html',
  styleUrls: ['./search-restaurants.component.css'],
  providers: [ZomatoService,DialogsService]
})
export class SearchRestaurantsComponent implements OnInit {
  restaurants:any;
  search:string = "Search";
  disabled:string;
  color:string = "accent";
  pagination:boolean = false;
  autoSearch:boolean = false;
  visited:string;
  constructor(private zomato: ZomatoService,private dialogsService: DialogsService, private usersApi: UsersService){}

  ngOnInit() {
    this.getPosition();
  }

  fetchRestaurants(cityName, cuisineName, userSearch) {
    $(".loading").show();
    if(!cityName){
      this.dialogsService.alert("Message","Please provide the city name");
      $(".loading").hide();
      return;
    }
    if(userSearch){
      this.search = "Searching";
      this.disabled = "disabled";
    }

    this.restaurants = [];
    this.pagination = false;
    this.zomato.getRestaurants(cityName, cuisineName).then(
      (data)=> {
       $(".loading").hide();
       this.search = "Search";
       this.disabled = "";
        if(data){
          this.restaurants = data;
          this.pagination = true;
        }else{
          this.pagination = false;
          this.dialogsService.alert("Message","Failed to fetch restaurants.Please try again");
        }
      },
      (err)=>{
       $(".loading").hide();
        this.disabled = "";
        this.pagination = false;
        this.search = "Search";
        if(userSearch){
          this.dialogsService.alert("Message","Failed to fetch restaurants.Try again later");
        }
    });
  }

  getPosition(){
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          this.usersApi.getLocation(position.coords.latitude, position.coords.longitude)
                       .then((res)=>{
                         var response = JSON.parse(JSON.stringify(res));
                         if(response && response.results[0].address_components[5]["long_name"]){
                           let location = response.results[0].address_components[5]["long_name"];
                           let city = location.split(" ");
                           localStorage.setItem("userlocation", city[0]);
                           this.searchRestaurantsByUserLocation();
                         }
                       });
        });
    }
}

  searchRestaurantsByUserLocation() {
    this.autoSearch = true;
    let location = localStorage.getItem("userlocation");
    if(location){
      this.fetchRestaurants(location, "","");
    }
  }

}