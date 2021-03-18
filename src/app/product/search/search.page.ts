
import { HeaderService } from './../../layout/header/header.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  
})
export class SearchPage implements OnInit {

  constructor(private headerService: HeaderService) { }

  ngOnInit() {
    // this.headerService.setHeaderTitle('價目表');
  }

}
