import { PaymentService } from './../../payment.service';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { PosService } from 'src/app/pos/pos.service';
import { PaymentRemitComponent } from '../payment-remit/payment-remit.component';


@Component({
  selector: 'app-payment-item',
  templateUrl: './payment-item.component.html',
  styleUrls: ['./payment-item.component.scss'],
})
export class PaymentItemComponent implements OnInit {
  @Input() index;
  @Output() newPayment: EventEmitter<any> = new EventEmitter();
  payMethod = 'cash';
  methodName = '現金';
  totalPrice: number;
  layaway = 1;
  remit: { code: string, name: string };
  isConfirmDisabled = false;
  payPrice = 0;
  authCodeLength: number;
  paymentList: { name: string, payPrice: number, info: {} }[];
  btnNewPaymentDisabled = false;
  @ViewChild('inputAuthCode', { read: ElementRef }) private authCodeEl: ElementRef;
  @ViewChild('inputCredit4Digi', { read: ElementRef }) private Credit4DigiEl: ElementRef;
  @ViewChild('inputRemit5Digi', { read: ElementRef }) private remit5DigiEl: ElementRef;

  constructor(private posService: PosService,
    private modalController: ModalController,
    private paymentService: PaymentService,
    private alertController: AlertController) { }

  ngOnInit() {
    // get total price first
    this.totalPrice = this.posService.getTotalPrice();
    // 剛開始是 cash -> true
    this.posService.setPayMethodSelected(true);

    this.posService.totalPricechanged.subscribe(result => {
      this.totalPrice = result;
    });
  }

  onPaymentSelect(value) {
    console.log('changed', value);
    this.payMethod = value;
    if (value !== 'cash') {
      this.isConfirmDisabled = true;
    }

    if (value === 'cash') {
      this.cash();
      this.methodName = '現金';
      this.btnNewPaymentDisabled = false;

    } else if (value === 'credit-card') {
      this.methodName = '刷卡';
      this.authCodeLength = 6;
      this.btnNewPaymentDisabled = false;

      // this.posService.setPayMethodSelected(false);
    } else if (value === 'line-pay') {
      this.authCodeLength = 5;
      this.btnNewPaymentDisabled = false;

      this.methodName = 'LINE PAY';
    } else if (value === 'jkos') {
      this.methodName = '街口';
      this.isConfirmDisabled = false;
      this.btnNewPaymentDisabled = false;

    }
    else if (value === 'remit') {
      this.onRemitSelect();
      this.methodName = '匯款';
      this.btnNewPaymentDisabled = true;

    } else if (value === 'ruten') {
      this.methodName = '露天';
      this.btnNewPaymentDisabled = true;

      this.isConfirmDisabled = false;
    } else if (value === 'shopee') {
      this.methodName = '蝦皮';
      this.isConfirmDisabled = false;
      this.btnNewPaymentDisabled = true;

    }
  }

  cash() {
    this.totalPrice = this.posService.getTotalPrice();

  }

  onLayawaySelect(value) {
    this.layaway = +value;
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

  onTotalPriceChange() {
    const shouldPay = this.posService.getTotalPrice();
    if (this.totalPrice >= shouldPay) {
      this.isConfirmDisabled = false;
    } else {
      this.isConfirmDisabled = true;
    }
  }

  onRemitInfoChange() {
    const remitCode = this.remit5DigiEl.nativeElement.value;
    if (remitCode.length === 5) {
      this.isConfirmDisabled = false;
    } else {
      this.isConfirmDisabled = true;
    }
  }


  onCreditCardInfoChange() {
    const authCode = this.authCodeEl.nativeElement.value;


    if (this.payMethod === 'line-pay') {
      if (authCode.length === this.authCodeLength) {
        this.isConfirmDisabled = false;
      } else {
        this.isConfirmDisabled = true;
      }
    } else {
      const cardDigi = this.Credit4DigiEl.nativeElement.value;

      // credit card
      if (authCode.length === this.authCodeLength && cardDigi.length === 4) {
        this.isConfirmDisabled = false;
      } else {
        this.isConfirmDisabled = true;
      }
    }
  }

  onAddNewMethodClick() {
    console.log('button clicked');
    this.newPayment.emit(null);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }



  async onDeleteMethodClick() {
    const alert = await this.alertController.create({
      header: 'QAQ',
      message: 'Are You **** Sure ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        }, {
          text: '刪 ! 都刪 !',
          handler: () => {
            console.log('delete method : ' + this.index);
            this.paymentService.deletePayment(this.index);
          }
        }
      ]
    });

    await alert.present();


  }

}


