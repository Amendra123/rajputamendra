import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  selector: 'app-edit-package-details',
  templateUrl: './edit-package-details.component.html',
  styleUrls: ['./edit-package-details.component.scss'],
  providers: [PackageUtilityService]
})

export class EditPackageDetailsComponent {
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
  selectedHotelImg: any;
  package_city: any=[];
  event1:boolean =true;
  event2:boolean =true;
  event3:boolean =true;
  event4:boolean =true;
  event5:boolean =true;
  event6:boolean =true;
  event7:boolean =true;
  event8:boolean =true;
  event9:boolean =true;
  event10:boolean =true;
  activity1:boolean =true;
  activity2:boolean =true;
  activity3:boolean =true;
  activity4:boolean =true;
  activity5:boolean =true;
  activity6:boolean =true;
  activity7:boolean =true;
  activity8:boolean =true;
  activity9:boolean =true;
  activity10:boolean =true;
  
  selectedActivityImg1: any;
  selectedActivityImg2: any;
  selectedActivityImg3: any;
  selectedActivityImg4: any;
  selectedActivityImg5: any;
  selectedActivityImg6: any;
  
  selectedActivityImg7: any;
  selectedActivityImg8: any;
  selectedActivityImg9: any;
  
  selectedActivityImg10: any;
  sightSeeing: any;
  



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
     // console.log(this.sightSeeingOptions);
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
  createPackageForm(data: any,city:any) {
console.log(data.event2);
if(data.event1!="" && data.event1!=null){
  this.event1=false
}
if(data.event2!=""  && data.event2!=null){
  this.event2=false
}
if(data.event3!=""  && data.event3!=null){
  this.event3=false
}
if(data.event4!=""  && data.event4!=null){
  this.event4=false
}
if(data.event5!=""  && data.event5!=null){
  this.event5=false
}
if(data.event6!=""  && data.event6!=null){
  this.event6=false
}
if(data.event7!=""  && data.event7!=null){
  this.event7=false
}
if(data.event8!=""  && data.event8!=null){
  this.event8=false
}
if(data.event9!=""  && data.event9!=null){
  this.event9=false
}
if(data.event10!=""  && data.event10!=null){
  this.event10=false
}

if(data.activity1!=""  && data.activity1!=null){
  this.activity1=false
}

if(data.activity2!=""  && data.activity2!=null){
  this.activity2=false
}
if(data.activity3!=""  && data.activity3!=null){
  this.activity3=false
}
if(data.activity4!=""  && data.activity4!=null){
  this.activity4=false
}
if(data.activity5!=""  && data.activity5!=null){
  this.activity5=false
}
if(data.activity6!=""  && data.activity6!=null){
  this.activity6=false
}
if(data.activity7!=""  && data.activity7!=null){
  this.activity7=false
}
if(data.activity8!=""  && data.activity8!=null){
  this.activity8=false
}
if(data.activity9!=""  && data.activity9!=null){
  this.activity9=false
}
if(data.activity10!=""  && data.activity10!=null){
  this.activity10=false
}
    return this._formBuilder.group({
      from_city: [data.from_city || '', [Validators.required]],
      package_city: [data.p_id || '', [Validators.required]],
      package_title: [data.package_title || '', [Validators.required]],
      days: [data.days || '', [Validators.required]],
      duration: [data.duration || '', [Validators.required]],
      type: [data.type || '', [Validators.required]],
      sightseeing: [data.day_tour || '', [Validators.required]],
      inclusion: [data.inclusion || '', [Validators.required]],
      exclusion: [data.exclusion || '', [Validators.required]],
      day_tour: [data.day_tour || ''],
      vechcategory: [data.vechcategory || '', [Validators.required]],
      vechmodel: [data.vechmodel || '', [Validators.required]],
      facility: [data.facility || '', [Validators.required]],
      vedio: [data.vedio || ''],
      stay: [data.stay || '', [Validators.required]],
      daynight: [data.daynight || '', [Validators.required]],
      actual_price: [data.actual_price || '', [Validators.required]],
      current_price: [data.current_price || '', [Validators.required]],
      addtitle: [data.addtitle || '', [Validators.required]],
      perchange: [data.perchange || '', [Validators.required]],
      hotel_title: [data.hotel_title || '', [Validators.required]],
      hotel_include: [data.hotel_include || '', [Validators.required]],
      hotel_type: [data.hotel_type || '', [Validators.required]],
      name: [data.name || ''],
      email: [data.email || ''],
      mobile: [data.mobile || ''],
      packid:[data.id || ''],
      hoteld:[data.hoteld || ''],
      special_descr:[data.special_descr || ""],
      slider: [''],
      slider1: [''],
      slider2: [''],
      slider3: [''],
      event1:[data.event1 || ''],
      event2:[data.event2 || ''],
      event3:[data.event3 || ''],
      event4:[data.event4 || ''],
      event5:[data.event5 || ''],
      event6:[data.event6 || ''],
      event7:[data.event7 || ''],
      event8:[data.event8 || ''],
      event9:[data.event9 || ''],
      event10:[data.event10 || ''],
      activity1:[''],
      activity2:[''],
      activity3:[''],
      activity4:[''],
      activity5:[''],
      activity6:[''],
      activity7:[''],
      activity8:[''],
      activity9:[''],
      activity10:[''],

      // slider4: [''],
      // slider5: [''],
      // slider6: [''],
      // slider7: [''],
      // slider8: [''],
      // slider9: [''],
      // slider10: [''],
      image: [''],
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

    $(document).ready(function () {
      var maxField = 10; //Input fields increment limitation
      var maxField1 = 10; //Input fields increment limitation
      var maxField2 = 10; //Input fields increment limitation


      var addButton = $('.add_button'); //Add button selector
      var addButton1 = $('.add_button1'); //Add button selector
      var addButton2 = $('.add_button2'); //Add button selector

      var wrapper = $('#wraped'); //Input field wrapper
      var wrapper1 = $('#wraped1'); //Input field wrapper
      var wrapper2 = $('#wraped2'); //Input field wrapper



      var x = 1;
      var x1 = 1;
      var x2 = 1;


      var counter = 0;
      var counter1 = 0;
      var counter2 = 0;



      //Once add button is clicked
      $(addButton).click(function () {

        counter++;
        //Check maximum number of input fields
        if (x <= maxField) {
          x++; //Increment field counter
          var dd = ``;
          dd += ``;
          dd += `
            <div class="col-md-4" style="margin-bottom:5px;" id="remove_button${counter}">
										<label>Slider Image${counter}: <a href="javascript:void(0);" class="remove_button" (click)="cancel(${counter})"><img src="http://demos.codexworld.com/add-remove-input-fields-dynamically-using-jquery/images/remove-icon.png"/ style="width:15px;margin-left: 30px;"> 
                    </a></label>
                                                                            
									<input type="file"  name="slider${counter}" formControlName="slider${counter}" (change)="selectFile${counter}($event,${counter})" class="form-control"  placeholder="Enter Events">
									</div>`;
          var fieldHTML = dd; //New input field html

          
          //Initial field counter is 1
          var idd = $("#images" + counter).val();
          if (idd == undefined) {
            $(wrapper).append(fieldHTML); //Add field html
          }


        } else {

          alert("you have upload only 10 events");
        }
      });

      //Once remove button is clicked
      $(wrapper).on('click', '.remove_button', function (e) {


        e.preventDefault();
        $('#remove_button' + counter).remove();
        // $(this).parent('div').remove(); //Remove field html
        counter--;
        x--; //Decrement field counter
        console.log(counter);
      });
      //Once add button is clicked
      $(addButton2).click(function () {

        counter2++;
        //Check maximum number of input fields
        if (x2 <= maxField2) {
          x2++; //Increment field counter
          var dd = ``;
          dd += ``;
          dd += `
            <div class="col-md-4" >
										<label>Activity Image: <a href="javascript:void(0);" class="remove_button"><img src="http://demos.codexworld.com/add-remove-input-fields-dynamically-using-jquery/images/remove-icon.png"/ style="width:15px;margin-left: 30px;"> 
                    </a></label>
                                                                            
									<input type="file"  name="activity${counter2}"  class="form-control"  placeholder="Enter Events">
									</div><br/>`;



          var fieldHTML = dd; //New input field html


          //Initial field counter is 1
          var idd = $("#activity" + counter).val();
          if (idd == undefined) {
            $(wrapper2).append(fieldHTML); //Add field html
          }


        } else {

          alert("you have upload only 10 events");
        }
      });

      //Once remove button is clicked
      $(wrapper2).on('click', '.remove_button', function (e) {


        e.preventDefault();
        $(this).parent('div').remove(); //Remove field html
        counter2--;
        x2--; //Decrement field counter
        console.log(counter);
      });
      //Once add button is clicked
      $(addButton1).click(function () {

        counter1++;
        //Check maximum number of input fields
        if (x1 <= maxField1) {
          x1++; //Increment field counter
          var dd = ``;
          dd += ``;
          dd += `
            <div class="col-md-4" >
										<label>Event Name: <a href="javascript:void(0);" class="remove_button"><img src="http://demos.codexworld.com/add-remove-input-fields-dynamically-using-jquery/images/remove-icon.png"/ style="width:15px;margin-left: 30px;"> 
                    </a></label>
                                                                            
									<input type="text"  name="event${counter1}"  class="form-control" placeholder="Enter Events">
									</div><br/>`;



          var fieldHTML = dd; //New input field html


          //Initial field counter is 1
          var idd = $("#event" + counter).val();
          if (idd == undefined) {
            $(wrapper1).append(fieldHTML); //Add field html
          }


        } else {

          alert("you have upload only 10 events");
        }
      });

      //Once remove button is clicked
      $(wrapper1).on('click', '.remove_button', function (e) {


        e.preventDefault();
        $(this).parent('div').remove(); //Remove field html
        counter1--;
        x1--; //Decrement field counter
        console.log(counter1);
      });

    });
    // this.createPackage = this.createPackageForm(this.dataForm);


    let data: any = this.data;
    console.log(data,"ttt");
    
    this.createPackage = this._formBuilder.group({
      from_city: [data.from_city || '', [Validators.required]],
      package_city: [data.p_id || '', [Validators.required]],
      package_title: [data.package_title || ''],
      days: [data.days || ''],
      duration: [data.duration || ''],
      type: [data.type || '', [Validators.required]],
      sightseeing: [data.day_tour || '', [Validators.required]],
      inclusion: [data.inclusion || '', [Validators.required]],
      exclusion: [data.exclusion || '', [Validators.required]],
      day_tour: [data.day_tour || '',[Validators.required]],
      vechcategory: [data.vechcategory || '', [Validators.required]],
      vechmodel: [data.vechmodel || '', [Validators.required]],
      facility: [data.facility || '', [Validators.required]],
      vedio: [data.vedio || ''],
      stay: [data.stay || '', [Validators.required]],
      daynight: [data.daynight || '', [Validators.required]],
      actual_price: [data.actual_price || '', [Validators.required]],
      current_price: [data.current_price || '', [Validators.required]],
      addtitle: [data.addtitle || '', [Validators.required]],
      perchange: [data.perchange || '', [Validators.required]],
      name: [data.name || ''],
      hotel_title: [data.hotel_title || '', [Validators.required]],
      hotel_include: [data.hotel_include || '', [Validators.required]],
      hotel_type: [data.hotel_type || '', [Validators.required]],
      hotel_image: [''],
      hoteld:[data.hoteld || ''],
      packid:[data.id || ''],
      email: [data.email || ''],
      mobile: [data.mobile || ''],
      special_descr:[data.special_descr || ""],
      packdata: [''],
      packdatatitle: [''],
      slider: [''],
      slider1: [''],
      slider2: [''],
      slider3: [''],
      event1:[data.event1 || ''],
      event2:[data.event2 || ''],
      event3:[data.event3 || ''],
      event4:[data.event4 || ''],
      event5:[data.event5 || ''],
      event6:[data.event6 || ''],
      event7:[data.event7 || ''],
      event8:[data.event8 || ''],
      event9:[data.event9 || ''],
      event10:[data.event10 || ''],
      activity1:[''],
      activity2:[''],
      activity3:[''],
      activity4:[''],
      activity5:[''],
      activity6:[''],
      activity7:[''],
      activity8:[''],
      activity9:[''],
      activity10:[''],
      // slider4: [''],
      // slider5: [''],
      // slider6: [''],
      // slider7: [''],
      // slider8: [''],
      // slider9: [''],
      // slider10: [''],      
      image: [''],

    });
    console.log("okk11",id);
    id && this.rootService.getPackageDetailById(id).subscribe(async (res: any) => {
      this.data = res['response'];
      if (res.status == 200) {
        console.log(res['response'],"yyy");
        this.package_city=  this.getPackName(res['response'],res['response'].p_id);
        console.log(res['response'].p_id);
         this.showEditData=true;
        
        
       // this.getSubCat(res['response'].package);

      } else {
        this.showEditData=false;
        this.toastr.error("some error occured!");
      }
    });
  }
  showEditData:boolean=false;
   getPackName(data:any,id:any){
    this.rootService.getPackageCityByIdAllData(id, this.limit).subscribe((res: any) => {
    this.createPackage =  this.createPackageForm(data,res['response'][0]['city_name']);
   // return  res['response'][0]['city_name'];
    });
  }
  delActivity(id:any,type:any){
    this.rootService.getPackageCityByIdAllData(id, this.limit).subscribe((res: any) => {
   
    });
  }
  delEventImg(id:any,type:any){
    this.rootService.getPackageCityByIdAllData(id, this.limit).subscribe((res: any) => {
    
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
      let pack: any = localStorage.getItem('setpack1');
      var setpack = JSON.parse(pack);

      if (localStorage.getItem("setpack") == null) {

        var xx = JSON.stringify(setpack);
        if (xx == null) {
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
  selectFileImg(event: any): void {console.log("kkkk11");
    const file: File = event.target.files[0];
    this.selectedFilesImg = file;
   
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
      this.sightSeeing= val;
      let data =val;
      data.event1!="" && data.event1!=null?this.event1=false:this.event1=true;
      data.event2!=""  && data.event2!=null?this.event2=false:this.event2=true;
      data.event3!=""  && data.event3!=null?this.event3=false:this.event3=true;
      data.event4!=""  && data.event4!=null?this.event4=false:this.event4=true;
      data.event5!=""  && data.event5!=null?this.event5=false:this.event5=true;
      data.event6!=""  && data.event6!=null?this.event6=false:this.event6=true;
      data.event7!=""  && data.event7!=null?this.event7=false:this.event7=true;
      data.event8!=""  && data.event8!=null?this.event8=false:this.event8=true;
      data.event9!=""  && data.event9!=null?this.event9=false:this.event9=true;
      data.event10!=""  && data.event10!=null?this.event10=false:this.event10=true;
      
      if(data.activity1!=""  && data.activity1!=null){
        this.activity1=false;
      }
      
      if(data.activity2!=""  && data.activity2!=null){
        this.activity2=false;
      }
      if(data.activity3!=""  && data.activity3!=null){
        this.activity3=false;
      }
      if(data.activity4!=""  && data.activity4!=null){
        this.activity4=false;
      }
      if(data.activity5!=""  && data.activity5!=null){
        this.activity5=false;
      }
      if(data.activity6!=""  && data.activity6!=null){
        this.activity6=false;
      }
      if(data.activity7!=""  && data.activity7!=null){
        this.activity7=false;
      }
      if(data.activity8!=""  && data.activity8!=null){
        this.activity8=false;
      }
      if(data.activity9!=""  && data.activity9!=null){
        this.activity9=false;
      }
      if(data.activity10!=""  && data.activity10!=null){
        this.activity10=false;
      }
      this.createPackage.controls['day_tour']?.setValue(val.title);
      
      val.event1!="" && val.event1!= null && val.event1!=undefined?this.createPackage.controls['event1']?.setValue(val.event1):this.createPackage.controls['event1']?.setValue("");
      val.event2!="" && val.event2!= null && val.event2!=undefined?this.createPackage.controls['event2']?.setValue(val.event2):this.createPackage.controls['event2']?.setValue("");
      val.event3!="" && val.event3!= null && val.event3!=undefined?this.createPackage.controls['event3']?.setValue(val.event3):this.createPackage.controls['event3']?.setValue("");
      val.event4!="" && val.event4!= null && val.event4!=undefined?this.createPackage.controls['event4']?.setValue(val.event4):this.createPackage.controls['event4']?.setValue("");
      val.event5!="" && val.event5!= null && val.event5!=undefined?this.createPackage.controls['event5']?.setValue(val.event5):this.createPackage.controls['event5']?.setValue("");
      val.event6!="" && val.event6!= null && val.event6!=undefined?this.createPackage.controls['event6']?.setValue(val.event6):this.createPackage.controls['event6']?.setValue("");
      val.event7!="" && val.event7!= null && val.event7!=undefined?this.createPackage.controls['event7']?.setValue(val.event7):this.createPackage.controls['event7']?.setValue("");
      val.event8!="" && val.event8!= null && val.event8!=undefined?this.createPackage.controls['event8']?.setValue(val.event8):this.createPackage.controls['event8']?.setValue("");
      val.event9!="" && val.event9!= null && val.event9!=undefined?this.createPackage.controls['event9']?.setValue(val.event9):this.createPackage.controls['event9']?.setValue("");
      val.event10!="" && val.event10!= null && val.event10!=undefined?this.createPackage.controls['event10']?.setValue(val.event10):this.createPackage.controls['event10']?.setValue("");
      this.createPackage.controls['package_city']?.setValue("");
      localStorage.setItem("setpacktitle", JSON.stringify(val));
    }
  }
  selectHotelImg(event: any): void {
    const file: File = event.target.files[0];
    this.selectedHotelImg = file;
  }
  selectActImg1(event: any): void {
    const file: File = event.target.files[0];
    this.selectedActivityImg1 = file;
  }
  selectActImg2(event: any): void {
    const file: File = event.target.files[0];
    this.selectedActivityImg2 = file;
  }
  selectActImg3(event: any): void {
    const file: File = event.target.files[0];
    this.selectedActivityImg3 = file;
  }
  selectActImg4(event: any): void {
    const file: File = event.target.files[0];
    this.selectedActivityImg4 = file;
  }
  selectActImg5(event: any): void {
    const file: File = event.target.files[0];
    this.selectedActivityImg5 = file;
  }
  selectActImg6(event: any): void {
    const file: File = event.target.files[0];
    this.selectedActivityImg6 = file;
  }
  selectActImg7(event: any): void {
    const file: File = event.target.files[0];
    this.selectedActivityImg7 = file;
  }
  selectActImg8(event: any): void {
    const file: File = event.target.files[0];
    this.selectedActivityImg8 = file;
  }
  
  selectActImg9(event: any): void {
    const file: File = event.target.files[0];
    this.selectedActivityImg9 = file;
  }
  selectActImg(event: any): void {
    const file: File = event.target.files[0];
    this.selectedActivityImg9 = file;
  }
  selectActImg10(event: any): void {
    const file: File = event.target.files[0];
    this.selectedActivityImg10 = file;
  }

  addPackage() {


    const data = this.createPackage.getRawValue();
   // console.log(this.createPackage.controls['packdata']?.value);
    //this.createPackage.get('pdf').setValue(this.currentFile);
    // data.pdf=formData
    const formData = new FormData();
    if(this.selectedFiles!= undefined){
      formData.append('slider', this.selectedFiles,   this.createPackage.controls['slider']?.value);
    }  
    if(this.selectedFiles1!= undefined){
      formData.append('slider1', this.selectedFiles1, this.createPackage.controls['slider1']?.value);
    }
    if(this.selectedFiles2!= undefined){
      formData.append('slider2', this.selectedFiles2, this.createPackage.controls['slider2']?.value);
    }
    if(this.selectedFiles3!= undefined){
      formData.append('slider3', this.selectedFiles3, this.createPackage.controls['slider3']?.value);
    }
    if(this.selectedFilesImg!= undefined){
      formData.append('image', this.selectedFilesImg, this.createPackage.controls['image']?.value);
    }
    if(this.selectedHotelImg!= undefined){
      formData.append('hotel_image', this.selectedHotelImg, this.createPackage.controls['hotel_image']?.value);
    }
    if(this.selectedActivityImg1!= undefined){
      formData.append('activity1', this.selectedActivityImg1, this.createPackage.controls['activity1']?.value);
    } else if(this.sightSeeing && this.sightSeeing?.activity1!="" && this.sightSeeing.activity1!=null && this.sightSeeing.activity1!= undefined){
      formData.append('activity1', this.sightSeeing.activity1!="" && this.sightSeeing.activity1!=null && this.sightSeeing.activity1!= undefined?this.sightSeeing.activity1:"");
    } 
    if(this.selectedActivityImg2!= undefined){
      formData.append('activity2', this.selectedActivityImg2, this.createPackage.controls['activity2']?.value);
    }else if(this.sightSeeing && this.sightSeeing?.activity2!="" && this.sightSeeing.activity2!=null && this.sightSeeing.activity2!= undefined){
      formData.append('activity2', this.sightSeeing.activity2!="" && this.sightSeeing.activity2!=null && this.sightSeeing.activity2!= undefined?this.sightSeeing.activity2:"");
    } 
    if(this.selectedActivityImg3!= undefined){
      formData.append('activity3', this.selectedActivityImg3, this.createPackage.controls['activity3']?.value);
    }else if(this.sightSeeing && this.sightSeeing?.activity3!="" && this.sightSeeing.activity3!=null && this.sightSeeing.activity3!= undefined){
      formData.append('activity3', this.sightSeeing.activity3!="" && this.sightSeeing.activity3!=null && this.sightSeeing.activity3!= undefined?this.sightSeeing.activity3:"");
    } 
    if(this.selectedActivityImg4!= undefined){
      formData.append('activity4', this.selectedActivityImg4, this.createPackage.controls['activity4']?.value);
    }else if(this.sightSeeing && this.sightSeeing?.activity4!="" && this.sightSeeing.activity4!=null && this.sightSeeing.activity4!= undefined){
      formData.append('activity4', this.sightSeeing.activity4!="" && this.sightSeeing.activity4!=null && this.sightSeeing.activity4!= undefined?this.sightSeeing.activity4:"");
    } 
    if(this.selectedActivityImg5!= undefined){
      formData.append('activity5', this.selectedActivityImg5, this.createPackage.controls['activity5']?.value);
    }else if(this.sightSeeing && this.sightSeeing?.activity5!="" && this.sightSeeing.activity5!=null && this.sightSeeing.activity5!= undefined){
      formData.append('activity5', this.sightSeeing.activity5!="" && this.sightSeeing.activity5!=null && this.sightSeeing.activity5!= undefined?this.sightSeeing.activity5:"");
    } 
    if(this.selectedActivityImg6!= undefined){
      formData.append('activity6', this.selectedActivityImg6, this.createPackage.controls['activity6']?.value);
    }else if(this.sightSeeing && this.sightSeeing?.activity6!="" && this.sightSeeing.activity6!=null && this.sightSeeing.activity6!= undefined){
      formData.append('activity6', this.sightSeeing.activity6!="" && this.sightSeeing.activity6!=null && this.sightSeeing.activity6!= undefined?this.sightSeeing.activity6:"");
    } 
    if(this.selectedActivityImg7!= undefined){
      formData.append('activity7', this.selectedActivityImg7, this.createPackage.controls['activity7']?.value);
    }else if(this.sightSeeing && this.sightSeeing?.activity7!="" && this.sightSeeing.activity7!=null && this.sightSeeing.activity7!= undefined){
      formData.append('activity7', this.sightSeeing.activity7!="" && this.sightSeeing.activity7!=null && this.sightSeeing.activity7!= undefined?this.sightSeeing.activity7:"");
    } 
    if(this.selectedActivityImg8!= undefined){
      formData.append('activity8', this.selectedActivityImg8, this.createPackage.controls['activity8']?.value);
    }else if(this.sightSeeing && this.sightSeeing?.activity8!="" && this.sightSeeing.activity8!=null && this.sightSeeing.activity8!= undefined){
      formData.append('activity8', this.sightSeeing.activity8!="" && this.sightSeeing.activity8!=null && this.sightSeeing.activity8!= undefined?this.sightSeeing.activity8:"");
    } 
    if(this.selectedActivityImg9!= undefined){
      formData.append('activity9', this.selectedActivityImg9, this.createPackage.controls['activity9']?.value);
    }else if(this.sightSeeing && this.sightSeeing?.activity9!="" && this.sightSeeing.activity9!=null && this.sightSeeing.activity9!= undefined){
      formData.append('activity9', this.sightSeeing.activity9!="" && this.sightSeeing.activity9!=null && this.sightSeeing.activity9!= undefined?this.sightSeeing.activity9:"");
    } 
    if(this.selectedActivityImg10!= undefined){
      formData.append('activity10', this.selectedActivityImg10, this.createPackage.controls['activity10']?.value);
    }else if(this.sightSeeing && this.sightSeeing?.activity10!="" && this.sightSeeing.activity10!=null && this.sightSeeing.activity10!= undefined){
      formData.append('activity10', this.sightSeeing.activity10!="" && this.sightSeeing.activity10!=null && this.sightSeeing.activity10!= undefined?this.sightSeeing.activity10:"");
    } 

    //console.log(formData);
    //return;
    // formData.append('slider2', this.selectedFiles2, this.createPackage.controls['slider2']?.value);
    // formData.append('slider3', this.selectedFiles3, this.createPackage.controls['slider3']?.value);
    // formData.append('slider4', this.selectedFiles4, this.createPackage.controls['slider4']?.value);
    // formData.append('slider5', this.selectedFiles5, this.createPackage.controls['slider5']?.value);
    // formData.append('slider6', this.selectedFiles6, this.createPackage.controls['slider6']?.value);
    // formData.append('slider7', this.selectedFiles7, this.createPackage.controls['slider7']?.value);
    // formData.append('slider8', this.selectedFiles8, this.createPackage.controls['slider8']?.value);
    // formData.append('slider9', this.selectedFiles9, this.createPackage.controls['slider9']?.value);
     formData.append('day_activity', this.createPackage.controls['day_tour']?.value);
   // formData.append('image', this.selectedFilesImg, this.createPackage.controls['image']?.value);
    formData.append('vedio', this.createPackage.controls['vedio']?.value);
    formData.append('from_city', this.createPackage.controls['from_city']?.value);
    formData.append('daynight', this.createPackage.controls['daynight']?.value);
    
    formData.append('package_city', this.createPackage.controls['package_city']?.value);
    formData.append('package_title', this.createPackage.controls['package_title']?.value);
    formData.append('days', this.createPackage.controls['days']?.value);
    formData.append('duration', this.createPackage.controls['duration']?.value);
    formData.append('type', this.createPackage.controls['type']?.value);
    formData.append('p_title', this.createPackage.controls['package_city']?.value);
    formData.append('inclusion', this.createPackage.controls['inclusion']?.value);
    formData.append('exclusion', this.createPackage.controls['exclusion']?.value);
    formData.append('day_tour', this.createPackage.controls['day_tour']?.value);
    formData.append('vechcategory', this.createPackage.controls['vechcategory']?.value);
    formData.append('vechmodel', this.createPackage.controls['vechmodel']?.value);
    formData.append('facility', this.createPackage.controls['facility']?.value);
    formData.append('stay', this.createPackage.controls['stay']?.value);
    formData.append('hoteld', this.createPackage.controls['hoteld']?.value);
    formData.append('hotel_title', this.createPackage.controls['hotel_title']?.value);
    formData.append('hotel_include', this.createPackage.controls['hotel_include']?.value);
    formData.append('hotel_type', this.createPackage.controls['hotel_type']?.value);
    
    formData.append('actual_price', this.createPackage.controls['actual_price']?.value);
    formData.append('current_price', this.createPackage.controls['current_price']?.value);
    formData.append('addtitle', this.createPackage.controls['addtitle']?.value);
    formData.append('perchange', this.createPackage.controls['perchange']?.value);
    formData.append('name', this.createPackage.controls['name']?.value);
    formData.append('email', this.createPackage.controls['email']?.value);
    formData.append('mobile', this.createPackage.controls['mobile']?.value);
    formData.append('packdata', this.createPackage.controls['packdata']?.value);
    formData.append('packdatatitle', this.createPackage.controls['packdatatitle']?.value);

    formData.append('event1', this.createPackage.controls['event1']?.value);
    formData.append('event2', this.createPackage.controls['event2']?.value);
    formData.append('event3', this.createPackage.controls['event3']?.value);
    formData.append('event4', this.createPackage.controls['event4']?.value);
    formData.append('event5', this.createPackage.controls['event5']?.value);
    formData.append('event6', this.createPackage.controls['event6']?.value);
    formData.append('event7', this.createPackage.controls['event7']?.value);
    formData.append('event8', this.createPackage.controls['event8']?.value);
    formData.append('event9', this.createPackage.controls['event9']?.value);
    formData.append('event10', this.createPackage.controls['event10']?.value);
    formData.append('special_descr', this.createPackage.controls['special_descr']?.value);

    //console.log(this.createPackage.controls['special_descr']?.value); return;
    data.pdf = formData
    //return;
    this._packService.updatePackageDetail(formData,this.createPackage.controls['packid']?.value).subscribe((res: any) => {
     /// console.log(res.status);return;
      if (res.status == 200) {
        this.toastr.success("Updated successfully");
        this.route.navigate(['/dashboard/package-list']);
      } else {
        this.toastr.error("some error occured!");
      }

    });
  }

}