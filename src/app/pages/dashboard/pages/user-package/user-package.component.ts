import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RootPageService } from 'src/app/pages/root-page.service';

@Component({
  selector: 'app-user-package',
  templateUrl: './user-package.component.html',
  styleUrls: ['./user-package.component.scss']
})

export class UserPackageComponent {
  limit: number=100000;
    name: string='';
    userPackage: any;
    public p: any = 1
    public itemsPerPageC: any = 100;
    count: number = 1;
  constructor(private rootService:RootPageService,private toastr:ToastrService,private route: Router){
  }
  ngOnInit(){
  
   const id=(this.route.url).split('/')[4];
     id && this.rootService.deleteUserPackageById(id).subscribe((res:any)=>{    
      if(res.status == 200){      
        this.toastr.success("Delete Package!");   
        this.route.navigate(['/dashboard/user-package-details']);
  
      }else{
        this.toastr.error("some error occured!");     
        this.route.navigate(['/dashboard/user-package-details']);
      }
     });
     this.getUserPackageDetail();
  }
  getUserPackageDetail(){
    this.rootService.getUserPackageAllData(this.name,this.limit).subscribe((res:any)=>{
      this.userPackage=res['response'];
     }); 
  }
  }
  