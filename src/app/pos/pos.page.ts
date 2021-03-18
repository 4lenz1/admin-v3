import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../layout/header/header.service';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.page.html',
  styleUrls: ['./pos.page.scss'],


})
export class PosPage implements OnInit {

  constructor(private headerService: HeaderService) { }

  ngOnInit() {
    // this.headerService.setHeaderTitle('PoS');
  }

}
