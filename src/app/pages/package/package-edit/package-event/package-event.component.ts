import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-package-event',
  templateUrl: './package-event.component.html',
  styleUrls: ['./package-event.component.scss']
})
export class PackageEventComponent {
  quantityForm: FormGroup;
  @Input() roleValue: any[] | undefined;
  @Output() outputFormChild: EventEmitter<string> = new EventEmitter();
  constructor(private fb: FormBuilder,
   ) {
    this.quantityForm = this.fb.group({
      quantities: this.fb.array([]),
    });
    
  }
  ngOnInit(){
   console.log(this.roleValue,"kkk");
    // if (isEmpty(this.roleValue) && this.roleValue == undefined) {
      // this.quantities().push(this.newQuantity());
    // }
    this.quantityForm.controls['quantities'].valueChanges.subscribe(
      (selectedValue) => {        
        this.outputFormChild.emit(selectedValue);
      }
    );

  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.roleValue.currentValue);
    
    if (changes.roleValue.currentValue.length == 0) {
      this.quantities().controls = [];
    }

    var i = 0;
    if (changes.roleValue != undefined) {
      if (changes.roleValue.currentValue) {     
          this.quantities().controls = [];
          changes.roleValue.currentValue && changes.roleValue.currentValue.forEach(async (items: any) => {
            //  this.loadData=true;
            if(items != null){
              await this.quantities().push(this.newQuantityEdit(items));    
            }                         
          })
       }
    }
  }
  quantities(): FormArray {
    return this.quantityForm.get("quantities") as FormArray
  }

  newQuantityEdit(item:any){
    return this.fb.group({
      events: [item || '']    
    })
  }

  newQuantity(): FormGroup {
    return this.fb.group({
      events: ['']    
    })
  }

  addQuantity() {    
    this.quantities().push(this.newQuantity());
  }
     
  removeQuantity(i:number) {  
    this.quantities().removeAt(i);  
  }  
}
