import { PaymentService } from './payment.service';
import { PosService } from './../pos.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  methodIsSelected = false;
  methodName = '選擇付款方式';
  payMethod: string;
  methodColor = 'danger';
  methodIcon = 'apps';
  showCalculator = false;
  paidMoney: number;
  totalPrice: number;
  constructor(private posService: PosService
    , private modalController: ModalController
    , private paymentService: PaymentService) { }

  ngOnInit() {
    this.totalPrice = this.posService.getOriginalTotalPrice();
    this.posService.totalPricechanged.subscribe(result => {
      this.totalPrice = result;
      console.log(this.totalPrice);
    });
  }



  async onMethodSelect() {
    const modal = await this.modalController.create({
      component: PaymentModalComponent,
      backdropDismiss: false
    });

    modal.onDidDismiss().then(result => {
      // this.posService.getPaidMoney();
      this.showCalculator = true;
      this.paymentService.updatePaymentList();
      this.methodColor = 'primary';
      this.methodName = '已選擇';
    });

    return await modal.present();
  }
}
