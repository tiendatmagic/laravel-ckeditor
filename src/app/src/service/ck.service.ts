import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CkService {
  urlEnv = 'http://localhost:8000/';
  constructor(private http: HttpClient) { }
  create(data: any) {
    return this.http.post(`${this.urlEnv}api/create`, data);
  }
}
