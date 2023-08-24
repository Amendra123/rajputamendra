import { Component } from '@angular/core';
import { RootPageService } from '../../root-page.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PackageUtilityService } from '../package-utility.service';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.scss'],
  providers: [PackageUtilityService]
})

export class AddSubcategoryComponent {
  subcategoryForm!: FormGroup;
  singleAttr = [];
  singlecategory=[];
  categoryOptions: any;
  dataLoaded:boolean=false;
  name="";limit=1000;
  pageType='';
  constructor(private _packService: PackageUtilityService,
    private _formBuilder: FormBuilder,
    private rootService:RootPageService,
    private route: Router,
    private toastr:ToastrService) { }
  ngOnInit() {
    this.rootService.getCategoryAllData(this.name,this.limit).subscribe((res:any)=>{
      this.categoryOptions=res['response'];
     }); 
    
    const id:any = this.route.url?.split('/');console.log(id)
    if (id && id[2] != undefined && id[2]=='subcategory') {
      this.subcategoryForm = this.creatCategoryForm();
      id && this._packService.getSubCategoryById(id[3]).subscribe((res:any) => {
        this.dataLoaded = true;  
        this.singlecategory = res?.['response'];       
        this.subcategoryForm = this.editCategoryForm(this.singlecategory);
        // Set the default         
        this.pageType='edit'
      }
      );
    }else{
      this.subcategoryForm = this.creatCategoryForm();
      this.pageType='add'
    }
    
  }
  creatCategoryForm(): FormGroup {
    // console.log('this.attribute : ', this.attribute)
    return this._formBuilder.group({
      subcategory: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
    });
  }
  editCategoryForm(data:any): FormGroup {
    // console.log('this.attribute : ', this.attribute)
    return this._formBuilder.group({
      subcategory: [data.subcategory || '', [Validators.required]],
      category_id: [data.category_id || '', [Validators.required]],
    });
  }
  addCategory() {
    const data={
      ...this.subcategoryForm.getRawValue()
    };
    
    this._packService.addSubCategory(data).subscribe((res:any) => { 
    if(res['status']==200){
      this.subcategoryForm.reset();
      this.toastr.success("Addedd successfully");
      this.route.navigate(['package/show-Subcategory']);
    }    
    })
  }
  editCategory(){
    const data={
      ...this.subcategoryForm.getRawValue()
    };
    console.log(data)
    const id:any = this.route.url?.split('/')[3];
    this._packService.updateSubCategory(id,data).subscribe((res:any) => { 
    if(res['status']==200){
      this.subcategoryForm.reset();
      this.toastr.success("updated successfully");
      this.route.navigate(['package/show-Subcategory']);
    }    
    })
  }
}
