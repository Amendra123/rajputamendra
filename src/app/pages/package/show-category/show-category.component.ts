import { Component } from '@angular/core';
import { RootPageService } from '../../root-page.service';
import { Router } from '@angular/router';
import { PackageUtilityService } from '../package-utility.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.scss'],
  providers:[PackageUtilityService]
})
export class ShowCategoryComponent {
  limit: number=100000;
    name: string='';
    dataLoaded:boolean=false;
    category: any;
    public p: any = 1
    public itemsPerPageC: any = 100;
    count: number = 1;
  constructor(private toastr:ToastrService,private route: Router, private rootService:RootPageService, private _packService: PackageUtilityService,){
  }
  ngOnInit(){
    this.getData();
    const id:any = this.route.url?.split('/');
    if (id && id[2] != undefined && id[2]=='delete') {      
      id && this._packService.deleteCategoryById(id[3]).subscribe((res:any) => {
        this.dataLoaded = true;  
       this.getData();
       this.toastr.success("Deleted successfully");
      this.route.navigate(['package/show-category']);
      }
      );
    }
  }
  getData(){
    this.rootService.getCategoryAllData(this.name,this.limit).subscribe((res:any)=>{
      this.dataLoaded = true;  
      this.category=res['response'];
     }); 
  }
  }