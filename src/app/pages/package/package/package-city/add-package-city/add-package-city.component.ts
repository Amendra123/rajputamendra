import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PackageUtilityService } from '../../../package-utility.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RootPageService } from 'src/app/pages/root-page.service';

@Component({
  selector: 'app-add-package-city',
  templateUrl: './add-package-city.component.html',
  styleUrls: ['./add-package-city.component.scss'],
  providers: [PackageUtilityService]
})


export class AddPackageCityComponent {
  createPackage!:FormGroup;
  limit: number=100000;
 file:any="";
    name: string='';
  categoryOptions: any;
  subCategoryOptions: any;
  selectedFiles: any;
  currentFile: any;
  cityOptions: any;
 
constructor(private _formBuilder: FormBuilder, private route: Router,private toastr:ToastrService,
  private rootService:RootPageService,private _packService: PackageUtilityService){}
ngOnInit(){
 this.getCityData();
  this.createPackage=this.createPackageForm();
}

createPackageForm(){
  return this._formBuilder.group({
    from_city: ['', [Validators.required]],
    city_name: ['', [Validators.required]]   
  });
}
fileName = '';

selectFile(event:any): void {
  const file:File = event.target.files[0]; 
  this.selectedFiles=file;
  
  ///this.createPackage.controls['pdf']?.setValue(this.selectedFiles.name);
}
getCityData() {
  this.rootService.getCityAllData(this.name, this.limit).subscribe((res: any) => {
    this.cityOptions = res['response'];
    this.cityOptions.map((e: any) => {
      e.name = `${e.name} , ${e.state}`;
    });
  });
}
AddTags(){
 
 const data= this.createPackage.getRawValue();
 //this.createPackage.get('pdf').setValue(this.currentFile);
// data.pdf=formData
const formData = new FormData();

   
    formData.append('from_city', this.createPackage.controls['from_city']?.value);
    formData.append('city_name', this.createPackage.controls['city_name']?.value);
    formData.append('is_active', "1");

    console.log(formData);
   
  this._packService.addPackCity(data).subscribe((res:any)=>{
    if(res.status == 200){
      this.toastr.success("Addedd successfully");
     this.route.navigate(['/dashboard/package-city']);
    }else{
      this.toastr.error("some error occured!");     
    }
    
 });
}

}