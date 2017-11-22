import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsersService {
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http){}

  login(email,password): Promise<void> {
    return this.http.post('/users/login',JSON.stringify({
            email:email,
            password:password
          }),{headers: this.headers})
          .toPromise()
          .then((res)=>res.json(),
                (err)=>err.json())
  }

  signup(data): Promise<void> {
    return this.http.post('/users/signup',JSON.stringify({
            username:data.username,
            email:data.email,
            password:data.password
          }),{headers: this.headers})
          .toPromise()
          .then((res)=>res.json(),
                (err)=>err.json())
  }

  logout(): Promise<void> {
      return this.http.get('/users/logout')
                      .toPromise()
                      .then((res)=>res.json(),
                            (err)=>err.json())
  }

  addUsersRestaurants(res): Promise<string> {
    return this.http.put('/users/addRestaurant',JSON.stringify({
                    restaurantId: res.restaurant.id,
                    restaurantImage: res.restaurant.featured_image,
                    restaurantName: res.restaurant.name,
                    restaurantCuisines: res.restaurant.cuisines,
                    restaurantAddress: res.restaurant.location.address,
                    restaurantRatings: res.restaurant.user_rating.aggregate_rating,
                    restaurantLatitude: res.restaurant.location.latitude,
                    restaurantLongitude: res.restaurant.location.longitude
                  }),{headers: this.headers})
             .toPromise()
             .then((res)=>res.json(),
                  (err)=>err.json())
  }

  getUsersRestaurants(): Promise<void> {
    return this.http.get('/users/getRestaurants')
                    .toPromise()
                    .then((res)=>res.json(),
                          (err)=>err.json())
  }

  deleteUsersRestaurant(id): Promise<void> {
    return this.http.delete(`/users/deleteRestaurant/${id}`)
                    .toPromise()
                    .then((res)=>res.json(),
                          (err)=>err.json())

  }

  deleteAllRestaurants(): Promise<void> {
    return this.http.delete('/users/deleteAllRestaurants')
                    .toPromise()
                    .then((res)=>res.json(),
                          (err)=>err.json)
  }

  getUsername(): Promise<void> {
    return this.http.get('/users/getUsername')
                    .toPromise()
                    .then((res)=>res.json(),
                          (err)=>err.json())
  }

  getLocation(lat, long): Promise<void> {
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyDMWvvLE04B3QyCDmWU71codd8tADfNnjc`)
                    .toPromise()
                    .then((res)=>res.json(),
                          (err)=>err.json())
 }

 isUserExists(email): Promise<void> {
   return this.http.post('/users/checkUser',JSON.stringify({
           email:email
         }),{headers: this.headers})
         .toPromise()
         .then((res)=>res.json(),
               (err)=>err.json())
 }

 resetPassword(password): Promise<void> {
   var email = localStorage.getItem('useremail');
   return this.http.put('/users/resetPassword',JSON.stringify({
                           email: email,
                           password:password
                         }),{headers: this.headers})
                   .toPromise()
                   .then((res)=>res.json(),
                         (err)=>err.json())
 }

 updateUserDetails(userDetails): Promise<void> {
    return this.http.put('/users/updateUserDetails',
                          JSON.stringify(userDetails),
                          {headers:this.headers})
                    .toPromise()
                    .then((res)=>res.json(),
                          (err)=>err.json())
 }

}
