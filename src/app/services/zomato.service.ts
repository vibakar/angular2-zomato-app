import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ZomatoService {
  headers = new Headers({'user-key':'05d077a0d976341f50c2166d0aa71759'});
  constructor(private http:Http) { }

  getRestaurants(cityName, cuisineName): Promise<void> {
    return this.http.get(`https://developers.zomato.com/api/v2.1/cities?q=${cityName}`,
                    {headers: this.headers})
                    .toPromise()
                    .then(
                      (res)=> this.getAllRestaurants(res.json().location_suggestions[0].id,cuisineName),
                      (err)=> console.log(err)
                    );
  }

  getAllRestaurants(cityId, cuisineName): Promise<void> {
    return this.http.get(`https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&q=${cuisineName}&count=20`,
                    {headers: this.headers})
                    .toPromise()
                    .then(
                      (res)=>res.json().restaurants,
                      (err)=>console.log(err)
                    );
  }
}
