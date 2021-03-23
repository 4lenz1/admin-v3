import { PriceDetailComponent } from './price-detail/price-detail.component';
import { PosService } from '../pos.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-total-price',
  templateUrl: './total-price.component.html',
  styleUrls: ['./total-price.component.scss'],
})
export class TotalPriceComponent implements OnInit {

  totalPrice: number;
  isDiscounted = false;
  discountTotalPrice: number;
  show = {
    showCardTitle: true,
    showCardContent: true
  };
  constructor(private posService: PosService, private modalController: ModalController) { }
  color = 'primary';
  ngOnInit() {
    this.totalPrice = this.posService.getOriginalTotalPrice();
    this.posService.setTotalPrice(this.totalPrice);

    this.posService.totalPricechanged.subscribe(result => {
      console.log('total price chaged ' + result);
      this.totalPrice = result;
      this.discountTotalPrice = this.totalPrice;

      if (result === this.posService.getOriginalTotalPrice()) {
        this.isDiscounted = false;
        this.color = 'primary';
      } else {
        // this.totalPrice = result;
        this.isDiscounted = true;
        this.color = 'warning';
      }

    });
  }
  async onPriceClick() {
    const modal = await this.modalController.create({
      component: PriceDetailComponent,
      // componentProps: { originalTotalPrice: this.totalPrice },
      // cssClass: 'my-custom-class'
    });
    modal.onWillDismiss().then(result => {
      this.discountTotalPrice = result.data.totalPrice;
      this.changeTotalPrice();
    });
    return await modal.present();
  }
  onResetClick() {
    if (this.isDiscounted) {
      this.posService.resetTotalPrice();
      this.discountTotalPrice = this.posService.getOriginalTotalPrice();
      this.changeTotalPrice();
    } else {
      return;
    }
  }

  changeTotalPrice() {
    if (this.discountTotalPrice !== this.posService.getOriginalTotalPrice()) {

      this.color = 'warning';
      console.log('discount price !');
      this.isDiscounted = true;
      this.posService.setTotalPrice(this.discountTotalPrice);
      this.totalPrice = this.discountTotalPrice;

    } else {
      this.color = 'primary';
      this.isDiscounted = false;
      this.totalPrice = this.posService.getOriginalTotalPrice();
      this.posService.setTotalPrice(this.totalPrice);

    }
  }
}



