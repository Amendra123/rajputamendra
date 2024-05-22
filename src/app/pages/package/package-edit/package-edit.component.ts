import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RootPageService } from '../../root-page.service';
import { PackageUtilityService } from '../package-utility.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as $ from 'jquery'
import { async } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
@Component({
  selector: 'app-package-edit',
  templateUrl: './package-edit.component.html',
  styleUrls: ['./package-edit.component.scss'],
  providers: [PackageUtilityService]
})

export class PackageEditComponent {
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
  packgeCityOptions: any;
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

  constructor(private _formBuilder: FormBuilder, private route: Router, private toastr: ToastrService,
    private rootService: RootPageService, private _packService: PackageUtilityService, private sanitizer: DomSanitizer) { }

  getCityData() {
    this.rootService.getCityAllData(this.name, this.limit).subscribe((res: any) => {
      this.cityOptions = res['response'];
      this.cityOptions.map((e: any) => {
        e.name = `${e.name} , ${e.state}`;
      });
    });
  }
  getVehicleModelData() {
    this.rootService.getVehicleModelAllData(this.name, this.limit).subscribe((res: any) => {
      this.vehicleOptions = res['response'];
    });
  }
  getVehicleCategoryData() {
    this.rootService.getVehicleCategoryAllData(this.name, this.limit).subscribe((res: any) => {
      this.categoryOptions = res['response'];
    });
  }
  getPackageCity() {
    this.rootService.getPackageCityAllData(this.name, this.limit).subscribe((res: any) => {
      this.packgeCityOptions = res['response'];
    });
  }
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
console.log(data.from_city);
    return this._formBuilder.group({
      from_city: [data.from_city || '', [Validators.required]],
      package_city: [data.package_city || '', [Validators.required]],
      package_title: [data.title || '', [Validators.required]],      
      type: [data.type || '', [Validators.required]],     
      stay: [data.stay || '', [Validators.required]],
      daynight: [data.days || '', [Validators.required]],
      actual_price: [data.actual_price || '', [Validators.required]],
      current_price: [data.current_price || '', [Validators.required]],
     
      
      transfer: [data.transfer || ''],
      image: [''],
      subtitle: [data.subtitle || ''],
      person: [data.person || '']
    });
  }

  
 
  ngOnInit() {

    this.getCityData();
    this.getPackageCity();
 
    // console.log((this.route.url).split('/')[3])
    this.createPackage = this._formBuilder.group({
      from_city: [this.data.from_city || '', [Validators.required]],
      package_city: [this.data.package_city || '', [Validators.required]],
      package_title: [this.data.package_title || '', [Validators.required]],      
      type: [this.data.type || '', [Validators.required]],     
      stay: [this.data.stay || '', [Validators.required]],
      daynight: [this.data.days || '', [Validators.required]],
      actual_price: [this.data.actual_price || '', [Validators.required]],
      current_price: [this.data.current_price || '', [Validators.required]],      
      transfer: [this.data.transfer || ''],
      subtitle: [this.data.subtitle || ''],
      person: [this.data.person || ''],
      // slider4: [''],
      // slider5: [''],
      // slider6: [''],
      // slider7: [''],
      // slider8: [''],
      // slider9: [''],
      // slider10: [''],
      image: [''],
    //  events: this._formBuilder.array([]),

    })
    const id = (this.route.url).split('/')[3];
    let event:any=[];
    id && this.rootService.getPackageListByIdData(id,this.limit).subscribe(async (res:any)=>{
      console.log(res['response']);
      this.data=res['response'][0];
      let data: any = this.data;
      event.push(data.event_1);
      event.push(data.event_2);
      event.push(data.event_3);
      event.push(data.event_4);
      event.push(data.event_5);
      event.push(data.event_6);
      event.push(data.event_7);
      event.push(data.event_8);
      //this.events().push(this.newQuantityEdit(data,event));
      console.log(data);
      
     this.createPackage = this.createPackageForm(data);
    this.changeRoleData=event;
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
    console.log(this.responseOptions);
    var i=1;
    this.responseOptions?.forEach((items:any)=>{
      formData.append('event_'+i, items);
      i++;
    })
   
    
    // data.event= data.events[].events!=""?data.event= data.events[].events:'';
    // data.event= data.events[].events!=""?data.event= data.events[].events:'';
    // data.event= data.events[].events!=""?data.event= data.events[].events:'';
    
   
    
   // return;
    //this.createPackage.get('pdf').setValue(this.currentFile);
    // data.pdf=formData
    

    // formData.append('slider', this.selectedFiles,   this.createPackage.controls['slider']?.value);
    // if(this.selectedFiles1!= undefined){
    //   formData.append('slider1', this.selectedFiles1, this.createPackage.controls['slider1']?.value);
    // }
    // if(this.selectedFiles2!= undefined){
    //   formData.append('slider2', this.selectedFiles2, this.createPackage.controls['slider2']?.value);
    // }
    // if(this.selectedFiles3!= undefined){
    //   formData.append('slider3', this.selectedFiles3, this.createPackage.controls['slider3']?.value);
    // }
    
    // formData.append('slider2', this.selectedFiles2, this.createPackage.controls['slider2']?.value);
    // formData.append('slider3', this.selectedFiles3, this.createPackage.controls['slider3']?.value);
    // formData.append('slider4', this.selectedFiles4, this.createPackage.controls['slider4']?.value);
    // formData.append('slider5', this.selectedFiles5, this.createPackage.controls['slider5']?.value);
    // formData.append('slider6', this.selectedFiles6, this.createPackage.controls['slider6']?.value);
    // formData.append('slider7', this.selectedFiles7, this.createPackage.controls['slider7']?.value);
    // formData.append('slider8', this.selectedFiles8, this.createPackage.controls['slider8']?.value);
    // formData.append('slider9', this.selectedFiles9, this.createPackage.controls['slider9']?.value);
    // formData.append('slider10', this.selectedFiles10, this.createPackage.controls['slider10']?.value);
  
    if(this.selectedFiles){
      this.currentFile = this.selectedFiles.name;
      formData.append('image', this.selectedFiles,this.createPackage.controls['image']?.value);
    }else{
      formData.append('image', "");
    }
    formData.append('from_city', this.createPackage.controls['from_city']?.value);
    formData.append('days', this.createPackage.controls['daynight']?.value);    
    formData.append('package_city', this.createPackage.controls['package_city']?.value);
    formData.append('title', this.createPackage.controls['package_title']?.value);
    // formData.append('days', this.createPackage.controls['days']?.value);    
    formData.append('type', this.createPackage.controls['type']?.value);   
    formData.append('stay', this.createPackage.controls['stay']?.value);
    formData.append('actual_price', this.createPackage.controls['actual_price']?.value);
    formData.append('current_price', this.createPackage.controls['current_price']?.value);
    formData.append('subtitle', this.createPackage.controls['subtitle']?.value);
    formData.append('person', this.createPackage.controls['person']?.value);
    formData.append('transfer', this.createPackage.controls['transfer']?.value);
  //  formData.append('events', this.createPackage.controls['events']?.value);

    // formData.append('event_1', data.events[0]!=undefined? data.events[0].events:'');
    // formData.append('event_2', data.events[1]!=undefined? data.events[1].events:'');
    // formData.append('event_3', data.events[2]!=undefined? data.events[2].events:'');
    // formData.append('event_4', data.events[3]!=undefined? data.events[3].events:'');
    // formData.append('event_5', data.events[4]!=undefined? data.events[4].events:'');
    // formData.append('event_6', data.events[5]!=undefined? data.events[5].events:'');
    // formData.append('event_7', data.events[6]!=undefined? data.events[6].events:'');
    // formData.append('event_8', data.events[7]!=undefined? data.events[7].events:'');
    // formData.append('event9', data.events[8]!=undefined? data.events[8].events:'');
    // formData.append('event10', data.events[9]!=undefined? data.events[9].events:'');
    // formData.append('event11', data.events[11]!=undefined? data.events[11].events:'');
    // data.event1= ;
    // data.event2= data.events[1]!=undefined? data.events[1].events:'';
    // data.event3= data.events[2]!=undefined? data.events[2].events:'';
    // data.event4= data.events[3]!=undefined? data.events[3].events:'';
    // data.event5= data.events[4]!=undefined?data.events[4].events:'';
    // data.event6= data.events[5]!=undefined?data.events[5].events:'';
    // data.event7= data.events[6]!=undefined? data.events[6].events:'';
    // data.event8= data.events[7]!=undefined? data.events[7].events:'';
    // data.event9= data.events[8]!=undefined?data.events[8].events:'';
    // data.event10= data.events[9]!=undefined?data.events[9].events:'';
    // data.event11= data.events[10]!=undefined?data.events[10].events:'';

    console.log(formData);
    
    
    const id = (this.route.url).split('/')[3];
    let event:any=[];
    id && this._packService.updatePack(formData,id).subscribe((res: any) => {
     /// console.log(res.status);return;
      if (res.status == 200) {
        this.toastr.success("Updated successfully");
        this.route.navigate(['/dashboard/package']);
      } else {
        this.toastr.error("some error occured!");
      }

    });
  }

}
