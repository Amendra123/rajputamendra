import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category, Package, SubCategory } from './package.model';



@Injectable()
export class PackageUtilityService {

    // for production, we should have `${environment.apiBaseName}/encash-offers`
    readonly appUrl = `${environment}`;
    
    routeParams: any;
    

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    count = 0;
    constructor(private _httpClient: HttpClient,
        private http :HttpClient
       ) {
        
    }
    app_url:any="http://localhost:8080/api/";
    public addCategory(data:Category){
        // var reqHeader = new HttpHeaders({
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer ' + localStorage.getItem('ssn_token')
        // });
        return this._httpClient.post<Category[]>(`${this.app_url}category/add`,data);
    }
    getCategoryById(id:number){
        return this._httpClient.get<Category[]>(`${this.app_url}category/getCategoryById/${id}`);

    }
    updateCategory(id:number,data:Category){
        return this._httpClient.put<Category[]>(`${this.app_url}category/update/${id}`,data);
    }
    deleteCategoryById(id:number){
        return this._httpClient.delete<Category[]>(`${this.app_url}category/delete/${id}`);

    }
    public addSubCategory(data:SubCategory){
        // var reqHeader = new HttpHeaders({
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer ' + localStorage.getItem('ssn_token')
        // });
        return this._httpClient.post<SubCategory[]>(`${this.app_url}sub-category/add`,data);
    }
    getSubCategoryById(id:number){
        return this._httpClient.get<SubCategory[]>(`${this.app_url}sub-category/getSubCategoryById/${id}`);

    }
    getSubCategoryByName(name:string){
        return this._httpClient.get<SubCategory[]>(`${this.app_url}sub-category?name=${name}`);

    }
    updateSubCategory(id:number,data:SubCategory){console.log(data);
        return this._httpClient.put<SubCategory[]>(`${this.app_url}sub-category/update/${id}`,data);
    }
    deleteSubCategoryById(id:number){
        return this._httpClient.delete<SubCategory[]>(`${this.app_url}sub-category/delete/${id}`);

    }
    addPackage(file:any,data:Package){
     
     return this.http.post<Package[]>(`${this.app_url}package/add`,file);
    }
    createPackage(data:any){
        return this.http.post<Package[]>(`${this.app_url}createPackage`,data);
    }
    updatePackage(file:any,id:any){
     
        return this.http.put<Package[]>(`${this.app_url}package/update/${id}`,file);
       }
    updatePackageDetail(file:any,id:any){
     
        return this.http.put<Package[]>(`${this.app_url}updatePackDetail/${id}`,file);
    }
}
