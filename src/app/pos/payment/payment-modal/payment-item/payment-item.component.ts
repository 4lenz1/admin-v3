import { PaymentService } from './../../payment.service';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { PosService } from 'src/app/pos/pos.service';
import { PaymentRemitComponent } from '../payment-remit/payment-remit.component';
import { Payment } from '../../payment.model';


@Component({
  selector: 'app-payment-item',
  templateUrl: './payment-item.component.html',
  styleUrls: ['./payment-item.component.scss'],
})
export class PaymentItemComponent implements OnInit, AfterViewInit {
  @Input() payment: Payment;
  @Input() index;
  @Output() newPayment: EventEmitter<any> = new EventEmitter();

  payMethod = 'cash';
  methodName = '現金';
  totalPrice: number;
  layaway = 1;
  remit: { code: string, name: string };
  isConfirmDisabled = false;
  payPrice: number;
  authCodeLength: number;
  paymentList: { name: string, payPrice: number, info: {} }[];
  btnNewPaymentDisabled = false;
  info = {};
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

    this.payPrice = this.payment.payPrice;


  }
  ngAfterViewInit() {
    this.getAuthCodeLength();
  }

  getAuthCodeLength() {
    if (this.payment.name === 'credit-card') {
      this.authCodeLength = 6;
    } else if (this.payment.name === 'line-pay') {
      this.authCodeLength = 5;
    } else {
      this.authCodeLength = 0;
    }
  }

  onPaymentSelect(value) {
    console.log('changed', value);
    this.payMethod = value;
    if (value !== 'cash') {
      this.isConfirmDisabled = true;
    }

    if (value === 'cash') {
      this.cash();
      this.payment.name = 'cash';
      this.btnNewPaymentDisabled = false;

    } else if (value === 'credit-card') {
      this.payment.name = 'credit-card';
      this.authCodeLength = 6;
      this.btnNewPaymentDisabled = false;

      // this.posService.setPayMethodSelected(false);
    } else if (value === 'line-pay') {
      this.authCodeLength = 5;
      this.btnNewPaymentDisabled = false;

      this.payment.name = 'line-pay';
    } else if (value === 'jkos') {
      this.payment.name = 'jkos';
      this.isConfirmDisabled = false;
      this.btnNewPaymentDisabled = false;

    }
    else if (value === 'remit') {
      this.onRemitSelect();
      this.payment.name = 'remit';
      this.btnNewPaymentDisabled = true;

    } else if (value === 'ruten') {
      this.payment.name = 'ruten';
      this.btnNewPaymentDisabled = true;

      this.isConfirmDisabled = false;
    } else if (value === 'shopee') {
      this.payment.name = 'shopee';
      this.isConfirmDisabled = false;
      this.btnNewPaymentDisabled = true;
    }

    this.paymentService.setPayment(this.payment);
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

  onPayPriceChange() {
    this.payment.payPrice = this.payPrice;

    this.paymentService.updateTotalPrice(this.payment);
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
            console.log('delete method : ' + this.payment.id);
            this.paymentService.deletePayment(this.payment.id);
          }
        }
      ]
    });

    await alert.present();


  }

}


