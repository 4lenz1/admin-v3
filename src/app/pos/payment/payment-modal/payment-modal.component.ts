import { ModalController } from '@ionic/angular';
import { PosService } from './../../pos.service';
import { Component, OnInit } from '@angular/core';
import { PaymentRemitComponent } from './payment-remit/payment-remit.component';


@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
})
export class PaymentModalComponent implements OnInit {

  constructor(private posService: PosService, private modalController: ModalController) { }

  payMethod = 'cash';
  totalPrice: number;
  layaway = 1;
  remit: { code: string, name: string };
  ngOnInit() {
    // get total price first 
    this.totalPrice = this.posService.getTotalPrice();


    this.posService.totalPricechanged.subscribe(result => {
      this.totalPrice = result;
    });
  }
  onPaymentSelect(value) {
    console.log('changed', value);
    this.payMethod = value;
    if (value === 'cash') {
      this.cash();
    } else if (value === 'remit') {
      this.onRemitSelect();
    }

  }

  cash() {
    this.totalPrice = this.posService.getTotalPrice();
  }

  onLayawaySelect(value) {
    this.layaway = +value;
  }

  onDismissClick() {
    this.modalController.dismiss();
  }


  // 如果已選了匯款資訊，但要更改匯款銀行時
  onRemitItemClick() {
    this.onRemitSelect();
  }


  // when payMeth selet
  async onRemitSelect() {
    const modal = await this.modalController.create({
      component: PaymentRemitComponent,
      backdropDismiss: false
    });


    modal.onWillDismiss().then(result => {
      const data = result.data;
      console.log('close modal , bank : ' + data);
      this.remit = data;
    });

    return await modal.present();
  }

}
