import { Component, ViewChild, ViewContainerRef,OnInit, ElementRef} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FormBuilder } from '@angular/forms';
import { ServiceService } from 'src/app/service/service.service';
import Swal from 'sweetalert2';
import {  Data, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  Email: any;
  balref  : any ;
  displayedColumns: string[] = ['Persolnal Detail', 'Date','Due Date', 'Amount','Interest', 'Actions'];   //Table colums Assigned
  reloadFlag = localStorage.getItem('reloadFlag');

  public employeeFormGroup = this.fb.group({   //Getting Form Inputs
    'employee_name': [],
    '_id': [],
    '_rev': [],
    'address': [],
    'phone': [],
    'date': [],
    'duedate': [],
    amount: [],
    balance: [],
    profit: [],
    finalamt: [],
    balanceMonth: [],
    amtPerMonth: [],
    'interest': [] 
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
    if(localStorage.getItem('email') == null){
      Swal.fire('UnAutharized User', '', 'warning')
      this.router.navigateByUrl('/');
    }
    if (!this.reloadFlag) {
      localStorage.setItem('reloadFlag', 'true');
      location.reload();
    }

    
      this.fetchAction()
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
  
  saveAction() : void{                                //Save and update Function.

   
    if (this.employeeFormGroup.valid) {
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
    } 
   this.resetAction();
    Swal.fire('Saved Successfully' ,'' ,'success'); 
    
  }

  fetchAction() :void{                                        //Read Function.
    this.service.searchDocument('object_name:staff_name')
  }

  editAction(employeeObject: any ) {                           //Edit Function ., Trigger For Update.
    this.employeeFormGroup.patchValue(employeeObject);
   this. balref  = parseInt( this.employeeFormGroup.value.balance);    
  }

  resetAction(): void {
    this.employeeFormGroup.reset()
    this.employeeFormGroup.markAsUntouched()
  }  
      
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.service.dataSource.filter = filterValue.trim().toLowerCase();
      
    if (this.service.dataSource.paginator) {
      this.service.dataSource.paginator.firstPage();

       this.service.dataSource.filterPredicate = (data: Data, filter: string) => {
    const date = new Date(data['date']);
    const filterDate = new Date(filter);
    return date.getTime() === filterDate.getTime();
  };
  this.service.dataSource.filter = filterValue;
    }
  }

  movecreate(create: string):void{
   this.sidenav.close();
   const element = this.elementRef.nativeElement.querySelector(`#${create}`);
   element.scrollIntoView({ behavior: 'smooth', block: 'start' });   
  }

  moveread(tableref: string){
   this.fetchAction();
   this.sidenav.close()
   const element = this.elementRef.nativeElement.querySelector(`#${tableref}`)
   element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  onEdit(item : any) {
    this.service.employees.forEach(element => {
      element.isEdit = false;
    });
    item.isEdit = true;
  }

  logout() {
    localStorage.removeItem('email');
    this.router.navigateByUrl('/');
    localStorage.setItem('reloadFlag', "")
  }


}