import { Component } from '@angular/core';
import { RootPageService } from '../../root-page.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PackageUtilityService } from '../package-utility.service';

@Component({
  selector: 'app-show-subcategory',
  templateUrl: './show-subcategory.component.html',
  styleUrls: ['./show-subcategory.component.scss'],
  providers: [PackageUtilityService]
})
export class ShowSubcategoryComponent {
  limit: number=100000;
    name: string='';
    subcategory: any;
    public p: any = 1
    dataLoaded:boolean=false;
    public itemsPerPageC: any = 100;
    count: number = 1;
  constructor(private _packService: PackageUtilityService,
    private _formBuilder: FormBuilder,
    private rootService:RootPageService,
    private route: Router,
    private toastr:ToastrService){
  }
  ngOnInit(){
    this.getData();
    const id:any = this.route.url?.split('/');console.log(id)
    if (id && id[2] != undefined && id[2]=="deleteSubcategory") {
     
      id && this._packService.deleteSubCategoryById(id[3]).subscribe((res:any) => {
        this.dataLoaded = true;  
        this.toastr.success("Deleted successfully");
        this.route.navigate(['package/show-Subcategory']);
       // this.getData();       
      }
      );
    }
   
  }
  getData(){
    this.rootService.getSubCategoryAllData(this.name,this.limit).subscribe((res:any)=>{
      this.subcategory=res['response'];
      this.dataLoaded=true;
     }); 
  }
  }