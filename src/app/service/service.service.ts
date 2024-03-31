import { Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  couchDBUrl: string = 'https://784ea086-d974-431c-aa48-7801aa7b2561-bluemix.cloudantnosqldb.appdomain.cloud'
  couchDBUsername: string = 'apikey-v2-23epskwaoah6sy6rvo29zejnn1k4kl1llrrq1ot36mry'
   couchDBPassword: string = '69c1d2737d371d9f6b7f6009287e6ccc'
   databaseName: string = 'staff'

   employees: Array<any> = [];
dataSource!: MatTableDataSource<any>;

totalAmount : number = 0;
totalPayees: number = 0;
totalprofit: number = 0;
totalBalance: number =0;
totalfinalamt: number =0;

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;



  constructor(public httpClient: HttpClient) { }

  

  updateDocument(requests: Array<any>) {
   this.httpClient.post(this.couchDBUrl + '/' + this.databaseName + '/_bulk_docs', { 'docs': requests }, {
    headers: {
    'Authorization': 'Basic ' + btoa(this.couchDBUsername + ':' + this.couchDBPassword)
    }
    }).subscribe((res: any) => {
    if (res[0]['ok']) {

    }
    console.log("updateDocument", res);
    })

    }
    async searchDocument(query: string) {
    return this.httpClient.post(this.couchDBUrl + '/' + this.databaseName + '/_design/staffdetails/_search/staff_search',
  { 'q': query, 'include_docs': true }, {
  headers: {
 'Authorization': 'Basic ' + btoa(this.couchDBUsername + ':' + this.couchDBPassword)
}
 }).subscribe((res: any) => {
 console.log("searchDocument", res) 
   this.employees = res['rows'].map((row: any) => row['doc']);
   this.dataSource = new MatTableDataSource(this.employees)
   for (let i = 0; i < this.dataSource.data.length; i++) {         //Calculating Total Amount
    this.totalAmount += parseInt(this.dataSource.data[i].amount);
  }

  for (let i = 0; i < this.dataSource.data.length; i++) {         //Calculating Total Amount
    this.totalprofit += parseInt(this.dataSource.data[i].profit);
  }

  for (let i = 0; i < this.dataSource.data.length; i++) {         //Calculating Total Amount
    this.totalBalance += parseInt(this.dataSource.data[i].balance);
  }

  for (let i = 0; i < this.dataSource.data.length; i++) {         //Calculating Total Amount
    this.totalfinalamt += parseInt(this.dataSource.data[i].finalamt);
  }

  this.totalPayees = this.dataSource.data.length;
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
      
 return res;
 })
  }
  deleteDocument(id: string, rev: string,) {
     this.httpClient.delete(this.couchDBUrl + '/' + this.databaseName + '/' + id + '?rev=' + rev, {
    headers: {
    'Authorization': 'Basic ' + btoa(this.couchDBUsername + ':' + this.couchDBPassword)
     }
     }).subscribe(res => {
     console.log("deleteDocument", res)
      Swal.fire('Successfully Deleted', '', 'success' );

     })
     }
    
    }


