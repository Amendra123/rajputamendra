import { Component, ElementRef, ViewChild } from '@angular/core';
import { RootPageService } from '../../root-page.service';
import { PackageUtilityService } from '../package-utility.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.scss'],
  providers: [PackageUtilityService]
})
export class AddPackageComponent {
  createPackage!:FormGroup;
  limit: number=100000;
 file:any="";
    name: string='';
  categoryOptions: any;
  subCategoryOptions: any;
  selectedFiles: any;
  currentFile: any;
 
constructor(private _formBuilder: FormBuilder, private route: Router,private toastr:ToastrService,
  private rootService:RootPageService,private _packService: PackageUtilityService,){}
ngOnInit(){
  this.rootService.getCategoryAllData(this.name,this.limit).subscribe((res:any)=>{
    this.categoryOptions=res['response'];
   }); 
  //  this.rootService.getSubCategoryAllData(this.name,this.limit).subscribe((res:any)=>{
  //   this.subCategoryOptions=res['response'];
  //  });
  this.createPackage=this.createPackageForm();
}
getSubCat(val:string){
  this._packService.getSubCategoryByName(val).subscribe((res:any)=>{
    this.subCategoryOptions=res['response'];
   }); 
}
createPackageForm(){
  return this._formBuilder.group({
    subcategory: ['', [Validators.required]],
    package: ['', [Validators.required]],
    month: ['', [Validators.required]],
    nop: ['', [Validators.required]],
    message: ['', [Validators.required]],
    pdf: ['', [Validators.required]],
  });
}
fileName = '';

selectFile(event:any): void {
  const file:File = event.target.files[0]; 
  this.selectedFiles=file;
  
  ///this.createPackage.controls['pdf']?.setValue(this.selectedFiles.name);
}
AddPackage(){
  this.currentFile = this.selectedFiles.name;
 const data= this.createPackage.getRawValue();
 //this.createPackage.get('pdf').setValue(this.currentFile);
// data.pdf=formData
const formData = new FormData();
console.log(this.createPackage.get('pdf')?.value);
    formData.append('pdf', this.selectedFiles,this.createPackage.controls['pdf']?.value);
    formData.append('package', this.createPackage.controls['package']?.value);
    formData.append('subcategory', this.createPackage.controls['subcategory']?.value);
    formData.append('month', this.createPackage.controls['month']?.value);
    formData.append('nop', this.createPackage.controls['nop']?.value);

    console.log(formData);
    data.pdf=formData
  this._packService.addPackage(formData,data).subscribe((res:any)=>{console.log(res.status);
    if(res.status == 200){
      this.toastr.success("Addedd successfully");
     this.route.navigate(['/dashboard/package-details']);
    }else{
      this.toastr.error("some error occured!");     
    }
    
  });
}

}
