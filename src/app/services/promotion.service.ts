import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions'; 
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map, catchError } from "rxjs/operators";
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { baseUrl } from "../shared/baseurl";
import { ProcessHTTPMsgService } from "../services/process-httpmsg.service";


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getPromotions() : Observable<Promotion[]>{
    return of(PROMOTIONS).pipe(delay(2000));

  }

  getPromotion(id: String) : Observable<Promotion>{
    return of(PROMOTIONS.filter(prom =>(prom.id === id))[0]).pipe(delay(2000));

  }

  getFeaturedPromotion() : Observable<Promotion>{
    return this.http.get<Promotion>(baseUrl + 'promotions?featured=true').pipe(map(promo => promo[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));

}

}
