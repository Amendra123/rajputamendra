import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tags } from './metatag.model';



@Injectable()
export class MetatagUtilityService {

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
    public addTags(data:any){
        // var reqHeader = new HttpHeaders({
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer ' + localStorage.getItem('ssn_token')
        // });
        return this._httpClient.post<Tags[]>(`${this.app_url}metatags/add`,data);
    }
    getTagById(id:number){
        return this._httpClient.get<Tags[]>(`${this.app_url}metatags/getTagsById/${id}`);

    }
    updateTag(id:number,data:any){
        return this._httpClient.put<Tags[]>(`${this.app_url}metatags/update/${id}`,data);
    }
    deleteTagById(id:number){
        return this._httpClient.delete<Tags[]>(`${this.app_url}metatags/delete/${id}`);

    }
    
}
