import { PosService } from './../pos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
})
export class PriceComponent implements OnInit {

  totalPrice: number;
  constructor(private posService: PosService) { }

  ngOnInit() {
    this.totalPrice = this.posService.getTotalPrice();
    this.posService.totalPricechanged.subscribe(result => {
      this.totalPrice = result;
    });
  }

}
