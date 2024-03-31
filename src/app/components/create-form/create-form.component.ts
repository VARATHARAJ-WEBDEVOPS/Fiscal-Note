import { Component, ViewChild, ViewContainerRef,OnInit, ElementRef} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Validators, FormBuilder} from '@angular/forms';
import { ServiceService } from 'src/app/service/service.service';
import Swal from 'sweetalert2';
import {  Data, Router } from '@angular/router';
import { switchAll } from 'rxjs';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

  Email: any;
  balref  : any ;
  displayedColumns: string[] = ['Persolnal Detail', 'Date','Due Date', 'Amount','Interest', 'Actions'];   //Table colums Assigned
  reloadFlag = localStorage.getItem('reloadFlag');

  public employeeFormGroup = this.fb.group({   //Getting Form Inputs
    'employee_name': ['',Validators.required],
    '_id': [],
    '_rev': [],
    'address': ['',Validators.required],
    'phone': ['',Validators.required],
    'date': ['',Validators.required],
    'duedate': ['',Validators.required],
    amount: ['',Validators.required],
    balance: [],
    profit: [],
    finalamt: [],
    balanceMonth: [],
    amtPerMonth: [],
    'interest': ['',Validators.required] 
  });

  containerRef!: ViewContainerRef;
  @ViewChild(MatSidenav)

  sidenav!: MatSidenav;
  formGroup: any;
  
  constructor( private fb: FormBuilder,
    private elementRef: ElementRef,
    public service:ServiceService,
    private router: Router
    )
  { }  

  ngOnInit(): void {  
    if (!this.reloadFlag) {
      localStorage.setItem('reloadFlag', 'true');
      location.reload();
    }

    if( localStorage.getItem('email') == null){
      Swal.fire('UnAutharized User', '', 'warning')
      this.router.navigateByUrl('/');
    }
    this.Email = localStorage.getItem('email');      //Get user Mail id from Login page using user service
   
  }  
  printx(){
    localStorage.setItem('reloadFlag', "")
  }

  calculate() {
    const amt : number= this.employeeFormGroup.value.amount;
    const intr : number  = this.employeeFormGroup.value.interest;
    const due : number = this.employeeFormGroup.value.duedate;
    const prof  : number =  amt * intr * due /100 ;
    const bal : number = prof + amt; 
    const amtpermon : Number = bal / due ;
    this.employeeFormGroup.value.profit = prof;
    this.employeeFormGroup.value.balance = bal ;
    this.employeeFormGroup.value.finalamt = bal ;
    this.employeeFormGroup.value.amtPerMonth = amtpermon;
    this.employeeFormGroup.value.balanceMonth = due;
  }

  editbalance() {
    const balinput  = this.employeeFormGroup.value.balance;
    const amtPerMonth = this.employeeFormGroup.value.amtPerMonth;
    const baldue = this.employeeFormGroup.value.balanceMonth;
    const balfix: Number = balinput - amtPerMonth;
    this.employeeFormGroup.value.balanceMonth = baldue - 1;
    this.employeeFormGroup.value.balance = balfix ;
  }
  
  saveAction() : void{                              //Save and update Function.
   
    if (!this.employeeFormGroup.valid ) {
      Swal.fire('Please Check All the Fields are Filled!', '', 'warning')
    }else{
      let employeeObject:any = this.employeeFormGroup.value;
      console.log(employeeObject);   
      employeeObject['object_name'] = 'staff_name' 

      if (employeeObject['_id'] == null) {
        delete employeeObject['_id']
      }

      if (employeeObject['_rev'] == null) {
        delete employeeObject['_rev']
      }     
   
      let bulkDocsArray = []
      bulkDocsArray.push(employeeObject)
      this.service.updateDocument(bulkDocsArray)

      this.resetAction();
      Swal.fire('Saved Successfully' ,'' ,'success');
    }     
  }

  resetAction(): void {
    this.employeeFormGroup.reset()
    this.employeeFormGroup.markAsUntouched()
  }  

  logout() {
    localStorage.removeItem('email');
    this.router.navigateByUrl('/');
    localStorage.setItem('reloadFlag', "")
  }
 
}
