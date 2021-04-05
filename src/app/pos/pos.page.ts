import { PosService } from './pos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.page.html',
  styleUrls: ['./pos.page.scss'],


})
export class PosPage implements OnInit {

  scanStatus = false;

  constructor(private posService: PosService) { }
  ngOnInit() {
    this.posService.camStatusChanged.subscribe(result => {
      this.scanStatus = result;
    });
  }
}
