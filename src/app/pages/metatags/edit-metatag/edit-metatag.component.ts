import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PackageUtilityService } from '../../package/package-utility.service';
import { RootPageService } from '../../root-page.service';
import { MetatagUtilityService } from '../metatag-utility.service';

@Component({
  selector: 'app-edit-metatag',
  templateUrl: './edit-metatag.component.html',
  styleUrls: ['./edit-metatag.component.scss'],
  providers: [PackageUtilityService ,MetatagUtilityService ]
})
export class EditMetatagComponent {
  createPackage!:FormGroup;
  limit: number=100000;
 file:any="";
    name: string='';
  categoryOptions: any;
  subCategoryOptions: any;
  selectedFiles: any;
  currentFile: any;
  dataLoaded: boolean=false;
constructor(private _formBuilder: FormBuilder, private route: Router,private toastr:ToastrService,
  private rootService:RootPageService,private _packService: PackageUtilityService,private _tagService: MetatagUtilityService,){}
ngOnInit(){
 const id: any= (this.route.url).split('/')[3];console.log(id);
id && this._tagService.getTagById(id).subscribe((res:any)=>{console.log(res['response']);
  this.getSubCat(res['response'].category);
  this.createPackage=this.createPackageForm(res['response']);
 }); 
  this.rootService.getCategoryAllData(this.name,this.limit).subscribe((res:any)=>{
    this.categoryOptions=res['response'];
   }); 
  //  this.rootService.getSubCategoryAllData(this.name,this.limit).subscribe((res:any)=>{
  //   this.subCategoryOptions=res['response'];
  //  });
  
}
getSubCat(val:string){
  this._packService.getSubCategoryByName(val).subscribe((res:any)=>{
    this.subCategoryOptions=res['response'];
   }); 
}
createPackageForm(data:any){
  this.dataLoaded=true;
  return this._formBuilder.group({
    subcategory: [data.subcategory || '', [Validators.required]],
    category: [data.category || '', [Validators.required]],    
    meta_description: [data.meta_description || '', [Validators.required]],
    meta_title: [data.meta_title || '', [Validators.required]],
    image: [data.image || '', [Validators.required]],
  });
}
fileName = '';

selectFile(event:any): void {
  const file:File = event.target.files[0]; 
  this.selectedFiles=file;
  
  ///this.createPackage.controls['pdf']?.setValue(this.selectedFiles.name);
}
editTags(){
 
 const data= this.createPackage.getRawValue();
 //this.createPackage.get('pdf').setValue(this.currentFile);
// data.pdf=formData
const formData = new FormData();
if(this.selectedFiles){
  this.currentFile = this.selectedFiles.name;
  formData.append('image', this.selectedFiles,this.createPackage.controls['image']?.value);
}else{
  formData.append('image', "");
}
    
    formData.append('category', this.createPackage.controls['category']?.value);
    formData.append('subcategory', this.createPackage.controls['subcategory']?.value);
    formData.append('meta_title', this.createPackage.controls['meta_title']?.value);
    formData.append('meta_description', this.createPackage.controls['meta_description']?.value);

    console.log(formData);
    data.pdf=formData
    const id: any= (this.route.url).split('/')[3];console.log(id);
    id && this._tagService.updateTag(id,formData).subscribe((res:any)=>{console.log(res.status);
    if(res.status == 200){
      this.toastr.success("Addedd successfully");
     this.route.navigate(['/dashboard/metaTags']);
    }else{
      this.toastr.error("some error occured!");     
    }
    
  });
}

}