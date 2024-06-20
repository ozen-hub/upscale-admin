import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl='http://localhost:8001/api/v1/products';

  constructor(private http:HttpClient) { }

  create(obj:any):Observable<any>{
    return this.http.post(this.baseUrl,{
      qty:obj.qty,
      unitPrice:obj.unitPrice,
      description:obj.description
    })
  }

  search(page:any, size:any, searchText:any):Observable<any>{
    let params = new HttpParams();
    params=params.append('searchText', searchText);
    params=params.append('page', page);
    params=params.append('size', size);
    return this.http.get(this.baseUrl+'/list',{params:params});
  }

}
