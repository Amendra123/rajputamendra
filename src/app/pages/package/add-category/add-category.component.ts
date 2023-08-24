import { Component } from '@angular/core';
import { PackageUtilityService } from '../package-utility.service';
import { Category } from '../package.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  providers: [PackageUtilityService]
})
export class AddCategoryComponent {
  categoryForm!: FormGroup;
  singleAttr = [];
  singlecategory=[];
  dataLoaded:boolean=false;
  pageType='';
  constructor(private _packService: PackageUtilityService,
    private _formBuilder: FormBuilder,
    private route: Router,
    private toastr:ToastrService) { }
  ngOnInit() {
    
    
    const id:any = this.route.url?.split('/');console.log(id)
    if (id && id[2] != undefined && id[2]=='category') {
      this.categoryForm = this.creatCategoryForm();
      id && this._packService.getCategoryById(id[3]).subscribe((res:any) => {
        this.dataLoaded = true;  
        this.singlecategory = res?.['response'];       
        this.categoryForm = this.editCategoryForm(this.singlecategory);
        // Set the default         
        this.pageType='edit'
      }
      );
    }else{
      this.categoryForm = this.creatCategoryForm();
      this.pageType='add'
    }
    
  }
  creatCategoryForm(): FormGroup {
    // console.log('this.attribute : ', this.attribute)
    return this._formBuilder.group({
      category: ['', [Validators.required]],
    });
  }
  editCategoryForm(data:any): FormGroup {console.log(data.category);
    // console.log('this.attribute : ', this.attribute)
    return this._formBuilder.group({
      category: [data.category || '', [Validators.required]],
    });
  }
  addCategory() {
    const data={
      ...this.categoryForm.getRawValue()
    };
    
    this._packService.addCategory(data).subscribe((res:any) => { 
    if(res['status']==200){
      this.categoryForm.reset();
      this.toastr.success("Addedd successfully");
      this.route.navigate(['package/show-category']);
    }    
    })
  }
  editCategory(){
    const data={
      ...this.categoryForm.getRawValue()
    };
    console.log(data)
    const id:any = this.route.url?.split('/')[3];
    this._packService.updateCategory(id,data).subscribe((res:any) => { 
    if(res['status']==200){
      this.categoryForm.reset();
      this.toastr.success("updated successfully");
      this.route.navigate(['package/show-category']);
    }    
    })
  }
}
