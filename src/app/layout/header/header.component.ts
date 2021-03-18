import { HeaderService } from './header.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',

})
export class HeaderComponent implements OnInit {

  constructor(private headerService: HeaderService) { }
  pageTitle = 'JM-PLUS';
  ngOnInit() {
    // this.headerService.headerTitle.subscribe(result => {
    //   this.pageTitle = result;
    //   console.log('recived subscribe ' + result);
    // });
  }

}
