import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map, catchError } from "rxjs/operators";
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { baseUrl } from "../shared/baseurl";
import { ProcessHTTPMsgService } from "../services/process-httpmsg.service";


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders() : Observable<Leader[]>{
    return this.http.get<Leader[]>(baseUrl + 'leadership')
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  getLeader(id: String) : Observable<Leader>{
    return this.http.get<Leader>(baseUrl + 'leadership/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
 
  }

  getFeaturedLeader() : Observable<Leader>{
    return this.http.get<Leader>(baseUrl + 'leadership?featured=true').pipe(map(leaders => leaders[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
}
