import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RootPageService } from 'src/app/pages/root-page.service';

@Component({
  selector: 'app-package-city',
  templateUrl: './package-city.component.html',
  styleUrls: ['./package-city.component.scss']
})
export class PackageCityComponent {
  limit: number=100000;
    name: string='';
    tags: any;
    public p: any = 1
    public itemsPerPageC: any = 100;
    count: number = 1;
  constructor(private rootService:RootPageService,private toastr:ToastrService,private route: Router){
  }
  ngOnInit(){
    const delId=(this.route.url).split('/')[2];
   const id=(this.route.url).split('/')[3];
   delId =='delete' && this.rootService.deletePackCityById(id).subscribe((res:any)=>{    
      if(res.status == 200){      
        this.toastr.success("Delete package city!");   
        this.route.navigate(['/dashboard/package-city']);
  
      }else{
        this.toastr.error("some error occured!");     
        this.route.navigate(['/dashboard/package-city']);
      }
     });
     this.getMetaTagAllData();
  }
  getMetaTagAllData(){
    this.rootService.getPackageCityAllData(this.name,this.limit).subscribe((res:any)=>{
      this.tags=res['response'];
     }); 
  }
  }
  