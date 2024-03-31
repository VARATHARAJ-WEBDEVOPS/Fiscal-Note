import { DatePipe } from '@angular/common';
import { Component, OnInit , Inject,} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  providers: [DatePipe],

})
export class DialogComponent implements OnInit {

  balinput: any;
  public hideElements: boolean = true;
  amtinhand : any ;
  
  formattedDate = this.datePipe.transform(new Date(), 'dd/MMM/yyyy');
  
  constructor(    public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.balinput = this.data.formValues.balance;
    if(this.balinput === 0){
      this.amtinhand = "This person has fully paid";
      this.hideElements = false;
    }else{
      this.amtinhand =  Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(this.data.formValues.amtPerMonth);
      this.hideElements = true;
    }
  }
   

  clicked(){
    this.data.parent.editbalance();
    this.data.parent.saveAction();
    this.printBill();
    this.onClose();
  }
  onClose(): void {
    this.dialogRef.close();    
    this.data.parent.fetchAction();
  }
  printBill() {
    const name = this.data.formValues.employee_name;
    const phone = this.data.formValues.phone;
    const address = this.data.formValues.address;

    const date = this.datePipe.transform(this.data.formValues.date, 'dd/MMM/yyyy');
    const amount = this.data.formValues.amount;
    const interst = this.data.formValues.interest;
    const due = this.data.formValues.duedate;
    const finalamt = Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(this.data.formValues.finalamt);

   
    const baldue = this.data.formValues.balanceMonth;
      
    const amtpermon  = Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(this.data.formValues.amtPerMonth);
  
    var printWindow :any = window.open('', 'Print', 'height=1000,width=800');
    printWindow.document.write('<html><head><title>Bill</title>');
    printWindow.document.write('<style>@media print{body{font-size:10pt}</style>');
    printWindow.document.write('</head><body>');

    printWindow.document.write('<center><h1>FISCAL NOTE</h1></center>');
    printWindow.document.write('<p>Date: ' + this.formattedDate  + '</p><br/>');

    printWindow.document.write('<hr/>');
    printWindow.document.write('<center><p>Personal Details</p></center>');
    printWindow.document.write('<hr/>');

    printWindow.document.write('<tr><td>Name : </td><td>' + name  + '</td></tr><br/>');
    printWindow.document.write('<tr><td>Phone : </td><td>' + phone  + '</td></tr><br/>');
    printWindow.document.write('<tr><td>Address : </td><td>' + address  + '</td></tr><br/>');
    printWindow.document.write('<tr><td>Received Date: </td><td>' + date  + '</td></tr><br/>');
    printWindow.document.write('<tr><td>Received Amount: </td><td>₹ ' + amount  + '/-</td></tr><br/>');
    printWindow.document.write('<tr><td>interest: </td><td> ' + interst  + '%</td></tr><br/>');
    printWindow.document.write('<tr><td>Due: </td><td>' + due  + '&nbsp; months </td></tr><br/>');
    printWindow.document.write('<tr><td>Total amount due </td><td> ₹ ' + finalamt + '/-</td></tr><br/>');

    printWindow.document.write('<hr/>');
    printWindow.document.write('<center><p>Balance</p></center>');
    printWindow.document.write('<hr/>');

    printWindow.document.write('<tr><td>Amount : </td><td>₹ ' + this.balinput  + '/-</td></tr><br/>');
    printWindow.document.write('<tr><td>Month : </td><td>' + baldue  + '</td></tr><br/>');
    printWindow.document.write('<hr/>');
    printWindow.document.write('<center><h1>₹ '+ amtpermon +'/-</h1></center>');
    printWindow.document.write('<center><p> Today Paid</p></center>');
    printWindow.document.write('<hr/>');
    printWindow.document.write('<center><h1>Thank You</h1></center>');
    printWindow.document.write('<br/>');
    printWindow.document.write('<hr/>');
    printWindow.document.write('</body></html>');
    printWindow.print();
   printWindow.close();
  };

}
