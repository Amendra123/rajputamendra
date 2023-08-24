import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RootPageService } from 'src/app/pages/root-page.service';

@Component({
  selector: 'app-meta-tags',
  templateUrl: './meta-tags.component.html',
  styleUrls: ['./meta-tags.component.scss'],
})
export class MetaTagsComponent {
  limit: number=100000;
    name: string='';
    tags: any;
    public p: any = 1
    public itemsPerPageC: any = 100;
    count: number = 1;
  constructor(private rootService:RootPageService,private toastr:ToastrService,private route: Router){
  }
  ngOnInit(){
  
   const id=(this.route.url).split('/')[3];
     id && this.rootService.deleteMetaTagsById(id).subscribe((res:any)=>{    
      if(res.status == 200){      
        this.toastr.success("Delete metaTags!");   
        this.route.navigate(['/dashboard/metaTags']);
  
      }else{
        this.toastr.error("some error occured!");     
        this.route.navigate(['/dashboard/metaTags']);
      }
     });
     this.getMetaTagAllData();
  }
  getMetaTagAllData(){
    this.rootService.getMetaTagAllData(this.name,this.limit).subscribe((res:any)=>{
      this.tags=res['response'];
     }); 
  }
  }
  