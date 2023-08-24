import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RootPageService } from 'src/app/pages/root-page.service';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.scss']
})
export class PackageDetailsComponent {
limit: number=100000;
  name: string='';
  package: any;
  public p: any = 1
  public itemsPerPageC: any = 100;
  count: number = 1;
constructor(private rootService:RootPageService,private toastr:ToastrService,private route: Router){
}
ngOnInit(){

 const id=(this.route.url).split('/')[4];console.log(id);
   id && this.rootService.deletePackageById(id).subscribe((res:any)=>{    
    if(res.status == 200){      
      this.toastr.success("Delete Package!");   
      this.route.navigate(['/dashboard/package-details']);

    }else{
      this.toastr.error("some error occured!");     
      this.route.navigate(['/dashboard/package-details']);
    }
   });
   this.getPackageDetail();
}
getPackageDetail(){
  this.rootService.getPackageAllData(this.name,this.limit).subscribe((res:any)=>{
    this.package=res['response'];
   }); 
}
}
