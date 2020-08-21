import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map, catchError } from "rxjs/operators";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { baseUrl } from "../shared/baseurl";
import { ProcessHTTPMsgService } from "../services/process-httpmsg.service";

@Injectable({
  providedIn: 'root'
})
export class DishService {


  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getDishes() : Observable<Dish[]>{
    return this.http.get<Dish[]>(baseUrl + 'dishes')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  
  }

  getDish(id: String) : Observable<Dish>{
    return this.http.get<Dish>(baseUrl + 'dishes/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    
  }

  getFeaturedDish() : Observable<Dish>{
    return this.http.get<Dish>(baseUrl + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
    
  }

  getDishIds() : Observable<number[] | any>{
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
      .pipe(catchError(error => error));

  }
}
