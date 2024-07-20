import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl= environment.baseUrl;

  constructor(private http:HttpClient) { }

  create(obj:any):Observable<any>{
    return this.http.post(this.baseUrl+'products',{
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
    return this.http.get(this.baseUrl+'products/list',{params:params});
  }

  delete(id:any):Observable<any>{
    return this.http.delete(this.baseUrl+'products/'+id);
  }

  update(obj:any, id:any):Observable<any>{
    return this.http.put(this.baseUrl+'products/'+id,{
      qty:obj.qty,
      unitPrice:obj.unitPrice,
      description:obj.description
    })
  }

  productImageUpload(data:FormData, productId:any):Observable<any>{
    return this.http.post(this.baseUrl+'product-images/'+productId,data)
  }

}
