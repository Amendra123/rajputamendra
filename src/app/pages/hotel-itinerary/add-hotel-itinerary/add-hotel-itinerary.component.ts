import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RootPageService } from '../../root-page.service';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as $ from 'jquery'
import { async } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { PackageUtilityService } from '../../package/package-utility.service';
@Component({
  selector: 'app-add-hotel-itinerary',
  templateUrl: './add-hotel-itinerary.component.html',
  styleUrls: ['./add-hotel-itinerary.component.scss'],
  providers: [PackageUtilityService]
})

export class AddHotelItineraryComponent {
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
  createPackageForm(data: any) {

    return this._formBuilder.group({
      from_city: [data.from_city || '', [Validators.required]],
      p_city: [data.p_city || '', [Validators.required]],
      package_title: [data.package_title || '', [Validators.required]],
      hotel_detail: [data.hotel_detail || '', [Validators.required]],
     // days: [data.days || '', [Validators.required]],
      star: [data.star || '', [Validators.required]],
      p_title: [data.p_title || '', [Validators.required]],
      hoteld: [data.hoteld || '', [Validators.required]],
    //  type: [data.type || '', [Validators.required]],
      hotel_title: [data.hotel_title || ''],
      hotel_include: [data.hotel_include || '', [Validators.required]],
      hotel_type: [data.hotel_type || '', [Validators.required]],
      hotel_address: [data.hotel_address || '', [Validators.required]],
      
      hotel_no: [data.hotel_no || '', [Validators.required]],
      hotel_price: [data.hotel_price || '', [Validators.required]],
      
      hotel_image: ['', [Validators.required]],
      hotel1: ['', [Validators.required]],
      hotel2: ['', [Validators.required]],
      hotel_image1: ['', [Validators.required]],
      hotel_image2: ['', [Validators.required]],
      // slider5: [''],
      // slider6: [''],
      // slider7: [''],
      // slider8: [''],
      // slider9: [''],
      // slider10: [''],
      
    });
  }
  x=1;
  createItem(x:any): FormGroup {
    return this._formBuilder.group({
      slider1: '',
    });
  }
  addSlider(){
    
     this.createItem(this.x);
    //(this.createPackage.get("createPackage") as FormGroup).addControl('slider'+this.x, new FormControl(""));

    //this.createPackage.addControl('slider'+this.x, new FormControl(''));
    this.x++;    
  }
  
  ngOnInit() {


    // console.log((this.route.url).split('/')[3])
    this.getCityData();
    this.getPackageCity();
    this.getSightSeeingData();
    this.getVehicleModelData();
    this.getVehicleCategoryData();
    const id = (this.route.url).split('/')[3];
    
    //  this.rootService.getSubCategoryAllData(this.name,this.limit).subscribe((res:any)=>{
    //   this.subCategoryOptions=res['response'];
    //  });

   // this.createPackage.addControl('slider1',[]);

   
    // this.createPackage = this.createPackageForm(this.dataForm);


    let data: any = this.data;
    console.log(data);
    this.createPackage = this._formBuilder.group({
      
      from_city: [data.from_city || '', [Validators.required]],
      p_city: [data.p_city || '', [Validators.required]],
    //  package_title: [data.package_title || '', [Validators.required]],
      hotel_detail: [data.hotel_detail || '', [Validators.required]],
     // days: [data.days || '', [Validators.required]],
      star: [data.star || '', [Validators.required]],
      //p_title: [data.p_title || '', [Validators.required]],
      hoteld: [data.hoteld || '', [Validators.required]],
     // type: [data.type || '', [Validators.required]],
      hotel_title: [data.hotel_title || ''],
      hotel_include: [data.hotel_include || '', [Validators.required]],
      hotel_type: [data.hotel_type || '', [Validators.required]],
      hotel_address: [data.hotel_address || '', [Validators.required]],
      
      hotel_no: [data.hotel_no || '', [Validators.required]],
      hotel_price: [data.hotel_price || '', [Validators.required]],
      
      hotel_image: ['', [Validators.required]],
      hotel1: ['', [Validators.required]],
      hotel2: ['', [Validators.required]],
      hotel_image1: ['', [Validators.required]],
      hotel_image2: ['', [Validators.required]],

    });
   // console.log("okk11",id);
    
  }

  getImg(img: any) {
    //.log(img);
    // let objectURL = 'data:image/jpeg;base64,' + img

    // return this.sanitizer.bypassSecurityTrustUrl(objectURL);
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

  

  fileName = '';

  selectFile(event: any): void {
    const file: File = event.target.files[0];
    this.selectedFiles = file;
    ///this.createPackage.controls['pdf']?.setValue(this.selectedFiles.name);
  }
  selectFileImg(event: any): void {
    const file: File = event.target.files[0];
    this.selectedFilesImg = file;
    ///this.createPackage.controls['pdf']?.setValue(this.selectedFiles.name);
  }
  selectFileVedio(event: any): void {
    const file: File = event.target.files[0];
    this.selectedFilesVedio = file;
    ///this.createPackage.controls['pdf']?.setValue(this.selectedFiles.name);
  }

  selectFile1(event: any): void {
    const file: File = event.target.files[0];
    this.selectedFiles1 = file;
  }
  selectFile2(event: any): void {
    const file: File = event.target.files[0];
    this.selectedFiles2 = file;
  }
  selectFile3(event: any): void {
    const file: File = event.target.files[0];
    this.selectedFiles3 = file;
  }
  selectFile4(event: any): void {
    const file: File = event.target.files[0];
    this.selectedFiles4 = file;
  }
  selectFile5(event: any, i: any): void {
    const file: File = event.target.files[0];
    this.selectedFiles5 = file;
  }
  selectFile6(event: any, i: any): void {
    const file: File = event.target.files[0];
    this.selectedFiles6 = file;
  }
  selectFile7(event: any, i: any): void {
    const file: File = event.target.files[0];
    this.selectedFiles7 = file;
  }
  selectFile8(event: any, i: any): void {
    const file: File = event.target.files[0];
    this.selectedFiles8 = file;
  }
  selectFile9(event: any, i: any): void {
    const file: File = event.target.files[0];
    this.selectedFiles9 = file;
  }
  selectFile10(event: any, i: any): void {
    const file: File = event.target.files[0];
    this.selectedFiles10 = file;
  }
  getSightSeeingEvent(val: any) {
    console.log(val);
    if (val != undefined) {
      localStorage.setItem("setpacktitle", JSON.stringify(val));
    }

  }
  addPackage() {


    const data = this.createPackage.getRawValue();
    
    //this.createPackage.get('pdf').setValue(this.currentFile);
    // data.pdf=formData
    const formData = new FormData();

    formData.append('hotel_image', this.selectedFiles,   this.createPackage.controls['hotel_image']?.value);
    if(this.selectedFiles1!= undefined){
      formData.append('hotel1', this.selectedFiles1, this.createPackage.controls['hotel1']?.value);
    }
    if(this.selectedFiles4!= undefined){
      formData.append('hotel2', this.selectedFiles4, this.createPackage.controls['hotel2']?.value);
    }
    if(this.selectedFiles2!= undefined){
      formData.append('hotel_image1', this.selectedFiles2, this.createPackage.controls['hotel_image1']?.value);
    }
    if(this.selectedFiles3!= undefined){
      formData.append('hotel_image2', this.selectedFiles3, this.createPackage.controls['hotel_image2']?.value);
    }
    
   
   
    formData.append('from_city', this.createPackage.controls['from_city']?.value);
   // formData.append('days', this.createPackage.controls['days']?.value);
    
    formData.append('p_city', this.createPackage.controls['p_city']?.value);
    formData.append('hoteld', this.createPackage.controls['hoteld']?.value);
    formData.append('hotel_detail', this.createPackage.controls['hotel_detail']?.value);
    formData.append('hotel_title', this.createPackage.controls['hotel_title']?.value);
    //formData.append('type', this.createPackage.controls['type']?.value);
    formData.append('hotel_address', this.createPackage.controls['hotel_address']?.value);
    formData.append('hotel_price', this.createPackage.controls['hotel_price']?.value);
    formData.append('hotel_no', this.createPackage.controls['hotel_no']?.value);
    formData.append('hotel_include', this.createPackage.controls['hotel_include']?.value);
    formData.append('star', this.createPackage.controls['star']?.value);
    formData.append('hotel_type', this.createPackage.controls['hotel_type']?.value);
    
    console.log(formData);
    data.pdf = formData
    
    this._packService.createHotel(formData).subscribe((res: any) => {
     /// console.log(res.status);return;
      if (res.status == 200) {
        this.toastr.success("Added successfully");
        this.route.navigate(['/dashboard/package-list']);
      } else {
        this.toastr.error("some error occured!");
      }

    });
  }

}