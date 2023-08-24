import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RootPageService } from '../../root-page.service';
import { PackageUtilityService } from '../package-utility.service';

@Component({
  selector: 'app-edit-package',
  templateUrl: './edit-package.component.html',
  styleUrls: ['./edit-package.component.scss'],
  providers: [PackageUtilityService]
})

export class EditPackageComponent {
  createPackage!:FormGroup;
  limit: number=100000;
 file:any="";
    name: string='';
  categoryOptions: any;
  subCategoryOptions: any;
  selectedFiles: any;
  currentFile: any;
  dataLoaded:boolean =false;
  data: any;
 
constructor(private _formBuilder: FormBuilder, private route: Router,private toastr:ToastrService,
  private rootService:RootPageService,private _packService: PackageUtilityService,){}
ngOnInit(){
  console.log((this.route.url).split('/')[3])
  this.rootService.getCategoryAllData(this.name,this.limit).subscribe((res:any)=>{
    this.categoryOptions=res['response'];
   }); 
   const id=(this.route.url).split('/')[3];
   id && this.rootService.getPackageById(id).subscribe((res:any)=>{
    this.data=res['response'];
    if(res.status == 200){      
      this.createPackage=this.createPackageForm(res['response']);
      this.getSubCat(res['response'].package);

    }else{
      this.toastr.error("some error occured!");     
    }
   });
  //  this.rootService.getSubCategoryAllData(this.name,this.limit).subscribe((res:any)=>{
  //   this.subCategoryOptions=res['response'];
  //  });
 
}
getSubCat(val:string){
  this._packService.getSubCategoryByName(val).subscribe((res:any)=>{
    this.subCategoryOptions=res['response'];
    this.dataLoaded=true;
   }); 
}
createPackageForm(data:any){
  
  return this._formBuilder.group({
    subcategory: [data.subcategory || '', [Validators.required]],
    package: [data.package || '', [Validators.required]],
    month: [data.month || '', [Validators.required]],
    nop: [data.nop || '', [Validators.required]],
    message: [data.filename || '', [Validators.required]],
    pdf: [data.pdf || '', [Validators.required]],
    
  });
}
fileName = '';

selectFile(event:any): void {
  const file:File = event.target.files[0]; 
  this.selectedFiles=file;
  
  ///this.createPackage.controls['pdf']?.setValue(this.selectedFiles.name);
}
EditPackage(){
 
  
 const data= this.createPackage.getRawValue();
 //this.createPackage.get('pdf').setValue(this.currentFile);
// data.pdf=formData
const formData = new FormData();
console.log(this.createPackage.get('pdf')?.value,"jjjjj");
if(this.selectedFiles){
  this.currentFile = this.selectedFiles.name;
  formData.append('pdf', this.selectedFiles,this.createPackage.controls['pdf']?.value);
}else{
  formData.append('pdf', "");
}
    formData.append('package', this.createPackage.controls['package']?.value);
    formData.append('subcategory', this.createPackage.controls['subcategory']?.value);
    formData.append('month', this.createPackage.controls['month']?.value);
    formData.append('nop', this.createPackage.controls['nop']?.value);
    formData.append('msg', this.createPackage.controls['message']?.value);
    console.log(formData);
    data.pdf=formData
    const id=(this.route.url).split('/')[3];
    id && this._packService.updatePackage(formData,id).subscribe((res:any)=>{console.log(res.status);
    if(res.status == 200){
      this.toastr.success("Updated successfully");
     this.route.navigate(['/dashboard/package-details']);
    }else{
      this.toastr.error("some error occured!");     
    }
    
  });
}

}