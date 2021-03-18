import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/layout/header/header.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],


})
export class CustomerPage implements OnInit {
  constructor(private headerService: HeaderService) { }
  // headerName = 'Order';
  ngOnInit() {
    // this.headerService.setHeaderTitle(this.headerName);
  }

}
