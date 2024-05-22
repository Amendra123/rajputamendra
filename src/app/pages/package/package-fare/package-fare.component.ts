import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RootPageService } from '../../root-page.service';
import { PackageUtilityService } from '../package-utility.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as $ from 'jquery'

import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-package-fare',
  templateUrl: './package-fare.component.html',
  styleUrls: ['./package-fare.component.scss'],
  providers: [PackageUtilityService]
})

export class PackageFareComponent {
  public Editor = ClassicEditor;
  createPackage!: FormGroup;
  limit: number = 100000;
  file: any = "";
  name: string = '';
  cityOptions: any;
  subCategoryOptions: any;
  selectedFiles: any;
  selectedFiles1: any;
  selectedFiles2: any;
  selectedFiles3: any;
  selectedFiles4: any;
  selectedFiles5: any;
  selectedFiles6: any;
  selectedFiles7: any;
  selectedFiles8: any;
  selectedFiles9: any;
  selectedFiles10: any;

  currentFile: any;
  dataLoaded: boolean = false;
  data: any=[];
  vehicleOptions: any;
  categoryOptions: any;
  active: boolean = false;
  packgeCityOptions: any=[];
  sightSeeingOptions: any;
  sightSeeingPopUp: boolean = false;
  dataForm: any;
  days: any;
  package_title: any;
  duration: any;
  facility: any = "3 Seater | 2 Luggage Bags | AC | First Aid";
  sigheSeeing: any;
  sightSeeingData: any;
  url = "http://localhost:8080/";
  selectedFilesImg: any;
  selectedFilesVedio: any;
  changeRoleData: any=[];
  responseOptions: any;
  getPackageFareData: any;
  public p: any = 1
  public itemsPerPageC: any = 10;
    count: number = 1;
   monthOptions:any = [{id:1,month:'January'}, {id:2,month:'February'}, {id:3,month:'March'}, {id:4,month:'April'}, {id:5,month:'May'}, {id:6,month:'June'}, {id:7,month:'July'}, {id:8,month:'August'}, {id:9,month:'September'}, {id:10,month:'October'}, {id:11,month:'November'}, {id:12,month:'December'}];

  constructor(private _formBuilder: FormBuilder, private route: Router, private toastr: ToastrService,
    private rootService: RootPageService, private _packService: PackageUtilityService, private sanitizer: DomSanitizer) { }

    getAllPacakgeTitle() {
    this.rootService.getAllPacakgeTitle(this.name, this.limit).subscribe((res: any) => {
      this.packgeCityOptions = res['response'];
      this.packgeCityOptions.map((e: any) => {
        let title = e.package_title.replace(/<\/?[^>]+(>|$)/g, "");
        e.package_title = `${title}`;
      });
    });
    //console.log(this.packgeCityOptions );
  }
  getPackageFare() {
    this.rootService.getPackageFare(this.name, this.limit).subscribe((res: any) => {
      this.getPackageFareData = res['response'];
    });
  }
  getVehicleCategoryData() {
    this.rootService.getVehicleCategoryAllData(this.name, this.limit).subscribe((res: any) => {
      this.categoryOptions = res['response'];
    });
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
        id &&  this.rootService.deletePackageFare(id).subscribe((res:any)=>{    
          if(res.status == 200){ 
            this.getPackageFare();      
            Swal.fire('Deleted!', 'Event has been deleted.', 'success');  
            this.toastr.success("Delete Package Data!");   
            this.route.navigate(['/dashboard/package-fare']);      
          }else{
            this.toastr.error("some error occured!");     
            this.route.navigate(['/dashboard/package-faret']);
          }
         });        
      }
    });
   
   
  }
  // getPackageCity() {
  //   this.rootService.getPackageCityAllData(this.name, this.limit).subscribe((res: any) => {
  //     this.packgeCityOptions = res['response'];
  //   });
  // }
  getSightSeeingData() {
    this.rootService.getSightSeeingAllData(this.name, this.limit).subscribe((res: any) => {
      this.sightSeeingOptions = res['response'];
    });
  }
  showSightSeeing() {
    this.sightSeeingPopUp = true;
    let pack: any = localStorage.getItem('setpack');
    var setpack = JSON.parse(pack); console.log(setpack);
    this.sightSeeingData = setpack;

  }
  hideSightSeeing() {
    this.sightSeeingPopUp = false;
  }
  cancel(id: any) {
    console.log(id);
    $('#remove_button' + id).hide();
  }
  createPackageForm(data: any) {
console.log(data);
const name=this.monthOptions.filter((res:any)=> data.package_month == res.month);
    return this._formBuilder.group({
      package_id: [data.package_id || '', [Validators.required]],
      package_month: [ name[0]?.month || '', [Validators.required]],
      no_person: [data.no_person || '', [Validators.required]],
      actual_price: [data.actual_price || '', [Validators.required]],
      current_price: [data.current_price || '', [Validators.required]]     
    });
  }

  confirm1(id:any){   
    id && this.rootService.getPackageFareById(id).subscribe(async (res:any)=>{
      console.log(res['response']);
      this.data=res['response'];
      this.createPackage = this.createPackageForm(this.data);   
     });
  }
 
  ngOnInit() {

    this.getAllPacakgeTitle();
    this.getPackageFare();
   
   this.monthOptions.map((e: any) => {
    let title = e.month;
    e.month = `${title}`;
  });
    // console.log((this.route.url).split('/')[3])
    const name=this.monthOptions.filter((res:any)=> this.data.package_month == res.month);
    this.createPackage = this._formBuilder.group({
      package_id: [this.data.package_id || '', [Validators.required]],  
     package_month: [name[0]?.month || '', [Validators.required]],
      no_person: [this.data.no_person || '', [Validators.required]],    
      actual_price: [this.data.actual_price || '', [Validators.required]],
      current_price: [this.data.current_price || '', [Validators.required]]
    })
    const id = (this.route.url).split('/')[3];
    let event:any=[];
    id && this.rootService.getPackageFareById(id).subscribe(async (res:any)=>{
     // console.log(res['response']);
      this.data=res['response'];
      this.createPackage = this.createPackageForm(this.data);   
     });

  }

 

  getImg(img: any) {
    //.log(img);
    // let objectURL = 'data:image/jpeg;base64,' + img

    // return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
  receiveChildData(formData: any): void {   
    const responseOptionNew:any = [];
    const questionAttribute = [];
    formData && formData.forEach((items:any) => {
      responseOptionNew.push(items.events);
    });

    this.responseOptions = responseOptionNew;
  }
 

  filterUsers(val: any) {
    let filterUsers = this.cityOptions.filter((item: any) => {
      item.name == val
    });
    if (filterUsers.length > 0) {
      this.cityOptions = filterUsers;
    } else {
      this.cityOptions = this.cityOptions;
    }
  }

  getPackCityEvent(val: any) {
    if (val == undefined) {
      return;
    }

    this.rootService.getSightSeeingAllData(val.id, this.limit).subscribe((res: any) => {

      if (res['response'].length > 0 && res['response'].pack_title == undefined) {
        var data1 = { 'data': res['response'] };
        localStorage.setItem("setpack1", JSON.stringify(res['response'][0]));
        localStorage.removeItem("setpacktitle");
      }
      else {
        localStorage.setItem("setpacktitle", JSON.stringify(res['response'][0]));
        let data: any = localStorage.getItem('setpacktitle');
        var setpacktitle = JSON.parse(data);
        $('#setpacktitle').val(JSON.stringify(setpacktitle));
      }
    });
  }
  getSubCat(val: string) {
    this._packService.getSubCategoryByName(val).subscribe((res: any) => {
      this.subCategoryOptions = res['response'];
      this.dataLoaded = true;
    });
  }


  fileName = '';

  selectFileImg(event: any): void {
    const file: File = event.target.files[0];
    this.selectedFiles = file;
    ///this.createPackage.controls['pdf']?.setValue(this.selectedFiles.name);
  }
 
  savePackage() {
    const formData = new FormData();
    const data = this.createPackage.getRawValue();
    console.log(this.responseOptions,data);
   
   const tt ={'package_id': $.trim(this.createPackage.controls['package_id']?.value),
   'package_month': this.createPackage.controls['package_month']?.value,
   'no_person': this.createPackage.controls['no_person']?.value,
  //'actual_price': this.createPackage.controls['actual_price']?.value,
  'current_price': this.createPackage.controls['current_price']?.value}
;
    
    
    
    
    const id = (this.route.url).split('/')[3];console.log(id);
    let event:any=[];
    if(id !="" && id != undefined){
      id && this._packService.updatePackagefare(tt,id).subscribe((res: any) => {
        /// console.log(res.status);return;
         if (res.status == 200) {
           this.toastr.success("Updated successfully");
           this.route.navigate(['/dashboard/package-fare']);
         } else {
           this.toastr.error("some error occured!");
         }
   
       });
    }
    else{
      this._packService.manageFare(tt).subscribe((res: any) => {
        /// console.log(res.status);return;
         if (res.status == 200) {
           this.toastr.success("Updated successfully");
           this.route.navigate(['/dashboard/package-fare']);
         } else {
           this.toastr.error("some error occured!");
         }
   
       });
    }
    
  }

}