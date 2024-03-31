import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-print-page',
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.css']
})
export class PrintPageComponent implements OnInit {

  today = new Date();
  constructor(public service:ServiceService ,private router: Router) { }

  ngOnInit(): void {
    this.fetchAction();
  }
  fetchAction() :void{
    this.service.searchDocument('object_name:staff_name').then( () =>{
    window.print();
      this.router.navigateByUrl('Dashboard');
    })
  }
}
