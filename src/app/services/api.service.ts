import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  

  constructor(private httpClient:HttpClient) {}

  private url = "helo";
  headers = new HttpHeaders({
  	'Content-Type': 'application/json',
  	'Access-Control-Allow-Origin': '*'
  })
   get(url: string){
      return this.httpClient.get(url);
   }
}