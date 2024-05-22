import { Component } from '@angular/core';
import { RootPageService } from '../../root-page.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss']
})

export class PackageListComponent {
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
     this.getPackageListData();
  }
  confirm(id:any){   
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        id &&  this.rootService.deletePackageDetailById(id).subscribe((res:any)=>{    
          if(res.status == 200){    
            Swal.fire('Deleted!', 'Event has been deleted.', 'success');  
            this.toastr.success("Delete Package Data All Days!");   
            this.route.navigate(['/dashboard/package-list']);      
          }else{
            this.toastr.error("some error occured!");     
            this.route.navigate(['/dashboard/package-list']);
          }
         });        
      }
    });
   
   
  }
  getPackageListData(){
    this.rootService.getPackageListData1(this.name,this.limit).subscribe((res:any)=>{
      this.tags=res['response'];
     }); 
  }
  openPdf(id:any){

  }
  }
  