import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { RootPageService } from '../root-page.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hotel-itinerary',
  templateUrl: './hotel-itinerary.component.html',
  styleUrls: ['./hotel-itinerary.component.scss']
})

export class HotelItineraryComponent {
  limit: number=100000;
    name: string='';
    tags: any;
    public p: any = 1
    public itemsPerPageC: any = 100;
    count: number = 1;
    base_url_img: string = "http://localhost:8080/uploads/package/";
  constructor(private rootService:RootPageService,private toastr:ToastrService,private route: Router){
  }
  ngOnInit(){
    
   const id=(this.route.url).split('/')[3];
     id && this.rootService.deletePackageIteneray(id).subscribe((res:any)=>{    
      if(res.status == 200){      
        this.toastr.success("Delete itinerary!");   
        this.route.navigate(['/dashboard/package-itinerary']);
  
      }else{
        this.toastr.error("some error occured!");     
        this.route.navigate(['/dashboard/package-itinerary']);
      }
     });
     this.getHotelItenerayData();
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
  getHotelItenerayData(){
    this.rootService.getHotelItenerayData(this.name,this.limit).subscribe((res:any)=>{
      this.tags=res['response'];
     }); 
  }
  getPackCity(id:any){
   return this.rootService.packageCity(id,this.limit).subscribe((res:any)=>{
      this.tags=res['response'];console.log(res['response']);
     });
  }
  openPdf(id:any){

  }
  }