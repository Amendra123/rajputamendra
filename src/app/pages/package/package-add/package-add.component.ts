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
  selector: 'app-package-add',
  templateUrl: './package-add.component.html',
  styleUrls: ['./package-add.component.scss'],
  providers: [PackageUtilityService]
})

export class PackageAddComponent {
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
  createPackageForm(data: any) {
console.log(data);
    return this._formBuilder.group({
      from_city: [data.from_city || '', [Validators.required]],
      package_city: [data.p_id || '', [Validators.required]],
      package_title: [data.package_title || '', [Validators.required]],
      
      type: [data.type || '', [Validators.required]],
     
     
      stay: [data.stay || '', [Validators.required]],
      daynight: [data.daynight || '', [Validators.required]],
      actual_price: [data.actual_price || '', [Validators.required]],
      current_price: [data.current_price || '', [Validators.required]],
      addtitle: [data.addtitle || '', [Validators.required]],
      perchange: [data.perchange || '', [Validators.required]],
      transfer: [data.transfer || ''],
      
      // slider4: [''],
      // slider5: [''],
      // slider6: [''],
      // slider7: [''],
      // slider8: [''],
      // slider9: [''],
      // slider10: [''],
      image: ['', [Validators.required]],
      events: this._formBuilder.array([]),
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
  
  events() : FormArray {  
    return this.createPackage.get("events") as FormArray  
  }  
     
  newQuantity(): FormGroup {  
    return this._formBuilder.group({  
      events: ''
     
    })  
  }  
     
  addQuantity() {  
    this.events().push(this.newQuantity());  
  }  
     
  removeQuantity(i:number) {  
    this.events().removeAt(i);  
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
      package_city: [data.p_id || '', [Validators.required]],
      package_title: [data.package_title || '', [Validators.required]],
      
      type: [data.type || '', [Validators.required]],
      
     
      stay: [data.stay || '', [Validators.required]],
      daynight: [data.daynight || '', [Validators.required]],
      actual_price: [data.actual_price || '', [Validators.required]],
      current_price: [data.current_price || '', [Validators.required]],
      addtitle: [data.addtitle || '', [Validators.required]],
      perchange: [data.perchange || '', [Validators.required]],
      transfer: [data.transfer || ''],
      
      // slider4: [''],
      // slider5: [''],
      // slider6: [''],
      // slider7: [''],
      // slider8: [''],
      // slider9: [''],
      // slider10: [''],
      image: ['', [Validators.required]],
      events: this._formBuilder.array([]),

    });
   
    id && this.rootService.getPackageDetailById(id).subscribe((res: any) => {
      this.data = res['response'];
      if (res.status == 200) {console.log("okk");
        this.createPackage = this.createPackageForm(res['response']);
        this.getSubCat(res['response'].package);

      } else {
        this.toastr.error("some error occured!");
      }
    });
  }

  getImg(img: any) {
    //.log(img);
    // let objectURL = 'data:image/jpeg;base64,' + img

    // return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
  addSightSeeing() {
    if (this.createPackage.controls['package_title'].value == "" && this.createPackage.controls['days'].value == "" && this.createPackage.controls['duration'].value == "") {
            this.toastr.error("please filled mandetory fields like package city, sightseeing, no. of days, durations!");
            var tt2: any = localStorage.getItem('setpack');
            var setpack = JSON.parse(tt2);
            //console.log(setpack);
            //  $('#packdata').val(JSON.stringify(setpack));
            var tt3: any = localStorage.getItem('setpacktitle')
            //  $('#packdatatitle').val(JSON.stringify(JSON.parse(tt3)));
            this.createPackage.controls['packdata']?.setValue(tt2)
      return;
    }
    
    const data = this.createPackage.getRawValue();
    console.log(data);
    let days = this.createPackage.controls['days']?.value;
    let package_title = this.createPackage.controls['package_title'].value;
    let duration = this.createPackage.controls['duration'].value;

    this.rootService.getSightSeeingAllData(package_title, 10000).subscribe((res: any) => {
      this.sigheSeeing = res['response'];
      let sigheSeeing = this.sigheSeeing;
      let pack: any = localStorage.getItem('setpacktitle');
      var setpack = JSON.parse(pack);

      if (localStorage.getItem("setpack") == null) {

        var xx = JSON.stringify(setpack);
        if (xx == "null") {
          console.log("second11")
          localStorage.setItem("setpack1", JSON.stringify(sigheSeeing));
          var setpack1 = JSON.parse(pack);
          var days1 = [{ 'data': setpack1, 'days': days, 'package_title': setpack.title, 'duration': duration }];
          localStorage.setItem('setpack', JSON.stringify(days1));
          //$('#packdata').val(JSON.stringify(JSON.parse(pack)));


          let dataNew: any = localStorage.getItem('setpacktitle');
          //   $('#packdatatitle').val(JSON.stringify(JSON.parse(dataNew)));
          this.createPackage.controls['packdata']?.setValue(pack)
          this.createPackage.controls['packdatatitle']?.setValue(dataNew)
          // });

        }
        else {
          console.log("first")
          var daysq = [{ 'data': setpack, 'days': days, 'package_title': setpack.title, 'duration': duration }];

          localStorage.setItem('setpack', JSON.stringify(daysq));
          let setPack: any = localStorage.getItem('setpack')
          //  $('#packdata').val(JSON.stringify(JSON.parse(setPack)));
          this.createPackage.controls['packdata']?.setValue(setPack);
        }
      }
      else {
        let pack: any = localStorage.getItem('setpacktitle');
        var setpack11 = JSON.parse(pack);
        if (localStorage.getItem("setpacktitle") != null) {
          var res1 = sigheSeeing;
          localStorage.setItem("setpack1", JSON.stringify(res1));
          var tt: any = localStorage.getItem('setpack1');
          var setpack = JSON.parse(tt);
          //console.log(setpack[0]);
          // localStorage.setItem("setpack",JSON.stringify(res1));


          var days11 = { 'data': setpack[0], 'days': days, 'package_title': setpack11.title, 'duration': duration };
          var tt1: any = localStorage.getItem('setpack');
          var setpack = JSON.parse(tt1);
          //   console.log(days1);
          //console.log(setpack);
          //var days=[{'data':setpack,'days':days}];
          setpack.push(days11);
          //console.log(setpack);
          localStorage.setItem('setpack', JSON.stringify(setpack));
          var tt2: any = localStorage.getItem('setpack');
          var setpack = JSON.parse(tt2);
          //console.log(setpack);
          //  $('#packdata').val(JSON.stringify(setpack));
          var tt3: any = localStorage.getItem('setpacktitle')
          //  $('#packdatatitle').val(JSON.stringify(JSON.parse(tt3)));
          this.createPackage.controls['packdata']?.setValue(tt2)
          this.createPackage.controls['packdatatitle']?.setValue(tt3)
        }



        else {
          let pack: any = localStorage.getItem('setpacktitle');
          var setpack11 = JSON.parse(pack);
          console.log("second22")
          let dd: any = localStorage.getItem('setpack');
          var days12 = { 'data': setpack, 'days': days, 'package_title': pack.title, 'duration': duration };
          var setpack = JSON.parse(dd);

          //var days=[{'data':setpack,'days':days}];
          setpack.push(days12);
          //  console.log(setpack);
          //  console.log(days1);
          let dd1: any = localStorage.getItem('setpack');
          localStorage.setItem('setpack', JSON.stringify(setpack));
          var setpack = JSON.parse(dd1);
          //console.log(setpack);
          //$('#packdata').val(JSON.stringify(setpack));
          this.createPackage.controls['packdata']?.setValue(JSON.stringify(JSON.parse(setpack)))

        }


        // $('#days').val("");
        // $('#package_city').val("");
        //  $('#package_title').val("");
        // $('#submit').attr('disabled',false)
        //var xx=setpack.push(days);
        //console.log(days);

      }
    });
   // this.createPackage.controls['package_city'].setValue(''); 
    this.createPackage.controls['package_title'].setValue(''); 
    this.createPackage.controls['days'].setValue('');
    this.createPackage.controls['duration'].setValue('');
  }

  clearSightseeing() {
    this.sightSeeingPopUp = false;
    localStorage.removeItem("setpack1");
    localStorage.removeItem("setpack");
    localStorage.removeItem("setpacktitle");
    window.location.reload();
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
    const file: File = event.target.files[0];console.log(file);
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
  selectFile4(event: any, i: any): void {
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
    console.log(data.events[0]);
    console.log(data.events[0].events);
    
    // data.event= data.events[].events!=""?data.event= data.events[].events:'';
    // data.event= data.events[].events!=""?data.event= data.events[].events:'';
    // data.event= data.events[].events!=""?data.event= data.events[].events:'';
    
    console.log(data);
    
   // return;
    //this.createPackage.get('pdf').setValue(this.currentFile);
    // data.pdf=formData
    const formData = new FormData();

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
    formData.append('image', this.selectedFilesImg, this.createPackage.controls['image']?.value);
    
    formData.append('from_city', this.createPackage.controls['from_city']?.value);
    formData.append('days', this.createPackage.controls['daynight']?.value);    
    formData.append('package_city', this.createPackage.controls['package_city']?.value);
    formData.append('title', this.createPackage.controls['package_title']?.value);
    // formData.append('days', this.createPackage.controls['days']?.value);    
    formData.append('type', this.createPackage.controls['type']?.value);   
    formData.append('stay', this.createPackage.controls['stay']?.value);
    formData.append('actual_price', this.createPackage.controls['actual_price']?.value);
    formData.append('current_price', this.createPackage.controls['current_price']?.value);
    formData.append('subtitle', this.createPackage.controls['addtitle']?.value);
    formData.append('person', this.createPackage.controls['perchange']?.value);
    formData.append('transfer', this.createPackage.controls['transfer']?.value);
    formData.append('events', this.createPackage.controls['events']?.value);

    formData.append('event_1', data.events[0]!=undefined? data.events[0].events:'');
    formData.append('event_2', data.events[1]!=undefined? data.events[1].events:'');
    formData.append('event_3', data.events[2]!=undefined? data.events[2].events:'');
    formData.append('event_4', data.events[3]!=undefined? data.events[3].events:'');
    formData.append('event_5', data.events[4]!=undefined? data.events[4].events:'');
    formData.append('event_6', data.events[5]!=undefined? data.events[5].events:'');
    formData.append('event_7', data.events[6]!=undefined? data.events[6].events:'');
    formData.append('event_8', data.events[7]!=undefined? data.events[7].events:'');
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
    
    
    this._packService.packageAdd(formData).subscribe((res: any) => {
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