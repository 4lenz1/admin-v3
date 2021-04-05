import { PosService } from './../../pos.service';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-price-detail',
  templateUrl: './price-detail.component.html',
  styleUrls: ['./price-detail.component.scss'],
})
export class PriceDetailComponent implements OnInit {

  discountPrice: number;
  discountRate: number;
  totalPrice: number;

  constructor(private modalController: ModalController, private posService: PosService) { }

  ngOnInit() {
    this.discountRate = 10;
    this.discountPrice = 0;
    this.totalPrice = this.posService.getOriginalTotalPrice();
  }

  onPriceChange(id) {

    // const oldTotalPrice = this.totalPrice;
    if (id === 'discountPrice') {
      this.totalPrice = this.posService.getOriginalTotalPrice() - this.discountPrice;
      this.discountRate = this.totalPrice / this.posService.getOriginalTotalPrice() * 10;

    } else if (id === 'discountRate') {
      // const dig = this.discountRate.toString();
      if (this.discountRate < 10) {
        // 1~9 折
        this.totalPrice = this.posService.getOriginalTotalPrice() * this.discountRate * .1;
      } else {
        //雙位數折數
        // 79 , 99 , 78 , 85 之類的折數
        this.totalPrice = this.posService.getOriginalTotalPrice() * this.discountRate * .01;
      }

      this.discountPrice = this.posService.getOriginalTotalPrice() - this.totalPrice;

    } else {
      // total price
      this.discountPrice = this.posService.getOriginalTotalPrice() - this.totalPrice;
      this.discountRate = this.totalPrice / this.posService.getOriginalTotalPrice() * 10;
    }
  }

  onDiscountOk() {
    this.modalController.dismiss({ totalPrice: this.totalPrice });
  }
}
